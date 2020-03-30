import React from 'react';
import classnames from 'classnames';
import { useDrag } from 'react-dnd'

import { Button } from '@components/shared/Button/Button';

import { ICardData } from '@models/ICardData';

import style from  './Card.module.scss';

type ICardProps = ICardData & {
  onEdit: (data: ICardData) => void;
};

export const Card: React.FunctionComponent<ICardProps> = (data) => {
  const { title, text, onEdit, id, column, type } = data;
  const [{ isDragging }, drag] = useDrag({
    item: { id, title, type: 'card', prevColumn: column },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
  });

  const classes = classnames(style.Card, {
    [style.CardDragging]: isDragging,
    [style.CardPlaceholder]: type === 'placeholder'
  });

  const isRealCard = !isDragging;

  return <div className={classes} ref={drag} data-card={isRealCard} id={id}>
    <div className={style.CardInner}>
      {title}
    </div>
    <div className={style.CardEditButton}>
      <Button
        onClick={() => onEdit(data)}
      >
        🖉
      </Button>
    </div>
  </div>;
};