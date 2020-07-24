/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as swagger from './swagger-generated.json';
/**
 *
 * This code is copied from docs, and thus we need to turn off a lot of lint rules
 */

export const getDefinition = (ref: string): any => {
  const swag = swagger as any;
  return swag.definitions[ref] || swag.definitions[ref.split('/')[2]];
};

export const renderSchema = (schema: string, required = false) => {
  function parseObject(x: any): any {
    if (x.example) {
      // if literal or already has example
      try {
        return JSON.parse(x.example);
      } catch {
        return x.example;
      }
    }
    if (x.$ref) {
      // if another schema
      return parseObject(getDefinition(x.$ref));
    }
    if (x.type === 'array') {
      // if array
      return [parseObject(x.items)];
    }
    if (x.type === 'object') {
      // if object
      const y: Record<string, any> = {};
      if (!x.properties) {
        return {};
      }
      Object.keys(x.properties).forEach((key: string) => {
        if (!required || x.properties[key].required) {
          y[key] = parseObject(x.properties[key]);
        }
      });
      return y;
    }
  }

  return parseObject(getDefinition(schema));
};
