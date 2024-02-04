let scannedCodes = []; // Array to hold scanned QR codes

// Function to start the QR code scanner
function startScanner() {
    const html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 30};
    html5QrCode.start({ facingMode: "environment" }, config, (qrCodeMessage) => {
        if (!scannedCodes.includes(qrCodeMessage)) {
            scannedCodes.push(qrCodeMessage); // Add unique scans to the array
            displayScans(); // Update the display of scans
        }
    }).catch((err) => {
        console.error(`Error starting QR scanner: ${err}`);
    });
}

// Function to display the list of scanned QR codes
function displayScans() {
    const listElement = document.getElementById('scanned-list');
    listElement.innerHTML = ''; // Clear the list

    scannedCodes.forEach((code, index) => {
        const item = document.createElement('li');
        item.textContent = code;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeScan(index); // Remove scan on button click
        item.appendChild(removeButton);
        listElement.appendChild(item);
    });
}

// Function to remove a scan from the list
function removeScan(index) {
    scannedCodes.splice(index, 1); // Remove the scan at the specified index
    displayScans(); // Refresh the displayed list
}

// Function to download the list of scans as a CSV file
function downloadScans() {
    const csvContent = "data:text/csv;charset=utf-8," + scannedCodes.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "scanned_codes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

window.addEventListener('load', startScanner);
