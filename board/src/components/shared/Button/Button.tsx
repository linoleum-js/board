import React from 'react';
import classnames from 'classnames';

import { Icon } from '@components/shared/Icon/Icon';

import style from './Button.module.scss';

export const Button: React.FunctionComponent<any> = ({
  children,
  type,
  icon,
  ...props
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

export const ButtonGroup: React.FunctionComponent<any> = ({
  children,
  ...props
}) => {
  return <div
    className={style.ButtonGroup}
    {...props}
  >
    {children}
  </div>;
};