import React, { useState, useEffect, useRef } from 'react';
import { useParams, RouteComponentProps, withRouter } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { find } from 'lodash';

import { Card } from '@components/Card/Card';
import { AddCardForm } from '@components/AddCardForm/AddCardForm';
import { Modal } from '@components/shared/Modal/Modal';
import { EditCardForm } from '@components/EditCardForm/EditCardForm';

import { getDragIndex, removePlaceholder, hasPlaceholder } from '@utils/dnd';

import { ICardData } from '@models/ICardData';

import { moveCard } from '@redux/cards';

import style from  './Column.module.scss';

export interface IColumnProps {
  name: string;
  id: string;
  cards: ICardData[];
}


const ColumnComponent: React.FunctionComponent<RouteComponentProps & IColumnProps> = ({
  name, id, cards, history
}) => {
  const wrapper = useRef(null);
  const [localCards, setLocalCards] = useState(cards);
  const dispatch = useDispatch();
  const params: any = useParams();

  const [lastDragIndex, setLasstDragIndex] = useState(0);
  const [{ isOver, draggingItem }, drop] = useDrop({
    accept: 'card',
    hover: (item, monitor) => {
      const index = getDragIndex(
        wrapper,
        monitor.getClientOffset(),
        monitor.getSourceClientOffset()
      );

      // remove placeholder cards and the one being dragged
      // (from the local state only, we don't want to touch the store yet
      // bacause it's temporary data)
      const newCards = [...removePlaceholder(localCards)]
        .filter(({ id }) => id !== draggingItem.id);

      // add a placeholder card
      newCards.splice(index, 0,
        { title: draggingItem.title, id: 'plid', column: id, text: '', type: 'placeholder' }
      );
      setLocalCards(newCards);
      setLasstDragIndex(index);
    },
    drop: (item: any) => {
      dispatch(moveCard(item.id, id, lastDragIndex));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      draggingItem: monitor.getItem()
    })
  });

  if (!isOver) {
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