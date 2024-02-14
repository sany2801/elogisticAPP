import React from 'react';
import DayStyle from './Day.module.css';

type DayProps = {
  day: number,
  selectedDay: number | null,
  handleChoose: () => void,
  setSelectedDay: (day: number) => void,
};

const Day: React.FC<DayProps> = ({ day, setSelectedDay, selectedDay, handleChoose }) => {

  const handleClick = () => {
    setSelectedDay(day);
    handleChoose();
  }

  return (
    <td className={selectedDay === day ? `${DayStyle.day} ${DayStyle.selected}`  : `${DayStyle.day}`} onClick={handleClick}>
      {day === 0 ? '' : day}
    </td>
  )
}

export default Day;