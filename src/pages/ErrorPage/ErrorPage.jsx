import { useNavigate } from "react-router-dom";
import img from "../../assets/Page_Under_Construction.png"
const ErrorPage = () => {
    const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <img src={img} alt="Error" className="max-w-md mb-4" />
        <h1 className="text-4xl font-bold text-red-500">Something went wrong!</h1>
        <p className="text-lg text-gray-600">We couldn't find the page you're looking for.</p>
        <button onClick={handleGoBack} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Go Back
        </button>
      </div>
    );
};

export default ErrorPage;