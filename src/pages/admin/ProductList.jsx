import { useState, useEffect } from 'react';
import useAdminProductApi from '@hook/useAdminProductApi';

import Loading from '@components/common/Loading';
import ProductModal from '@components/common/ProductModal';
import ProductTable from '@components/ProductTable';
import Pagination from '@components/common/Pagination';

const defaultTemplateData = {
    id: '',
    imageUrl: '',
    title: '',
    category: '',
    unit: '',
    origin_price: '',
    price: '',
    description: '',
    content: '',
    is_enabled: false,
    imagesUrl: [],
};

const tableHeader = ['產品名稱', '原價', '售價', '狀態', '操作'];

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [modalType, setModalType] = useState('');
    const [templateData, setTemplateData] = useState(defaultTemplateData);
    const [pagination, setPagination] = useState({});

    const {
        isLoading,
        getProductList,
        createProduct,
        updateProduct,
        deleteProduct,
    } = useAdminProductApi();

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProductList();
            setPagination(data.pagination);
            setProducts(data.products);
        };

        fetchProducts();
    }, [getProductList]);

    const openModal = (product, type) => {
        setModalType(type);
        setTemplateData({
            ...defaultTemplateData,
            ...product,
        });
    };

    const closeModal = () => {
        setModalType('');
        setTemplateData({
            ...defaultTemplateData,
        });
    };

    const handleProduct = async () => {
        switch (modalType) {
            case 'create':
                await createProduct(templateData);
                break;
            case 'edit':
                await updateProduct(templateData.id, templateData);
                break;
            case 'delete':
                await deleteProduct(templateData.id);
                break;
            default:
                alert('操作失敗');
        }
        setModalType('');
        setTemplateData(defaultTemplateData);
        const data = await getProductList();
        setProducts(data.products);
    };

    if (isLoading) {
        return <Loading status={isLoading} />;
    }

    return (
        <>
            <div className="container-fluid my-3">
                <div className="d-flex justify-content-between align-items-center my-4">
                    <h2 className="m-0">產品列表</h2>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => openModal({}, 'create')}
                    >
                        新增產品
                    </button>
                </div>
                <ProductTable
                    tableHeader={tableHeader}
                    products={products}
                    openModal={openModal}
                    pagination={pagination}
                    setProducts={setProducts}
                    前頁碼
                />

                <Pagination
                    pagination={pagination}
                    setProducts={setProducts}
                />
            </div>
            <ProductModal
                modalType={modalType}
                closeModal={closeModal}
                templateData={templateData}
                handleProduct={handleProduct}
                setTemplateData={setTemplateData}
            />
        </>
    );
};

export default ProductList;
