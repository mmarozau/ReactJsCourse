import PropTypes from 'prop-types';

import styles from './CardBody.module.css';


const CardBody = ({ text, inputText, isEditMode, onTextInput }) => {
    return (
        <div>
            {!isEditMode ? (
                // Read Mode
                <div className={styles['card-content']}>{text || '<Card Content>'}</div>
            ) : (
                // Edit Mode
                <textarea className={styles['input-text']} value={inputText} onChange={onTextInput}></textarea>
            )}
        </div>
    );
};

CardBody.propTypes = {
    text: PropTypes.string.isRequired,
    inputText: PropTypes.string.isRequired,
    isEditMode: PropTypes.bool.isRequired,
    onTextInput: PropTypes.func.isRequired
};

export default CardBody;
