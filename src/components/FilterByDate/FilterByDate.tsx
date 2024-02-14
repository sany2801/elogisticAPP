import React, { ChangeEvent, useEffect, useState } from 'react';
import close_icon from '../../images/CloseSquare.svg'
import arrow_icon from '../../images/ArrowSquareDown.svg'
import DefaultButton from '../DefaultButton/DefaultButton';
import WhiteButton from '../WhiteButton/WhiteButton';
import DefaultFilterItem from '../DefaultFilterItem/DefaultFilterItem';
import FilterItemStyle from '../FilterItem/FilterItem.module.css'
import FilterByCostStyle from '../FilterByCost/FilterByCost.module.css'
import FilterByDateStyle from './FilterByDate.module.css'

import { useLocation, useNavigate } from 'react-router';

type FilterByDateProps = {
  title: string,
  setStatus: (status: boolean) => void,
  ref: React.Ref<any>,
  handleExtendedAll?: () => void,
};

const FilterByDate: React.FC<FilterByDateProps> = React.forwardRef(({ title, setStatus, handleExtendedAll }, ref) => {
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')

  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)

  useEffect(() => {
    const dateUrl = params.get("Date")
    if (dateUrl !== null) {
      setDateFrom(dateUrl?.slice(0, 10))
      setDateTo(dateUrl?.slice(11))
    }
  }, [params])

  const handleExtended = () => {
    if (!isExtended && handleExtendedAll) {
      handleExtendedAll();
    }
    setIsExtended(prev => !prev);
  };

  const handleClear = () => {
    setDateFrom('')
    setDateTo('')
    params.delete(title)
    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(`../${newUrl}`);
  }

  React.useImperativeHandle(ref, () => ({
    handleClear,
    setIsExtended
  }));

  const handleApply = (): void => {
    params.set(title, `${dateFrom},${dateTo}`)
    setIsExtended(false)

    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl);

  }

  const handleChangeFrom = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateFrom(value)
  }

  const handleChangeTo = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateTo(value)
  }

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  const isValidChanged = regex.test(dateFrom) && regex.test(dateTo) && (dateFrom <= dateTo)
  const targetedDateFrom = dateFrom.split('-').reverse().join('.');
  const targetedDateTo = dateTo.split('-').reverse().join('.');

  useEffect(() => {
    if (isValidChanged) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [dateFrom, dateTo, isValidChanged, setStatus])

  return (
    <>
      {!isExtended && !isValidChanged && (
        <DefaultFilterItem handleExtended={handleExtended} title={title} />
      )}
      {(isExtended || !isExtended && isValidChanged) && (
        <div className={FilterItemStyle.extended_filter_item}>
          {isValidChanged && (
            <button onClick={handleClear} className={FilterItemStyle.filter_clear_btn}>
              <img src={close_icon} alt='clear' />
            </button>
          )}

          <div className={FilterItemStyle.filters_name} onClick={handleExtended}>
            {title}
            <div className={FilterItemStyle.vertical_line}></div>
            {isValidChanged ? (
              <>
                <span>{`${targetedDateFrom} - ${targetedDateTo}`}</span>
              </>
            ) : (
              <>
                <span>Select</span>
                <img src={arrow_icon} alt='arrow' />
              </>
            )}
          </div>
          <div style={(!isExtended && isValidChanged) ? { display: 'none' } : {}} className={FilterItemStyle.filter_checkboxes_wrap}>
            <p><strong>Filter by {title}:</strong></p>
            <div className={`${FilterItemStyle.fields} ${FilterByDateStyle.date_field}`} >
              <div className={FilterByDateStyle.date_wrap} id={FilterByCostStyle.inputs}>
                <div className={FilterByCostStyle.input_wrap}>
                  <input
                    className={FilterByDateStyle.date_input}
                    onChange={handleChangeFrom}
                    value={dateFrom}
                    type='date'
                    name='date_from'
                    id={FilterByDateStyle.date_from}
                  />
                </div>
                <div id='defis'></div>
                <div className={FilterByCostStyle.input_wrap}>
                  <input
                    className={FilterByDateStyle.date_input}
                    onChange={handleChangeTo}
                    value={dateTo}
                    type='date'
                    name='date_to'
                    id={FilterByDateStyle.date_to}
                  />
                </div>
              </div>
              <div id={FilterByCostStyle.buttons_wrap}>
                <DefaultButton disabled={!isValidChanged} setState={handleApply} button_text={'Apply'} width={'100%'} height={32} />
                <WhiteButton setState={handleClear} button_text={'Clear'} width={'100%'} height={32} />
              </div>

            </div>
          </div>
        </div >
      )}
    </>
  );
});

export default FilterByDate;