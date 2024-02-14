import React, { useEffect, useState } from 'react';
import close_icon from '../../images/CloseSquare.svg'
import arrow_icon from '../../images/ArrowSquareDown.svg'
import DefaultFilterItem from '../DefaultFilterItem/DefaultFilterItem';
import DefaultButton from '../DefaultButton/DefaultButton';
import WhiteButton from '../WhiteButton/WhiteButton';
import FilterItemStyle from '../FilterItem/FilterItem.module.css'
import FilterByCostStyle from './FilterByCost.module.css'
import { useLocation, useNavigate } from 'react-router';

type FilterByCostProps = {
  title: string,
  setStatus: (status: boolean) => void
  ref: React.Ref<any>,
  handleExtendedAll?: () => void,
};

const FilterByCost: React.FC<FilterByCostProps> = React.forwardRef(({ title, setStatus, handleExtendedAll }, ref) => {
  const [isExtended, setIsExtended] = useState<boolean>(false);
  const [costRangeFrom, setCostRangeFrom] = React.useState<number>(0);
  const [costRangeTo, setCostRangeTo] = React.useState<number>(10000);
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)


  const handleChangeFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +(e.target.value);
    if (value >= 0 && value <= 10000 && value < costRangeTo) {
      setCostRangeFrom(value);
    }
  };

  const handleChangeTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +(e.target.value);
    if (value >= 0 && value <= 10000 && value > costRangeFrom) {
      setCostRangeTo(value);
    }
  };

  useEffect(() => {
    const costUrl = params.get("Cost")
    if (costUrl !== null) {
      const costUrlFrom = costUrl?.slice(0, costUrl?.indexOf(","))
      const costUrlTo = costUrl?.slice(costUrl?.indexOf(",") + 1)
      setCostRangeFrom(+costUrlFrom)
      setCostRangeTo(+costUrlTo)
    }
  }, [params])

  const handleExtended = () => {
    if (!isExtended && handleExtendedAll) {
      handleExtendedAll();
    }
    setIsExtended(prev => !prev);
  };

  const handleClear = () => {
    setCostRangeFrom(0);
    setCostRangeTo(10000);
    params.delete(title)
    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(`../${newUrl}`);

  }

  React.useImperativeHandle(ref, () => ({
    handleClear,
    setIsExtended
  }));

  const handleApply = () => {
    params.set(title, `${costRangeFrom.toString()},${costRangeTo.toString()}`)
    setIsExtended(false)

    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl);
  }

  const notDefaultState: boolean = costRangeFrom !== 0 || costRangeTo !== 10000;

  useEffect(() => {
    if (notDefaultState) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [costRangeFrom, costRangeTo, notDefaultState, setStatus])


  return (
    <>
      {!isExtended && !notDefaultState && (
        <DefaultFilterItem handleExtended={handleExtended} title={title} />
      )}
      {(isExtended || !isExtended && notDefaultState) && (
        <div className={FilterItemStyle.extended_filter_item}>
          {notDefaultState && (
            <button type='button' onClick={handleClear} className={FilterItemStyle.filter_clear_btn}>
              <img src={close_icon} alt='clear' />
            </button>
          )}

          <div className={FilterItemStyle.filters_name} onClick={handleExtended}>
            {title}
            <div className={FilterItemStyle.vertical_line}></div>
            {notDefaultState ? (
              <>
                <span>{`${costRangeFrom}$ - ${costRangeTo}$`}</span>
              </>
            ) : (
              <>
                <span>Select</span>
                {/* <img src={arrow_icon} alt='arrow' /> */}
              </>
            )}
          </div>
          <div style={(!isExtended && notDefaultState) ? { display: 'none' } : {}} className={FilterItemStyle.filter_checkboxes_wrap}>
            <p><strong>Filter by {title}:</strong></p>
            <div className={FilterItemStyle.fields}>
              <div className={FilterByCostStyle.cost_inputs} id={FilterByCostStyle.inputs}>
                <div className={FilterByCostStyle.input_wrap}>
                  <span className={FilterByCostStyle.dollar}>$</span>
                  <input
                    className={FilterByCostStyle.cost_value}
                    value={costRangeFrom}
                    onChange={handleChangeFrom}
                    type="number"
                    name='value_from'
                    id={FilterByCostStyle.value_from}
                  />
                  <span>Minimal cost</span>
                </div>
                <div id={FilterByCostStyle.defis}></div>
                <div className={FilterByCostStyle.input_wrap}>
                  <span className={FilterByCostStyle.dollar}>$</span>
                  <input
                    className={FilterByCostStyle.cost_value}
                    value={costRangeTo}
                    onChange={handleChangeTo}
                    type="number"
                    name='value_to'
                    id={FilterByCostStyle.value_to}
                  />
                  <span>Maximum cost</span>
                </div>
              </div>
              <div id={FilterByCostStyle.buttons_wrap}>
                <DefaultButton setState={handleApply} button_text={'Apply'} width={'100%'} height={32} />
                <WhiteButton setState={handleClear} button_text={'Clear'} width={'100%'} height={32} />
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default FilterByCost;
