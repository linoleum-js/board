import React from 'react';

import style from  './Card.module.scss';

export interface ICardProps {
}

export const Card: React.FunctionComponent<ICardProps> = ({
}) => {
  return <div className={style.Card}>
    card
  </div>;
};