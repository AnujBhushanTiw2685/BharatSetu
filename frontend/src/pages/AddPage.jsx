import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const AddPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title:'',
        slug:'',
        content:'',
        category:'religion', // default
        parent: ''
    });
    const [parents, setParents] = useState([]);

    // Fetch existing page to populate the "parent" dropdown

    useEffect(() =>{
        axios.get('http://localhost:5000/api/pages')
        .then(res => setParents(res.data))
        .catch(err => console.error(err));

    }, []);

    const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Default update
    let updatedData = { ...formData, [name]: value };

    // Auto-generate slug if the user is typing in the 'title' field
    if (name === 'title') {
        updatedData.slug = value
            .toLowerCase()
            .replace(/ /g, '-')       // Replace spaces with -
            .replace(/[^\w-]+/g, ''); // Remove non-word chars
    }

    setFormData(updatedData);
};

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // if parent is empty string , send null
            const payload = { ...formData, parent: formData.parent || null};
            await axios.post('http://localhost:5000/api/pages', payload);
            alert('Page Created Successfully!');
            navigate(`/category/${formData.slug}`);
        } catch(error) {
            alert('Error creating page');
            console.error(error);
        }
    };

    return (

        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-2xl font-bold mb-6 text-orange-700">Add New Cultural Entry</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Title</label>
                    <input name="title" onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                
                <div>
                    <label className="block text-gray-700">Slug (URL friendly)</label>
                    <input name="slug" onChange={handleChange} placeholder="e.g. vedic-period" className="w-full border p-2 rounded" required />
                </div>

                <div>
                    <label className="block text-gray-700">Parent Category (Optional)</label>
                    <select name="parent" onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="">-- No Parent (Root Category) --</option>
                        {parents.map(p => (
                            <option key={p._id} value={p._id}>{p.title}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700">Category Type</label>
                    <select name="category" onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="religion">Religion</option>
                        <option value="sect">Sect</option>
                        <option value="deity">Deity</option>
                        <option value="practice">Practice</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700">Content</label>
                    <textarea name="content" onChange={handleChange} rows="5" className="w-full border p-2 rounded" required></textarea>
                </div>

                <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
                    Publish Page
                </button>
            </form>
        </div>
        
    );
};

export default AddPage;