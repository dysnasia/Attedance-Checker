// This assumes that QrScanner is a global class available from including qr-scanner.min.js in your HTML

const video = document.getElementById('qr-video');
const resultContainer = document.getElementById('qr-result');

// Check if QrScanner is defined
if (typeof QrScanner !== 'undefined') {
    // Set the path to the worker script
    QrScanner.WORKER_PATH = 'qr-scanner-worker.min.js';

    // Create a new QrScanner instance
    const scanner = new QrScanner(video, result => {
        console.log('decoded qr code:', result);
        resultContainer.textContent = `Scan result: ${result}`;
        // Here you can handle the scan result if needed
    });

    // Start the scanner
    scanner.start().catch(e => {
        console.error(e);
        resultContainer.textContent = 'Error starting scanner: ' + e;
    });
} else {
    resultContainer.textContent = 'QrScanner library is not loaded!';
}
