import './ApplicationBody.css'

import Card from './Card';

function ApplicationBody() {

    return (
        <div className='body'>
            <Card cardTitle={'Sample Card'} cardText={'Sample text for sample card...'}></Card>
        </div>
    )
}

export default ApplicationBody;