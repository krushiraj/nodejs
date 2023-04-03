import express from "express";
import "dotenv/config";
import path from "path";
import { MongoClient } from "mongodb";

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const app = express();

// json middleware
app.use(express.json());

app.get("/", (req, res) => {
  const data = { message: "Hello, world!" };
  res.json(data);
});

app.get("/persons", async (req, res) => {
  await client.connect();
  const db = client.db("test");
  const personsCollection = db.collection("persons");

  // parse query params
  const { age } = req.query;
  const query = age ? { age: Number(age) } : {};

  const result = await personsCollection.find(query).toArray();
  res.json(result);
});

app.get("/welcome", (req, res) => {
  res.sendFile(path.join(path.resolve(), "welcome.html"));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
