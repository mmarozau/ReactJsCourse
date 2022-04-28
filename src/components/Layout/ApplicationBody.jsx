import { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';

import './ApplicationBody.css'

import ModalContext from '../../contexts/modal-context';
import CardList from '../Card/CardList';


const INITIAL_CARDS_LIST = [
    {
        id: 1,
        title: 'Sample Card 1',
        text: 'Sample text for sample card 1...',
        isSelected: false,
        isEditMode: false,
        isLoading: true
    },
    {
        id: 2,
        title: 'Sample Card 2',
        text: 'Sample text for sample card 2...',
        isSelected: false,
        isEditMode: false,
        isLoading: true
    },
    {
        id: 3,
        title: 'Sample Card 3',
        text: 'Sample text for sample card 3...',
        isSelected: false,
        isEditMode: false,
        isLoading: true
    },
    {
        id: 4,
        title: 'Sample Card 4',
        text: 'Sample text for sample card 4...',
        isSelected: false,
        isEditMode: false,
        isLoading: true
    },
    {
        id: 5,
        title: 'Sample Card 5',
        text: 'Sample text for sample card 5...',
        isSelected: false,
        isEditMode: false,
        isLoading: true
    },
    {
        id: 6,
        title: 'Sample Card 6',
        text: 'Sample text for sample card 6...',
        isSelected: false,
        isEditMode: false,
        isLoading: true
    },
    {
        id: 7,
        title: 'Sample Card 7',
        text: 'Sample text for sample card 7...',
        isSelected: false,
        isEditMode: false,
        isLoading: true
    }
];

const VIEW_MODE_LABEL = 'View only';

const PageControlCBLabel = styled.span`
    & {
        font-weight: ${(props) => props.checked ? 'bold' : 'initial'};
    }

    &::after {
        display: block;
        content: "${VIEW_MODE_LABEL}";
        font-weight: bold;
        height: 0px;
        color: transparent;
        overflow: hidden;
        visibility: hidden;
    }
`;


const ApplicationBody = () => {
    const modalCtx = useContext(ModalContext);

    const [cardsList, setCardsList] = useState(INITIAL_CARDS_LIST);
    const [isViewMode, setIsViewMode] = useState(false);
    const [isSomeSelected, setIsSomeSelected] = useState(false);

    const isViewModeHandler = (event) => {
        event.stopPropagation();
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        setIsViewMode((prevState) => {
            if (!prevState === true) {
                setCardsList((prevState) => prevState.map(el => ({ ...el, isEditMode: false })));
            }
            return !prevState;
        });
    };

    const updateCardData = useCallback((newCard) => {
        setCardsList((prevState) => {
            const newState = prevState.map(el => (el.id === newCard.id ? newCard : el));

            const newIsSomeSelected = newState.findIndex(el => (el.isSelected === true)) !== -1;
            if (newIsSomeSelected !== isSomeSelected) setIsSomeSelected(newIsSomeSelected);

            return newState;
        });
    }, [isSomeSelected]);

    const deleteSelected = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        if (!isSomeSelected) return;

        const selectedIds = cardsList.filter(el => el.isSelected).map(el => el.id);

        modalCtx.createModal('confirmation', null, `Would you like to delete selected (${selectedIds.length}) cards?`,
            null, () => {
                setIsSomeSelected(false);
                setCardsList((prevState) => {
                    return prevState.filter(el => !(el.isSelected));
                });
            }
        );
    }

    const addNewCard = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        if (isViewMode) return;

        const newCardId = Math.max(...cardsList.map(el => el.id)) + 1;
        setCardsList((prevState) => {
            return [...prevState, {
                id: newCardId,
                title: '',
                text: '',
                isSelected: false,
                isEditMode: true,
                isLoading: true,
            }];
        });
    };

    return (
        <div className="body">
            <div className="page-control-tab">
                <div className="page-control-element" onClick={isViewModeHandler} onKeyDown={isViewModeHandler}
                    onKeyUp={isViewModeHandler} tabIndex="0">
                    <input type="checkbox" checked={isViewMode} readOnly={true} tabIndex="-1" />
                    <PageControlCBLabel checked={isViewMode}> {VIEW_MODE_LABEL}</PageControlCBLabel>
                </div>
                <div>|</div>
                <div className="page-control-element" style={isViewMode ? { color: 'grey' } : {}}
                    onClick={addNewCard} onKeyDown={addNewCard} onKeyUp={addNewCard} tabIndex="0">Add New Card</div>
                <div>|</div>
                <div className="page-control-element" style={!isSomeSelected ? { color: 'grey' } : {}}
                    onClick={deleteSelected} onKeyDown={deleteSelected} onKeyUp={deleteSelected} tabIndex="0">Delete Selected</div>
            </div>
            <CardList cardsList={cardsList} isViewMode={isViewMode} onUpdateCardData={updateCardData} />
        </div>
    );
};

export default ApplicationBody;
