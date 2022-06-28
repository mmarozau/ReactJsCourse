import React from 'react'; // trying useState without destructuring from React
// import { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Card.module.css';

import CardHeader from './CardHeader';
import CardBody from './CardBody';

import withLoading from '../withLoading/withLoading';


const Card = ({ isViewMode, onUpdateCardData, ...cardInfo }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const currentUserId = useSelector((state) => state?.auth?.userId)

    const { id, title, text, isSelected, isEditMode } = cardInfo;

    const [inputTitle, setInputTitle] = React.useState(title);
    const [inputText, setInputText] = React.useState(text);


    const selectCardHandler = () => {
        onUpdateCardData({ ...cardInfo, isSelected: !isSelected })
    };
    const inputTitleHandler = (event) => {
        setInputTitle(event.target.value);
    };
    const inputTextHandler = (event) => {
        setInputText(event.target.value);
    };

    const editModeEnable = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        setInputTitle(title);
        setInputText(text);
        onUpdateCardData({ ...cardInfo, isEditMode: true, isSelected: false });
    };

    const saveChanges = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        onUpdateCardData({ ...cardInfo, title: inputTitle, text: inputText, isEditMode: false });
    };

    const discardChanges = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        onUpdateCardData({ ...cardInfo, isEditMode: false });
    };

    return (
        <div className={`${styles['card-body']} ${isSelected ? styles['selected'] : ''}`}
            onDoubleClick={() => !isEditMode && location?.pathname !== `/cards/${id}` && navigate(`/cards/${id}`)}>
            <CardHeader title={title} inputTitle={inputTitle} isEditMode={isEditMode} isSelected={isSelected}
                isViewMode={isViewMode} isNoControls={currentUserId ? false : true}
                onTitleInput={inputTitleHandler} onSelect={selectCardHandler} onEditModeEnable={editModeEnable}
                onSave={saveChanges} onDiscard={discardChanges} />
            <br />
            <CardBody text={text} inputText={inputText} isEditMode={isEditMode} onTextInput={inputTextHandler} />
        </div>
    );
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isEditMode: PropTypes.bool.isRequired,
    isViewMode: PropTypes.bool,
    onUpdateCardData: PropTypes.func.isRequired
};

export default React.memo(withLoading(Card, '510px', '260px'));
