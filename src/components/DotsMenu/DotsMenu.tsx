import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import threeDots from '../../images/threeDots.svg';
import boxIcon from '../../images/box_icon.png';
import redDeleteIcon from '../../images/redDeleteIcon.png';
import editIcon from '../../images/editIcon.svg';
import axios from 'axios';
import css from './DotsMenu.module.css';

type DotsMenuProps = {
  shownSubMenu?: number,
  i?: number,
  setShownSubMenu?: (index: number) => void,
  items_id?: number,
  handleNewObject?: (itemID: number) => void,
  orderNumber?: number,
  setIsDeleteModalOpen?: (isOpen: boolean) => void,
}

const order_number = sessionStorage.getItem('order_number');
const passedOrderNumber = sessionStorage.getItem('passedOrderNumber');

const DotsMenu: React.FC<DotsMenuProps> = (
  { shownSubMenu, i, setShownSubMenu, items_id, handleNewObject, orderNumber, setIsDeleteModalOpen }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const deleteDraft = async (orderNumb: number) => {
    try {
      const response = await axios.post(
        `https://elogistapp-backend.herokuapp.com/orders/delete_draft_order/${orderNumb}/`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = (order_number: number) => {
    deleteDraft(order_number).then(res => {
      if (res) {
        window.location.reload();
      } else {
        alert('Something went wrong');
      }
    })
  }

  const handleEdit = (order_number: number) => {
    if (order_number) {
      sessionStorage.setItem('passedOrderNumber', order_number.toString());
      navigate('/Order/sender_details');
    }
  }

  const handleSub = (index: number) => {
    if (shownSubMenu === index && setShownSubMenu) {
      setShownSubMenu(-1);
    } else {
      if (setShownSubMenu) setShownSubMenu(index);
    }
  }

  const handleOpen = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  }

  const handleEditItem = () => {
    if (handleNewObject && items_id) {
      handleNewObject(items_id);
    }
  }

  const handleDelItem = () => {
    if (setIsDeleteModalOpen) {
      setIsDeleteModalOpen(true);
    }
  }

  const handleSaveToItems = () => { }

  return (
    <div onClick={handleOpen} className={css.draftMenu}>
      <img onClick={i ? () => handleSub(i) : () => { }} className={css.dots} src={threeDots} alt="draft" />&nbsp;&nbsp;&nbsp;
      {i ? (
        <div style={{ display: shownSubMenu === i ? 'block' : 'none' }} className={css.subMenu}>
          <div onClick={() => handleEdit(orderNumber || +passedOrderNumber! || +order_number!)} className={css.menuItm}>
            <img src={editIcon} alt="edit" />
            <span>Edit</span>
          </div>
          <div onClick={() => handleDelete(orderNumber! || +passedOrderNumber! || +order_number!)} className={`${css.menuItm} ${css.red}`}>
            <img src={redDeleteIcon} alt="delete" />
            <span>Delete</span>
          </div>
        </div>
      ) : (
        <div style={{ display: isOpen ? 'block' : 'none' }} className={css.subMenu}>
          {isOpen && (
            <>
              <div onClick={handleEditItem} className={css.menuItm}>
                <img src={editIcon} alt="edit" />
                <span>Edit</span>
              </div>
              <div onClick={handleSaveToItems} className={css.menuItm}>
                <img src={boxIcon} alt="edit" />
                <span>Save to items</span>
              </div>
              <div onClick={handleDelItem} className={`${css.menuItm} ${css.red}`}>
                <img src={redDeleteIcon} alt="delete" />
                <span>Delete</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DotsMenu;