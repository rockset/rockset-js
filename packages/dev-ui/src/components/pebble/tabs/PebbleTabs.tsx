import * as React from 'react';
import { Tab, Tabs } from './TabsStyles';
import { CSSProperties } from 'styled-components';

interface Props {
  tabs: string[];
  selected: string;
  onSelectionChange: (selectedTab: string) => void;
  style: CSSProperties;
}

export const PebbleTabs = ({ tabs, selected, onSelectionChange, style }: Props) => (
  <Tabs style={style}>
    {tabs.map(tab => (
      <Tab activeTab={selected === tab} onClick={() => onSelectionChange(tab)}>
        {tab}
      </Tab>
    ))}
  </Tabs>
);
