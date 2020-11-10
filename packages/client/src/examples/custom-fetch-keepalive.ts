/**
 * This file shows how to integrate custom fetch functionality into the rockset fetch api.
 * We use axios in this example, and re-use shared HTTP connections instead of creating new
 * connections on every request. Useful for conserving connections for high-throughput actions,
 * such as writing documents to collections at a high rate.
 */

import rockset from '..';
// import rockset from "@rockset/client";  // replace above line if using outside repo
import axios from "axios";
import * as HttpAgent from "agentkeepalive";

// Configure
const basePath = process.env.ROCKSET_HOST || 'https://api.rs2.usw2.rockset.com';
const apikey = process.env.ROCKSET_APIKEY as string;

const { HttpsAgent } = HttpAgent;

// create axios instance with agentkeepalive -- re-use shared session when 
// possible instead of creating new sessions on each request.
const axiosInstance = axios.create({
  httpAgent:  new HttpAgent(),
  httpsAgent:  new HttpsAgent()
});

const customFetchKeepAlive = async (
  url: string,
  { headers, method, body: data, queryParams: params }: any
) => {
  const res = await axiosInstance.request({
    url,
    headers,
    method,
    data,
    params,
  });
  return res.data;
};

const rocksetClient = rockset(apikey, basePath, customFetchKeepAlive);


const writeData = async (data: any) => {
  const res = await rocksetClient.documents.addDocuments("commons", "asdfasdf", {
    data
  }).catch(console.log);
  return res;
}

// call write from your application:
// ...
writeData([{ 'some': 'data' }]);
// ...
