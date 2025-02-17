import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const ReviewSubmissions = () => {
    const axiosSecure = useAxiosSecure();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/forms")
      .then((res) => setForms(res.data))
      .catch((err) => console.error("Error fetching forms:", err));
  }, []);

    return (
        <div>
            <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Form Submissions</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">User</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Template</th>
            <th className="border p-2">Answers</th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) => (
            <tr key={form.id} className="border">
              <td className="border p-2">{form.user.username}</td>
              <td className="border p-2">{form.user.email}</td>
              <td className="border p-2">{form.template.title}</td>
              <td className="border p-2">
                {form.answers.map((answer, idx) => (
                  <div key={idx}>
                    <strong>{answer.question.title}:</strong> {answer.value}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </div>
    );
};

export default ReviewSubmissions;