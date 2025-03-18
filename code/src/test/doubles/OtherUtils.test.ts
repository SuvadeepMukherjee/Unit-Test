import {
  calculateComplexity,
  toUpperCaseWithCb,
} from "../../app/doubles/OtherUtils";

describe("OtherUtils test suite ", () => {
  describe.only("Tracking callbacks with Jest Mocks", () => {
    const callBackMock = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCb("", callBackMock);
      expect(actual).toBeUndefined();
      expect(callBackMock).toBeCalledWith("invalid argument");
      expect(callBackMock).toBeCalledTimes(1);
    });

    it("calls callback for valid argument-track calls", () => {
      const actual = toUpperCaseWithCb("abc", callBackMock);
      expect(actual).toBe("ABC");
      expect(callBackMock).toBeCalledWith("called function with abc");
      expect(callBackMock).toBeCalledTimes(1);
    });
  });

  //Custom mock
  describe("Tracking callbacks", () => {
    let cbArgs = []; //An array to store the arguments passed to the callback
    let timesCalled = 0; //A counter to track how many times the callback is called
    function callBackMock(arg: string) {
      cbArgs.push(arg); //Store each argument passed to the callback
      timesCalled++; //Increment the counter each time the callback is called
    }

    afterEach(() => {
      //Clearing tracking fields
      cbArgs = [];
      timesCalled = 0;
    });
    it("calls callback for invalid argument - track calls", () => {
      const actual = toUpperCaseWithCb("", callBackMock);

      expect(actual).toBeUndefined();
      expect(cbArgs).toContain("invalid argument");
      expect(timesCalled).toBe(1);
    });
    it("calls callback for valid argument - track calls", () => {
      const actual = toUpperCaseWithCb("abc", callBackMock);

      expect(actual).toBe("ABC");
      expect(cbArgs).toContain("called function with abc");
      expect(timesCalled).toBe(1);
    });
  });
  it("ToUpperCase-calls callback for invalid argument", () => {
    const actual = toUpperCaseWithCb("", () => {});

    expect(actual).toBeUndefined();
  });
  it("ToUpperCase-calls callback for valid argument", () => {
    const actual = toUpperCaseWithCb("abc", () => {});

    expect(actual).toBe("ABC");
  });

  it("Calculates complexity", () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: "someInfo",
        field2: "soneOtherInfo",
      },
    };

    const actual = calculateComplexity(someInfo as any);
    expect(actual).toBe(10);
  });
});
