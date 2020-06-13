import * as api from './codegen/api';
import { version } from './version';
require('node-fetch');

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
) => {
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

    // Override the custom fetch so that the user doesn't see .json issues
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
        throw await response.json();
      }
    }
  };

  return {
    users: new api.UsersApi({}, host, authFetch),
    apikeys: new api.ApiKeysApi({}, host, authFetch),
    workspaces: new api.WorkspacesApi({}, host, authFetch),
    collections: new api.CollectionsApi({}, host, authFetch),
    documents: new api.DocumentsApi({}, host, authFetch),
    integrations: new api.IntegrationsApi({}, host, authFetch),
    orgs: new api.OrganizationsApi({}, host, authFetch),
    queries: new api.QueriesApi({}, host, authFetch),
    queryLambdas: new api.QueryLambdasApi({}, host, authFetch),
  };
};

export default rocksetConfigure;
