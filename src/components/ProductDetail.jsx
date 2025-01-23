import PropTypes from 'prop-types';

const ProductDetail = ({ tempProduct }) => {
    if (!tempProduct) {
        return <p className="text-secondary">請選擇一個商品查看</p>;
    }

    const {
        imageUrl,
        imagesUrl,
        title,
        category,
        content,
        origin_price,
        price,
        description,
    } = tempProduct;

    return (
        <>
            <h2>單一產品細節</h2>
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">
                        {title}
                        <span className="badge bg-primary ms-3 rounded-pill px-3">
                            {category}
                        </span>
                    </h5>
                    <p className="card-text">商品描述：{description}</p>
                    <p className="card-text">商品內容：{content}</p>
                    <div className="d-flex">
                        <p className="card-text text-secondary">
                            <del>{`${origin_price.toLocaleString()}`} 元</del>
                        </p>{' '}
                        / {`${price.toLocaleString()}`} 元
                    </div>

                    <img
                        src={imageUrl}
                        className="card-img-top img-fluid"
                        alt="主圖"
                    />

                    {imagesUrl && (
                        <div className={imagesUrl ? 'd-block' : 'd-none'}>
                            <h5 className="mt-3">更多圖片：</h5>
                            <div className="d-flex flex-wrap">
                                {imagesUrl.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        className="img-fluid my-1"
                                        alt={`${title}_${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

ProductDetail.propTypes = {
    tempProduct: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        imagesUrl: PropTypes.array,
        title: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        origin_price: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
    }),
};

export default ProductDetail;
