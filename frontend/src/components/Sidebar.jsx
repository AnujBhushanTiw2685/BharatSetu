import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRootPages } from '../services/api';


const Sidebar = () => {
    const [roots, setRoots] = useState([]);

    useEffect(() => {
        const fetchRoots = async () => {
            const data = await getRootPages();
            setRoots(data);
        };
        fetchRoots();

    }, []);

    

    return (
        <aside className="w-64 bg-gray-50 border-r border-gray-200 min-h-screen p-6 hidden md:block">
            <h2 className="text-xl font-bold text-orange-800 mb-6 border-b border-orange-200 pb-2">
                BharatSetu
            </h2>

            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Encyclopedia
                </h3>
                <ul className="space-y-2">
                    {/* Dynamic Link from Database */}
                    {roots.map((page) => (
                        <li key={page._id}>
                            <Link to={`/category/${page.slug}`} className="block text-gray-700 hover:text-orange-600 hover:bg-orange-50 px-2 py-1 rounded transition-colors">
                            {page.title}
                            </Link>
                             
                        </li>
                    ))}
                    {/* Fallback if DB is empty */}
                    {roots.length === 0 && (
                        <li className="text-gray-400 text-sm italic">
                            No categories yet.
                        </li>
                    )}
                </ul>
            </div>

            {/* Temporary Link for you to create content*/}
            <div className="mt-10 pt-6 border-t border-gray-200">
                <Link to="/add" className="text-sm font-medium text-blue-600 hover:underline">
                + Add New Page
                </Link>
            </div>
        </aside>
    )


};

export default Sidebar;