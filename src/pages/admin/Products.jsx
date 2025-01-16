/* eslint-disable no-useless-escape */
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';

import Loading from '../../component/common/Loading';
import ProductModal from '../../component/common/ProductModal';
import ProductTable from '../../component/ProductTable';

const { VITE_BASE_URL: baseUrl, VITE_APP_PATH: apiPath } = import.meta.env;

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

const tableHeader = ['產品名稱', '圖片', '原價', '售價', '狀態', '操作'];

function Products() {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [modalType, setModalType] = useState('');
    const [templateData, setTemplateData] = useState(defaultTemplateData);
    const modalRef = useRef(null);
    const productModal = useRef(null);

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

    const openModal = (product, type) => {
        setModalType(type);

        setTemplateData({
            id: product.id || '',
            imageUrl: product.imageUrl || '',
            title: product.title || '',
            category: product.category || '',
            unit: product.unit || '',
            origin_price: product.origin_price || '',
            price: product.price || '',
            description: product.description || '',
            content: product.content || '',
            is_enabled: product.is_enabled || false,
            imagesUrl: product.imagesUrl || [],
        });

        productModal.current = new Modal(modalRef.current, { backdrop: false });
        productModal.current.show();
    };

    const closeModal = () => {
        productModal.current.hide();
        setTemplateData(defaultTemplateData);
    };

    const handleModalInputChange = e => {
        const { id, value, type, checked } = e.target;
        setTemplateData(prevData => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const createData = () => {
        setIsLoading(true);
        const url = `${baseUrl}/api/${apiPath}/admin/product`;

        const body = {
            data: {
                ...templateData,
                origin_price: Number(templateData.origin_price),
                price: Number(templateData.price),
                is_enabled: templateData.is_enabled ? 1 : 0,
            },
        };

        axios
            .post(url, body)
            .then(res => {
                setIsLoading(false);
                alert(res.data.message);
                setTemplateData(defaultTemplateData);
                getProductList();
            })
            .catch(error => {
                console.log(`${modalType}_error=>`, error);
            });
    };

    const updateData = () => {
        setIsLoading(true);
        const url = `${baseUrl}/api/${apiPath}/admin/product/${templateData.id}`;
        const body = {
            data: {
                ...templateData,
                origin_price: Number(templateData.origin_price),
                price: Number(templateData.price),
                is_enabled: templateData.is_enabled ? 1 : 0,
            },
        };

        axios
            .put(url, body)
            .then(res => {
                setIsLoading(false);
                alert(res.data.message);
                setTemplateData(defaultTemplateData);
                getProductList();
            })
            .catch(error => {
                console.log(`${modalType}_error=>`, error);
            });
    };

    const deleteData = () => {
        setIsLoading(true);
        const url = `${baseUrl}/api/${apiPath}/admin/product/${templateData.id}`;

        axios
            .delete(url)
            .then(res => {
                setIsLoading(false);
                alert(res.data.message);
                getProductList();
            })
            .catch(error => {
                console.log(`${modalType}_error=>`, error);
            });
    };

    const handleProduct = async () => {
        switch (modalType) {
            case 'create':
                createData();
                break;
            case 'edit':
                updateData();
                break;
            case 'delete':
                deleteData();
                break;
            default:
                alert('操作失敗');
        }
    };

    const handleImagesInput = (e, index) => {
        const { value } = e.target;
        const newImagesList = [...templateData.imagesUrl];
        newImagesList[index] = value;

        setTemplateData({ ...templateData, imagesUrl: newImagesList });
    };

    const handleAddImages = () => {
        const newImagesList = [...templateData.imagesUrl, ''];

        setTemplateData({ ...templateData, imagesUrl: newImagesList });
    };

    const handleRemoveImages = () => {
        const newImagesList = [...templateData.imagesUrl];
        newImagesList.pop();

        setTemplateData({ ...templateData, imagesUrl: newImagesList });
    };

    useEffect(() => {
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)reactToken\s*\=\s*([^;]*).*$)|^.*$/,
            '$1'
        );
        axios.defaults.headers.common.Authorization = token;

        getProductList();
    }, []);

    if (isLoading) {
        return <Loading status={isLoading} />;
    }

    return (
        <>
            <div className="container-fluid my-3">
                <div className="d-flex justify-content-between align-items-center my-4 sticky-md-top">
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
                />
            </div>
            <ProductModal
                modalRef={modalRef}
                modalType={modalType}
                closeModal={closeModal}
                templateData={templateData}
                setTemplateData={setTemplateData}
                handleModalInputChange={handleModalInputChange}
                handleProduct={handleProduct}
                handleImagesInput={handleImagesInput}
                handleAddImages={handleAddImages}
                handleRemoveImages={handleRemoveImages}
            />
        </>
    );
}

export default Products;
