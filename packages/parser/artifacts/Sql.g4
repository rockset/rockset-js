/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

grammar Sql;

tokens {
    DELIMITER
}

singleStatement
    : statement ';'* EOF
    ;

singleExpression
    : expression EOF
    ;

statement
    : query                                                            #statementDefault
    | INSERT INTO qualifiedName columnAliases? query                   #insertInto
    | SHOW COLUMNS (FROM | IN) tableQualifiedName callOptions?         #showColumns
    | DESCRIBE tableQualifiedName callOptions?                         #showColumns
    | DESC tableQualifiedName callOptions?                             #showColumns
    | EXPLAIN ANALYZE? ( '(' options=hintList ')' )? query             #explain
    ;

query
    :  jwith? queryNoWith
    ;

jwith
    : WITH RECURSIVE? namedQuery (',' namedQuery)*
    ;

queryNoWith
    : queryBody
      (ORDER BY sortItem (',' sortItem)*)?
      (LIMIT (limit=expression | ALL))?
      (OFFSET offset=expression)?
      hints?
    ;

hint:
      name=identifier ('=' value=hintValue)?
    ;

hintValue
    : fieldPath        #hintValueFieldPath
    | number           #hintValueNumber
    | string           #hintValueString
    | booleanValue     #hintValueBoolean
    ;

hintList
    : hint (',' hint)*
    ;

hints
    : HINT '(' hintList ')'
    ;

queryBody
    : queryTerm                                                                      #queryBodyDefault
    | '(' queryBody ')'                                                              #queryBodyParenthesized
    | left=queryBody op=(UNION | INTERSECT | EXCEPT) setQuantifier? right=queryBody  #queryBodySetOperation
    ;

queryTerm
    : querySpecification                   #queryTermDefault
    | TABLE tableQualifiedName             #table
    | VALUES expression (',' expression)*  #inlineTable
    | '(' queryNoWith  ')'                 #subquery
    ;

sortItem
    : expression ordering=(ASC | DESC)? (NULLS nullOrdering=(FIRST | LAST))?
    ;

querySpecification
    : SELECT setQuantifier? (selectItem (',' selectItem)* (',')?)?
      (FROM relation (',' relation)*)?
      (WHERE where=booleanExpression)?
      (GROUP BY groupBy)?
      (HAVING having=booleanExpression)?
    ;

groupBy
    : setQuantifier? groupingElement (',' groupingElement)*
    ;

groupingElement
    : groupingExpressions                                         #singleGroupingSet
    | ROLLUP '(' (expression (',' expression)*)? ')'              #rollup
    | CUBE '(' (expression (',' expression)*)? ')'                #cube
    | GROUPING SETS '(' groupingExpressions (',' groupingExpressions)* ')'              #multipleGroupingSets
    ;

groupingExpressions
    : '(' (expression (',' expression)*)? ')'
    | expression
    ;

namedQuery
    : name=identifier (columnAliases)? AS '(' query ')'
    ;

setQuantifier
    : DISTINCT
    | ALL
    ;

selectItem
    : expression (AS? identifier)?  #selectSingle
    | identifier '.' ASTERISK    #selectAll
    | ASTERISK                      #selectAll
    ;

relation
    : left=relation
      ( CROSS JOIN rightCross=sampledRelation
      | joinType JOIN rightOther=relation joinCriteria
      | NATURAL joinType JOIN rightNatural=sampledRelation
      )
      hints??                                     #joinRelation
    | sampledRelation hints??                      #relationDefault
    ;

joinType
    : INNER?
    | LEFT OUTER?
    | RIGHT OUTER?
    | FULL OUTER?
    ;

joinCriteria
    : ON booleanExpression
    | USING '(' identifier (',' identifier)* ')'
    ;

sampledRelation
    : aliasedRelation (
        TABLESAMPLE sampleType '(' percentage=(INTEGER_VALUE | DECIMAL_VALUE) ')'
      )?
    ;

sampleType
    : BERNOULLI
    | SYSTEM
    ;

aliasedRelation
    : relationPrimary (AS? identifier columnAliases?)?
    ;

columnAliases
    : '(' identifier (',' identifier)* ')'
    ;

relationPrimary
    : tableQualifiedName                                              #tableName
    | '(' query ')'                                                   #subqueryRelation
    | UNNEST '(' expression (AS? alias=identifier)?
                 (WITH ORDINALITY AS? ordinality=identifier)? ')'     #unnest
    | LATERAL '(' query ')'                                           #lateral
    | '(' relation ')'                                                #parenthesizedRelation
    ;

tablePrefix
    : '$' identifier '.'
    ;

tableWorkspace
    : (identifier '.')+
    ;

tableFieldPart
    : '.' identifier
    | glob='[*]'
    ;

tableField
    : ':' identifier (tableFieldPart)*
    ;

tableQualifiedName
    : tablePrefix? qualifiedName tableField?
    ;

fieldPathPart
    : '.' identifier
    | glob='[*]'
    | '[' INTEGER_VALUE ']'
    ;

fieldPath
    : identifier (fieldPathPart)*
    ;

expression
    : booleanExpression
    ;

booleanExpression
    : predicated                                                   #booleanDefault
    | NOT booleanExpression                                        #logicalNot
    | left=booleanExpression op=AND right=booleanExpression  #logicalBinary
    | left=booleanExpression op=OR right=booleanExpression   #logicalBinary
    ;

predicated
    : valueExpression predicate?
    ;

predicate
    : comparisonOperator right=valueExpression                            #comparison
    | comparisonOperator comparisonQuantifier '(' query ')'               #quantifiedComparison
    | NOT? BETWEEN lower=valueExpression AND upper=valueExpression        #between
    | NOT? IN '(' expression (',' expression)* ')'                        #inList
    | NOT? IN '(' query ')'                                               #inSubquery
    | NOT? LIKE pattern=valueExpression (ESCAPE escape=valueExpression)?  #like
    | IS NOT? XNULL                                                       #nullPredicate
    | IS NOT? UNDEFINED                                                   #undefinedPredicate
    | IS NOT? DISTINCT FROM right=valueExpression                         #distinctFrom
    ;

valueExpression
    : primaryExpression                                                                 #valueExpressionDefault
    | value=valueExpression AT TIME ZONE tz=valueExpression                 #atTimeZone
    | op=(MINUS | PLUS) valueExpression                                           #arithmeticUnary
    | left=valueExpression op=(ASTERISK | SLASH | PERCENT) right=valueExpression  #arithmeticBinary
    | left=valueExpression op=(PLUS | MINUS) right=valueExpression                #arithmeticBinary
    | left=valueExpression CONCAT right=valueExpression                                 #concatenation
    ;

primaryExpression
    : XNULL                                                                               #nullLiteral
    | UNDEFINED                                                                           #undefinedLiteral
    | NULL_VALUE                                                                          #nullValueLiteral
    | interval                                                                            #intervalLiteral
    | identifier string                                                                   #typeConstructor
    | DOUBLE_PRECISION string                                                             #typeConstructor
    | number                                                                              #numericLiteral
    | booleanValue                                                                        #booleanLiteral
    | string                                                                              #stringLiteral
    | ARRAY array                                                                         #arrayConstructor
    | array                                                                               #arrayConstructor
    | BINARY_LITERAL                                                                      #binaryLiteral
    | '?'                                                                                 #positionalParameter
    | ':' INTEGER_VALUE                                                                   #namedParameter
    | ':' identifier                                                                      #namedParameter
    | POSITION '(' needle=valueExpression IN haystack=valueExpression ')'                                 #position
    | qualifiedName '(' ASTERISK ')' filter? over?                                        #functionCall
    | qualifiedName '(' (setQuantifier? expression (',' expression)*)? ')' callOptions? filter? over?  #functionCall
    | '(' query ')'                                                                       #subqueryExpression
    // This is an extension to ANSI SQL, which considers EXISTS to be a <boolean expression>
    | EXISTS '(' query ')'                                                                #exists
    | CASE valueExpression whenClause+ (ELSE elseExpression=expression)? END              #simpleCase
    | CASE whenClause+ (ELSE elseExpression=expression)? END                              #searchedCase
    | (CAST | TRY_CAST | STATIC_CAST | TRY_STATIC_CAST) '(' expression AS type ')'        #cast
    | value=primaryExpression '::' type                                                   #colonCast
    | value=primaryExpression '[' index=valueExpression ']'                               #subscript
    | identifier                                                                          #columnReference
    | base=primaryExpression '.' fieldName=identifier                                     #dereference
    | SUBSTRING '(' expr=valueExpression FROM start=valueExpression (FOR len=valueExpression)? ')'       #substring
    | NORMALIZE '(' valueExpression (',' normalForm)? ')'                                 #normalize
    | EXTRACT '(' identifier FROM valueExpression ')'                                     #extract
    | '(' expression ')'                                                                  #parenthesizedExpression
    | GROUPING '(' (expression (',' expression)*)? ')'                              #groupingOperation
    | fun=dateFunctionName ('(' string? ')')?                                             #dateFunction
    ;

array
    : '[' (expression (',' expression)*)? ']'
    ;

string
    : STRING                             #basicStringLiteral
    | UNICODE_STR (UESCAPE STRING)?      #unicodeStringLiteral
    ;

comparisonOperator
    : EQ | NEQ | LT | LTE | GT | GTE
    ;

comparisonQuantifier
    : ALL | SOME | ANY
    ;

booleanValue
    : BOOL_TRUE | BOOL_FALSE
    ;

dateFunctionName
    : (CURRENT_DATE | CURRENT_DATETIME | CURRENT_TIME | CURRENT_TIMESTAMP)
    ;

interval
    : INTERVAL string from=intervalField (TO to=intervalField)?  #stringInterval
    | INTERVAL (PLUS | MINUS)? integralPart=INTEGER_VALUE ('.' fractionalPart=INTEGER_VALUE)? field=intervalField  #numericInterval
    | INTERVAL string  #stringOnlyInterval
    ;

intervalField
    : YEAR | MONTH | DAY | HOUR | MINUTE | SECOND
    ;

normalForm
    : NFD | NFC | NFKD | NFKC
    ;

type
    : ARRAY
    | MAP
    | baseType ('(' typeParameter (',' typeParameter)* ')')?
    ;

typeParameter
    : INTEGER_VALUE | type
    ;

baseType
    : DOUBLE_PRECISION
    | identifier
    ;

whenClause
    : WHEN condition=expression THEN result=expression
    ;

filter
    : FILTER '(' WHERE booleanExpression ')'
    ;

callOptions
    : OPTION '(' hintList ')'
    ;

over
    : OVER '('
        (PARTITION BY partition+=expression (',' partition+=expression)*)?
        (ORDER BY sortItem (',' sortItem)*)?
        windowFrame?
      ')'
    ;

windowFrame
    : frameType=RANGE start=frameBound
    | frameType=ROWS start=frameBound
    | frameType=RANGE BETWEEN start=frameBound AND end=frameBound
    | frameType=ROWS BETWEEN start=frameBound AND end=frameBound
    ;

frameBound
    : UNBOUNDED boundType=PRECEDING                 #unboundedFrame
    | UNBOUNDED boundType=FOLLOWING                 #unboundedFrame
    | CURRENT ROW                                   #currentRowBound
    | expression boundType=(PRECEDING | FOLLOWING)  #boundedFrame // expression should be unsignedLiteral
    ;

qualifiedName
    : identifier ('.' identifier)*
    ;

identifier
    : IDENTIFIER             #unquotedIdentifier
    | QUOTED_IDENTIFIER      #quotedIdentifier
    | nonReserved            #unquotedIdentifier
    | BACKQUOTED_IDENTIFIER  #backQuotedIdentifier
    ;

number
    : DECIMAL_VALUE  #decimalLiteral
    | INTEGER_VALUE  #integerLiteral
    ;

nonReserved
    // IMPORTANT: this rule must only contain tokens. Nested rules are not supported. See SqlParser.exitNonReserved
    : ADD | ALL | ANALYZE | ANY | ARRAY | ASC | AT
    | BERNOULLI
    | CALL | CASCADE | CATALOGS | COALESCE | COLUMN | COLUMNS | COMMENT | COMMIT | COMMITTED | CURRENT
    | DATA | DATE | DAY | DESC | DISTRIBUTED
    | EXCLUDING | EXPLAIN
    | FILTER | FIRST | FOLLOWING | FORMAT | FUNCTIONS
    | GRANT | GRANTS | GRAPHVIZ
    | HOUR
    | IF | INCLUDING | INPUT | INTEGER | INTERVAL | ISOLATION
    | LAST | LATERAL | LEVEL | LIMIT | LOGICAL
    | MAP | MINUTE | MONTH
    | NFC | NFD | NFKC | NFKD | NO | NULLIF | NULLS
    | OFFSET | ONLY | OPTION | ORDINALITY | OUTPUT | OVER
    | PARTITION | PARTITIONS | POSITION | PRECEDING | PRIVILEGES | PROPERTIES | PUBLIC
    | RANGE | READ | RENAME | REPEATABLE | REPLACE | RESET | RESTRICT | REVOKE | ROLLBACK | ROW | ROWS
    | SCHEMA | SCHEMAS | SECOND | SERIALIZABLE | SESSION | SET | SETS
    | SHOW | SMALLINT | SOME | START | STATS | SUBSTRING | SYSTEM
    | TABLES | TABLESAMPLE | TEXT | TIME | TIMESTAMP | TINYINT | TO | TRANSACTION | TRY_CAST | TYPE
    | UNBOUNDED | UNCOMMITTED | USE
    | VALIDATE | VALUES | VERBOSE | VIEW
    | WORK | WRITE
    | YEAR
    | ZONE
    ;

// IMPORTANT: if you add any more tokens here:
// - if they're allowed in identifiers, add them to `nonReserved` above
// - if they're NOT allowed in identifiers, add them to kSqlReservedWords
//   in cpp/util/string_util.cc

ADD: 'ADD';
ALL: 'ALL';
ALTER: 'ALTER';
ANALYZE: 'ANALYZE';
AND: 'AND';
ANY: 'ANY';
ARRAY: 'ARRAY';
AS: 'AS';
ASC: 'ASC';
AT: 'AT';
BERNOULLI: 'BERNOULLI';
BETWEEN: 'BETWEEN';
BY: 'BY';
CALL: 'CALL';
CASCADE: 'CASCADE';
CASE: 'CASE';
CAST: 'CAST';
CATALOGS: 'CATALOGS';
COALESCE: 'COALESCE';
COLUMN: 'COLUMN';
COLUMNS: 'COLUMNS';
COMMENT: 'COMMENT';
COMMIT: 'COMMIT';
COMMITTED: 'COMMITTED';
CONSTRAINT: 'CONSTRAINT';
CREATE: 'CREATE';
CROSS: 'CROSS';
CUBE: 'CUBE';
CURRENT: 'CURRENT';
CURRENT_DATE: 'CURRENT_DATE';
CURRENT_DATETIME: 'CURRENT_DATETIME';
CURRENT_TIME: 'CURRENT_TIME';
CURRENT_TIMESTAMP: 'CURRENT_TIMESTAMP';
DATA: 'DATA';
DATE: 'DATE';
DAY: 'DAY';
DEALLOCATE: 'DEALLOCATE';
DELETE: 'DELETE';
DESC: 'DESC';
DESCRIBE: 'DESCRIBE';
DISTINCT: 'DISTINCT';
DISTRIBUTED: 'DISTRIBUTED';
DROP: 'DROP';
ELSE: 'ELSE';
END: 'END';
ESCAPE: 'ESCAPE';
EXCEPT: 'EXCEPT';
EXCLUDING: 'EXCLUDING';
EXECUTE: 'EXECUTE';
EXISTS: 'EXISTS';
EXPLAIN: 'EXPLAIN';
EXTRACT: 'EXTRACT';
BOOL_FALSE: 'FALSE';
FILTER: 'FILTER';
FIRST: 'FIRST';
FOLLOWING: 'FOLLOWING';
FOR: 'FOR';
FORMAT: 'FORMAT';
FROM: 'FROM';
FULL: 'FULL';
FUNCTIONS: 'FUNCTIONS';
GRANT: 'GRANT';
GRANTS: 'GRANTS';
GRAPHVIZ: 'GRAPHVIZ';
GROUP: 'GROUP';
GROUPING: 'GROUPING';
HAVING: 'HAVING';
HINT: 'HINT';
HOUR: 'HOUR';
IF: 'IF';
IN: 'IN';
INCLUDING: 'INCLUDING';
INNER: 'INNER';
INPUT: 'INPUT';
INSERT: 'INSERT';
INTEGER: 'INTEGER';
INTERSECT: 'INTERSECT';
INTERVAL: 'INTERVAL';
INTO: 'INTO';
IS: 'IS';
ISOLATION: 'ISOLATION';
JOIN: 'JOIN';
LAST: 'LAST';
LATERAL: 'LATERAL';
LEFT: 'LEFT';
LEVEL: 'LEVEL';
LIKE: 'LIKE';
LIMIT: 'LIMIT';
LOCALTIME: 'LOCALTIME';
LOCALTIMESTAMP: 'LOCALTIMESTAMP';
LOGICAL: 'LOGICAL';
MAP: 'MAP';
MINUTE: 'MINUTE';
MONTH: 'MONTH';
NATURAL: 'NATURAL';
NFC : 'NFC';
NFD : 'NFD';
NFKC : 'NFKC';
NFKD : 'NFKD';
NO: 'NO';
NORMALIZE: 'NORMALIZE';
NOT: 'NOT';
XNULL: 'NULL';
NULLIF: 'NULLIF';
NULLS: 'NULLS';
NULL_VALUE: 'NULL_VALUE';
OFFSET: 'OFFSET';
ON: 'ON';
ONLY: 'ONLY';
OPTION: 'OPTION';
OR: 'OR';
ORDER: 'ORDER';
ORDINALITY: 'ORDINALITY';
OUTER: 'OUTER';
OUTPUT: 'OUTPUT';
OVER: 'OVER';
PARTITION: 'PARTITION';
PARTITIONS: 'PARTITIONS';
POSITION: 'POSITION';
PRECEDING: 'PRECEDING';
PREPARE: 'PREPARE';
PRIVILEGES: 'PRIVILEGES';
PROPERTIES: 'PROPERTIES';
PUBLIC: 'PUBLIC';
RANGE: 'RANGE';
READ: 'READ';
RECURSIVE: 'RECURSIVE';
RENAME: 'RENAME';
REPEATABLE: 'REPEATABLE';
REPLACE: 'REPLACE';
RESET: 'RESET';
RESTRICT: 'RESTRICT';
REVOKE: 'REVOKE';
RIGHT: 'RIGHT';
ROLLBACK: 'ROLLBACK';
ROLLUP: 'ROLLUP';
ROW: 'ROW';
ROWS: 'ROWS';
SCHEMA: 'SCHEMA';
SCHEMAS: 'SCHEMAS';
SECOND: 'SECOND';
SELECT: 'SELECT';
SERIALIZABLE: 'SERIALIZABLE';
SESSION: 'SESSION';
SET: 'SET';
SETS: 'SETS';
SHOW: 'SHOW';
SMALLINT: 'SMALLINT';
SOME: 'SOME';
START: 'START';
STATIC_CAST: 'STATIC_CAST';
STATS: 'STATS';
SUBSTRING: 'SUBSTRING';
SYSTEM: 'SYSTEM';
TABLE: 'TABLE';
TABLES: 'TABLES';
TABLESAMPLE: 'TABLESAMPLE';
TEXT: 'TEXT';
THEN: 'THEN';
TIME: 'TIME';
TIMESTAMP: 'TIMESTAMP';
TINYINT: 'TINYINT';
TO: 'TO';
TRANSACTION: 'TRANSACTION';
BOOL_TRUE: 'TRUE';
TRY_CAST: 'TRY_CAST';
TRY_STATIC_CAST: 'TRY_STATIC_CAST';
TYPE: 'TYPE';
UESCAPE: 'UESCAPE';
UNBOUNDED: 'UNBOUNDED';
UNCOMMITTED: 'UNCOMMITTED';
UNDEFINED: 'UNDEFINED';
UNION: 'UNION';
UNNEST: 'UNNEST';
USE: 'USE';
USING: 'USING';
VALIDATE: 'VALIDATE';
VALUES: 'VALUES';
VERBOSE: 'VERBOSE';
VIEW: 'VIEW';
WHEN: 'WHEN';
WHERE: 'WHERE';
WITH: 'WITH';
WORK: 'WORK';
WRITE: 'WRITE';
YEAR: 'YEAR';
ZONE: 'ZONE';

EQ  : '=';
NEQ : '<>' | '!=';
LT  : '<';
LTE : '<=';
GT  : '>';
GTE : '>=';

PLUS: '+';
MINUS: '-';
ASTERISK: '*';
SLASH: '/';
PERCENT: '%';
CONCAT: '||';

STRING
    : '\'' ( ~'\'' | '\'\'' )* '\''
    ;

UNICODE_STR
    : 'U&\'' ( ~'\'' | '\'\'' )* '\''
    ;

// Note: we allow any character inside the binary literal and validate
// its a correct literal when the AST is being constructed. This
// allows us to provide more meaningful error messages to the user
BINARY_LITERAL
    :  'X\'' (~'\'')* '\''
    ;

INTEGER_VALUE
    : DIGIT+
    ;

DECIMAL_VALUE
    : DIGIT+ '.' DIGIT*
    | '.' DIGIT+
    | DIGIT+ ('.' DIGIT*)? EXPONENT
    | '.' DIGIT+ EXPONENT
    ;

IDENTIFIER
    : (LETTER | '_') (LETTER | DIGIT | '_' | '@')*
    ;

QUOTED_IDENTIFIER
    : '"' ( ~'"' | '""' )* '"'
    ;

BACKQUOTED_IDENTIFIER
    : '`' ( ~'`' | '``' )* '`'
    ;

DOUBLE_PRECISION
    : 'DOUBLE' WS 'PRECISION'
    ;

fragment EXPONENT
    : 'E' [+-]? DIGIT+
    ;

fragment DIGIT
    : [0-9]
    ;

fragment LETTER
    : [A-Z]
    ;

SIMPLE_COMMENT
    : '--' ~[\r\n]* '\r'? '\n'? -> channel(HIDDEN)
    ;

BRACKETED_COMMENT
    : '/*' .*? '*/' -> channel(HIDDEN)
    ;

WS
    : [ \r\n\t]+ -> channel(HIDDEN)
    ;

// Catch-all for anything we can't recognize.
// We use this to be able to ignore and recover all the text
// when splitting statements with DelimiterLexer
UNRECOGNIZED
    : .
    ;

