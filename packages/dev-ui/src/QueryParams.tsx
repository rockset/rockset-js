import React, { useCallback } from 'react';
import 'highlight.js/styles/github.css';
import {
  PebbleButton,
  PebbleTextInput,
  PebbleSelect,
  PebbleModal,
  RockErrorMessage,
  Space,
} from './components';

import styled from 'styled-components';
import { useState } from 'react';
import {
  ModalTypes,
  paramsFillerValue,
  Param,
  switchWith,
} from './QueryParams.hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import * as _ from 'lodash';
import { ErrorModel, QueryParameter } from '@rockset/client/dist/codegen';

export const SUPPORTED_PARAMS = [
  'string',
  'int',
  'float',
  'date',
  'datetime',
  'time',
  'timestamp',
] as const;

export const CommandButton = styled.div`
  display: flex;
  position: relative;
  margin: 8px 20px;
`;

export const SelectWrapper = styled.div`
  min-width: 200px;
  margin-left: 10px;
  margin-bottom: 10px;
  line-height: 1.2em;
  overflow: hidden;

  .bx--label {
    width: 100%;
  }
`;

const emptyParam = () => ({
  id: _.uniqueId('param_'),
  name: '',
  type: 'string',
  value: '',
});

const toOption = (type) => ({ value: type, label: type });

interface ErrorType {
  _type: 'name' | 'validate';
}
interface Props {
  modalType: ModalTypes;
  initializer: Param;
  submit: (x: Param) => void;
  existingParams: Param[];
  err: (ErrorModel & ErrorType) | undefined;
  close: () => void;
}

const ParamModal = ({ modalType, initializer, submit, err, close }: Props) => {
  const [param, setParam] = useState<Param>(initializer);
  const { name, type, value } = param;

  return (
    <PebbleModal
      showModal={true}
      heading={`${modalType === ModalTypes.Add ? 'Add' : 'Edit'} Parameter`}
      primaryButton={{
        onClick: async () => {
          submit({ ...param });
        },
        text: modalType === ModalTypes.Add ? 'Add' : 'Update',
      }}
      secondaryButton={{ text: 'Cancel', onClick: close, role: 'secondary' }}
      style={{ maxWidth: 600, minWidth: 600 }}
      bodyStyle={{ minHeight: 350, overflow: 'visible' }}
      onClose={close}
    >
      {err && <RockErrorMessage error={err} style={{ minWidth: 0 }} />}
      <PebbleTextInput
        id={'parameter-name'}
        labelText="Parameter Name"
        required={true}
        helperText={`Reference this parameter as ':${name}' in your SQL. This name must be unique.`}
        placeholder="myParam"
        value={name}
        onChange={(evt) => {
          const n: string = evt?.target?.value ?? '';
          setParam((p) => ({ ...p, name: n }));
        }}
        invalid={err?._type === 'name'}
        style={{ marginBottom: 12, overflow: 'hidden' }}
      />
      <Space height="6px" />
      <PebbleSelect
        id={'object-type'}
        selectClassnamePrefix=""
        labelText="Type"
        required={true}
        helperText="Select an object type for this parameter."
        value={toOption(type)}
        options={SUPPORTED_PARAMS.map(toOption)}
        style={{
          width: '100%',
          marginBottom: 12,
        }}
        onChange={(evt) => {
          setParam((p) => ({ ...p, type: evt.value }));
        }}
      />
      <PebbleTextInput
        id={'parameter-value'}
        labelText="Parameter Value"
        helperText={helperText(type)}
        value={value}
        onChange={(evt) => {
          const n: string = evt?.target?.value ?? '';
          setParam((p) => ({ ...p, value: n }));
        }}
        required={true}
        invalid={err?._type === 'validate'}
        placeholder={paramsFillerValue(type)}
        style={{ marginBottom: 20, overflow: 'hidden' }}
      />
    </PebbleModal>
  );
};

export function helperText(type: string) {
  const format = switchWith(
    type,
    {
      datetime: 'YYYY-[M]M-[D]D[( )[H]H:[M]M:[S]S[.DDDDDD]]',
      time: '[H]H:[M]M:[S]S[.DDDDDD]',
      timestamp: 'YYYY-[M]M-[D]D[( |T)[H]H:[M]M[:[S]S[.DDDDDD]]][time zone]',
      date: 'YYYY-[M]M-[D]D',
      bool: `'true' or 'false'`,
    },
    ''
  );

  return format ? `${type} format: ${format}` : `Enter a ${type}`;
}

export const QueryParam = ({
  param,
  editParam,
  removeParam,
}: {
  param: Param;
  editParam: (param: Param) => void;
  removeParam: (param: Param) => void;
}) => {
  return (
    <SelectWrapper>
      <PebbleTextInput
        id={'temp-name'}
        readOnly={true}
        customLabel={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 14,
            }}
          >
            <span>
              {param.name}{' '}
              <span style={{ fontWeight: 400, fontStyle: 'italic' }}>
                {param.type}
              </span>
            </span>
            <span>
              <span
                onClick={() => editParam(param)}
                style={{ cursor: 'pointer', color: '#175D8D', marginRight: 5 }}
              >
                <FontAwesomeIcon icon={faPencil} color="#175D8D" />
              </span>
              <span
                onClick={() => {
                  removeParam(param);
                }}
                style={{ cursor: 'pointer', color: '#E0182D' }}
              >
                <FontAwesomeIcon icon={faTrashAlt} color="#E0182D" />
              </span>
            </span>
          </div>
        }
        value={param.value}
        style={{ width: 300, marginBottom: 12 }}
      />
    </SelectWrapper>
  );
};

const ParamsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
`;

export const QueryParams = ({
  params,
  setParams,
}: {
  params: Record<string, Param>;
  setParams: React.Dispatch<React.SetStateAction<Record<string, Param>>>;
}) => {
  const [modalType, setModalType] = useState(ModalTypes.Add);

  // When the modal initializer is set, open the parent modal
  const [modalInitializer, setModalOpen] = useState<Param>();

  const [err, setErr] = useState<ErrorModel & ErrorType>();

  const validateParameter = async ({ name, type, value }: QueryParameter) => {
    try {
      const res = await fetch('/validate', {
        method: 'post',
        body: JSON.stringify({ param: { name, type, value } }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const j = await res.json();
      if (res.status >= 300) {
        setErr(j);
        return false;
      } else {
        setErr(null);
        return true;
      }
    } catch (e) {
      setErr(e);
      return false;
    }
  };
  const submit = useCallback(
    async (param: Param) => {
      // Validate here
      const isValid = await validateParameter(param);
      if (!isValid) {
        return;
      }

      setParams((p) => ({ ...p, [param.id]: param }));
      setModalOpen(null);
    },
    [setParams]
  );

  const parametersArray = _.values(params);

  return (
    <>
      {modalInitializer && (
        <ParamModal
          modalType={modalType}
          initializer={modalInitializer}
          submit={submit}
          existingParams={parametersArray}
          close={() => setModalOpen(null)}
          err={err}
        />
      )}
      <div style={{ margin: '20px', fontSize: '14px' }}>
        Insert parameters into your sql as :myParam.
      </div>
      <ParamsWrapper>
        {params &&
          parametersArray.map((param: Param) => (
            <QueryParam
              param={param}
              key={param.name}
              editParam={(param) => {
                setModalType(ModalTypes.Edit);
                setModalOpen(param);
              }}
              removeParam={(param) => {
                setParams(_.omit(params, param.id));
              }}
            />
          ))}
      </ParamsWrapper>
      <CommandButton>
        <PebbleButton
          text="Add Parameter"
          role="secondary"
          onClick={() => {
            setModalType(ModalTypes.Add);
            setModalOpen({ ...emptyParam() });
          }}
        />
      </CommandButton>
    </>
  );
};
