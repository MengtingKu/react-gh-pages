import { createHashRouter } from 'react-router-dom';

import DefaultFrontLayout from '@layouts/DefaultFrontLayout';
import HomePage from '@pages/front/HomePage';
import ProductsPage from '@pages/front/ProductsPage';
import CartsPage from '@pages/front/CartsPage';
import ProductDetailPage from '@pages/front/ProductDetailPage';

import DefaultAdminLayout from '@layouts/DefaultAdminLayout';
import ProductPage from '@pages/admin/ProductPage';
import ProductList from '@pages/admin/ProductList';
import App from '@/App';

import NotFound from '@pages/NotFount';

const routers = [
    {
        path: '/',
        element: <DefaultFrontLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: '/products',
                element: <ProductsPage />,
            },
            {
                path: '/products/:id',
                element: <ProductDetailPage />,
            },
            {
                path: '/carts',
                element: <CartsPage />,
            },
            {
                path: '/login',
                element: <App />,
            },
        ],
    },
    {
        path: '/admin',
        element: <DefaultAdminLayout />,
        children: [
            {
                path:'products',
                element: <ProductPage />,
            },
            {
                path:'product-list',
                element: <ProductList />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
];

const router = createHashRouter(routers);

export default router;
