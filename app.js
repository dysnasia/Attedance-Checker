const videoElement = document.getElementById('qr-video');
const resultContainer = document.getElementById('qr-result');

let scanner = new Instascan.Scanner({ video: videoElement });

scanner.addListener('scan', function (content) {
    console.log('QR Code content:', content);
    resultContainer.textContent = `Scan result: ${content}`;
    scanner.stop(); // Stop scanning after the first scan
});

Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);
    } else {
        console.error('No cameras found.');
        resultContainer.textContent = 'No cameras found.';
    }
}).catch(function (e) {
    console.error(e);
    resultContainer.textContent = e;
});
