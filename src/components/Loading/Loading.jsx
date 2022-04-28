import styles from './Loading.module.css';


const Loading = ({ isLoading, isSkeletonLoader, ...props }) => {

    /* isSkeletonLoader requires containing element to have 'position' fixed or absolute */

    return (
        <>
            {!isLoading ? props.children : <div className={isSkeletonLoader ? styles['skeleton'] : styles['loader']}></div>}
        </>
    );
};

export default Loading;