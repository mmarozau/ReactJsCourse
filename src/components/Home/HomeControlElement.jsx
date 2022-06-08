import PropTypes from 'prop-types';

import styles from './HomeControlElement.module.css';
import styled from 'styled-components';

import Tag from '../Tag/Tag';


const PageControlCBLabel = styled.span`
    & {
        font-weight: ${(props) => props.checked ? 'bold' : 'initial'};
    }

    &::after {
        display: block;
        content: "${(props) => props.label}";
        font-weight: bold;
        height: 0px;
        color: transparent;
        overflow: hidden;
        visibility: hidden;
    }
`;


const HomeControlElement = ({ type, label, disabled, checked, handler, separator }) => {

    return (
        <>
            {separator && <div>|</div>}
            {type === 'checkbox' &&
                <div className={styles['home-control-element']}
                    onClick={handler} onKeyDown={handler} onKeyUp={handler} tabIndex="0">
                    <input type="checkbox" checked={checked} readOnly={true} tabIndex="-1" />
                    <PageControlCBLabel checked={checked} label={label}>{label}</PageControlCBLabel>
                </div>
            }
            {type === 'button' &&
                <div className={styles['home-control-element']} style={disabled ? { color: 'grey' } : {}}
                    onClick={handler} onKeyDown={handler} onKeyUp={handler} tabIndex="0">
                    {label}
                </div>
            }
            {type === 'tag' &&
                <Tag label={label} type={'high-contrast'} />
            }
        </>
    );
};

HomeControlElement.propTypes = {
    type: PropTypes.oneOf(['checkbox', 'button', 'tag']).isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    checked: PropTypes.oneOf([true, false, undefined]),
    handler: PropTypes.func
};

export default HomeControlElement;
