# Test Driven Development with Jest and TypeScript

## Test Driven Development Intro

Test Development 

- development driven by tests

- Big Projects
  
  - First achieve a working state , then write tests

- Test Driven Development : great when extending an app or fixing bugs

Test Driven Development -the TDD Cycle 

- All the tests will first start in a red state(They dont have an implementation so they will be failing tests)

- Then we write the implementation so they will be passing(green)

- After we have the implementation we are free to change or add other logic 

---

## Coding Katas - Password Checker

Coding Project:password checker 

- Simple requirements ,big complications

- Requirements 
  
  - Iteration 1

- A password is invalid if 
  
  - Length is less than 8 chars
  
  - has no uppercase letters
  
  - has no lowercase letters
  
  Iteration 2 
  
  - returns the reasons for invalidity
  
  Iteration 3
  
  - admin passwords should contain a number
  
  ---
  
  PassChecker Setup 
  
  Create  a folder called pass_checker , inside that folder add a PasswordChecker.ts file 
  
  ```ts
  //class contains a public method checkPassword
  
  export class PasswordChecker {
  
    public checkPassword() {}
  
  }
  ```

  Create a folder called test , inside the test folder , another folder called pass_checker which has a file PasswordChecker.test.ts

```ts
import { PasswordChecker } from "../../app/pass_checker/PasswordChecker";

describe("PasswordChecker test suite", () => {

  let sut: PasswordChecker; //declare a variable to hold the system under test(SUT)

  beforeEach(() => {

    //Before each test, create a new instance of `PasswordChecker`.

    sut = new PasswordChecker();

  });

  it("Should do nothing for the moment", () => {

    sut.checkPassword();

  });

});
```

  ---

## PassChecker Iteration 2

  A password is invalid if 

- length is less than 8 chars

- has no upper case letter

- has no lower case letter 
  
  PasswordChecker.ts
  
  ```ts
  //class contains a public method checkPassword
  
  export class PasswordChecker {
  
    public checkPassword(password: string): boolean {
  
      if (password.length < 8) {
  
        return false;
  
      }
  
      if (password == password.toLowerCase()) {
  
        return false;
  
      }
  
      if (password == password.toUpperCase()) {
  
        return false;
  
      }
  
      return true;
  
    }
  
  }
  ```

PasswordChecker.test.ts

```ts
import { PasswordChecker } from "../../app/pass_checker/PasswordChecker";

describe("PasswordChecker test suite", () => {

  let sut: PasswordChecker; //declare a variable to hold the system under test(SUT)

  beforeEach(() => {

    //Before each test, create a new instance of `PasswordChecker`.

    sut = new PasswordChecker();

  });

  it("Password with less than 8 chars is invalid ", () => {

    const actual = sut.checkPassword("12345aA");

    expect(actual).toBe(false);

  });

  it("Password with more than 8 chars is ok", () => {

    const actual = sut.checkPassword("12345678Aa");

    expect(actual).toBe(true);

  });

  it("Password with no uppercase letter  is invalid", () => {

    const actual = sut.checkPassword("1234abcd");

    expect(actual).toBe(false);

  });

  it("password with upper case letter is valid", () => {

    const actual = sut.checkPassword("1234abcdA");

    expect(actual).toBe(true);

  });

  it("password with no lowercase letter is invalid", () => {

    const actual = sut.checkPassword("1234ABCD");

    expect(actual).toBe(false);

  });

  it("password with lower case letter is valid", () => {

    const actual = sut.checkPassword("1234ABCDa");

    expect(actual).toBe(true);

  });

});
```

---

## PassChecker Iteration 2

 A password is invalid if 

- length is less than 8 chars

- has no upper case letters

- has no lower case letters

Requirement 2:

- return the reason that make a password invalid

PasswordChecker.ts

```ts
//class contains a public method checkPassword

// Enum defining possible password validation errors with corresponding error messages

export enum PasswordErrors {

  SHORT = "Password is too short!",

  NO_UPPER_CASE = "Upper case letter required!",

  NO_LOWER_CASE = "Lower case letter required!",

}

// Interface defining the structure of a password validation result

export interface CheckResult {

  valid: boolean;

  reasons: PasswordErrors[];

}

export class PasswordChecker {

  public checkPassword(password: string): CheckResult {

    const reasons: PasswordErrors[] = [];

    if (password.length < 8) {

      reasons.push(PasswordErrors.SHORT);

    }

    if (password == password.toLowerCase()) {

      reasons.push(PasswordErrors.NO_UPPER_CASE);

    }

    if (password == password.toUpperCase()) {

      reasons.push(PasswordErrors.NO_LOWER_CASE);

    }

    return {

      valid: reasons.length > 0 ? false : true,

      reasons: reasons,

    };

  }

}

```

PasswordChecker.test.ts

```ts
import {

  PasswordChecker,

  PasswordErrors,

} from "../../app/pass_checker/PasswordChecker";

describe("PasswordChecker test suite", () => {

  let sut: PasswordChecker; //declare a variable to hold the system under test(SUT)

  beforeEach(() => {

    //Before each test, create a new instance of `PasswordChecker`.

    sut = new PasswordChecker();

  });

  it("Password with less than 8 chars is invalid ", () => {

    const actual = sut.checkPassword("1234567");

    expect(actual.valid).toBe(false);

    expect(actual.reasons).toContain(PasswordErrors.SHORT);

  });

  it("Password with more than 8 chars is ok", () => {

    const actual = sut.checkPassword("12345678");

    //expect(actual.valid).toBe(true);

    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);

  });

  it("Password with no uppercase letter  is invalid", () => {

    const actual = sut.checkPassword("abcd");

    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);

    expect(actual.valid).toBe(false);

  });

  it("password with upper case letter is valid", () => {

    const actual = sut.checkPassword("abcD");

    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);

    // expect(actual.valid).toBe(true);

  });

  it("password with no lowercase letter is invalid", () => {

    const actual = sut.checkPassword("ABCD");

    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);

    // expect(actual).toBe(false);

  });

  it("password with lower case letter is valid", () => {

    const actual = sut.checkPassword("ABCDa");

    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);

  });

  it("Complex password is valid", () => {

    const actual = sut.checkPassword("1234abcD");

    expect(actual.reasons).toHaveLength(0);

    expect(actual.valid).toBe(true);

  });

});

```
