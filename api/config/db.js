const mongoose = require('mongoose');

const connectWithDB = async () => {
  mongoose.set('strictQuery', false);

  if (!process.env.DB_URL) {
    throw new Error('DB_URL environment variable is required');
  }

  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });
    console.log('DB connected successfully');
  } catch (err) {
    console.log('DB connection failed');
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectWithDB;
