import {useEffect, useState} from "react";
import { useParams , Link} from "react-router-dom";
import { getPageBySlug } from "../services/api";

const Category = () => {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getPageBySlug(slug);
        setData(result); // result contains {page, children}
        setLoading(false);

      } catch(err) {
        setError("Content not found");
        setLoading(false);
      }
    };

    fetchData();


  }, [slug]); // Re-run this whenever the URL slug changes

  if (loading) return <div className="p-10">Loading...</div>
  if (error) return <div className="p-10 text-red-500">{error}</div>

  return (
    <div>
      {/*1. Main content */}
      <h1 className="text-4xl font-bold text-orange-700 capitalize mb-4">
        {data.page.title}
      </h1>
      <p className="text-gray-600 italic mb-6">Category: {data.page.category}</p>

      <div className="prose max-w-none text-gray-800 mb-10">
        {data.page.content}
      </div>
      {/* Sub-Categories list */ }
      {data.children && data.children.length > 0 && (
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <h3 className="text-xl font-semibold mb-3">Explore within {data.page.title}:</h3>
          <ul className="list-disc pl-5">
            {data.children.map((child) => (
              <li key={child._id} className="mb-1">
                {/* Notice we link to /wiki/slug to handle infinite depth later */}
                <Link to={`/category/${child.slug}`} className="text-blue-600 hover:underline text-lg">
                {child.title}
                </Link>

              </li>
            ))}
          </ul>
        </div>

      )}
    </div>
  );
};

export default Category;
