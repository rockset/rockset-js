import React, { useEffect } from 'react';
import RockDataTable from './RockComponents/RockDataTable';
import rocksetConfigure from 'rockset';
import * as _ from 'lodash';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

declare function useParams(): { workspace?: string; queryLambda?: string };

const client = rocksetConfigure('', '');

function App() {
  return (
    <div
      style={{
        padding: '30px',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Router>
        <Switch>
          <Route path="/v1/orgs/self/ws/:workspace/lambdas/:queryLambda">
            <Page />
          </Route>
          <Route path="/">
            {' '}
            <Index></Index>{' '}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const Index = () => {
  const [lambdas, setLambdas] = React.useState([]);

  useEffect(() => {
    fetch('/lambdas')
      .then((res) => res.json())
      .then((l) => setLambdas(l))
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <h2>Query Lambdas </h2>
      {lambdas.map(({ name, ws }) => (
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

const Page = () => {
  const { workspace, queryLambda } = useParams();
  const [data, setData] = React.useState([]);
  const [err, setErr] = React.useState();

  const execute = async () => {
    setData([]);
    setErr(null);
    try {
      const data = await client.queryLambdas.executeQueryLambda(
        workspace,
        queryLambda,
        '1'
      );
      setData(data.results);
    } catch (e) {
      setErr(e);
    }
  };

  useEffectOnce(() => {
    execute().catch(console.error);
  });

  return (
    <>
      <h2>Rockset Query Lambda</h2>
      <pre>
        <code>
          POST: /v1/orgs/self/ws/{workspace}/lambdas/{queryLambda}/versions/1
        </code>
      </pre>
      <button onClick={execute} style={{ margin: '10px', width: '100px' }}>
        Execute
      </button>
      {data && data.length > 0 ? (
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
      ) : null}
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
        style={{ minHeight: '56px', maxWidth: '100%' }}
      >
        {/* Set max width of rendered JSON as 1m chars */}
        <code className="hljs rockjson">
          {_.truncate(resultsJson, { length: 1000000 })}
        </code>
      </pre>
    </div>
  );
};

export default App;
