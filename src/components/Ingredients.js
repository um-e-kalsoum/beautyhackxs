import { useState } from 'react';

export default function Ingredients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  
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
  
  return (
    <section className="ingredients-container">
      <h1>Ingredient Checker</h1>
      <p>Search for ingredients or upload a product image to check what's in your beauty products.</p>
      
      <div className="search-container">
        <input 
          type="text" 
          className="search-box" 
          placeholder="Search for an ingredient..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="upload-section">
        <h2>Or Upload a Product Image</h2>
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
    </section>
  );
}
