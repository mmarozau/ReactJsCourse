import React from 'react';
import PropTypes from 'prop-types';

import styles from './HomeControlPanel.module.css';

import HomeControlElement from './HomeControlElement';


const HomeControlPanel = ({ controlsList }) => {

    return (
        <div className={styles['home-control-tab']}>
            {(controlsList && Array.isArray(controlsList) && controlsList.length > 0) && (
                controlsList.map((el, idx) =>
                    <HomeControlElement key={idx} type={el.type} label={el.label} disabled={el.disabled} checked={el.checked}
                        handler={el.handler} separator={idx !== 0} />
                )
            )}
        </div>
    );
};

HomeControlPanel.propTypes = {
    controlsList: PropTypes.arrayOf(PropTypes.exact({
        type: PropTypes.oneOf(['checkbox', 'button', 'tag']),
        label: PropTypes.string,
        disabled: PropTypes.bool,
        checked: PropTypes.oneOf([true, false, undefined]),
        handler: PropTypes.func
    }))
};

export default HomeControlPanel;
