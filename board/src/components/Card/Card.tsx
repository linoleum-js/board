import React from 'react';

import { ICardData } from '@models/ICardData';

import style from  './Card.module.scss';

type ICardProps = ICardData & {
  
};

export const Card: React.FunctionComponent<ICardProps> = ({
  title, text
}) => {
  return <div className={style.Card}>
    <div className={style.CardInner}>
      {title}
    </div>
  </div>;
};