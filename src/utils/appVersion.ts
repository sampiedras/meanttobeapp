import VersionNumber from 'react-native-version-number';

export const appVersion =
  typeof VersionNumber.appVersion === 'string' &&
  (typeof VersionNumber.buildVersion === 'string' ||
    typeof VersionNumber.buildVersion === 'number')
    ? `v${VersionNumber.appVersion}+${VersionNumber.buildVersion}`
    : null;

export const bundleIdentifier = VersionNumber.bundleIdentifier;
export const bundleAppVersion = VersionNumber.appVersion;
export const buildVersion = VersionNumber.buildVersion;
