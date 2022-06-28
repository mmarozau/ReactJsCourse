import { useContext, useEffect, useState, useCallback } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Home.module.css';

import HomeControlPanel from "./HomeControlPanel";
import CardList from "../Card/CardList";
import Card from "../Card/Card";


const VIEW_MODE_LABEL = 'View only';


const Home = () => {
    const currentUserId = useSelector((state) => state?.auth?.userId);
    const modalTypes = useSelector((state) => state?.modal?.modalTypes);
    const cardsData = useSelector((state) => state.cards);
    const dispatchGlbStore = useDispatch();

    const [isViewMode, setIsViewMode] = useState(false);
    const [controlsList, setControlsList] = useState([]);

    const isViewModeHandler = (event) => {
        event.stopPropagation();
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        setIsViewMode((prevState) => !prevState);
    };
    useEffect(() => {
        if (isViewMode === true) dispatchGlbStore({ type: 'cards-disable-edit-mode-all' });
    }, [isViewMode]);

    const deleteSelected = (event) => {
        event.stopPropagation();
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        if (!cardsData.isSomeSelected) return;

        const selectedIds = cardsData.cardsList.filter(el => el.isSelected).map(el => el.id);


        dispatchGlbStore({
            type: 'modal-show',
            modalData: {
                type: modalTypes.TYPE_CONF,
                content: `Would you like to delete selected (${selectedIds.length}) cards?`,
                onConfirm: () => { dispatchGlbStore({ type: 'cards-delete', ids: selectedIds }); }
            }
        });
    };

    const addNewCard = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        if (isViewMode) return;

        dispatchGlbStore({
            type: 'cards-add', newCards: {
                title: '',
                text: '',
                isSelected: false,
                isEditMode: true
            }
        });
    };

    const updateCardData = useCallback((newCardData) => {
        dispatchGlbStore({ type: 'cards-update-card', updateCards: newCardData });
    }, []);

    useEffect(() => {
        dispatchGlbStore({ type: 'cards-disable-edit-mode-all' });
        dispatchGlbStore({ type: 'cards-deselect-all' });
    }, []);

    useEffect(() => {
        setControlsList([
            { type: 'checkbox', label: VIEW_MODE_LABEL, disabled: false, checked: isViewMode, handler: isViewModeHandler },
            { type: 'button', label: 'Add New Card', disabled: isViewMode, checked: undefined, handler: addNewCard },
            { type: 'button', label: 'Delete Selected', disabled: !cardsData.isSomeSelected, checked: undefined, handler: deleteSelected },
            { type: 'tag', label: `${cardsData.cardsList.length} Cards`, disabled: false, checked: undefined, handler: null }
        ]);
    }, [isViewMode, cardsData]);

    const { ['*']: cardId } = useParams();
    const cardIdx = cardId ? cardsData.cardsList.findIndex(el => el.id === Number(cardId)) : null;

    useEffect(() => {
        if (currentUserId && cardIdx > 0 && !cardsData.cardsList[cardIdx].isEditMode) {
            dispatchGlbStore({ type: 'cards-update-card', updateCards: { ...cardsData.cardsList[cardIdx], isEditMode: true } });
        }
    }, [cardIdx]);

    return (
        <div className={styles['home-body'] + (cardId ? (' ' + styles['single']) : '')}>
            <Routes>
                <Route path="" element={
                    <>
                        {currentUserId && <HomeControlPanel controlsList={controlsList} />}
                        <CardList isViewMode={isViewMode} />
                    </>
                } />
                <Route path=":id" element={<div className={styles['single-element']}>
                    {cardIdx >= 0 ?
                        <Card id={cardsData?.cardsList[cardIdx]?.id}
                            title={cardsData?.cardsList[cardIdx]?.title}
                            text={cardsData?.cardsList[cardIdx]?.text}
                            isSelected={cardsData?.cardsList[cardIdx]?.isSelected}
                            isEditMode={cardsData?.cardsList[cardIdx]?.isEditMode}
                            onUpdateCardData={updateCardData}
                        /> :
                        <div>No card with such id: {cardId}</div>}
                </div>
                } />
            </Routes>
        </div>
    );
};

export default Home;
