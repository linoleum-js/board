import React, { useState, useEffect, useRef } from 'react';
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

const isInArea = (offset: any, rect: any): boolean => {
  return offset.x >= rect.left && offset.x <= rect.right &&
    offset.y >= rect.top;
};

const isBefore = (offset: any, rect: any, height: number): boolean => {
  return offset.y < rect.top + height / 2;
};

const getDragIndex = function (wrapper: any, offset: any, sourceOffset: any) {
  const cards = Array.from(wrapper.current.querySelectorAll(
    '[data-card="true"]'
  ));

  let index = 0;
  
  cards.forEach((card: any, i: number) => {
    const rect = card.getBoundingClientRect();
    if (isInArea(offset, rect)) {
      if (isBefore(offset, rect, card.offsetHeight)) {
        index = i;
      } else {
        index = i + 1;
      }
    }
  });

  return index;
};

const ColumnComponent: React.FunctionComponent<RouteComponentProps & IColumnProps> = ({
  name, id, cards, history
}) => {
  const wrapper = useRef(null);
  const [localCards, setLocalCards] = useState(cards);
  const dispatch = useDispatch();
  const params: any = useParams();
  const [{ isOver, draggingItem }, drop] = useDrop({
    accept: 'card',
    hover: (item, monitor) => {
      const index = getDragIndex(wrapper, monitor.getClientOffset(), monitor.getSourceClientOffset());
      let newCards = [...removePlaceholder(localCards)].filter(({ id }) => id !== draggingItem.id);
      newCards.splice(index, 0, { title: draggingItem.title, id: 'plid', column: id, text: '', type: 'placeholder' });
      setLocalCards(newCards);
    },
    drop: (item: any, monitor: any) => {
      dispatch(moveCard(item.id, id));
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

  return <div className={style.Column} ref={wrapper}>
    <div ref={drop}>
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
    </div>
  </div>;
};

export default withRouter(ColumnComponent);