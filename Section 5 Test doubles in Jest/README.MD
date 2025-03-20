# Test Doubles in Jest

---

## What are test doubles ?

Why do we need test doubles? 

- Some units arent fast , or easily accessible

- Replace them in tests

What are test doubles ?

- Pretend object used in places of a real object for testing purposes

- Dummy objects: passed around but not used 

- Fakes : simplified working implementation , it takes a shortcut

- Stubs: incomplete objects used as arguments

- spies: tracks information about how a unit is called

- mocks : preprogrammed with expectations

NB=> Mocks and spies have a lot in common 

Mocks : Most used , Most debated 

- The way we use them greatly influences the way we write tests

- If we need to use them too much , there is something wrong with our code

- Testing/Mocking styles:London/Chicago

---

## Stubs

incomplete objects that we use inside of our test . We should'nt use them our assertions .They are just helper objects to help us do our tests

otherUtils.ts

```ts
// Define a type 'stringInfo' that holds various string-related properties

export type stringInfo = {

  lowerCase: string;

  upperCase: string;

  characters: string[];

  length: number;

  extraInfo: Object | undefined;

};

// Function to calculate the complexity score of a given stringInfo object

export function calculateComplexity(stringInfo: stringInfo) {

  // Multiply the number of keys in 'extraInfo' with the length of the string

  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;

}
```

OtherUtils.test.ts

```ts
import { calculateComplexity } from "../../app/doubles/OtherUtils";

describe("OtherUtils test suite ", () => {

  it("Calculates complexity", () => {


//Stub    
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
```

---

Fakes 

```ts
// Define a type alias for a callback function that takes a string argument and returns void

type LoggerServiceCallBack = (arg: string) => void;
```

```ts
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
```

Fakes is a simplilfied working implementation of different functionalities that we use 

In this particular case any function with a string argument will do .Test coverage is misleading .And also we are not sure that this callback is called at all or not into our implementation.In this case we need a more complex fake testing object called a mock

# Jest Mock vs Custom Mock in Callback Testing

## **Why Use `callBackMock` Instead of `()=>{}`?**

In some test cases, we're using `callBackMock`, while in others, we're using an empty arrow function `()=>{}`. Let's break down the reasoning behind this.

### **Why?**

✅ **Tracking Behavior** – `callBackMock` lets us track:

- How many times the callback was called (`toBeCalledTimes(n)`)
- What argument was passed to the callback (`toBeCalledWith(value)`)  
  ✅ **Verifying Side Effects** – We can **store** arguments (`cbArgs.push(arg)`) and **count calls** (`timesCalled++`)

## **2. When We Use `()=>{}`**

### **Example:**

```ts
it("ToUpperCase-calls callback for invalid argument", () => {
  const actual = toUpperCaseWithCb("", () => {});
  expect(actual).toBeUndefined();
});
```

### **Why?**

✅ **No Tracking Needed** – This test only checks the **return value** of `toUpperCaseWithCb`.  
❌ **Does Not Track Calls** – The callback does **nothing**, so we cannot verify if it was called or with what arguments.

## **Key Difference**

| Callback Type  | Tracks Calls? | Tracks Arguments? | Used For                                                                |
| -------------- | ------------- | ----------------- | ----------------------------------------------------------------------- |
| `callBackMock` | ✅ Yes         | ✅ Yes             | When we need to check how the callback is used                          |
| `()=>{}`       | ❌ No          | ❌ No              | When we don't care about the callback, only the function's return value |

OtherUtils.ts

```ts
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
```

OtherUtils.test.ts

```ts
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
```

## Spies vs Mocks

- spies are not directly injected into sut 

- original functionality is preserved with spies 

- spies usually track method calls

otherUtils.ts

```ts
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

export class OtherStringUtils {

  public callExternalService() {

    console.log("Calling external service!!");

  }

  public toUpperCase(arg: string) {

    return arg.toUpperCase();

  }

  public logString(arg: string) {

    console.log(arg);

  }

}

```

OtherUtils.test.ts

```ts
import {

  calculateComplexity,

  OtherStringUtils,

  toUpperCaseWithCb,

} from "../../app/doubles/OtherUtils";

describe("OtherUtils test suite ", () => {

  describe.only("OtherStringUtils tests with spies", () => {

    let sut: OtherStringUtils;

    beforeEach(() => {

      sut = new OtherStringUtils();

    });

    test("Use a spy to track calls", () => {

      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");

      sut.toUpperCase("asa");

      expect(toUpperCaseSpy).toBeCalledWith("asa");

    });

    test("Use a spy to track calls to other module", () => {

      const consoleLogSpy = jest.spyOn(console, "log");

      sut.logString("abc");

      expect(consoleLogSpy).toBeCalledWith("abc");

    });

    test.only("Use a spy to replace the implementation of a method", () => {

      jest.spyOn(sut, "callExternalService").mockImplementation(() => {

        console.log("calling mocked implementation!!");

      });

      sut.callExternalService();

    });

  });

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

```
