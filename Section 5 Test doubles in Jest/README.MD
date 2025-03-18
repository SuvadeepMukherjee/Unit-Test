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
