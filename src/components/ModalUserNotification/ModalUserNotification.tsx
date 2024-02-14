import React, {useState} from "react";
import ModalUserNotificationStyle from "./ModalUserNotification.module.css"

type ModalUserNotificationProps = {

    title: string | undefined,
    color:string | undefined,
    forwardedRef?:any

}

const ModalUserNotification: React.FC<ModalUserNotificationProps> = ({forwardedRef,title,color}) => {

    const textEmail: string = `Email can only be changed via support`;
    const textPhone:string = `Click the field to verify your phone number to be able to use it to log into the app`
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const verifyPhone = () => {
        if (forwardedRef.current) forwardedRef.current?.verifyPhonePut()
    };

        return (
        <div className={ModalUserNotificationStyle.svg_container} onMouseEnter={()=> setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8ZM9.16858 5.18799C8.53047 4.62964 7.46986 4.62964 6.83174 5.18799C6.60794 5.38382 6.26776 5.36114 6.07193 5.13734C5.8761 4.91354 5.89878 4.57336 6.12258 4.37753C7.16673 3.4639 8.8336 3.4639 9.87774 4.37753C10.964 5.32804 10.964 6.90273 9.87774 7.85324C9.69347 8.01448 9.49052 8.14655 9.27655 8.2501C8.79102 8.48508 8.53862 8.80567 8.53862 9.07692V9.61539C8.53862 9.91277 8.29755 10.1538 8.00016 10.1538C7.70278 10.1538 7.4617 9.91277 7.4617 9.61539V9.07692C7.4617 8.15864 8.22221 7.56395 8.80741 7.28073C8.93854 7.21727 9.06005 7.13774 9.16858 7.04278C9.76454 6.52132 9.76454 5.70945 9.16858 5.18799ZM8 12.3077C8.29738 12.3077 8.53846 12.0666 8.53846 11.7692C8.53846 11.4718 8.29738 11.2308 8 11.2308C7.70262 11.2308 7.46154 11.4718 7.46154 11.7692C7.46154 12.0666 7.70262 12.3077 8 12.3077Z"
                      fill={color}/>
            </svg>
            {(isHovered && title === "Phone number") && (
                <div onClick={verifyPhone} className={`${ModalUserNotificationStyle.popup_phone} ${ModalUserNotificationStyle.popup}`}>
                  {textPhone}
                </div>
            )}
            {(isHovered && title === "Email") && (
                <div className={`${ModalUserNotificationStyle.popup_email} ${ModalUserNotificationStyle.popup}`}>
                    {textEmail}
                </div>
            )}
          </div>
    )
}

export default ModalUserNotification;