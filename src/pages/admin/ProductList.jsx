import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductDetail from '../../component/ProductDetail';
import Loading from '../../component/common/Loading';

const { VITE_BASE_URL: baseUrl, VITE_APP_PATH: apiPath } = import.meta.env;

function ProductList() {
    const [isLoading, setIsLoading] = useState(false);
    const [tempProduct, setTempProduct] = useState(null);
    const [products, setProducts] = useState([]);

    // const checkLogin = () => {
    //     const token = document.cookie.replace(
    //         /(?:(?:^|.*;\s*)reactToken\s*\=\s*([^;]*).*$)|^.*$/,
    //         '$1'
    //     );
    //     axios.defaults.headers.common.Authorization = token;
    //     axios
    //         .post(`${baseUrl}/api/user/check`)
    //         .then(res => {
    //             alert('登入成功');
    //         })
    //         .catch(error => {
    //             alert(error?.response.data.error.message);
    //         });
    // };

    const getProductList = () => {
        
        setIsLoading(true);
        const url = `${baseUrl}/api/${apiPath}/admin/products`;
        axios
            .get(url)
            .then(res => {
                setProducts(res.data.products);
                
                setIsLoading(false);
            })
            .catch(error => {
                alert(error?.response.data.message);
            });
    };

    useEffect(() => {
        getProductList();
    }, []);
    
    if (isLoading) {
        return <Loading status={isLoading} />;
    }

    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-6">
                        <h2>產品列表</h2>
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
                    <div className="col-md-6">
                        <ProductDetail tempProduct={tempProduct} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;
