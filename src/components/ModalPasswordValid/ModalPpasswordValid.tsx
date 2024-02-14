import React, { useState } from 'react';
import ModalPasswordValidStyle from "./ModalPasswordValid.module.css"
import { type } from 'os';

type Modal_password_validProps = {

    lenght: string,
    upper_case: string,
    special: string,
    className: string
}

const ModalPpasswordvalid: React.FC<Modal_password_validProps> = ({ lenght, upper_case, special, className }) => {
    return (
        <div className={className}>
            <p className={ModalPasswordValidStyle.tittle_modal_password_valid}>Password must contain:</p>
            <ul className={ModalPasswordValidStyle.error_list}>
                <li className={lenght}>a minimum 8 characters</li>
                <li className={upper_case}>an upper case character</li>
                <li className={special}>a special character</li>
            </ul>
        </div>
    );
};

export default ModalPpasswordvalid;