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

export interface Props {
  apiserver: string;
  lambdas: Lambda[];
  logo: any;
  refetch: () => void;
}

export const Page = ({ lambdas, refetch }: Props) => {
  const { workspace, queryLambda } = (useParams as () => {
    workspace?: string;
    queryLambda?: string;
  })();

  const [data, setData] = React.useState([]);
  const [err, setErr] = React.useState();
  const [loading, setLoading] = React.useState<boolean>();
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [params, setParams] = usePersistedState<Record<string, Param>>(
    `QUERY_PARAMS_${workspace}_${queryLambda}`
  );

  const execute = async () => {
    refetch();
    setData([]);
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
      setData(data.results);
    } catch (e) {
      setLoading(false);
      setErr(e);
    } finally {
      setActiveTab(0);
    }
  };

  const tabs = [
    {
      header: 'Results',
      content: <Results {...{ data, err, loading }} />,
    },
    {
      header: 'Parameters',
      content: <QueryParams {...{ params, setParams }} />,
    },
    {
      header: 'Lambda',
      content: (
        <LambdaConfig
          {...{ lambdas, workspace, queryLambda, refresh: refetch }}
        />
      ),
    },
  ] as const;

  const headers = tabs.map((tab) => tab.header);
  const content = tabs.map((tab) => tab.content);

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
      <RockTabs
        activeIdx={activeTab}
        ids={headers}
        headers={headers}
        onClickTab={setActiveTab}
        centerAllTabs={true}
        includeFiller={true}
      />
      {content[activeTab]}
    </>
  );
};
