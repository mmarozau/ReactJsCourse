import PropTypes from 'prop-types';

import styles from './Tag.module.css';

const Tag = (props) => (
    <div className={`${styles['tag']} ${styles[`tag--${props.type}`]}`}>
        {props.label}
    </div>
);

Tag.propTypes = {
    label: PropTypes.string.isRequired
};

export default Tag;
