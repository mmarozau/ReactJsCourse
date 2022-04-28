import React, { useEffect } from 'react'; // trying useState without destructuring from React
// import { useState } from 'react';

import styles from './Card.module.css';

import CardHeader from './CardHeader';
import CardBody from './CardBody';

import Loading from '../Loading/Loading';


const Card = ({ isViewMode, onUpdateCardData, ...cardInfo }) => {

    const { id, cardTitle, cardText, isSelected, isEditMode, isLoading } = cardInfo;

    const [title, setTitle] = React.useState(cardTitle);
    const [text, setText] = React.useState(cardText);

    const [inputTitle, setInputTitle] = React.useState('');
    const [inputText, setInputText] = React.useState('');


    const selectCardHandler = () => {
        onUpdateCardData({ ...cardInfo, isSelected: !isSelected })
    }
    const inputTitleHandler = (event) => {
        setInputTitle(event.target.value);
    }
    const inputTextHandler = (event) => {
        setInputText(event.target.value);
    }

    const editModeEnable = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        setInputTitle(title);
        setInputText(text);
        onUpdateCardData({ ...cardInfo, isEditMode: true, isSelected: false });
    }

    const saveChanges = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        setTitle(inputTitle);
        setText(inputText);
        onUpdateCardData({ ...cardInfo, isEditMode: false });
    }
    const discardChanges = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        onUpdateCardData({ ...cardInfo, isEditMode: false });
    }

    useEffect(() => {
        setTimeout(() => { onUpdateCardData({ ...cardInfo, isLoading: false }) }, 2000);
    }, []);

    return (
        <div className={`${styles['card-body']} ${isSelected ? styles['selected'] : ''}`}>
            <Loading isLoading={isLoading} isSkeletonLoader={true}>
                <CardHeader title={title} inputTitle={inputTitle} isEditMode={isEditMode} isSelected={isSelected}
                    isViewMode={isViewMode}
                    onTitleInput={inputTitleHandler} onSelect={selectCardHandler} onEditModeEnable={editModeEnable}
                    onSave={saveChanges} onDiscard={discardChanges} />
                <br />
                <CardBody text={text} inputText={inputText} isEditMode={isEditMode} onTextInput={inputTextHandler} />
            </Loading>
        </div>
    );
};

export default React.memo(Card);
