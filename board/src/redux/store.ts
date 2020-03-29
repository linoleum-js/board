import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { ICardsListState } from '@models/ICardsListState';
import { IAppState } from '@models/IAppState';

import CardsListReducer from '@redux/cards';

const store = createStore(
  combineReducers<IAppState>({
    cardsList: CardsListReducer
  }),
  compose(
    applyMiddleware(thunk)
  )
);

export default store;