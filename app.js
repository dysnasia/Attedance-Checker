// This assumes that QrScanner is a global class available from including qr-scanner.min.js in your HTML

const video = document.getElementById('qr-video');
const resultContainer = document.getElementById('qr-result');

function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    resultContainer.textContent = `Scan result: ${decodedText}`;
    // Stop the scanner once you got the result to prevent multiple readings
    scanner.stop();
}

function onScanError(errorMessage) {
    // handle scan error
    console.error(errorMessage);
    resultContainer.textContent = 'Error scanning QR Code: ' + errorMessage;
}

// Check if QrScanner is defined
if (typeof QrScanner !== 'undefined') {
    // Set the path to the worker script
    QrScanner.WORKER_PATH = 'qr-scanner-worker.min.js';

    const scanner = new QrScanner(video, onScanSuccess, onScanError);

    scanner.start().catch(e => {
        console.error(e);
        resultContainer.textContent = 'Error starting scanner: ' + e;
    });
} else {
    resultContainer.textContent = 'QrScanner library is not loaded!';
}
