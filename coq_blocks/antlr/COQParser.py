# Generated from COQ.g4 by ANTLR 4.13.2
# encoding: utf-8
from antlr4 import *
from io import StringIO
import sys
if sys.version_info[1] > 5:
	from typing import TextIO
else:
	from typing.io import TextIO

def serializedATN():
    return [
        4,1,14,113,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,1,0,4,0,18,8,0,11,0,12,0,19,1,0,1,0,1,1,1,1,1,1,5,1,27,
        8,1,10,1,12,1,30,9,1,1,1,1,1,3,1,34,8,1,1,1,1,1,4,1,38,8,1,11,1,
        12,1,39,1,1,1,1,1,2,1,2,4,2,46,8,2,11,2,12,2,47,1,2,1,2,1,2,1,2,
        1,2,4,2,55,8,2,11,2,12,2,56,1,2,1,2,1,2,3,2,62,8,2,1,3,3,3,65,8,
        3,1,3,1,3,1,3,5,3,70,8,3,10,3,12,3,73,9,3,1,3,1,3,3,3,77,8,3,1,3,
        1,3,5,3,81,8,3,10,3,12,3,84,9,3,3,3,86,8,3,1,4,1,4,1,4,1,5,1,5,4,
        5,93,8,5,11,5,12,5,94,1,5,1,5,1,5,1,5,1,6,4,6,102,8,6,11,6,12,6,
        103,1,7,1,7,1,7,1,7,1,7,3,7,111,8,7,1,7,0,0,8,0,2,4,6,8,10,12,14,
        0,1,1,0,3,4,119,0,17,1,0,0,0,2,23,1,0,0,0,4,61,1,0,0,0,6,85,1,0,
        0,0,8,87,1,0,0,0,10,90,1,0,0,0,12,101,1,0,0,0,14,110,1,0,0,0,16,
        18,3,2,1,0,17,16,1,0,0,0,18,19,1,0,0,0,19,17,1,0,0,0,19,20,1,0,0,
        0,20,21,1,0,0,0,21,22,5,0,0,1,22,1,1,0,0,0,23,24,5,1,0,0,24,28,5,
        13,0,0,25,27,3,4,2,0,26,25,1,0,0,0,27,30,1,0,0,0,28,26,1,0,0,0,28,
        29,1,0,0,0,29,33,1,0,0,0,30,28,1,0,0,0,31,32,5,2,0,0,32,34,7,0,0,
        0,33,31,1,0,0,0,33,34,1,0,0,0,34,35,1,0,0,0,35,37,5,5,0,0,36,38,
        3,6,3,0,37,36,1,0,0,0,38,39,1,0,0,0,39,37,1,0,0,0,39,40,1,0,0,0,
        40,41,1,0,0,0,41,42,5,6,0,0,42,3,1,0,0,0,43,45,5,7,0,0,44,46,5,13,
        0,0,45,44,1,0,0,0,46,47,1,0,0,0,47,45,1,0,0,0,47,48,1,0,0,0,48,49,
        1,0,0,0,49,50,5,2,0,0,50,51,5,3,0,0,51,62,5,8,0,0,52,54,5,9,0,0,
        53,55,5,13,0,0,54,53,1,0,0,0,55,56,1,0,0,0,56,54,1,0,0,0,56,57,1,
        0,0,0,57,58,1,0,0,0,58,59,5,2,0,0,59,60,5,3,0,0,60,62,5,10,0,0,61,
        43,1,0,0,0,61,52,1,0,0,0,62,5,1,0,0,0,63,65,5,11,0,0,64,63,1,0,0,
        0,64,65,1,0,0,0,65,66,1,0,0,0,66,67,5,13,0,0,67,71,5,2,0,0,68,70,
        3,8,4,0,69,68,1,0,0,0,70,73,1,0,0,0,71,69,1,0,0,0,71,72,1,0,0,0,
        72,74,1,0,0,0,73,71,1,0,0,0,74,86,3,12,6,0,75,77,5,11,0,0,76,75,
        1,0,0,0,76,77,1,0,0,0,77,78,1,0,0,0,78,82,5,13,0,0,79,81,3,10,5,
        0,80,79,1,0,0,0,81,84,1,0,0,0,82,80,1,0,0,0,82,83,1,0,0,0,83,86,
        1,0,0,0,84,82,1,0,0,0,85,64,1,0,0,0,85,76,1,0,0,0,86,7,1,0,0,0,87,
        88,3,12,6,0,88,89,5,12,0,0,89,9,1,0,0,0,90,92,5,7,0,0,91,93,5,13,
        0,0,92,91,1,0,0,0,93,94,1,0,0,0,94,92,1,0,0,0,94,95,1,0,0,0,95,96,
        1,0,0,0,96,97,5,2,0,0,97,98,3,12,6,0,98,99,5,8,0,0,99,11,1,0,0,0,
        100,102,3,14,7,0,101,100,1,0,0,0,102,103,1,0,0,0,103,101,1,0,0,0,
        103,104,1,0,0,0,104,13,1,0,0,0,105,111,5,13,0,0,106,107,5,7,0,0,
        107,108,3,12,6,0,108,109,5,8,0,0,109,111,1,0,0,0,110,105,1,0,0,0,
        110,106,1,0,0,0,111,15,1,0,0,0,15,19,28,33,39,47,56,61,64,71,76,
        82,85,94,103,110
    ]

class COQParser ( Parser ):

    grammarFileName = "COQ.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "'Inductive'", "':'", "'Type'", "'Set'", 
                     "':='", "'.'", "'('", "')'", "'{'", "'}'", "'|'", "'->'" ]

    symbolicNames = [ "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "NAME", "WS" ]

    RULE_prog = 0
    RULE_inductiveDef = 1
    RULE_typeParameters = 2
    RULE_constructor = 3
    RULE_arrowParam = 4
    RULE_binderParam = 5
    RULE_type_expression = 6
    RULE_type_term = 7

    ruleNames =  [ "prog", "inductiveDef", "typeParameters", "constructor", 
                   "arrowParam", "binderParam", "type_expression", "type_term" ]

    EOF = Token.EOF
    T__0=1
    T__1=2
    T__2=3
    T__3=4
    T__4=5
    T__5=6
    T__6=7
    T__7=8
    T__8=9
    T__9=10
    T__10=11
    T__11=12
    NAME=13
    WS=14

    def __init__(self, input:TokenStream, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.13.2")
        self._interp = ParserATNSimulator(self, self.atn, self.decisionsToDFA, self.sharedContextCache)
        self._predicates = None




    class ProgContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def EOF(self):
            return self.getToken(COQParser.EOF, 0)

        def inductiveDef(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(COQParser.InductiveDefContext)
            else:
                return self.getTypedRuleContext(COQParser.InductiveDefContext,i)


        def getRuleIndex(self):
            return COQParser.RULE_prog

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterProg" ):
                listener.enterProg(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitProg" ):
                listener.exitProg(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitProg" ):
                return visitor.visitProg(self)
            else:
                return visitor.visitChildren(self)




    def prog(self):

        localctx = COQParser.ProgContext(self, self._ctx, self.state)
        self.enterRule(localctx, 0, self.RULE_prog)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 17 
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while True:
                self.state = 16
                self.inductiveDef()
                self.state = 19 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if not (_la==1):
                    break

            self.state = 21
            self.match(COQParser.EOF)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class InductiveDefContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def NAME(self):
            return self.getToken(COQParser.NAME, 0)

        def typeParameters(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(COQParser.TypeParametersContext)
            else:
                return self.getTypedRuleContext(COQParser.TypeParametersContext,i)


        def constructor(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(COQParser.ConstructorContext)
            else:
                return self.getTypedRuleContext(COQParser.ConstructorContext,i)


        def getRuleIndex(self):
            return COQParser.RULE_inductiveDef

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterInductiveDef" ):
                listener.enterInductiveDef(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitInductiveDef" ):
                listener.exitInductiveDef(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitInductiveDef" ):
                return visitor.visitInductiveDef(self)
            else:
                return visitor.visitChildren(self)




    def inductiveDef(self):

        localctx = COQParser.InductiveDefContext(self, self._ctx, self.state)
        self.enterRule(localctx, 2, self.RULE_inductiveDef)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 23
            self.match(COQParser.T__0)
            self.state = 24
            self.match(COQParser.NAME)
            self.state = 28
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while _la==7 or _la==9:
                self.state = 25
                self.typeParameters()
                self.state = 30
                self._errHandler.sync(self)
                _la = self._input.LA(1)

            self.state = 33
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            if _la==2:
                self.state = 31
                self.match(COQParser.T__1)
                self.state = 32
                _la = self._input.LA(1)
                if not(_la==3 or _la==4):
                    self._errHandler.recoverInline(self)
                else:
                    self._errHandler.reportMatch(self)
                    self.consume()


            self.state = 35
            self.match(COQParser.T__4)
            self.state = 37 
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while True:
                self.state = 36
                self.constructor()
                self.state = 39 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if not (_la==11 or _la==13):
                    break

            self.state = 41
            self.match(COQParser.T__5)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class TypeParametersContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def NAME(self, i:int=None):
            if i is None:
                return self.getTokens(COQParser.NAME)
            else:
                return self.getToken(COQParser.NAME, i)

        def getRuleIndex(self):
            return COQParser.RULE_typeParameters

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterTypeParameters" ):
                listener.enterTypeParameters(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitTypeParameters" ):
                listener.exitTypeParameters(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitTypeParameters" ):
                return visitor.visitTypeParameters(self)
            else:
                return visitor.visitChildren(self)




    def typeParameters(self):

        localctx = COQParser.TypeParametersContext(self, self._ctx, self.state)
        self.enterRule(localctx, 4, self.RULE_typeParameters)
        self._la = 0 # Token type
        try:
            self.state = 61
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [7]:
                self.enterOuterAlt(localctx, 1)
                self.state = 43
                self.match(COQParser.T__6)
                self.state = 45 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                while True:
                    self.state = 44
                    self.match(COQParser.NAME)
                    self.state = 47 
                    self._errHandler.sync(self)
                    _la = self._input.LA(1)
                    if not (_la==13):
                        break

                self.state = 49
                self.match(COQParser.T__1)
                self.state = 50
                self.match(COQParser.T__2)
                self.state = 51
                self.match(COQParser.T__7)
                pass
            elif token in [9]:
                self.enterOuterAlt(localctx, 2)
                self.state = 52
                self.match(COQParser.T__8)
                self.state = 54 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                while True:
                    self.state = 53
                    self.match(COQParser.NAME)
                    self.state = 56 
                    self._errHandler.sync(self)
                    _la = self._input.LA(1)
                    if not (_la==13):
                        break

                self.state = 58
                self.match(COQParser.T__1)
                self.state = 59
                self.match(COQParser.T__2)
                self.state = 60
                self.match(COQParser.T__9)
                pass
            else:
                raise NoViableAltException(self)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ConstructorContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser


        def getRuleIndex(self):
            return COQParser.RULE_constructor

     
        def copyFrom(self, ctx:ParserRuleContext):
            super().copyFrom(ctx)



    class ArrowEntryContext(ConstructorContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a COQParser.ConstructorContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def NAME(self):
            return self.getToken(COQParser.NAME, 0)
        def type_expression(self):
            return self.getTypedRuleContext(COQParser.Type_expressionContext,0)

        def arrowParam(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(COQParser.ArrowParamContext)
            else:
                return self.getTypedRuleContext(COQParser.ArrowParamContext,i)


        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterArrowEntry" ):
                listener.enterArrowEntry(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitArrowEntry" ):
                listener.exitArrowEntry(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitArrowEntry" ):
                return visitor.visitArrowEntry(self)
            else:
                return visitor.visitChildren(self)


    class BinderEntryContext(ConstructorContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a COQParser.ConstructorContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def NAME(self):
            return self.getToken(COQParser.NAME, 0)
        def binderParam(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(COQParser.BinderParamContext)
            else:
                return self.getTypedRuleContext(COQParser.BinderParamContext,i)


        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterBinderEntry" ):
                listener.enterBinderEntry(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitBinderEntry" ):
                listener.exitBinderEntry(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitBinderEntry" ):
                return visitor.visitBinderEntry(self)
            else:
                return visitor.visitChildren(self)



    def constructor(self):

        localctx = COQParser.ConstructorContext(self, self._ctx, self.state)
        self.enterRule(localctx, 6, self.RULE_constructor)
        self._la = 0 # Token type
        try:
            self.state = 85
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,11,self._ctx)
            if la_ == 1:
                localctx = COQParser.ArrowEntryContext(self, localctx)
                self.enterOuterAlt(localctx, 1)
                self.state = 64
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if _la==11:
                    self.state = 63
                    self.match(COQParser.T__10)


                self.state = 66
                self.match(COQParser.NAME)
                self.state = 67
                self.match(COQParser.T__1)
                self.state = 71
                self._errHandler.sync(self)
                _alt = self._interp.adaptivePredict(self._input,8,self._ctx)
                while _alt!=2 and _alt!=ATN.INVALID_ALT_NUMBER:
                    if _alt==1:
                        self.state = 68
                        self.arrowParam() 
                    self.state = 73
                    self._errHandler.sync(self)
                    _alt = self._interp.adaptivePredict(self._input,8,self._ctx)

                self.state = 74
                self.type_expression()
                pass

            elif la_ == 2:
                localctx = COQParser.BinderEntryContext(self, localctx)
                self.enterOuterAlt(localctx, 2)
                self.state = 76
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if _la==11:
                    self.state = 75
                    self.match(COQParser.T__10)


                self.state = 78
                self.match(COQParser.NAME)
                self.state = 82
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                while _la==7:
                    self.state = 79
                    self.binderParam()
                    self.state = 84
                    self._errHandler.sync(self)
                    _la = self._input.LA(1)

                pass


        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ArrowParamContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def type_expression(self):
            return self.getTypedRuleContext(COQParser.Type_expressionContext,0)


        def getRuleIndex(self):
            return COQParser.RULE_arrowParam

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterArrowParam" ):
                listener.enterArrowParam(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitArrowParam" ):
                listener.exitArrowParam(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitArrowParam" ):
                return visitor.visitArrowParam(self)
            else:
                return visitor.visitChildren(self)




    def arrowParam(self):

        localctx = COQParser.ArrowParamContext(self, self._ctx, self.state)
        self.enterRule(localctx, 8, self.RULE_arrowParam)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 87
            self.type_expression()
            self.state = 88
            self.match(COQParser.T__11)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class BinderParamContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def type_expression(self):
            return self.getTypedRuleContext(COQParser.Type_expressionContext,0)


        def NAME(self, i:int=None):
            if i is None:
                return self.getTokens(COQParser.NAME)
            else:
                return self.getToken(COQParser.NAME, i)

        def getRuleIndex(self):
            return COQParser.RULE_binderParam

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterBinderParam" ):
                listener.enterBinderParam(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitBinderParam" ):
                listener.exitBinderParam(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitBinderParam" ):
                return visitor.visitBinderParam(self)
            else:
                return visitor.visitChildren(self)




    def binderParam(self):

        localctx = COQParser.BinderParamContext(self, self._ctx, self.state)
        self.enterRule(localctx, 10, self.RULE_binderParam)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 90
            self.match(COQParser.T__6)
            self.state = 92 
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while True:
                self.state = 91
                self.match(COQParser.NAME)
                self.state = 94 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if not (_la==13):
                    break

            self.state = 96
            self.match(COQParser.T__1)
            self.state = 97
            self.type_expression()
            self.state = 98
            self.match(COQParser.T__7)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class Type_expressionContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def type_term(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(COQParser.Type_termContext)
            else:
                return self.getTypedRuleContext(COQParser.Type_termContext,i)


        def getRuleIndex(self):
            return COQParser.RULE_type_expression

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterType_expression" ):
                listener.enterType_expression(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitType_expression" ):
                listener.exitType_expression(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitType_expression" ):
                return visitor.visitType_expression(self)
            else:
                return visitor.visitChildren(self)




    def type_expression(self):

        localctx = COQParser.Type_expressionContext(self, self._ctx, self.state)
        self.enterRule(localctx, 12, self.RULE_type_expression)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 101 
            self._errHandler.sync(self)
            _alt = 1
            while _alt!=2 and _alt!=ATN.INVALID_ALT_NUMBER:
                if _alt == 1:
                    self.state = 100
                    self.type_term()

                else:
                    raise NoViableAltException(self)
                self.state = 103 
                self._errHandler.sync(self)
                _alt = self._interp.adaptivePredict(self._input,13,self._ctx)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class Type_termContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser


        def getRuleIndex(self):
            return COQParser.RULE_type_term

     
        def copyFrom(self, ctx:ParserRuleContext):
            super().copyFrom(ctx)



    class TypeTermParensContext(Type_termContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a COQParser.Type_termContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def type_expression(self):
            return self.getTypedRuleContext(COQParser.Type_expressionContext,0)


        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterTypeTermParens" ):
                listener.enterTypeTermParens(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitTypeTermParens" ):
                listener.exitTypeTermParens(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitTypeTermParens" ):
                return visitor.visitTypeTermParens(self)
            else:
                return visitor.visitChildren(self)


    class TypeTermNameContext(Type_termContext):

        def __init__(self, parser, ctx:ParserRuleContext): # actually a COQParser.Type_termContext
            super().__init__(parser)
            self.copyFrom(ctx)

        def NAME(self):
            return self.getToken(COQParser.NAME, 0)

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterTypeTermName" ):
                listener.enterTypeTermName(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitTypeTermName" ):
                listener.exitTypeTermName(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitTypeTermName" ):
                return visitor.visitTypeTermName(self)
            else:
                return visitor.visitChildren(self)



    def type_term(self):

        localctx = COQParser.Type_termContext(self, self._ctx, self.state)
        self.enterRule(localctx, 14, self.RULE_type_term)
        try:
            self.state = 110
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [13]:
                localctx = COQParser.TypeTermNameContext(self, localctx)
                self.enterOuterAlt(localctx, 1)
                self.state = 105
                self.match(COQParser.NAME)
                pass
            elif token in [7]:
                localctx = COQParser.TypeTermParensContext(self, localctx)
                self.enterOuterAlt(localctx, 2)
                self.state = 106
                self.match(COQParser.T__6)
                self.state = 107
                self.type_expression()
                self.state = 108
                self.match(COQParser.T__7)
                pass
            else:
                raise NoViableAltException(self)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx





