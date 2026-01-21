grammar COQ;

prog: inductiveDef+ EOF;
         
inductiveDef: 'Inductive' NAME typeParameters* (':' ('Type' | 'Set'))? ':=' 
              constructor+ '.';

typeParameters: '(' NAME+ ':' 'Type' ')'
              | '{' NAME+ ':' 'Type' '}'
              ;

constructor: ('|')? NAME ':' arrowParam* type_expression    # ArrowEntry
           | ('|')? NAME binderParam*                       # BinderEntry
           ;

arrowParam: type_expression '->';

binderParam: '(' NAME+ ':' type_expression ')'; 

type_expression: type_term+;
type_term: NAME                    # TypeTermName      
         | '(' type_expression ')' # TypeTermParens    
    ;

NAME: [a-zA-Z]+[0-9]*[_]?[a-zA-Z]*[0-9]*[']*; // Umožňuje _ jednou nebo vůbec a ' na konci názvu
WS: [ \t\r\n]+ -> skip; // Ignorování bílých znaků (mezery, tabulátory, nové řádky)