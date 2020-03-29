import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { Card } from '@components/Card/Card';
import { Button } from '@components/shared/Button/Button';
import { Icon } from '@components/shared/Icon/Icon';
import { AddCardForm } from '@components/AddCardForm/AddCardForm';

import { IAppState } from '@models/IAppState';
import { ICardsListState } from '@models/ICardsListState';
import { ICardData } from '@models/ICardData';

import { addCard } from '@redux/cards';

import style from  './Column.module.scss';

export interface IColumnProps {
  name: string;
  id: string;
  cards: ICardData[];
}

export const Column: React.FunctionComponent<IColumnProps> = ({
  name, id, cards
}) => {
  const dispatch = useDispatch();

  const onAdd = function (title: string) {
    dispatch(addCard({ title, text: '', id: uuid(), column: id }));
  };

  return <div className={style.Column}>
    <h2 className={style.ColumnHeader}>{name}</h2>
    {cards.map((card: ICardData) => {
      return <Card
        {...card}
        key={card.id}
      />;
    })}

    <AddCardForm
      onAdd={onAdd}
    />
  </div>;
};