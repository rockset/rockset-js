// eslint-disable-next-line no-restricted-imports
import { promises as fs } from 'fs';

import { type, TypeOf, string } from 'io-ts';
import * as t from 'io-ts';
import { parseOrThrow, parseOrThrowFromJSON } from '../types';
import {
  RockClientErrorTypes,
  errorAuthConfigNotFound,
  errorAuthProfileNotFound,
  errorAuthProfileExists,
} from '../exception/exception';
import * as path from 'path';
import * as os from 'os';
import { prettyPrint } from '../helper';
import _ from 'lodash';

export const AUTH_CONFIG_FILE = '.rockset/credentials' as const;

export const getAuthConfigPath = () =>
  path.join(os.homedir(), AUTH_CONFIG_FILE);
/**
 * io-ts runtime type definitions
 */
export const AuthProfile = type({
  api_key: string,
  api_server: string,
});

export const AuthConfiguration = type({
  version: t.literal('v1'),
  active_profile: string,
  profiles: t.record(string, AuthProfile, 'profiles'),
});

export const AuthConfigurationLegacy = t.partial({
  version: string,
});

/**
 *
 * TS types
 */

export type AuthProfile = TypeOf<typeof AuthProfile>;
export type AuthConfiguration = TypeOf<typeof AuthConfiguration>;

/**
 * Parsers
 */

export const parseAuthProfile = (obj: unknown) =>
  parseOrThrow(
    AuthProfile,
    obj,
    RockClientErrorTypes.ERROR_INVALID_AUTH_PROFILE,
    'authentication profile'
  );

export const parseAuthConfiguration = (str: string) => {
  return parseOrThrowFromJSON(
    AuthConfiguration,
    str,
    RockClientErrorTypes.ERROR_INVALID_AUTH_CONFIG,
    'authentication configuration'
  );
};

export const isAuthEnvActive = () =>
  Boolean(process.env.ROCKSET_APIKEY && process.env.ROCKSET_APISERVER);

const getEnvProfile = () => {
  const api_key = process.env.ROCKSET_APIKEY;
  const api_server = process.env.ROCKSET_APISERVER;
  return { api_key, api_server };
};

/**
 * Gets currently active credentials from env
 */
export async function getAuthProfile() {
  const { api_key, api_server } = getEnvProfile();
  if (isAuthEnvActive() && api_key && api_server) {
    return { api_key, api_server };
  } else {
    const config = await readConfigurationFile();
    const profile = config.profiles[config.active_profile];
    if (!profile) {
      throw errorAuthProfileNotFound(config.active_profile);
    } else {
      return profile;
    }
  }
}

export async function createAuthProfile(
  name: string,
  authProfile: AuthProfile
) {
  const config = await readConfigurationFile().catch(() => null);
  if (!config) {
    return await writeConfigurationFile({
      version: 'v1',
      active_profile: name,
      profiles: {
        [name]: authProfile,
      },
    });
  } else if (!config.profiles.hasOwnProperty(name)) {
    const nProfile = { ...config.profiles, [name]: authProfile };
    const nConfig = { ...config, profiles: nProfile };
    return await writeConfigurationFile(nConfig);
  } else {
    throw errorAuthProfileExists(name);
  }
}

export async function listAuthProfiles() {
  const config = await readConfigurationFile().catch(() => null);
  const configList = _.map(config?.profiles, (v, k) => ({ ...v, name: k }));
  const a = {
    env: {
      profile: getEnvProfile(),
      active: isAuthEnvActive(),
    },
    config,
    configList,
  };
  return a;
}

export async function activateAuthProfile(profile: string) {
  const config = await readConfigurationFile();
  if (config.profiles.hasOwnProperty(profile)) {
    const nConfig: AuthConfiguration = { ...config, active_profile: profile };
    return await writeConfigurationFile(nConfig);
  } else {
    throw errorAuthProfileNotFound(profile);
  }
}

/**
 * Helpers to read and write file
 */

/**
 * @returns the configuration file, or null if it doesn't exist
 */
export async function readConfigurationFile() {
  const authPath = getAuthConfigPath();
  let jsonStr: string;
  try {
    jsonStr = (await fs.readFile(authPath)).toString();
  } catch (e) {
    throw errorAuthConfigNotFound();
  }
  return parseAuthConfiguration(jsonStr);
}

async function writeConfigurationFile(config: AuthConfiguration) {
  return await fs.writeFile(getAuthConfigPath(), prettyPrint(config));
}
