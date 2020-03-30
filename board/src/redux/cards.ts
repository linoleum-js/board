import { Reducer, Action } from 'redux';
import { findIndex } from 'lodash';
import { v4 as uuid } from 'uuid';

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

export const moveCard = (id: string, to: string) => (dispatch: Function) => {
  dispatch({
    type: CardsActionTypes.MoveCard,
    payload: { id, to }
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
      const { id, to } = data;
      const { list } = state;
      const index: number = findIndex(list, { id });
      const card = list[index];
      const newCard = { ...card, column: to };
      const newList = [...list];
      newList[index] = newCard;

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