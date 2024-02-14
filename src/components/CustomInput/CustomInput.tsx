import React from 'react';
import css from './CustomInput.module.css'

type CustomInputProps = {
  title: string,
  value: string | undefined,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  width?: string,
  type?: string,
  isDifferent?: boolean,
};

const CustomInput: React.FC<CustomInputProps> = ({ value, title, onChange, width, type, isDifferent }) => {

  const correctId = title.replaceAll(' ', '_').replaceAll('*', '').replaceAll('/', '_').toLowerCase();

  return (
    <div className={css.customInpWrap}>
      <div className={css.customInpTitle}>{title}</div>
      {isDifferent ? (
        <input
          onChange={onChange}
          style={{ width: (width ? width : '') }}
          className={css.customInp}
          type={type ? type : "text"}
          value={value}
          id={correctId}
        />
      ) : (
        <input
          onChange={onChange}
          style={{ width: (width ? width : '') }}
          className={css.customInp}
          type={type ? type : "text"}
          defaultValue={value}
          id={correctId}
        />
      )}

    </div>
  )
}
export default CustomInput;