import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
    setShowModal: (show: boolean) => void;
    popupInfo: {
        showModal: boolean;
        title: string;
        description: string;
    };
    setPopupInfo: (info: { showModal: boolean; title: string; description: string }) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}

interface ModalProviderProps {
    children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
    const [popupInfo, setPopupInfo] = useState({
        showModal: false,
        title: "",
        description: ""
    });

    const contextValue: ModalContextType = {
        setShowModal: (show) => setPopupInfo({ ...popupInfo, showModal: show }),
        popupInfo,
        setPopupInfo,
    };

    return (
        <ModalContext.Provider value={contextValue}>
            {children}
        </ModalContext.Provider>
    );
}
