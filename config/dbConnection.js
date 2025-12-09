const mongoose = require('mongoose');

const connectDB = async () => {
  try {

    if (!process.env.CONNECTION_STRING) {
      console.error("⚠️ CONNECTION_STRING is NOT set (process.env.CONNECTION_STRING is undefined).");
      console.error("Check that your .env file is at project root and dotenv.config() runs before connectDB().");
      throw new Error("Missing CONNECTION_STRING env var");
    }

    const preview = process.env.CONNECTION_STRING.slice(0, 40) + '...';
    console.log("Attempting Mongo connect with URI starting:", preview);

    const conn = await mongoose.connect(process.env.CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host} - ${conn.connection.name}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
