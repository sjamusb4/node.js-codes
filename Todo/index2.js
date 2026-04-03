import { writeFileAsync, readFileAsync } from "./promisifiedCode.js";
let currentId = 1;
let allToDo = [];

async function saveTodo() {
  try {
    await writeFileAsync("todo.json", JSON.stringify(allToDo, null, 2));
    console.log("Changes saved to disk!");
  } catch (err) {
    console.error("Error saving your todos:", err);
  }
}

async function readTodo() {
  try {
    const data = await readFileAsync("todo.json");

    if (!data || data.trim() === "") {
      allToDo = [];
    } else {
      allToDo = JSON.parse(data);
      if (allToDo.length > 0) {
        const lastItem = allToDo[allToDo.length - 1];
        currentId = lastItem.id + 1;
      }
    }
  } catch (err) {
    console.log("Starting with a fresh list.");
    allToDo = [];
  }
}

function getAllTodo() {
  if (allToDo.length === 0) {
    console.log("List is empty.");
    return;
  }

  allToDo.forEach((element) => {
    console.log(
      element.id,
      element.description,
      element.isCompleted ? "Done" : "Pending",
    );
  });
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

async function addToDo(description) {
  if (!description || description.trim() === "") {
    console.log("Please don't give blank todo");
    return;
  }
  allToDo.push({ id: currentId++, description, isCompleted: false });
  await saveTodo();
  console.log("Todo added!");
}

async function removeTodo(index) {
  //   const exists = allToDo.some((todo) => todo.id === index);
  //   if (exists) {
  //     allToDo = allToDo.filter((element) => element.id !== index);
  //     console.log("Todo Removed! :", index);
  //   } else {
  //     console.log("Invalid ID...!");
  //   }

  const initialLength = allToDo.length;
  allToDo = allToDo.filter((todo) => todo.id !== index);

  if (allToDo.length < initialLength) {
    await saveTodo();
    console.log("Todo Removed! :", index);
  } else {
    console.log("Invalid ID...!");
  }
}

async function updateToDo(index, updatedDescription) {
  const todo = allToDo.find((element) => element.id === index);
  if (todo) {
    todo.description = updatedDescription;
    await saveTodo();
    console.log("Todo Updated! :", index);
  } else {
    console.log("Invalid ID...!");
  }
}

async function completeTodo(index) {
  const todo = allToDo.find((element) => element.id === index);
  if (todo) {
    todo.isCompleted = !todo.isCompleted;
    await saveTodo();
    console.log("Todo status updated!");
  } else {
    console.log("Invalid ID...!");
  }
}
async function clearAllTodo() {
  allToDo = [];
  await saveTodo();
}
async function startApp() {
  //   await clearAllTodo();
  await readTodo();

  // Testing
  await addToDo("do work");
  await addToDo("do assignment");
  await addToDo("go home");

  console.log("--- Current List ---");
  getAllTodo();

  await removeTodo(2);

  console.log("--- Updated List ---");
  getAllTodo();
}

startApp();
