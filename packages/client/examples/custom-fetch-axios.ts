/**
 * This file shows how to integrate custom fetch functionality into the rockset fetch api.
 * We use axios in this example, and enable cancelling a request through axios
 *
 * Note: this method DOES NOT cancel the request on rockset servers. It simply rejects the promise returned by axios.
 */
import axios from "axios";
import rocksetConfigure from "rockset";

// Super simple fetch with axios: axios docs show how to check for errors, cancel requests etc.
const customFetchAxios = async (
  url: string,
  { headers, method, body: data, queryParams: params, cancelToken }: any
) => {
  const res = await axios.request({
    url,
    headers,
    method,
    data,
    params,
    cancelToken,
  });

  return res.data;
};

// Configure
const basePath = process.env.ROCKSET_HOST || "https://api.rs2.usw2.rockset.com";
const apikey = process.env.ROCKSET_APIKEY as string;

const rockset = rocksetConfigure(apikey, basePath, customFetchAxios);
const cancelSource = axios.CancelToken.source();

// To execute a query
rockset.queries
  .query(
    { sql: { query: "Select count(*) from _events" } },
    { cancelToken: cancelSource.token }
  )
  .then(console.log)
  .catch(console.error);

// To cancel the request through axios
// Note: this closes the HTTP connection but will not stop query execution on our servers
cancelSource.cancel();
