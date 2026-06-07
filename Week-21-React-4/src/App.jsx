import { useRef } from "react";
import { useState } from "react";
import { useTodos } from "./hooks/useTodos";
import { TodoContext } from "./contexts/TodosContext";
import { useContext } from "react";

function App() {
  const { todos, setTodos } = useTodos(); // using custom hook

  const [seconds, setSeconds] = useState(0);
  //const [intervalId, setIntervalId] = useState(0);

  const intervalId = useRef(null); // value will be persisted across re-render, but change in value will not cause re-render
  function startClock() {
    let id = setInterval(() => {
      //console.log("inside setInterval", seconds);
      setSeconds((s) => s + 1);
    }, 1000);

    console.log("intervalId", id);
    intervalId.current = id;
    // will cause re-render component
    //setIntervalId(i);
  }

  function stopClock() {
    console.log(intervalId.current);
    clearInterval(intervalId.current);
  }
  return (
    <TodoContext.Provider value={setTodos}>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            width: "100vw",
            flexDirection: "column",
          }}
        >
          <div>
            <button onClick={startClock}>Start Clock</button>
            <button onClick={stopClock}>Stop Clock</button>
          </div>
          <div style={{ fontSize: 100 }}>{seconds}s</div>
        </div>
        <div>
          <h1 style={{ textAlign: "center" }}>Todos</h1>
          {todos.map((todo) => (
            <Todo key={todo.id} title={todo.title} id={todo.id} />
          ))}
        </div>
      </>
    </TodoContext.Provider>
  );
}

function Todo({ id, title }) {
  // function deleteTodo(id) {
  //   setTodos((todos) => todos.filter((t) => t.id !== id));
  //   // passing function to setTodos will give us the latest value of todos,
  //   // so we can safely use all entire todos array without getting from parent coponent
  // }
  return (
    <div style={{ padding: 20, border: "2px solid black ", margin: 10 }}>
      <div>{title}</div>
      <br />
      <DeleteTodo id={id} />
    </div>
  );
}

function DeleteTodo({ id }) {
  const setTodos = useContext(TodoContext);
  return (
    <button
      style={{
        backgroundColor: "red",
        padding: 10,
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: 25,
      }}
      onClick={() => setTodos((todos) => todos.filter((t) => t.id !== id))}
    >
      Delete
    </button>
  );
}

export default App;
