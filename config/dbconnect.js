import mongoose from "mongoose";

export const dbconnects = async () => {
    try {
        const mongourl=process.env.MONGOURL;
      await mongoose.connect(mongourl);
      console.log("Database connected");
    } catch (error) {
      console.error("Database connection failed:", error.message);
      process.exit(1);
    }
  };
  