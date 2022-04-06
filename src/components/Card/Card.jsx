import React from 'react'; // trying useState without destructuring from React
// import { useState } from 'react';
import { AiFillEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'

import './Card.css';

const Card = (props) => {

    const [title, setTitle] = React.useState(props.cardTitle);
    const [text, setText] = React.useState(props.cardText);

    const [inputTitle, setInputTitle] = React.useState('');
    const [inputText, setInputText] = React.useState('');


    const selectCardHandler = () => {
        props.onSelectCard(props.id);
    }
    const inputTitleHandler = (event) => {
        setInputTitle(event.target.value);
    }
    const inputTextHandler = (event) => {
        setInputText(event.target.value);
    }

    const editModeEnable = () => {
        setInputTitle(title);
        setInputText(text);
        props.isSelected && props.onSelectCard(props.id, false);
        props.onEditModeChange(props.id, true);
    }

    const saveChanges = () => {
        setTitle(inputTitle);
        setText(inputText);
        props.onEditModeChange(props.id, false);
    }
    const discardChanges = () => {
        props.onEditModeChange(props.id, false);
    }

    return (
        <div className={`card-body ${props.isSelected ? 'card-body-selected' : ''}`}>
            {!props.isEditMode ? (
                // Read Mode
                <div>
                    <div className="card-title">
                        <div className="card-title-label">{title || '<Card Title>'}</div>
                        <div className="card-title-controls">
                            {!props.isViewMode && <AiFillEdit className="card-title-control-item" onClick={editModeEnable} title="Edit" />}
                            <input type="checkbox" checked={props.isSelected} onChange={selectCardHandler} />
                        </div>
                    </div>
                    <br />
                    <div className="card-content">{text || '<Card Content>'}</div>
                </div>
            ) : (
                // Edit Mode
                <div>
                    <div className="card-title">
                        <input type="text" className="input-title" value={inputTitle} onChange={inputTitleHandler} />
                        <div className="card-title-controls">
                            <AiOutlineCheck className="card-title-control-item" style={{ color: 'green' }} onClick={saveChanges} title="Save Changes" />
                            <AiOutlineClose className="card-title-control-item" style={{ color: 'red' }} onClick={discardChanges} title="Discard Changes" />
                        </div>
                    </div>
                    <br />
                    <textarea className="input-text" value={inputText} onChange={inputTextHandler}></textarea>
                </div>
            )}
        </div>
    );
};

export default Card;
