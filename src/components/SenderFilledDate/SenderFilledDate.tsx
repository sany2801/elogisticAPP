import React, { useState } from 'react';
import { SelectedDate } from '../Calendar/Calendar';
import croosIcon from '../../images/DiagonalCrossIcon.svg';
import editIcon from '../../images/editIcon.svg';
import css from './SenderFilledDate.module.css';

type SenderFilledDateProps = {
  date: SelectedDate | undefined
  setDate: (date: SelectedDate | undefined) => void,
  setIsWhenModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const SenderFilledDate: React.FC<SenderFilledDateProps> = ({ date, setDate, setIsWhenModalOpen }) => {
  const [isShown, setIsShown] = useState<boolean>(false);

  const handleMouseOver = () => {
    setIsShown(true);
  }

  const handleMouseOut = () => {
    setIsShown(false);
  }

  const getDaysName = () => {
    const d = new Date(`${getMonthsName(date?.month)}, ${date?.day}, ${date?.year}`);
    switch (d.getDay()) {
      case 0:
        return 'Sunday'
      case 1:
        return 'Monday'
      case 2:
        return 'Tuesday'
      case 3:
        return 'Wednesday'
      case 4:
        return 'Thursday'
      case 5:
        return 'Friday'
      case 6:
        return 'Saturday'
      default:
        return 'Error'
    }

  }

  const getMonthsName = (month: number | null | undefined) => {
    if (month) {
      switch (month) {
        case 1:
          return 'January'
        case 2:
          return 'February'
        case 3:
          return 'March'
        case 4:
          return 'April'
        case 5:
          return 'May'
        case 6:
          return 'June'
        case 7:
          return 'July'
        case 8:
          return 'August'
        case 9:
          return 'September'
        case 10:
          return 'October'
        case 11:
          return 'November'
        case 12:
          return 'December'
        default:
          return 'Error'
      }
    }
  }

  const handleClear = () => {
    setDate(undefined)
  }

  const handleEdit = () => {
    setIsWhenModalOpen(true);
  }

  return (
    <div id={css.wrp}>
      <span>When</span>
      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} id={css.date}>
        <div className={css.rw}><b>Date: </b>&nbsp;&nbsp;{date?.day} {getMonthsName(date?.month)} {date?.year}&nbsp; <p id={css.dayOfTheWeek}>({getDaysName()})</p></div>
        <div className={css.rw}><b>Time: </b>&nbsp;&nbsp;{date?.time}</div>
        {isShown && <img onClick={handleClear} id={css.cls} src={croosIcon} alt="close" />}
        {isShown && <img onClick={handleEdit} id={css.edit} src={editIcon} alt="edit" />}
      </div>
    </div >
  )
}

export default SenderFilledDate;