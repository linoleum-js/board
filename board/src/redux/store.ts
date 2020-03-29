import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import CardsListReducer, { ICardsListState } from '@redux/cards';

export interface IAppState {
  usersList: ICardsListState
}

const store = createStore(
  combineReducers<IAppState>({
    usersList: CardsListReducer
  }),
  compose(
    applyMiddleware(thunk)
  )
);

export default store;