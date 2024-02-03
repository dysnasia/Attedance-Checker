document.addEventListener('DOMContentLoaded', function () {
    const qrResult = document.getElementById('qr-result');

    function onScanSuccess(decodedText, decodedResult) {
        qrResult.textContent = `Scan result: ${decodedText}`;
    }

    const html5QrCode = new Html5Qrcode("reader");
    Html5Qrcode.getCameras().then(cameras => {
        if (cameras.length > 0) {
            html5QrCode.start(cameras[0].id, {
                fps: 10,
                qrbox: { width: 250, height: 250 }
            }, onScanSuccess);
        } else {
            console.error("No cameras found.");
        }
    }).catch(err => {
        console.error("Error getting cameras", err);
    });
});
