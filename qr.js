const fs = require('fs');
const qrcode = require('qrcode');

// Function to generate and save QR codes with a specific format
async function generateQRCodeWithFormat(numCodes, outputFolder = 'qrcodes', format = 'SYMPH', startFrom = 2001) { // Added startFrom parameter with a default value of 2001
  if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
  }
  for (let i = startFrom; i < startFrom + numCodes; i++) { // Adjusted loop to start from startFrom
      const data = `${format}${String(i).padStart(4, '0')}`;
      const fileName = `${outputFolder}/${format}${String(i).padStart(4, '0')}.png`;
      // Generate QR code
      await qrcode.toFile(fileName, data, { errorCorrectionLevel: 'H' });
      console.log(`QR Code ${format}${String(i).padStart(4, '0')} generated and saved as ${fileName}`);
  }
}

// Example usage


const image = fs.readFileSync('./asset/qrdisplay.jpg');
const base64Image = Buffer.from(image).toString('base64');
const dataURI = 'data:image/jpeg;base64,' + base64Image;


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
    <img class="overlay-image" src="" alt="overlay image">
  </div>
</body>
</html>`





// Generate 2000 QR codes with the specified format and save in the "qrcodes" folder
generateQRCodeWithFormat(2000, 'qrcodes', 'SYMPH', 2001); // This will generate QR codes starting from 2001 up to 4000
