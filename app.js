const resultContainer = document.getElementById('qr-result');
function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    resultContainer.textContent = `Scan result: ${decodedText}`;
    // Stop scanning after the first scan successfully completes
    html5QrcodeScanner.clear();
}

function onScanError(errorMessage) {
    // handle scan error
    console.error(errorMessage);
    resultContainer.textContent = 'Error scanning QR Code: ' + errorMessage;
}

// This method will trigger user permissions
Html5Qrcode.getCameras().then(devices => {
    /**
     * devices would be an array of objects of type:
     * { id: "id", label: "label" }
     */
    if (devices && devices.length) {
        var cameraId = devices[0].id;
        // .. use this to start scanning.
        const html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-video", { fps: 10, qrbox: 250 }, /* verbose= */ false);
        html5QrcodeScanner.render(onScanSuccess, onScanError);
    }
}).catch(err => {
    console.error(err);
    resultContainer.textContent = 'Error getting camera devices: ' + err;
});
