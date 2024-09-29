export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_TOTAL_PRODUCTS = 'SET_TOTAL_PRODUCTS';
// const setTotalProducts='SET_TOTAL_PRODUCTS';

export const setCategories = (categories) => ({
    type: SET_CATEGORIES,
    payload: categories,
});

export const setProducts = (products) => ({
    type: SET_PRODUCTS,
    payload: products,
});

export const setTotalProducts = (total) => ({
    type: SET_TOTAL_PRODUCTS,
    payload: total,
});

export const setSelectedCategory = (category) => ({
    type: SET_SELECTED_CATEGORY,
    payload: category,
});

export const setSearchTerm = (term) => ({
    type: SET_SEARCH_TERM,
    payload: term,
});