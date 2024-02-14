import React, {useState, ForwardedRef} from 'react';
import {useSelector} from 'react-redux';

import ModalUserNotification from "../ModalUserNotification/ModalUserNotification";
import InputInfoStyle from "./InputInfo.module.css"

type InputInfoProps = {
    title?: string,
    value: string,
    className: string,
    ref?: any,
    inputStateChang?: (value: boolean) => void | null,
    editState?: boolean,
    forwardedRef?: any,

}

const InputInfo = React.forwardRef(({
                                        title,
                                        value,
                                        inputStateChang,
                                        editState,
                                        forwardedRef
                                    }: InputInfoProps, ref: ForwardedRef<any>) => {

    const [initialValue, setInitialValue] = useState<string>(value);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const confirmation = useSelector((state: any) => state.data.userInfo.confirmation);

    console.log()
    // callback function for isChanged state
    const changeState = (state: boolean) => {

        setIsChanged(state)

    }
    // handle Input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {

        setInitialValue(e.target.value);

        setIsChanged(true)

        if (inputStateChang) inputStateChang(isChanged);
    }


    return (
        <>
            {(!editState && confirmation === null) &&

                <div className={InputInfoStyle.input_info} ref={ref}>
                    <input type='text' onChange={handleInputChange} id={title}
                           value={initialValue} disabled/>
                    <label htmlFor={title}>{title}</label>
                </div>
            }
            {(!editState && confirmation !== null) &&
                <div
                    className={
                        ((title === "Last Name" && confirmation?.last_name_under_consideration) ||
                            (title === "First Name" && confirmation?.first_name_under_consideration)) ? `${InputInfoStyle.input_info_edit}`
                            : `${InputInfoStyle.input_info}`
                    }
                    ref={ref}>
                    <input type='text' onChange={handleInputChange} id={title}
                           value={initialValue} disabled>

                    </input>
                    <label>
                        {title}
                        {((title === "Last Name" && confirmation?.last_name_under_consideration) ||
                            (title === "First Name" && confirmation?.first_name_under_consideration)) && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
                                 fill="#D9BF98" stroke="white" strokeWidth="1.5" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path
                                    d="M14.6666 7.99967C14.6666 11.6797 11.6799 14.6663 7.99992 14.6663C4.31992 14.6663 1.33325 11.6797 1.33325 7.99967C1.33325 4.31967 4.31992 1.33301 7.99992 1.33301C11.6799 1.33301 14.6666 4.31967 14.6666 7.99967Z"/>
                                <path
                                    d="M10.4734 10.1202L8.40675 8.88684C8.04675 8.6735 7.75342 8.16017 7.75342 7.74017V5.00684"/>
                            </svg>
                        )}
                    </label>
                </div>

            }
            {editState &&
                <div className={InputInfoStyle.input_info_edit} ref={ref}>
                    <input type='text' onChange={handleInputChange} id={title}
                           value={initialValue} disabled
                    ></input>
                    <label htmlFor={title}>{title} {(title === "Email") &&
                        <ModalUserNotification title={title} color="#9F9F9F"/>
                    }
                        {(title === "Phone number") &&
                            <ModalUserNotification forwardedRef={forwardedRef} title={title} color="#D0AC80"/>
                        }
                    </label>
                </div>
            }
        </>

    );

})

export default InputInfo;


