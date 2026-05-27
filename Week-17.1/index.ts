// // without enums
// type KeyInput = "up" | "down" | "right" | "left";

// function doSomething(keyPressed: KeyInput) {
//   console.log("Going to :", keyPressed);
// }

// doSomething("up");
// // doSomething("cdsnin"); // will not work because we mentioned which values will accepted in KeyInput type

//using Enums

enum Direction {
  Up = "up",
  Down = "down",
  Right = "right",
  Left = "left",
}

function doSomething(keyPressed: Direction) {
  console.log("Going to :", keyPressed);
}

doSomething(Direction.Right);
