document.addEventListener('DOMContentLoaded', function () {
    const flipCameraButton = document.getElementById('flip-camera');
    let html5QrcodeScanner;

    function startScanner() {
        html5QrcodeScanner = new Html5Qrcode("reader");
        Html5Qrcode.getCameras().then(cameras => {
            if (cameras && cameras.length) {
                html5QrcodeScanner.start(cameras[0].id, { fps: 10, qrbox: 250 }, 
                    decodedText => {
                        console.log(`Decoded text: ${decodedText}`);
                    },
                    errorMessage => {
                        console.log(`QR code scan error: ${errorMessage}`);
                    })
                    .catch(err => {
                        console.error(`Unable to start QR scanner: ${err}`);
                    });
            }
        }).catch(err => {
            console.error(`Error getting camera devices: ${err}`);
        });
    }

    function flipCamera() {
        html5QrcodeScanner.stop().then(() => {
            Html5Qrcode.getCameras().then(cameras => {
                if (cameras && cameras.length > 1) {
                    const currentCameraId = html5QrcodeScanner.getRunningCameraId();
                    const newCameraId = cameras.find(camera => camera.id !== currentCameraId).id;
                    html5QrcodeScanner.start(newCameraId, { fps: 10, qrbox: 250 });
                }
            });
        });
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        flipCameraButton.style.display = 'block';
        flipCameraButton.addEventListener('click', flipCamera);
    }

    startScanner();
});
