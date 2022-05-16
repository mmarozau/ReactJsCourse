import { useState, useCallback } from "react";

import CardsDataContext from "../../contexts/cards-data-context";


const INITIAL_CARDS_LIST = [
    {
        id: 1,
        title: 'Sample Card 1',
        text: 'Sample text for sample card 1...',
        isSelected: false,
        isEditMode: false
    },
    {
        id: 2,
        title: 'Sample Card 2',
        text: 'Sample text for sample card 2...',
        isSelected: false,
        isEditMode: false
    },
    {
        id: 3,
        title: 'Sample Card 3',
        text: 'Sample text for sample card 3...',
        isSelected: false,
        isEditMode: false
    },
    {
        id: 4,
        title: 'Sample Card 4',
        text: 'Sample text for sample card 4...',
        isSelected: false,
        isEditMode: false
    },
    {
        id: 5,
        title: 'Sample Card 5',
        text: 'Sample text for sample card 5...',
        isSelected: false,
        isEditMode: false
    },
    {
        id: 6,
        title: 'Sample Card 6',
        text: 'Sample text for sample card 6...',
        isSelected: false,
        isEditMode: false
    },
    {
        id: 7,
        title: 'Sample Card 7',
        text: 'Sample text for sample card 7...',
        isSelected: false,
        isEditMode: false
    }
];


const CardsDataManager = (props) => {

    const [cardsList, setCardsList] = useState(INITIAL_CARDS_LIST);
    const [isSomeSelected, setIsSomeSelected] = useState(false);

    const updateCard = useCallback((newCard) => {
        setCardsList((prevState) => {
            const newState = prevState.map(el => (el.id === newCard.id ? newCard : el));

            const newIsSomeSelected = newState.findIndex(el => (el.isSelected === true)) !== -1;
            if (newIsSomeSelected !== isSomeSelected) setIsSomeSelected(newIsSomeSelected);

            return newState;
        });
    }, [isSomeSelected]);

    const deleteCard = (ids) => {
        if (!ids && ids !== 0) return;

        const idsToDel = Array.isArray(ids) ? ids : [ids];
        setCardsList((prevState) => {
            const selectedAfterDeletion = prevState.filter(el => (!idsToDel.includes(el.id) && el.isSelected));
            if (isSomeSelected && !selectedAfterDeletion.length) setIsSomeSelected(false);
            return prevState.filter(el => !idsToDel.includes(el.id));
        });
    };

    const addCard = () => {
        const newCardId = cardsList.length ? Math.max(...cardsList.map(el => el.id)) + 1 : 1;
        setCardsList((prevState) => {
            return [...prevState, {
                id: newCardId,
                title: '',
                text: '',
                isSelected: false,
                isEditMode: true
            }];
        });
    };

    const disableEditModeAll = () => {
        setCardsList((prevState) => {
            return prevState.map(el => ({ ...el, isEditMode: false }));
        });
    };


    return (
        <CardsDataContext.Provider value={{
            cardsList, isSomeSelected,
            updateCardData: updateCard, addCard, deleteCard, disableEditModeAll
        }}>
            {props.children}
        </CardsDataContext.Provider>
    );
};

export default CardsDataManager;