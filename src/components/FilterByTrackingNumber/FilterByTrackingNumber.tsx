import React, { ChangeEvent, useEffect, useState } from 'react';
import DefaultFilterItem from '../DefaultFilterItem/DefaultFilterItem';
import DefaultButton from '../DefaultButton/DefaultButton';
import WhiteButton from '../WhiteButton/WhiteButton';
import close_icon from '../../images/CloseSquare.svg'
import arrow_icon from '../../images/ArrowSquareDown.svg'
import search_icon from '../../images/SearchIcon.svg'
import black_search_icon from '../../images/BlackSearchIcon.png'
import FilterItemStyle from '../FilterItem/FilterItem.module.css'
import FilterByCostStyle from '../FilterByCost/FilterByCost.module.css'
import FilterByTrackingNumberStyle from './FilterByTrackingNumber.module.css'
import { useLocation, useNavigate } from 'react-router';

type FilterByTrackingNumberProps = {
  title: string,
  setStatus: (status: boolean) => void,
  ref: React.Ref<any>,
  handleExtendedAll?: () => void,
};

const FilterByTrackingNumber: React.FC<FilterByTrackingNumberProps> = React.forwardRef(({ title, setStatus, handleExtendedAll }, ref) => {
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')

  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const handleExtended = () => {
    if (!isExtended && handleExtendedAll) {
      handleExtendedAll();
    }
    setIsExtended(prev => !prev);
  };

  const handleFocus = () => {
    setIsFocused(true);
  }

  const handleBlur = () => {
    setIsFocused(false);
  }

  const handleClear = () => {
    setStatus(false)
    setInputValue('')
    params.delete(title)
    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(`../${newUrl}`);
  }

  useEffect(() => {
    const tracking_number = params.get("Tracking Number")
    if (tracking_number !== null) {
      setInputValue(tracking_number)
    }
  }, [params])


  React.useImperativeHandle(ref, () => ({
    handleClear,
    setIsExtended
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(true)
    const value = e.target.value
    setInputValue(value)
  }

  const handleSearch = () => {
    //Shoulb be implemented
  }

  const handleApply = () => {
    params.set(title, inputValue)
    setIsExtended(false)

    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl);
  }

  const isChanged = inputValue !== '';

  useEffect(() => {
    if (isChanged) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [inputValue])

  return (
    <>
      {!isExtended && !isChanged && (
        <DefaultFilterItem handleExtended={handleExtended} title={title} />
      )}
      {(isExtended || !isExtended && isChanged) && (
        <div className={FilterItemStyle.extended_filter_item}>
          {isChanged && (
            <button onClick={handleClear} className={FilterItemStyle.filter_clear_btn}>
              <img src={close_icon} alt='clear' />
            </button>
          )}

          <div className={FilterItemStyle.filters_name} onClick={handleExtended}>
            {title}
            <div className={FilterItemStyle.vertical_line}></div>
            {isChanged ? (
              <>
                <span>{inputValue}</span>
              </>
            ) : (
              <>
                <span>Select</span>
                <img src={arrow_icon} alt='arrow' />
              </>
            )}
          </div>
          <div style={(!isExtended && isChanged) ? { display: 'none' } : {}} id={FilterByTrackingNumberStyle.pop}>
            <p><strong>Filter by {title}:</strong></p>
            <div className={FilterItemStyle.fields}>
              <div id={FilterByTrackingNumberStyle.search_wrap}>
                <img
                  onClick={handleSearch}
                  onMouseOver={handleFocus}
                  onMouseLeave={handleBlur}
                  id={FilterByTrackingNumberStyle.srch_img}
                  src={isFocused ? black_search_icon : search_icon}
                  alt="search"
                />
                <input
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  value={inputValue}
                  type='number'
                  placeholder='Search'
                  name='tracking_input'
                  id={FilterByTrackingNumberStyle.tracking_input}
                />
              </div>
              <div id={FilterByCostStyle.buttons_wrap}>
                <DefaultButton disabled={!isChanged} setState={handleApply} button_text={'Apply'} width={'100%'} height={32} />
                <WhiteButton setState={handleClear} button_text={'Clear'} width={'100%'} height={32} />
              </div>
            </div>
          </div>
        </div >
      )}
    </>
  );
});

export default FilterByTrackingNumber;