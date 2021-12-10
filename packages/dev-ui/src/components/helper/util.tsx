import styled from 'styled-components';

export const Space = styled.div<{ height?: string; width?: string }>`
  width: ${(props) => props.width};
  height: ${(p) => p.height};
  min-width: ${(props) => props.width};
  min-height: ${(p) => p.height};
`;

export const HorzFlex = styled.div`
  display: flex;
  flex-direction: row;
`;

export const VertFlex = styled.div`
  display: flex;
  flex-direction: column;
`;
