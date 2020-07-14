import React from 'react';
import { HorzFlex } from 'components/helper/util';
import { Space, PebbleButton } from 'components';
import styled from 'styled-components';
import { Lambda } from './index.types';

const Wrapper = styled.div`
  padding: 10px;

  h3 {
    font-weight: 600;
    font-size: 16;
  }
`;

interface Props {
  workspace: string;
  queryLambda: string;
  lambdas: Lambda[];
  refresh: () => void;
}

export const LambdaConfig = ({
  workspace,
  queryLambda,
  lambdas,
  refresh,
}: Props) => {
  const lambda = lambdas.filter(
    (x) => x.name === queryLambda && x.ws === workspace
  )[0];
  return (
    <Wrapper>
      <h3>Lambda Definition</h3>
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
      <div
        style={{
          display: 'flex',
          padding: '10px 0px',
          flexDirection: 'column',
        }}
      >
        <h3>Default Parameters</h3>
        {lambda?.default_parameters.length <= 0 ? 'None' : ''}
        <HorzFlex>
          {lambda?.default_parameters.map((p) => (
            <>
              <strong>{p.name}:</strong> <Space width="2px" />
              {p.value}
              <Space width="10px" />
            </>
          ))}
        </HorzFlex>
      </div>
      <h3>System Paths </h3>
      <strong>Lambda Definition Path: </strong>
      {lambda?.path.fullPath} <br />
      <strong>Lambda SQL Path: </strong>
      {lambda?.path.sqlPath}
      <br /> <br />
      <PebbleButton
        text="Refresh"
        role="secondary"
        onClick={refresh}
        style={{ width: 'fit-content', marginRight: 8 }}
      />
    </Wrapper>
  );
};
