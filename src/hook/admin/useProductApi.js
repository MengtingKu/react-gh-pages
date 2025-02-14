/* eslint-disable no-useless-escape */
import { useState, useCallback } from 'react';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_APP_PATH: apiPath } = import.meta.env;
const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)reactToken\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
);
axios.defaults.headers.common.Authorization = token;

const useProductApi = () => {
    const [isLoading, setIsLoading] = useState(false);

    const getProductList = useCallback(async (page = 1) => {
        setIsLoading(true);
        const url = `${baseUrl}/api/${apiPath}/admin/products?page=${page}`;

        try {
            const res = await axios.get(url);

            return res.data;
        } catch (error) {
            alert(error?.response?.data?.message || '獲取產品列表失敗');
            return [];
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createProduct = async templateData => {
        setIsLoading(true);
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
            alert(res.data.message);

            return res.data;
        } catch (error) {
            alert(error.response.data.message || '新增產品失敗');
        } finally {
            setIsLoading(false);
        }
    };

    const updateProduct = async (id, templateData) => {
        setIsLoading(true);
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
            alert(res.data.message);

            return res.data;
        } catch (error) {
            alert(error.response.data.message || '更新產品失敗');
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async id => {
        setIsLoading(true);
        const url = `${baseUrl}/api/${apiPath}/admin/product/${id}`;

        try {
            const res = await axios.delete(url);
            alert(res.data.message);

            return res.data;
        } catch (error) {
            alert(error.response.data.message || '刪除產品失敗');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        getProductList,
        createProduct,
        updateProduct,
        deleteProduct,
    };
};

export default useProductApi;
