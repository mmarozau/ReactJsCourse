import { useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './CardList.module.css';

import Card from './Card';


const CardList = ({ isViewMode }) => {
    const cardsData = useSelector((state) => state.cards);
    const dispatchGlbStore = useDispatch();

    const updateCardData = useCallback((newCardData) => {
        dispatchGlbStore({ type: 'cards-update-card', updateCards: newCardData });
    }, []);

    return (
        <div className={styles['page-cards-list']}>
            {cardsData.cardsList.map(el => (
                <Card key={el.id} id={el.id} title={el.title} text={el.text}
                    isSelected={el.isSelected} isEditMode={el.isEditMode} onUpdateCardData={updateCardData}
                    isViewMode={isViewMode}>
                </Card>
            ))}
        </div>
    );
};

CardList.propTypes = {
    isViewMode: PropTypes.bool
};

export default CardList;
