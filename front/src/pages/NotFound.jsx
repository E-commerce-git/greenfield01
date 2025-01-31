import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="text-center transform -translate-y-24">
        <h1 className="text-6xl text-black">404 Not Found</h1>
        <p className="mt-4">Your visited page was not found. You may go to the home page.</p>
        <button
          onClick={handleGoHome}
          className="mt-4 px-6 py-2 bg-[#e04444] text-white rounded hover:bg-[#d13333] transition-colors duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;
