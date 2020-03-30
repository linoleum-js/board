import React from 'react';
import { useParams, RouteComponentProps, withRouter } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { find } from 'lodash';

import { Card } from '@components/Card/Card';
import { AddCardForm } from '@components/AddCardForm/AddCardForm';
import { Modal } from '@components/shared/Modal/Modal';
import { EditCardForm } from '@components/EditCardForm/EditCardForm';

import { ICardData } from '@models/ICardData';

import style from  './Column.module.scss';

import { moveCard } from '@redux/cards';

export interface IColumnProps {
  name: string;
  id: string;
  cards: ICardData[];
}

const ColumnComponent: React.FunctionComponent<RouteComponentProps & IColumnProps> = ({
  name, id, cards, history
}) => {
  const dispatch = useDispatch();
  const params: any = useParams();
  const [collectedProps, drop] = useDrop({
    accept: 'card',
    drop: (item: any, monitor) => {
      if (item.prevColumn !== id) {
        dispatch(moveCard(item.id, id));
        console.log('item', item);
      }
    }
  });
  const editingCard = find(cards, { id: params.id });
  const editOpen = !!editingCard;
  
  const onEdit = function (data: ICardData) {
    history.push(`/${data.id}`);
  };

  const onEditSubmit = function () {
    history.push(`/`);
  };

  return <div className={style.Column} ref={drop}>
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
      onClose={() => onEditSubmit()}
    >
      <EditCardForm
        data={editingCard!}
        onSubmit={onEditSubmit}
      />
    </Modal>
  </div>;
};

export default withRouter(ColumnComponent);