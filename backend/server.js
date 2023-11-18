const express = require("express");
const path = require("path");
// console.log(express)
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const adminModal = require("./models/adminModal");
const userModel = require("./models/userModel");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const expressAsyncHandler = require("express-async-handler");
PORT = process.env.PORT || 5001;
connectDB();
const app = express();
app.use(fileupload());
app.use(cors());
app.use(express.json());
app.use(methodOverride("_method"));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/Users", require("./routes/userRoutes"));
app.use("/Admin", require("./routes/AdminRoutes"));
app.use("/Feed", require("./routes/FeedRoutes"));
app.use("/MarketPlace", require("./routes/MarketPlaceRoutes"));
app.use("/Follow", require("./routes/FollowerRoutes"));
app.use("/CloseFriend", require("./routes/CloseFriendsRoutes"));

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please Activate Production"));
}

// app.use(errorHandler);
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
