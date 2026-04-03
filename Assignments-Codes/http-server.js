// import express from "express";
// const app = express();

// app.use(express.json());
// const todos = [];
// let currentID = 1;

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.post("/create/todo", (req, res) => {
//   const { title, description } = req.body;
//   const newToDo = {
//     id: currentID++,
//     title: title,
//     description: description,
//   };
//   todos.push(newToDo);
//   res.json(todos);
// });

// app.get("/todos", (req, res) => {
//   res.json(todos);
// });

// app.get("/todo", (req, res) => {
//   const id = parseInt(req.query.id);
//   const currentToDO = todos.find((ele) => ele.id === id);
//   if (currentToDO) res.json(currentToDO);
//   else res.status(404).json({ error: "Todo not found" });
// });

// app.delete("/todo", (req, res) => {
//   const id = parseInt(req.query.id);
//   const index = todos.findIndex((ele) => ele.id === id);
//   if (index != -1) {
//     todos.splice(index, 1);
//     res.status(200).send();
//   } else res.status(404).json({ error: "Todo not found" });
// });
// app.listen(3000, () => {
//   console.log("Running on 3000");
// });

import http from "http";
import url from "url";

const todos = [];
let currentID = 1;

const server = http.createServer((req, res) => {
  console.log("aaaaaaaaa", req.url);

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Helper to send JSON responses
  const sendJSON = (data, status = 200) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  };

  // GET /
  if (path === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    return res.end("Hello World");
  }

  // GET /todos
  if (path === "/todos" && method === "GET") {
    return sendJSON(todos);
  }

  // GET /todo?id=1
  if (path === "/todo" && method === "GET") {
    const id = parseInt(parsedUrl.query.id);
    const todo = todos.find((t) => t.id === id);
    return todo ? sendJSON(todo) : sendJSON({ error: "Todo not found" }, 404);
  }

  // DELETE /todo?id=1
  if (path === "/todo" && method === "DELETE") {
    const id = parseInt(parsedUrl.query.id);
    const index = todos.findIndex((t) => t.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
      res.writeHead(200);
      return res.end();
    }
    return sendJSON({ error: "Todo not found" }, 404);
  }

  // POST /create/todo
  if (path === "/create/todo" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const { title, description } = JSON.parse(body);
      const newTodo = { id: currentID++, title, description };
      todos.push(newTodo);
      sendJSON(todos);
    });
    return;
  }

  // 404 fallback
  sendJSON({ error: "Route not found" }, 404);
});

server.listen(3000, () => {
  console.log("Running on 3000 (Core HTTP)");
});
