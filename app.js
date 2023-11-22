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
const util = require('util');

const fs = require('fs');
const nodeHtmlToImage = require('node-html-to-image');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/asset", express.static(path.join(__dirname, "asset")));
app.set("view engine", "ejs");
app.set("views", "views");

const mongo_URI =
  "mongodb+srv://yamuna:Dbnd0ki7s3DC0DQ3@cluster0.v6kew10.mongodb.net/qr-28-11st";
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
  email: {
    type: String,
    required: false,
  }

});

const qrCodeToFile = util.promisify(QRCode.toFile);
const User = mongoose.model('users', usertwoSchema);

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

//It'll genearte QR using UserID
app.use(bodyParser.urlencoded({ extended: true }));

// Replace with your Mailjet API keys
const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
  'f8c199da7a532fcb35fc83fce0e9ec55',
  '60d75ea08bc4ff13fa68f30b531d6942',
);




async function generateQRCode(text, filePath) {
  const sanitizedText = text.replace(/[^a-z0-9]/gi, '_');
  const qrImagePath = `${filePath}${sanitizedText}.png`
  try {
    await qrCodeToFile(qrImagePath, text)
    return qrImagePath;
  }
  catch (err) {
    throw err
  }
}


function generateRandomNumber(length) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


app.post("/generate", async (req, res) => {


  const outputDirectory = './images';
  const qrcodeDirectory = './qrcode';
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
  }

  if (!fs.existsSync(qrcodeDirectory)) {
    fs.mkdirSync(qrcodeDirectory);
  }

  const qrCodePath = `${__dirname}/qrcode/`;

  const randomNumber = generateRandomNumber(4);
  const qrText = `SYMPH${randomNumber}`;
  generateQRCode(qrText, qrCodePath).then(async (qrImagePath) => {
    console.log(qrImagePath, "qrImagePath");

    // convert backend image to data URI to attach to html
    const image = fs.readFileSync('./asset/qrdisplay.jpg');
    const base64Image = Buffer.from(image).toString('base64');
    const dataURI = 'data:image/jpeg;base64,' + base64Image;


    const qrCodeImage = fs.readFileSync(qrImagePath);
    const qrCodxebase64Image = Buffer.from(qrCodeImage).toString('base64');
    const qrCodedataURI = 'data:image/jpeg;base64,' + qrCodxebase64Image;

    console.log(qrCodeImage);
    console.log("qrCodedataUri", qrCodxebase64Image);
    console.log("qrCodedataUri", qrCodedataURI);

    const htmlContent = `
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <title>emailimage</title>
  <style>

  #name-container {
    position: absolute;
    top: 35%;
    left: 21%;
    max-width: 550px;
    white-space: normal;
  }

  
  #name {
    font-size: xx-large;
    color: white;
  }

    #qrimg {
      position: absolute;
      top: 43%;
      left: 320px;
      width: 160px;
    }

   

    #code {
      position: absolute;
      top: 54%;
      left: 22%;
      color: white;
      font-size: large;
    }
  </style>
</head>

<body>
  <div id="htmltoimage">
  <img src="${dataURI}" alt="no image" class="">
  <img src="${qrCodedataURI}" class="" id="qrimg">

  <div id="name-container" class="flex flex-wrap"><p id="name" class=""></p></div>
  
    <div class="flex flex-wrap"><p id="code" class="" ></p></div>
  </div>
  <!-- <script src=" ./app.js">
      </script> -->
</body>

</html>`


    try {
      await nodeHtmlToImage({
        output: `${outputDirectory}/${qrText}.png`,
        html: htmlContent,
      });
      console.log(`Image  for  with code ${qrText} was created successfully!`);
    } catch (error) {
      console.error(`Error generating image for `, error);
    }

    const email = req.body.email;
    const name = req.body.name;
    console.log(email);
    console.log(name);
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'invite@symphony2023events.com',
            Name: 'Symphony Event 2023',
          },
          To: [
            {
              Email: email,
              Name: name
            },
          ],
          Subject: "SYMPHONY EVENTS 2023",
          HTMLPart: htmlContent
        }
      ]
    });

    request
      .then((result) => {
        res.json({ message: 'Email sent successfully!' });
        fs.unlinkSync(qrImagePath);
        fs.unlinkSync(`${outputDirectory}/${qrText}.png`);
      })
      .catch((err) => {
        console.error(err);
        // Check if the headers were already sent
        if (!res.headersSent) {
          res.status(500).json({ message: 'Failed to send email' });
        }
      });

  }).catch(err => {
    console.log(err);
  })




});




//Get users-list
io.on("connection", (socket) => {
  console.log("connected");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
