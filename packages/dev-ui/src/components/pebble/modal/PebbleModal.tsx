import * as React from 'react';
import { PebbleButton } from 'components';
import { ButtonProps } from 'components/pebble/button/PebbleButton';
import { CSSProperties } from 'styled-components';
import {
  Modal,
  ModalWrapper,
  CloseWrapper,
  Close,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './ModalStyles';

interface Props {
  showModal: boolean;
  heading?: string;
  onClose?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  closeOnClickOutside?: boolean;
  primaryButton?: ButtonProps;
  secondaryButton?: ButtonProps;
  children?: any;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
}

export const PebbleModal = ({
  heading,
  showModal,
  onClose,
  closeOnClickOutside = true,
  primaryButton,
  secondaryButton,
  children,
  style,
  bodyStyle,
}: Props) => (
  <ModalWrapper
    onClick={(event) => {
      closeOnClickOutside && onClose(event);
      event.stopPropagation();
    }}
    showModal={showModal}
  >
    <Modal onClick={(event) => event.stopPropagation()} style={style}>
      <CloseWrapper>
        <Close onClick={onClose}>&times;</Close>
      </CloseWrapper>
      {heading && <ModalHeader>{heading}</ModalHeader>}
      <ModalBody style={bodyStyle}>{children}</ModalBody>
      {primaryButton && (
        <ModalFooter>
          {secondaryButton && (
            <PebbleButton {...secondaryButton} style={{ marginRight: 12 }} />
          )}
          {primaryButton && <PebbleButton {...primaryButton} />}
        </ModalFooter>
      )}
    </Modal>
  </ModalWrapper>
);
