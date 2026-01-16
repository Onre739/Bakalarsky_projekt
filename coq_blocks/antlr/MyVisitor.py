from .COQParser import COQParser
from .COQVisitor import COQVisitor

from BlockClasses import *

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

    def visitBinderConstructor(self, ctx: COQParser.BinderConstructorContext):
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
    
    def visitArrowConstructor(self, ctx: COQParser.ArrowConstructorContext):
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

    # --- Shortend version (without | after := ; but only 1 constructor) ---
    def visitBinderConsShort(self, ctx: COQParser.BinderConsShortContext):
        name = ctx.NAME().getText()
        args = []
        if ctx.binderParam():
            for param_ctx in ctx.binderParam():
                args.append(self.visit(param_ctx))
        return CoqConstructor(name=name, args=args, syntax_style="binder")

    def visitArrowConsShort(self, ctx: COQParser.ArrowConsShortContext):
        name = ctx.NAME().getText()
        args = []
        if ctx.arrowParam():
            for param_ctx in ctx.arrowParam():
                args.append(self.visit(param_ctx))
        
        return_type = self.visit(ctx.type_expression())

        return CoqConstructor(
            name=name, 
            args=args, 
            syntax_style="arrow",
            return_type=return_type
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
        print(f"Processing inductive type: {type_name}")

        # 1. Type Parameters
        type_parameters = []
        if ctx.typeParameters():
            for tp_ctx in ctx.typeParameters():
                # visitTypeParameters returns list, we need to extend
                params_list = self.visit(tp_ctx)
                type_parameters.extend(params_list)

        # 2. Constructors
        all_constructors = []

        # Binder style ( ... )
        if ctx.binderConstructor():
            for c_ctx in ctx.binderConstructor():
                all_constructors.append(self.visit(c_ctx))
        
        # Arrow style ... -> ...
        if ctx.arrowConstructor():
            for c_ctx in ctx.arrowConstructor():
                all_constructors.append(self.visit(c_ctx))
                
        # Shortened versions (without | after := ; only one constructor !!)
        if ctx.binderConsShort():
            all_constructors.append(self.visit(ctx.binderConsShort()))
            
        if ctx.arrowConsShort():
            all_constructors.append(self.visit(ctx.arrowConsShort()))

        # 3. Final assembly
        return CoqInductiveType(
            name=type_name,
            type_parameters=type_parameters,
            constructors=all_constructors
        )

    def visitProg(self, ctx: COQParser.ProgContext):
        print("Starting to parse COQ type expressions...")
        results = []

        if ctx.inductiveDef():
            for i_ctx in ctx.inductiveDef():
                results.append(self.visit(i_ctx))
        
        return results

