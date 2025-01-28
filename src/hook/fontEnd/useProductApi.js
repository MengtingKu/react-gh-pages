import { useCallback, useState } from 'react';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_APP_PATH: apiPath } = import.meta.env;

const useProductApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});

    const getProductsAll = useCallback(async () => {
        setIsLoading(true);
        const url = `${baseUrl}/api/${apiPath}/products/all`;

        try {
            const res = await axios.get(url);
            setProducts(res.data.products);
        } catch (error) {
            alert(error?.response?.data?.message || '取得產品列表失敗');
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getProducts = useCallback(async (page = 1) => {
        setIsLoading(true);
        const url = `${baseUrl}/api/${apiPath}/products?page=${page}`;

        try {
            const res = await axios.get(url);
            setProducts(res.data.products);
            setPagination(res.data.pagination);
        } catch (error) {
            alert(error?.response?.data?.message || '取得產品列表失敗');
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        products,
        pagination,
        getProductsAll,
        getProducts,
    };
};

export default useProductApi;
