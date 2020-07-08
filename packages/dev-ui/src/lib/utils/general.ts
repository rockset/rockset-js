import moment from 'moment';
import * as _ from 'lodash';
import { Source, Integration } from '@rockset/client/dist/codegen';
import { distinctColors } from 'lib/constants/distinctColors';

export const timeSince = (millis: number) => Date.now() - millis;

export const approximateNumber = (number, significantDigits = null) => {
  const measurements = ['k', 'm', 'b'];
  let currentMeasure = '';
  measurements.forEach((measure) => {
    if (number > 1000) {
      number /= 1000;
      currentMeasure = measure;
    }
  });

  if (significantDigits !== null) {
    number = _.round(number, significantDigits);
  }

  return `${number.toLocaleString()}${currentMeasure}`;
};

export const bytesToString = (bytes, decimalDigits = null) => {
  let totalSize = parseInt(bytes, 10);
  const measurements = ['KiB', 'MiB', 'GiB', 'TiB'];
  let currentMeasure = 'bytes';
  measurements.forEach((measure) => {
    if (totalSize > 1024) {
      totalSize /= 1024;
      currentMeasure = measure;
    }
  });

  if (decimalDigits !== null) {
    totalSize = _.round(totalSize, decimalDigits);
  }

  return `${totalSize.toLocaleString()} ${currentMeasure}`;
};

export const bytesToActiveString = (bytes, decimalDigits = null) => {
  return bytesToString(bytes, decimalDigits).replace(' ', ' Active ');
};

export const gibToBytes = (gib) => gib * 1024 * 1024 * 1024;

export const getPercent = (numerator, denominator, digits = null) => {
  return `${_.round((numerator / denominator) * 100, digits)}%`;
};

export const timeToReadableString = (time) => {
  if (!time) {
    return null;
  }
  const timeObj = moment(time);

  // do not show ridiculously old timestamps.
  if (timeObj.isBefore(moment('2000-01-01 00:00:00'))) {
    return '-';
  }

  const now = moment();
  const isSameDay = timeObj.format('MMMDDDYY') === now.format('MMMDDDYY');

  const sameDayText = `Today, ${timeObj.format('h:mm a')}`;
  const dateText = timeObj.format('MMMM D, YYYY');
  const timeText = isSameDay ? sameDayText : dateText;
  return timeText;
};

export const getResourceName = (resourcePath) => {
  const components = resourcePath.split('.');
  const resourceName = components[components.length - 1];
  return resourceName;
};

export const getWorkspace = (collectionPath) => {
  const components = collectionPath.split('.');
  const workspace =
    components.length === 1
      ? 'commons'
      : components.slice(0, components.length - 1).join('.');
  return workspace;
};

export const getUrlVars = () => {
  const vars: Record<string, string> = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^#&]*)/gi, (__, key, value) => {
    vars[key] = value;
    return '';
  });
  return vars;
};

const typeIcons = {
  array: 'a',
  bool: 'b',
  float: '#.',
  int: '#',
  object: 'o',
  string: 's',
  timestamp: 't',
  null_type: 'ø',
};

export const getTypeIcon = (fieldList) => {
  return _.sortBy(fieldList, (f) => -1 * f.occurrences)
    .map((f) => (typeIcons[f.type] ? typeIcons[f.type] : '?'))
    .slice(0, 2)
    .join(', ');
};

export const getTypeInfo = (fieldList) => {
  const typeString = _.sortBy(
    fieldList.map((v) => ({ type: v.type, count: v.occurrences })),
    (v) => -1 * v.count
  );
  const sum = typeString.reduce((counter, c) => counter + c.count, 0);
  return {
    description: typeString
      .map((t) => `${t.type} (${((t.count * 100.0) / sum).toFixed(0)}%)`)
      .join(', '),
    totalOccurrences: sum,
  };
};

export const getStripePublicKey = () => {
  const { host } = window.location;
  let stripePublicKey = 'pk_live_WavLDG8QKfD2y8gnNa3zw4Pn';
  if (host.startsWith('localhost') || host.startsWith('console.dev')) {
    stripePublicKey = 'pk_test_6LuW8w1PHJzKIuxi97mylLHt';
  }
  return stripePublicKey;
};

export const isRocksetInternal = (email) =>
  _.endsWith(email, '@rockset.com') && !_.endsWith(email, 'demo@rockset.com');

export const partialMatch = (obj, pattern) => {
  return Object.keys(pattern).reduce(
    (tot, key) => pattern[key] === obj[key] && tot,
    true
  );
};

export const hasQueryParams = (params) => {
  if (!params || typeof params !== 'object') {
    return true;
  }
  return partialMatch(getUrlVars(), params);
};

export const quickLog = (obj) => {
  console.log(obj);
  return true;
};

export const lowerNoSpace = (str: string) =>
  str.toLowerCase().replace(/ /g, '_').replace(/\W/g, '');

export const getParamsForExt = (value) => {
  let formatParams;
  switch (value) {
    case 'csv':
      formatParams = {
        csv: {
          columnNames: [],
          columnTypes: [],
          encoding: 'UTF-8',
          firstLineAsColumnNames: true,
          separator: ',',
          quoteChar: '"',
          escapeChar: '\\',
        },
        json: false,
        xml: null,
      };
      break;

    case 'xml':
      formatParams = {
        csv: null,
        json: false,
        xml: {
          attribute_prefix: '',
          doc_tag: '',
          encoding: 'UTF-8',
          root_tag: '',
          value_tag: '',
        },
      };
      break;

    default:
      // for all others, set json true and let apiserver autodetect
      formatParams = {
        csv: null,
        json: true,
        xml: null,
      };
      break;
  }
  return formatParams;
};

export const genArticle = (label: string) => {
  if (label.length < 1) {
    return 'a';
  }
  return 'aeiouAEIOU'.indexOf(label.charAt(0)) !== -1 ? 'an' : 'a';
};

const commands = {};

export const attachToWindow = (value, name, description) => {
  if (
    process.env.NODE_ENV !== 'production' ||
    window.location.hostname === 'console.dev.rockset.com'
  ) {
    window[name] = value;
    commands[name] = description;
  }
};

attachToWindow(
  () => commands,
  'ls',
  'Return an object with all runnable commands'
);
attachToWindow(_, '_', 'lodash');

export const safeGet = (obj, keyMap) =>
  _.mapValues(keyMap, (path) => _.get(obj, path));

export const filterNulls = (arr) => arr.filter((a) => a);

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
export function switchWith<K extends any, M extends object, D>(
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

export const delay = (time, res = null) =>
  new Promise((resolve) => setTimeout(resolve.bind(null, res), time));

export const isProduction = () => {
  return window.location.hostname === 'console.rockset.com';
};

export const compStateSelector = (path) => (state) =>
  _.get(state, `componentState.${path}`);

// rounds number up to 1 significant digit, ex. 812.31 -> 900, 0.0023 -> 0.003
export const roundNumberUp = (number) => {
  if (number <= 0) {
    return 0;
  }
  if (number >= 1) {
    // number of digits before decimal point
    const numDigits = _.floor(number).toString().length;
    return _.ceil(number, -1 * numDigits + 1);
  }
  let zeroesAfterDecimal = 0;
  let maxValueCopy = number * 10;
  while (maxValueCopy < 1) {
    zeroesAfterDecimal += 1;
    maxValueCopy *= 10;
  }
  return _.ceil(number, zeroesAfterDecimal + 1);
};

/**
 * Helps typescript infer tuple types correctly
 * @param data data to convert to a tuple
 */
export function tuple<T extends any[]>(...data: T) {
  return data;
}

/**
 * Given list of collection source entities, return label for type of that collection
 * @param collectionSources
 */
export const getSourceType = (collectionSources: Source[]) => {
  if (!collectionSources[0]) {
    return ['None'] as const;
  }

  const map = {
    s3: ['Amazon S3', 's3'],
    kinesis: ['Amazon Kinesis', 'kinesis'],
    redshift: ['Amazon Redshift', 'redshift'],
    dynamodb: ['Amazon DynamoDB', 'dynamodb'],
    gcs: ['Google Cloud Storage', 'gcs'],
    kafka: ['Apache Kafka', 'kafka'],
    file: ['File Upload', 'file'],
    mongodb: ['MongoDB', 'mongodb'],
  } as const;

  const sources = _.chain(collectionSources)
    .map((source) => {
      if (source.s3 && source.s3.bucket) {
        return map.s3;
      }
      if (source.kinesis) {
        return map.kinesis;
      }
      if (source.redshift) {
        return map.redshift;
      }
      if (source.dynamodb) {
        return map.dynamodb;
      }
      if (source.gcs) {
        return map.gcs;
      }
      if (source.kafka) {
        return map.kafka;
      }
      if (source.file_upload) {
        return map.file;
      }
      if (source.mongodb) {
        return map.mongodb;
      }
    })
    .uniq()
    .value();

  if (sources.length > 1) {
    return ['Mixed'] as const;
  }
  return sources[0];
};

export const getIntegrationType = (integration: Integration) => {
  // @ts-ignore - deprecated paths that some orgs still have
  if (integration.aws && integration.aws.aws_access_key_id) {
    return ['AWS Access Key', 's3'] as const;
  }
  // @ts-ignore - deprecated paths that some orgs still have
  if (integration.aws_external_id) {
    return ['AWS External ID', 's3'] as const;
  }
  // @ts-ignore - deprecated paths that some orgs still have
  if (integration.gcp_service_account) {
    return ['GCP Service Account', 'gcs'] as const;
  }
  if (integration.dynamodb) {
    return ['Amazon DynamoDB', 'dynamodb'] as const;
  }
  if (integration.redshift) {
    return ['Amazon Redshift', 'redshift'] as const;
  }
  if (integration.gcs) {
    return ['Google Cloud Storage', 'gcs'] as const;
  }
  if (integration.kinesis) {
    return ['Amazon Kinesis', 'kinesis'] as const;
  }
  if (integration.s3) {
    return ['Amazon S3', 's3'] as const;
  }
  if (integration.kafka) {
    return ['Apache Kafka', 'kafka'] as const;
  }
  if (integration.mongodb) {
    return ['MongoDB', 'mongodb'] as const;
  }
  // Default to S3
  return ['Unknown', 's3'] as const;
};

export const isWhitespace = (str: string) => str.match(/^\s*$/);

export const firstNonWhitespace = (str: string) => str.match(/[^\s]/)?.index;

/**
 *
 * Checks that the string starts with a letter, followed by letters, numbers, digits, or dashes
 * @param str string to test
 */
export const isValidIdentifier = (str: string) =>
  typeof str === 'string' && str.match(/^[a-zA-Z][\w-]*$/)?.length > 0;

export const clipAll = (nums: number[], low?: number, high?: number) =>
  nums.map((num) => {
    const realLow = low ?? num;
    const realHigh = high ?? num;
    return Math.max(realLow, Math.min(realHigh, num));
  });

/**
 * Generate a unique id.
 * _.uniqueId isn't sufficient because of potential collisions with data from persisted state
 * So we append a random string to it
 * @param prefix the prefix for the uuid
 */
export const uuid = (prefix?: string) =>
  _.uniqueId(prefix) + Math.random().toString(36).substring(7);

/**
 * For now just return name. In the future, we can do more validation here if we need to
 * @param name
 */
export const componentId = (name: string) => {
  return name;
};

export const getWebsiteHost = () => {
  return switchWith(
    window.location.host,
    {
      'console.rockset.com': 'https://www.rockset.com',
      'console.dev.rockset.com': 'https://www.dev.rockset.com',
      'localhost:8088': 'localhost:8000',
    },
    'https://www.rockset.com'
  );
};

export const stringToColors = (
  str: string
): { backgroundColor: string; color: string } => {
  const stringAsInt =
    Array.from(str)
      .map((str) => str.charCodeAt(0))
      .reduce((prev, curr) => prev + curr) % 100;
  const [r, g, b] = distinctColors[stringAsInt].rgba;

  return {
    backgroundColor: `rgb(${r},${g},${b})`,
    color: r + g + b > 500 ? '#1b2834' : 'white',
  };
};

/**
 * setPath, except without mutation. Only copies what is necessary
 * @param state an object
 * @param path a path
 * @param data any data
 */
export function setPath<Return>(
  state: object,
  path: string,
  data: any
): Return {
  return (_.setWith(_.clone(state), path, data, _.clone) as unknown) as Return;
}

export const roundOff = (n: number, decimals: number) => {
  return _.round(n, decimals).toFixed(decimals);
};
