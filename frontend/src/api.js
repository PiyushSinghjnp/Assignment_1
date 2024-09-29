import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Failed to fetch categories');
    }
};

export const fetchProducts = async (category, skip = 0, limit = 10) => {
    try {
        let url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
        if (category && category !== 'all') {
            url = `${BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
};