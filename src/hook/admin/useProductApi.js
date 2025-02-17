/* eslint-disable no-useless-escape */
import { useCallback, useReducer } from 'react';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_APP_PATH: apiPath } = import.meta.env;
const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)reactToken\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
);
axios.defaults.headers.common.Authorization = token;

const initialState = {
    isLoading: false,
    message: null,
};

const adminReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
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
    const [state, dispatch] = useReducer(adminReducer, initialState);

    const getProductList = useCallback(async (page = 1) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const url = `${baseUrl}/api/${apiPath}/admin/products?page=${page}`;

        try {
            const res = await axios.get(url);

            return res.data;
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: errorInfo(error),
            });
            return [];
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    const createProduct = async templateData => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const url = `${baseUrl}/api/${apiPath}/admin/product`;

        const body = {
            data: {
                ...templateData,
                origin_price: Number(templateData.origin_price),
                price: Number(templateData.price),
                is_enabled: templateData.is_enabled ? 1 : 0,
            },
        };

        try {
            const res = await axios.post(url, body);
            dispatch({
                type: 'SET_MESSAGE',
                payload: {
                    message: res.data.message,
                    success: res.data.success,
                },
            });

            return res.data;
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: errorInfo(error),
            });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const updateProduct = async (id, templateData) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const url = `${baseUrl}/api/${apiPath}/admin/product/${id}`;
        const body = {
            data: {
                ...templateData,
                origin_price: Number(templateData.origin_price),
                price: Number(templateData.price),
                is_enabled: templateData.is_enabled ? 1 : 0,
            },
        };

        try {
            const res = await axios.put(url, body);
            dispatch({
                type: 'SET_MESSAGE',
                payload: {
                    message: res.data.message,
                    success: res.data.success,
                },
            });

            return res.data;
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: errorInfo(error),
            });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const deleteProduct = async id => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const url = `${baseUrl}/api/${apiPath}/admin/product/${id}`;

        try {
            const res = await axios.delete(url);
            dispatch({
                type: 'SET_MESSAGE',
                payload: {
                    message: res.data.message,
                    success: res.data.success,
                },
            });

            return res.data;
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: errorInfo(error),
            });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    return {
        isLoading: state.isLoading,
        message: state.message,
        getProductList,
        createProduct,
        updateProduct,
        deleteProduct,
    };
};

export default useProductApi;
