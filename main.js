document.addEventListener('DOMContentLoaded', function () {
    const resultContainer = document.getElementById('qr-result');
    const resultList = document.getElementById('result-list');
    let scannedCodes = new Set(); // Set to store unique scanned codes

    function onScanSuccess(decodedText, decodedResult) {
        // Check if the code has already been scanned
        if (scannedCodes.has(decodedText)) {
            console.log(`Code is already scanned: ${decodedText}`);
            return; // Do not proceed if the code has been scanned
        }

        // Add the new unique code to the set
        scannedCodes.add(decodedText);

        // Create a new list item for the new unique code
        const newItem = document.createElement('li');
        newItem.textContent = decodedText;

        // Append the new item to the result list
        resultList.appendChild(newItem);

        // Optionally, clear the scanner if you want to stop scanning after a successful scan
        // html5QrcodeScanner.clear();
    }

    function onScanError(errorMessage) {
        resultContainer.textContent = `Error scanning QR Code: ${errorMessage}`;
    }

    // This method will trigger user permissions
    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            var cameraId = devices[0].id;
            // Prefer the rear camera if available
            devices.forEach(device => {
                if (device.label && device.label.includes('back')) {
                    cameraId = device.id;
                }
            });

            const html5QrcodeScanner = new Html5Qrcode("reader", { fps: 10, qrbox: 250 });
            html5QrcodeScanner.start(cameraId, {}, onScanSuccess, onScanError)
                .catch(err => {
                    resultContainer.textContent = `Unable to start QR scanner: ${err}`;
                });
        }
    }).catch(err => {
        resultContainer.textContent = 'Error getting camera devices: ' + err;
    });
});
