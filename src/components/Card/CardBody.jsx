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

export default CardBody;
