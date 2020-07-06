import * as _ from 'lodash';

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
