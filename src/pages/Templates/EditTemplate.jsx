import { useState, useRef, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const EditTemplate = ({ template, closeModal }) => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);

  // Local state for form
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "Education",
    isPublic: false,
    questions: [],
  });

  // Fetch template when it changes
  useEffect(() => {
    if (template?.id) {
      fetchTemplate(template.id);
      if (modalRef.current) {
        modalRef.current.showModal();
      }
    }
  }, [template]);

  const fetchTemplate = async (id) => {
    try {
      const response = await axiosSecure.get(`/templates/${id}`);
      setFormData({
        title: response.data.title || "",
        description: response.data.description || "",
        topic: response.data.topic || "Education",
        isPublic: response.data.isPublic || false,
        questions: response.data.questions || [],
      });
    } catch (error) {
      console.error("Error fetching template:", error);
      Swal.fire("Error", "Failed to fetch template", "error");
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle question change
  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Add a new question
  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { title: "", description: "" }],
    });
  };

  // Remove a question
  const handleRemoveQuestion = (index) => {
    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  // Save edited template
  const handleSave = async () => {
    try {
      await axiosSecure.patch(`/templates/${template.id}`, formData);
      Swal.fire("Success", "Template updated successfully!", "success");
      closeModal();
    } catch (error) {
      console.error("Error updating template:", error);
      Swal.fire("Error", "Failed to update template", "error");
    }
  };

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Template</h3>

        {/* Template Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="input input-bordered w-full my-2"
          placeholder="Title"
        />

        {/* Template Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="textarea textarea-bordered w-full my-2"
          placeholder="Description"
        />

        {/* Topic Selection - Added 'Survey' option */}
        <select
          name="topic"
          value={formData.topic}
          onChange={handleInputChange}
          className="select select-bordered w-full my-2"
        >
          <option value="Education">Education</option>
          <option value="Quiz">Quiz</option>
          <option value="Survey">Survey</option>
          <option value="Other">Other</option>
        </select>

        {/* Questions List */}
        <div className="mt-4">
          <h4 className="font-bold text-md">Questions</h4>
          {formData.questions.map((question, index) => (
            <div key={index} className="border p-2 rounded-md my-2">
              <input
                type="text"
                name="title"
                value={question.title}
                onChange={(e) => handleQuestionChange(index, e)}
                className="input input-bordered w-full my-1"
                placeholder="Question Title"
              />
              <textarea
                name="description"
                value={question.description}
                onChange={(e) => handleQuestionChange(index, e)}
                className="textarea textarea-bordered w-full my-1"
                placeholder="Question Description"
              />
              <button
                className="btn btn-error btn-xs mt-2"
                onClick={() => handleRemoveQuestion(index)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Add Question Button */}
          <button className="btn btn-primary btn-sm mt-2" onClick={handleAddQuestion}>
            Add Question
          </button>
        </div>

        {/* Action Buttons */}
        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-error" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditTemplate;