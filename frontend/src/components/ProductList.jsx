import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setTotalProducts } from '../redux/actions';
import { fetchProducts } from '../api';

const ITEMS_PER_PAGE = 10;

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const totalProducts = useSelector((state) => state.totalProducts);
    const selectedCategory = useSelector((state) => state.selectedCategory);
    const searchTerm = useSelector((state) => state.searchTerm);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1); // Reset to first page when category changes
    }, [selectedCategory]);

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchProducts(selectedCategory, (currentPage - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE);
                dispatch(setProducts(data.products));
                dispatch(setTotalProducts(data.total));
            } catch (err) {
                setError('Failed to fetch products. Please try again.');
                console.error('Error fetching products:', err);
            } finally {
                setIsLoading(false);
            }
        };
        getProducts();
    }, [dispatch, selectedCategory, currentPage]);

    const filteredProducts = products.filter((product) =>
        product && product.title
            ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
            : false
    );

    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    if (isLoading) return <div className="loading">Loading products...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="product-list-container">
            <h2 className="product-list-title">Products ({totalProducts})</h2>
            {filteredProducts.length === 0 ? (
                <p className="no-products">No products found.</p>
            ) : (
                <>
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Brand</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Rating</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <img 
                                            src={product.thumbnail} 
                                            alt={product.title} 
                                            className="product-image"
                                        />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.category}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.rating.toFixed(1)}</td>
                                    <td>
                                        <button onClick={() => alert(`View details for ${product.title}`)}>
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>{currentPage} of {totalPages}</span>
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductList;