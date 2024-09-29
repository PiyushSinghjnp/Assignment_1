
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import CategorySelector from './components/CategorySelector';
import ProductList from './components/ProductList';
import ProductSearch from './components/ProductSearch';

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <h1>Product Store</h1>
                <ProductSearch />
                <CategorySelector />
                <ProductList />
                {/* Limitations: 
                    1. The app only fetches and displays products in batches of 10.
                    2. No UI pagination implemented; all products are displayed on one page.
                    3. Search functionality is basic and does not support advanced filters.
                    4. Error handling for API calls is minimal.
                */}
            </div>
        </Provider>
    );
};

export default App;