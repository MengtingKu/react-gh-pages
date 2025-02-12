import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import useOrderApi from '@hook/fontEnd/useOrderApi';

const OrderForm = ({ refreshCart }) => {
    const { postOrder } = useOrderApi();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = handleSubmit(async data => {
        const { message, ...user } = data;

        await postOrder(user, message);
        await refreshCart();
        reset();
    });

    return (
        <form onSubmit={onSubmit} className="col-md-6">
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input
                    {...register('email', {
                        required: 'Email 欄位必填',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Email 格式錯誤',
                        },
                    })}
                    id="email"
                    type="email"
                    className={`form-control ${errors.email && 'is-invalid'}`}
                    placeholder="請輸入 Email"
                />
                {errors.email && (
                    <small className="text-danger my-2 d-block">
                        {errors.email.message}
                    </small>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    收件人姓名
                </label>
                <input
                    {...register('name', {
                        required: '請輸入收件人姓名',
                    })}
                    id="name"
                    type="text"
                    className={`form-control ${errors.name && 'is-invalid'}`}
                    placeholder="請輸入姓名"
                />
                {errors.name && (
                    <small className="text-danger my-2 d-block">
                        {errors.name.message}
                    </small>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="tel" className="form-label">
                    收件人電話
                </label>
                <input
                    {...register('tel', {
                        required: 'tel 欄位必填',
                        pattern: {
                            value: /^(0[2-8]\d{7}|09\d{8})$/,
                            message: '電話號碼格式錯誤',
                        },
                    })}
                    id="tel"
                    type="tel"
                    className={`form-control ${errors.tel && 'is-invalid'}`}
                    placeholder="請輸入手機電話"
                />
                {errors.tel && (
                    <small className="text-danger my-2 d-block">
                        {errors.tel.message}
                    </small>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="address" className="form-label">
                    收件人地址
                </label>
                <input
                    {...register('address', {
                        required: 'address 欄位必填',
                    })}
                    id="address"
                    type="text"
                    className={`form-control ${errors.address && 'is-invalid'}`}
                    placeholder="請輸入地址"
                />
                {errors.address && (
                    <small className="text-danger my-2 d-block">
                        {errors.address.message}
                    </small>
                )}
            </div>

            <div className="mb-3">
                <label htmlFor="message" className="form-label">
                    留言
                </label>
                <textarea
                    {...register('message')}
                    id="message"
                    className="form-control"
                    cols="30"
                    rows="10"
                ></textarea>
            </div>
            <div className="text-end">
                <button type="submit" className="btn btn-danger">
                    送出訂單
                </button>
            </div>
        </form>
    );
};

OrderForm.propTypes = {
    refreshCart: PropTypes.func,
};

export default OrderForm;
