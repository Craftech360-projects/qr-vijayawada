const fs = require('fs');
const nodeHtmlToImage = require('node-html-to-image');
const qrcode = require('qrcode');

const image = fs.readFileSync('./asset/qrdisplay.jpg');
const base64Image = Buffer.from(image).toString('base64');
const dataURI = 'data:image/jpeg;base64,' + base64Image;

async function generateQRCodeWithFormat(numCodes, outputFolder = 'qrcodes', format = 'SYMPH') {

    for (let i = 1; i <= numCodes; i++) {
       const data = `${format}${String(i).padStart(4, '0')}`;
       
       let newHtml= htmlContent.replace("{{qrCodeImage}}",`${imageSrc}/${data}.png`);  
       
        await nodeHtmlToImage({
            output: `./mainImages/${data}.png`,
            html: newHtml,
        });
    }
}



const imageSrc= "https://raw.githubusercontent.com/Craftech360-projects/qr-vijayawada/new-qrCode/qrcodes"

const htmlContent1=`
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

    .overlay-image {
      position: absolute;
      top: 150%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30%; /* Adjust the size as needed */
      height: 40%; /* Adjust the size as needed */
    }

  </style>
</head>

<body>
  <div id="htmltoimage">
  <img class="background-image" src="${dataURI}" alt="background image">
  <img class="overlay-image" src="{{qrCodeImage}}" alt="overlay image">

  <div id="name-container" class="flex flex-wrap"><p id="name" class=""></p></div>
  
    <div class="flex flex-wrap"><p id="code" class="" ></p></div>
  </div>
  <!-- <script src=" ./app.js">
      </script> -->
</body>

</html>`


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
    <img class="background-image" src="${dataURI}" alt="background image">
    <img class="overlay-image" src="{{qrCodeImage}}" alt="overlay image">
  </div>
</body>
</html>`





generateQRCodeWithFormat(2000, 'qrcodes', 'SYMPH');
