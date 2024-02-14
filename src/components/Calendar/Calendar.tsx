import React, { useEffect, useState } from 'react';
import arrow_left from '../../images/ArrowLeft.svg';
import arrow_right from '../../images/ArrowRight.svg';
import WeeksDay from '../WeeksDay/WeeksDay';
import Day from '../Day/Day';
import TimeItem from '../TimeItem/TimeItem';
import WhiteButton from '../WhiteButton/WhiteButton';
import DefaultButton from '../DefaultButton/DefaultButton';
import css from './Calendar.module.css'

type CalendarProps = {
  setDate: (date: SelectedDate) => void;
  date: SelectedDate | undefined;
  setIsWhenModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SelectedDate = {
  year: number | null,
  month: number | null,
  day: number | null,
  time?: string | null,
}

export const getMonthsName = (month: number) => {
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

const Calendar: React.FC<CalendarProps> = ({ setDate, date, setIsWhenModalOpen }) => {
  const [firstDayInWeek, setFirstDayInWeek] = useState<number>(0);
  const [daysInMonth, setDaysInMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());
  const [selectedMonth, setselectedMonth] = useState<number | null>(0);
  const [selectedYear, setselectedYear] = useState<number | null>(2023);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const isFormFilled = selectedDay && selectedTime

  const selectedDate: SelectedDate = {
    year: selectedYear,
    month: selectedMonth,
    day: selectedDay,
    time: null,
  }
  const rule: boolean = selectedDate.month === month && selectedDate.year === year;


  const week = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  const data: number[][] = [[]];

  for (let i = 0; i < firstDayInWeek - 1; i++) {
    data[0] = [...data[0], 0];
  }

  let currentRow = data.length - 1;
  for (let i = 1; i <= daysInMonth; i++) {
    if (data[currentRow]?.length < 7) {
      data[currentRow] = [...data[currentRow], i];
    } else {
      data.push([i]);
      currentRow++;
    }
  }

  const handleChoose = () => {
    setselectedMonth(month);
    setselectedYear(year);
  }

  const getDateData = (year: number, month: number) => {
    setDaysInMonth(new Date(year, month, 0).getDate())
    setFirstDayInWeek(new Date(year, month - 1, 1).getDay())
  }

  const handleRightClick = () => {
    if (month === 12) {
      setYear(prev => prev + 1)
      setMonth(1)
    } else {
      setMonth(prev => prev + 1)
    }
  }

  const handleLeftClick = () => {
    if (month === 1) {
      setYear(prev => prev - 1)
      setMonth(12)
    } else {
      setMonth(prev => prev - 1)
    }
  }

  const handleClear = () => {
    setSelectedDay(null);
    setSelectedTime(null);
    setselectedMonth(null);
    setselectedYear(null);
  }

  const handleApply = () => {
    if (selectedTime) {
      selectedDate.time = selectedTime;
    } else {
      alert('Choose a time');
    }
    if (isFormFilled) {
      setDate(selectedDate);
      setIsWhenModalOpen(false);
    }
    // object selectedDate contains selected Date
  }

  useEffect(() => {
    getDateData(year, month);
    if (date) {
      setSelectedDay(date.day);
      setselectedMonth(date.month);
      setselectedYear(date.year);
      setSelectedTime(date.time!);
    }
  }, [year, month, date])

  return (
    <>
      <h2 id={css.calTitle}>Choose a date and time</h2>
      <div id={css.calendarContent}>

        <div id={css.calendar}>
          <div id={css.calendarHeader}>
            <img onClick={handleLeftClick} src={arrow_left} alt="left" />
            <span id={css.calendarHeaderText}>
              {getMonthsName(month)} {year}
            </span>
            <img onClick={handleRightClick} src={arrow_right} alt="right" />
          </div>
          <table>
            <thead>
              <tr className={css.row}>
                {week.map((day, i) => {
                  return <WeeksDay key={i} day={day} />
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => {
                return (
                  <tr className={css.row} key={i}>
                    {row.map((itemDay, j) => {
                      return (
                        <Day
                          key={j}
                          setSelectedDay={setSelectedDay}
                          handleChoose={handleChoose}
                          selectedDay={rule ? selectedDay : null}
                          day={itemDay}
                        />
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div id={css.verticalLine}></div>

        <div id={css.time}>
          <TimeItem timePeriod={'12:00 - 15:00'} selectedPeriod={selectedTime} setSelectedTime={setSelectedTime} />
          <TimeItem timePeriod={'15:00 - 18:00'} selectedPeriod={selectedTime} setSelectedTime={setSelectedTime} />
          <TimeItem timePeriod={'18:00 - 21:00'} selectedPeriod={selectedTime} setSelectedTime={setSelectedTime} />
        </div>
      </div >
      <div id={css.calButtons}>
        <WhiteButton setState={handleClear} button_text={'Clear'} width={99} height={32} />
        <DefaultButton disabled={!isFormFilled} setState={handleApply} button_text={'Apply'} width={99} height={32} />
      </div>
    </>
  )
}
export default Calendar;