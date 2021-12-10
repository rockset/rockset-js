import * as _ from 'lodash';
import { useState, useEffect } from 'react';
import { tuple } from 'lib/utils/general';

export interface QueryParameter {
  name: string;
  value: string;
  type: string;
}

export interface Param extends QueryParameter {
  id: string;
  defaultValue?: string;
}

// Helpers

export const getParameterArrayDefaultValue = (params: Record<string, Param>) =>
  _.values(params).map(({ name, defaultValue, type }) => ({
    name,
    value: defaultValue, //eslint-disable-line @typescript-eslint/camelcase
    type,
  }));

export enum ModalTypes {
  Add,
  Edit,
}

export function paramsFillerValue(type: string) {
  return switchWith(
    type,
    {
      string: '',
      int: 0,
      float: 0,
      date: '2020-01-01',
      datetime: '2020-01-01 00:00:00',
      time: '00:00:00',
      timestamp: '2020-01-01T00:00:00.000000Z',
      bool: 'false',
    },
    ''
  );
}

// Use the key to grab something from the map
// Syntax similar to a switch statement
export function switchWith<K extends keyof M, M extends object, D>(
  key: K,
  map: M
): null | M[K];
export function switchWith<K extends keyof M, M extends object, D>(
  key: K,
  map: M,
  def: D
);
export function switchWith<K extends unknown, M extends object, D>(
  key: K,
  map: M,
  def: D
);
export function switchWith<K extends keyof M, M extends object, D>(
  key: K,
  map: M,
  def: D = null
) {
  return _.get<M, K, D>(map, key, def);
}

export function usePersistedState<T>(key: string) {
  const [state, setState] = useState<T>(() => {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      return data;
    } catch (e) {
      return null;
    }
  });

  // We only want this effect to run when the STATE changes. If the key changes, we want to run the effect below instead
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      return setState(data);
    } catch (e) {
      return setState(null);
    }
  }, [key]);
  return tuple(state, setState);
}
