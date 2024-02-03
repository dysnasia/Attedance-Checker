document.addEventListener('DOMContentLoaded', function () {
    const resultContainer = document.getElementById('qr-result');

    function onScanSuccess(decodedText, decodedResult) {
        // Display the scanned text
        resultContainer.textContent = `Scan result: ${decodedText}`;
    }

    function onScanError(errorMessage) {
        // Display errors
        resultContainer.textContent = `Error scanning QR Code: ${errorMessage}`;
    }

    const html5QrcodeScanner = new Html5Qrcode("reader", { fps: 10, qrbox: 250 });
    Html5Qrcode.getCameras().then(cameras => {
        if (cameras && cameras.length) {
            // Start scanner with the first available camera
            html5QrcodeScanner.start(cameras[0].id, {}, onScanSuccess, onScanError)
                .catch(err => {
                    resultContainer.textContent = `Unable to start QR scanner: ${err}`;
                });
        }
    }).catch(err => {
        resultContainer.textContent = 'Error getting camera devices: ' + err;
    });
});
