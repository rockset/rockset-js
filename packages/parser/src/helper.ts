import { TerminalNode } from 'antlr4/tree/Tree';

// **** HELPERS ****
export interface Node extends TerminalNode {
  constructor?: Function;
  children?: Node[];
}

export function getAST(node: Node, text: string): Record<string, unknown> {
  const name = node?.constructor?.name ?? 'unknown';

  if (!node.children) {
    const { start, stop } = node.getPayload();
    const value = text.substring(start, stop + 1);
    return { [name]: value };
  } else {
    const tChildren = node.children.map((x) => getAST(x, text));
    const tChild = tChildren.length === 1 ? tChildren[0] : null;
    return {
      [name]: tChild ?? tChildren,
    };
  }
}

export interface SubIndex {
  start: number;
  stop: number;
}

export const getSubIndex = (start: number, stop: number) => ({
  start,
  stop,
});

export const normalize = (text: string) => {
  const noQuotesText = text.replace(/"/g, '');
  const defaultws = text.includes('.') ? '' : 'commons.';
  return defaultws + noQuotesText;
};
export const addQuotes = (text: string) => `"${text}"`;
export const addOuterQuotes = (text: string) => addQuotes(normalize(text));
export const replaceRange = (sql: string, sub: SubIndex, repl: string) =>
  sql.substring(0, sub.start) + repl + sql.substring(sub.stop);

/**
 * Helps typescript infer tuple types correctly
 * @param data data to convert to a tuple
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function tuple<T extends any[]>(...data: T) {
  return data;
}

export class SyntaxGenericError extends Error {
  constructor({
    line,
    column,
    message,
  }: {
    line: number;
    column: number;
    message: string;
  }) {
    super(`Invalid syntax at line: ${line}, column: ${column}, ${message}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const print = (...args: any[]) =>
  console.log(JSON.stringify(args, null, 2));
