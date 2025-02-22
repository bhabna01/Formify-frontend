import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const MainPage = () => {
    const axiosSecure = useAxiosSecure();
  const [latestTemplates, setLatestTemplates] = useState([]);
  const [popularTemplates, setPopularTemplates] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [latestRes, popularRes, tagsRes] = await Promise.all([
          axiosSecure.get("/templates/latest"),
          axiosSecure.get("/templates/popular"),
          axiosSecure.get("/tags"),
        ]);

        setLatestTemplates(latestRes.data);
        setPopularTemplates(popularRes.data);
        setTags(tagsRes.data);
      } catch (error) {
        console.error("Error fetching main page data:", error);
      }
    };

    fetchData();
  }, []);
    return (
        <div className="p-6">
        {/* 📌 Latest Templates Gallery */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Latest Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {latestTemplates.map((template) => (
              <div key={template.id} className="card bg-base-100 shadow-md p-4">
                
                <h3 className="text-lg font-bold mt-2">{template.title}</h3>
                <p className="text-sm">{template.description}</p>
                <p className="text-xs text-gray-500">By {template.author.username}</p>
                <Link to={`/dashboard/templates/${template.id}`} className="btn btn-primary mt-2">
                  View
                </Link>
              </div>
            ))}
          </div>
        </section>
  
        {/* 📌 Top 5 Most Popular Templates */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Top 5 Popular Templates</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Filled Forms</th>
                 
                </tr>
              </thead>
              <tbody>
                {popularTemplates.map((template, index) => (
                  <tr key={template.id}>
                    <td>{index + 1}</td>
                    <td>{template.title}</td>
                    <td>{template.author.username}</td>
                    {/* <td>{template.forms.length}</td> */}
                    <td>
                      <Link to={`/template/${template.id}`} className="btn btn-sm btn-primary">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
  
        {/* 📌 Tag Cloud */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Tag Cloud</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.name}
                to={`/search?tag=${tag.name}`}
                className="badge badge-lg badge-primary cursor-pointer"
              >
                {tag.name} ({tag.count})
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
};

export default MainPage;