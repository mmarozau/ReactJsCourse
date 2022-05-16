import { useContext } from 'react';
import styles from './CardList.module.css';

import CardsDataContext from '../../contexts/cards-data-context';
import Card from './Card';


const CardList = ({ isViewMode }) => {
    const cardsData = useContext(CardsDataContext);

    return (
        <div className={styles['page-cards-list']}>
            {cardsData.cardsList.map(el => (
                <Card key={el.id} id={el.id} cardTitle={el.title} cardText={el.text}
                    isSelected={el.isSelected} isEditMode={el.isEditMode} onUpdateCardData={cardsData.updateCardData}
                    isViewMode={isViewMode}>
                </Card>
            ))}
        </div>
    );
};

export default CardList;
