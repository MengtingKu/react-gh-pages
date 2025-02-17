import { useReducer, useCallback } from 'react';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_APP_PATH: apiPath } = import.meta.env;

const initialState = {
    isCartLoading: false,
    cart: { carts: [] },
    message: null,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isCartLoading: action.payload };
        case 'SET_CART':
            return { ...state, cart: action.payload };
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

const useCartApi = () => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const getCart = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });

        const url = `${baseUrl}/api/${apiPath}/cart`;

        try {
            const res = await axios.get(url);
            const CartTableData = res.data.data.carts?.map(item => {
                const flatItem = { ...item };
                for (const [key, value] of Object.entries(item.product)) {
                    flatItem[`product_${key}`] = value;
                }
                return flatItem;
            });

            dispatch({
                type: 'SET_CART',
                payload: { ...res.data.data, carts: CartTableData },
            });
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: errorInfo(error),
            });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    }, []);

    const postCart = async (product_id, qty = 1) => {
        dispatch({ type: 'SET_LOADING', payload: true });

        const url = `${baseUrl}/api/${apiPath}/cart`;
        const body = { data: { product_id, qty } };

        try {
            const res = await axios.post(url, body);
            await getCart();
            dispatch({
                type: 'SET_MESSAGE',
                payload: {
                    message: res.data.message,
                    success: res.data.success,
                },
            });
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: errorInfo(error),
            });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const putCartItem = async (id, product_id, qty) => {
        dispatch({ type: 'SET_LOADING', payload: true });

        const url = `${baseUrl}/api/${apiPath}/cart/${id}`;
        const body = { data: { product_id, qty } };

        try {
            const res = await axios.put(url, body);
            await getCart();
            dispatch({
                type: 'SET_MESSAGE',
                payload: {
                    message: res.data.message,
                    success: res.data.success,
                },
            });
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: errorInfo(error),
            });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const deleteCartItem = async id => {
        dispatch({ type: 'SET_LOADING', payload: true });

        const url = `${baseUrl}/api/${apiPath}/cart/${id}`;

        try {
            const res = await axios.delete(url);
            await getCart();
            dispatch({
                type: 'SET_MESSAGE',
                payload: {
                    message: res.data.message,
                    success: res.data.success,
                },
            });
        } catch (error) {
            dispatch({
                type: 'SET_MESSAGE',
                payload: errorInfo(error),
            });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const deleteCarts = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });

        const url = `${baseUrl}/api/${apiPath}/carts`;

        try {
            const res = await axios.delete(url);
            await getCart();
            dispatch({
                type: 'SET_MESSAGE',
                payload: {
                    message: res.data.message,
                    success: res.data.success,
                },
            });
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
        isCartLoading: state.isCartLoading,
        cart: state.cart,
        message: state.message,
        postCart,
        getCart,
        putCartItem,
        deleteCartItem,
        deleteCarts,
    };
};

export default useCartApi;
