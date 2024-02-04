let scannedCodes = []; // Array to hold scanned QR codes with date and time

// Function to start the QR code scanner
function startScanner() {
    const html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: 250 };
    html5QrCode.start({ facingMode: "environment" }, config, (qrCodeMessage) => {
        // Get the current time
        const currentTime = new Date().toLocaleTimeString();
        // Store the scan with the QR code message and the current time
        if (!scannedCodes.some(scan => scan.code === qrCodeMessage)) {
            scannedCodes.push({ code: qrCodeMessage, time: currentTime });
            displayScans(); // Update the display of scans
        }
    }).catch((err) => {
        // handle camera access errors
        console.error(`Error starting QR scanner: ${err}`);
    });
}

// Function to display the list of scanned QR codes with time
function displayScans() {
    const listElement = document.getElementById('scanned-list');
    listElement.innerHTML = ''; // Clear the list

    scannedCodes.forEach((scan, index) => {
        const item = document.createElement('li');
        // Assuming scan object contains 'code' for the QR data and 'time' for the scan time
        item.textContent = `${scan.code} - ${scan.time}`;
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

// Function to download the list of scans as a CSV file, including date and time
function downloadScans() {
    const csvContent = "data:text/csv;charset=utf-8," + 
        scannedCodes.map(entry => `${entry.code},${entry.dateTime}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "scanned_codes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

window.addEventListener('load', startScanner);
