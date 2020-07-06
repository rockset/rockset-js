import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionItemContent,
} from './AccordionStyles';
import { CSSProperties } from 'styled-components';
import { faAngleDown, faAngleUp } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AccordionProps {
  children: React.ReactElement<AccordionItemProps>[];
  style?: CSSProperties;
}

export const PebbleAccordion = ({ children, style }: AccordionProps) => {
  return <Accordion style={style}>{children}</Accordion>;
};

interface AccordionItemProps {
  header: any;
  children: any;
}

interface UncontrolledProps extends AccordionItemProps {
  open: boolean;
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export const PebbleAccordionItemUncontrolled = ({
  open,
  onClick,
  header,
  children,
}: UncontrolledProps) => {
  return (
    <>
      <AccordionItem onClick={onClick} open={open}>
        <AccordionHeader>
          {header}
          <FontAwesomeIcon
            icon={open ? faAngleUp : faAngleDown}
            style={{ marginLeft: 6 }}
          />
        </AccordionHeader>
        {open && children}
      </AccordionItem>
    </>
  );
};

export const PebbleAccordionItemControlled = ({
  header,
  children,
}: AccordionItemProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <PebbleAccordionItemUncontrolled
      open={open}
      onClick={() => setOpen(!open)}
      header={header}
    >
      <AccordionItemContent>{children}</AccordionItemContent>
    </PebbleAccordionItemUncontrolled>
  );
};
