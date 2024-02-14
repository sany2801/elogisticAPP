import React from 'react';
import PopapModal from '../PopapModal/PopapModal';
import NewParcelItemStyle from './NewParcelItem.module.css'

type NewParcelItemProps = {
  action?: () => void,
  title: string,
  isActive: boolean,
  children?: React.ReactNode,
  step: number,
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const NewParcelItem: React.FC<NewParcelItemProps> = ({ title, isActive, children, step, action, isModalOpen, setIsModalOpen }) => {

  const handleOpenModal = () => {
    if (action) action();
    if (!isActive) return;
    setIsModalOpen(prev => !prev)
  }

  const separatedChildren = React.Children.map(children, (child) => {
    return child
  });

  return (
    <>
      <div onClick={handleOpenModal} className={`${NewParcelItemStyle.newParcelItem} ${isActive ? '' : `${NewParcelItemStyle.disabled_item}`}`}>
        <span className={`${NewParcelItemStyle.newParcelItem_title} ${isActive ? ''
          : `${NewParcelItemStyle.disabled_title}`}`}>{title}</span>
        <div className={`${NewParcelItemStyle.newParcelItem_plus} ${isActive ? ''
          : `${NewParcelItemStyle.disabled_plus}`}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path opacity="0.4" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#CFCFCF" />
            <path d="M16 11.25H12.75V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V11.25H8C7.59 11.25 7.25 11.59 7.25 12C7.25 12.41 7.59 12.75 8 12.75H11.25V16C11.25 16.41 11.59 16.75 12 16.75C12.41 16.75 12.75 16.41 12.75 16V12.75H16C16.41 12.75 16.75 12.41 16.75 12C16.75 11.59 16.41 11.25 16 11.25Z" fill="#737373" />
          </svg>
        </div>
      </div >
      {separatedChildren && separatedChildren.length > 0 && (
        <PopapModal deletePadding={step === 1 ? true : false} active={isModalOpen} setActive={setIsModalOpen}>
          {separatedChildren[step]}
        </PopapModal>
      )}
    </>
  )
}
export default NewParcelItem;