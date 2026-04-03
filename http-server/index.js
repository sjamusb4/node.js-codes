const http = require("http");
const url = require("url");

const PORT = 3000;
const host = "localhost";

const server = http.createServer((req, res) => {
  const myUrl = url.parse(req.url, true);
  const uName = myUrl.query.name;

  if (myUrl.pathname == "/") {
    res.end("<h1>Welcome to Homepage</h1>");
  } else if (myUrl.pathname == "/greet") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Hello ${uName || "Guest"}!`,
      }),
    );
  }
});

server.listen(PORT, host, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
