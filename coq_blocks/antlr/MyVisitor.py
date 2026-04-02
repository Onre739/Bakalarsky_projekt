from .COQParser import COQParser
from .COQVisitor import COQVisitor

from block_classes import *

COQ_RESERVED = {
    "Type", "Prop", "Set", "match", "with", "end", "fun", "forall",
    "let", "in", "if", "then", "else", "return", "Inductive",
    "Definition", "Fixpoint", "Record", "Class", "Instance", "Axiom", "Lemma", "Theorem"
}
class MyVisitor(COQVisitor):
    # =========================================================================
    # 1. Parsing types (recursive with args)
    # =========================================================================

    def visitType_expression(self, ctx: COQParser.Type_expressionContext):
        # Expression can have multiple type terms ( type_expression: type_term+; )
        terms = ctx.type_term()
        
        if not terms:
            return CoqType(name="Unknown")

        # 1. First term is the base type
        base_coq_type = self.visit(terms[0])    # Instance of CoqType ! ; visiting visitTypeTermName or visitTypeTermParens
        
        final_name = base_coq_type.name
        final_args = base_coq_type.args         # Empty list []

        # 2. Other terms are arguments of the base type
        for term_ctx in terms[1:]:
            arg_type = self.visit(term_ctx)
            final_args.append(arg_type)

        return CoqType(name=final_name, args=final_args)

    def visitTypeTermName(self, ctx: COQParser.TypeTermNameContext):
        # Just a simple type name
        return CoqType(name=ctx.NAME().getText(), args=[])

    def visitTypeTermParens(self, ctx: COQParser.TypeTermParensContext):
        # Nested type in parentheses -> recursive call
        return self.visit(ctx.type_expression())
    
    # =========================================================================
    # 2. Parsing constructor parameters (Binder vs Arrow)
    # =========================================================================

    def visitBinderParam(self, ctx: COQParser.BinderParamContext):
        # Gramatics: '(' NAME+ ':' type_expression ')'
        # Form: (n : nat)
        
        variable_names = [n.getText() for n in ctx.NAME()]

        coq_type = self.visit(ctx.type_expression())
        
        return ConstructorArg(type=coq_type, names=variable_names)

    def visitArrowParam(self, ctx: COQParser.ArrowParamContext):
        # Gramatics: type_expression '->'
        # Form: nat -> ...
        
        coq_type = self.visit(ctx.type_expression())
        
        return ConstructorArg(type=coq_type, names=[])

    # =========================================================================
    # 3. Parsing constructors (Binder vs Arrow)
    # =========================================================================
    def visitArrowEntry(self, ctx: COQParser.ArrowEntryContext):        
        # Form: | cons : nat -> list nat
        name = ctx.NAME().getText()
        args = []
        
        if ctx.arrowParam():
            for param_ctx in ctx.arrowParam():
                args.append(self.visit(param_ctx))
        
        # Arrow constructor has explicit return type at the end
        return_type = self.visit(ctx.type_expression())

        return CoqConstructor(
            name=name, 
            args=args, 
            syntax_style="arrow", 
            return_type=return_type
    )

    def visitBinderEntry(self, ctx: COQParser.BinderEntryContext):        
        # Form: | cons (n : nat) ...
        name = ctx.NAME().getText()
        args = []
        
        if ctx.binderParam():
            for param_ctx in ctx.binderParam():
                args.append(self.visit(param_ctx))
                
        return CoqConstructor(
            name=name, 
            args=args, 
            syntax_style="binder"
    )

    # =========================================================================
    # 4. Parsing main structure
    # =========================================================================
    def visitTypeParameters(self, ctx: COQParser.TypeParametersContext):
        # Grammar: '(' NAME+ ':' 'Type' ')'
        # Returns a list of parameter names, e.g. ["X", "Y"]
        return [param.getText() for param in ctx.NAME()]

    def visitInductiveDef(self, ctx: COQParser.InductiveDefContext):
        type_name = ctx.NAME().getText()
        
        # Reserved word check
        if type_name in COQ_RESERVED:
            raise ValueError(f"Semantic error: Cannot use reserved word '{type_name}' as a type name.")

        print(f"Processing inductive type: {type_name}")

        # Original text extraction
        start_index = ctx.start.start
        stop_index = ctx.stop.stop
        raw_text = ctx.start.getInputStream().getText(start_index, stop_index)

        print(f"DEBUG FULL TEXT: {repr(raw_text)}")

        # 1. Type Parameters
        type_parameters = []
        if ctx.typeParameters():
            for tp_ctx in ctx.typeParameters():
                # visitTypeParameters returns list, we need to extend
                params_list = self.visit(tp_ctx)
                type_parameters.extend(params_list)
        
        # Reserved word check for type parameters and duplicate check
        for p in type_parameters:
            if p in COQ_RESERVED:
                raise ValueError(f"Semantic error: Cannot use reserved word '{p}' as a type parameter.")
        
        if len(type_parameters) != len(set(type_parameters)):
            raise ValueError(f"Semantic error: Type '{type_name}' has duplicate type parameters.")

        # 2. Constructors
        all_constructors = []

        if ctx.constructor():
            for c_ctx in ctx.constructor():
                all_constructors.append(self.visit(c_ctx))

        # Reserved word check for constructor names and duplicate check
        for c in all_constructors:
            if c.name in COQ_RESERVED:
                raise ValueError(f"Semantic error: Cannot use reserved word '{c.name}' as a constructor name.")
            
            # Reserved word check for argument names in binder notation
            for arg in c.args:
                for arg_name in arg.names:
                    if arg_name in COQ_RESERVED:
                        raise ValueError(f"Semantic error: Cannot use reserved word '{arg_name}' as a variable name in constructor '{c.name}'.")

        constructor_names = [c.name for c in all_constructors]
        if len(constructor_names) != len(set(constructor_names)):
            raise ValueError(f"Semantic error: Type '{type_name}' has duplicate constructor names.")

        # 3. Semantic checks of return types for arrow constructors
        for c in all_constructors:
            if c.syntax_style == "arrow" and c.return_type:
                # A) Check if the return type name matches the inductive type name (e.g., returns 'idk')
                if c.return_type.name != type_name:
                    raise ValueError(f"Semantic error: Constructor '{c.name}' must return '{type_name}', but returns '{c.return_type.name}'.")
                
                # B) Check the exact match of parameters (count and names)
                actual_args = [arg.name for arg in c.return_type.args]
                
                if actual_args != type_parameters:
                    # Assemble the expected and actual texts for the error message
                    expected = f"{type_name} {' '.join(type_parameters)}".strip()
                    actual = f"{c.return_type.name} {' '.join(actual_args)}".strip()
                    
                    raise ValueError(f"Semantic error in constructor '{c.name}': Return type does not contain the correct parameters. Expected '{expected}', but found '{actual}'.")
                
        # 4. Final assembly
        return CoqInductiveType(
            name=type_name,
            type_parameters=type_parameters,
            constructors=all_constructors,
            full_text=raw_text
        )

    def visitProg(self, ctx: COQParser.ProgContext):
        print("Starting to parse COQ type expressions...")
        results = []

        if ctx.inductiveDef():
            for i_ctx in ctx.inductiveDef():
                results.append(self.visit(i_ctx))
        
        return results

