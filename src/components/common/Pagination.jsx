import PropTypes from 'prop-types';
import useAdminProductApi from '@hook/useAdminProductApi';
import { useState, useEffect, useCallback } from 'react';

const Pagination = ({ pagination, setProducts }) => {
    const [pickPage, setPickPage] = useState(1);
    const { getProductList } = useAdminProductApi();

    const handlePageChange = async page => {
        if (page < 1 || page > pagination.total_pages) return;
        const data = await getProductList(page);
        setProducts(data.products);
        setPickPage(page);
    };

    const updateActivePage = useCallback(() => {
        document.querySelectorAll('.page-item').forEach(page => {
            page.classList.remove('active');
        });

        const activePage = document.querySelector(
            `.page-item[data-page="${pickPage}"]`
        );
        if (activePage) {
            activePage.classList.add('active');
        }
    }, [pickPage]);

    useEffect(() => {
        updateActivePage();
    }, [pickPage, updateActivePage]);

    const pageItem = () => {
        return new Array(pagination.total_pages).fill(0).map((_, index) => {
            const pageNumber = index + 1;
            return (
                <>
                    <li
                        className="page-item"
                        data-page={pageNumber}
                        key={pageNumber}
                    >
                        <a
                            className="page-link"
                            href="#"
                            onClick={() =>
                                pagination.has_next &&
                                handlePageChange(pageNumber)
                            }
                        >
                            {pageNumber}
                        </a>
                    </li>
                </>
            );
        });
    };

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination pagination-sm d-flex justify-content-end">
                    <li className="page-item">
                        <a
                            className={`page-link ${pickPage === 1 && 'disabled'}`}
                            href="#"
                            aria-label="Previous"
                            onClick={() =>
                                handlePageChange(pickPage - 1)
                            }
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {pageItem()}
                    <li className="page-item">
                        <a
                            className={`page-link ${pickPage === pagination.total_pages && 'disabled'}`}
                            href="#"
                            aria-label="Next"
                            onClick={() =>
                                
                                handlePageChange(pickPage + 1)
                            }
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

Pagination.propTypes = {
    pagination: PropTypes.object,
    setProducts: PropTypes.func,
};

export default Pagination;
