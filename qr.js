const fs = require('fs');
const qrcode = require('qrcode');

// Function to generate and save QR codes with a specific format
async function generateQRCodeWithFormat(numCodes, outputFolder = 'qrcodes', format = 'SYMPH') {
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }
    for (let i = 1; i <= numCodes; i++) {
        const data = `${format}${String(i).padStart(4, '0')}`;
        const fileName = `${outputFolder}/${format}${String(i).padStart(4, '0')}.png`;
        // Generate QR code
        await qrcode.toFile(fileName, data, { errorCorrectionLevel: 'H' });
        console.log(`QR Code ${format}${String(i).padStart(4, '0')} generated and saved as ${fileName}`);
    }
}

