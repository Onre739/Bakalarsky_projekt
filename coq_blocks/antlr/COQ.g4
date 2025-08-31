grammar COQ;

prog: (hypothesisDef* inductiveDef+)+ EOF;

hypothesisDef: 'Hypothesis' NAME ':' 'Type' '.';

inductiveDef: 'Inductive' NAME typeParameters* (':' ('Type' | 'Set'))? ':=' ( explicitConstructor+ | implicitConstructor+ 
                                                                            | explicitConsShort | implicitConsShort) '.';

typeParameters:   '(' NAME+ ':' 'Type' ')'
                | '{' NAME+ ':' 'Type' '}';

explicitConstructor: '|' NAME ':' explicitParam* NAME NAME?;

implicitConstructor: '|' NAME implicitParam*;

explicitConsShort: NAME ':' NAME NAME? explicitParam*;

implicitConsShort: NAME implicitParam*;

explicitParam: NAME NAME? '->';

implicitParam: '(' NAME+ ':' NAME NAME?')';


NAME: [a-zA-Z]+[0-9]*[_]?[a-zA-Z]*[0-9]*[']*; // Umožňuje _ jednou nebo vůbec a ' na konci názvu
WS: [ \t\r\n]+ -> skip; // Ignorování bílých znaků (mezery, tabulátory, nové řádky)