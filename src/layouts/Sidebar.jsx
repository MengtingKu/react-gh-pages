import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Sidebar = ({ setSelectedTab }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);

    const sidebarItems = [
        {
            key: 'sidebarToggle',
            icon: 'angle-left',
            tooltip: 'Hide',
            onClick: () => setIsOpenSidebar(!isOpenSidebar),
            isToggle: true,
            className: 'buttonTrigger',
        },
        {
            key: 'productPage',
            icon: 'circle-info',
            tooltip: '產品明細',
            onClick: () => {
                setSelectedTab('productPage');
                setIsOpenSidebar(false);
            },
            isToggle: false,
            className: 'sidebarItem',
        },
        {
            key: 'productList',
            icon: 'table-list',
            tooltip: '產品列表',
            onClick: () => {
                setSelectedTab('productList');
                setIsOpenSidebar(false);
            },
            isToggle: false,
            className: 'sidebarItem',
        },
        // {
        //     key: 'logout',
        //     icon: 'right-from-bracket',
        //     tooltip: '登出',
        //     onClick: () => {
        //         document.cookie =
        //             'reactToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        //     },
        //     isToggle: false,
        //     className: 'sidebarItem mb-3',
        // },
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
                {sidebarItems.map(item => {
                    return (
                        <li
                            key={item.key}
                            className={item.className}
                            data-tooltip={item.tooltip}
                            onClick={item.onClick}
                        >
                            <FontAwesomeIcon icon={item.icon} />
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

Sidebar.propTypes = {
    setSelectedTab: PropTypes.func,
};

export default Sidebar;
