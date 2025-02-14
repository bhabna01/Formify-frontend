import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const FillTemplateForm = () => {
    const axiosSecure = useAxiosSecure();
  const { templateId } = useParams();  // Get templateId from the URL
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await axiosSecure.get(`/templates/${templateId}`);
        
        // Log the full response to inspect its structure
        console.log("Response data:", res.data);
  
        // Check if the response data contains the template and its questions
        if (res.data && res.data.questions) {
          setTemplate(res.data); // Set the entire template (since it's directly in res.data)
          setFormData(
            res.data.questions.map((question) => ({
              questionId: question.id,
              value: question.type === "checkbox" ? false : "",  // Initialize based on type
            }))
          );
        } else {
          console.error("Template structure is invalid.");
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "The template data is not available.",
          });
        }
      } catch (error) {
        console.error("Error fetching template:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch template. Please try again later.",
        });
      }
    };
  
    fetchTemplate();
  }, [templateId, axiosSecure]);
  
  
  
  
  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index].value = value;
    setFormData(updatedFormData);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.post(`/forms/${templateId}`, {
        answers: formData,
      });
      Swal.fire({
        icon: "success",
        title: "Form Submitted!",
        text: "Your responses have been successfully submitted.",
        timer: 2000,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit the form. Please try again.",
      });
    }
  };

  if (!template) {
    return <div>Loading template...</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{template.title}</h2>
      <form onSubmit={handleSubmit}>
        {template.questions.map((question, index) => (
          <div key={question.id} className="mb-4">
            <label className="block font-semibold">{question.title}</label>
            
            {/* Text Input */}
            {question.type === "text" && (
              <input
                type="text"
                value={formData[index]?.value || ""}
                onChange={(e) => handleInputChange(e, index)}
                className="input input-bordered w-full"
                required={question.isRequired}
              />
            )}
  
            {/* Select Input */}
            {question.type === "select" && (
              <select
                value={formData[index]?.value || ""}
                onChange={(e) => handleInputChange(e, index)}
                className="select select-bordered w-full"
                required={question.isRequired}
              >
                <option value="">Select an option</option>
                {question.options?.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
  
            {/* Checkbox */}
            {question.type === "checkbox" && (
              <input
                type="checkbox"
                checked={formData[index]?.value || false}
                onChange={(e) => handleInputChange(e, index)}
                className="checkbox"
              />
            )}
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-full">
          Submit Form
        </button>
      </form>
    </div>
  );
  
};

export default FillTemplateForm;