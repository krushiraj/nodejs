// a simple script to connect to a MongoDB database
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import fs from "fs/promises";

// const personsData = require("./persons.json");

dotenv.config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const populateDb = async (personsCollection) => {
  try {
    const personsDataContent = await fs.readFile("./testData.json", "utf8");
    const personsData = JSON.parse(personsDataContent);
    await personsCollection.insertMany(personsData);
    console.log("Data inserted");
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    console.log("Connected to MongoDB");

    // Select the database and collection
    const db = client.db("test");
    const personsCollection = db.collection("persons");

    // Insert a document into the collection
    await personsCollection.insertOne({ name: "John Doe", age: 30 });

    // Insert multiple documents into the collection
    await populateDb(personsCollection);
    // what if we have a csv file with 1000s of records?

    // Find all documents in the collection
    const result = await personsCollection.find({}).toArray();
    console.log(result);

    // find all who are 24
    const result2 = await personsCollection.find({ age: 24 }).toArray();
    console.log(result2);

    // get the first 5
    const result3 = await personsCollection.find({}).limit(5).toArray();
    console.log(result3);

    // get the first 5 who are 24
    const result4 = await personsCollection.find({ age: 24 }).limit(5).toArray();
    console.log(result4);

    // get all who are above 30
    const result5 = await personsCollection.find({ age: { $gt: 30 } }).toArray();
    console.log(result5);

    // get only ages of all
    const result6 = await personsCollection
      .find({}, { projection: { age: 1 } })
      .toArray();
    console.log(result6);

    // get only names of all who are above 40
    const result7 = await personsCollection
      .find({ age: { $gt: 40 } }, { projection: { name: 1 } })
      .toArray();
    console.log(result7);

    // delete all who are 25
    const result8 = await personsCollection.deleteMany({ age: 25 });
    console.log(result8);

    // delete whose name is Raj
    const result9 = await personsCollection.deleteOne({ name: "Raj" });
    console.log(result9);

    // update age of Bill to 50
    const result10 = await personsCollection.updateOne(
      { name: "Bill" },
      { $set: { age: 50 } }
    );
    console.log(result10);

    // upsert - update if exists, insert if not
    const result11 = await personsCollection.updateOne(
      { name: "Bill" },
      { $set: { age: 51 } },
      { upsert: true }
    );
    console.log(result11);
    await personsCollection.deleteOne({ name: "Bill" });
    const result12 = await personsCollection.updateOne(
      { name: "Bill" },
      { $set: { age: 71 } },
      { upsert: true }
    );
    console.log(result12);
  } catch (err) {
    console.error(err);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
    console.log("Disconnected from MongoDB");
  }
};

main().catch(console.error);
