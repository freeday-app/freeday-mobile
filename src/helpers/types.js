import PropTypes from 'prop-types';

export default {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string
    ]),
    theme: PropTypes.exact({
        fonts: PropTypes.object,
        animation: PropTypes.object,
        dark: PropTypes.bool,
        roundness: PropTypes.number,
        mode: PropTypes.string,
        colors: PropTypes.object
    })
};
