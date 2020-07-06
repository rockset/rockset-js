import * as React from 'react';
import { faExclamationCircle } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { ErrorModel } from '@rockset/client/dist/codegen';

export interface RockError {
  type?: string;
  message?: string;
}

export const ROCK_ERROR_CTA_TYPE_PARAMETER = 'ROCK_ERROR_CTA_TYPE_PARAMETER';
export const ROCK_ERROR_CTA_TYPE_DEFAULT = 'ROCK_ERROR_CTA_TYPE_DEFAULT';

type EditorPosition = [number, number];

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  error: RockError | ErrorModel;
  className?: string;
  dispatch?: any;
  alternateCTA?: RockErrorCTAOverride;
  editorPosition?: EditorPosition;
  editorPositionOnClick?: () => void;
}

interface RockErrorCTAOverride {
  text: string;
  onClick: () => void;
  type?: string;
}

const NotificationWrapper = styled.div`
  padding: 8px;
  border: 1px solid #e0182d;
  border-left: 6px solid #e0182d;
  display: flex;
  margin: 10px 0px;
  max-width: 100%;
  flex: 1;

  padding-right: 20px;

  div > svg {
    color: #e0182d;
  }
  a {
    cursor: pointer;

    text-decoration: underline;
    font-size: 14;
  }
`;

const ErrorType = styled.div`
  font-size: 14px;
  color: #1b2834;
  font-weight: 600;
  line-height: 16px;
`;

const ErrorMessage = styled.div`
  margin-top: 2px;
  font-size: 14px;
  line-height: 16px;
  color: #5f6870;
  font-weight: 400;
`;

/**
 * Determines if this is a named parameter missing error.
 * A little bit hacky and brittle, should find a better way to do this long term
 * @param type
 * @param message
 */

const isNamedParameterMissingError = (message: string) =>
  message?.match?.(/^Named parameter ".*" required, but not given$/) != null;

export const transformMissingParameterMessage = (message) =>
  isNamedParameterMissingError(message)
    ? message + '. Please add the parameter in the parameters tab.'
    : message;

const addEditorPosition = (
  message: string,
  position: EditorPosition,
  editorPositionOnClick: () => void
) => {
  return position ? (
    <>
      {message}. Position:{' '}
      <a onClick={editorPositionOnClick}>
        line: {position[0]}, ch: {position[1]}
      </a>
    </>
  ) : (
    message
  );
};

export const RockErrorMessageImpl: React.SFC<Props> = ({
  error,
  editorPosition,
  editorPositionOnClick,
}) => {
  const { type = 'Unknown' } = error;
  let { message = 'Unknown Error' } = error;
  // If for some reason object message sneaks through, at least stringify it and don't show [Object object]
  if (typeof message === 'object') {
    message = JSON.stringify(message);
  }

  const realMessage = addEditorPosition(
    transformMissingParameterMessage(message),
    editorPosition,
    editorPositionOnClick
  );

  return (
    <NotificationWrapper>
      <div style={{ paddingTop: 8, paddingRight: 8, paddingLeft: 2 }}>
        <FontAwesomeIcon icon={faExclamationCircle} />
      </div>
      <div style={{ flexGrow: 1, paddingRight: 12, maxWidth: 600 }}>
        <ErrorType>{`Error [${type}]`}</ErrorType>
        <ErrorMessage>{realMessage}</ErrorMessage>
      </div>
    </NotificationWrapper>
  );
};

export default RockErrorMessageImpl;
