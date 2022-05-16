import styles from './Tag.module.css';

const Tag = (props) => (
    <div className={`${styles['tag']} ${styles[`tag--${props.type}`]}`}>
        {props.label}
    </div>
);

export default Tag;