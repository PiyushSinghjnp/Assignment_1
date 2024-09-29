import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, setCategories } from '../redux/actions';
import { fetchCategories } from '../api';

const CategorySelector = () => {
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => state.selectedCategory);
    const categories = useSelector((state) => state.categories);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const fetchedCategories = await fetchCategories();
                // Ensure 'all' is the first option
                dispatch(setCategories([{ name: 'all' }, ...fetchedCategories]));
            } catch (err) {
                setError('Failed to fetch categories. Please try again.');
                console.error('Error fetching categories:', err);
            } finally {
                setIsLoading(false);
            }
        };
        getCategories();
    }, [dispatch]);

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        dispatch(setSelectedCategory(category));
    };

    if (isLoading) return <div>Loading categories...</div>;
    if (error) return <div>{error}</div>;

    return (
        <select 
            className="category-selector"
            onChange={handleCategoryChange} 
            value={selectedCategory}
        >
            {categories.map((category, index) => (
                <option key={`${category.name}-${index}`} value={category.name}>
                    {category.name === 'all' ? 'All Categories' : category.name}
                </option>
            ))}
        </select>
    );
};

export default CategorySelector;