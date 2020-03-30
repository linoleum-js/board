import React, { useState, useEffect } from 'react';
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

const removePlaceholder = function (cards: ICardData[]): ICardData[] {
  return cards.filter(({ type }) => type !== 'placeholder');
};

const hasPlaceholder = function (cards: ICardData[]): boolean {
  return cards.some(({ type }) => type === 'placeholder');
};

const ColumnComponent: React.FunctionComponent<RouteComponentProps & IColumnProps> = ({
  name, id, cards, history
}) => {
  const [localCards, setLocalCards] = useState(cards);
  const dispatch = useDispatch();
  const params: any = useParams();
  const [{ isOver, draggingItem }, drop] = useDrop({
    accept: 'card',
    hover: (item, monitor) => {
      
      setLocalCards([
        ...removePlaceholder(localCards),
        { title: draggingItem.title, id: 'plid', column: id, text: '', type: 'placeholder' }
      ]);
      // show placeholder
      console.log('getClientOffset', monitor.getClientOffset());
      console.log('getSourceClientOffset', monitor.getSourceClientOffset());
    },
    drop: (item: any, monitor: any) => {
      dispatch(moveCard(item.id, id));
      // console.log('item', item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      draggingItem: monitor.getItem()
    })
  });

  if (isOver) {
  } else {
    if (hasPlaceholder(localCards)) { 
      setLocalCards(removePlaceholder(localCards));
    }
  }

  const editingCard = find(cards, { id: params.id });
  const editOpen = !!editingCard;
  
  const onEdit = function (data: ICardData) {
    history.push(`/${data.id}`);
  };

  const onEditSubmit = function () {
    history.push(`/`);
  };

  useEffect(() => {
    setLocalCards(cards);
  }, [cards])

  return <div className={style.Column} ref={drop}>
    <h2 className={style.ColumnHeader}>{name}</h2>
    {localCards.map((card: ICardData) => {
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