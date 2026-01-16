# Generated from COQ.g4 by ANTLR 4.13.2
from antlr4 import *
if "." in __name__:
    from .COQParser import COQParser
else:
    from COQParser import COQParser

# This class defines a complete listener for a parse tree produced by COQParser.
class COQListener(ParseTreeListener):

    # Enter a parse tree produced by COQParser#prog.
    def enterProg(self, ctx:COQParser.ProgContext):
        pass

    # Exit a parse tree produced by COQParser#prog.
    def exitProg(self, ctx:COQParser.ProgContext):
        pass


    # Enter a parse tree produced by COQParser#inductiveDef.
    def enterInductiveDef(self, ctx:COQParser.InductiveDefContext):
        pass

    # Exit a parse tree produced by COQParser#inductiveDef.
    def exitInductiveDef(self, ctx:COQParser.InductiveDefContext):
        pass


    # Enter a parse tree produced by COQParser#typeParameters.
    def enterTypeParameters(self, ctx:COQParser.TypeParametersContext):
        pass

    # Exit a parse tree produced by COQParser#typeParameters.
    def exitTypeParameters(self, ctx:COQParser.TypeParametersContext):
        pass


    # Enter a parse tree produced by COQParser#arrowConstructor.
    def enterArrowConstructor(self, ctx:COQParser.ArrowConstructorContext):
        pass

    # Exit a parse tree produced by COQParser#arrowConstructor.
    def exitArrowConstructor(self, ctx:COQParser.ArrowConstructorContext):
        pass


    # Enter a parse tree produced by COQParser#arrowConsShort.
    def enterArrowConsShort(self, ctx:COQParser.ArrowConsShortContext):
        pass

    # Exit a parse tree produced by COQParser#arrowConsShort.
    def exitArrowConsShort(self, ctx:COQParser.ArrowConsShortContext):
        pass


    # Enter a parse tree produced by COQParser#arrowParam.
    def enterArrowParam(self, ctx:COQParser.ArrowParamContext):
        pass

    # Exit a parse tree produced by COQParser#arrowParam.
    def exitArrowParam(self, ctx:COQParser.ArrowParamContext):
        pass


    # Enter a parse tree produced by COQParser#binderConstructor.
    def enterBinderConstructor(self, ctx:COQParser.BinderConstructorContext):
        pass

    # Exit a parse tree produced by COQParser#binderConstructor.
    def exitBinderConstructor(self, ctx:COQParser.BinderConstructorContext):
        pass


    # Enter a parse tree produced by COQParser#binderConsShort.
    def enterBinderConsShort(self, ctx:COQParser.BinderConsShortContext):
        pass

    # Exit a parse tree produced by COQParser#binderConsShort.
    def exitBinderConsShort(self, ctx:COQParser.BinderConsShortContext):
        pass


    # Enter a parse tree produced by COQParser#binderParam.
    def enterBinderParam(self, ctx:COQParser.BinderParamContext):
        pass

    # Exit a parse tree produced by COQParser#binderParam.
    def exitBinderParam(self, ctx:COQParser.BinderParamContext):
        pass


    # Enter a parse tree produced by COQParser#type_expression.
    def enterType_expression(self, ctx:COQParser.Type_expressionContext):
        pass

    # Exit a parse tree produced by COQParser#type_expression.
    def exitType_expression(self, ctx:COQParser.Type_expressionContext):
        pass


    # Enter a parse tree produced by COQParser#TypeTermName.
    def enterTypeTermName(self, ctx:COQParser.TypeTermNameContext):
        pass

    # Exit a parse tree produced by COQParser#TypeTermName.
    def exitTypeTermName(self, ctx:COQParser.TypeTermNameContext):
        pass


    # Enter a parse tree produced by COQParser#TypeTermParens.
    def enterTypeTermParens(self, ctx:COQParser.TypeTermParensContext):
        pass

    # Exit a parse tree produced by COQParser#TypeTermParens.
    def exitTypeTermParens(self, ctx:COQParser.TypeTermParensContext):
        pass



del COQParser