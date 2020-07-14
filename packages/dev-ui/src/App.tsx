import React, { useEffect } from 'react';

import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Index } from 'pages/IndexPage';
import { Lambda, LambdaResponse } from 'pages/index.types';
import { Page } from 'pages/LambdaPage';
import styled from 'styled-components';
const logo = require('logo.svg');

// Make the a the same size as it's parent div
// Requires the parent to be positioned relatively
const HyperA = styled.a`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const WrapAll = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const WrapInner = styled.div`
  padding: 30px 0px 10px 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: Source Sans Pro;
  flex: 1;
`;

const Logo = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <HyperA href="/" />
      <img
        src={logo}
        height={40}
        style={{ marginRight: 8 }}
        alt="Rockset Logo"
      />
      <h1>Developer UI</h1>
    </div>
  );
};

function App() {
  const [apiserver, setApiserver] = React.useState('[apiserver]');
  const [lambdas, setLambdas] = React.useState<Lambda[]>([]);

  const fetchLambdas = () => {
    fetch('/lambdas')
      .then((res) => res.json())
      .then((l: LambdaResponse) => {
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
    <WrapAll>
      <WrapInner>
        <Logo />
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
              <Index lambdas={lambdas} />
            </Route>
          </Switch>
        </Router>
      </WrapInner>
    </WrapAll>
  );
}

export default App;
