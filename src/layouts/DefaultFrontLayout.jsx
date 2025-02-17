import { Outlet } from 'react-router-dom';
import Navbar from '@layouts/Navbar';
import Footer from '@layouts/Footer';
import MessageToast from '@components/common/MessageToast';

const DefaultFrontLayout = () => {
    return (
        <>
            <Navbar />
            <MessageToast />
            <Outlet />
            <Footer />
        </>
    );
};

export default DefaultFrontLayout;
