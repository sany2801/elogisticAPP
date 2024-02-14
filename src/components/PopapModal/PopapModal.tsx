import React, { ReactNode } from 'react';
import PopapModalStyle from "./PopapModal.module.css"

interface PopapModalProps {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
    deletePadding?: boolean;
    disableClosing?: boolean;
}

const PopapModal: React.FC<PopapModalProps> = ({ deletePadding, active, setActive, children, disableClosing }) => {
    return (
        <div className={active ? `${PopapModalStyle.modal} ${PopapModalStyle.active} ` :
         `${PopapModalStyle.modal}`} onClick={disableClosing ? () => { } : () => setActive(false)}>
            <div style={deletePadding ? { padding: "0px" } : {}} className={active ? `${PopapModalStyle.modal__content} ${PopapModalStyle.active}`
                : `${PopapModalStyle.modal__content}`} onClick={(e) => e.stopPropagation()}>
                {children}
                {disableClosing ? null : (
                    <div className={PopapModalStyle.btn_closse_popap} onClick={() => setActive(false)}>
                        <div></div>
                        <div></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopapModal;
