// Generated from Sql.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by SqlParser.
function SqlListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

SqlListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
SqlListener.prototype.constructor = SqlListener;

// Enter a parse tree produced by SqlParser#singleStatement.
SqlListener.prototype.enterSingleStatement = function(ctx) {
};

// Exit a parse tree produced by SqlParser#singleStatement.
SqlListener.prototype.exitSingleStatement = function(ctx) {
};


// Enter a parse tree produced by SqlParser#singleExpression.
SqlListener.prototype.enterSingleExpression = function(ctx) {
};

// Exit a parse tree produced by SqlParser#singleExpression.
SqlListener.prototype.exitSingleExpression = function(ctx) {
};


// Enter a parse tree produced by SqlParser#statementDefault.
SqlListener.prototype.enterStatementDefault = function(ctx) {
};

// Exit a parse tree produced by SqlParser#statementDefault.
SqlListener.prototype.exitStatementDefault = function(ctx) {
};


// Enter a parse tree produced by SqlParser#insertInto.
SqlListener.prototype.enterInsertInto = function(ctx) {
};

// Exit a parse tree produced by SqlParser#insertInto.
SqlListener.prototype.exitInsertInto = function(ctx) {
};


// Enter a parse tree produced by SqlParser#showColumns.
SqlListener.prototype.enterShowColumns = function(ctx) {
};

// Exit a parse tree produced by SqlParser#showColumns.
SqlListener.prototype.exitShowColumns = function(ctx) {
};


// Enter a parse tree produced by SqlParser#explain.
SqlListener.prototype.enterExplain = function(ctx) {
};

// Exit a parse tree produced by SqlParser#explain.
SqlListener.prototype.exitExplain = function(ctx) {
};


// Enter a parse tree produced by SqlParser#query.
SqlListener.prototype.enterQuery = function(ctx) {
};

// Exit a parse tree produced by SqlParser#query.
SqlListener.prototype.exitQuery = function(ctx) {
};


// Enter a parse tree produced by SqlParser#cWith.
SqlListener.prototype.enterCWith = function(ctx) {
};

// Exit a parse tree produced by SqlParser#cWith.
SqlListener.prototype.exitCWith = function(ctx) {
};


// Enter a parse tree produced by SqlParser#queryNoWith.
SqlListener.prototype.enterQueryNoWith = function(ctx) {
};

// Exit a parse tree produced by SqlParser#queryNoWith.
SqlListener.prototype.exitQueryNoWith = function(ctx) {
};


// Enter a parse tree produced by SqlParser#hint.
SqlListener.prototype.enterHint = function(ctx) {
};

// Exit a parse tree produced by SqlParser#hint.
SqlListener.prototype.exitHint = function(ctx) {
};


// Enter a parse tree produced by SqlParser#hintValueFieldPath.
SqlListener.prototype.enterHintValueFieldPath = function(ctx) {
};

// Exit a parse tree produced by SqlParser#hintValueFieldPath.
SqlListener.prototype.exitHintValueFieldPath = function(ctx) {
};


// Enter a parse tree produced by SqlParser#hintValueNumber.
SqlListener.prototype.enterHintValueNumber = function(ctx) {
};

// Exit a parse tree produced by SqlParser#hintValueNumber.
SqlListener.prototype.exitHintValueNumber = function(ctx) {
};


// Enter a parse tree produced by SqlParser#hintValueString.
SqlListener.prototype.enterHintValueString = function(ctx) {
};

// Exit a parse tree produced by SqlParser#hintValueString.
SqlListener.prototype.exitHintValueString = function(ctx) {
};


// Enter a parse tree produced by SqlParser#hintValueBoolean.
SqlListener.prototype.enterHintValueBoolean = function(ctx) {
};

// Exit a parse tree produced by SqlParser#hintValueBoolean.
SqlListener.prototype.exitHintValueBoolean = function(ctx) {
};


// Enter a parse tree produced by SqlParser#hintList.
SqlListener.prototype.enterHintList = function(ctx) {
};

// Exit a parse tree produced by SqlParser#hintList.
SqlListener.prototype.exitHintList = function(ctx) {
};


// Enter a parse tree produced by SqlParser#hints.
SqlListener.prototype.enterHints = function(ctx) {
};

// Exit a parse tree produced by SqlParser#hints.
SqlListener.prototype.exitHints = function(ctx) {
};


// Enter a parse tree produced by SqlParser#queryBodySetOperation.
SqlListener.prototype.enterQueryBodySetOperation = function(ctx) {
};

// Exit a parse tree produced by SqlParser#queryBodySetOperation.
SqlListener.prototype.exitQueryBodySetOperation = function(ctx) {
};


// Enter a parse tree produced by SqlParser#queryBodyDefault.
SqlListener.prototype.enterQueryBodyDefault = function(ctx) {
};

// Exit a parse tree produced by SqlParser#queryBodyDefault.
SqlListener.prototype.exitQueryBodyDefault = function(ctx) {
};


// Enter a parse tree produced by SqlParser#queryBodyParenthesized.
SqlListener.prototype.enterQueryBodyParenthesized = function(ctx) {
};

// Exit a parse tree produced by SqlParser#queryBodyParenthesized.
SqlListener.prototype.exitQueryBodyParenthesized = function(ctx) {
};


// Enter a parse tree produced by SqlParser#queryTermDefault.
SqlListener.prototype.enterQueryTermDefault = function(ctx) {
};

// Exit a parse tree produced by SqlParser#queryTermDefault.
SqlListener.prototype.exitQueryTermDefault = function(ctx) {
};


// Enter a parse tree produced by SqlParser#table.
SqlListener.prototype.enterTable = function(ctx) {
};

// Exit a parse tree produced by SqlParser#table.
SqlListener.prototype.exitTable = function(ctx) {
};


// Enter a parse tree produced by SqlParser#inlineTable.
SqlListener.prototype.enterInlineTable = function(ctx) {
};

// Exit a parse tree produced by SqlParser#inlineTable.
SqlListener.prototype.exitInlineTable = function(ctx) {
};


// Enter a parse tree produced by SqlParser#subquery.
SqlListener.prototype.enterSubquery = function(ctx) {
};

// Exit a parse tree produced by SqlParser#subquery.
SqlListener.prototype.exitSubquery = function(ctx) {
};


// Enter a parse tree produced by SqlParser#sortItem.
SqlListener.prototype.enterSortItem = function(ctx) {
};

// Exit a parse tree produced by SqlParser#sortItem.
SqlListener.prototype.exitSortItem = function(ctx) {
};


// Enter a parse tree produced by SqlParser#querySpecification.
SqlListener.prototype.enterQuerySpecification = function(ctx) {
};

// Exit a parse tree produced by SqlParser#querySpecification.
SqlListener.prototype.exitQuerySpecification = function(ctx) {
};


// Enter a parse tree produced by SqlParser#groupBy.
SqlListener.prototype.enterGroupBy = function(ctx) {
};

// Exit a parse tree produced by SqlParser#groupBy.
SqlListener.prototype.exitGroupBy = function(ctx) {
};


// Enter a parse tree produced by SqlParser#singleGroupingSet.
SqlListener.prototype.enterSingleGroupingSet = function(ctx) {
};

// Exit a parse tree produced by SqlParser#singleGroupingSet.
SqlListener.prototype.exitSingleGroupingSet = function(ctx) {
};


// Enter a parse tree produced by SqlParser#rollup.
SqlListener.prototype.enterRollup = function(ctx) {
};

// Exit a parse tree produced by SqlParser#rollup.
SqlListener.prototype.exitRollup = function(ctx) {
};


// Enter a parse tree produced by SqlParser#cube.
SqlListener.prototype.enterCube = function(ctx) {
};

// Exit a parse tree produced by SqlParser#cube.
SqlListener.prototype.exitCube = function(ctx) {
};


// Enter a parse tree produced by SqlParser#multipleGroupingSets.
SqlListener.prototype.enterMultipleGroupingSets = function(ctx) {
};

// Exit a parse tree produced by SqlParser#multipleGroupingSets.
SqlListener.prototype.exitMultipleGroupingSets = function(ctx) {
};


// Enter a parse tree produced by SqlParser#groupingExpressions.
SqlListener.prototype.enterGroupingExpressions = function(ctx) {
};

// Exit a parse tree produced by SqlParser#groupingExpressions.
SqlListener.prototype.exitGroupingExpressions = function(ctx) {
};


// Enter a parse tree produced by SqlParser#namedQuery.
SqlListener.prototype.enterNamedQuery = function(ctx) {
};

// Exit a parse tree produced by SqlParser#namedQuery.
SqlListener.prototype.exitNamedQuery = function(ctx) {
};


// Enter a parse tree produced by SqlParser#setQuantifier.
SqlListener.prototype.enterSetQuantifier = function(ctx) {
};

// Exit a parse tree produced by SqlParser#setQuantifier.
SqlListener.prototype.exitSetQuantifier = function(ctx) {
};


// Enter a parse tree produced by SqlParser#selectSingle.
SqlListener.prototype.enterSelectSingle = function(ctx) {
};

// Exit a parse tree produced by SqlParser#selectSingle.
SqlListener.prototype.exitSelectSingle = function(ctx) {
};


// Enter a parse tree produced by SqlParser#selectAll.
SqlListener.prototype.enterSelectAll = function(ctx) {
};

// Exit a parse tree produced by SqlParser#selectAll.
SqlListener.prototype.exitSelectAll = function(ctx) {
};


// Enter a parse tree produced by SqlParser#relationDefault.
SqlListener.prototype.enterRelationDefault = function(ctx) {
};

// Exit a parse tree produced by SqlParser#relationDefault.
SqlListener.prototype.exitRelationDefault = function(ctx) {
};


// Enter a parse tree produced by SqlParser#joinRelation.
SqlListener.prototype.enterJoinRelation = function(ctx) {
};

// Exit a parse tree produced by SqlParser#joinRelation.
SqlListener.prototype.exitJoinRelation = function(ctx) {
};


// Enter a parse tree produced by SqlParser#joinType.
SqlListener.prototype.enterJoinType = function(ctx) {
};

// Exit a parse tree produced by SqlParser#joinType.
SqlListener.prototype.exitJoinType = function(ctx) {
};


// Enter a parse tree produced by SqlParser#joinCriteria.
SqlListener.prototype.enterJoinCriteria = function(ctx) {
};

// Exit a parse tree produced by SqlParser#joinCriteria.
SqlListener.prototype.exitJoinCriteria = function(ctx) {
};


// Enter a parse tree produced by SqlParser#sampledRelation.
SqlListener.prototype.enterSampledRelation = function(ctx) {
};

// Exit a parse tree produced by SqlParser#sampledRelation.
SqlListener.prototype.exitSampledRelation = function(ctx) {
};


// Enter a parse tree produced by SqlParser#sampleType.
SqlListener.prototype.enterSampleType = function(ctx) {
};

// Exit a parse tree produced by SqlParser#sampleType.
SqlListener.prototype.exitSampleType = function(ctx) {
};


// Enter a parse tree produced by SqlParser#aliasedRelation.
SqlListener.prototype.enterAliasedRelation = function(ctx) {
};

// Exit a parse tree produced by SqlParser#aliasedRelation.
SqlListener.prototype.exitAliasedRelation = function(ctx) {
};


// Enter a parse tree produced by SqlParser#columnAliases.
SqlListener.prototype.enterColumnAliases = function(ctx) {
};

// Exit a parse tree produced by SqlParser#columnAliases.
SqlListener.prototype.exitColumnAliases = function(ctx) {
};


// Enter a parse tree produced by SqlParser#tableName.
SqlListener.prototype.enterTableName = function(ctx) {
};

// Exit a parse tree produced by SqlParser#tableName.
SqlListener.prototype.exitTableName = function(ctx) {
};


// Enter a parse tree produced by SqlParser#subqueryRelation.
SqlListener.prototype.enterSubqueryRelation = function(ctx) {
};

// Exit a parse tree produced by SqlParser#subqueryRelation.
SqlListener.prototype.exitSubqueryRelation = function(ctx) {
};


// Enter a parse tree produced by SqlParser#unnest.
SqlListener.prototype.enterUnnest = function(ctx) {
};

// Exit a parse tree produced by SqlParser#unnest.
SqlListener.prototype.exitUnnest = function(ctx) {
};


// Enter a parse tree produced by SqlParser#lateral.
SqlListener.prototype.enterLateral = function(ctx) {
};

// Exit a parse tree produced by SqlParser#lateral.
SqlListener.prototype.exitLateral = function(ctx) {
};


// Enter a parse tree produced by SqlParser#parenthesizedRelation.
SqlListener.prototype.enterParenthesizedRelation = function(ctx) {
};

// Exit a parse tree produced by SqlParser#parenthesizedRelation.
SqlListener.prototype.exitParenthesizedRelation = function(ctx) {
};


// Enter a parse tree produced by SqlParser#tablePrefix.
SqlListener.prototype.enterTablePrefix = function(ctx) {
};

// Exit a parse tree produced by SqlParser#tablePrefix.
SqlListener.prototype.exitTablePrefix = function(ctx) {
};


// Enter a parse tree produced by SqlParser#tableWorkspace.
SqlListener.prototype.enterTableWorkspace = function(ctx) {
};

// Exit a parse tree produced by SqlParser#tableWorkspace.
SqlListener.prototype.exitTableWorkspace = function(ctx) {
};


// Enter a parse tree produced by SqlParser#tableFieldPart.
SqlListener.prototype.enterTableFieldPart = function(ctx) {
};

// Exit a parse tree produced by SqlParser#tableFieldPart.
SqlListener.prototype.exitTableFieldPart = function(ctx) {
};


// Enter a parse tree produced by SqlParser#tableField.
SqlListener.prototype.enterTableField = function(ctx) {
};

// Exit a parse tree produced by SqlParser#tableField.
SqlListener.prototype.exitTableField = function(ctx) {
};


// Enter a parse tree produced by SqlParser#tableQualifiedName.
SqlListener.prototype.enterTableQualifiedName = function(ctx) {
};

// Exit a parse tree produced by SqlParser#tableQualifiedName.
SqlListener.prototype.exitTableQualifiedName = function(ctx) {
};


// Enter a parse tree produced by SqlParser#fieldPathPart.
SqlListener.prototype.enterFieldPathPart = function(ctx) {
};

// Exit a parse tree produced by SqlParser#fieldPathPart.
SqlListener.prototype.exitFieldPathPart = function(ctx) {
};


// Enter a parse tree produced by SqlParser#fieldPath.
SqlListener.prototype.enterFieldPath = function(ctx) {
};

// Exit a parse tree produced by SqlParser#fieldPath.
SqlListener.prototype.exitFieldPath = function(ctx) {
};


// Enter a parse tree produced by SqlParser#expression.
SqlListener.prototype.enterExpression = function(ctx) {
};

// Exit a parse tree produced by SqlParser#expression.
SqlListener.prototype.exitExpression = function(ctx) {
};


// Enter a parse tree produced by SqlParser#logicalNot.
SqlListener.prototype.enterLogicalNot = function(ctx) {
};

// Exit a parse tree produced by SqlParser#logicalNot.
SqlListener.prototype.exitLogicalNot = function(ctx) {
};


// Enter a parse tree produced by SqlParser#booleanDefault.
SqlListener.prototype.enterBooleanDefault = function(ctx) {
};

// Exit a parse tree produced by SqlParser#booleanDefault.
SqlListener.prototype.exitBooleanDefault = function(ctx) {
};


// Enter a parse tree produced by SqlParser#logicalBinary.
SqlListener.prototype.enterLogicalBinary = function(ctx) {
};

// Exit a parse tree produced by SqlParser#logicalBinary.
SqlListener.prototype.exitLogicalBinary = function(ctx) {
};


// Enter a parse tree produced by SqlParser#predicated.
SqlListener.prototype.enterPredicated = function(ctx) {
};

// Exit a parse tree produced by SqlParser#predicated.
SqlListener.prototype.exitPredicated = function(ctx) {
};


// Enter a parse tree produced by SqlParser#comparison.
SqlListener.prototype.enterComparison = function(ctx) {
};

// Exit a parse tree produced by SqlParser#comparison.
SqlListener.prototype.exitComparison = function(ctx) {
};


// Enter a parse tree produced by SqlParser#quantifiedComparison.
SqlListener.prototype.enterQuantifiedComparison = function(ctx) {
};

// Exit a parse tree produced by SqlParser#quantifiedComparison.
SqlListener.prototype.exitQuantifiedComparison = function(ctx) {
};


// Enter a parse tree produced by SqlParser#between.
SqlListener.prototype.enterBetween = function(ctx) {
};

// Exit a parse tree produced by SqlParser#between.
SqlListener.prototype.exitBetween = function(ctx) {
};


// Enter a parse tree produced by SqlParser#inList.
SqlListener.prototype.enterInList = function(ctx) {
};

// Exit a parse tree produced by SqlParser#inList.
SqlListener.prototype.exitInList = function(ctx) {
};


// Enter a parse tree produced by SqlParser#inSubquery.
SqlListener.prototype.enterInSubquery = function(ctx) {
};

// Exit a parse tree produced by SqlParser#inSubquery.
SqlListener.prototype.exitInSubquery = function(ctx) {
};


// Enter a parse tree produced by SqlParser#like.
SqlListener.prototype.enterLike = function(ctx) {
};

// Exit a parse tree produced by SqlParser#like.
SqlListener.prototype.exitLike = function(ctx) {
};


// Enter a parse tree produced by SqlParser#nullPredicate.
SqlListener.prototype.enterNullPredicate = function(ctx) {
};

// Exit a parse tree produced by SqlParser#nullPredicate.
SqlListener.prototype.exitNullPredicate = function(ctx) {
};


// Enter a parse tree produced by SqlParser#undefinedPredicate.
SqlListener.prototype.enterUndefinedPredicate = function(ctx) {
};

// Exit a parse tree produced by SqlParser#undefinedPredicate.
SqlListener.prototype.exitUndefinedPredicate = function(ctx) {
};


// Enter a parse tree produced by SqlParser#distinctFrom.
SqlListener.prototype.enterDistinctFrom = function(ctx) {
};

// Exit a parse tree produced by SqlParser#distinctFrom.
SqlListener.prototype.exitDistinctFrom = function(ctx) {
};


// Enter a parse tree produced by SqlParser#valueExpressionDefault.
SqlListener.prototype.enterValueExpressionDefault = function(ctx) {
};

// Exit a parse tree produced by SqlParser#valueExpressionDefault.
SqlListener.prototype.exitValueExpressionDefault = function(ctx) {
};


// Enter a parse tree produced by SqlParser#concatenation.
SqlListener.prototype.enterConcatenation = function(ctx) {
};

// Exit a parse tree produced by SqlParser#concatenation.
SqlListener.prototype.exitConcatenation = function(ctx) {
};


// Enter a parse tree produced by SqlParser#arithmeticBinary.
SqlListener.prototype.enterArithmeticBinary = function(ctx) {
};

// Exit a parse tree produced by SqlParser#arithmeticBinary.
SqlListener.prototype.exitArithmeticBinary = function(ctx) {
};


// Enter a parse tree produced by SqlParser#arithmeticUnary.
SqlListener.prototype.enterArithmeticUnary = function(ctx) {
};

// Exit a parse tree produced by SqlParser#arithmeticUnary.
SqlListener.prototype.exitArithmeticUnary = function(ctx) {
};


// Enter a parse tree produced by SqlParser#atTimeZone.
SqlListener.prototype.enterAtTimeZone = function(ctx) {
};

// Exit a parse tree produced by SqlParser#atTimeZone.
SqlListener.prototype.exitAtTimeZone = function(ctx) {
};


// Enter a parse tree produced by SqlParser#dereference.
SqlListener.prototype.enterDereference = function(ctx) {
};

// Exit a parse tree produced by SqlParser#dereference.
SqlListener.prototype.exitDereference = function(ctx) {
};


// Enter a parse tree produced by SqlParser#namedParameter.
SqlListener.prototype.enterNamedParameter = function(ctx) {
};

// Exit a parse tree produced by SqlParser#namedParameter.
SqlListener.prototype.exitNamedParameter = function(ctx) {
};


// Enter a parse tree produced by SqlParser#typeConstructor.
SqlListener.prototype.enterTypeConstructor = function(ctx) {
};

// Exit a parse tree produced by SqlParser#typeConstructor.
SqlListener.prototype.exitTypeConstructor = function(ctx) {
};


// Enter a parse tree produced by SqlParser#undefinedLiteral.
SqlListener.prototype.enterUndefinedLiteral = function(ctx) {
};

// Exit a parse tree produced by SqlParser#undefinedLiteral.
SqlListener.prototype.exitUndefinedLiteral = function(ctx) {
};


// Enter a parse tree produced by SqlParser#substring.
SqlListener.prototype.enterSubstring = function(ctx) {
};

// Exit a parse tree produced by SqlParser#substring.
SqlListener.prototype.exitSubstring = function(ctx) {
};


// Enter a parse tree produced by SqlParser#cast.
SqlListener.prototype.enterCast = function(ctx) {
};

// Exit a parse tree produced by SqlParser#cast.
SqlListener.prototype.exitCast = function(ctx) {
};


// Enter a parse tree produced by SqlParser#parenthesizedExpression.
SqlListener.prototype.enterParenthesizedExpression = function(ctx) {
};

// Exit a parse tree produced by SqlParser#parenthesizedExpression.
SqlListener.prototype.exitParenthesizedExpression = function(ctx) {
};


// Enter a parse tree produced by SqlParser#normalize.
SqlListener.prototype.enterNormalize = function(ctx) {
};

// Exit a parse tree produced by SqlParser#normalize.
SqlListener.prototype.exitNormalize = function(ctx) {
};


// Enter a parse tree produced by SqlParser#dateFunction.
SqlListener.prototype.enterDateFunction = function(ctx) {
};

// Exit a parse tree produced by SqlParser#dateFunction.
SqlListener.prototype.exitDateFunction = function(ctx) {
};


// Enter a parse tree produced by SqlParser#intervalLiteral.
SqlListener.prototype.enterIntervalLiteral = function(ctx) {
};

// Exit a parse tree produced by SqlParser#intervalLiteral.
SqlListener.prototype.exitIntervalLiteral = function(ctx) {
};


// Enter a parse tree produced by SqlParser#numericLiteral.
SqlListener.prototype.enterNumericLiteral = function(ctx) {
};

// Exit a parse tree produced by SqlParser#numericLiteral.
SqlListener.prototype.exitNumericLiteral = function(ctx) {
};


// Enter a parse tree produced by SqlParser#booleanLiteral.
SqlListener.prototype.enterBooleanLiteral = function(ctx) {
};

// Exit a parse tree produced by SqlParser#booleanLiteral.
SqlListener.prototype.exitBooleanLiteral = function(ctx) {
};


// Enter a parse tree produced by SqlParser#simpleCase.
SqlListener.prototype.enterSimpleCase = function(ctx) {
};

// Exit a parse tree produced by SqlParser#simpleCase.
SqlListener.prototype.exitSimpleCase = function(ctx) {
};


// Enter a parse tree produced by SqlParser#columnReference.
SqlListener.prototype.enterColumnReference = function(ctx) {
};

// Exit a parse tree produced by SqlParser#columnReference.
SqlListener.prototype.exitColumnReference = function(ctx) {
};


// Enter a parse tree produced by SqlParser#nullLiteral.
SqlListener.prototype.enterNullLiteral = function(ctx) {
};

// Exit a parse tree produced by SqlParser#nullLiteral.
SqlListener.prototype.exitNullLiteral = function(ctx) {
};


// Enter a parse tree produced by SqlParser#subscript.
SqlListener.prototype.enterSubscript = function(ctx) {
};

// Exit a parse tree produced by SqlParser#subscript.
SqlListener.prototype.exitSubscript = function(ctx) {
};


// Enter a parse tree produced by SqlParser#subqueryExpression.
SqlListener.prototype.enterSubqueryExpression = function(ctx) {
};

// Exit a parse tree produced by SqlParser#subqueryExpression.
SqlListener.prototype.exitSubqueryExpression = function(ctx) {
};


// Enter a parse tree produced by SqlParser#colonCast.
SqlListener.prototype.enterColonCast = function(ctx) {
};

// Exit a parse tree produced by SqlParser#colonCast.
SqlListener.prototype.exitColonCast = function(ctx) {
};


// Enter a parse tree produced by SqlParser#binaryLiteral.
SqlListener.prototype.enterBinaryLiteral = function(ctx) {
};

// Exit a parse tree produced by SqlParser#binaryLiteral.
SqlListener.prototype.exitBinaryLiteral = function(ctx) {
};


// Enter a parse tree produced by SqlParser#extract.
SqlListener.prototype.enterExtract = function(ctx) {
};

// Exit a parse tree produced by SqlParser#extract.
SqlListener.prototype.exitExtract = function(ctx) {
};


// Enter a parse tree produced by SqlParser#stringLiteral.
SqlListener.prototype.enterStringLiteral = function(ctx) {
};

// Exit a parse tree produced by SqlParser#stringLiteral.
SqlListener.prototype.exitStringLiteral = function(ctx) {
};


// Enter a parse tree produced by SqlParser#nullValueLiteral.
SqlListener.prototype.enterNullValueLiteral = function(ctx) {
};

// Exit a parse tree produced by SqlParser#nullValueLiteral.
SqlListener.prototype.exitNullValueLiteral = function(ctx) {
};


// Enter a parse tree produced by SqlParser#arrayConstructor.
SqlListener.prototype.enterArrayConstructor = function(ctx) {
};

// Exit a parse tree produced by SqlParser#arrayConstructor.
SqlListener.prototype.exitArrayConstructor = function(ctx) {
};


// Enter a parse tree produced by SqlParser#functionCall.
SqlListener.prototype.enterFunctionCall = function(ctx) {
};

// Exit a parse tree produced by SqlParser#functionCall.
SqlListener.prototype.exitFunctionCall = function(ctx) {
};


// Enter a parse tree produced by SqlParser#exists.
SqlListener.prototype.enterExists = function(ctx) {
};

// Exit a parse tree produced by SqlParser#exists.
SqlListener.prototype.exitExists = function(ctx) {
};


// Enter a parse tree produced by SqlParser#position.
SqlListener.prototype.enterPosition = function(ctx) {
};

// Exit a parse tree produced by SqlParser#position.
SqlListener.prototype.exitPosition = function(ctx) {
};


// Enter a parse tree produced by SqlParser#searchedCase.
SqlListener.prototype.enterSearchedCase = function(ctx) {
};

// Exit a parse tree produced by SqlParser#searchedCase.
SqlListener.prototype.exitSearchedCase = function(ctx) {
};


// Enter a parse tree produced by SqlParser#positionalParameter.
SqlListener.prototype.enterPositionalParameter = function(ctx) {
};

// Exit a parse tree produced by SqlParser#positionalParameter.
SqlListener.prototype.exitPositionalParameter = function(ctx) {
};


// Enter a parse tree produced by SqlParser#groupingOperation.
SqlListener.prototype.enterGroupingOperation = function(ctx) {
};

// Exit a parse tree produced by SqlParser#groupingOperation.
SqlListener.prototype.exitGroupingOperation = function(ctx) {
};


// Enter a parse tree produced by SqlParser#array.
SqlListener.prototype.enterArray = function(ctx) {
};

// Exit a parse tree produced by SqlParser#array.
SqlListener.prototype.exitArray = function(ctx) {
};


// Enter a parse tree produced by SqlParser#basicStringLiteral.
SqlListener.prototype.enterBasicStringLiteral = function(ctx) {
};

// Exit a parse tree produced by SqlParser#basicStringLiteral.
SqlListener.prototype.exitBasicStringLiteral = function(ctx) {
};


// Enter a parse tree produced by SqlParser#unicodeStringLiteral.
SqlListener.prototype.enterUnicodeStringLiteral = function(ctx) {
};

// Exit a parse tree produced by SqlParser#unicodeStringLiteral.
SqlListener.prototype.exitUnicodeStringLiteral = function(ctx) {
};


// Enter a parse tree produced by SqlParser#comparisonOperator.
SqlListener.prototype.enterComparisonOperator = function(ctx) {
};

// Exit a parse tree produced by SqlParser#comparisonOperator.
SqlListener.prototype.exitComparisonOperator = function(ctx) {
};


// Enter a parse tree produced by SqlParser#comparisonQuantifier.
SqlListener.prototype.enterComparisonQuantifier = function(ctx) {
};

// Exit a parse tree produced by SqlParser#comparisonQuantifier.
SqlListener.prototype.exitComparisonQuantifier = function(ctx) {
};


// Enter a parse tree produced by SqlParser#booleanValue.
SqlListener.prototype.enterBooleanValue = function(ctx) {
};

// Exit a parse tree produced by SqlParser#booleanValue.
SqlListener.prototype.exitBooleanValue = function(ctx) {
};


// Enter a parse tree produced by SqlParser#dateFunctionName.
SqlListener.prototype.enterDateFunctionName = function(ctx) {
};

// Exit a parse tree produced by SqlParser#dateFunctionName.
SqlListener.prototype.exitDateFunctionName = function(ctx) {
};


// Enter a parse tree produced by SqlParser#stringInterval.
SqlListener.prototype.enterStringInterval = function(ctx) {
};

// Exit a parse tree produced by SqlParser#stringInterval.
SqlListener.prototype.exitStringInterval = function(ctx) {
};


// Enter a parse tree produced by SqlParser#numericInterval.
SqlListener.prototype.enterNumericInterval = function(ctx) {
};

// Exit a parse tree produced by SqlParser#numericInterval.
SqlListener.prototype.exitNumericInterval = function(ctx) {
};


// Enter a parse tree produced by SqlParser#stringOnlyInterval.
SqlListener.prototype.enterStringOnlyInterval = function(ctx) {
};

// Exit a parse tree produced by SqlParser#stringOnlyInterval.
SqlListener.prototype.exitStringOnlyInterval = function(ctx) {
};


// Enter a parse tree produced by SqlParser#intervalField.
SqlListener.prototype.enterIntervalField = function(ctx) {
};

// Exit a parse tree produced by SqlParser#intervalField.
SqlListener.prototype.exitIntervalField = function(ctx) {
};


// Enter a parse tree produced by SqlParser#normalForm.
SqlListener.prototype.enterNormalForm = function(ctx) {
};

// Exit a parse tree produced by SqlParser#normalForm.
SqlListener.prototype.exitNormalForm = function(ctx) {
};


// Enter a parse tree produced by SqlParser#type.
SqlListener.prototype.enterType = function(ctx) {
};

// Exit a parse tree produced by SqlParser#type.
SqlListener.prototype.exitType = function(ctx) {
};


// Enter a parse tree produced by SqlParser#typeParameter.
SqlListener.prototype.enterTypeParameter = function(ctx) {
};

// Exit a parse tree produced by SqlParser#typeParameter.
SqlListener.prototype.exitTypeParameter = function(ctx) {
};


// Enter a parse tree produced by SqlParser#baseType.
SqlListener.prototype.enterBaseType = function(ctx) {
};

// Exit a parse tree produced by SqlParser#baseType.
SqlListener.prototype.exitBaseType = function(ctx) {
};


// Enter a parse tree produced by SqlParser#whenClause.
SqlListener.prototype.enterWhenClause = function(ctx) {
};

// Exit a parse tree produced by SqlParser#whenClause.
SqlListener.prototype.exitWhenClause = function(ctx) {
};


// Enter a parse tree produced by SqlParser#filter.
SqlListener.prototype.enterFilter = function(ctx) {
};

// Exit a parse tree produced by SqlParser#filter.
SqlListener.prototype.exitFilter = function(ctx) {
};


// Enter a parse tree produced by SqlParser#callOptions.
SqlListener.prototype.enterCallOptions = function(ctx) {
};

// Exit a parse tree produced by SqlParser#callOptions.
SqlListener.prototype.exitCallOptions = function(ctx) {
};


// Enter a parse tree produced by SqlParser#over.
SqlListener.prototype.enterOver = function(ctx) {
};

// Exit a parse tree produced by SqlParser#over.
SqlListener.prototype.exitOver = function(ctx) {
};


// Enter a parse tree produced by SqlParser#windowFrame.
SqlListener.prototype.enterWindowFrame = function(ctx) {
};

// Exit a parse tree produced by SqlParser#windowFrame.
SqlListener.prototype.exitWindowFrame = function(ctx) {
};


// Enter a parse tree produced by SqlParser#unboundedFrame.
SqlListener.prototype.enterUnboundedFrame = function(ctx) {
};

// Exit a parse tree produced by SqlParser#unboundedFrame.
SqlListener.prototype.exitUnboundedFrame = function(ctx) {
};


// Enter a parse tree produced by SqlParser#currentRowBound.
SqlListener.prototype.enterCurrentRowBound = function(ctx) {
};

// Exit a parse tree produced by SqlParser#currentRowBound.
SqlListener.prototype.exitCurrentRowBound = function(ctx) {
};


// Enter a parse tree produced by SqlParser#boundedFrame.
SqlListener.prototype.enterBoundedFrame = function(ctx) {
};

// Exit a parse tree produced by SqlParser#boundedFrame.
SqlListener.prototype.exitBoundedFrame = function(ctx) {
};


// Enter a parse tree produced by SqlParser#qualifiedName.
SqlListener.prototype.enterQualifiedName = function(ctx) {
};

// Exit a parse tree produced by SqlParser#qualifiedName.
SqlListener.prototype.exitQualifiedName = function(ctx) {
};


// Enter a parse tree produced by SqlParser#unquotedIdentifier.
SqlListener.prototype.enterUnquotedIdentifier = function(ctx) {
};

// Exit a parse tree produced by SqlParser#unquotedIdentifier.
SqlListener.prototype.exitUnquotedIdentifier = function(ctx) {
};


// Enter a parse tree produced by SqlParser#quotedIdentifier.
SqlListener.prototype.enterQuotedIdentifier = function(ctx) {
};

// Exit a parse tree produced by SqlParser#quotedIdentifier.
SqlListener.prototype.exitQuotedIdentifier = function(ctx) {
};


// Enter a parse tree produced by SqlParser#backQuotedIdentifier.
SqlListener.prototype.enterBackQuotedIdentifier = function(ctx) {
};

// Exit a parse tree produced by SqlParser#backQuotedIdentifier.
SqlListener.prototype.exitBackQuotedIdentifier = function(ctx) {
};


// Enter a parse tree produced by SqlParser#decimalLiteral.
SqlListener.prototype.enterDecimalLiteral = function(ctx) {
};

// Exit a parse tree produced by SqlParser#decimalLiteral.
SqlListener.prototype.exitDecimalLiteral = function(ctx) {
};


// Enter a parse tree produced by SqlParser#integerLiteral.
SqlListener.prototype.enterIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by SqlParser#integerLiteral.
SqlListener.prototype.exitIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by SqlParser#nonReserved.
SqlListener.prototype.enterNonReserved = function(ctx) {
};

// Exit a parse tree produced by SqlParser#nonReserved.
SqlListener.prototype.exitNonReserved = function(ctx) {
};



exports.SqlListener = SqlListener;