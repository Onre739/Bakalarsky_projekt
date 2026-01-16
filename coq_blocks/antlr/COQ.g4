grammar COQ;

prog: inductiveDef+ EOF;

inductiveDef: 'Inductive' NAME typeParameters* (':' ('Type' | 'Set'))? ':=' 
              ( arrowConstructor+ | binderConstructor+ 
              | arrowConsShort | binderConsShort ) '.';

typeParameters:   '(' NAME+ ':' 'Type' ')'
                | '{' NAME+ ':' 'Type' '}';

// --- ARROW STYLE (Šipková forma) ---
arrowConstructor: '|' NAME ':' arrowParam* type_expression;
arrowConsShort:   NAME ':' arrowParam* type_expression;

arrowParam: type_expression '->';

// --- BINDER STYLE (Závorková forma) ---
binderConstructor: '|' NAME binderParam*;
binderConsShort:   NAME binderParam*;

binderParam: '(' NAME+ ':' type_expression ')'; 


type_expression: type_term+;
type_term: NAME                    # TypeTermName      
         | '(' type_expression ')' # TypeTermParens    
    ;

NAME: [a-zA-Z]+[0-9]*[_]?[a-zA-Z]*[0-9]*[']*; // Umožňuje _ jednou nebo vůbec a ' na konci názvu
WS: [ \t\r\n]+ -> skip; // Ignorování bílých znaků (mezery, tabulátory, nové řádky)