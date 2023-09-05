const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js");
const landsRoute = require("./routes/lands.js");
const provinceRoute = require("./routes/province.js");
const uploadRoute = require("./routes/upload.js");
const orgRoute = require("./routes/organization");
const bannerRoute = require("./routes/banner");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

const storageEngine = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  multer({
    storage: storageEngine,
    limits: {
      fileSize: "2mb",
    },
    fileFilter: fileFilter,
  }).array("images", 5)
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/lands", landsRoute);
app.use("/api/provinces", provinceRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/organization", orgRoute);
app.use("/api/banner", bannerRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT || 5000, () => {
  connect();
  console.log("Connected to backend.");
});
