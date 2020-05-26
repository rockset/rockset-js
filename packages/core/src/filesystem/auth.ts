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

export const AUTH_CONFIG_FILE = '.rockset/credentialsv2' as const;

export const getAuthConfigPath = () =>
  path.join(os.homedir(), AUTH_CONFIG_FILE);
/**
 * io-ts runtime type definitions
 */
export const AuthProfile = type({
  apikey: string,
  apiserver: string,
});

export const AuthConfiguration = type({
  version: t.literal('v2'),
  activeProfile: string,
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

export const getEnvProfile = () => {
  const apikey = process.env.ROCKSET_APIKEY;
  const apiserver = process.env.ROCKSET_APISERVER;
  return { apikey, apiserver };
};

/**
 * Gets currently active credentials from env
 */
export async function getAuthProfile() {
  if (isAuthEnvActive()) {
    return getEnvProfile();
  } else {
    const config = await readConfigurationFile();
    const profile = config.profiles[config.activeProfile];
    if (!profile) {
      throw errorAuthProfileNotFound(config.activeProfile);
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
      version: 'v2',
      activeProfile: name,
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
    const nConfig = { ...config, activeProfile: profile };
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

export async function writeConfigurationFile(config: AuthConfiguration) {
  return await fs.writeFile(getAuthConfigPath(), prettyPrint(config));
}
