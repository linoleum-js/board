import React from 'react';
import classnames from 'classnames';

import style from './Icon.module.scss';

export interface IIconProps {
  type: string;
}

export const Icon: React.FunctionComponent<IIconProps> = ({
  type
}) => {
  const typeToClassMap: any = {
    close: style.IconClose,
    add: style.IconAdd
  };
  return <span className={classnames(style.Icon, typeToClassMap[type])}></span>;
};