import React, { useState } from 'react';
import CheckBoxInputstyle from "./CheckBoxInput.module.css"
interface CHECK_BOX_INPUTPROPS {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const CHECK_BOX_INPUT: React.FC<CHECK_BOX_INPUTPROPS> = ({ checked, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <div className={CheckBoxInputstyle.policy_section}>
            <input id={CheckBoxInputstyle.policy} type="checkbox" checked={checked} onChange={handleChange} />
            <label className={CheckBoxInputstyle.tittlePolicy} htmlFor={CheckBoxInputstyle.policy}>
                I agree with eLogistApp's {" "}
                <a href="#" target='_blank' rel='noreferrer'>Terms of Service </a>
                and {" "}
                <a href="#" target='_blank' rel='noreferrer'>Privacy Policy </a>
            </label>
        </div>
    );
};

export default CHECK_BOX_INPUT;
