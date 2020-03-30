import React, { useState } from 'react';
import { useDrag } from 'react-dnd'

import { Button } from '@components/shared/Button/Button';

import { ICardData } from '@models/ICardData';

import style from  './Card.module.scss';

type ICardProps = ICardData & {
  onEdit: (data: ICardData) => void;
};

export const Card: React.FunctionComponent<ICardProps> = (data) => {
  const { title, text, onEdit, id, column } = data;
  const [collectedProps, drag] = useDrag({
    item: { id, type: 'card', prevColumn: column },
  })

  return <div className={style.Card} ref={drag}>
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