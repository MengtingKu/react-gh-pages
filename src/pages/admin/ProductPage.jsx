import { useState, useEffect } from 'react';
import useAdminProductApi from '@hook/useAdminProductApi';

import ProductDetail from '@components/ProductDetail';
import Loading from '@components/common/Loading';

const ProductPage = () => {
    const [tempProduct, setTempProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const { isLoading, getProductList } = useAdminProductApi();

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProductList();
            setProducts(data.products);
        };

        fetchProducts();
    }, [getProductList]);

    if (isLoading) {
        return <Loading status={isLoading} />;
    }

    return (
        <div className="container-fluid my-3">
            <div className="row">
                <div className="col-12 col-md-6">
                    <h2>產品列表</h2>
                    <div className="table-responsive overflow-x-auto">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">產品名稱</th>
                                    <th scope="col">原價</th>
                                    <th scope="col">售價</th>
                                    <th scope="col">是否啟用</th>
                                    <th scope="col">查看細節</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(item => (
                                    <tr key={item.id} className="align-middle">
                                        <th scope="row">{item.title}</th>
                                        <td className="text-end">{`${item.origin_price.toLocaleString()}`}</td>
                                        <td className="text-end">{`${item.price.toLocaleString()}`}</td>
                                        <td className="text-center">
                                            {item.is_enabled ? 'Y' : 'N'}
                                        </td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-link"
                                                onClick={() =>
                                                    setTempProduct(item)
                                                }
                                            >
                                                Link
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <ProductDetail tempProduct={tempProduct} />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
