import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FormSubmissionView = () => {
  const { id } = useParams();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
   const axiosSecure=useAxiosSecure()

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axiosSecure.get(`/forms/template/${id}`);
        setForms(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (forms.length === 0) return <p className="text-red-500">No submissions found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold">User Submissions</h2>

      <div className="mt-6 space-y-6">
        {forms.map((form) => (
          <div key={form.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Submitted by: {form.user.username}</h3>
            <p className="text-sm text-gray-500">Date: {new Date(form.createdAt).toLocaleDateString()}</p>

            {form.answers.length === 0 ? (
              <p className="text-yellow-500 mt-4">No answers submitted for this form.</p>
            ) : (
              <div className="mt-4 space-y-2">
                {form.answers.map((answer) => (
                  <div key={answer.id} className="p-2 bg-gray-100 rounded-md">
                    <p className="text-gray-800 font-semibold">{answer.question.title}</p>
                    <p className="text-gray-600">{answer.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormSubmissionView;
