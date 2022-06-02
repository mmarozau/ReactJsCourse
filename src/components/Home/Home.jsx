import { useContext, useEffect, useState } from "react";
import styles from './Home.module.css';

import ModalContext from "../../contexts/modal-context";
import CardsDataContext from "../../contexts/cards-data-context";

import HomeControlPanel from "./HomeControlPanel";
import CardList from "../Card/CardList";


const VIEW_MODE_LABEL = 'View only';


const Home = () => {
    const modalCtx = useContext(ModalContext);
    const cardsDataCtx = useContext(CardsDataContext);

    const [isViewMode, setIsViewMode] = useState(false);
    const [controlsList, setControlsList] = useState([]);

    const isViewModeHandler = (event) => {
        event.stopPropagation();
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        setIsViewMode((prevState) => !prevState);
    };
    useEffect(() => {
        if (isViewMode === true) cardsDataCtx.disableEditModeAll();
    }, [isViewMode]);

    const deleteSelected = (event) => {
        event.stopPropagation();
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        if (!cardsDataCtx.isSomeSelected) return;

        const selectedIds = cardsDataCtx.cardsList.filter(el => el.isSelected).map(el => el.id);

        modalCtx.createModal(modalCtx.modalTypes.TYPE_CONF, null, `Would you like to delete selected (${selectedIds.length}) cards?`,
            null, () => {
                cardsDataCtx.deleteCard(selectedIds);
            }
        );
    };

    const addNewCard = (event) => {
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        if (isViewMode) return;

        cardsDataCtx.addCard();
    };

    useEffect(() => {
        setControlsList([
            { type: 'checkbox', label: VIEW_MODE_LABEL, disabled: false, checked: isViewMode, handler: isViewModeHandler },
            { type: 'button', label: 'Add New Card', disabled: false, checked: undefined, handler: addNewCard },
            { type: 'button', label: 'Delete Selected', disabled: !cardsDataCtx.isSomeSelected, checked: undefined, handler: deleteSelected },
            { type: 'tag', label: `${cardsDataCtx.cardsList.length} Cards`, disabled: false, checked: undefined, handler: null }
        ]);
    }, [isViewMode, cardsDataCtx])

    return (
        <div className={styles['home-body']}>
            <HomeControlPanel controlsList={controlsList} />
            <CardList isViewMode={isViewMode} />
        </div>
    );
};

export default Home;
