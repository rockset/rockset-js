import * as React from 'react';
import styled from 'styled-components';
import { HorzFlex } from 'components/helper/util';
import { Space } from 'components';
import { Lambda } from './index.types';

const Wrapper = styled.div`
  display: flex;
  padding: 10px 0px;
  flex-direction: column;
`;

export const DefaultParams = ({ lambda }: { lambda: Lambda }) => {
  return (
    <Wrapper>
      <h3 style={{ fontWeight: 600, fontSize: 16 }}>Default Parameters</h3>
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
    </Wrapper>
  );
};
