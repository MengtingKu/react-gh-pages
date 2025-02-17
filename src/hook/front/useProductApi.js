import { useCallback, useReducer } from 'react';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_APP_PATH: apiPath } = import.meta.env;

const initialState = {
    isLoading: false,
    products: [],
    productDetail: null,
    pagination: {},
    message: null,
};

const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'SET_PAGINATION':
            return { ...state, pagination: action.payload };
        case 'SET_PRODUCT_DETAIL':
            return { ...state, productDetail: action.payload };
        case 'SET_MESSAGE':
            return { ...state, message: action.payload };
        default:
            return state;
    }
};

const errorInfo = error => ({
    message: error.response?.data?.message,
    success: error.response?.data?.success,
});

const useProductApi = () => {
    const [state, dispatch] = useReducer(productReducer, initialState);

    const getProductsAll = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const url = `${baseUrl}/api/${apiPath}/products/all`;

        try {
            const res = await axios.get(url);
            dispatch({ type: 'SET_PRODUCTS', payload: res.data.products });
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: errorInfo(error),
            });
            dispatch({ type: 'SET_PRODUCTS', payload: [] });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    const getProducts = useCallback(async (page = 1) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const url = `${baseUrl}/api/${apiPath}/products?page=${page}`;

        try {
            const res = await axios.get(url);
            dispatch({ type: 'SET_PRODUCTS', payload: res.data.products });
            dispatch({ type: 'SET_PAGINATION', payload: res.data.pagination });
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: errorInfo(error),
            });
            dispatch({ type: 'SET_PRODUCTS', payload: [] });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    const getProductById = useCallback(async productId => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const url = `${baseUrl}/api/${apiPath}/product/${productId}`;

        try {
            const res = await axios.get(url);
            dispatch({ type: 'SET_PRODUCT_DETAIL', payload: res.data.product });
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: errorInfo(error),
            });
            dispatch({ type: 'SET_PRODUCTS', payload: [] });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    return {
        isLoading: state.isLoading,
        products: state.products,
        productDetail: state.productDetail,
        pagination: state.pagination,
        message: state.message,
        getProductsAll,
        getProducts,
        getProductById,
    };
};

export default useProductApi;
