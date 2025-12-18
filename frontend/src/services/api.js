import axios from 'axios';

const API_URL = 'http://localhost:5000/api/pages';

export const getPageBySlug = async (slug) => {
    try {
        const response = await axios.get(`${API_URL}/${slug}`);
        return response.data;
    } catch(error) {
        console.error("Error fetching page:", error);
        throw error;
    }
};

export const getRootPages = async (slug) => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch(error) {
        console.error("Error fetching roots:", error);
        return [];
    }
};

