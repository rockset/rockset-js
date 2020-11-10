/**
 * This file shows how to integrate custom fetch functionality into the rockset fetch api.
 * We use axios in this example, and enable automatic retrying of failed requests.
 */

import axios from 'axios';
import rocksetConfigure from '..';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
  retries: 3, // number of retries
  retryDelay: (retryCount: number) => {
    return retryCount * 2000; // time interval between retries
  },
  retryCondition: (error: any) => {
    // if retry condition is not specified, by default idempotent requests are retried
    return error.response.status === 502;
  },
});

// Super simple fetch with axios: axios docs show how to check for errors, cancel requests etc.
const customFetchAxios = async (
  url: string,
  { headers, method, body: data, queryParams: params }: any
) => {
  const res = await axios.request({
    url,
    headers,
    method,
    data,
    params,
  });

  return res.data;
};

// Configure
const basePath = process.env.ROCKSET_HOST || 'https://api.rs2.usw2.rockset.com';
const apikey = process.env.ROCKSET_APIKEY as string;

const rocksetClient = rocksetConfigure(apikey, basePath, customFetchAxios);

const writeData = async (data: any) => {
  const res = await rocksetClient.documents.addDocuments("commons", "asdfasdf", {
    data
  }).catch(err => {
    console.log(err.code)
  });
  return res;
}

// call write from your application:
// ...
writeData([{ 'some': 'data' }]);
// ...
