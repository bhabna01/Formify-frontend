

import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTemplate = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "Education",
    isPublic: false,
    tags: [],
    questions: [
      {
        title: "",
        description: "",
        type: "text",
        orderIndex: 0,
        isRequired: false,
        options: [],
      },
    ],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle tag input
  const handleTagChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map((tag) => tag.trim()),
    }));
  };

  // Handle question changes
  const handleQuestionChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    const updatedQuestions = [...formData.questions];

    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [name]: type === "checkbox" ? checked : value,
    };

    // Reset options when switching to text type
    if (name === "type") {
      if (value === "text") {
        updatedQuestions[index].options = [];
      } else if (!updatedQuestions[index].options?.length) {
        updatedQuestions[index].options = [""];
      }
    }

    setFormData((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  // Add a new question
  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { 
          title: "", 
          description: "", 
          type: "text", 
          orderIndex: prev.questions.length,
          isRequired: false, 
          options: [] 
        },
      ],
    }));
  };

  // Remove a question
  const removeQuestion = (index) => {
    if (formData.questions.length === 1) {
      Swal.fire("Error", "At least one question is required", "error");
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  // Add new option
  const addOption = (index) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index].options.push("");
      return { ...prev, questions: updatedQuestions };
    });
  };

  // Remove an option
  const removeOption = (qIndex, optIndex) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[qIndex].options.splice(optIndex, 1);
      return { ...prev, questions: updatedQuestions };
    });
  };

  // Handle option text change
  const handleOptionChange = (qIndex, optIndex, value) => {
    setFormData((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[qIndex].options[optIndex] = value;
      return { ...prev, questions: updatedQuestions };
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.title.trim()) {
      Swal.fire("Error", "Title is required", "error");
      setIsSubmitting(false);
      return;
    }

    if (formData.questions.some(q => !q.title.trim())) {
      Swal.fire("Error", "All questions must have a title", "error");
      setIsSubmitting(false);
      return;
    }

    try {
      // Transform data for server
      const payload = {
        ...formData,
        questions: formData.questions.map((q, index) => ({
          ...q,
          orderIndex: index,
          // options: ["select", "checkbox"].includes(q.type) ? q.options : []
          options: q.type === 'text' 
      ? [] 
      : Array.isArray(q.options) 
        ? q.options 
        : []
        }))
      };

      const res = await axiosSecure.post("/templates", payload);
      
      if (res.data.template) {
        Swal.fire({
          icon: "success",
          title: "Template Created!",
          text: "Your template has been successfully created.",
          timer: 2000,
        });
        navigate(`dashboard/templates/${res.data.template.id}`);
      }
    } catch (error) {
      console.error("Error creating template:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error || "Failed to create template",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Template</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows="3"
          />
        </div>

        {/* Topic Selection */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Topic</label>
          <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="Education">Education</option>
            <option value="Quiz">Quiz</option>
            <option value="Survey">Survey</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={formData.tags.join(", ")}
            onChange={handleTagChange}
            className="input input-bordered w-full"
            placeholder="e.g., survey, education"
          />
        </div>

        {/* Public Checkbox */}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
          <label className="font-semibold">Make this template public</label>
        </div>

        {/* Questions Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Questions</h3>
          {formData.questions.map((question, index) => (
            <div key={index} className="border p-4 mb-4 rounded-lg bg-base-100">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">Question {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="btn btn-circle btn-xs btn-error"
                  disabled={formData.questions.length === 1}
                >
                  ✕
                </button>
              </div>

              {/* Question Title */}
              <input
                type="text"
                name="title"
                value={question.title}
                onChange={(e) => handleQuestionChange(e, index)}
                className="input input-bordered w-full mb-2"
                placeholder="Question Title"
                required
              />

              {/* Question Description */}
              <textarea
                name="description"
                value={question.description}
                onChange={(e) => handleQuestionChange(e, index)}
                className="textarea textarea-bordered w-full mb-2"
                placeholder="Description (optional)"
                rows="2"
              />

              {/* Question Type */}
              <select
                name="type"
                value={question.type}
                onChange={(e) => handleQuestionChange(e, index)}
                className="select select-bordered w-full mb-2"
              >
                <option value="text">Text Answer</option>
                <option value="select">Dropdown</option>
                <option value="checkbox">Checkboxes</option>
              </select>

              {/* Options */}
              {(question.type === "select" || question.type === "checkbox") && (
                <div className="ml-4 mt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Options</span>
                    <button
                      type="button"
                      onClick={() => addOption(index)}
                      className="btn btn-xs btn-secondary"
                    >
                      Add Option
                    </button>
                  </div>
                  
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                        className="input input-bordered flex-grow"
                        placeholder={`Option ${optIndex + 1}`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(index, optIndex)}
                        className="btn btn-circle btn-xs btn-error"
                        disabled={question.options.length === 1}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={addQuestion}
              className="btn btn-secondary flex-1"
            >
              Add Question
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Create Template"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateTemplate;