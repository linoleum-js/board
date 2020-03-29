import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { Card } from '@components/Card/Card';
import { Button } from '@components/shared/Button/Button';
import { Icon } from '@components/shared/Icon/Icon';
import { AddCardForm } from '@components/AddCardForm/AddCardForm';
import { Modal } from '@components/shared/Modal/Modal';
import { EditCardForm } from '@components/EditCardForm/EditCardForm';

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
  const [editOpen, setEditOpen] = useState(false);
  const [editingCard, seteditingCard] = useState<ICardData|null>(null);

  const onEdit = function (data: ICardData) {
    seteditingCard(data);
    setEditOpen(true);
  };

  const onEditSubmit = function () {
    seteditingCard(null);
    setEditOpen(false);
  };

  return <div className={style.Column}>
    <h2 className={style.ColumnHeader}>{name}</h2>
    {cards.map((card: ICardData) => {
      return <Card
        {...card}
        onEdit={onEdit}
        key={card.id}
      />;
    })}

    <AddCardForm column={id} />
    
    <Modal
      isOpen={editOpen}
      onClose={() => setEditOpen(false)}
    >
      <EditCardForm
        data={editingCard!}
        onSubmit={onEditSubmit}
      />
    </Modal>
  </div>;
};