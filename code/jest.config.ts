import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  // Use "ts-jest" preset, which allows Jest to run TypeScript tests
  preset: "ts-jest",
  // Set the test environment to "node", meaning tests will run in a Node.js environment
  testEnvironment: "node",
  // Enable verbose mode, so Jest provides detailed test output in the console
  verbose: true,
};

export default config;
