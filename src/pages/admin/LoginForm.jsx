import axios from 'axios';
import { useState } from 'react';
import Loading from '../../component/common/Loading';

const { VITE_BASE_URL: baseUrl } = import.meta.env;

function LoginForm({ setIsAuth }) {
    const [isLoading, setIsLoading] = useState(false);
    const [account, setAccount] = useState({
        username: '',
        password: '',
    });

    const btnDisabled = !account.username || !account.password;

    const handleInputChange = e => {
        const { name, value } = e.target;
        setAccount({
            ...account,
            [name]: value,
        });
    };

    const handleLogin = e => {
        e.preventDefault();
        const url = `${baseUrl}/admin/signin`;
        setIsLoading(true);

        axios
            .post(url, account)
            .then(res => {
                const { expired, token } = res.data;
                document.cookie = `reactToken=${token}; expires=${new Date(
                    expired
                )}`;

                setIsAuth(true);
            })
            .catch(error => {
                alert(error?.response.data.error.message);
            });
    };
    if (isLoading) {
        return <Loading status={isLoading} />;
    }

    return (
        <>
            <div className="login_container">
                <div className="login">
                    <form onSubmit={handleLogin} className="form ">
                        <h2 className="login_title">後台管理者登入系統</h2>
                        <div className="form_group">
                            <label htmlFor="username" className="form-label">
                                帳號 UserName
                            </label>
                            <input
                                type="text"
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
}

export default LoginForm;
