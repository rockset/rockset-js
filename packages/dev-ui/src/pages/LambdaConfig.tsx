import React from 'react';
import { PebbleButton } from 'components';
import styled from 'styled-components';
import { Lambda } from './index.types';
import { pebbleTheme } from 'styles/pebbleTheme';
import { DefaultParams } from './DefaultParams';

const Wrapper = styled.div`
  padding: 10px;
  border: 1px solid ${pebbleTheme.baseColors.gray11};
  margin-right: 10px;
`;

const H3 = styled.h3`
  font-weight: 600;
  font-size: 16px;
`;

interface Props {
  lambda: Lambda;
  refresh: () => void;
}

export const LambdaConfig = ({ lambda, refresh }: Props) => {
  return (
    <Wrapper>
      <H3>Lambda Definition</H3>
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
      <DefaultParams lambda={lambda} />
      <H3>System Paths </H3>
      <strong>Lambda Definition Path: </strong>
      {lambda?.path.fullPath}
      <br />
      <br />
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
