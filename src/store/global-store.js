import redux, { createStore } from 'redux';

import { modalTypes } from '../components/Modal/modal-constants.js';


const storeReducer = (state = {
    auth: { userId: null },
    cards: {
        cardsList: [],
        isSomeSelected: false
    },
    modal: {
        modalTypes,
        isActive: false,
        type: null,
        title: null,
        content: null,
        onClose: null,
        onConfirm: null
    }
}, action) => {
    if (action.type === 'auth-signin-user') {
        return { ...state, auth: { userId: action.userId } };
    } else if (action.type === 'auth-signout-current-user') {
        return { ...state, auth: { userId: null } };
    } else if (action.type === 'cards-add') {
        if (action.newCards) {
            const currentCards = Array.from(state.cards.cardsList);
            const newCards = Array.isArray(action.newCards) ? action.newCards : [action.newCards];

            let currentIndex = currentCards.length ? Math.max(...currentCards.map(el => el.id)) + 1 : 1;
            for (let card of newCards) {
                currentCards.push({
                    id: currentIndex,
                    title: card.title || '',
                    text: card.text || '',
                    isSelected: card.isSelected || false,
                    isEditMode: card.isEditMode || false
                });
                currentIndex++;
            }
            return { ...state, cards: { ...state.cards, cardsList: currentCards } };
        }
    } else if (action.type === 'cards-update-card') {
        if (action.updateCards) {
            const updateCards = Array.isArray(action.updateCards) ? action.updateCards : [action.updateCards];
            const processingCards = Array.from(state.cards.cardsList);

            for (let i = 0; i < processingCards.length; i++) {
                const updIdx = updateCards.findIndex(el => el.id === processingCards[i].id);
                if (updIdx !== -1) processingCards[i] = { ...updateCards[updIdx] };
            }
            const isSomeSelected = processingCards.findIndex(el => (el.isSelected === true)) !== -1;

            return {
                ...state, cards: {
                    cardsList: processingCards,
                    isSomeSelected: isSomeSelected
                }
            };
        }
    } else if (action.type === 'cards-delete') {
        if (!(!action.ids && action.ids !== 0)) {
            const idsToDel = Array.isArray(action.ids) ? action.ids : [action.ids];
            const processedCards = state.cards.cardsList.filter(el => !idsToDel.includes(el.id));
            const isSomeSelected = processedCards.findIndex(el => (el.isSelected === true)) !== -1;

            return {
                ...state, cards: {
                    cardsList: processedCards,
                    isSomeSelected: isSomeSelected
                }
            };
        }
    } else if (action.type === 'cards-disable-edit-mode-all') {
        return { ...state, cards: { ...state.cards, cardsList: state.cards.cardsList.map(el => ({ ...el, isEditMode: false })) } };
    } else if (action.type === 'cards-deselect-all') {
        return { ...state, cards: { cardsList: state.cards.cardsList.map(el => ({ ...el, isSelected: false })), isSomeSelected: false } };
    } else if (action.type === 'modal-show') {
        if (!state.modal.isActive) return {
            ...state, modal: {
                modalTypes,
                isActive: true,
                type: action.modalData?.type || null,
                title: action.modalData?.title || null,
                content: action.modalData?.content || null,
                onClose: action.modalData?.onClose || null,
                onConfirm: action.modalData?.onConfirm || null
            }
        };
    } else if (action.type === 'modal-close') {
        if (state.modal.isActive) return {
            ...state, modal: {
                modalTypes,
                isActive: false,
                type: null,
                title: null,
                content: null,
                onClose: null,
                onConfirm: null
            }
        };
    }

    return state;
};

const store = createStore(storeReducer);

export default store;
