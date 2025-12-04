const http = require("http");

const server = http.createServer((req, res) => {
  // Set the Content-Type header
  res.setHeader("Content-Type", "text/html");

  // Get the URL path
  const url = req.url;

  // Route handling based on URL
  if (url === "/") {
    res.writeHead(200);
    res.end("Hello World");
  } else if (url === "/pizza") {
    res.writeHead(200);
    res.end("This is your pizza");
  } else if (url === "/home") {
    res.writeHead(200);
    res.end("Welcome home");
  } else if (url === "/about") {
    res.writeHead(200);
    res.end("Welcome to About Us");
  } else if (url === "/node") {
    res.writeHead(200);
    res.end("Welcome to my Node Js project");
  } else {
    res.writeHead(404);
    res.end("Page Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
