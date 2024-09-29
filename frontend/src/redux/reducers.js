import {
    SET_CATEGORIES,
    SET_PRODUCTS,
    SET_SELECTED_CATEGORY,
    SET_TOTAL_PRODUCTS,
    SET_SEARCH_TERM,
} from './actions';

const initialState = {
    categories: [],
    products: [],
    totalProducts: 0,
    selectedCategory: '',
    searchTerm: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return { ...state, categories: action.payload };
        case SET_PRODUCTS:
            return { ...state, products: action.payload };
        case SET_TOTAL_PRODUCTS:
            return {...state,totalProducts: action.payload,};
        case SET_SELECTED_CATEGORY:
            return { ...state, selectedCategory: action.payload };
        case SET_SEARCH_TERM:
            return { ...state, searchTerm: action.payload };
        default:
            return state;
    }
};

export default reducer;