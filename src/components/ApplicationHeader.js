import logo from '../logo.svg'
import './ApplicationHeader.css';

function ApplicationHeader(props) {
    const titleLabel = props.titleLabel || '<App Title>';

    return (
        <div className='header'>
            <div className='header-title-label-wr'>
                <div className='header-title-label'>{titleLabel}</div>
            </div>
            <div className='header-title-spacer'></div>
            <div>
                <img src={logo} className='header-img-logo' alt="logo" />
            </div>
            <div className='a1'></div>
        </div>
    );
}

export default ApplicationHeader;