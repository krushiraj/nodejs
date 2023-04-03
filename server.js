// a simple server in node.js
// to run: node server.js
// then in a browser: http://localhost:8080

// load the http module
// const http = require("http");
import http from "http";
import fs from "fs";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

// create a server object:
// make async after adding mongo
const server = http.createServer(async function (req, res) {
  const { url } = req;
  console.log(url);
  if (url === "/") {
    res.write("Hello World!"); // write a response to the client
    res.end(); // end the response
  } else if (url === "/about") {
    res.write("About page"); // write a response to the client
    res.end(); // end the response
  } else if (url === "/persons") {
    // explain query params and how to get them
    await client.connect();
    const db = client.db("test");
    const personsCollection = db.collection("persons");
    const result = await personsCollection.find({}).toArray();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(result)); // write a response to the client
    res.end(); // end the response
  } else if (url === "/welcome") {
    // event loop and non-blocking, callback
    fs.readFile("welcome.html", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("File not found!");
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  } else {
    res.writeHead(404);
    // res.write("404"); // write a response to the client
    res.end(); // end the response
  }

  // res.write("Hello World!"); // write a response to the client
  // res.end(); // end the response
});

// start the server on port 8080
server.listen(8080);
