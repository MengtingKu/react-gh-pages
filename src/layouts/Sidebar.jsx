import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const [path, setPath] = useState('/admin/products');

    const sidebarItems = [
        {
            key: 'sidebarToggle',
            path: { path },
            icon: 'angle-left',
            tooltip: 'Hide',
            onClick: () => setIsOpenSidebar(!isOpenSidebar),
            isToggle: true,
            className: 'buttonTrigger',
        },
        {
            key: 'productPage',
            path: '/admin/products',
            icon: 'circle-info',
            tooltip: '產品明細',
            onClick: () => {
                setPath('/admin/products');
                setIsOpenSidebar(false);
            },
            isToggle: false,
            className: 'sidebarItem',
        },
        {
            key: 'productList',
            path: '/admin/product-list',
            icon: 'table-list',
            tooltip: '產品列表',
            onClick: () => {
                setPath('/admin/product-list');
                setIsOpenSidebar(false);
            },
            isToggle: false,
            className: 'sidebarItem',
        },
        {
            key: 'logout',
            path: '/',
            icon: 'right-from-bracket',
            tooltip: '登出',
            onClick: () => {
                document.cookie =
                    'reactToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            },
            isToggle: false,
            className: 'sidebarItem mb-3',
        },
    ];

    useEffect(() => {
        const sidebarElement = document.querySelector('.fixedSidebar');
        const buttonTrigger = document.querySelector('.buttonTrigger');

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
            <ul className="fixedSidebar">
                {/* <li className="buttonTrigger" data-tooltip='Hide'></li> */}
                {sidebarItems.map(item => {
                    return (
                        <li
                            key={item.key}
                            className={item.className}
                            data-tooltip={item.tooltip}
                            onClick={item.onClick}
                        >
                            {item.key === 'sidebarToggle' ? (
                                <FontAwesomeIcon icon={item.icon} />
                            ) : (
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
                            )}
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;
