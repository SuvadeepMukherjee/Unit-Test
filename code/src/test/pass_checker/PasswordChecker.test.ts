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

  it("Password with no uppercase letter  is invalid", () => {
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
