import PropTypes from 'prop-types';

import styles from './InputBox.module.css';

const InputBox = ({ label, labelStyle, fieldStyle, isInvalid, type, value, changeHandler }) => {
    return (
        <div>
            <div className={styles['input-label']} style={labelStyle}>{label}</div>
            <input className={styles['input-field'] + (isInvalid ? ` ${styles['not-valid']}` : '')} style={fieldStyle}
                type={type ? type : 'text'} value={value} onChange={changeHandler}></input>
        </div>
    );
};

InputBox.propTypes = {
    label: PropTypes.string.isRequired,
    labelStyle: PropTypes.object,
    fieldStyle: PropTypes.object,
    isInvalid: PropTypes.bool,
    type: PropTypes.oneOf(['text', 'password']),
    value: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired
};

export default InputBox;
