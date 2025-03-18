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

  it("Password with no uppercase letter  is invalid", () => {
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
