const { MongoClient } = require("mongodb");
require('dotenv').config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.dxoq6sb.mongodb.net/?retryWrites=true&w=majority`;

let client;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
}

async function insertToDB(dbName, dbCollection, content) {
  try {
    await connectToDatabase(); // Ensure the client is connected before performing operations

    const database = client.db(dbName);
    const user = database.collection(dbCollection);

    const result = await user.insertOne(content);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    console.error('Error inserting document:', error);
  }
}

module.exports = {
  insertToDB,
  connectToDatabase,
};
