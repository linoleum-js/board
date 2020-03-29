import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Column, IColumnProps } from '@components/Column/Column';

import {
  fetchCardsList
} from '@redux/cards';

import { IAppState } from '@models/IAppState';
import { ICardsListState } from '@models/ICardsListState';
import { ICardData } from '@models/ICardData';

import style from './Board.module.scss';

export interface IBoardProps {

}

export const Board: React.FunctionComponent<IBoardProps> = () => {
  const dispatch = useDispatch();
  const cards: ICardsListState = useSelector((state: IAppState) =>
    state.cardsList
  );
  

  const columnsProps: IColumnProps[] = [{
    name: 'В работе',
    id: 'in_progress'
  }, {
    name: 'На проверке',
    id: 'testing'
  }, {
    name: 'Выполнено',
    id: 'done'
  }].map((item) => {
    return {
      ...item,
      cards: cards.list.filter(({ column }) => column === item.id)
    };
  });
  
  useEffect(() => {
    dispatch(fetchCardsList());
  }, []);


  return <div className={style.Board}>
    {columnsProps.map((item: IColumnProps) => {  
      return <Column
        {...item}
        key={item.id}
      />
    })}
  </div>;
};