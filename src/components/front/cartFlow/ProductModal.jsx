import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';

const ProductModal = ({
    product,
    isOpenModal,
    setIsOpenModal,
    action,
    loading,
}) => {
    const modalRef = useRef(null);
    const modalInstance = useRef(null);

    const [selectItemNum, setSelectItemNum] = useState(1);

    useEffect(() => {
        modalInstance.current = new Modal(modalRef.current, {
            backdrop: false,
        });

        if (isOpenModal) {
            modalInstance.current.show();
        } else {
            modalInstance.current.hide();
        }

        return () => {
            if (modalInstance.current) {
                modalInstance.current.dispose();
            }
        };
    }, [isOpenModal]);

    const handleAddToCart = async () => {
        await action(product.id, selectItemNum);
        modalInstance.current.hide();
        setIsOpenModal(false);
        setSelectItemNum(1);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    return (
        <div
            ref={modalRef}
            className="modal"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            產品名稱：{product.title}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => closeModal()}
                        />
                    </div>
                    <div className="modal-body">
                        <img
                            className="img-fluid"
                            src={product.imageUrl}
                            alt={product.title}
                        />
                        <p>內容：{product.content}</p>
                        <p>描述：{product.description}</p>
                        <p>
                            價錢：{product.price}
                            <small className="ms-3 text-decoration-line-through">
                                原價：{product.origin_price}
                            </small>
                        </p>

                        <p>
                            數量：
                            <select
                                className="form-select form-select-sm"
                                value={selectItemNum}
                                onChange={e =>
                                    setSelectItemNum(Number(e.target.value))
                                }
                            >
                                {new Array(10)
                                    .fill(0)
                                    .map((_, index) => index + 1)
                                    .map(val => (
                                        <option key={val} value={val}>
                                            {val} {product.product_unit}
                                        </option>
                                    ))}
                            </select>
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => closeModal()}
                            disabled={loading}
                        >
                            取消
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddToCart}
                            disabled={loading}
                        >
                            加入購物車{' '}
                            {loading && (
                                <span className="d-inline-flex align-items-center ms-2">
                                    <ReactLoading
                                        type="spin"
                                        color="white"
                                        height={'1rem'}
                                        width={'1rem'}
                                    />
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductModal.propTypes = {
    product: PropTypes.object,
    isOpenModal: PropTypes.bool,
    setIsOpenModal: PropTypes.func,
    action: PropTypes.func,
    loading: PropTypes.bool,
};

export default ProductModal;
