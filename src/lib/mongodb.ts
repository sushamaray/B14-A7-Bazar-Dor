
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing from environment variables");
}

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient;
  _mongoClientPromise?: Promise<MongoClient>;
};

const mongoClient =
  globalForMongo._mongoClient ?? new MongoClient(uri);

const mongoClientPromise =
  globalForMongo._mongoClientPromise ?? mongoClient.connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = mongoClient;
  globalForMongo._mongoClientPromise = mongoClientPromise;
}

export { mongoClient, mongoClientPromise };

export const db = mongoClient.db("bazardor");
