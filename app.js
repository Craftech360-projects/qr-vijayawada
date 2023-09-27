const express = require("express");
const http = require("http");
const ejs = require("ejs");
const socketIo = require("socket.io");
const QRCode = require("qrcode");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const csvtojson = require("csvtojson");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/asset", express.static(path.join(__dirname, "asset")));
app.set("view engine", "ejs");
app.set("views", "views");

const mongo_URI =
  "mongodb+srv://yamuna:Dbnd0ki7s3DC0DQ3@cluster0.v6kew10.mongodb.net/qr-vijaywada";

const userSchema = new mongoose.Schema({
  serialNum: {
    type: String,
    required: true,
  },
  uniqueCode: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
  },
  isAttended: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

mongoose
  .connect(mongo_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    // Connected to the MongoDB database
    console.log("Connected to the MongoDB database");
  })
  .catch((error) => {
    console.error("Error connecting to the MongoDB database:", error);
  });

app.get("/", (req, res) => {
  res.render("home", { qrCodeData: null });
});

app.get("/welcome", (req, res) => {
  res.render("welcome");
});

app.get("/game", (req, res) => {
  res.render("game");
});

//It'll genearte QR using UserID
app.post("/generate", async (req, res) => {
  console.log(req.body.qrText);
  const qrText = req.body.qrText;
  try {
    const qrCodeData = await QRCode.toDataURL(qrText);
    res.render("home", { qrCodeData });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
//Ftech User using uniqueCode
app.post("/get-user", async (req, res) => {
  const code = req.body.uniqueCode;
  console.log(req.body.uniqueCode);
  var user = await User.findOne({ uniqueCode: code });
  if (user) {
    console.log(user);
    await User.updateOne({ uniqueCode: code }, { $set: { isAttended: true } })
      .then(() => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({ error: "Invalid User" });
      });
  } else {
    res.status(500).json({ error: "Invalid User" });
  }
});
//Get users-list

io.on("connection", (socket) => {
  console.log("connected");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
// csvtojson()
//   .fromFile("qr-vijaywadafinall.csv")
//   .then((csvData) => {
//     User.insertMany(csvData).then(() => {
//       console.log("DONEEE");
//     });
//   });
