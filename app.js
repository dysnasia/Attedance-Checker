let scannedCodes = []; // Array to hold scanned QR codes

function getFormattedTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'});
}

function getDownloadFileName() {
    const now = new Date();
    return `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}_Attendance`.replace(/\//g, '-');
}

function startScanner() {
    const html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 30};
    html5QrCode.start({ facingMode: "environment" }, config, (qrCodeMessage) => {
        const currentTime = getFormattedTime();
        if (!scannedCodes.some(item => item.code === qrCodeMessage)) {
            scannedCodes.push({ code: qrCodeMessage, time: currentTime }); // Add unique scans to the array
            displayScans(); // Update the display of scans
        }
    }).catch((err) => {
        console.error(`Error starting QR scanner: ${err}`);
    });
}

function displayScans() {
    const listElement = document.getElementById('scanned-list');
    listElement.innerHTML = ''; // Clear the list

    scannedCodes.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.code} - ${item.time}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeScan(index); // Remove scan on button click
        listItem.appendChild(removeButton);
        listElement.appendChild(listItem);
    });
}

function removeScan(index) {
    scannedCodes.splice(index, 1); // Remove the scan at the specified index
    displayScans(); // Refresh the displayed list
}

function downloadScans() {
    const rows = scannedCodes.map(item => [item.code, item.time].join(","));
    rows.unshift('QR Code,Time Scanned'); // Adding header row
    const csvContent = "data:text/csv;charset=utf-8," + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", getDownloadFileName() + ".csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

window.addEventListener('load', startScanner);
