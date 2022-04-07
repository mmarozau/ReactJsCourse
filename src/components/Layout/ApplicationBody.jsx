import { useState } from 'react';

import './ApplicationBody.css'

import Card from '../Card/Card';

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

const ApplicationBody = () => {
    const [cardsList, setCardsList] = useState(INITIAL_CARDS_LIST);
    const [isViewMode, setIsViewMode] = useState(false);

    const isViewModeHandler = () => {
        setIsViewMode((prevState) => {
            if (!prevState === true) {
                setCardsList((prevState) => prevState.map(el => ({ ...el, isEditMode: false })));
            }
            return !prevState;
        });
    };

    const updateCardData = (newData) => {
        setCardsList((prevState) => prevState.map(el => {
            return el.id === newData.id ? { ...el, ...newData } : el;
        }));
    }

    return (
        <div className="body">
            <div className="page-control-tab">
                <div className="page-control-checkbox">
                    <input type="checkbox" checked={isViewMode} onChange={isViewModeHandler} /><span>View only</span>
                </div>
            </div>
            <div className="page-cards-list">
                {cardsList.map(el => (
                    <Card key={el.id} id={el.id} cardTitle={el.title} cardText={el.text}
                        isSelected={el.isSelected} isEditMode={el.isEditMode} onUpdateCardData={updateCardData}
                        isViewMode={isViewMode}></Card>
                ))}
            </div>
        </div>
    );
};

export default ApplicationBody;
