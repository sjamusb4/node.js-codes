import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

//Custom Hook
export const useTodos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then((reponse) => {
      setTodos(reponse.data);
    });

    const id = setInterval(() => {
      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((reponse) => {
          setTodos(reponse.data);
        });
    }, 10 * 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return { todos, setTodos };
};
