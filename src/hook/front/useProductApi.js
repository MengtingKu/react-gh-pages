import { useCallback, useState } from 'react';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_APP_PATH: apiPath } = import.meta.env;

const useProductApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [productDetail, setProductDetail] = useState(null);
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

    const getProductById = useCallback(async productId => {
        setIsLoading(true);
        const url = `${baseUrl}/api/${apiPath}/product/${productId}`;

        try {
            const res = await axios.get(url);
            setProductDetail(res.data.product);
        } catch (error) {
            alert(error?.response?.data?.message || '取得產品失敗');
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        isLoading,
        products,
        productDetail,
        pagination,
        getProductsAll,
        getProducts,
        getProductById,
    };
};

export default useProductApi;
