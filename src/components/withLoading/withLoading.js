import React from 'react';

import styles from './withLoading.module.css';

const withLoading = (Component, width, height) => {

    return (props) => (
        <>
            {!props.isLoading ?
                <Component {...props} />
                : (
                    <div style={{
                        width: `${width ? width : '120px'}`,
                        height: `${height ? height : '32px'}`,
                        position: 'relative',
                        background: '#c6c6c6'
                    }}>
                        <div className={styles['skeleton']}></div>
                    </div>
                )
            }
        </>
    );
};

export default withLoading;
