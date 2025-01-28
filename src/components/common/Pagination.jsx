import PropTypes from 'prop-types';
import useProductApi from '@hook/admin/useProductApi';
import { useState } from 'react';

const Pagination = ({ pagination, setPagination, setProducts }) => {
    const [loading, setLoading] = useState(false);
    const { getProductList } = useProductApi();

    const handlePageChange = async (page, e) => {
        e.preventDefault();
        if (page < 1 || page > pagination.total_pages || loading) return;

        setLoading(true);
        const data = await getProductList(page);
        setProducts(data.products);
        setPagination(data.pagination);

        setLoading(false);
    };

    const pageItem = () => {
        return new Array(pagination.total_pages).fill(0).map((_, index) => {
            const pageNumber = index + 1;
            return (
                <li
                    className={`page-item ${
                        index + 1 === pagination.current_page && 'active'
                    }`}
                    data-page={pageNumber}
                    key={pageNumber}
                >
                    <a
                        className="page-link"
                        href="#"
                        onClick={e =>
                            pagination.has_next &&
                            handlePageChange(pageNumber, e)
                        }
                    >
                        {pageNumber}
                    </a>
                </li>
            );
        });
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination pagination-sm d-flex justify-content-end">
                <li className="page-item">
                    <a
                        className={`page-link ${
                            pagination.has_pre && !loading ? '' : 'disabled'
                        }`}
                        href="#"
                        aria-label="Previous"
                        onClick={e =>
                            handlePageChange(pagination.current_page - 1, e)
                        }
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pageItem()}
                <li className="page-item">
                    <a
                        className={`page-link ${
                            pagination.has_next && !loading ? '' : 'disabled'
                        }`}
                        href="#"
                        aria-label="Next"
                        onClick={e =>
                            handlePageChange(pagination.current_page + 1, e)
                        }
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    pagination: PropTypes.object,
    setPagination: PropTypes.func,
    setProducts: PropTypes.func,
};

export default Pagination;
