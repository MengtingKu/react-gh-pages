function ProductTable({ tableHeader, products, openModal }) {
    return (
        <>
            <table className="table table-striped table-hover table-sm">
                <thead>
                    <tr className="text-center">
                        {tableHeader.map(header => (
                            <th scope="col" key={header}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map(item => (
                        <tr key={item.id} className="align-middle">
                            <th scope="row" width="40%">{item.title}</th>
                            <th className="text-center"><img src={item.imageUrl} height="50%" width="50%" style={{objectFit: "cover"}}></img></th>
                            <td className="text-end" width="10%">{`${item.origin_price.toLocaleString()}`}</td>
                            <td className="text-end" width="10%">{`${item.price.toLocaleString()}`}</td>
                            <td className="text-center" width="10%">
                                {item.is_enabled ? (
                                    <span className="text-success">啟用</span>
                                ) : (
                                    <span>未啟用</span>
                                )}
                            </td>
                            <td className="text-center" width="10%">
                                <div
                                    className="btn-group btn-group-sm"
                                    role="group"
                                    aria-label="Small button group"
                                >
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() => openModal(item, 'edit')}
                                    >
                                        編輯
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={() =>
                                            openModal(item, 'delete')
                                        }
                                    >
                                        刪除
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ProductTable;
