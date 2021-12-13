import React from 'react';
import { Lambda } from './index.types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  line-height: 2;
  flex: 1;
  overflow: auto;
`;
export const Index = ({ lambdas }: { lambdas: Lambda[] }) => {
  return (
    <Wrapper>
      <h2>Query Lambdas </h2>
      {lambdas?.map(({ name, ws }) => (
        <>
          <Link to={`/v1/orgs/self/ws/${ws}/lambdas/${name}`}>
            {ws}.{name}
          </Link>
          <br />
        </>
      ))}
    </Wrapper>
  );
};
