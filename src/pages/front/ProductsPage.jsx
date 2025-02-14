import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';

import DynamicTable from '@components/common/DynamicTable';
import useProductApi from '@hook/front/useProductApi';
import useCartApi from '@hook/front/useCartApi';

const ProductsPage = () => {
    const [loadingCartId, setLoadingCartId] = useState(null);
    const { isLoading, products, getProductsAll } = useProductApi();
    const navigate = useNavigate();

    const { isCartLoading, postCart } = useCartApi();

    // 產品列表
    const productFields = [
        {
            key: 'imageUrl',
            name: '圖片',
            class: 'text-center',
            type: 'img',
            width: '200px',
        },
        { key: 'title', name: '商品名稱', class: 'text-start', type: 'text' },
        {
            key: 'price, origin_price',
            name: '價格',
            class: 'text-end',
            type: 'custom',
            render: product => {
                return (
                    <div>
                        <div className="h5">
                            {product.price.toLocaleString()}
                        </div>
                        {product.origin_price && (
                            <del className="h6">
                                原價 {product.origin_price.toLocaleString()}
                            </del>
                        )}
                    </div>
                );
            },
        },
    ];
    const productActions = [
        {
            label: '查看詳情',
            class: 'btn btn-outline-secondary',
            handler: product => {
                navigate(`/products/${product.id}`);
                // openModal(product);
            },
        },
        {
            label: '加入購物車',
            class: 'btn btn-outline-danger',
            disabled: productId => loadingCartId === productId,
            handler: async product => {
                setLoadingCartId(product.id);
                await postCart(product.id);
                setLoadingCartId(null);
            },
        },
    ];

    useEffect(() => {
        getProductsAll();
    }, [getProductsAll]);

    return (
        <div
            className="container my-3"
            style={
                isCartLoading || isLoading
                    ? {
                          width: '100vw',
                          height: '100vh',
                          overflow: 'hidden',
                      }
                    : {}
            }
        >
            {/* 全面 loading */}
            {(isCartLoading || isLoading) && (
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(255,255,255,0.3)',
                        zIndex: 999,
                    }}
                >
                    <ReactLoading
                        type="spin"
                        color="black"
                        width="4rem"
                        height="4rem"
                    />
                </div>
            )}
            {/* 產品列表 */}
            <DynamicTable
                data={products}
                fields={productFields}
                endActions={productActions}
            />
        </div>
    );
};

export default ProductsPage;
