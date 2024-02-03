const resultContainer = document.getElementById('qr-result');

function onScanSuccess(decodedText, decodedResult) {
    // Handle on success condition with the decoded text or result.
    console.log(`Code matched = ${decodedText}`, decodedResult);
    resultContainer.textContent = `Scan result: ${decodedText}`;
    // Optionally stop scanning.
    html5QrcodeScanner.clear();
}

function onScanError(errorMessage) {
    // Handle on error condition, with error message.
    resultContainer.textContent = 'Error scanning QR Code: ' + errorMessage;
}

// This method will trigger user permissions
Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
        var cameraId = devices[0].id;
        // Choose the rear camera if available
        devices.forEach(device => {
            if (device.label.includes('back')) {
                cameraId = device.id;
            }
        });
        
        const html5QrcodeScanner = new Html5Qrcode("reader");
        html5QrcodeScanner.start(
          cameraId, 
          {
              fps: 10,    // Optional frame per seconds for qr code scanning
              qrbox: 250  // Optional if you want bounded box UI
          },
          onScanSuccess,
          onScanError
        ).catch(err => {
            console.error(err);
            resultContainer.textContent = `Unable to start QR scanner: ${err}`;
        });
    }
}).catch(err => {
    console.error(err);
    resultContainer.textContent = 'Error getting camera devices: ' + err;
});
