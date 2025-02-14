/* eslint-disable no-useless-escape */
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import LoginForm from '@pages/admin/LoginForm';
import DefaultAdminLayout from '@layouts/DefaultAdminLayout';

const { VITE_BASE_URL: baseUrl } = import.meta.env;

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    const checkLogin = useCallback(async () => {
        try {
            await axios.post(`${baseUrl}/api/user/check`);
            setIsAuth(true);
            navigate('/admin/product-list');
        } catch (error) {
            console.log('登入驗證錯誤 =>', error?.response.data.message);
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)reactToken\s*\=\s*([^;]*).*$)|^.*$/,
            '$1'
        );
        axios.defaults.headers.common.Authorization = token;

        checkLogin();
    }, [checkLogin]);

    const renderAdmin = () => {
        return (
            <>
                {isAuth ? (
                    <DefaultAdminLayout setIsAuth={setIsAuth} />
                ) : (
                    <LoginForm setIsAuth={setIsAuth} />
                )}
            </>
        );
    };

    return <>{renderAdmin()}</>;
}

export default App;
