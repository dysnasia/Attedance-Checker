document.addEventListener('DOMContentLoaded', function () {
    const resultContainer = document.getElementById('qr-result');
    const resultList = document.getElementById('result-list'); // List to display results
  
    function onScanSuccess(decodedText, decodedResult) {
        // Create a new list item
        const newItem = document.createElement('li');
        newItem.textContent = decodedText; // Set the text of the list item to the QR code text
  
        // Append the new item to the result list
        resultList.appendChild(newItem);
  
        // Optionally, clear the scanner if you want to stop scanning after a successful scan
        html5QrcodeScanner.clear();
    }
  
    // This method will trigger user permissions
    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            var cameraId = devices[0].id;
            // Choose the rear camera if available
            devices.forEach(device => {
                if (device.label && device.label.includes('back')) {
                    cameraId = device.id;
                }
            });
  
            const html5QrcodeScanner = new Html5Qrcode("reader", { fps: 20, qrbox: 250 });
            html5QrcodeScanner.start(cameraId, {}, onScanSuccess)
                .catch(err => {
                    resultContainer.textContent = `Unable to start QR scanner: ${err}`;
                });
        }
    }).catch(err => {
        resultContainer.textContent = 'Error getting camera devices: ' + err;
    });
  });
  