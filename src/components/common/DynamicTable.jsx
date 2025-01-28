import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

const DynamicTable = ({ data, fields, endActions, tFooter = null }) => {
    const renderTableHeader = () => {
        return fields
            .map((field, index) => <th key={index}>{field.name}</th>)
            .concat(
                endActions ? (
                    <th
                        key="actions"
                        width={endActions.length > 1 ? '25%' : '10%'}
                    />
                ) : null
            );
    };

    const renderTableRows = () => {
        return data?.map(item => (
            <tr key={item.id} className="text-center">
                {fields.map((field, index) => {
                    const renderTd = (type, value) => {
                        switch (type) {
                            case 'number':
                                return (
                                    <span>
                                        {item[field.key] &&
                                            item[field.key].toLocaleString()}
                                    </span>
                                );
                            case 'img':
                                return (
                                    <img
                                        src={value}
                                        alt={field.name}
                                        className="img-fluid"
                                    />
                                );
                            case 'custom': {
                                return <>{field.render(item)}</>;
                            }
                            default:
                                return <span>{item[field.key]}</span>;
                        }
                    };

                    return (
                        <td
                            key={index}
                            className={field.class}
                            width={field.width || 'auto'}
                        >
                            {renderTd(field.type, item[field.key] || '-')}
                        </td>
                    );
                })}

                {endActions && (
                    <td className="text-end">
                        <div className="btn-group btn-group-sm me-2">
                            {endActions.map((action, idx) => (
                                <button
                                    type="button"
                                    className={action.class}
                                    key={idx}
                                    onClick={() => action.handler(item)}
                                    disabled={
                                        action.disabled
                                            ? action.disabled(item.id)
                                            : false
                                    }
                                >
                                    {action.disabled &&
                                    action.disabled(item.id) ? (
                                        <>
                                            {action.label}
                                            <span className="d-inline-flex align-items-center ms-2">
                                                <ReactLoading
                                                    type="spin"
                                                    color="#dc3545"
                                                    height={'0.6rem'}
                                                    width={'0.6rem'}
                                                />
                                            </span>
                                        </>
                                    ) : (
                                        action.label
                                    )}
                                </button>
                            ))}
                        </div>
                    </td>
                )}
            </tr>
        ));
    };

    return (
        <div className="table-responsive">
            <table className="table table-sm table-striped table-hover align-middle">
                <thead>
                    <tr className="text-center">{renderTableHeader()}</tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
                {tFooter}
            </table>
        </div>
    );
};

DynamicTable.propTypes = {
    data: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
    endActions: PropTypes.array,
    tFooter: PropTypes.node,
};

export default DynamicTable;
