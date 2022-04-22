import styles from './ModalButton.module.css';

const ModalButton = ({ onButton, children }) => {
    return (
        <div className={styles['button-wrp']}>
            <div className={styles['button']} onClick={onButton} tabIndex="0">
                <div className={styles['button-label']}>{children}</div>
            </div>
        </div>
    );
};

export default ModalButton;