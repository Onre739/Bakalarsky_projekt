import sys
from antlr4 import *
from .COQLexer import COQLexer
from .COQParser import COQParser
from .MyVisitor import MyVisitor

from antlr4.error.ErrorListener import ErrorListener
from antlr4.error.ErrorStrategy import BailErrorStrategy

def process_coq_code(string):
    input_stream = InputStream(string)

    lexer = COQLexer(input_stream)
    stream = CommonTokenStream(lexer)

    parser = COQParser(stream)
    parser.removeErrorListeners()
    error_listener = CollectingErrorListener()
    parser.addErrorListener(error_listener)
    parser._errHandler = BailErrorStrategy()

    tree = parser.prog()

    if error_listener.errors:
        raise ValueError("Syntax error: " + " | ".join(error_listener.errors))

    visitor = MyVisitor()
    return visitor.visit(tree)

class CollectingErrorListener(ErrorListener):
    def __init__(self):
        self.errors = []

    def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e):
        self.errors.append(f"Line {line}:{column} - {msg}")

