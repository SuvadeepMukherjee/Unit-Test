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
