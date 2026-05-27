//Generics

function getFirstElement(arr: (Number | String)[]): Number | String {
  return arr[0];
}

//console.log(getFirstElement([64, 45, 35, 45]));
//console.log(getFirstElement(["abc", "xyz", "PQR"]).toUpperCase());
//Property 'toUpperCase' does not exist on type 'String | Number'.
//  Property 'toUpperCase' does not exist on type 'Number'.ts(2339

// make it generic function that works with any type
interface USER {
  name: String;
}

function getFirstElement1<T>(arr: T[]): T {
  return arr[0];
}

console.log(getFirstElement1<Number>([64, 45, 35, 45]));
console.log(getFirstElement1<String>(["abc", "XYZ", "pqr"]).toUpperCase());

const user1: USER = {
  name: "Alice",
};

const user2: USER = {
  name: "Bob",
};
const el = getFirstElement1([user1, user2]);
console.log(el.name.toUpperCase());
