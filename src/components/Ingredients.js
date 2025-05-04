import { useState } from 'react';

export default function Ingredients() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAnalyzeImage = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setAnalysisResults({
        message: "Analysis complete! In the future, this will identify ingredients from your product label."
      });
      setIsAnalyzing(false);
    }, 2000);
  };
  
  const handleClearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setAnalysisResults(null);
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    // Add user message to chat history
    const userMessage = { sender: 'user', text: chatMessage };
    setChatHistory([...chatHistory, userMessage]);
    
    // Simulate AI processing
    setIsProcessing(true);
    
    // Simulate AI response (in a real implementation, this would call Gemini API)
    setTimeout(() => {
      const aiResponse = { 
        sender: 'ai', 
        text: `Regarding your question about "${chatMessage}": In a real implementation, Gemini AI would provide detailed information about these ingredients, their benefits, potential risks, and suitable alternatives.` 
      };
      setChatHistory([...chatHistory, userMessage, aiResponse]);
      setChatMessage('');
      setIsProcessing(false);
    }, 1500);
  };
  
  return (
    <section className="ingredients-container">
      <h1>Ingredient Checker</h1>
      <p>Upload a product image to check what's in your beauty products or ask questions about ingredients.</p>
      
      <div className="upload-section">
        <h2>Upload a Product Image</h2>
        <p>Take a photo of your product's ingredient list and we'll analyze it for you.</p>
        
        <div className="upload-container">
          {!imagePreview ? (
            <div className="upload-box">
              <label htmlFor="image-upload" className="upload-label">
                <div className="upload-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <p>Click to upload an image</p>
              </label>
              <input 
                type="file" 
                id="image-upload" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            <div className="image-preview-container">
              <img src={imagePreview} alt="Preview" className="image-preview" />
              <div className="preview-actions">
                <button 
                  className="analyze-btn" 
                  onClick={handleAnalyzeImage}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Ingredients'}
                </button>
                <button className="clear-btn" onClick={handleClearImage}>
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
        
        {analysisResults && (
          <div className="analysis-results">
            <h3>Analysis Results</h3>
            <p>{analysisResults.message}</p>
          </div>
        )}
      </div>
      
      {/* Text-based Chatbox */}
      <div className="gemini-chatbox ingredients-chat">
        <h3>Ask Questions About Ingredients</h3>
        <p className="powered-by">Powered by Gemini AI</p>
        
        <div className="chat-messages">
          {chatHistory.length === 0 ? (
            <p className="chat-placeholder">Your conversation will appear here. Ask questions about beauty ingredients!</p>
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
            placeholder="Ask about ingredients or products..."
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
    </section>
  );
}
