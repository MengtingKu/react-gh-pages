import { useState, useEffect } from 'react';
import axios from 'axios';

import LoginForm from '@pages/admin/LoginForm';
import DefaultAdminLayout from '@layouts/DefaultAdminLayout';
import CartFlow from '@pages/fontEnd/CartFlow';

const { VITE_BASE_URL: baseUrl } = import.meta.env;

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const isAdmin = false;

    const checkLogin = async () => {
        try {
            await axios.post(`${baseUrl}/api/user/check`);
            setIsAuth(true);
        } catch (error) {
            alert(error?.response.data.message);
        }
    };

    useEffect(() => {
        if (isAdmin) {
            const token = document.cookie.replace(
                // eslint-disable-next-line no-useless-escape
                /(?:(?:^|.*;\s*)reactToken\s*\=\s*([^;]*).*$)|^.*$/,
                '$1'
            );
            axios.defaults.headers.common.Authorization = token;

            checkLogin();
        }
    }, [isAdmin]);

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

    return <>{isAdmin ? renderAdmin() : <CartFlow />}</>;
}

export default App;
