import './Card.css';

function Card(props) {
    return (
        <div className='card-body'>
            <div className='card-title'>{props.cardTitle || '<Card Title>'}</div>
            <br />
            <div className='card-content'>{props.cardText || '<Card Content>'}</div>
        </div>
    )
}

export default Card;