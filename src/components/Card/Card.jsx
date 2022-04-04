import React from 'react'; // trying useState without destructuring from React
// import { useState } from 'react';
import { AiFillEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'

import './Card.css';

const Card = (props) => {

    const [isSelected, setIsSelected] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [title, setTitle] = React.useState(props.cardTitle);
    const [text, setText] = React.useState(props.cardText);

    const [inputTitle, setInputTitle] = React.useState('');
    const [inputText, setInputText] = React.useState('');


    const selectCardHandler = () => {
        setIsSelected(!isSelected);
    }
    const inputTitleHandler = (event) => {
        setInputTitle(event.target.value)
    }
    const inputTextHandler = (event) => {
        setInputText(event.target.value);
    }

    const editModeEnable = () => {
        setInputTitle(title);
        setInputText(text);
        isSelected && setIsSelected(false);
        setIsEditMode(true);
    }

    const saveChanges = () => {
        setTitle(inputTitle);
        setText(inputText);
        setIsEditMode(false);
    }
    const discardChanges = () => {
        setIsEditMode(false);
    }

    return (
        <div className={`card-body ${isSelected ? 'card-body-selected' : ''}`}>
            <div className="card-title">
                {!isEditMode ? <div className="card-title-label">{title || '<Card Title>'}</div> :
                    <input type="text" className="input-title" value={inputTitle} onChange={inputTitleHandler} />}
                <div className="card-title-controls">
                    {!isEditMode && <AiFillEdit className="card-title-control-item" onClick={editModeEnable} title="Edit" />}
                    {!isEditMode && <input type="checkbox" checked={isSelected} onChange={selectCardHandler} />}
                    {isEditMode && <AiOutlineCheck className="card-title-control-item" style={{ color: 'green' }} onClick={saveChanges} title="Save Changes" />}
                    {isEditMode && <AiOutlineClose className="card-title-control-item" style={{ color: 'red' }} onClick={discardChanges} title="Save Changes" />}
                </div>
            </div>
            <br />
            {!isEditMode ? <div className="card-content">{text || '<Card Content>'}</div> :
                <textarea className="input-text" value={inputText} onChange={inputTextHandler}></textarea>}

        </div>
    )
};

export default Card;
