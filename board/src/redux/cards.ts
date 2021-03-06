import { Reducer, Action } from 'redux';
import { findIndex } from 'lodash';

import { ICardData } from '@models/ICardData';
import { ICardsListState } from '@models/ICardsListState';

const list: ICardData[] = [{
  title: 'Пример текста карточки',
  text: 'Some text',
  id: "8324f64b-b8d0-47f3-9502-8cc91680812b",
  column: 'in_progress'
}, {
  title: 'Пример длинного текста карточки, да такого чтобы он вообще не поместился',
  text: 'Some text',
  id: "e0c609dd-ccdd-492d-b930-48e98f9c71e0",
  column: 'in_progress'
}, {
  title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusm',
  text: 'Some text',
  id: "e0c609dd-ccdd-492d-b930-rgddxrg",
  column: 'in_progress'
}, {
  title: ' tempor incididunt ut labore et dolore magna aliqua. ',
  text: 'Some text',
  id: "e0c609dd-ccdd-492d-b930-w34rw34r",
  column: 'in_progress'
}, {
  title: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  text: 'Some text',
  id: "e0c609dd-ccdd-492d-b930-gsergsergser",
  column: 'in_progress'
}, {
  title: ' Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
  text: 'Some text',
  id: "e0c609dd-ccdd-492d-b930-23ra34rsrtg",
  column: 'testing'
}, {
  title: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  text: 'Some text',
  id: "e0c609dd-ccdd-492d-b930-zergdfver",
  column: 'testing'
}, {
  title: 'Sed ut perspiciatis unde omnis iste ',
  text: 'Some text',
  id: "e0c609dd-ccdd-492d-b930-zergezrg",
  column: 'testing'
}, {
  title: ' natus error sit voluptatem accusantium doloremque laudantium',
  text: 'Some text',
  id: "e0c609dd-ccdd-492d-b930-zergerg34rg",
  column: 'testing'
}];

export enum CardsActionTypes {
  RequestCardsList = 'REQUEST_CARDS_LIST',
  ReceiveCardsList = 'RECEIVE_CARDS_LIST',
  UpdateCard = 'UPDATE_CARD',
  MoveCard = 'MOVE_CARD',
  AddCard = 'ADD_CARD'
}

export interface RequestCardsListAction {
  type: CardsActionTypes.RequestCardsList;
}

export interface ReceiveCardsListAction {
  type: CardsActionTypes.ReceiveCardsList;
  payload: ICardData[];
}

export interface UpdateCardAction {
  type: CardsActionTypes.UpdateCard;
  payload: ICardData;
}

export interface MoveCardAction {
  type: CardsActionTypes.MoveCard;
  payload: {
    id: string;
    to: string;
    index: number;
  };
}

export interface AddCardAction {
  type: CardsActionTypes.AddCard;
  payload: ICardData;
}

export type CardsAction =
  RequestCardsListAction |
  ReceiveCardsListAction |
  UpdateCardAction |
  MoveCardAction |
  AddCardAction;

export const updateCard = (data: ICardData) => (dispatch: Function) => {
  dispatch({
    type: CardsActionTypes.UpdateCard,
    payload: data
  });
};

export const moveCard = (id: string, to: string, index: number) => (dispatch: Function) => {
  dispatch({
    type: CardsActionTypes.MoveCard,
    payload: { id, to, index }
  });
};

export const addCard = (data: ICardData) => (dispatch: Function) => {
  dispatch({
    type: CardsActionTypes.AddCard,
    payload: data
  });
};

export const fetchCardsList = () => async (dispatch: Function) => {
  // Show preloader, request data
  // ...
  // When loaded:
  dispatch({
    type: CardsActionTypes.ReceiveCardsList,
    payload: list
  });
};

const initialState: ICardsListState = {
  list: [],
  isLoading: false
};

const CardsListReducer: Reducer<ICardsListState> = (
  state: ICardsListState = initialState,
  action: Action
): ICardsListState => {
  const { type } = action as CardsAction;

  switch (type) {
    case CardsActionTypes.RequestCardsList:
      return {
        isLoading: true,
        list: []
      };

    case CardsActionTypes.ReceiveCardsList:
      const { payload: cardsList } = action as ReceiveCardsListAction;
      return {
        isLoading: false,
        list: cardsList
      };

    case CardsActionTypes.UpdateCard: {
      const { payload: card } = action as UpdateCardAction;
      const { list } = state;
      const index: number = findIndex(list, { id: card.id });
      const newList = [...list];
      newList[index] = card;

      return {
        isLoading: false,
        list: newList
      };
    }
    
    case CardsActionTypes.MoveCard: {
      const { payload: data } = action as MoveCardAction;
      const { id, to, index } = data;
      let { list } = state;
      const currentIndex: number = findIndex(list, { id });
      const card = list[currentIndex];
      list = list.filter((item) => item.id !== id );
      const cardsInColumn = list.filter(({ column }) => column == card.column);
      const currentCardAtIndex = cardsInColumn[index];
      const globalIndex = findIndex(list, { id: currentCardAtIndex.id });
      const newCard = { ...card, column: to };
      const newList = [
        ...list.slice(0, globalIndex),
        newCard,
        ...list.slice(globalIndex)
      ];

      return {
        isLoading: false,
        list: newList
      };
    }

    case CardsActionTypes.AddCard: {
      const { payload: card } = action as AddCardAction;
      const { list } = state;
      return {
        isLoading: false,
        list: [...list, { ...card }]
      };
    }

    default:
      return state;
  }

};

export default CardsListReducer;