import * as _ from 'lodash';

export const prettyPrint = (obj: unknown) => {
  return JSON.stringify(obj, null, 2);
};

export const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

/**
 * Helps typescript infer tuple types correctly
 * @param data data to convert to a tuple
 */
export function tuple<T extends unknown[]>(...data: T) {
  return data;
}

export function isCaseInsensitiveFS() {
  return ['darwin', 'win32'].includes(process.platform);
}

export enum EscapeOptions {
  ESCAPE_ALL,
  ESCAPE_IF_NECCESSARY,
  ESCAPE_NONE,
}

export const escapeField = (field: string) => {
  // Match an identifier that starts w/ a character, and then has alphanumeric characters after
  if (field.match(/^[^\d\W]\w*$/)) {
    return field;
  }
  return `"${field}"`;
};

// Standardizes a path, i.e. part."path" => part.path or "part"."path"
export const escapePath = (
  path: string,
  escapeOption: EscapeOptions
): string => {
  const parts = path.split('.').map((part) => _.trim(part, '"'));

  switch (escapeOption) {
    case EscapeOptions.ESCAPE_ALL:
      return `"${_.join(parts, '"."')}"`;
    case EscapeOptions.ESCAPE_IF_NECCESSARY:
      return parts.map((f) => escapeField(f)).join('.');
    case EscapeOptions.ESCAPE_NONE:
      return _.join(parts, '.');
  }
};
