import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import './ApplicationBody.css'

import ModalContext from '../../contexts/modal-context';
import Tag from '../Tag/Tag';
import CardsDataContext from '../../contexts/cards-data-context'; // delete after moving to manager - need to check?
import CardList from '../Card/CardList';


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
    const cardsDataCtx = useContext(CardsDataContext);

    const [isViewMode, setIsViewMode] = useState(false);

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
        if ((event.type === 'keydown' || event.type === 'keyup') && event.code === 'Space') event.preventDefault();
        if (event.type === 'keyup' || (event.type === 'keydown' && event.code !== 'Space')) return;

        if (!cardsDataCtx.isSomeSelected) return;

        cardsDataCtx.deleteCard();

        const selectedIds = cardsDataCtx.cardsList.filter(el => el.isSelected).map(el => el.id);

        modalCtx.createModal('confirmation', null, `Would you like to delete selected (${selectedIds.length}) cards?`,
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
                <div className="page-control-element" style={!cardsDataCtx.isSomeSelected ? { color: 'grey' } : {}}
                    onClick={deleteSelected} onKeyDown={deleteSelected} onKeyUp={deleteSelected} tabIndex="0">Delete Selected</div>
                <div>|</div>
                <Tag label={`${cardsDataCtx.cardsList.length} Cards`} type={'high-contrast'} />
            </div>
            <CardList isViewMode={isViewMode} />
        </div>
    );
};

export default ApplicationBody;
