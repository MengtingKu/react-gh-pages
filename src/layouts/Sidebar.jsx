import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const navigate = useNavigate();

    const sidebarItems = [
        {
            key: 'sidebarToggle',
            icon: 'angle-left',
            tooltip: 'Hide',
            onClick: () => setIsOpenSidebar(!isOpenSidebar),
            isToggle: true,
            className: 'button_trigger transform_btn',
        },
        {
            key: 'productPage',
            path: '/admin/products',
            icon: 'circle-info',
            tooltip: '產品明細',
            onClick: () => {
                setIsOpenSidebar(false);
            },
            isToggle: false,
            className: 'sidebar_item',
        },
        {
            key: 'productList',
            path: '/admin/product-list',
            icon: 'table-list',
            tooltip: '產品列表',
            onClick: () => {
                setIsOpenSidebar(false);
            },
            isToggle: false,
            className: 'sidebar_item',
        },
        {
            key: 'logout',
            icon: 'right-from-bracket',
            tooltip: '登出',
            onClick: () => {
                document.cookie =
                    'reactToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                navigate('/');
            },
            isToggle: false,
            className: 'sidebar_item mb-3 transform_btn',
        },
    ];

    useEffect(() => {
        const sidebarElement = document.querySelector('.fixed_sidebar');
        const buttonTrigger = document.querySelector('.button_trigger');

        if (isOpenSidebar) {
            sidebarElement.classList.remove('active');
            buttonTrigger.classList.remove('active');
        } else {
            sidebarElement.classList.add('active');
            buttonTrigger.classList.add('active');
        }
    }, [isOpenSidebar]);

    return (
        <aside className="sidebar">
            <ul className="fixed_sidebar">
                {sidebarItems.map(item => {
                    return (
                        <li
                            key={item.key}
                            className={item.className}
                            data-tooltip={item.tooltip}
                            onClick={item.onClick}
                        >
                            {item.path ? (
                                <NavLink
                                    className={({ isActive }) => {
                                        return `nav-link ${
                                            isActive ? 'active' : ''
                                        }`;
                                    }}
                                    to={item.path}
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                </NavLink>
                            ) : (
                                <FontAwesomeIcon icon={item.icon} />
                            )}
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;
