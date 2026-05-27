import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [id, setId] = useState(1);
  let [todos, setTodos] = useState([]); // its state variable
  // when state veriable/data changed then react re-render component autoamtically

  // axios.get("https://jsonplaceholder.typicode.com/todos").then((data) => {
  //   setTodos(data.data);
  // });

  // console.log("todo lenght is : ", todos.length);
  // setTimeout(() => {
  //   const id = setTodos([
  //     ...todos,
  //     { title: "Hi there " + Math.floor(Math.random() * 10) },
  //   ]);
  // }, 1000);

  // setTimeout(() => {
  //   setTodos([...todos, { title: "loremjs fjsb fsjdf b" }]);

  //   //  will cause infine loop for adding new todo, because setTods fn will casue re-render component
  // }, 1000);

  async function getAllTodos() {
    try {
      const result = await axios.get(
        "https://jsonplaceholder.typicode.com/todos",
      );
      setTodos(result.data); // it will cause re-render component
    } catch (error) {
      console.error(error);
    }
  }

  //run only once on first render (mount)
  useEffect(() => {
    getAllTodos(); // will run only once if dpendancy array is [] (empty) whne initilize

    // this callback fn also return fn
    return () => {};
  }, []);

  return (
    <>
      <h1>hello</h1>
      <button
        onClick={() => {
          setTodos([
            {
              id: 1,
              title: "abc",
            },
          ]);
          //todos = { title: "xyz" }; // will not re-render componnet, have change wiht setTodo fn
        }}
      >
        change
      </button>
      {/* <button onClick={getAllTodos}>get todos</button>
      {todos && todos.map((todo) => <Tods key={todo.id} title={todo.title} />)} */}

      <br />
      <br />
      <button onClick={() => setId(1)}>1</button>
      <button onClick={() => setId(2)}>2</button>
      <button onClick={() => setId(3)}>3</button>
      <button onClick={() => setId(4)}>4</button>
      <button onClick={() => setId(5)}>5</button>

      <Tods id={id} />
    </>
  );
}

const Tods = (props) => {
  const [title, setTitle] = useState("");

  const todoId = props.id;
  useEffect(() => {
    console.log("inside useeffect()", todoId);
    axios
      .get("https://jsonplaceholder.typicode.com/todos/" + todoId)
      .then((data) => {
        setTitle(data.data.title);
      });

    // it will clock for 1 sec, 2 sec, ...
    // will not stop old id clock , it in memory running
    // to stop we have to use cleanup fn for old render/old todoid (preveious id)
    const clockid = setInterval(() => {
      console.log("hi from set interval", todoId);
    }, todoId * 1000);

    //cleanup function
    // will run for before 2nd render or re-render (means after first render then run for re-render)
    // use to clean up for old render
    return () => {
      clearInterval(clockid);
      console.log("Hi from clean function", todoId);
    };
  }, [todoId]); // it will re-render when todoid will update or change
  return (
    <div
      style={{
        backgroundColor: "skyblue",
        padding: "20px",
        margin: "20px",
        border: "1px solid black",
        borderRadius: "30px",
      }}
    >
      {title}
    </div>
  );
};

export default App;
