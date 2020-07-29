import React from 'react';
import _ from 'lodash';
import { Lambda } from './index.types';
import { useParams } from 'react-router';
import { Param, usePersistedState } from './QueryParams.hooks';
import { Results } from './Results';
import { QueryParams } from './QueryParams';
import { PebbleButton } from 'components';
import { RockTabs } from 'RockComponents/RockTabs';
import { client } from 'lib/utils/client';
import { LambdaConfig } from './LambdaConfig';
import styled from 'styled-components';
import { QueryResponse } from '@rockset/client/dist/codegen';

export interface Props {
  apiserver: string;
  lambdas: Lambda[];
  logo: any;
  refetch: () => void;
}

const QueryTime = styled.div`
  z-index: 1;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 20px;
  width: 100%;
  overflow: hidden;
  text-align: left;
`;

const QueryTimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Page = ({ lambdas, refetch }: Props) => {
  const { workspace, queryLambda } = (useParams as () => {
    workspace?: string;
    queryLambda?: string;
  })();

  const [data, setData] = React.useState<QueryResponse>();
  const [err, setErr] = React.useState();
  const [loading, setLoading] = React.useState<boolean>();
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [params, setParams] = usePersistedState<Record<string, Param>>(
    `QUERY_PARAMS_${workspace}_${queryLambda}`
  );

  const execute = async () => {
    refetch();
    setData(null);
    setErr(null);
    setLoading(true);
    try {
      const data = await client.queryLambdas.executeQueryLambda(
        workspace,
        queryLambda,
        '1',
        {
          parameters: _.values(params).map(({ name, value, type }) => ({
            name,
            value,
            type,
          })),
        }
      );
      setLoading(false);
      setData(data);
    } catch (e) {
      setLoading(false);
      setErr(e);
    } finally {
      setActiveTab(0);
    }
  };

  const results = data?.results ?? [];

  const lambda = lambdas.filter(
    (x) => x.name === queryLambda && x.ws === workspace
  )[0];

  const tabs = [
    {
      header: 'Results',
      content: <Results {...{ data: results, err, loading }} />,
    },
    {
      header: 'Parameters',
      content: <QueryParams {...{ lambda, params, setParams }} />,
    },
    {
      header: 'Lambda',
      content: (
        <LambdaConfig
          {...{ lambda, workspace, queryLambda, refresh: refetch }}
        />
      ),
    },
  ] as const;

  const headers = tabs.map((tab) => tab.header);
  const content = tabs.map((tab) => tab.content);
  const numResults = data?.results?.length;

  return (
    <>
      <h3>
        Query Lambda:{' '}
        <span style={{ fontWeight: 400 }}>
          {workspace}.{queryLambda}
        </span>
      </h3>
      <PebbleButton
        style={{ width: 'fit-content', margin: '10px 0px' }}
        onClick={execute}
      >
        Run
      </PebbleButton>
      <QueryTimeWrapper>
        <RockTabs
          activeIdx={activeTab}
          ids={headers}
          headers={headers}
          onClickTab={setActiveTab}
          centerAllTabs={true}
          includeFiller={true}
        />
        {data?.results && (
          <QueryTime>
            <strong>
              {workspace}.{queryLambda}
            </strong>{' '}
            took <strong>{data?.stats?.elapsed_time_ms ?? 0}ms</strong> and
            returned{' '}
            <strong>
              {numResults} {numResults !== 1 ? 'rows' : 'row'}
            </strong>
            .
          </QueryTime>
        )}
      </QueryTimeWrapper>
      {content[activeTab]}
    </>
  );
};
