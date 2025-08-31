import sys
from antlr4 import *
from .COQLexer import COQLexer
from .COQParser import COQParser
from .MyVisitor import MyVisitor


def main(string):
    input_stream = InputStream(string)
    lexer = COQLexer(input_stream)
    stream = CommonTokenStream(lexer)
    parser = COQParser(stream)
    tree = parser.prog()
    print("Parse tree:", tree.toStringTree(recog=parser))  # Vytiskne parsovací strom
    visitor = MyVisitor()
    objResponse = visitor.visit(tree)

    print("ObjResponse:")
    for i in objResponse:
        print(i)
    
    return objResponse
