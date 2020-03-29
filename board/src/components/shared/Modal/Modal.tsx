import React from 'react';

import style from './Modal.module.scss';

export const Modal: React.FunctionComponent<any> = ({
  children,
  isOpen,
  onClose
}) => {
  return isOpen ? <div
    className={style.Modal}
  >
    <div
      className={style.ModalOverlay}
      onClick={onClose}
    ></div>
    <div className={style.ModalContent}>
      {children}
    </div>
  </div> : null;
};