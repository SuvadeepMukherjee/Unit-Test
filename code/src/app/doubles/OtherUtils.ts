// Define a type 'stringInfo' that holds various string-related properties
export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

// Define a type alias for a callback function that takes a string argument and returns void
type LoggerServiceCallBack = (arg: string) => void;

// Function to calculate the complexity score of a given stringInfo object
export function calculateComplexity(stringInfo: stringInfo) {
  // Multiply the number of keys in 'extraInfo' with the length of the string
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}

// Function that converts a string to uppercase while invoking a callback
export function toUpperCaseWithCb(
  arg: string,
  callback: LoggerServiceCallBack
) {
  if (!arg) {
    callback("invalid argument");

    return;
  }
  // Call the callback with a message indicating the function was called with the given argument
  callback(`called function with ${arg}`);
  return arg.toUpperCase();
}
