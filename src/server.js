import http from "http";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text/plain");
  res.end("hello world");
});

server.listen(3000, () => {
  console.log("server running on port 3000");
});
