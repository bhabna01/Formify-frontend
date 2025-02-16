

import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const CreateTemplate = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "Education",
    isPublic: false,
    tags: [],
    questions: [{
      title: "",
      description: "",
      type: "text", // Add a default type
      orderIndex: 0,
      isRequired: false,
    }],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle tag input (comma-separated)
  const handleTagChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map(tag => tag.trim()),
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
    setFormData((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  // Add new question
  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { title: "", description: "", type: "text", orderIndex: prev.questions.length, isRequired: false },
      ],
    }));
  };

  // Remove a question
  const removeQuestion = (index) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.post("/templates", formData);
      if (res.data.template) {
        Swal.fire({
          icon: "success",
          title: "Template Created!",
          text: "Your template has been successfully created.",
          timer: 2000,
        });
        setFormData({
          title: "",
          description: "",
          topic: "Education",
          isPublic: false,
          tags: [],
          questions: [{ title: "", description: "", type: "text", orderIndex: 0, isRequired: false }],
        });
      }
    } catch (error) {
      console.error("Error creating template:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create template. Try again!",
      });
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Template</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Topic</label>
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
        <div className="mb-4">
          <label className="block font-semibold">Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags.join(", ")}
            onChange={handleTagChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleChange}
            className="checkbox"
          />
          <label className="ml-2 font-semibold">Make this template public</label>
        </div>

        {/* Questions Section */}
        <div className="mb-4">
          <h3 className="font-semibold">Questions</h3>
          {formData.questions.map((question, index) => (
            <div key={index} className="border p-4 mb-2 rounded-lg">
              <div className="mb-2">
                <label className="block font-semibold">Question Title</label>
                <input
                  type="text"
                  name="title"
                  value={question.title}
                  onChange={(e) => handleQuestionChange(e, index)}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block font-semibold">Description</label>
                <textarea
                  name="description"
                  value={question.description}
                  onChange={(e) => handleQuestionChange(e, index)}
                  className="textarea textarea-bordered w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block font-semibold">Question Type</label>
                <select
                  name="type"
                  value={question.type}
                  onChange={(e) => handleQuestionChange(e, index)}
                  className="select select-bordered w-full"
                >
                  <option value="text">Text</option>
                  <option value="select">Select</option>
                  <option value="checkbox">Checkbox</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isRequired"
                    checked={question.isRequired}
                    onChange={(e) => handleQuestionChange(e, index)}
                    className="checkbox"
                  />
                  <span className="ml-2">Required</span>
                </label>
              </div>
              {formData.questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="btn btn-danger w-full"
                >
                  Remove Question
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="btn btn-secondary w-full">
            Add Question
          </button>
        </div>

        <button type="submit" className="btn btn-primary w-full">Create</button>
      </form>
    </div>
  );
};

export default CreateTemplate;
