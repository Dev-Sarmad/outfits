import mongoose from "mongoose";
import { config } from "./config.ts";

const databaseConnection = async () => {
  try {
    //this is an event listener to check the status of the connection with db;
    mongoose.connection.on("connected", () => {
      console.log("✅connected to the database");
    });
    mongoose.connection.on("error", (err) => {
      console.error("❌ Database runtime error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ Database connection lost.");
    });

    mongoose.connection.on("reconnected", () => {
      console.log("🔄 Database successfully reconnected.");
    });
    //this is an action to connect with the db and returns promise;
    await mongoose.connect(config.MONGODB_CONNECTION_STRING);
    console.log("database connected");
  } catch (error) {
    return console.error(error);
    process.exit(1);
  }
};

export default databaseConnection;
