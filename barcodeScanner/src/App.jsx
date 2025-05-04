import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import './App.css'; 

const App = () => {
  const scannerRef = useRef(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250
    });

    scanner.render((text, result) => {
      const output = document.getElementById("result");
      output.innerText = `Scanned: ${text}`;

    });

    scannerRef.current = scanner;

    //store the scanned barcode result in a variable
    const onScanSuccess = (decodedText) => {
      console.log("Scanned barcode:", decodedText);
      fetchGeminiAnalysis(decodedText); // ← next step
    };
    

    return () => {
      scannerRef.current.clear().catch((err) => console.error("Failed to clear scanner", err));
    };
  }, []);

  return (
    <div className="container">
      <h1 className="title"> Barcode / QR Scanner</h1>
      <div id="reader" className="scanner"></div>
      <p id="result" className="result">Waiting for scan...</p>
    </div>
  );
};

export default App;
