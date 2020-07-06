import * as React from 'react';
import styled from 'styled-components';
import { ButtonProps, PebbleButton } from './PebbleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { pebbleTheme } from 'styles/pebbleTheme';

interface RowProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  content?: any;
  icon?: IconProp;
  danger?: boolean;
}

interface Props {
  content: RowProps[];
  button?: ButtonProps;
  menuPosition?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    zIndex?: number;
  };
}

export const PebbleOverflowMenu = ({
  content,
  button,
  menuPosition,
}: Props) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const node = React.useRef(null);

  const handleEventListener = () =>
    showMenu
      ? document.removeEventListener(
          'mouseup',
          (event) =>
            !node?.current?.contains(event.target) && setShowMenu(false),
          false
        )
      : document.addEventListener(
          'mouseup',
          (event) =>
            !node?.current?.contains(event.target) && setShowMenu(false),
          false
        );

  return (
    <div ref={node}>
      <PebbleButton
        onClick={() => (handleEventListener(), setShowMenu(!showMenu))}
        {...button}
      />
      {showMenu && (
        <Content style={{ ...menuPosition }}>
          {content.map((row) => {
            return (
              row.content && (
                <Row
                  onClick={(event) => (row.onClick(event), setShowMenu(false))}
                  danger={row.danger}
                >
                  {row.icon && (
                    <FontAwesomeIcon
                      icon={row.icon}
                      style={{ marginRight: row.content ? 8 : 0 }}
                    />
                  )}
                  {row.content}
                </Row>
              )
            );
          })}
        </Content>
      )}
    </div>
  );
};

const Row = styled.div<{ danger: boolean; onClick: Function }>`
  color: ${(props) =>
    props.danger
      ? pebbleTheme.contextColors.status.danger
      : pebbleTheme.contextColors.text.primary};

  cursor: ${(props) => props.onClick && 'pointer'};

  font-size: ${pebbleTheme.fonts.sizes.content};
  padding: 12px;

  :hover {
    background-color: ${(props) =>
      props.danger
        ? pebbleTheme.baseColors.red5
        : pebbleTheme.baseColors.blue15};
  }
`;

const Content = styled.div`
  background-color: white;
  box-shadow: ${pebbleTheme.baseColors.shade1} 0px 2px 4px 0px;
  position: absolute;
  height: fit-content;
  width: fit-content;
  border: 1px solid ${pebbleTheme.baseColors.gray11};
`;
