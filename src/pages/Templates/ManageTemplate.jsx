
import { useEffect, useState, useRef } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import EditTemplate from "./EditTemplate";

const ManageTemplate = () => {
  const axiosSecure = useAxiosSecure();
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const modalRef = useRef(null); // Modal reference

  // Fetch templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axiosSecure.get("/templates");
        setTemplates(res.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, [axiosSecure]);

  // Open Edit Modal
  const handleEdit = (template) => {
    setSelectedTemplate(template);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  // Close Edit Modal
  const handleCloseModal = () => {
    setSelectedTemplate(null);
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  // Delete Template
  const handleDelete = async (templateId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/templates/${templateId}`);
          setTemplates(templates.filter((t) => t.id !== templateId));
          Swal.fire("Deleted!", "The template has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting template:", error);
          Swal.fire("Error", "Failed to delete template", "error");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Templates</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id} className="border">
              <td className="px-4 py-2">{template.title}</td>
              <td className="px-4 py-2">
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleEdit(template)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(template.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <dialog ref={modalRef} className="modal">
        {selectedTemplate && (
          <EditTemplate template={selectedTemplate} closeModal={handleCloseModal} />
        )}
      </dialog>
    </div>
  );
};

export default ManageTemplate;
