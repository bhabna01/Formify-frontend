import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const CreateTemplate = () => {
    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("Other");
  const [isPublic, setIsPublic] = useState(false);
  const [questions, setQuestions] = useState([{ title: "", description: "", type: "text" }]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([...questions, { title: "", description: "", type: "text" }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/templates", { title, description, topic, isPublic, questions });
    navigate("/");
  };

    return (
        <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Create a Template</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input input-bordered w-full" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="textarea textarea-bordered w-full" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select className="select select-bordered w-full" value={topic} onChange={(e) => setTopic(e.target.value)}>
          <option value="Education">Education</option>
          <option value="Quiz">Quiz</option>
          <option value="Other">Other</option>
        </select>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isPublic} onChange={() => setIsPublic(!isPublic)} /> Public Template
        </label>

        <h3 className="text-xl font-bold mt-4">Questions</h3>
        {questions.map((q, index) => (
          <div key={index} className="border p-3 rounded-lg space-y-2">
            <input className="input input-bordered w-full" placeholder="Question Title" value={q.title} onChange={(e) => handleQuestionChange(index, "title", e.target.value)} />
            <textarea className="textarea textarea-bordered w-full" placeholder="Description" value={q.description} onChange={(e) => handleQuestionChange(index, "description", e.target.value)} />
            <select className="select select-bordered w-full" value={q.type} onChange={(e) => handleQuestionChange(index, "type", e.target.value)}>
              <option value="text">Text</option>
              <option value="integer">Integer</option>
              <option value="dropdown">Dropdown</option>
            </select>
          </div>
        ))}

        <button type="button" className="btn btn-secondary" onClick={addQuestion}>Add Question</button>
        <button type="submit" className="btn btn-primary">Create Template</button>
      </form>
    </div>
    );
};

export default CreateTemplate;