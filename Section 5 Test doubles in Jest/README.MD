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
