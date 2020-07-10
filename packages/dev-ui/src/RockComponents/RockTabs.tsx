import * as React from 'react';
import * as _ from 'lodash';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';
import { faTimesCircle, faCircle } from '@fortawesome/pro-regular-svg-icons';

export const RockTabsAllTabsDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 35px;
  max-height: 35px;
  width: fit-content;
  border-left: 1px solid #dadfe2;
  border-top: 1px solid #dadfe2;
`;

export const RockTabsIndividualTabDiv = styled.div.attrs<{
  selected?: boolean;
  hideBorderTop?: boolean;
  hideBorderRight?: boolean;
  narrow?: boolean;
  fillSpace?: boolean;
  beta?: boolean;
}>(({ selected, hideBorderTop, hideBorderRight, narrow, fillSpace, beta }) => ({
  selected,
  narrow,
  fillSpace,
  beta,
  fontWeight: selected ? '600' : '400',
  borderBottom: selected ? '0px' : '1px solid #dadfe2',
  borderRight: hideBorderRight ? '0px' : '1px solid #dadfe2',
}))<{
  borderRight?: string;
  borderTop?: string;
  borderBottom?: string;
  hideBorderTop?: boolean;
  hideBorderRight?: boolean;
  narrow?: boolean;
  fillSpace?: boolean;
  selected?: boolean;
  fontWeight?: string;
  center?: boolean;
  beta?: boolean;
}>`
  box-sizing: border-box;
  position: relative;
  height: 100%;
  border-right: ${(props) => props.borderRight};
  border-top: ${(props) => props.borderTop};
  border-bottom: ${(props) => props.borderBottom};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  border-radius: ${(props) => (props.narrow ? '0px 5px 0px 0px' : '0px')};

  width: ${(props) => (props.narrow ? '25px' : '100px')};
  cursor: pointer;
  flex-grow: ${(props) => (props.fillSpace ? 1 : 0)};
  background-color: ${(props) => (props.selected ? '#e9f2f8' : 'white')};
  color: #175d8d;
  font-size: 14px;
  font-weight: ${(props) => props.fontWeight};

  :after {
    display: ${(props) => (props.beta ? 'block' : 'none')};
    content: 'Beta';
    height: 15px;
    border-radius: 10px;
    background-color: #680099;
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
    color: white;
    position: absolute;
    top: -1px;
    right: -5px;
    padding: 0px 6px;
    z-index: 999;
  }
`;

export const RockTabsSelectedTabDiv = styled(RockTabsIndividualTabDiv);

const TabText = styled.div<{ center?: boolean; fillSpace?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.center ? 'center' : 'flex-start')};
  margin-left: ${(props) => (props.center ? '0px' : '10px')};
  text-align: center;
  height: 100%;

  flex: 1;
  max-width: ${(props) => (props.fillSpace ? 1000 : 80)};
`;

const Cross = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;

  margin-right: 7px;
  padding-top: 3px;
  width: 10px;

  .rock-tab-circle {
    display: none;
  }

  .rock-tab-cross {
    display: block;
    color: #9fa4a9;
  }

  &:hover {
    .rock-tab-circle {
      display: block;
    }

    .rock-tab-cross {
      display: none;
    }
  }
`;

export const RockTimesCircleHover = ({ onClick, style = {}, index = 0 }) => {
  return (
    <Cross onClick={onClick} style={style} id={`rock_circle_cross_${index}`}>
      <div className="rock-tab-cross">
        <FontAwesomeIcon icon={faTimes} color="#9fa4a9" />
      </div>
      <div className="rock-tab-circle">
        <FontAwesomeIcon icon={faTimesCircle} color="#9fa4a9" />
      </div>
    </Cross>
  );
};

const Filler = styled.div`
  flex: 1;
  border-bottom: 1px solid #dadfe2;
`;

interface Props {
  activeIdx: number;
  headers: string[];
  onClickTab: (idx: number) => void;
  onClickCross?: (idx: number) => void;
  ids: string[];
  addButton?: boolean;
  hideBorderTop?: boolean;
  textStyles?: React.CSSProperties[];
  centerAllTabs?: boolean;
  fillSpace?: boolean;
  borderRight?: boolean;
  includeFiller?: boolean;
  errors?: boolean[];
  beta?: boolean[];
}

export const RockTabs: React.SFC<Props> = ({
  headers,
  activeIdx,
  onClickTab,
  ids,
  onClickCross,
  addButton = false,
  hideBorderTop = false,
  textStyles = [],
  centerAllTabs = false,
  fillSpace = false,
  borderRight = true,
  includeFiller = false,
  errors = [],
  beta = [],
}) => {
  const onClickCrossReal = onClickCross ?? (() => null);
  const deletable = onClickCross != null;
  return (
    <RockTabsAllTabsDiv>
      {_.map(headers, (header, index: number) => {
        const lastTab = index === headers.length - 1;
        return (
          <RockTabsIndividualTabDiv
            selected={index === activeIdx}
            onClick={() => onClickTab(index)}
            key={ids[index]}
            narrow={addButton && lastTab}
            hideBorderTop={hideBorderTop}
            fillSpace={fillSpace}
            hideBorderRight={lastTab && !borderRight}
            beta={(beta?.length ?? 0 > index) && beta[index]}
          >
            <TabText
              style={textStyles[index] ?? {}}
              center={(addButton && lastTab) || centerAllTabs}
              data-tip={fillSpace || header.length < 12 ? '' : header}
              fillSpace={fillSpace}
            >
              {fillSpace ? header : _.truncate(header, { length: 11 })}
            </TabText>
            {errors?.[index] && (
              <span
                style={{
                  color: '#E0182D',
                  right: 5,
                  fontSize: '8px',
                  marginRight: '5px',
                  marginLeft: '-5px',
                }}
              >
                <FontAwesomeIcon icon={faCircle} color="#E0182D" size="sm" />
              </span>
            )}
            {deletable && (!addButton || index !== headers.length - 1) && (
              <RockTimesCircleHover
                onClick={() => onClickCrossReal(index)}
                index={index}
              />
            )}
          </RockTabsIndividualTabDiv>
        );
      })}
      {includeFiller && <Filler />}
    </RockTabsAllTabsDiv>
  );
};
