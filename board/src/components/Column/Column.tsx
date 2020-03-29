import React from 'react';
import { useSelector } from 'react-redux';

import style from  './Column.module.scss';

export interface IColumnProps {
  name: string;
}

export const Column: React.FunctionComponent<IColumnProps> = ({
  name
}) => {
  return <div className={style.Column}>
    <h2 className={style.ColumnHeader}>{name}</h2>
  </div>;
};