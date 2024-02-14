import React, { ChangeEvent } from 'react';
import InputRadioEmailPhoneStyle from "./InputRadioEmailPhone.module.css"


interface InputRadioProps {
    name?: string;
    value?: string;
    label?: string;
    checked?: boolean;
    ID?: string;
    onChange: (value: string) => void;
}

const INPUT_RADIO: React.FC<InputRadioProps> = ({ checked, onChange, }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            onChange(event.target.value);
        }
    };

    return (
        <div className={InputRadioEmailPhoneStyle.typeUser}>
            <input id={InputRadioEmailPhoneStyle.PR}
                value="PR"
                type="radio"
                name="typeUser"
                checked={checked}
                onChange={handleChange}
            ></input>
            <label htmlFor={InputRadioEmailPhoneStyle.PR}>Individual</label>

            <input id={InputRadioEmailPhoneStyle.OR}
                value="OR"
                type="radio"
                name="typeUser"
                checked={checked}
                onChange={handleChange}
            ></input>
            <label htmlFor={InputRadioEmailPhoneStyle.OR}>Business</label>
        </div>

    );
};




export default INPUT_RADIO;