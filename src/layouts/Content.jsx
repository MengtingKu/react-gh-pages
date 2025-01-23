import PropTypes from 'prop-types';

const Content = ({ children }) => {
    return (
        <>
            <main>{children}</main>
        </>
    );
};

Content.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Content;
