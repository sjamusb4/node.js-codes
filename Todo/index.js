let currentId = 1;
const allToDo = [];

function getAllTodo() {
  if (allToDo.length === 0) {
    console.log("List is empty.");
    return;
  }
  console.table(allToDo);
  //   allToDo.forEach((element) => {
  //     console.log(
  //       element.id,
  //       element.description,
  //       element.isCompleted ? "Done" : "Pending",
  //     );
  //   });
}

function getTodoById(index) {
  const todo = allToDo.find((element) => element.id === index);
  if (todo) {
    console.log(
      todo.id,
      todo.description,
      todo.isCompleted ? "Done" : "Pending",
    );
  } else {
    console.log("Invalid ID...!");
  }
}

function addToDo(description) {
  if (!description || description.trim() === "") {
    console.log("Please don't give blank todo");
    return;
  }
  allToDo.push({
    id: currentId++,
    description: description.trim(),
    isCompleted: false,
  });
  console.log("Todo added!");
}

function removeTodo(index) {
  const todoIndex = allToDo.findIndex((todo) => todo.id === index);
  if (todoIndex !== -1) {
    allToDo.splice(todoIndex, 1);
    console.log("Todo Removed! :", index);
  } else {
    console.log("Invalid ID...!");
  }
}

function updateToDo(index, updatedDescription) {
  if (!updatedDescription || updatedDescription.trim() === "") {
    console.log("Please don't give blank todo");
    return;
  }
  const todo = allToDo.find((element) => element.id === index);
  if (todo) {
    todo.description = updatedDescription.trim();
    console.log("Todo Updated! :", index);
  } else {
    console.log("Invalid ID...!");
  }
}

function completeTodo(index) {
  const todo = allToDo.find((element) => element.id === index);
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
    console.log("Todo status updated!");
  } else {
    console.log("Invalid ID...!");
  }
}

// Testing
addToDo("do work");
addToDo("do assignment");
addToDo("go home");
addToDo("solve problem");

console.log("--- Current List ---");
getAllTodo();

completeTodo(1);
console.log("--- Updated List ---");
getAllTodo();
