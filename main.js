document.addEventListener('DOMContentLoaded', function () {
    const resultContainer = document.getElementById('qr-result');
    const resultList = document.getElementById('result-list');
    const flipCameraButton = document.getElementById('flip-camera');
    let scannedCodes = new Set();
    let html5QrcodeScanner;
    
    // Function to detect mobile devices
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Initialize QR Scanner
    function startScanner(cameraId) {
        html5QrcodeScanner = new Html5Qrcode("reader", { fps: 10, qrbox: 250 });
        html5QrcodeScanner.start(cameraId, {}, onScanSuccess, onScanError)
            .catch(err => {
                resultContainer.textContent = `Unable to start QR scanner: ${err}`;
            });
    }

    // Toggle camera
    function flipCamera() {
        if (html5QrcodeScanner) {
            html5QrcodeScanner.stop().then(() => {
                // Get the list of available cameras
                Html5Qrcode.getCameras().then(cameras => {
                    if (cameras && cameras.length > 1) {
                        // Use the camera opposite to the current one
                        const newCameraId = cameras[1 - cameras.findIndex(camera => camera.id === html5QrcodeScanner.getRunningCameraId())].id;
                        startScanner(newCameraId);
                    }
                });
            }).catch(err => {
                console.error('Error stopping the QR scanner', err);
            });
        }
    }

    // On successful scan
    function onScanSuccess(decodedText, decodedResult) {
        if (!scannedCodes.has(decodedText)) {
            scannedCodes.add(decodedText);
            const newItem = document.createElement('li');
            newItem.textContent = decodedText;
            resultList.appendChild(newItem);
        }
    }

    // On scan error
    function onScanError(errorMessage) {
        resultContainer.textContent = `Error scanning QR Code: ${errorMessage}`;
    }

    // Start scanning with the first available camera
    Html5Qrcode.getCameras().then(cameras => {
        if (cameras && cameras.length) {
            startScanner(cameras[0].id);
        }
    }).catch(err => {
        console.error('Error getting camera devices', err);
    });

    // Show flip camera button for mobile devices
    if (isMobileDevice()) {
        flipCameraButton.style.display = 'block';
        flipCameraButton.addEventListener('click', flipCamera);
    }
});
