/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SqlListener } from './codegen/SqlListener';

import * as antlr4 from 'antlr4';
import { SqlLexer } from './codegen/SqlLexer';
import { SqlParser } from './codegen/SqlParser';
import { CaseChangingStream } from './js/caseChange';
import * as _ from 'lodash';
import {
  SubIndex,
  getSubIndex,
  normalize,
  addOuterQuotes,
  replaceRange,
  tuple,
  SyntaxGenericError,
} from './helper';

class ThrowErrorListener extends (antlr4 as any).error.ErrorListener {
  /**
   * Checks syntax error
   *
   * @param {object} recognizer The parsing support code essentially. Most of it is error recovery stuff
   * @param {object} symbol Offending symbol
   * @param {int} line Line of offending symbol
   * @param {int} column Position in line of offending symbol
   * @param {string} message Error message
   * @param {string} payload Stack trace
   */
  syntaxError(
    recognizer: object,
    symbol: object,
    line: number,
    column: number,
    message: string
  ) {
    throw new SyntaxGenericError({ line, column, message });
  }
}

class IdentifierListener extends SqlListener {
  results: Record<string, SubIndex[]>;
  constructor(results: Record<string, SubIndex[]>) {
    super();
    this.results = results;
  }

  exitQualifiedName(ctx: any) {
    const stripped = normalize(ctx.getText());
    const subIndex = getSubIndex(ctx.start.start, ctx.stop.stop + 1);
    const arr = this.results?.[stripped] ?? [];
    arr.push(subIndex);

    // storing the start and stop indices of every QualifiedName
    this.results[stripped] = arr;
  }
}

/**
 *
 * Get the parser for a string
 * @param str The string to parse
 */
export const getParser = (str: string) => {
  const chars = new antlr4.InputStream(str);
  const upper = new CaseChangingStream(chars, true);
  const lexer = new SqlLexer(upper);
  const tokens = new antlr4.CommonTokenStream(lexer as any);
  const parser = new SqlParser(tokens) as any;

  // We want to throw on exceptions
  parser.removeErrorListeners();
  parser.addErrorListener(new ThrowErrorListener());
  parser.buildParseTrees = true;
  return parser;
};

/**
 *
 * Find all collections in a string
 * @param sql The sql string
 */
export const findCollections = (sql: string) => {
  const parser = getParser(sql);
  const tree = parser.statement() as any; // the tree upon which I'll walk

  const id = new IdentifierListener({});
  (antlr4 as any).tree.ParseTreeWalker.DEFAULT.walk(id, tree);
  return id.results;
};

/**
 * Replace all collections in a sql string
 * @param sql The sql string
 * @param replaceMap the map of collections to replace
 */
export const replaceCollections = (
  sql: string,
  replaceMap: Record<string, string>
) => {
  const collectionLocations = findCollections(sql);
  const result = _.chain(replaceMap)
    .keys()
    .flatMap(
      (k) =>
        collectionLocations[normalize(k)]?.map((sub) =>
          tuple(sub, addOuterQuotes(replaceMap[k]))
        ) ?? []
    )
    .sortBy((x) => -x[0].start)
    .reduce((prev, [sub, str]) => replaceRange(prev, sub, str), sql)
    .value();
  return result;
};
