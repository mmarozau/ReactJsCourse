import styles from './CardList.module.css';

import Card from './Card';


const CardList = ({ cardsList, isViewMode, onUpdateCardData }) => {

    return (
        <div className={styles['page-cards-list']}>
            {cardsList.map(el => (
                <Card key={el.id} id={el.id} cardTitle={el.title} cardText={el.text}
                    isSelected={el.isSelected} isEditMode={el.isEditMode} isLoading={el.isLoading}
                    isViewMode={isViewMode} onUpdateCardData={onUpdateCardData}></Card>
            ))}
        </div>
    );
};

export default CardList;
