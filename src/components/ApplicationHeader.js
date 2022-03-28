import logo from '../logo.svg'
import './ApplicationHeader.css';

const ApplicationHeader = (props) => (
    <div className='header'>
        <div className='header-title-label-wr'>
            <div className='header-title-label'>{props.titleLabel || '<App Title>'}</div>
        </div>
        <div className='header-title-spacer'></div>
        <div>
            <img src={logo} className='header-img-logo' alt="logo" />
        </div>
    </div>
);

export default ApplicationHeader;
