require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectWithDB = require("./config/db");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// For handling cookies
app.use(cookieParser());

// Initialize cookie-session middleware
app.use(
  cookieSession({
    name: "session",
    maxAge: Number(process.env.COOKIE_TIME || 7) * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET || process.env.JWT_SECRET],
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    httpOnly: true,
  })
);

// middleware to handle json
app.use(express.json());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// use express router
app.use("/", require("./routes"));

const startServer = async () => {
  await connectWithDB();

  const port = process.env.PORT || 8000;

  app.listen(port, (err) => {
    if (err) {
      console.log("Error in connecting to server: ", err);
    }
    console.log(`Server is running on port no. ${port}`);
  });
};

startServer();

module.exports = app;
