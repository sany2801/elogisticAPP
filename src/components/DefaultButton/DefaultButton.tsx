import React from 'react';
import DefaultButtonStyle from './DefaultButton.module.css'

type Default_buttonProps = {
  setState: () => void,
  button_text: string,
  width: number | string,
  height: number | string,
  disabled?: boolean
};

const DefaultButton: React.FC<Default_buttonProps> = (props) => {
  return (
    <button
      disabled={props.disabled}
      style={{ width: props.width, height: props.height }}
      className={DefaultButtonStyle.default_button}
      onClick={props.setState}
    >
      {props.button_text}
    </button>
  );
};

export default DefaultButton;