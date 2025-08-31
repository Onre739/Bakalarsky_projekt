# Generated from COQ.g4 by ANTLR 4.13.2
from antlr4 import *
if "." in __name__:
    from .COQParser import COQParser
else:
    from COQParser import COQParser

# This class defines a complete generic visitor for a parse tree produced by COQParser.

class COQVisitor(ParseTreeVisitor):

    # Visit a parse tree produced by COQParser#prog.
    def visitProg(self, ctx:COQParser.ProgContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#hypothesisDef.
    def visitHypothesisDef(self, ctx:COQParser.HypothesisDefContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#inductiveDef.
    def visitInductiveDef(self, ctx:COQParser.InductiveDefContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#typeParameters.
    def visitTypeParameters(self, ctx:COQParser.TypeParametersContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#explicitConstructor.
    def visitExplicitConstructor(self, ctx:COQParser.ExplicitConstructorContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#implicitConstructor.
    def visitImplicitConstructor(self, ctx:COQParser.ImplicitConstructorContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#explicitConsShort.
    def visitExplicitConsShort(self, ctx:COQParser.ExplicitConsShortContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#implicitConsShort.
    def visitImplicitConsShort(self, ctx:COQParser.ImplicitConsShortContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#explicitParam.
    def visitExplicitParam(self, ctx:COQParser.ExplicitParamContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#implicitParam.
    def visitImplicitParam(self, ctx:COQParser.ImplicitParamContext):
        return self.visitChildren(ctx)



del COQParser