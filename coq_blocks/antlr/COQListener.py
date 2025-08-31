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


    # Enter a parse tree produced by COQParser#hypothesisDef.
    def enterHypothesisDef(self, ctx:COQParser.HypothesisDefContext):
        pass

    # Exit a parse tree produced by COQParser#hypothesisDef.
    def exitHypothesisDef(self, ctx:COQParser.HypothesisDefContext):
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


    # Enter a parse tree produced by COQParser#explicitConstructor.
    def enterExplicitConstructor(self, ctx:COQParser.ExplicitConstructorContext):
        pass

    # Exit a parse tree produced by COQParser#explicitConstructor.
    def exitExplicitConstructor(self, ctx:COQParser.ExplicitConstructorContext):
        pass


    # Enter a parse tree produced by COQParser#implicitConstructor.
    def enterImplicitConstructor(self, ctx:COQParser.ImplicitConstructorContext):
        pass

    # Exit a parse tree produced by COQParser#implicitConstructor.
    def exitImplicitConstructor(self, ctx:COQParser.ImplicitConstructorContext):
        pass


    # Enter a parse tree produced by COQParser#explicitConsShort.
    def enterExplicitConsShort(self, ctx:COQParser.ExplicitConsShortContext):
        pass

    # Exit a parse tree produced by COQParser#explicitConsShort.
    def exitExplicitConsShort(self, ctx:COQParser.ExplicitConsShortContext):
        pass


    # Enter a parse tree produced by COQParser#implicitConsShort.
    def enterImplicitConsShort(self, ctx:COQParser.ImplicitConsShortContext):
        pass

    # Exit a parse tree produced by COQParser#implicitConsShort.
    def exitImplicitConsShort(self, ctx:COQParser.ImplicitConsShortContext):
        pass


    # Enter a parse tree produced by COQParser#explicitParam.
    def enterExplicitParam(self, ctx:COQParser.ExplicitParamContext):
        pass

    # Exit a parse tree produced by COQParser#explicitParam.
    def exitExplicitParam(self, ctx:COQParser.ExplicitParamContext):
        pass


    # Enter a parse tree produced by COQParser#implicitParam.
    def enterImplicitParam(self, ctx:COQParser.ImplicitParamContext):
        pass

    # Exit a parse tree produced by COQParser#implicitParam.
    def exitImplicitParam(self, ctx:COQParser.ImplicitParamContext):
        pass



del COQParser