// Array to hold scan results
let scanResults = [];

window.addEventListener('load', (event) => {
    const html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: 250 };

    html5QrCode.start({ facingMode: "environment" }, config, (qrCodeMessage) => {
        // Handle on QR Code scanning success
        console.log(`QR Code detected: ${qrCodeMessage}`);
        // Add the scan result to the array
        scanResults.push({ date: new Date().toISOString(), data: qrCodeMessage });
    }).catch((err) => {
        // Handle camera access errors
        console.error(`Error starting QR scanner: ${err}`);
    });
});

// Function to convert scan results to CSV format
function convertArrayToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Date,Data\n"; // CSV header

    scanResults.forEach(result => {
        let row = `${result.date},${result.data}`;
        csvContent += row + "\n";
    });

    return csvContent;
}

// Function to trigger CSV download
function downloadCSV() {
    const csvContent = convertArrayToCSV();
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "scan_results.csv");
    document.body.appendChild(link); // Required for FF
    link.click(); // This will download the CSV file
    document.body.removeChild(link); // Clean up
}
