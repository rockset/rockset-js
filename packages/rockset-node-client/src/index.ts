import * as api from "./codegen/api";
require("node-fetch");

/**
 * Returns a master object for all rockset apis
 *
 * @param apikey Your rockset APIKEY
 * @param host The rockset apiserver that you are hitting, eg https://api.rs2.usw2.rockset.com
 */
const rocksetConfigure = (
  apikey: string,
  host: string,
  customFetch?: (url: string, request: any) => Promise<any>
) => {
  // Overwrite the apikey so it doesn't need to be specified on every query
  const authFetch = async (url: string, options: any) => {
    const newOptions = {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `ApiKey ${apikey}`
      }
    };

    // Override the custom fetch so that the user doesn't see .json issues
    if (customFetch) {
      const out = await customFetch(url as string, newOptions);
      return {
        json: () => out,
        status: 200
      } as Response;
    } else {
      return fetch(url, newOptions);
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
