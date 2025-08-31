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
        4,1,15,152,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,2,8,7,8,2,9,7,9,1,0,5,0,22,8,0,10,0,12,0,25,9,0,1,0,4,
        0,28,8,0,11,0,12,0,29,4,0,32,8,0,11,0,12,0,33,1,0,1,0,1,1,1,1,1,
        1,1,1,1,1,1,1,1,2,1,2,1,2,5,2,47,8,2,10,2,12,2,50,9,2,1,2,1,2,3,
        2,54,8,2,1,2,1,2,4,2,58,8,2,11,2,12,2,59,1,2,4,2,63,8,2,11,2,12,
        2,64,1,2,1,2,3,2,69,8,2,1,2,1,2,1,3,1,3,4,3,75,8,3,11,3,12,3,76,
        1,3,1,3,1,3,1,3,1,3,4,3,84,8,3,11,3,12,3,85,1,3,1,3,1,3,3,3,91,8,
        3,1,4,1,4,1,4,1,4,5,4,97,8,4,10,4,12,4,100,9,4,1,4,1,4,3,4,104,8,
        4,1,5,1,5,1,5,5,5,109,8,5,10,5,12,5,112,9,5,1,6,1,6,1,6,1,6,3,6,
        118,8,6,1,6,5,6,121,8,6,10,6,12,6,124,9,6,1,7,1,7,5,7,128,8,7,10,
        7,12,7,131,9,7,1,8,1,8,3,8,135,8,8,1,8,1,8,1,9,1,9,4,9,141,8,9,11,
        9,12,9,142,1,9,1,9,1,9,3,9,148,8,9,1,9,1,9,1,9,0,0,10,0,2,4,6,8,
        10,12,14,16,18,0,1,2,0,3,3,6,6,163,0,31,1,0,0,0,2,37,1,0,0,0,4,43,
        1,0,0,0,6,90,1,0,0,0,8,92,1,0,0,0,10,105,1,0,0,0,12,113,1,0,0,0,
        14,125,1,0,0,0,16,132,1,0,0,0,18,138,1,0,0,0,20,22,3,2,1,0,21,20,
        1,0,0,0,22,25,1,0,0,0,23,21,1,0,0,0,23,24,1,0,0,0,24,27,1,0,0,0,
        25,23,1,0,0,0,26,28,3,4,2,0,27,26,1,0,0,0,28,29,1,0,0,0,29,27,1,
        0,0,0,29,30,1,0,0,0,30,32,1,0,0,0,31,23,1,0,0,0,32,33,1,0,0,0,33,
        31,1,0,0,0,33,34,1,0,0,0,34,35,1,0,0,0,35,36,5,0,0,1,36,1,1,0,0,
        0,37,38,5,1,0,0,38,39,5,14,0,0,39,40,5,2,0,0,40,41,5,3,0,0,41,42,
        5,4,0,0,42,3,1,0,0,0,43,44,5,5,0,0,44,48,5,14,0,0,45,47,3,6,3,0,
        46,45,1,0,0,0,47,50,1,0,0,0,48,46,1,0,0,0,48,49,1,0,0,0,49,53,1,
        0,0,0,50,48,1,0,0,0,51,52,5,2,0,0,52,54,7,0,0,0,53,51,1,0,0,0,53,
        54,1,0,0,0,54,55,1,0,0,0,55,68,5,7,0,0,56,58,3,8,4,0,57,56,1,0,0,
        0,58,59,1,0,0,0,59,57,1,0,0,0,59,60,1,0,0,0,60,69,1,0,0,0,61,63,
        3,10,5,0,62,61,1,0,0,0,63,64,1,0,0,0,64,62,1,0,0,0,64,65,1,0,0,0,
        65,69,1,0,0,0,66,69,3,12,6,0,67,69,3,14,7,0,68,57,1,0,0,0,68,62,
        1,0,0,0,68,66,1,0,0,0,68,67,1,0,0,0,69,70,1,0,0,0,70,71,5,4,0,0,
        71,5,1,0,0,0,72,74,5,8,0,0,73,75,5,14,0,0,74,73,1,0,0,0,75,76,1,
        0,0,0,76,74,1,0,0,0,76,77,1,0,0,0,77,78,1,0,0,0,78,79,5,2,0,0,79,
        80,5,3,0,0,80,91,5,9,0,0,81,83,5,10,0,0,82,84,5,14,0,0,83,82,1,0,
        0,0,84,85,1,0,0,0,85,83,1,0,0,0,85,86,1,0,0,0,86,87,1,0,0,0,87,88,
        5,2,0,0,88,89,5,3,0,0,89,91,5,11,0,0,90,72,1,0,0,0,90,81,1,0,0,0,
        91,7,1,0,0,0,92,93,5,12,0,0,93,94,5,14,0,0,94,98,5,2,0,0,95,97,3,
        16,8,0,96,95,1,0,0,0,97,100,1,0,0,0,98,96,1,0,0,0,98,99,1,0,0,0,
        99,101,1,0,0,0,100,98,1,0,0,0,101,103,5,14,0,0,102,104,5,14,0,0,
        103,102,1,0,0,0,103,104,1,0,0,0,104,9,1,0,0,0,105,106,5,12,0,0,106,
        110,5,14,0,0,107,109,3,18,9,0,108,107,1,0,0,0,109,112,1,0,0,0,110,
        108,1,0,0,0,110,111,1,0,0,0,111,11,1,0,0,0,112,110,1,0,0,0,113,114,
        5,14,0,0,114,115,5,2,0,0,115,117,5,14,0,0,116,118,5,14,0,0,117,116,
        1,0,0,0,117,118,1,0,0,0,118,122,1,0,0,0,119,121,3,16,8,0,120,119,
        1,0,0,0,121,124,1,0,0,0,122,120,1,0,0,0,122,123,1,0,0,0,123,13,1,
        0,0,0,124,122,1,0,0,0,125,129,5,14,0,0,126,128,3,18,9,0,127,126,
        1,0,0,0,128,131,1,0,0,0,129,127,1,0,0,0,129,130,1,0,0,0,130,15,1,
        0,0,0,131,129,1,0,0,0,132,134,5,14,0,0,133,135,5,14,0,0,134,133,
        1,0,0,0,134,135,1,0,0,0,135,136,1,0,0,0,136,137,5,13,0,0,137,17,
        1,0,0,0,138,140,5,8,0,0,139,141,5,14,0,0,140,139,1,0,0,0,141,142,
        1,0,0,0,142,140,1,0,0,0,142,143,1,0,0,0,143,144,1,0,0,0,144,145,
        5,2,0,0,145,147,5,14,0,0,146,148,5,14,0,0,147,146,1,0,0,0,147,148,
        1,0,0,0,148,149,1,0,0,0,149,150,5,9,0,0,150,19,1,0,0,0,20,23,29,
        33,48,53,59,64,68,76,85,90,98,103,110,117,122,129,134,142,147
    ]

class COQParser ( Parser ):

    grammarFileName = "COQ.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "'Hypothesis'", "':'", "'Type'", "'.'", 
                     "'Inductive'", "'Set'", "':='", "'('", "')'", "'{'", 
                     "'}'", "'|'", "'->'" ]

    symbolicNames = [ "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "NAME", "WS" ]

    RULE_prog = 0
    RULE_hypothesisDef = 1
    RULE_inductiveDef = 2
    RULE_typeParameters = 3
    RULE_explicitConstructor = 4
    RULE_implicitConstructor = 5
    RULE_explicitConsShort = 6
    RULE_implicitConsShort = 7
    RULE_explicitParam = 8
    RULE_implicitParam = 9

    ruleNames =  [ "prog", "hypothesisDef", "inductiveDef", "typeParameters", 
                   "explicitConstructor", "implicitConstructor", "explicitConsShort", 
                   "implicitConsShort", "explicitParam", "implicitParam" ]

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
    T__12=13
    NAME=14
    WS=15

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

        def hypothesisDef(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(COQParser.HypothesisDefContext)
            else:
                return self.getTypedRuleContext(COQParser.HypothesisDefContext,i)


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
            self.state = 31 
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while True:
                self.state = 23
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                while _la==1:
                    self.state = 20
                    self.hypothesisDef()
                    self.state = 25
                    self._errHandler.sync(self)
                    _la = self._input.LA(1)

                self.state = 27 
                self._errHandler.sync(self)
                _alt = 1
                while _alt!=2 and _alt!=ATN.INVALID_ALT_NUMBER:
                    if _alt == 1:
                        self.state = 26
                        self.inductiveDef()

                    else:
                        raise NoViableAltException(self)
                    self.state = 29 
                    self._errHandler.sync(self)
                    _alt = self._interp.adaptivePredict(self._input,1,self._ctx)

                self.state = 33 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if not (_la==1 or _la==5):
                    break

            self.state = 35
            self.match(COQParser.EOF)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class HypothesisDefContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def NAME(self):
            return self.getToken(COQParser.NAME, 0)

        def getRuleIndex(self):
            return COQParser.RULE_hypothesisDef

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterHypothesisDef" ):
                listener.enterHypothesisDef(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitHypothesisDef" ):
                listener.exitHypothesisDef(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitHypothesisDef" ):
                return visitor.visitHypothesisDef(self)
            else:
                return visitor.visitChildren(self)




    def hypothesisDef(self):

        localctx = COQParser.HypothesisDefContext(self, self._ctx, self.state)
        self.enterRule(localctx, 2, self.RULE_hypothesisDef)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 37
            self.match(COQParser.T__0)
            self.state = 38
            self.match(COQParser.NAME)
            self.state = 39
            self.match(COQParser.T__1)
            self.state = 40
            self.match(COQParser.T__2)
            self.state = 41
            self.match(COQParser.T__3)
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

        def explicitConsShort(self):
            return self.getTypedRuleContext(COQParser.ExplicitConsShortContext,0)


        def implicitConsShort(self):
            return self.getTypedRuleContext(COQParser.ImplicitConsShortContext,0)


        def typeParameters(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(COQParser.TypeParametersContext)
            else:
                return self.getTypedRuleContext(COQParser.TypeParametersContext,i)


        def explicitConstructor(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(COQParser.ExplicitConstructorContext)
            else:
                return self.getTypedRuleContext(COQParser.ExplicitConstructorContext,i)


        def implicitConstructor(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(COQParser.ImplicitConstructorContext)
            else:
                return self.getTypedRuleContext(COQParser.ImplicitConstructorContext,i)


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
        self.enterRule(localctx, 4, self.RULE_inductiveDef)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 43
            self.match(COQParser.T__4)
            self.state = 44
            self.match(COQParser.NAME)
            self.state = 48
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while _la==8 or _la==10:
                self.state = 45
                self.typeParameters()
                self.state = 50
                self._errHandler.sync(self)
                _la = self._input.LA(1)

            self.state = 53
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            if _la==2:
                self.state = 51
                self.match(COQParser.T__1)
                self.state = 52
                _la = self._input.LA(1)
                if not(_la==3 or _la==6):
                    self._errHandler.recoverInline(self)
                else:
                    self._errHandler.reportMatch(self)
                    self.consume()


            self.state = 55
            self.match(COQParser.T__6)
            self.state = 68
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,7,self._ctx)
            if la_ == 1:
                self.state = 57 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                while True:
                    self.state = 56
                    self.explicitConstructor()
                    self.state = 59 
                    self._errHandler.sync(self)
                    _la = self._input.LA(1)
                    if not (_la==12):
                        break

                pass

            elif la_ == 2:
                self.state = 62 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                while True:
                    self.state = 61
                    self.implicitConstructor()
                    self.state = 64 
                    self._errHandler.sync(self)
                    _la = self._input.LA(1)
                    if not (_la==12):
                        break

                pass

            elif la_ == 3:
                self.state = 66
                self.explicitConsShort()
                pass

            elif la_ == 4:
                self.state = 67
                self.implicitConsShort()
                pass


            self.state = 70
            self.match(COQParser.T__3)
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
        self.enterRule(localctx, 6, self.RULE_typeParameters)
        self._la = 0 # Token type
        try:
            self.state = 90
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [8]:
                self.enterOuterAlt(localctx, 1)
                self.state = 72
                self.match(COQParser.T__7)
                self.state = 74 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                while True:
                    self.state = 73
                    self.match(COQParser.NAME)
                    self.state = 76 
                    self._errHandler.sync(self)
                    _la = self._input.LA(1)
                    if not (_la==14):
                        break

                self.state = 78
                self.match(COQParser.T__1)
                self.state = 79
                self.match(COQParser.T__2)
                self.state = 80
                self.match(COQParser.T__8)
                pass
            elif token in [10]:
                self.enterOuterAlt(localctx, 2)
                self.state = 81
                self.match(COQParser.T__9)
                self.state = 83 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                while True:
                    self.state = 82
                    self.match(COQParser.NAME)
                    self.state = 85 
                    self._errHandler.sync(self)
                    _la = self._input.LA(1)
                    if not (_la==14):
                        break

                self.state = 87
                self.match(COQParser.T__1)
                self.state = 88
                self.match(COQParser.T__2)
                self.state = 89
                self.match(COQParser.T__10)
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


    class ExplicitConstructorContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def NAME(self, i:int=None):
            if i is None:
                return self.getTokens(COQParser.NAME)
            else:
                return self.getToken(COQParser.NAME, i)

        def explicitParam(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(COQParser.ExplicitParamContext)
            else:
                return self.getTypedRuleContext(COQParser.ExplicitParamContext,i)


        def getRuleIndex(self):
            return COQParser.RULE_explicitConstructor

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterExplicitConstructor" ):
                listener.enterExplicitConstructor(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitExplicitConstructor" ):
                listener.exitExplicitConstructor(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitExplicitConstructor" ):
                return visitor.visitExplicitConstructor(self)
            else:
                return visitor.visitChildren(self)




    def explicitConstructor(self):

        localctx = COQParser.ExplicitConstructorContext(self, self._ctx, self.state)
        self.enterRule(localctx, 8, self.RULE_explicitConstructor)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 92
            self.match(COQParser.T__11)
            self.state = 93
            self.match(COQParser.NAME)
            self.state = 94
            self.match(COQParser.T__1)
            self.state = 98
            self._errHandler.sync(self)
            _alt = self._interp.adaptivePredict(self._input,11,self._ctx)
            while _alt!=2 and _alt!=ATN.INVALID_ALT_NUMBER:
                if _alt==1:
                    self.state = 95
                    self.explicitParam() 
                self.state = 100
                self._errHandler.sync(self)
                _alt = self._interp.adaptivePredict(self._input,11,self._ctx)

            self.state = 101
            self.match(COQParser.NAME)
            self.state = 103
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            if _la==14:
                self.state = 102
                self.match(COQParser.NAME)


        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ImplicitConstructorContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def NAME(self):
            return self.getToken(COQParser.NAME, 0)

        def implicitParam(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(COQParser.ImplicitParamContext)
            else:
                return self.getTypedRuleContext(COQParser.ImplicitParamContext,i)


        def getRuleIndex(self):
            return COQParser.RULE_implicitConstructor

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterImplicitConstructor" ):
                listener.enterImplicitConstructor(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitImplicitConstructor" ):
                listener.exitImplicitConstructor(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitImplicitConstructor" ):
                return visitor.visitImplicitConstructor(self)
            else:
                return visitor.visitChildren(self)




    def implicitConstructor(self):

        localctx = COQParser.ImplicitConstructorContext(self, self._ctx, self.state)
        self.enterRule(localctx, 10, self.RULE_implicitConstructor)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 105
            self.match(COQParser.T__11)
            self.state = 106
            self.match(COQParser.NAME)
            self.state = 110
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while _la==8:
                self.state = 107
                self.implicitParam()
                self.state = 112
                self._errHandler.sync(self)
                _la = self._input.LA(1)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ExplicitConsShortContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def NAME(self, i:int=None):
            if i is None:
                return self.getTokens(COQParser.NAME)
            else:
                return self.getToken(COQParser.NAME, i)

        def explicitParam(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(COQParser.ExplicitParamContext)
            else:
                return self.getTypedRuleContext(COQParser.ExplicitParamContext,i)


        def getRuleIndex(self):
            return COQParser.RULE_explicitConsShort

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterExplicitConsShort" ):
                listener.enterExplicitConsShort(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitExplicitConsShort" ):
                listener.exitExplicitConsShort(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitExplicitConsShort" ):
                return visitor.visitExplicitConsShort(self)
            else:
                return visitor.visitChildren(self)




    def explicitConsShort(self):

        localctx = COQParser.ExplicitConsShortContext(self, self._ctx, self.state)
        self.enterRule(localctx, 12, self.RULE_explicitConsShort)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 113
            self.match(COQParser.NAME)
            self.state = 114
            self.match(COQParser.T__1)
            self.state = 115
            self.match(COQParser.NAME)
            self.state = 117
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,14,self._ctx)
            if la_ == 1:
                self.state = 116
                self.match(COQParser.NAME)


            self.state = 122
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while _la==14:
                self.state = 119
                self.explicitParam()
                self.state = 124
                self._errHandler.sync(self)
                _la = self._input.LA(1)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ImplicitConsShortContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def NAME(self):
            return self.getToken(COQParser.NAME, 0)

        def implicitParam(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(COQParser.ImplicitParamContext)
            else:
                return self.getTypedRuleContext(COQParser.ImplicitParamContext,i)


        def getRuleIndex(self):
            return COQParser.RULE_implicitConsShort

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterImplicitConsShort" ):
                listener.enterImplicitConsShort(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitImplicitConsShort" ):
                listener.exitImplicitConsShort(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitImplicitConsShort" ):
                return visitor.visitImplicitConsShort(self)
            else:
                return visitor.visitChildren(self)




    def implicitConsShort(self):

        localctx = COQParser.ImplicitConsShortContext(self, self._ctx, self.state)
        self.enterRule(localctx, 14, self.RULE_implicitConsShort)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 125
            self.match(COQParser.NAME)
            self.state = 129
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while _la==8:
                self.state = 126
                self.implicitParam()
                self.state = 131
                self._errHandler.sync(self)
                _la = self._input.LA(1)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ExplicitParamContext(ParserRuleContext):
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
            return COQParser.RULE_explicitParam

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterExplicitParam" ):
                listener.enterExplicitParam(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitExplicitParam" ):
                listener.exitExplicitParam(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitExplicitParam" ):
                return visitor.visitExplicitParam(self)
            else:
                return visitor.visitChildren(self)




    def explicitParam(self):

        localctx = COQParser.ExplicitParamContext(self, self._ctx, self.state)
        self.enterRule(localctx, 16, self.RULE_explicitParam)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 132
            self.match(COQParser.NAME)
            self.state = 134
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            if _la==14:
                self.state = 133
                self.match(COQParser.NAME)


            self.state = 136
            self.match(COQParser.T__12)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ImplicitParamContext(ParserRuleContext):
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
            return COQParser.RULE_implicitParam

        def enterRule(self, listener:ParseTreeListener):
            if hasattr( listener, "enterImplicitParam" ):
                listener.enterImplicitParam(self)

        def exitRule(self, listener:ParseTreeListener):
            if hasattr( listener, "exitImplicitParam" ):
                listener.exitImplicitParam(self)

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitImplicitParam" ):
                return visitor.visitImplicitParam(self)
            else:
                return visitor.visitChildren(self)




    def implicitParam(self):

        localctx = COQParser.ImplicitParamContext(self, self._ctx, self.state)
        self.enterRule(localctx, 18, self.RULE_implicitParam)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 138
            self.match(COQParser.T__7)
            self.state = 140 
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            while True:
                self.state = 139
                self.match(COQParser.NAME)
                self.state = 142 
                self._errHandler.sync(self)
                _la = self._input.LA(1)
                if not (_la==14):
                    break

            self.state = 144
            self.match(COQParser.T__1)
            self.state = 145
            self.match(COQParser.NAME)
            self.state = 147
            self._errHandler.sync(self)
            _la = self._input.LA(1)
            if _la==14:
                self.state = 146
                self.match(COQParser.NAME)


            self.state = 149
            self.match(COQParser.T__8)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx





