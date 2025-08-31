import sys
from antlr4 import *
from COQLexer import COQLexer
from COQParser import COQParser

def print_tree(node, depth=0):
    """ Rekurzivně tiskne syntaktický strom. """
    indent = '  ' * depth
    if isinstance(node, TerminalNode):
        print(f"{indent}TerminalNode: {node.getText()}")
    else:
        rule_name = COQParser.ruleNames[node.getRuleIndex()]
        print(f"{indent}Rule: {rule_name}")
        for child in node.getChildren():
            print_tree(child, depth + 1)

def main():
    lexer = COQLexer(StdinStream())  # Instance lexéru
    stream = CommonTokenStream(lexer)  # Stream tokenů z lexéru
    parser = COQParser(stream)  # Instance parseru
    tree = parser.prog()  # Začínáme analýzou pravidla 'prog' definované v gramatice

    # Tisk syntaktického stromu
    print_tree(tree)

if __name__ == '__main__':
    main()
