import React, { useEffect, useState } from 'react';
import close_icon from '../../images/CloseSquare.svg'
import arrow_icon from '../../images/ArrowSquareDown.svg'
import DefaultButton from '../DefaultButton/DefaultButton';
import DefaultFilterItem from '../DefaultFilterItem/DefaultFilterItem';
import CustomCheckbox from '../CustomCheckbox/CustomCheckbox';
import FilterItemStyle from './FilterItem.module.css';
import { useNavigate, useLocation } from 'react-router';

type FiltersProps = {
  title: string,
  listOfFilterFields: string[],
  setStatus: React.Dispatch<React.SetStateAction<boolean>>,
  ref: React.Ref<any>,
  handleExtendedAll?: () => void,
};

const FilterItem: React.FC<FiltersProps> = React.forwardRef(({ title, listOfFilterFields, setStatus, handleExtendedAll }, ref) => {
  const navigate = useNavigate()
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const [isExtended, setIsExtended] = useState<boolean>(false);

  const [isFullForm, setIsFullForm] = useState<boolean>(() => {

    if (title === "Role" && params.get("Role")?.split(',').length === 3) {
      return true
    }
    else if (title === "Type" && params.get("Type")?.split(',').length === 2) {
      return true
    }
    else if (title === "Status" && params.get("Status")?.split(',').length === 8) {
      return true
    }
    else {
      return false
    }
  })




  const [listOfSelected, setListOfSelected] = useState<string[]>(() => {
    if (title === "Role" && params.get('Role')) {
      return params.get("Role")?.split(",") || [];
    }
    else if (title === "Type" && params.get("Type")) {
      return params.get("Type")?.split(",") || [];
    }
    else if (title === "Status" && params.get("Status")) {
      return params.get("Status")?.split(",") || [];
    }

    else {
      return [];
    }
  });






  const handleExtended = () => {
    if (!isExtended && handleExtendedAll) {
      handleExtendedAll();
    }
    setIsExtended(prev => !prev);
  };

  useEffect(() => {

    // console.log(listOfFilterFields)
    // console.log(title)

    // console.log(params.get("Role")?.split(","))
    console.log(params.get("Role"))

  }, [])

  const handleChoose = (field: string) => {
    const updatedList = [...listOfSelected];
    if (updatedList.includes(field)) {
      updatedList.splice(updatedList.indexOf(field), 1);
    } else {
      updatedList.push(field);
    }
    setListOfSelected(updatedList);
    setIsFullForm(updatedList.length === listOfFilterFields.length);
  };




  const handleApply = () => {
    params.set(title, listOfSelected.join())
    setIsExtended(false)

    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(newUrl);

  };

  React.useImperativeHandle(ref, () => ({
    clearAll,
    setIsExtended
  }));

  const clearAll = () => {
    setListOfSelected([]);
    setIsFullForm(false);

    params.delete(title)
    const newUrl = `${location.pathname}?${params.toString()}`;
    navigate(`../${newUrl}`);

  };

  const chooseAll = () => {
    if (isFullForm) {
      setListOfSelected([]);
    } else {
      setListOfSelected([...listOfFilterFields]);
    }
    setIsFullForm(!isFullForm);
  };

  const isChanged: boolean = !isExtended && listOfSelected.length > 0

  useEffect(() => {
    if (listOfSelected.length > 0) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [listOfSelected])


  return (
    <>
      {!isExtended && listOfSelected.length === 0 && (
        <DefaultFilterItem handleExtended={handleExtended} title={title} />
      )}
      {(isExtended || isChanged) && (
        <div className={FilterItemStyle.extended_filter_item}>
          {listOfSelected.length > 0 && (
            <button onClick={clearAll} className={FilterItemStyle.filter_clear_btn}>
              <img src={close_icon} alt='clear' />
            </button>
          )}
          <div className={FilterItemStyle.filters_name} onClick={handleExtended}>
            {title}
            <div className={FilterItemStyle.vertical_line}></div>
            {listOfSelected.length === 0 ? (
              <>
                <span>Select</span>
                <img src={arrow_icon} alt='arrow' />
              </>
            ) : (
              <>
                {isFullForm ? 'All' : (
                  <>
                    <span>{listOfSelected[0]}</span>
                    {listOfSelected.length > 1 && <div className={FilterItemStyle.overcount}>{`+ ${listOfSelected.length - 1}`}</div>}
                  </>
                )}
              </>
            )}
          </div>
          <div style={(!isExtended && isChanged) ? { display: 'none' } : {}} className={FilterItemStyle.filter_checkboxes_wrap}>
            <p><strong>Filter by {title}:</strong></p>
            <div className={FilterItemStyle.fields}>
              <label>
                <input
                  checked={isFullForm}
                  onChange={chooseAll}
                  type="checkbox"
                  name='All'
                  id='All'
                />
                <CustomCheckbox checked={isFullForm} />
                <span className={isFullForm ? 'checked' : ''} >All</span>
              </label>
              <div className={FilterItemStyle.horizont_line}></div>
              {listOfFilterFields.map((filterField: string, i: number) => (
                <label key={i}>
                  <input
                    type="checkbox"
                    onChange={() => handleChoose(filterField)}
                    name={filterField}
                    id={filterField}
                    checked={listOfSelected.includes(filterField) && filterField === "Role"}
                  />
                  <CustomCheckbox checked={listOfSelected.includes(filterField)} />
                  <span className={listOfSelected.includes(filterField) ? 'checked' : ''} >{filterField}</span>
                </label>
              ))}
            </div>
            <DefaultButton
              disabled={listOfSelected.length === 0}
              setState={handleApply}
              button_text={`Apply ${isFullForm ? '(All)' : `${listOfSelected.length > 0 ? `(${listOfSelected.length})` : ''}`} `}
              width={'100%'}
              height={32}
            />
          </div>
        </div>
      )}
    </>
  );
});

export default FilterItem;
