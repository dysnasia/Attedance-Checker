document.addEventListener('DOMContentLoaded', function () {
    const resultContainer = document.getElementById('qr-result');
    const resultList = document.getElementById('result-list');
    let scannedCodes = new Set();

    function onScanSuccess(decodedText, decodedResult) {
        if (!scannedCodes.has(decodedText)) {
            scannedCodes.add(decodedText);
            const newItem = document.createElement('li');
            newItem.textContent = decodedText;
            resultList.appendChild(newItem);
        }
    }

    function onScanError(errorMessage) {
        resultContainer.textContent = `Error scanning QR Code: ${errorMessage}`;
    }

    // Start scanning with the first available camera
    const html5QrcodeScanner = new Html5Qrcode("reader", { fps: 10, qrbox: 250 });
    Html5Qrcode.getCameras().then(cameras => {
        if (cameras && cameras.length) {
            html5QrcodeScanner.start(cameras[0].id, {}, onScanSuccess, onScanError)
                .catch(err => {
                    resultContainer.textContent = `Unable to start QR scanner: ${err}`;
                });
        }
    }).catch(err => {
        resultContainer.textContent = 'Error getting camera devices: ' + err;
    });
});
