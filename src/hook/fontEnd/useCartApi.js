import { useState, useCallback } from 'react';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_APP_PATH: apiPath } = import.meta.env;

const useCartApi = () => {
    const [isCartLoading, setIsCartLoading] = useState(false);
    const [cart, setCart] = useState({ carts: [] });

    const getCart = useCallback(async () => {
        setIsCartLoading(true);
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

            setCart(prevCart => ({
                ...prevCart,
                ...res.data.data,
                carts: CartTableData,
            }));
        } catch (error) {
            alert(error.response.data.message || '取得購物車列表失敗');
        } finally {
            setIsCartLoading(false);
        }
    }, []);

    const postCart = async (product_id, qty = 1) => {
        setIsCartLoading(true);
        const url = `${baseUrl}/api/${apiPath}/cart`;
        const body = {
            data: { product_id, qty },
        };

        try {
            const res = await axios.post(url, body);
            await getCart();
            alert(res.data.message);
        } catch (error) {
            alert(error?.response?.data?.message || '加入購物車失敗');

            return [];
        } finally {
            setIsCartLoading(false);
        }
    };

    const putCartItem = async (id, product_id, qty) => {
        setIsCartLoading(true);
        const url = `${baseUrl}/api/${apiPath}/cart/${id}`;
        const body = {
            data: { product_id, qty },
        };

        try {
            const res = await axios.put(url, body);
            await getCart();
            alert(res.data.message);
        } catch (error) {
            alert(error.response.data.message || '更新購物車失敗');
        } finally {
            setIsCartLoading(false);
        }
    };

    const deleteCartItem = async id => {
        setIsCartLoading(true);
        const url = `${baseUrl}/api/${apiPath}/cart/${id}`;

        try {
            const res = await axios.delete(url);
            await getCart();
            alert(res.data.message);
        } catch (error) {
            alert(error.response.data.message || '刪除購物車品項失敗');
        } finally {
            setIsCartLoading(false);
        }
    };

    const deleteCarts = async () => {
        setIsCartLoading(true);
        const url = `${baseUrl}/api/${apiPath}/carts`;

        try {
            const res = await axios.delete(url);
            await getCart();
            alert(res.data.message);
        } catch (error) {
            alert(error.response.data.message || '刪除購物車失敗');
        } finally {
            setIsCartLoading(false);
        }
    };

    return {
        isCartLoading,
        cart,
        postCart,
        getCart,
        putCartItem,
        deleteCartItem,
        deleteCarts,
    };
};

export default useCartApi;
