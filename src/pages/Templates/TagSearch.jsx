import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const TagSearch = () => {
    const [searchParams] = useSearchParams();
    const tag = searchParams.get("tag");
    const [templates, setTemplates] = useState([]);
    const axiosSecure=useAxiosSecure()
  
    useEffect(() => {
      const fetchTemplates = async () => {
        try {
          const response = await axiosSecure.get(`/tags/search?tag=${tag}`);
          setTemplates(response.data);
        } catch (error) {
          console.error("Error fetching templates:", error);
        }
      };
  
      if (tag) fetchTemplates();
    }, [tag]);
    return (
        <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Templates for {tag}</h2>
      {templates.length > 0 ? (
        <ul className="space-y-4">
          {templates.map((template) => (
            <li key={template.id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{template.title}</h3>
              <p>{template.description}</p>
              <p className="text-sm text-gray-600">By: {template.author.username}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {template.tags.map((t) => (
                  <span key={t.name} className="badge badge-secondary">{t.name}</span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No templates found for this tag.</p>
      )}
    </div>
    );
};

export default TagSearch;