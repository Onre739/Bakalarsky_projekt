import sys
from antlr4 import *
from .COQLexer import COQLexer
from .COQParser import COQParser
from .MyVisitor import MyVisitor


def process_coq_code(string):
    input_stream = InputStream(string)
    
    lexer = COQLexer(input_stream)
    stream = CommonTokenStream(lexer)

    parser = COQParser(stream)
    tree = parser.prog()
    
    visitor = MyVisitor()
    parsed_objects = visitor.visit(tree)

    return parsed_objects