import { Outlet } from 'react-router-dom';

import Navbar from '@layouts/Navbar';
import Sidebar from '@layouts/Sidebar';
import Footer from '@layouts/Footer';

const DefaultAdminLayout = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Outlet />
            <Footer />
        </>
    );
};

export default DefaultAdminLayout;
