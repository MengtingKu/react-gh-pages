import { useCallback, useState } from 'react';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_APP_PATH: apiPath } = import.meta.env;

const useOrderApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderPagination, setOrderPagination] = useState({});

    const getOrders = useCallback(async (page = 1) => {
        setIsLoading(true);
        const url = `${baseUrl}/api/${apiPath}/orders?page=${page}`;

        try {
            const res = await axios.get(url);
            setOrders(res.orders);
            setOrderPagination(res.pagination);
            alert(res.data.message);
        } catch (error) {
            alert(error?.response?.data?.message || '取得訂單失敗');

            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    const postOrder = async (user, message) => {
        setIsLoading(true);
        const url = `${baseUrl}/api/${apiPath}/order`;
        const body = { data: { user, message } };

        try {
            const res = await axios.post(url, body);
            alert(res.data.message);
        } catch (error) {
            alert(error?.response?.data?.message || '建立訂單失敗');
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        orders,
        orderPagination,
        getOrders,
        postOrder,
    };
};

export default useOrderApi;
