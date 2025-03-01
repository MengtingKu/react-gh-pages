import { useEffect } from 'react';
import ReactLoading from 'react-loading';
import { useDispatch } from 'react-redux';

import useCartApi from '@hook/front/useCartApi';
import DynamicTable from '@components/common/DynamicTable';
import OrderForm from '@components/front/cartFlow/OrderForm';
import { createAsyncMessage } from '@slice/messageSlice';

const CartsPage = () => {
    const {
        isCartLoading,
        cart,
        getCart,
        putCartItem,
        deleteCartItem,
        deleteCarts,
        message,
    } = useCartApi();
    const dispatch = useDispatch();

    const cartFields = [
        {
            key: 'product_title',
            name: '品名',
            class: 'text-start',
            type: 'text',
        },
        {
            key: 'qty, product_unit',
            name: '數量/單位',
            class: 'text-end',
            type: 'custom',
            width: '150px',
            render: cart => {
                return (
                    <div className="d-flex align-items-center">
                        <div
                            className="btn-group btn-group-sm me-2 "
                            role="group"
                        >
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    updateItemQty(cart, cart.qty - 1)
                                }
                                disabled={cart.qty === 1 || isCartLoading}
                            >
                                -
                            </button>
                            <span
                                className="btn border border-secondary"
                                style={{ width: '50px', cursor: 'auto' }}
                            >
                                {cart.qty}
                            </span>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    updateItemQty(cart, cart.qty + 1)
                                }
                                disabled={isCartLoading}
                            >
                                +
                            </button>
                            <span className="input-group-text bg-transparent border-0">
                                {cart.product_unit}
                            </span>
                        </div>
                    </div>
                );
            },
        },
        {
            key: 'product_price',
            name: '單價',
            class: 'text-end',
            type: 'number',
        },
        {
            key: 'total',
            name: '總價',
            class: 'text-end',
            type: 'number',
        },
    ];
    const cartTableFooter = () => {
        return (
            <tfoot>
                <tr>
                    <td colSpan="3" className="text-end">
                        總計
                    </td>
                    <td className="text-end">
                        {cart.total && cart.total.toLocaleString()}
                    </td>
                </tr>
                <tr>
                    <td colSpan="3" className="text-end text-success">
                        折扣價
                    </td>
                    <td className="text-end text-success">
                        {cart.final_total && cart.final_total.toLocaleString()}
                    </td>
                </tr>
            </tfoot>
        );
    };
    const cartActions = [
        {
            label: 'x',
            class: 'btn btn-outline-danger btn-sm',
            handler: async cart => {
                await deleteCartItem(cart.id);
            },
        },
    ];

    const updateItemQty = async (cart, qty) => {
        await putCartItem(cart.id, cart.product_id, Number(qty));
    };
    const clearCart = async () => await deleteCarts();

    useEffect(() => {
        const fetchCart = async () => {
            await getCart();
        };

        fetchCart();
    }, [getCart]);

    useEffect(() => {
        if (message) {
            dispatch(createAsyncMessage(message));
        }
    }, [message, dispatch]);

    return (
        <div
            className="container"
            style={
                isCartLoading
                    ? {
                          width: '100vw',
                          height: '100vh',
                          overflow: 'hidden',
                      }
                    : {}
            }
        >
            {/* 全面 loading */}
            {isCartLoading && (
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
            {/* 訂單列表 */}
            {cart.total === 0 ? (
                <div className="text-center my-3">
                    <img
                        src="/emptyCart.webp"
                        alt="空購物車"
                        className="img-fluid"
                    />
                    <p>你的購物車目前是空的</p>
                </div>
            ) : (
                <>
                    <div className="text-end my-3">
                        <button
                            className="btn btn-outline-danger"
                            type="button"
                            onClick={clearCart}
                            disabled={isCartLoading}
                        >
                            清空購物車
                        </button>
                    </div>
                    <DynamicTable
                        data={cart.carts || []}
                        fields={cartFields}
                        endActions={cartActions}
                        tFooter={cartTableFooter()}
                    />

                    {/* 訂購人資料填寫 */}
                    <div className="my-5 row justify-content-center">
                        <OrderForm refreshCart={getCart} />
                    </div>
                </>
            )}
        </div>
    );
};

export default CartsPage;
