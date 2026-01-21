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


    # Visit a parse tree produced by COQParser#inductiveDef.
    def visitInductiveDef(self, ctx:COQParser.InductiveDefContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#typeParameters.
    def visitTypeParameters(self, ctx:COQParser.TypeParametersContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#ArrowEntry.
    def visitArrowEntry(self, ctx:COQParser.ArrowEntryContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#BinderEntry.
    def visitBinderEntry(self, ctx:COQParser.BinderEntryContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#arrowParam.
    def visitArrowParam(self, ctx:COQParser.ArrowParamContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#binderParam.
    def visitBinderParam(self, ctx:COQParser.BinderParamContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#type_expression.
    def visitType_expression(self, ctx:COQParser.Type_expressionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#TypeTermName.
    def visitTypeTermName(self, ctx:COQParser.TypeTermNameContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by COQParser#TypeTermParens.
    def visitTypeTermParens(self, ctx:COQParser.TypeTermParensContext):
        return self.visitChildren(ctx)



del COQParser