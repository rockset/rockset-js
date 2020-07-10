import React, { useEffect, useState } from 'react';
import RockDataTable from './RockComponents/RockDataTable';
import rocksetConfigure from '@rockset/client';
import * as _ from 'lodash';

import {
  Switch,
  Route,
  useParams,
  BrowserRouter as Router,
  Link,
} from 'react-router-dom';
import { RockTabs } from './RockComponents/RockTabs';
import { QueryParams, QueryParam } from './QueryParams';
import { PebbleButton } from 'components';
import { Param } from 'QueryParams.hooks';

// declare function useParams(): { workspace?: string; queryLambda?: string };

const client = rocksetConfigure('', '');

function App() {
  const [apiserver, setApiserver] = React.useState('[apiserver]');
  const [lambdas, setLambdas] = React.useState<Lambda[]>([]);
  const logo = require('logo.svg');

  const fetchLambdas = () => {
    fetch('/lambdas')
      .then((res) => res.json())
      .then((l: LambdaResponse) => {
        console.log(l);
        setLambdas(l.lambdas);
        setApiserver(l.apiserver);
        return true;
      })
      .catch((e) => console.error(e));
  };
  useEffect(() => {
    fetchLambdas();
  }, []);

  return (
    <div
      style={{
        padding: '30px',
        height: '95vh',
        width: '95vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Source Sans Pro',
      }}
      id="rockset-body"
    >
      <Router>
        <Switch>
          <Route path="/v1/orgs/self/ws/:workspace/lambdas/:queryLambda">
            <Page
              apiserver={apiserver}
              lambdas={lambdas}
              logo={logo}
              refetch={fetchLambdas}
            />
          </Route>
          <Route path="/">
            {' '}
            <Index lambdas={lambdas} logo={logo}></Index>{' '}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

interface Lambda {
  name: string;
  ws: string;
  path: {
    sqlPath: string;
    fullPath: string;
  };
  sql: string;
  default_parameters?:
    | {
        name: string;
        value: string;
        type: string;
      }[]
    | undefined;
}
interface LambdaResponse {
  lambdas: Lambda[];
  apiserver: string;
}

interface Props {
  apiserver: string;
  lambdas: Lambda[];
  logo: any;
  refetch: Function;
}

const Index = ({ lambdas, logo }: { lambdas: Lambda[]; logo: any }) => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <img src={logo} height={40} />
      </div>
      <h2>Query Lambdas </h2>
      {lambdas?.map(({ name, ws }) => (
        <>
          <Link to={`/v1/orgs/self/ws/${ws}/lambdas/${name}`}>
            {ws}.{name}
          </Link>
          <br />
        </>
      ))}
    </>
  );
};

const useEffectOnce = (effect) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
};

const Results = ({ data, err }: { data: unknown[]; err: unknown }) => {
  return data && data.length > 0 ? (
    <div
      style={{
        display: 'flex',
        overflow: 'hidden',
        flex: 1,
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          height: '50%',
          overflow: 'scroll',
          border: '1px solid #dadfe2',
        }}
      >
        <RockDataTable data={data} />
      </div>
      <div
        style={{
          flex: 1,
          overflow: 'scroll',
        }}
      >
        <ResultsJson resultsJson={JSON.stringify(data, null, 2)} />
      </div>
    </div>
  ) : err ? (
    <ResultsJson resultsJson={JSON.stringify(err, null, 2)} />
  ) : null;
};

const Page = ({ apiserver, lambdas, logo, refetch }: Props) => {
  const { workspace, queryLambda } = (useParams as () => {
    workspace?: string;
    queryLambda?: string;
  })();

  const lambda = lambdas.filter(
    (x) => x.name === queryLambda && x.ws === workspace
  )[0];

  const [data, setData] = React.useState([]);
  const [err, setErr] = React.useState();
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [params, setParams] = useState<Record<string, Param>>();

  const execute = async () => {
    setData([]);
    setErr(null);
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
      setData(data.results);
    } catch (e) {
      setErr(e);
    } finally {
      setActiveTab(0);
    }
  };

  useEffectOnce(() => {
    execute().catch(console.error);
  });

  const tabs = [
    {
      header: 'Results',
      content: <Results {...{ data, err }} />,
    },
    {
      header: 'Parameters',
      content: <QueryParams {...{ params, setParams }} />,
    },
    {
      header: 'Details',
      content: <QueryConfig {...{ apiserver, lambda }} />,
    },
  ] as const;

  const headers = tabs.map((tab) => tab.header);
  const content = tabs.map((tab) => tab.content);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} height={40} style={{ marginRight: 8 }} />
        <h1>Developer UI</h1>
      </div>
      <h2>
        Query Lambda: {workspace}.{queryLambda}
      </h2>
      <div
        style={{
          border: '1px solid #dfe3e6',
          maxHeight: '20vh',
          overflow: 'auto',
        }}
        className="bx--snippet"
      >
        <pre className="fs-secret" style={{ margin: 0 }}>
          <code className="hljs rockjson">{lambda?.sql}</code>
        </pre>
      </div>
      <h3>{`Default Parameters: ${
        lambda?.default_parameters.length <= 0 ? 'None' : ''
      }`}</h3>
      <div style={{ display: 'flex' }}>
        {lambda?.default_parameters.map((param) => (
          <QueryParam
            param={{ id: param.name, ...param }}
            key={param.name}
            editParam={null}
            removeParam={null}
          />
        ))}
      </div>
      <PebbleButton
        text="Refresh"
        role="secondary"
        onClick={() => refetch()}
        style={{ width: 'fit-content', marginRight: 8 }}
      />
      <h3>File System Configuration Path: {lambda?.path.fullPath}</h3>
      <PebbleButton
        style={{ width: 'fit-content', margin: '10px 0px' }}
        onClick={execute}
      >
        Run Lambda
      </PebbleButton>
      <RockTabs
        activeIdx={activeTab}
        ids={headers}
        headers={headers}
        onClickTab={setActiveTab}
        centerAllTabs={true}
      />
      {content[activeTab]}
    </>
  );
};

const ResultsJson = ({ resultsJson }) => {
  return (
    <div
      className="bx--snippet"
      style={{
        padding: '0px',
        fontSize: '12px',
        overflowWrap: 'break-word',
        overflow: 'auto',
        margin: '10px 10px 10px 0px',
        border: '1px solid #dfe3e6',
      }}
    >
      <pre
        className="fs-secret"
        style={{ minHeight: '20vh', maxWidth: '100%' }}
      >
        {/* Set max width of rendered JSON as 1m chars */}
        <code className="hljs rockjson">
          {_.truncate(resultsJson, { length: 1000000 })}
        </code>
      </pre>
    </div>
  );
};

const QueryConfig = ({
  apiserver,
  lambda: { name, ws, path },
}: {
  apiserver: string;
  lambda: Lambda;
}) => {
  return (
    <>
      <pre>
        <code>
          POST: /v1/orgs/self/ws/{ws}/lambdas/
          {name}
          /versions/YOUR_VERSION <br />
          Rockset Apiserver: {apiserver} <br />
          File System Configuration Path: {path.fullPath}
          <br />
          SQL File Path: {path.sqlPath}
          <br />
          Executing lambdas on this page will execute the corresponding lambda
          from your file system. The request will be forwarded using the rockset
          cli tool.
        </code>
      </pre>
    </>
  );
};

export default App;
