const express = require("express");

const {greet,pi} = require("./utils");

const app = express();

app.get("/", (req, res) => {
  greet("navira");

  res.json({ message: "Welcome to the homepage!" });
  // res.send("Welcome to the homepage!");
});

app.use((req, res) => {
  res.status(404).json({ error: "Page not found" });
  //res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
// nodejs
// const http = require("http");

// const server = http.createServer((req, res) => {

//   if (req.url === "/") {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Welcome to the homepage!");
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("Page not found");
//   }
// });

// server.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
