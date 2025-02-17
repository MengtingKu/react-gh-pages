import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePreviousDistinct } from 'react-use';
import { useDispatch } from 'react-redux';

import ReactLoading from 'react-loading';
import useProductApi from '@hook/front/useProductApi';
import useCartApi from '@hook/front/useCartApi';
import { createAsyncMessage } from '@slice/messageSlice';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, getProductById, productDetail } = useProductApi();
    const prevId = usePreviousDistinct(id);
    const [selectItemNum, setSelectItemNum] = useState(1);
    const { isCartLoading, postCart, message } = useCartApi();

    useEffect(() => {
        if (id && id !== prevId) {
            getProductById(id);
        }
    }, [id, getProductById, prevId]);

    useEffect(() => {
        if (message) {
            dispatch(createAsyncMessage(message));
        }
    }, [message, dispatch]);

    return (
        <div
            style={
                isLoading
                    ? { width: '100vw', height: '100vh', overflow: 'hidden' }
                    : {}
            }
        >
            {/* 全面 loading */}
            {isLoading ? (
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
            ) : (
                <>
                    <div className="container-fluid my-5">
                        <div className="row">
                            <div className="col-md-6">
                                <img
                                    className="rounded img-fluid shadow-lg"
                                    src={productDetail?.imageUrl}
                                    alt={productDetail?.title}
                                />
                            </div>
                            <div className="col-md-6 d-flex flex-column justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                    <h2>{productDetail?.title}</h2>
                                    <span className="badge text-bg-success">
                                        {productDetail?.category}
                                    </span>
                                </div>

                                <p>內容：{productDetail?.content}</p>
                                <p>描述：{productDetail?.description}</p>
                                <p>
                                    價錢：{productDetail?.price}
                                    <small className="ms-3 text-decoration-line-through">
                                        原價：{productDetail?.origin_price}
                                    </small>
                                </p>

                                <div className="d-flex justify-content-between">
                                    <div className="input-group align-items-center w-75">
                                        <select
                                            value={selectItemNum}
                                            onChange={e =>
                                                setSelectItemNum(
                                                    Number(e.target.value)
                                                )
                                            }
                                            id="qtySelect"
                                            className="form-select"
                                        >
                                            {new Array(10)
                                                .fill(0)
                                                .map((_, index) => index + 1)
                                                .map(val => (
                                                    <option
                                                        key={val}
                                                        value={val}
                                                    >
                                                        {val}{' '}
                                                        {productDetail?.unit}
                                                    </option>
                                                ))}
                                        </select>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() =>
                                                postCart(
                                                    productDetail?.id,
                                                    selectItemNum
                                                )
                                            }
                                            disabled={isCartLoading}
                                        >
                                            加入購物車
                                            {isCartLoading && (
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
                                    <button
                                        type="button"
                                        className="d-inline-block btn btn-sm btn-outline-primary me-2"
                                        onClick={() => navigate(-1)}
                                    >
                                        回上一頁
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductDetailPage;
