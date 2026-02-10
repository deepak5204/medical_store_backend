
// import mongoose from 'mongoose';
// mongoose.set('strictQuery', true);

// mongoose.connect('mongodb://127.0.0.1:27017/polling-api')
//   .then(()=>{
//     console.log('Connected!')
//   });

import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/polling-api");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
