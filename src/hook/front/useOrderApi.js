import { useCallback, useReducer } from 'react';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_APP_PATH: apiPath } = import.meta.env;

const initialState = {
    isLoading: false,
    orders: [],
    orderPagination: {},
    message: null,
};

const orderReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_ORDERS':
            return { ...state, orders: action.payload };
        case 'SET_PAGINATION':
            return { ...state, pagination: action.payload };
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

const useOrderApi = () => {
    const [state, dispatch] = useReducer(orderReducer, initialState);

    const getOrders = useCallback(async (page = 1) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const url = `${baseUrl}/api/${apiPath}/orders?page=${page}`;

        try {
            const res = await axios.get(url);
            dispatch({ type: 'SET_ORDERS', payload: res.orders });
            dispatch({ type: 'SET_PAGINATION', payload: res.pagination });
            alert(res.data.message);
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

    const postOrder = async (user, message) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const url = `${baseUrl}/api/${apiPath}/order`;
        const body = { data: { user, message } };

        try {
            const res = await axios.post(url, body);
            alert(res.data.message);
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: errorInfo(error),
            });
            return [];
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    return {
        isLoading: state.isLoading,
        orders: state.orders,
        orderPagination: state.orderPagination,
        message: state.message,
        getOrders,
        postOrder,
    };
};

export default useOrderApi;
