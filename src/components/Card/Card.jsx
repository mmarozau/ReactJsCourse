import React from 'react'; // trying useState without destructuring from React
// import { useState } from 'react';

import './Card.css';

const Card = (props) => {

    const [isSelected, setIsSelected] = React.useState(false);
    const [title, setTitle] = React.useState(props.cardTitle);


    const selectCardHandler = () => {
        setIsSelected(!isSelected);
    }

    return (
        <div className={`card-body ${isSelected ? 'card-body-selected' : ''}`}>
            <div className="card-title">
                <div className="card-title-label">{title || '<Card Title>'}</div>
                <input type="checkbox" checked={isSelected} onChange={selectCardHandler} />
            </div>
            <br />
            <div className="card-content">{props.cardText || '<Card Content>'}</div>
        </div>
    )
};

export default Card;
