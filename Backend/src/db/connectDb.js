import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";
// shikharaug08:aHnRJRRG9T6k5gMA
const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
    );
    console.log(
      `\n MongoDb connected !! DB_HOST : ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};

export default connectDb;
