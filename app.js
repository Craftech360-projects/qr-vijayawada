// const express = require("express");
// const http = require("http");
// const ejs = require("ejs");
// const socketIo = require("socket.io");
// const QRCode = require("qrcode");
// const path = require("path");
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
// const port = 3001;
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const csvtojson = require("csvtojson");
// const util = require("util");
// const htmlContent = `
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <style>
//     body {
//       margin: 0;
//       padding: 0;
//       height: 100vh;
//       overflow: hidden;
//     }

//     #htmltoimage {
//       position: relative;
//       text-align: center;
//       height: 100%;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }

//     .background-image {
//       max-width: 100%;
//       max-height: 100%;
//       object-fit: contain;
//     }

//     .overlay-image {
//       position: absolute;
//       top: 50%;
//       left: 50%;
//       transform: translate(-50%, -50%);
//       max-width: 15%; /* Adjust the size as needed */
//       max-height: 15%; /* Adjust the size as needed */
//     }
//   </style>
//   <title>emailimage</title>
// </head>
// <body>
//   <div id="htmltoimage">
//     <img class="background-image" src="cid:id1" alt="background image">
//     <img class="overlay-image" src="cid:id2" alt="overlay image">
//   </div>
// </body>
// </html>`;

// const fs = require("fs");
// const nodeHtmlToImage = require("node-html-to-image");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use("/asset", express.static(path.join(__dirname, "asset")));
// app.set("view engine", "ejs");
// app.set("views", "views");

// const mongo_URI =
//   "mongodb+srv://yamuna:Dbnd0ki7s3DC0DQ3@cluster0.v6kew10.mongodb.net/qr-28-11st";

// const usertwoSchema = new mongoose.Schema({
//   code: {
//     type: String,
//     required: true,
//   },
//   isAttended: {
//     type: Boolean,
//     default: false,
//   },
//   email: {
//     type: String,
//     required: false,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
// });

// const qrCodeToFile = util.promisify(QRCode.toFile);
// const User = mongoose.model("users", usertwoSchema);

// mongoose
//   .connect(mongo_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then((result) => {
//     // Connected to the MongoDB database
//     console.log("Connected to the MongoDB database");
//   })
//   .catch((error) => {
//     console.error("Error connecting to the MongoDB database:", error);
//   });

// app.get("/", (req, res) => {
//   res.render("home", { qrCodeData: null });
// });

// app.get("/welcome", (req, res) => {
//   res.render("welcome");
// });

// const generatedNumbersSchema = new mongoose.Schema({
//   numbers: [String], // Store numbers as strings to preserve leading zeros
// });

// //It'll genearte QR using UserID
// app.use(bodyParser.urlencoded({ extended: true }));
// // Replace with your Mailjet API keys
// const Mailjet = require("node-mailjet");
// const mailjet = Mailjet.apiConnect(
//   "f8c199da7a532fcb35fc83fce0e9ec55",
//   "60d75ea08bc4ff13fa68f30b531d6942"
// );
// const GeneratedNumbers = mongoose.model(
//   "GeneratedNumbers",
//   generatedNumbersSchema
// );

// async function generateAndStoreRandomNumber() {
//   // Load previously generated numbers from the Mongoose model
//   const result = await GeneratedNumbers.findOne({});
//   const generatedNumbers = result ? result.numbers : [];

//   // Generate a random number within the specified range
//   let randomNumber = Math.floor(Math.random() * 2000);

//   // Check if the number has already been generated
//   while (generatedNumbers.includes(randomNumber.toString())) {
//     randomNumber = Math.floor(Math.random() * 2000);
//   }

//   // Convert the number to a 4-digit string with leading zeros
//   const formattedNumber = randomNumber.toString().padStart(4, "0");

//   // Add the new number to the list of generated numbers
//   generatedNumbers.push(formattedNumber);

//   // Update the Mongoose model with the new list of generated numbers
//   await GeneratedNumbers.updateOne(
//     {},
//     { $set: { numbers: generatedNumbers } },
//     { upsert: true }
//   );

//   return formattedNumber;
// }

// async function sendEmail(email, name, randomNumber) {
//   const dynamicImageUrl = `https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/mainImages/${randomNumber}.png`;

//   const htmlString = `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title>GOURMETLUXE</title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
//   body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
//   table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
//   img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
//   p { display:block;margin:13px 0; }</style><!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/>
//   <o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]--><!--[if lte mso 11]><style type="text/css">
//   .mj-outlook-group-fix { width:100% !important; }</style><![endif]--><style type="text/css">@media only screen and (min-width:480px) {
//     .mj-column-per-100 { width:100% !important; max-width: 100%; }
//   }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:479px) {
//   table.mj-full-width-mobile { width: 100% !important; }
//   td.mj-full-width-mobile { width: auto !important; }
//   }</style><style type="text/css"></style></head><body style="word-spacing:normal;">
//   <div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:500px;">
//   <img alt="Full Screen Image" src="https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/mainImages/SYMPH${randomNumber}.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="500" height="auto"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`;

//   const Mailjet = require("node-mailjet");
//   const mailjet = Mailjet.apiConnect(
//     "f8c199da7a532fcb35fc83fce0e9ec55",
//     "60d75ea08bc4ff13fa68f30b531d6942"
//   );

//   try {
//     const request = await mailjet.post("send", { version: "v3.1" }).request({
//       Messages: [
//         {
//           From: {
//             Email: "invite@symphony2023events.com",
//             Name: "SYMPHONY EVENTS",
//           },
//           To: [
//             {
//               Email: email,
//               Name: name,
//             },
//           ],
//           Subject: "QR Code for SYMPHONY events",
//           HTMLPart: htmlString,
//         },
//       ],
//     });

//     console.log(request.body);
//   } catch (error) {
//     console.error(error);
//   }
// }

// app.post("/generate", async (req, res) => {
//   let email= req.body.email;
//   const existingUser = await User.findOne({ email: email});

//   if (existingUser) {
//     const existingRandomNumber = existingUser.code.slice(5); // Extract the random number from the existing code
//     console.log(
//       `User already exists. Existing random number: ${existingRandomNumber}`
//     );
//     await sendEmail(req.body.email, req.body.name, existingRandomNumber);
//     const dynamicImageUrl = `https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/mainImages/SYMPH${existingRandomNumber}.png`;
//     io.to(req.body.socketId).emit("emitUrl", dynamicImageUrl);
//     // return res
//     //   .status(200)
//     //   .json({ message: "User already exists. Existing QR code sent." });
//   } else {
//     let email = req.body.email;
//     let nameValue = req.body.name;
//     // generate random qr code
//     const randomNumber = await generateAndStoreRandomNumber();

//     const newUser = new User({
//       code: `SYMPH${randomNumber}`,
//       email: email,
//       name: nameValue,
//     });

//     newUser
//       .save()
//       .then(() => {})
//       .catch((error) => {
//         console.error("Error saving to MongoDB:", error);
//         res.status(500).json({ message: "Failed to register user" });
//       });

//     const dynamicImageUrl = `https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/mainImages/SYMPH${randomNumber}.png`;

//     var htmlString = `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title>GOURMETLUXE</title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
//         body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
//         table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
//         img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
//         p { display:block;margin:13px 0; }</style><!--[if mso]>
//       <noscript>
//       <xml>
//       <o:OfficeDocumentSettings>
//         <o:AllowPNG/>
//         <o:PixelsPerInch>96</o:PixelsPerInch>
//       </o:OfficeDocumentSettings>
//       </xml>
//       </noscript>
//       <![endif]--><!--[if lte mso 11]>
//       <style type="text/css">
//         .mj-outlook-group-fix { width:100% !important; }
//       </style>
//       <![endif]--><style type="text/css">@media only screen and (min-width:480px) {
//           .mj-column-per-100 { width:100% !important; max-width: 100%; }
//         }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:479px) {
//         table.mj-full-width-mobile { width: 100% !important; }
//         td.mj-full-width-mobile { width: auto !important; }
//       }</style><style type="text/css"></style></head><body style="word-spacing:normal;">
//       <div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:500px;">
//       <img alt="Full Screen Image" src="https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/mainImages/SYMPH${randomNumber}.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="500" height="auto"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`;

//     console.log(htmlString,"jhsdbvjh");

//     const Mailjet = require("node-mailjet");
//     const mailjet = Mailjet.apiConnect(
//       "f8c199da7a532fcb35fc83fce0e9ec55",
//       "60d75ea08bc4ff13fa68f30b531d6942"
//     );

//     const request = mailjet.post("send", { version: "v3.1" }).request({
//       Messages: [
//         {
//           From: {
//             Email: "invite@symphony2023events.com",
//             Name: "SYMPHONY EVENTS",
//           },
//           To: [
//             {
//               Email: email,
//               Name: nameValue,
//             },
//           ],
//           Subject: "QR Code for Registerater - Symphony 2023",
//           HTMLPart: htmlString,
//         },
//       ],
//     });

//     request
//       .then((x) => {
//         console.log(x.body);
//         io.to(req.body.socketId).emit("emitUrl", dynamicImageUrl);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }
// });
// //Get users-list
// io.on("connection", (socket) => {
//   console.log("connected");

//   socket.on("joinRoom", () => {
//     socket.join(socket.id);
//   });
// });

// server.listen(port, () => {
//   console.log(`Server is running on ${port}`);
// });

const express = require("express");
const http = require("http");
const ejs = require("ejs");
const socketIo = require("socket.io");
const QRCode = require("qrcode");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3001;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const csvtojson = require("csvtojson");
const util = require("util");
const path = require("path");

const htmlContent = `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      height: 100vh;
      overflow: hidden;
    }

    #htmltoimage {
      position: relative;
      text-align: center;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .background-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .overlay-image {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      max-width: 15%; /* Adjust the size as needed */
      max-height: 15%; /* Adjust the size as needed */
    }
  </style>
  <title>emailimage</title>
</head>
<body>
  <div id="htmltoimage">
    <img class="background-image" src="cid:id1" alt="background image">
    <img class="overlay-image" src="cid:id2" alt="overlay image">
  </div>
</body>
</html>`;

const fs = require("fs");
const nodeHtmlToImage = require("node-html-to-image");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/asset", express.static(path.join(__dirname, "asset")));
app.set("view engine", "ejs");
app.set("views", "views");

const mongo_URI =
  "mongodb+srv://yamuna:Dbnd0ki7s3DC0DQ3@cluster0.v6kew10.mongodb.net/qr-28-11st";

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
  },
  name: {
    type: String,
    required: true,
  },
});

const qrCodeToFile = util.promisify(QRCode.toFile);
const User = mongoose.model("users", usertwoSchema);

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
  res.render("welcome", { qrCodeData: null });
  // res.sendFile(path.join(__dirname, "views/welcome.html"));
});

const generatedNumbersSchema = new mongoose.Schema({
  numbers: [String], // Store numbers as strings to preserve leading zeros
});

//It'll genearte QR using UserID
app.use(bodyParser.urlencoded({ extended: true }));
// Replace with your Mailjet API keys
const Mailjet = require("node-mailjet");
const mailjet = Mailjet.apiConnect(
  "f8c199da7a532fcb35fc83fce0e9ec55",
  "60d75ea08bc4ff13fa68f30b531d6942"
);
const GeneratedNumbers = mongoose.model(
  "GeneratedNumbers",
  generatedNumbersSchema
);

async function generateAndStoreRandomNumber() {
  // Load previously generated numbers from the Mongoose model
  const result = await GeneratedNumbers.findOne({});
  const generatedNumbers = result ? result.numbers : [];

  // Generate a random number within the specified range
  let randomNumber = Math.floor(Math.random() * 3400);

  // Check if the number has already been generated
  while (generatedNumbers.includes(randomNumber.toString())) {
    randomNumber = Math.floor(Math.random() * 3400);
  }

  // Convert the number to a 4-digit string with leading zeros
  const formattedNumber = randomNumber.toString().padStart(4, "0");

  // Add the new number to the list of generated numbers
  generatedNumbers.push(formattedNumber);

  // Update the Mongoose model with the new list of generated numbers
  await GeneratedNumbers.updateOne(
    {},
    { $set: { numbers: generatedNumbers } },
    { upsert: true }
  );

  return formattedNumber;
}

app.post("/get-user", async (req, res) => {
  const uniqueCode = req.body.code;
  console.log(req.body.uniqueCode);
  var user = await User.findOne({ code: uniqueCode });
  if (user) {
    console.log(user);
    await User.updateOne({ code: uniqueCode }, { $set: { isAttended: true } })
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

async function sendEmail(email, name, randomNumber) {
  const dynamicImageUrl = `https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/mainImages/${randomNumber}.png`;

  const htmlString = `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title>GOURMETLUXE</title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
  body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
  table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
  img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
  p { display:block;margin:13px 0; }</style><!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/>
  <o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]--><!--[if lte mso 11]><style type="text/css">
  .mj-outlook-group-fix { width:100% !important; }</style><![endif]--><style type="text/css">@media only screen and (min-width:480px) {
    .mj-column-per-100 { width:100% !important; max-width: 100%; }
  }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:479px) {
  table.mj-full-width-mobile { width: 100% !important; }
  td.mj-full-width-mobile { width: auto !important; }
  }</style><style type="text/css"></style></head><body style="word-spacing:normal;">
  <div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:500px;">
  <img alt="Full Screen Image" src="https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/mainImages/SYMPH${randomNumber}.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="500" height="auto"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`;

  const Mailjet = require("node-mailjet");
  const mailjet = Mailjet.apiConnect(
    "f8c199da7a532fcb35fc83fce0e9ec55",
    "60d75ea08bc4ff13fa68f30b531d6942"
  );

  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "invite@symphony2023events.com",
            Name: "SYMPHONY EVENTS",
          },
          To: [
            {
              Email: email,
              Name: name,
            },
          ],
          Subject: "QR Code for SYMPHONY events",
          HTMLPart: htmlString,
        },
      ],
    });

    console.log(request.body);
  } catch (error) {
    console.error(error);
  }
}

app.post("/generate", async (req, res) => {
  let email = req.body.email;
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    const existingRandomNumber = existingUser.code.slice(5); // Extract the random number from the existing code
    console.log(
      `User already exists. Existing random number: ${existingRandomNumber}`
    );
    await sendEmail(req.body.email, req.body.name, existingRandomNumber);
    const dynamicImageUrl = `https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/mainImages/SYMPH${existingRandomNumber}.png`;
    io.to(req.body.socketId).emit("emitUrl", dynamicImageUrl);

    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <title>QR Code Generator</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-image: url("../asset/qr.jpg"); /* Replace with your image path */
            background-size: cover;
            background-position: center;
            width: 100vw;
            height: 100vh;
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
          }
    
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
    
          .spinner {
            --spinner-color: #000;
            aspect-ratio: 1/1;
            border-radius: 50%;
            animation-name: spin;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }
    
          .spinner--dotted {
            width: 5rem;
            border: 0.5rem dotted var(--spinner-color);
            display: block;
            animation-duration: 5s;
          }
    
          #dynamicLink {
            text-align: center;
            display: inline-block;
            cursor: pointer;
            margin-top: -50px;
            padding: 10px 20px;
            border-radius: 10px;
            background-color: white;
            color: black;
            font-weight: bold;
            text-decoration: none;
            border: 2px solid black;
          }
    
          @media (max-width: 600px) {
            #dynamicLink {
              padding: 8px 20px;
              font-size: medium;
            }
          }
        </style>
      </head>
      <body>
        <div
          id="container"
          class="absolute top-[50%] hidden"
          role="status"
          id="loading"
        >
          <span class="spinner spinner--dotted"></span>
        </div>
    
        <a id="dynamicLink" href="${dynamicImageUrl}" download="downloaded_file.pdf"
          >Download Ticket</a
        >
      </body>
    </html>
    
    `;

    res.send(htmlResponse);
    // return res
    //   .status(200)
    //   .json({ message: "User already exists. Existing QR code sent." });
  } else {
    let email = req.body.email;
    let nameValue = req.body.name;
    // generate random qr code
    const randomNumber = await generateAndStoreRandomNumber();

    const newUser = new User({
      code: `SYMPH${randomNumber}`,
      email: email,
      name: nameValue,
    });

    newUser
      .save()
      .then(() => {})
      .catch((error) => {
        console.error("Error saving to MongoDB:", error);
        res.status(500).json({ message: "Failed to register user" });
      });

    const dynamicImageUrl = `https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/mainImages/SYMPH${randomNumber}.png`;

    var htmlString = `<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title>GOURMETLUXE</title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
        body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
        table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
        img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
        p { display:block;margin:13px 0; }</style><!--[if mso]>
      <noscript>
      <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
      </xml>
      </noscript>
      <![endif]--><!--[if lte mso 11]>
      <style type="text/css">
        .mj-outlook-group-fix { width:100% !important; }
      </style>
      <![endif]--><style type="text/css">@media only screen and (min-width:480px) {
          .mj-column-per-100 { width:100% !important; max-width: 100%; }
        }</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css">@media only screen and (max-width:479px) {
        table.mj-full-width-mobile { width: 100% !important; }
        td.mj-full-width-mobile { width: auto !important; }
      }</style><style type="text/css"></style></head><body style="word-spacing:normal;">
      <div><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;"><tbody><tr><td style="width:500px;">
      <img alt="Full Screen Image" src="https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/mainImages/SYMPH${randomNumber}.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="500" height="auto"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>`;

    const Mailjet = require("node-mailjet");
    const mailjet = Mailjet.apiConnect(
      "f8c199da7a532fcb35fc83fce0e9ec55",
      "60d75ea08bc4ff13fa68f30b531d6942"
    );

    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "invite@symphony2023events.com",
            Name: "SYMPHONY EVENTS",
          },
          To: [
            {
              Email: email,
              Name: nameValue,
            },
          ],
          Subject: "QR Code for Registerater - Symphony 2023",
          HTMLPart: htmlString,
        },
      ],
    });

    request
      .then((x) => {
        console.log(x.body);
        io.to(req.body.socketId).emit("emitUrl", dynamicImageUrl);
        const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://cdn.tailwindcss.com"></script>
            <title>QR Code Generator</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                overflow: hidden;
                background-image: url("../asset/qr.jpg"); /* Replace with your image path */
                background-size: cover;
                background-position: center;
                width: 100vw;
                height: 100vh;
                padding: 20px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
              }
        
              @keyframes spin {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
        
              .spinner {
                --spinner-color: #000;
                aspect-ratio: 1/1;
                border-radius: 50%;
                animation-name: spin;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
              }
        
              .spinner--dotted {
                width: 5rem;
                border: 0.5rem dotted var(--spinner-color);
                display: block;
                animation-duration: 5s;
              }
        
              #dynamicLink {
                text-align: center;
                display: inline-block;
                cursor: pointer;
                margin-top: -50px;
                padding: 10px 20px;
                border-radius: 10px;
                background-color: white;
                color: black;
                font-weight: bold;
                text-decoration: none;
                border: 2px solid black;
              }
        
              @media (max-width: 600px) {
                #dynamicLink {
                  padding: 8px 20px;
                  font-size: medium;
                }
              }
            </style>
          </head>
          <body>
            <div
              id="container"
              class="absolute top-[50%] hidden"
              role="status"
              id="loading"
            >
              <span class="spinner spinner--dotted"></span>
            </div>
        
            <a id="dynamicLink" href="${dynamicImageUrl}" download="downloaded_file.pdf"
              >Download Ticket</a
            >
          </body>
          <script>
            document.getElementById("dynamicLink").addEventListener("click", () => {
              fetch(${dynamicImageUrl})
                .then((response) => response.blob())
                .then((blob) => {
                  const blobUrl = window.URL.createObjectURL(blob);
                  link.style.display = "block";
                  link.href = blobUrl;
                  link.download = "downloaded_file.png";
                  link.addEventListener("click", () => {
                    link.href = imageLink;
                    window.open(link, "_blank");
                  });
                });
            });
          </script>
        </html>
        `;

        res.send(htmlResponse);
      })
      .catch((err) => {
        console.log(err);
        io.to(req.body.socketId).emit("emitUrl", dynamicImageUrl);
        const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://cdn.tailwindcss.com"></script>
            <title>QR Code Generator</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                overflow: hidden;
                background-image: url("../asset/qr.jpg"); /* Replace with your image path */
                background-size: cover;
                background-position: center;
                width: 100vw;
                height: 100vh;
                padding: 20px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
              }
        
              @keyframes spin {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
        
              .spinner {
                --spinner-color: #000;
                aspect-ratio: 1/1;
                border-radius: 50%;
                animation-name: spin;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
              }
        
              .spinner--dotted {
                width: 5rem;
                border: 0.5rem dotted var(--spinner-color);
                display: block;
                animation-duration: 5s;
              }
        
              #dynamicLink {
                text-align: center;
                display: inline-block;
                cursor: pointer;
                margin-top: -50px;
                padding: 10px 20px;
                border-radius: 10px;
                background-color: white;
                color: black;
                font-weight: bold;
                text-decoration: none;
                border: 2px solid black;
              }
        
              @media (max-width: 600px) {
                #dynamicLink {
                  padding: 8px 20px;
                  font-size: medium;
                }
              }
            </style>
          </head>
          <body>
            <div
              id="container"
              class="absolute top-[50%] hidden"
              role="status"
              id="loading"
            >
              <span class="spinner spinner--dotted"></span>
            </div>
        
            <a id="dynamicLink" href="${dynamicImageUrl}" download="downloaded_file.pdf"
              >Download Ticket</a
            >
          </body>
          <script>
            document.getElementById("dynamicLink").addEventListener("click", () => {
              fetch(${dynamicImageUrl})
                .then((response) => response.blob())
                .then((blob) => {
                  const blobUrl = window.URL.createObjectURL(blob);
                  link.style.display = "block";
                  link.href = blobUrl;
                  link.download = "downloaded_file.png";
                  link.addEventListener("click", () => {
                    link.href = imageLink;
                    window.open(link, "_blank");
                  });
                });
            });
          </script>
        </html> 
        `;

        res.send(htmlResponse);
      });
  }
});
//Get users-list
io.on("connection", (socket) => {
  console.log("connected");

  socket.on("joinRoom", () => {
    socket.join(socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
