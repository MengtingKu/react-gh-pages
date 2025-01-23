import { useState } from 'react';

import ProductList from '@pages/admin/ProductList';
import ProductPage from '@pages/admin/ProductPage';
import Footer from '@layouts/Footer';
import Navbar from '@layouts/Navbar';
import Sidebar from '@layouts/Sidebar';
import Content from '@layouts/Content';
import LoginForm from '@pages/admin/LoginForm';

const DefaultLayout = () => {
    const [selectedTab, setSelectedTab] = useState('products');

    const renderContent = () => {
        switch (selectedTab) {
            case 'productPage':
                return <ProductPage />;
            case 'productList':
                return <ProductList />;
            case 'logout':
                return <LoginForm setIsAuth={false} />;
            default:
                return <ProductList />;
        }
    };

    return (
        <>
            {selectedTab === 'logout' ? (
                <LoginForm setIsAuth={false} />
            ) : (
                <>
                    <Navbar />
                    <div className="layout">
                        <Sidebar setSelectedTab={setSelectedTab} />
                        <div className="content">
                            <Content>{renderContent()}</Content>
                            <Footer />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default DefaultLayout;
