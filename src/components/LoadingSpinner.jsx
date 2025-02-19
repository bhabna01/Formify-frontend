

const LoadingSpinner = () => {
    
  return (
    
    <div className="flex justify-center items-center h-[calc(100vh-88px)] space-x-4">
        <p className="text-7xl font-bold text-indigo-500">L</p>
        <div className="w-16 h-16 border-8 border-t-8 border-t-transparent border-gradient-to-r from-indigo-500 to-pink-500 rounded-full animate-spin"></div>
        <p className="text-7xl font-bold text-indigo-500">Loading....</p>
    </div>



  );
};

export default LoadingSpinner;