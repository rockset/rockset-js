import { replaceCollections } from '../index';

const replace = (
  input: string,
  map: Record<string, string>,
  output: string
) => () => {
  const newText = replaceCollections(input, map);
  expect(newText).toEqual(output);
};

const shouldThrow = (input: string, map: Record<string, string>) => () => {
  expect(() => replaceCollections(input, map)).toThrowError();
};

describe('Test Replace', () => {
  test('no op', replace('select', { _events: 'commons.foo' }, 'select'));
  test('invalid', shouldThrow('asdf asdf adsf asdf', {}));

  test(
    'test simplest replace',
    replace(
      'select * from _events',
      { _events: 'commons.foo' },
      'select * from "commons"."foo"'
    )
  );

  test(
    'Replace 2',
    replace(
      'select * from _events a, _events b limit 100',
      { 'commons._events': 'SampleCities' },
      'select * from "commons"."SampleCities" a, "commons"."SampleCities" b limit 100'
    )
  );

  test(
    'Replace 2, w/ quotes in map',
    replace(
      'select * from "_events" a, _events b limit 100',
      { 'commons."_events"': 'SampleCities' },
      'select * from "commons"."SampleCities" a, "commons"."SampleCities" b limit 100'
    )
  );

  test(
    'Ignore comments, strings, parameters, and replace 2',
    replace(
      `
      -- _events
      -- commons._events
      select 'commons._events' abc, :"_events" event from "_events" a, _events b limit 100`,
      { 'commons."_events"': 'SampleCities' },
      `
      -- _events
      -- commons._events
      select 'commons._events' abc, :"_events" event from "commons"."SampleCities" a, "commons"."SampleCities" b limit 100`
    )
  );
});
