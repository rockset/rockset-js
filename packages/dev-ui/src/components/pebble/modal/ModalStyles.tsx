import styled from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';

const fonts = pebbleTheme.fonts;

export const ModalWrapper = styled.div<{ showModal: boolean }>`
  display: flex;
  position: fixed;
  z-index: ${(props) => (props.showModal ? 10000 : -1)};
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  visibility: ${(props) => (props.showModal ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.showModal ? 1 : 0)};
  background-color: ${pebbleTheme.baseColors.blue20};
`;

export const Modal = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  background-color: ${pebbleTheme.baseColors.white};
  margin: auto;
  border-style: solid;
  border-width: 0px;
  border-top-width: 4px;
  border-color: ${pebbleTheme.baseColors.blue8};
  max-height: 1000px;
  max-width: 1000px;
  box-shadow: ${pebbleTheme.baseColors.shade1} 0px 12px 24px 0px;
`;

export const CloseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 10px;
`;

export const Close = styled.div<{
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}>`
  margin-right: 20px;
  display: flex;
  justify-self: center;
  font-size: 28px;
  font-weight: ${pebbleTheme.fonts.weights.bold};
  width: 20px;
  height: 20px;

  color: ${pebbleTheme.baseColors.gray11};

  &:hover,
  &:focus {
    color: ${pebbleTheme.baseColors.gray3};
    cursor: pointer;
  }
`;

export const ModalHeader = styled.header`
  font-weight: ${fonts.weights.lighter};
  font-size: ${fonts.sizes.modalHeader};
  font-family: ${fonts.families.ssp};
  color: ${pebbleTheme.baseColors.gray3};
  display: flex;
  align-items: center;
  justify-content: left;
  min-height: 70px;
  padding: 0px 42px;
`;

export const ModalBody = styled.main`
  flex-grow: 1;
  padding: 15px 42px 30px 42px;
  overflow: auto;
`;

export const ModalFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 42px;
  min-height: 80px;
  background-color: ${pebbleTheme.baseColors.blue14};
  position: sticky;
  bottom: 0px;
`;
