import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";



const TemplateGallery = () => {
    const axiosSecure = useAxiosSecure();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axiosSecure.get("/templates");
        setTemplates(res.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [axiosSecure]);

  if (loading) return <p className="text-center">Loading templates...</p>;
    return (
        <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Template Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.length > 0 ? (
          templates.map((template) => (
            <div
              key={template.id}
              className="card bg-white shadow-lg rounded-lg p-4 border  dark:bg-gray-900"
            >
              <h3 className="text-xl font-bold mb-2 dark:text-gray-50">{template.title}</h3>
              <p className="text-gray-600">{template.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Topic: <span className="font-semibold">{template.topic}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Author:{" "}
                <span className="font-semibold">{template.author.username}</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Tags:{" "}
                {template.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs mr-1"
                  >
                    {tag.name}
                  </span>
                ))}
              </p>
              <Link
                to={`/dashboard/templates/${template.id}`}
                className="btn btn-primary mt-4 w-full"
              >
                View
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No templates found.</p>
        )}
      </div>
    </div>
    );
};

export default TemplateGallery;