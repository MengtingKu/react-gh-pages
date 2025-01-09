import { useState } from 'react';
import LoginForm from './pages/admin/LoginForm';
import ProductList from './pages/admin/ProductList';

function App() {
    const [isAuth, setIsAuth] = useState(false);

    return (
        <> {isAuth ? <ProductList /> : <LoginForm setIsAuth={setIsAuth} />}</>
    );
}

export default App;
