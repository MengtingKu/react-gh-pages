import PropTypes from 'prop-types';

function Loading({ status }) {
    if (!status) return null;

    return (
        <>
            <div className="loading">
                <div className="bounce_ball me-2"></div>
                <div className="text h5">NOW LOADING...ʕ̯•͡ˑ͓•̯᷅ʔ</div>
            </div>
        </>
    );
}

Loading.propTypes = {
    status: PropTypes.bool.isRequired,
};

export default Loading;
