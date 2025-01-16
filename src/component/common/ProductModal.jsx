const modalTitles = {
    delete: '刪除',
    edit: '編輯',
    create: '新增',
};

const maxOfImages = 5;
const minOfImages = 1;

function ProductModal({
    modalRef,
    modalType,
    closeModal,
    templateData,
    handleModalInputChange,
    handleProduct,
    handleImagesInput,
    handleAddImages,
    handleRemoveImages,
}) {
    const renderContent = () => {
        if (modalType === 'delete') {
            return (
                <>
                    你是否要刪除
                    <span className="text-danger fw-bold ms-3">
                        {templateData.title}
                    </span>
                </>
            );
        } else {
            return (
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="mb-4">
                            <label htmlFor="imageUrl" className="form-label">
                                主圖
                            </label>
                            <div className="input-group">
                                <input
                                    name="imageUrl"
                                    type="text"
                                    id="imageUrl"
                                    className="form-control"
                                    placeholder="請輸入圖片連結"
                                    defaultValue={templateData.imageUrl}
                                    onChange={handleModalInputChange}
                                />
                            </div>
                            <img
                                src={templateData.imageUrl}
                                alt={templateData.title}
                                className="img-fluid"
                            />
                        </div>
                        <div className="border border-2 border-dashed rounded-3 p-3">
                            {templateData?.imagesUrl?.map((image, index) => (
                                <div key={index} className="mb-2">
                                    <label
                                        htmlFor={`imagesUrl-${index + 1}`}
                                        className="form-label"
                                    >
                                        副圖 {index + 1}
                                    </label>
                                    <input
                                        value={image}
                                        onChange={e =>
                                            handleImagesInput(e, index)
                                        }
                                        id={`imagesUrl-${index + 1}`}
                                        type="text"
                                        placeholder={`圖片網址 ${index + 1}`}
                                        className="form-control mb-2"
                                    />
                                    {image && (
                                        <img
                                            src={image}
                                            alt={`副圖 ${index + 1}`}
                                            className="img-fluid mb-2"
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="btn-group w-100">
                                {templateData?.imagesUrl.length < maxOfImages &&
                                    templateData?.imagesUrl[
                                        templateData?.imagesUrl.length - 1
                                    ] !== '' && (
                                        <button
                                            className="btn btn-outline-primary btn-sm w-100"
                                            onClick={handleAddImages}
                                        >
                                            新增圖片
                                        </button>
                                    )}
                                {templateData?.imagesUrl.length >
                                    minOfImages && (
                                    <button
                                        className="btn btn-outline-danger btn-sm w-100"
                                        onClick={handleRemoveImages}
                                    >
                                        移除圖片
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                標題
                            </label>
                            <input
                                name="title"
                                id="title"
                                type="text"
                                className="form-control"
                                placeholder="請輸入標題"
                                defaultValue={templateData.title}
                                onChange={handleModalInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                分類
                            </label>
                            <input
                                name="category"
                                id="category"
                                type="text"
                                className="form-control"
                                placeholder="請輸入分類"
                                defaultValue={templateData.category}
                                onChange={handleModalInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="unit" className="form-label">
                                單位
                            </label>
                            <input
                                name="unit"
                                id="unit"
                                type="text"
                                className="form-control"
                                placeholder="請輸入單位"
                                defaultValue={templateData.unit}
                                onChange={handleModalInputChange}
                            />
                        </div>

                        <div className="row g-3 mb-3">
                            <div className="col-6">
                                <label
                                    htmlFor="origin_price"
                                    className="form-label"
                                >
                                    原價
                                </label>
                                <input
                                    name="origin_price"
                                    id="origin_price"
                                    type="number"
                                    className="form-control"
                                    placeholder="請輸入原價"
                                    defaultValue={templateData.origin_price}
                                    onChange={handleModalInputChange}
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="price" className="form-label">
                                    售價
                                </label>
                                <input
                                    name="price"
                                    id="price"
                                    type="number"
                                    className="form-control"
                                    placeholder="請輸入售價"
                                    defaultValue={templateData.price}
                                    onChange={handleModalInputChange}
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                產品描述
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                className="form-control"
                                rows={4}
                                placeholder="請輸入產品描述"
                                defaultValue={templateData.description}
                                onChange={handleModalInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">
                                說明內容
                            </label>
                            <textarea
                                name="content"
                                id="content"
                                className="form-control"
                                rows={4}
                                placeholder="請輸入說明內容"
                                defaultValue={templateData.content}
                                onChange={handleModalInputChange}
                            />
                        </div>

                        <div className="form-check">
                            <input
                                name="is_enabled"
                                type="checkbox"
                                className="form-check-input"
                                id="is_enabled"
                                defaultChecked={templateData.is_enabled}
                                onChange={handleModalInputChange}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="is_enabled"
                            >
                                是否啟用
                            </label>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            <div
                ref={modalRef}
                className="modal"
                tabIndex="-1"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header border-bottom">
                            <h5 className="modal-title fs-4">
                                {modalTitles[modalType]}商品
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={closeModal}
                            ></button>
                        </div>
                        <div className="modal-body p-4">{renderContent()}</div>
                        <div className="modal-footer border-top bg-light">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                data-bs-dismiss="modal"
                                onClick={closeModal}
                            >
                                取消
                            </button>
                            <button
                                type="button"
                                className={
                                    modalType === 'delete'
                                        ? 'btn btn-danger'
                                        : 'btn btn-primary'
                                }
                                onClick={() => handleProduct(templateData.id)}
                            >
                                確認{modalTitles[modalType]}商品
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductModal;
