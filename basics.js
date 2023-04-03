// demonstrate all the basic features of the language
// 1. variables
// 2. functions
// 3. objects
// 4. arrays
// 5. conditionals
// 6. loops
// 7. exceptions
// 8. classes
// 9. modules
// 10. generators
// 11. promises
// 12. async/await
// 13. destructuring
// 14. spread operator
// 15. rest parameters
// 16. default parameters
// 17. template literals

// 1. variables
// var, let, const
// var is function scoped
// let and const are block scoped
// let and const are not hoisted
// let and const are not re-declarable
// const is immutable
// const is not re-assignable
// const is not re-declarable
// what is hoisting?
// what is immutability?
// var a = 1;
a = 1;
console.log(a);
let b = 2;
const c = 3;
console.log(a, b, c);
function test() {
  console.log(a, b, c);
  a = 4;
  // c = 1; // TypeError
  b = 4;
  // let b = 5;
  // const c = 6;
  console.log(a, b, c);
}
test();
// let b = 5; // cannot re-declare b
var a = 7; // var is function scoped, comment this and see L32 being declared in the global scope
console.log({ a, b, c });
// tip 💡: object literal shorthand and computed property names, easy to read variable names and values

// 2. functions
// function declaration
function test1() {
  console.log("test1");
}
// function expression
const test2 = function () {
  console.log("test2");
};
// arrow function
const test3 = () => {
  console.log("test3");
};
// function hoisting
hoisted();
function hoisted() {
  console.log("hoisted");
}

// notHoisted();
var notHoisted = function () {
  console.log("notHoisted");
};
// function immutability
function add(a, b) {
  console.log({ a, b, this: this });
  return a + b;
}

const addFive = add.bind(null, 5);
// bind is a function that returns a new function with the context of the first argument
// why null? because we don't want to bind the context of the function to anything and context will be global

console.log(add(1, 2)); // Output: 3
console.log(addFive(10)); // Output: 15

// callback
function callback() {
  console.log("callback");
}

function testWithCallback(number, callback) {
  console.log("test", number);
  const result = number + 1;
  callback(result);
}

testWithCallback(1, callback);
testWithCallback(2, (num) => {
  const factorial = (num) => {
    if (num === 0) return 1;
    return num * factorial(num - 1);
  };
  console.log("factorial:", factorial(num));
});

// setTimeout, setInterval, clearTimeout, clearInterval, setImmediate, clearImmediate
setTimeout(() => {
  console.log("Hello after 3 seconds");
}, 3000);

let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`Count is ${count}`);
  if (count === 5) {
    clearInterval(intervalId);
    console.log("Interval stopped");
  }
}, 2000);

const timeoutId = setTimeout(() => {
  console.log("This message will never be printed");
}, 3000);

clearTimeout(timeoutId);

setImmediate(() => {
  console.log(
    "This function will be executed on the next iteration of the event loop"
  );
});

const immediateId = setImmediate(() => {
  console.log("This message will never be printed");
});

clearImmediate(immediateId);

// 3. objects
// object literal
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  hobbies: ["reading", "running", "traveling"],
  address: {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
  },
  sayHello: function () {
    console.log(`Hello, my name is ${this.firstName} ${this.lastName}.`);
  },
};
console.log(person.firstName); // Output: "John"
console.log(person["age"]); // Output: 30
person.email = "johndoe@example.com"; // Add a new property
person["address"]["country"] = "USA"; // Update an existing property of a nested object

// object constructor
const person2 = new Object();
person2.firstName = "Jane";
person2.lastName = "Doe";
person2.age = 25;
person2.hobbies = ["reading", "running", "traveling"];
person2.address = {
  street: "123 Main St",
  city: "Anytown",
  state: "CA",
  zipCode: "12345",
};
person2.sayHello = function () {
  console.log(`Hello, my name is ${this.firstName} ${this.lastName}.`);
};

function Person1(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;

  this.sayHello = function () {
    console.log(`Hello, my name is ${this.firstName} ${this.lastName}.`);
  };
}
const john = new Person1("John", "Doe", 30);

// object prototype
// Define a constructor function for a Person object
function PersonPrototype(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

// Add a method to the Person prototype
PersonPrototype.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.firstName} ${this.lastName}.`);
};

// Create a new Person object
const john1 = new PersonPrototype("John", "Doe");

// Call the sayHello method on the john object
john.sayHello(); // logs "Hello, my name is John Doe."

// object immutability
const originalObj = { foo: "bar", baz: "qux" };

// Create a new object with the same properties as the original object
const clonedObj = originalObj;
// const cleanedObj = Object.assign({}, originalObj);
// const clonedObj = { foo: originalObj.foo, baz: originalObj.baz };
// const clonedObj = { ...originalObj }; // spread operator

// Modify a property on the cloned object
clonedObj.foo = "new value";
originalObj.baz = "new value 1";

console.log(originalObj); // { foo: 'bar', baz: 'qux' }
console.log(clonedObj); // { foo: 'new value', baz: 'qux' }

const obj = { foo: "bar", baz: "qux" };

// Freeze the object
Object.freeze(obj);

// Try to modify a property on the frozen object
// obj.foo = "new value"; // error, object is frozen

console.log(obj); // { foo: 'bar', baz: 'qux' }

// 4. arrays and sets
// array literal
const numbers = [1, 2, 3, 4, 5];

// array constructor
const numbers2 = new Array(1, 2, 3, 4, 5);

// array prototype
const emptyArray = new Array(10);

// array function
// Create an array
let myArray = [1, 2, 3, 4, 5];

// push(): adds one or more elements to the end of an array.
myArray.push(6, 7);
console.log(myArray); // Output: [1, 2, 3, 4, 5, 6, 7]

// pop(): removes and returns the last element of an array.
let lastElement = myArray.pop();
console.log(lastElement); // Output: 7
console.log(myArray); // Output: [1, 2, 3, 4, 5, 6]

// shift(): removes and returns the first element of an array.
let firstElement = myArray.shift();
console.log(firstElement); // Output: 1
console.log(myArray); // Output: [2, 3, 4, 5, 6]

// unshift(): adds one or more elements to the beginning of an array.
myArray.unshift(0, 1);
console.log(myArray); // Output: [0, 1, 2, 3, 4, 5, 6]

// slice(): returns a new array containing a portion of the elements of the original array.
let newArray = myArray.slice(2, 5);
console.log(newArray); // Output: [2, 3, 4]

// concat(): combines two or more arrays into a new array.
let newArray2 = [7, 8, 9];
let combinedArray = myArray.concat(newArray2);
console.log(combinedArray); // Output: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// array immutability
const arr1 = [1, 2, 3];
const arr2 = arr1.concat(4);
// const arr2 = [...arr1, 4];
console.log(arr1); // [1, 2, 3]
console.log(arr2); // [1, 2, 3, 4]

// set literal
const mySet = new Set([1, 2, 3, 4, 5]);
// set constructor
const mySet2 = new Set();
// set prototype
// set functions
const set1 = new Set([1, 2, 3]);
const set2 = set1.add(4); // returns a new Set object with value 4 added

console.log(set1); // Set {1, 2, 3}
console.log(set2); // Set {1, 2, 3, 4}

const set3 = set2.delete(3); // returns a new Set object with value 3 removed

console.log(set2); // Set {1, 2, 3, 4}
console.log(set3); // Set {1, 2, 4}

// set immutability
const set = new Set([1, 2, 3]);
Object.freeze(set);
// set.add(4); // Throws an error

// 5. conditionals
// if
let check = true;
if (check) {
  console.log("check is true");
}
// ternary operator
check ? console.log("check is true") : console.log("check is false");
const valueToCheck = 5;
const result = valueToCheck > 10 ? "greater than 10" : "less than 10";
console.log(result);
// if...else
if (valueToCheck > 10) {
  console.log("greater than 10");
} else {
  console.log("less than 10");
}
// if...else if...else
if (valueToCheck > 10) {
  console.log("greater than 10");
} else if (valueToCheck < 0) {
  console.log("less than 10");
} else {
  console.log("equal to 10");
}
// switch
switch (valueToCheck) {
  case 1:
    console.log("value is 1");
    break;
  case 2:
    console.log("value is 2");
    break;
  case 10:
    console.log("value is 10");
    break;
  default:
    console.log("value is not 1, 2, or 10");
}

// 6. loops
// for loop
const myArray1 = [1, 2, 3, 4, 5];
for (let i = 0; i < myArray.length; i += 1) {
  console.log(myArray[i]);
}
// for...in loop
for (const i in myArray) {
  console.log(myArray[i]);
}
// for...of loop
for (const i of myArray) {
  console.log(i);
}
// while loop
let i = 0;
while (i < myArray.length) {
  console.log(myArray[i]);
  i += 1;
}
// do...while loop
let j = 0;
do {
  console.log(myArray[j]);
  j += 1;
} while (j < myArray.length);
// forEach loop
myArray.forEach((element) => {
  console.log(element);
});
// map loop
myArray.map((element) => {
  console.log(element);
});

let mappedArray = myArray.map((element) => {
  return element * 2;
});
console.log(mappedArray); // Output: [2, 4, 6, 8, 10]
mappedArray = myArray.map((element, index) => element * index);
console.log(mappedArray); // Output: [0, 2, 6, 12, 20]
// filter loop
let filteredArray = myArray.filter((element) => element > 3);
console.log(filteredArray); // Output: [4, 5]
filteredArray = myArray.filter((element, index) => {
  if (index % 2 === 0) {
    return element;
  }
  if (element > 3) {
    return element;
  }
});
console.log(filteredArray); // Output: [1, 3, 4, 5]
// reduce loop
let reducedArrayValue = myArray.reduce(
  (accumulator, currentValue) => accumulator + currentValue
);
console.log(reducedArrayValue); // Output: 15
reducedArrayValue = myArray.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  10
);
console.log(reducedArrayValue); // Output: 25
reducedArrayValue = myArray.reduce((accumulator, currentValue, index) => {
  if (index % 2 === 0) {
    return accumulator + currentValue;
  }
  return accumulator + currentValue * 2;
});
console.log(reducedArrayValue); // Output: 35
// find loop
const foundElement = myArray.find((element) => element > 3);
console.log(foundElement); // Output: 4
// findIndex loop
const foundElementIndex = myArray.findIndex((element) => element > 3);
console.log(foundElementIndex); // Output: 3
// every loop
let everyElementCheck = myArray.every((element) => element > 3);
console.log(everyElementCheck); // Output: false
everyElementCheck = myArray.every((element) => element >= 0);
console.log(everyElementCheck); // Output: true
// some loop
let someElementCheck = myArray.some((element) => element > 3);
console.log(someElementCheck); // Output: true
someElementCheck = myArray.some((element) => element < 0);
console.log(someElementCheck); // Output: false

// 7. exceptions
// try...catch
try {
  console.log(myArray[10]);
} catch (error) {
  console.log(error);
}
// try...catch...finally
try {
  console.log(myArray[10]);
} catch (error) {
  console.log(error);
} finally {
  console.log("finally block");
}
// throw
const functionThatThrows = () => {
  throw new Error("This is an error");
};
try {
  console.log(myArray);
  functionThatThrows();
} catch (error) {
  console.log(error);
}

// 8. classes
// class declaration
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  area() {
    return this.height * this.width;
  }
}

// class expression
let RectangleExpresion = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  area() {
    return this.height * this.width;
  }
};

// class prototype
Rectangle.prototype.color = "blue";

let rectangle1 = new Rectangle(10, 20);
let rectangle2 = new Rectangle(5, 15);

console.log(rectangle1.color); // 'blue'
console.log(rectangle2.color); // 'blue'

// class immutability
class Person {
  constructor(name) {
    this.name = name;
    Object.freeze(this);
  }
}

let personLet = new Person("John");
// personLet.age = 30; // Throws an error in strict mode
// delete personLet.name; // Throws an error in strict mode
console.log(personLet.name); // Outputs 'John'

// 9. modules
// import
import * as addImport from "./add.js";
import subtract, { subtractOne } from "./subtract.cjs";

console.log(addImport);

// console.log(addImport.add(1, 2)); // throws error - module.exports has default export as addImport.default
console.log(addImport.default(1, 2)); // 3
console.log(addImport.addOne(1)); // 2

console.log(subtract(1, 2)); // -1
console.log(subtractOne(1)); // 0

// const helloWorld = require("./hello.cjs"); // error

// 10. generators
// generator function
function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

console.log(generatorFunction()); // [Generator] {}
for (const i of generatorFunction()) {
  console.log(i);
}
// generator function expression
const generatorFunctionExpression = function* () {
  yield 1;
  yield 2;
  yield 3;
};

console.log(generatorFunctionExpression()); // [Generator] {}
for (const i of generatorFunctionExpression()) {
  console.log(i);
}

// 11. promises
// promise constructor
const promiseConstructor = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise resolved");
  }, 1000);
});

promiseConstructor.then((value) => console.log(value));

// 12. async/await
// async function
async function asyncFunction() {
  return "Async function resolved";
}
// async function expression
const asyncFunctionExpression = async function () {
  return "Async function expression resolved";
};

(async () => {
  const asyncFunctionResult = await asyncFunction();
  console.log(asyncFunctionResult);
  const asyncFunctionExpressionResult = await asyncFunctionExpression();
  console.log(asyncFunctionExpressionResult);
})();

// event loop and promises and call stack

// 13. destructuring
// array destructuring
const arrayDestructuring = [1, 2, 3, 4, 5];
const [first, second, ...rest] = arrayDestructuring;
// object destructuring
const objectDestructuring = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    state: "NY",
  },
};
const { name, age, address } = objectDestructuring;
console.log(name, age); // John 30
const { city, state } = address;
console.log(city, state); // New York NY
const { name: firstName, age: years } = objectDestructuring;
const {
  address: { city: cityName },
} = objectDestructuring;
console.log(firstName, years, cityName); // John 30 New York

// 14. spread operator
// array spread operator
const arraySpreadOperator = [1, 2, 3, 4, 5];
const arraySpreadOperatorCopy = [...arraySpreadOperator];
console.log(arraySpreadOperatorCopy); // [1, 2, 3, 4, 5]
// object spread operator
const objectSpreadOperator = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    state: "NY",
  },
};
const objectSpreadOperatorCopy = { ...objectSpreadOperator };
console.log(objectSpreadOperatorCopy); // { name: 'John', age: 30, address: { city: 'New York', state: 'NY' } }

// 15. rest parameters
// array rest parameters
const arrayRestParameters = (first, second, ...rest) => {
  console.log({ first, second, rest });
};
arrayRestParameters(1, 2, 3, 4, 5); // { first: 1, second: 2, rest: [ 3, 4, 5 ] }
// object rest parameters
const objectRestParameters = ({ first, second, ...rest }) => {
  console.log({ first, second, rest });
};
objectRestParameters({ first: 1, second: 2, third: 3, fourth: 4, fifth: 5 }); // { first: 1, second: 2, rest: { third: 3, fourth: 4, fifth: 5 } }

// 16. default parameters
// array default parameters
const arrayDefaultParameters = (first = 1, second = 2) => {
  console.log({ first, second });
};
console.log(arrayDefaultParameters()); // { first: 1, second: 2 }
console.log(arrayDefaultParameters(3)); // { first: 3, second: 2 }
// object default parameters
const objectDefaultParameters = ({ first = 1, second = 2 } = {}) => {
  console.log({ first, second });
};
console.log(objectDefaultParameters()); // { first: 1, second: 2 }
console.log(objectDefaultParameters({ first: 3 })); // { first: 3, second: 2 }

// 17. template literals
// template literals
const myName = "Krushi Raj Tula";
const profession = "Full Stack Developer";
const templateLiterals = `Hello, my name is ${myName} and I am a ${profession}`;
console.log(templateLiterals); // Hello, my name is Krushi Raj Tula and I am a Full Stack Developer
