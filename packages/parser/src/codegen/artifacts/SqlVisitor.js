// Generated from artifacts/Sql.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by SqlParser.

function SqlVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

SqlVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
SqlVisitor.prototype.constructor = SqlVisitor;

// Visit a parse tree produced by SqlParser#singleStatement.
SqlVisitor.prototype.visitSingleStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#singleExpression.
SqlVisitor.prototype.visitSingleExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#statementDefault.
SqlVisitor.prototype.visitStatementDefault = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#insertInto.
SqlVisitor.prototype.visitInsertInto = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#showColumns.
SqlVisitor.prototype.visitShowColumns = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#explain.
SqlVisitor.prototype.visitExplain = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#query.
SqlVisitor.prototype.visitQuery = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#with.
SqlVisitor.prototype.visitWith = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#queryNoWith.
SqlVisitor.prototype.visitQueryNoWith = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#hint.
SqlVisitor.prototype.visitHint = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#hintValueFieldPath.
SqlVisitor.prototype.visitHintValueFieldPath = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#hintValueNumber.
SqlVisitor.prototype.visitHintValueNumber = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#hintValueString.
SqlVisitor.prototype.visitHintValueString = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#hintValueBoolean.
SqlVisitor.prototype.visitHintValueBoolean = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#hintList.
SqlVisitor.prototype.visitHintList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#hints.
SqlVisitor.prototype.visitHints = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#queryBodySetOperation.
SqlVisitor.prototype.visitQueryBodySetOperation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#queryBodyDefault.
SqlVisitor.prototype.visitQueryBodyDefault = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#queryBodyParenthesized.
SqlVisitor.prototype.visitQueryBodyParenthesized = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#queryTermDefault.
SqlVisitor.prototype.visitQueryTermDefault = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#table.
SqlVisitor.prototype.visitTable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#inlineTable.
SqlVisitor.prototype.visitInlineTable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#subquery.
SqlVisitor.prototype.visitSubquery = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#sortItem.
SqlVisitor.prototype.visitSortItem = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#querySpecification.
SqlVisitor.prototype.visitQuerySpecification = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#groupBy.
SqlVisitor.prototype.visitGroupBy = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#singleGroupingSet.
SqlVisitor.prototype.visitSingleGroupingSet = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#rollup.
SqlVisitor.prototype.visitRollup = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#cube.
SqlVisitor.prototype.visitCube = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#multipleGroupingSets.
SqlVisitor.prototype.visitMultipleGroupingSets = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#groupingExpressions.
SqlVisitor.prototype.visitGroupingExpressions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#namedQuery.
SqlVisitor.prototype.visitNamedQuery = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#setQuantifier.
SqlVisitor.prototype.visitSetQuantifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#selectSingle.
SqlVisitor.prototype.visitSelectSingle = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#selectAll.
SqlVisitor.prototype.visitSelectAll = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#relationDefault.
SqlVisitor.prototype.visitRelationDefault = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#joinRelation.
SqlVisitor.prototype.visitJoinRelation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#joinType.
SqlVisitor.prototype.visitJoinType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#joinCriteria.
SqlVisitor.prototype.visitJoinCriteria = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#sampledRelation.
SqlVisitor.prototype.visitSampledRelation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#sampleType.
SqlVisitor.prototype.visitSampleType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#aliasedRelation.
SqlVisitor.prototype.visitAliasedRelation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#columnAliases.
SqlVisitor.prototype.visitColumnAliases = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#tableName.
SqlVisitor.prototype.visitTableName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#subqueryRelation.
SqlVisitor.prototype.visitSubqueryRelation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#unnest.
SqlVisitor.prototype.visitUnnest = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#lateral.
SqlVisitor.prototype.visitLateral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#parenthesizedRelation.
SqlVisitor.prototype.visitParenthesizedRelation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#tablePrefix.
SqlVisitor.prototype.visitTablePrefix = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#tableWorkspace.
SqlVisitor.prototype.visitTableWorkspace = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#tableFieldPart.
SqlVisitor.prototype.visitTableFieldPart = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#tableField.
SqlVisitor.prototype.visitTableField = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#tableQualifiedName.
SqlVisitor.prototype.visitTableQualifiedName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#fieldPathPart.
SqlVisitor.prototype.visitFieldPathPart = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#fieldPath.
SqlVisitor.prototype.visitFieldPath = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#expression.
SqlVisitor.prototype.visitExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#logicalNot.
SqlVisitor.prototype.visitLogicalNot = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#booleanDefault.
SqlVisitor.prototype.visitBooleanDefault = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#logicalBinary.
SqlVisitor.prototype.visitLogicalBinary = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#predicated.
SqlVisitor.prototype.visitPredicated = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#comparison.
SqlVisitor.prototype.visitComparison = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#quantifiedComparison.
SqlVisitor.prototype.visitQuantifiedComparison = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#between.
SqlVisitor.prototype.visitBetween = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#inList.
SqlVisitor.prototype.visitInList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#inSubquery.
SqlVisitor.prototype.visitInSubquery = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#like.
SqlVisitor.prototype.visitLike = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#nullPredicate.
SqlVisitor.prototype.visitNullPredicate = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#undefinedPredicate.
SqlVisitor.prototype.visitUndefinedPredicate = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#distinctFrom.
SqlVisitor.prototype.visitDistinctFrom = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#valueExpressionDefault.
SqlVisitor.prototype.visitValueExpressionDefault = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#concatenation.
SqlVisitor.prototype.visitConcatenation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#arithmeticBinary.
SqlVisitor.prototype.visitArithmeticBinary = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#arithmeticUnary.
SqlVisitor.prototype.visitArithmeticUnary = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#atTimeZone.
SqlVisitor.prototype.visitAtTimeZone = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#dereference.
SqlVisitor.prototype.visitDereference = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#namedParameter.
SqlVisitor.prototype.visitNamedParameter = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#typeConstructor.
SqlVisitor.prototype.visitTypeConstructor = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#undefinedLiteral.
SqlVisitor.prototype.visitUndefinedLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#substring.
SqlVisitor.prototype.visitSubstring = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#cast.
SqlVisitor.prototype.visitCast = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#parenthesizedExpression.
SqlVisitor.prototype.visitParenthesizedExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#normalize.
SqlVisitor.prototype.visitNormalize = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#dateFunction.
SqlVisitor.prototype.visitDateFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#intervalLiteral.
SqlVisitor.prototype.visitIntervalLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#numericLiteral.
SqlVisitor.prototype.visitNumericLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#booleanLiteral.
SqlVisitor.prototype.visitBooleanLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#simpleCase.
SqlVisitor.prototype.visitSimpleCase = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#columnReference.
SqlVisitor.prototype.visitColumnReference = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#nullLiteral.
SqlVisitor.prototype.visitNullLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#subscript.
SqlVisitor.prototype.visitSubscript = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#subqueryExpression.
SqlVisitor.prototype.visitSubqueryExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#colonCast.
SqlVisitor.prototype.visitColonCast = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#binaryLiteral.
SqlVisitor.prototype.visitBinaryLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#extract.
SqlVisitor.prototype.visitExtract = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#stringLiteral.
SqlVisitor.prototype.visitStringLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#nullValueLiteral.
SqlVisitor.prototype.visitNullValueLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#arrayConstructor.
SqlVisitor.prototype.visitArrayConstructor = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#functionCall.
SqlVisitor.prototype.visitFunctionCall = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#exists.
SqlVisitor.prototype.visitExists = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#position.
SqlVisitor.prototype.visitPosition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#searchedCase.
SqlVisitor.prototype.visitSearchedCase = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#positionalParameter.
SqlVisitor.prototype.visitPositionalParameter = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#groupingOperation.
SqlVisitor.prototype.visitGroupingOperation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#array.
SqlVisitor.prototype.visitArray = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#basicStringLiteral.
SqlVisitor.prototype.visitBasicStringLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#unicodeStringLiteral.
SqlVisitor.prototype.visitUnicodeStringLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#comparisonOperator.
SqlVisitor.prototype.visitComparisonOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#comparisonQuantifier.
SqlVisitor.prototype.visitComparisonQuantifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#booleanValue.
SqlVisitor.prototype.visitBooleanValue = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#dateFunctionName.
SqlVisitor.prototype.visitDateFunctionName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#stringInterval.
SqlVisitor.prototype.visitStringInterval = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#numericInterval.
SqlVisitor.prototype.visitNumericInterval = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#stringOnlyInterval.
SqlVisitor.prototype.visitStringOnlyInterval = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#intervalField.
SqlVisitor.prototype.visitIntervalField = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#normalForm.
SqlVisitor.prototype.visitNormalForm = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#type.
SqlVisitor.prototype.visitType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#typeParameter.
SqlVisitor.prototype.visitTypeParameter = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#baseType.
SqlVisitor.prototype.visitBaseType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#whenClause.
SqlVisitor.prototype.visitWhenClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#filter.
SqlVisitor.prototype.visitFilter = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#callOptions.
SqlVisitor.prototype.visitCallOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#over.
SqlVisitor.prototype.visitOver = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#windowFrame.
SqlVisitor.prototype.visitWindowFrame = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#unboundedFrame.
SqlVisitor.prototype.visitUnboundedFrame = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#currentRowBound.
SqlVisitor.prototype.visitCurrentRowBound = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#boundedFrame.
SqlVisitor.prototype.visitBoundedFrame = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#qualifiedName.
SqlVisitor.prototype.visitQualifiedName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#unquotedIdentifier.
SqlVisitor.prototype.visitUnquotedIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#quotedIdentifier.
SqlVisitor.prototype.visitQuotedIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#backQuotedIdentifier.
SqlVisitor.prototype.visitBackQuotedIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#decimalLiteral.
SqlVisitor.prototype.visitDecimalLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#integerLiteral.
SqlVisitor.prototype.visitIntegerLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SqlParser#nonReserved.
SqlVisitor.prototype.visitNonReserved = function(ctx) {
  return this.visitChildren(ctx);
};



exports.SqlVisitor = SqlVisitor;