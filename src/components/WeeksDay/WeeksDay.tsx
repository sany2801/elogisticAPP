import React from 'react';
import WeeksDayStyle from'./WeeksDay.module.css';

type DayProps = {
  day: string
};

const WeeksDay: React.FC<DayProps> = ({ day }) => {

  return <th className={WeeksDayStyle.dayOfTheWeek}>{day}</th>
}
export default WeeksDay;