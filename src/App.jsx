import { useState, useEffect } from 'react';
import axios from 'axios';

import LoginForm from './pages/admin/LoginForm';
// import ProductList from './pages/admin/ProductList';
import Products from './pages/admin/Products';

const { VITE_BASE_URL: baseUrl } = import.meta.env;

function App() {
    const [isAuth, setIsAuth] = useState(false);

    const checkLogin = () => {
        axios
            .post(`${baseUrl}/api/user/check`)
            .then(() => {
                setIsAuth(true);
            })
            .catch(error => {
                alert(error?.response.data.message);
            });
    };

    useEffect(() => {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)reactToken\s*\=\s*([^;]*).*$)|^.*$/,
            '$1'
        );
        axios.defaults.headers.common.Authorization = token;

        checkLogin();
    }, []);

    return <> {isAuth ? <Products /> : <LoginForm setIsAuth={setIsAuth} />}</>;
}

export default App;
