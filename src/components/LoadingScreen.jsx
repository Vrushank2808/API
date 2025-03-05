import './LoadingScreen.css'; 

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingScreen;