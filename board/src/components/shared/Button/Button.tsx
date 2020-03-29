import React from 'react';
import classnames from 'classnames';

import { Icon } from '@components/shared/Icon/Icon';

import style from './Button.module.scss';

export interface IButttonProps {
  type: string;
  props?: any;
  icon?: string;
}

export const Button: React.FunctionComponent<IButttonProps> = ({
  children,
  props,
  type,
  icon
}) => {
  const typeToClassMap: any = {
    primary: style.ButtonPrimary,
    secondary: style.ButtonSecondary
  };
  return <button className={classnames(style.Button, typeToClassMap[type])}
    {...props}
  >
    {icon ?
      <>
        <Icon type={icon} />
        <span className={style.ButtonIconText}>{children}</span>
      </> :
      children
    }
  </button>;
};