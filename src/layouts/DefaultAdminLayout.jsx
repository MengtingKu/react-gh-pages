import { Outlet } from 'react-router-dom';

import Navbar from '@layouts/Navbar';
import Sidebar from '@layouts/Sidebar';
import Footer from '@layouts/Footer';
import MessageToast from '@components/common/MessageToast';

const DefaultAdminLayout = () => {
    return (
        <>
            <Navbar />
            <MessageToast />
            <Sidebar />
            <Outlet />
            <Footer />
        </>
    );
};

export default DefaultAdminLayout;
