import QrScanner from './qr-scanner.min.js';

QrScanner.WORKER_PATH = './qr-scanner-worker.min.js';

const video = document.getElementById('qr-video');
const resultContainer = document.getElementById('qr-result');
const scanner = new QrScanner(video, result => {
    console.log('decoded qr code:', result);
    resultContainer.textContent = `Scan result: ${result}`;
    // Here you can add additional code to handle the scan result, like looking up the student's name
});

scanner.start();
