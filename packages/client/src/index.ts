import * as api from './codegen/api';
import { version } from './version';
require('node-fetch');

export interface MainApi {
  users: api.UsersApi;
  apikeys: api.ApiKeysApi;
  workspaces: api.WorkspacesApi;
  collections: api.CollectionsApi;
  documents: api.DocumentsApi;
  integrations: api.IntegrationsApi;
  orgs: api.OrganizationsApi;
  queries: api.QueriesApi;
  queryLambdas: api.QueryLambdasApi;
}

/**
 * Returns a master object for all rockset apis
 *
 * @param apikey Your rockset APIKEY
 * @param host The rockset apiserver that you are hitting, eg https://api.rs2.usw2.rockset.com
 */
const rocksetConfigure = (
  apikey: string,
  host: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFetch?: (url: string, request: any) => Promise<any>
): MainApi => {
  // Overwrite the apikey so it doesn't need to be specified on every query
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authFetch = async (url: string, options: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newOptions = {
      ...options,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      headers: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ...options.headers,
        Authorization: `ApiKey ${apikey}`,
        'User-Agent': `Rockset Node SDK/${version}`,
      },
    };

    // Override the custom fetch so that the user doesn't see .json() issues
    if (customFetch) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const out = await customFetch(url as string, newOptions);
      return {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        json: () => out,
        status: 200,
      } as Response;
    } else {
      const response = await fetch(url, newOptions);
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const err: api.ErrorModel = (await response.json()) ?? {
          message: 'Unknown Error',
        };
        err.toString = () => err?.message ?? JSON.stringify(err, null, 2);
        throw err;
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryFetch = async (url: string, options: any) => {
    const response = await authFetch(url, options);

    const queryResponse: api.QueryResponse =
      ((await response.json()) as api.QueryResponse) ?? {};

    // We can sometimes have a query exception that occurs after sending the status code,
    // so catch that here.
    // The server only sends one error for now so just look at the first one in the list.
    if (queryResponse.query_errors && queryResponse.query_errors.length > 0) {
      const queryError = queryResponse.query_errors[0];
      const err: api.ErrorModel = {
        message: queryError.message,
      };

      throw err;
    }

    return {
      json: () => queryResponse,
      status: 200,
    } as Response;
  };

  return {
    users: new api.UsersApi({}, host, authFetch),
    apikeys: new api.ApiKeysApi({}, host, authFetch),
    workspaces: new api.WorkspacesApi({}, host, authFetch),
    collections: new api.CollectionsApi({}, host, authFetch),
    documents: new api.DocumentsApi({}, host, authFetch),
    integrations: new api.IntegrationsApi({}, host, authFetch),
    orgs: new api.OrganizationsApi({}, host, authFetch),
    queries: new api.QueriesApi({}, host, queryFetch),
    queryLambdas: new api.QueryLambdasApi({}, host, queryFetch),
  };
};

export default rocksetConfigure;
