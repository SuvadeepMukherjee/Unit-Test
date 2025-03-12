export class StringUtils {
  public toUpperCase(arg: string) {
    return toUpperCase(arg);
  }
}

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

// Type definition for `stringInfo` object
export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

// Function that returns detailed information about a string
export function getStringInfo(arg: string): stringInfo {
  return {
    lowerCase: arg.toLowerCase(),
    upperCase: arg.toUpperCase(),
    characters: Array.from(arg),
    length: arg.length,
    extraInfo: {},
  };
}
