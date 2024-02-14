import React from 'react';
import TimeItemStyle from './TimeItem.module.css';

type TimeItemProps = {
  timePeriod: string,
  selectedPeriod: string | null,
  setSelectedTime: (period: string) => void,
};

const TimeItem: React.FC<TimeItemProps> = ({ timePeriod, selectedPeriod, setSelectedTime }) => {

  const handleChoose = () => setSelectedTime(timePeriod);

  return (
    <div onClick={handleChoose} className={selectedPeriod === timePeriod ? `${TimeItemStyle.default} ${TimeItemStyle.selected}`
        : `${TimeItemStyle.default}`}>
      {timePeriod}
    </div>
  )
}

export default TimeItem;