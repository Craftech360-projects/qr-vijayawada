const express = require("express");
const http = require("http");
const ejs = require("ejs");
const socketIo = require("socket.io");
const QRCode = require("qrcode");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3001;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const csvtojson = require("csvtojson");
// const twilio = require("twilio");
// const dotenv = require("dotenv");
// dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/asset", express.static(path.join(__dirname, "asset")));
app.set("view engine", "ejs");
app.set("views", "views");

const mongo_URI =
  "mongodb+srv://yamuna:Dbnd0ki7s3DC0DQ3@cluster0.v6kew10.mongodb.net/qr-31st";

const userSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  isAttended: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);


// Main Colletion for QR Scanning
const usertwoSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  isAttended: {
    type: Boolean,
    default: false,
  },
});
const Usertwo = mongoose.model('Usertwo', usertwoSchema);

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

app.get("/getCount", (req, res) => {
  res.render("getCount");
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

app.post("/get-user-count", async (req, res) => {
  User.find({ isAttended: true });
  User.countDocuments({ isAttended: true })
    .then((count) => {
      console.log("Count of isAttended: ", count);
      res.status(201).json({ count: count });
    })
    .catch((error) => {
      console.error("Error: ", error);
      res.status(500).json({ error: "Invalid User" });
    });
});
//Ftech User using uniqueCode
app.post("/get-user-search", async (req, res) => {
  const code = req.body.uniqueCode;
  console.log(req.body.uniqueCode, "code");

  // const user = await User.findOne(  {code: { $regex: new RegExp(code, 'i') }})  ;
  const user = await User.findOne({
    $or: [
      { phone: { $regex: new RegExp(code, "i") } },
      { email: { $regex: new RegExp(code, "i") } },
    ],
  });
  // console.log(user);
  if (user) {
    if (user.isAttended == false) {
      console.log(user);
      await User.findOneAndUpdate(
        { code: user.code },
        { $set: { isAttended: true } }
      )
        .then(() => {
          res.status(201).json(user);
        })
        .catch(() => {
          res.status(500).json({ error: "Invalid User" });
        });
    } else {
      res.status(400).json({ error: "QR Code has already been used" });
    }
  } else {
    res.status(500).json({ error: "Invalid User" });
  }
});
//Ftech User using uniqueCode
app.post("/get-user-scan", async (req, res) => {
  const code = req.body.uniqueCode;
  console.log(req.body.uniqueCode, "code");
  // const user = await User.findOne(  {code: { $regex: new RegExp(code, 'i') }})  ;
  const user = await Usertwo.findOne({
    $or: [
      { code: { $regex: new RegExp(code, "i") } },
    ],
  });
  // console.log(user);
  if (user) {
    if (user.isAttended == false) {
      console.log(user);
      await Usertwo.findOneAndUpdate(
        { code: user.code },
        { $set: { isAttended: true } }
      )
        .then(() => {
          res.status(201).json(user);
        })
        .catch(() => {
          res.status(500).json({ error: "Invalid User" });
        });
    } else {
      res.status(400).json({ error: "QR Code has already been used" });
    }
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
//   .fromFile("mumbai-qr.csv")
//   .then((csvData) => {
//     Usertwo.insertMany(csvData).then(() => {
//       console.log("DONEEE");
//     });
//   });
// function sendSMS() {
//   const client = new twilio(
//     process.env.TWILIO_SID,
//     process.env.TWILIO_AUTH_TOKEN
//   );

//   const fromNumber = "+17409001322"; // Your verified Twilio number
//   const toNumbers = [
//     "+918197142794",
//     "+918296009381",

//     // Add more recipient numbers as needed
//   ];

//   const messagesPromises = toNumbers.map((to) => {
//     return client.messages.create({
//       body: "Your message goes here",
//       from: fromNumber,
//       to: to,
//     });
//   });

//   return Promise.all(messagesPromises)
//     .then((messages) => {
//       console.log("Messages sent:", messages);
//     })
//     .catch((err) => {
//       console.error("Error sending messages:", err);
//     });
// }

// sendSMS();
