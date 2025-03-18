# FIRST Principles

Principles , not rules that we may follow when writing tests

- Fast

- Independent

- Repeatable

- Self Validating

- Thorough

#### Fast:

- Unit tests should be fast

- Faster tests faster feedback

#### Isolated/Independent

- Tests should be isolated from other tests

- External Environment(No shared state with other tests)

- The order in which tests run should not matter

- Contradiction with the F(Fast) principle
  
  - Individual tests take more time to setup

#### Repeatable

- Same result with the same input (Challenge:Random/Date values we will often mock these), Example - Test that writes to a database

- It should always clean up 

- In Contradiction with the Fast Principle(More Setup and teardown operations)

#### Self Validating

- After the test is finished , its results should be clear (Pass/Fail)

#### Thorough

- Covers all the cases /paths/scenarios(Hard to think at all of them from the beginning)

- Happy cases , bad paths,edge cases

- Invalid output

- Large values

- 100 % code coverage not a great indicator

# Jest Hooks

Jest hooks greatly assist us at structuring our unit tests . Tests should be independent of each other and there should also be reduced code duplication 

many times the setup step will be same for all the test so it is put in just one hook and  it will be called at every test 

beforeEach => we are initializing our setup in this hook and our setup in this example is initializing our class ,now after every test we will initialize a new class and this way we are making sure tests are independent of each other

Context in which they are invoked(Jest Hooks)=> they are run always relative to their describe block , a good practise is to put all our tests and all our hooks inside describe blocks , each describe can have its own hooks and its own tests and they are run relative to their describe blocks 

We are testing this in Utils.ts

```ts
export class StringUtils {

  public toUpperCase(arg: string) {

    return toUpperCase(arg);

  }

}  
```

our hooks

```ts
 describe.only("StringUtils test", () => {

    // Declare `sut` (System Under Test) outside so it's accessible in all tests

    let sut: StringUtils;

    // `beforeEach()` runs **before each test case** in this suite

    beforeEach(() => {

      sut = new StringUtils(); // Creates a new instance of `StringUtils` before every test

      console.log("Setup"); // Debugging message to show when setup runs

    });

    // `afterEach()` runs **after each test case** in this suite

    afterEach(() => {

      // clearing mocks

      console.log("Teardown"); // Debugging message to show when cleanup happens

      // This is where you would clear mocks, reset variables, or clean up resources

    });

    // Defines an individual test case

    it("should return correct upperCase", () => {

      // Act: Call the method being tested

      const actual = sut.toUpperCase("abc");

      // Assert: Check if the result matches expected output

      expect(actual).toBe("ABC");

      console.log("Actual test"); // Debugging message to show when test runs

    });

  });
```

# Testing for Errors

Utils.ts

```ts
export class StringUtils {

  public toUpperCase(arg: string) {

    if (!arg) {

      throw new Error("Invalid argument!");

    }

    return toUpperCase(arg);

  }

}
```

Utils.test.ts

```ts
it.only("Should throw error on invalid argument - function", () => {

      function expectError() {

        const actual = sut.toUpperCase("");

      }

      expect(expectError).toThrow();

      expect(expectError).toThrow("Invalid argument");

    });

    it.only("Should throw error on invalid argument - arrow function", () => {

      expect(() => {

        sut.toUpperCase("");

      }).toThrow("Invalid argument");

    });

    it("Should throw error on invalid argument - try catch block", (done) => {

      try {

        sut.toUpperCase("");

        done("GetStringInfo should throw error for invalid arg! ");

      } catch (error) {

        expect(error).toBeInstanceOf(Error);

        expect(error).toHaveProperty("message", "Invalid argument!");

        done();

      }

    });
```

# Jest Aliases and watch mode

only => only run that test (describe block or test(it)

skip => it will skip the test suites 

concurrent => run concurrently with other tests

todo => we can make a skeleton of our testing application 

xit => alias for it.skip 

fit => alias for it.only 

Watch mode => This is a feature when we need quick feedback to our test or to our implementation

```json
"scripts": {

    "test": "jest --watch"

  },
```

# VSCode debug configuration

# Coverage

jest.config.ts file 

```ts
import type { Config } from "@jest/types";

const config: Config.InitialOptions = {

  // Use "ts-jest" preset, which allows Jest to run TypeScript tests

  preset: "ts-jest",

  // Set the test environment to "node", meaning tests will run in a Node.js environment

  testEnvironment: "node",

  // Enable verbose mode, so Jest provides detailed test output in the console

  verbose: true,

  collectCoverage: true,

  collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],

};

export default config;

```

Sometimes we can ignore some code that is trivial or difficult or maybe we have another reason to from the code coverage , we do it with the following command `/*Istanbul ignore next*`
