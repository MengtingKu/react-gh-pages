import Navbar from '@layouts/Navbar';
import Footer from '@layouts/Footer';
import { Outlet } from 'react-router-dom';

const DefaultFrontLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default DefaultFrontLayout;
