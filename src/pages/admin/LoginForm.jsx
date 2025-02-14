import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '@components/common/Loading';

const { VITE_BASE_URL: baseUrl } = import.meta.env;

const LoginForm = ({ setIsAuth }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [account, setAccount] = useState({
        username: '',
        password: '',
    });
    const navigate = useNavigate();

    const btnDisabled = !account.username || !account.password;

    const handleInputChange = e => {
        const { name, value } = e.target;
        setAccount({
            ...account,
            [name]: value,
        });
    };

    const handleLogin = async e => {
        e.preventDefault();
        const url = `${baseUrl}/admin/signin`;
        setIsLoading(true);

        try {
            const res = await axios.post(url, account);
            const { expired, token } = res.data;
            document.cookie = `reactToken=${token}; expires=${new Date(
                expired
            )}`;
            axios.defaults.headers.common.Authorization = token;

            setIsAuth(true);
            navigate('/admin/product-list');
        } catch (error) {
            alert(error?.response.data.error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loading status={isLoading} />;
    }

    return (
        <>
            <div className="login_form">
                <div className="login">
                    <form onSubmit={handleLogin} className="form ">
                        <h2 className="login_title">後台管理者登入系統</h2>
                        <div className="form_group">
                            <label htmlFor="username" className="form-label">
                                帳號 UserName
                            </label>
                            <input
                                type="email"
                                className="form-control form_input"
                                id="username"
                                name="username"
                                placeholder="example@test.com"
                                value={account.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form_group">
                            <label htmlFor="password" className="form-label">
                                密碼 Password
                            </label>
                            <input
                                type="password"
                                className="form-control form_input"
                                id="password"
                                name="password"
                                placeholder="password"
                                value={account.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm"
                                disabled={btnDisabled}
                            >
                                登入
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                            >
                                取消
                            </button>
                        </div>
                        <small className={btnDisabled ? 'd-block' : 'd-none'}>
                            請輸入帳號密碼
                        </small>
                    </form>
                </div>
            </div>
        </>
    );
};

LoginForm.propTypes = {
    setIsAuth: PropTypes.func.isRequired,
};

export default LoginForm;
