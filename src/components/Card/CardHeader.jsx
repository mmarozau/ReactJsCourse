import PropTypes from 'prop-types';
import { AiFillEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

import styles from './CardHeader.module.css'


const CardHeader = ({ title, inputTitle, isEditMode, isSelected, isViewMode,
    onTitleInput, onSelect, onEditModeEnable, onSave, onDiscard }) => {

    return (
        <div>
            {!isEditMode ? (
                // Read Mode
                <div className={styles['card-title']}>
                    <div className={styles['card-title-label']}>{title || '<Title>'}</div>
                    <div className={styles['card-title-controls']}>
                        {!isViewMode && <AiFillEdit className={styles['card-title-control-item']} onClick={onEditModeEnable}
                            onKeyDown={onEditModeEnable} onKeyUp={onEditModeEnable} title="Edit" tabIndex="0" />}
                        <input type="checkbox" checked={isSelected} onChange={onSelect} />
                    </div>
                </div>
            ) : (
                // Edit Mode
                <div className={styles['card-title']}>
                    <input type="text" className={styles['input-title']} value={inputTitle} onChange={onTitleInput} />
                    <div className={styles['card-title-controls']}>
                        <AiOutlineCheck className={styles['card-title-control-item']} style={{ color: 'green' }} onClick={onSave}
                            onKeyDown={onSave} onKeyUp={onSave} title="Save Changes" tabIndex="0" />
                        <AiOutlineClose className={styles['card-title-control-item']} style={{ color: 'red' }} onClick={onDiscard}
                            onKeyDown={onDiscard} onKeyUp={onDiscard} title="Discard Changes" tabIndex="0" />
                    </div>
                </div>
            )}
        </div>
    );
};

CardHeader.propTypes = {
    title: PropTypes.string.isRequired,
    inputTitle: PropTypes.string.isRequired,
    isEditMode: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isViewMode: PropTypes.bool,
    onTitleInput: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    onEditModeEnable: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDiscard: PropTypes.func.isRequired
};

export default CardHeader;
