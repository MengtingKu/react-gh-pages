import { useState, useEffect } from 'react';
import axios from 'axios';

import LoginForm from '@pages/admin/LoginForm';
import DefaultAdminLayout from '@layouts/DefaultAdminLayout';

const { VITE_BASE_URL: baseUrl } = import.meta.env;

function App() {
    const [isAuth, setIsAuth] = useState(false);

    const checkLogin = async () => {
        try {
            await axios.post(`${baseUrl}/api/user/check`);
            setIsAuth(true);
        } catch (error) {
            alert(error?.response.data.message);
        }
    };

    useEffect(() => {
        const token = document.cookie.replace(
            // eslint-disable-next-line no-useless-escape
            /(?:(?:^|.*;\s*)reactToken\s*\=\s*([^;]*).*$)|^.*$/,
            '$1'
        );
        axios.defaults.headers.common.Authorization = token;

        checkLogin();
    }, []);

    return (
        <>
            {' '}
            {isAuth ? (
                <DefaultAdminLayout setIsAuth={setIsAuth} />
            ) : (
                <LoginForm setIsAuth={setIsAuth} />
            )}
        </>
    );
}

export default App;
