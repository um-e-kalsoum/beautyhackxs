import { useState } from 'react';

export default function Camera() {
  const [cameraActive, setCameraActive] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // Add user message to chat history
    const userMessage = { sender: 'user', text: chatMessage };
    setChatHistory([...chatHistory, userMessage]);
    
    // Simulate Gemini AI processing
    setIsProcessing(true);
    
    // Simulate AI response (in a real implementation, this would call Gemini API)
    setTimeout(() => {
      const aiResponse = { 
        sender: 'ai', 
        text: `I've analyzed your image and question: "${chatMessage}". In a real implementation, this would be processed by Gemini AI to provide relevant information based on your facial scan.` 
      };
      setChatHistory([...chatHistory, userMessage, aiResponse]);
      setChatMessage('');
      setIsProcessing(false);
    }, 1500);
  };
  
  return (
    <section className="camera-container">
      <h1>Facial Scanner</h1>
      <p>Use your camera to scan your face and ask questions about skincare and beauty products suitable for you.</p>
      
      <div className="camera-view">
        {cameraActive ? (
          <div className="active-camera">
            <p>Camera would be active here in a real implementation</p>
          </div>
        ) : (
          <div className="camera-placeholder">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            <p>Click "Activate Camera" to start scanning</p>
          </div>
        )}
      </div>
      
      <div className="camera-controls">
        <button 
          className="btn primary-btn"
          onClick={() => setCameraActive(!cameraActive)}
        >
          {cameraActive ? 'Deactivate Camera' : 'Activate Camera'}
        </button>
        <button className="btn secondary-btn">
          Upload Image
        </button>
      </div>
      
      {/* Gemini-powered Chatbox */}
      <div className="gemini-chatbox">
        <h3>Ask Questions About Your Scan</h3>
        <p className="powered-by">Powered by Gemini AI</p>
        
        <div className="chat-messages">
          {chatHistory.length === 0 ? (
            <p className="chat-placeholder">Your conversation will appear here. Ask questions about your facial scan!</p>
          ) : (
            chatHistory.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                <span className="message-text">{msg.text}</span>
              </div>
            ))
          )}
          {isProcessing && (
            <div className="chat-message ai processing">
              <span className="message-text">Gemini is analyzing...</span>
            </div>
          )}
        </div>
        
        <form className="chat-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Ask about your facial scan..."
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            disabled={isProcessing}
          />
          <button 
            type="submit" 
            className="send-btn"
            disabled={!chatMessage.trim() || isProcessing}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
      
      <div className="scanner-info">
        <h3>How It Works</h3>
        <ul>
          <li>Scan your face using your camera</li>
          <li>Our AI will analyze your skin type and features</li>
          <li>Ask questions about suitable products and skincare routines</li>
          <li>Get personalized recommendations based on your scan</li>
        </ul>
      </div>
    </section>
  );
}
