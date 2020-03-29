import React from 'react';

import { Column, IColumnProps } from '@components/Column/Column';

import style from './Board.module.scss';

export interface IBoardProps {

}

export const Board: React.FunctionComponent<IBoardProps> = () => {
  const columnsProps: IColumnProps[] = [{
    name: 'В работе'
  }, {
    name: 'На проверке'
  }, {
    name: 'Выполнено'
  }];

  return <div className={style.Board}>
    {columnsProps.map((item: IColumnProps) => {  
      return <Column
        {...item}
      />
    })}
  </div>;
};