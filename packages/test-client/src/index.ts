import { fileutil } from '@rockset/core';
import { MainApi } from '@rockset/client';
import { replaceCollections } from '@rockset/parser';
import {
  QueryParameter,
  mergeParameters,
  parseLambdaQualifiedName,
} from '@rockset/core/dist/types';
import { QueryRequestSql } from '@rockset/client/dist/codegen/api';
import copy, { Draft } from 'immer';
import { errorInvalidQualifiedName } from '@rockset/core/dist/exception/exception';
import { createClient } from '@rockset/core/dist/main';

interface Sql extends QueryRequestSql {
  query: string;
  parameters: QueryParameter[];
}
interface SQLTesterData {
  client: MainApi;
  sql: Sql;
}

export class SQLTester {
  client: MainApi;
  sql: Sql;

  constructor({ client, sql }: SQLTesterData) {
    this.client = client;
    this.sql = sql;
  }

  private _raw() {
    return { client: this.client, sql: this.sql } as SQLTesterData;
  }

  private _copy(f: (draft: Draft<Sql>) => void) {
    return new SQLTester({
      client: this.client,
      sql: copy(this.sql, f),
    });
  }

  defaultRowLimit(rowLimit: number) {
    return this._copy((x) => {
      x.default_row_limit = rowLimit;
    });
  }

  generateWarnings(generateWarnings: boolean) {
    return this._copy((x) => {
      x.generate_warnings = generateWarnings;
    });
  }

  profilingEnabled(generatePerformanceProfile: boolean) {
    return this._copy((x) => {
      x.profiling_enabled = generatePerformanceProfile;
    });
  }

  substituteCollections(mock: Record<string, string>) {
    return this._copy((x) => {
      x.query = replaceCollections(this.sql.query, mock);
    });
  }

  addParameter(queryParameter: QueryParameter) {
    return this.addParameters([queryParameter]);
  }

  addParameters(queryParameters: QueryParameter[]) {
    return this._copy((x) => {
      x.parameters = mergeParameters(this.sql.parameters, queryParameters);
    });
  }

  removeParameter(name: string) {
    return this._copy((x) => {
      x.parameters = this.sql.parameters.filter((x) => x.name !== name);
    });
  }

  removeAllParameters() {
    return this._copy((x) => {
      x.parameters = [];
    });
  }

  async execute() {
    return this.client.queries.query({
      sql: this.sql,
    });
  }

  async validate() {
    return this.client.queries.validate({
      sql: this.sql,
    });
  }
}

/**
 * Get a Rockset Client object from the environment. This client is loaded with the current active auth profile for the Rockset CLI.
 */
export const getCLIClient = async () => {
  return createClient();
};

/**
 * Load a query lambda from the local project
 *
 * @param qualifiedName The qualified name of the lambda you with to load. Formatted as {ws}.{lambda}, eg. "commons.myLambda"
 * @param client A Rockset Client object. This object can either be generated manually, or can use @function getCLIClient to load a client with the
 * active auth profile for the Rockset CLI
 */
export const loadLocalLambda = async (
  qualifiedName: string,
  client: MainApi
) => {
  if (typeof qualifiedName === 'string') {
    const qualifiedNameParsed = parseLambdaQualifiedName(qualifiedName);
    const lambda = await fileutil.readLambdaFromQualifiedName(
      qualifiedNameParsed
    );
    return new SQLTester({
      client,
      sql: {
        query: lambda.sql,
        parameters: lambda.config.default_parameters ?? [],
      },
    });
  } else {
    throw errorInvalidQualifiedName('Qualified name must be a string');
  }
};

export const loadSql = (query: string, client: MainApi) => {
  return new SQLTester({
    client,
    sql: {
      query: query,
      parameters: [],
    },
  });
};
