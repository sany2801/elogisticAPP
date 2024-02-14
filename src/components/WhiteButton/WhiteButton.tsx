import React from 'react';
import WhiteButtonStyle from './WhiteButton.module.css'

type White_buttonProps = {
  setState: () => void,
  button_text: string,
  width: number | string,
  height: number | string,
  disabled?: boolean
};

const WhiteButton: React.FC<White_buttonProps> = (props) => {
  return (
    <button
      disabled={props.disabled}
      style={{ width: props.width, height: props.height }}
      className={WhiteButtonStyle.white_button}
      onClick={props.setState}
    >
      {props.button_text}
    </button>
  );
};

export default WhiteButton;