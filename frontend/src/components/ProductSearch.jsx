
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../redux/actions';

const ProductSearch = () => {
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    return (
        <input type="text" placeholder="Search products..." onChange={handleSearchChange} />
    );
};

export default ProductSearch;