import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MessageToast = () => {
    const messages = useSelector(state => state.message);

    return (
        <div
            className="toast-container position-fixed"
            style={{ top: '15px', right: '15px' }}
        >
            {messages.map(msg => {
                return (
                    <div
                        key={msg.id}
                        className="toast show"
                        role="alert"
                        aria-live="assertive"
                        aria-atomic="true"
                        data-delay="3000"
                    >
                        <div className={`d-flex text-${msg.type}`}>
                            <div className="toast-body">
                                <FontAwesomeIcon
                                    icon={msg.icon}
                                    className="me-3"
                                />
                                {msg.text}
                            </div>
                            <button
                                type="button"
                                className="btn-close me-2 m-auto"
                                data-bs-dismiss="toast"
                                aria-label="Close"
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MessageToast;
