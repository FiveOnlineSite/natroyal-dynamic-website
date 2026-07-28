const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("node:dns");

dotenv.config();

// Helps when the local router refuses MongoDB SRV DNS queries
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDb = async () => {
  try {
    if (!process.env.MONGO_DB_URL) {
      throw new Error("MONGO_DB_URL is missing from the .env file");
    }

    const connection = await mongoose.connect(process.env.MONGO_DB_URL);

    console.log(
      `Database connected successfully: ${connection.connection.host}`
    );
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;