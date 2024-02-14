import React from 'react';
import "./PhoneNumberInput.css"
import PhoneInput from 'react-phone-number-input';
import InputMask from 'react-phone-number-input/input';
import 'react-phone-number-input/style.css';
import { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';

interface PhoneNumberInputProps {
    value: string | undefined;
    onChange: (value: string | undefined) => void;

}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ value, onChange }) => {



    return (
        <>
            <PhoneInput
                placeholder="Enter phone"
                value={"+"}
                onChange={onChange}
                limitMaxLength={true}
                countryCallingCodeEditable={true}
                error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'}
            />


        </>
    );
};

export default PhoneNumberInput;

