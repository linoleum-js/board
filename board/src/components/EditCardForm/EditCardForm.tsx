import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@components/shared/Button/Button';

import { updateCard } from '@redux/cards';

import { ICardData } from '@models/ICardData';

import style from './EditCardForm.module.scss';

export interface IAddCardFormProps {
  data: ICardData;
  onSubmit: () => void;
}

export const EditCardForm: React.FunctionComponent<IAddCardFormProps> = ({
  data, onSubmit
}) => {
  const dispatch = useDispatch();
  const { title, text, id, column } = data;
  const [localTitle, setTitle] = useState<string>(title);
  const [localText, setText] = useState<string>(text);

  const handleSubmit = function () {
    dispatch(updateCard({ title: localTitle, text: localText, id, column }));
    onSubmit();
  };

  return <div
    className={style.EditCardForm}
  >
    <textarea
      className={style.EditCardFormHeader}
      onChange={(e) => setTitle(e.target.value)}
      value={localTitle}
    ></textarea>
    <textarea
      value={localText}
      onChange={(e) => setText(e.target.value)}
      className={style.EditCardFormText}
    ></textarea>
    <div
      className={style.EditCardFormBottom}
    >
      <Button
        type="primary"
        onClick={handleSubmit}
        disabled={!localTitle}
      >
        Сохранить
      </Button>
    </div>

    <div className={style.EditCardFormClose}>
      <Button
        onClick={() => onSubmit()}
        icon="close"
      ></Button>
    </div>
  </div>;
};