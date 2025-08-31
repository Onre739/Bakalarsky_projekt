from .COQParser import COQParser
from .COQLexer import COQLexer
from .COQVisitor import COQVisitor

from BlockClasses import *

class MyVisitor(COQVisitor):
    def visitImplicitParam(self, ctx: COQParser.ImplicitParamContext):
        variables = []
        type = []
        colon_found = False

        for child in ctx.getChildren():
            child = child.getText()
            if child != '(' and child != ')':
                if child == ':':
                    colon_found = True
                elif colon_found:
                    type.append(child)
                else:
                    variables.append(child)

        return ImplicitParameter(variables, type)
    
    def visitExplicitParam(self, ctx: COQParser.ExplicitParamContext):
        type = [param.getText() for param in ctx.NAME()]

        return ExplicitParameter(type)

    def visitImplicitConstructor(self, ctx: COQParser.ImplicitConstructorContext):
        parameters = []
        name = ctx.NAME().getText()
        for constructorParameterCtx in ctx.implicitParam():
            new_constructor_parameter = self.visit(constructorParameterCtx)
            parameters.append(new_constructor_parameter)
        return ImplicitConstructor(name, parameters)
    
    def visitExplicitConstructor(self, ctx: COQParser.ExplicitConstructorContext):
        parameters = []
        values = [param.getText() for param in ctx.NAME()]
        name = values.pop(0)
        type = values

        for constructorParameterCtx in ctx.explicitParam():
            new_constructor_parameter = self.visit(constructorParameterCtx)
            parameters.append(new_constructor_parameter)
        return ExplicitConstructor(name, parameters, type)
    
    def visitImplicitConsShort(self, ctx: COQParser.ImplicitConsShortContext):
        parameters = []
        name = ctx.NAME().getText()
        for constructorParameterCtx in ctx.implicitParam():
            new_constructor_parameter = self.visit(constructorParameterCtx)
            parameters.append(new_constructor_parameter)
        return ImplicitConstructor(name, parameters)
    
    def visitExplicitConsShort(self, ctx: COQParser.ExplicitConsShortContext):
        parameters = []
        values = [param.getText() for param in ctx.NAME()]
        name = values.pop(0)
        type = values

        for constructorParameterCtx in ctx.explicitParam():
            new_constructor_parameter = self.visit(constructorParameterCtx)
            parameters.append(new_constructor_parameter)
        return ExplicitConstructor(name, parameters, type)
        
    def visitTypeParameters(self, ctx: COQParser.TypeParametersContext):
        typeParameters = [param.getText() for param in ctx.NAME()]
        return ExplicitParameter(typeParameters)

    def visitInductiveDef(self, ctx: COQParser.InductiveDefContext):
        # Získání názvu typu
        name = ctx.NAME().getText()
        print("DEF")

        # Získání typeParametrů (pokud existují)
        typeParameters = []
        for typeParamCtx in ctx.typeParameters():
            new_type_param = self.visit(typeParamCtx)
            typeParameters.append(new_type_param)

        # Získání implicitních konstruktorů
        implicitConstructors = []
        for constructorCtx in ctx.implicitConstructor():
            new_constructor = self.visit(constructorCtx)
            implicitConstructors.append(new_constructor)

        # Pro zkrácené verze konstruktorů
        if ctx.implicitConsShort() is not None:
            new_constructor = self.visit(ctx.implicitConsShort())
            implicitConstructors.append(new_constructor)

        # Získání explicitních konstruktorů
        explicitConstructors = []
        for constructorCtx in ctx.explicitConstructor():
            new_constructor = self.visit(constructorCtx)
            explicitConstructors.append(new_constructor)

        # Pro zkrácené verze konstruktorů
        if ctx.explicitConsShort() is not None:
            new_constructor = self.visit(ctx.explicitConsShort())
            explicitConstructors.append(new_constructor)

        print(name)
        print(typeParameters)
        print(implicitConstructors)
        print(explicitConstructors)
        new_type = NewType(name, typeParameters, implicitConstructors, explicitConstructors)
        return new_type

    def visitHypothesisDef(self, ctx: COQParser.HypothesisDefContext):
        name = ctx.NAME().getText()
        new_hypothesis = Hypothesis(name)
        return new_hypothesis

    def visitProg(self, ctx: COQParser.ProgContext):
        # Procházíme všechny induktivní definice
        types = []
        hypothesis = []
        print("PROG")

        for hypothesisCtx in ctx.hypothesisDef():
            new_hypothesis = self.visit(hypothesisCtx)
            hypothesis.append(new_hypothesis)

        for inductiveCtx in ctx.inductiveDef():
            new_type = self.visit(inductiveCtx)
            types.append(new_type)
        
        # Vrací pole objektů !!! První jsou hypotézy
        return hypothesis + types

