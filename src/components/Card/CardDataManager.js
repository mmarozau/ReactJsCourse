import { useState, useCallback, useEffect } from "react";
import axios from "axios";

import CardsDataContext from "../../contexts/cards-data-context";


const CardsDataManager = (props) => {

    const [cardsList, setCardsList] = useState([]);
    const [isSomeSelected, setIsSomeSelected] = useState(false);

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json', { responseType: 'json' })
            .then(resp => {
                const loadedCardsData = Array.isArray(resp.data) ? resp.data.slice(0, 15) : [];
                setCardsList(loadedCardsData.map((el, elIdx) => ({
                    id: elIdx,
                    title: el.Name,
                    text: el.About,
                    isSelected: false,
                    isEditMode: false
                })));
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    const updateCard = useCallback((newCard) => {
        setCardsList((prevState) => {
            const newState = prevState.map(el => (el.id === newCard.id ? newCard : el));

            const newIsSomeSelected = newState.findIndex(el => (el.isSelected === true)) !== -1;
            if (newIsSomeSelected !== isSomeSelected) setIsSomeSelected(newIsSomeSelected);

            return newState;
        });
    }, [isSomeSelected]);

    const deleteCard = useCallback((ids) => {
        if (!ids && ids !== 0) return;

        const idsToDel = Array.isArray(ids) ? ids : [ids];
        setCardsList((prevState) => {
            const selectedAfterDeletion = prevState.filter(el => (!idsToDel.includes(el.id) && el.isSelected));
            if (isSomeSelected && !selectedAfterDeletion.length) setIsSomeSelected(false);
            return prevState.filter(el => !idsToDel.includes(el.id));
        });
    }, [isSomeSelected]);

    const addCard = useCallback(() => {
        setCardsList((prevState) => {
            return [...prevState, {
                id: prevState.length ? Math.max(...prevState.map(el => el.id)) + 1 : 1,
                title: '',
                text: '',
                isSelected: false,
                isEditMode: true
            }];
        });
    }, []);

    const disableEditModeAll = useCallback(() => {
        setCardsList((prevState) => {
            return prevState.map(el => ({ ...el, isEditMode: false }));
        });
    }, []);


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
