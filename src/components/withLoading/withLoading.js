import React from 'react';
import PropTypes from 'prop-types';

import styles from './withLoading.module.css';

const withLoading = (Component, width, height) => {

    return (props) => {
        const [isLoading, setIsLoading] = React.useState(true);

        React.useEffect(() => {
            setTimeout(() => { setIsLoading(false); }, 2000);
        }, []);

        return (
            <>
                {!isLoading ?
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
    }
};

withLoading.propTypes = {
    Component: PropTypes.elementType.isRequired,
    width: PropTypes.string,
    height: PropTypes.string
};

export default withLoading;
