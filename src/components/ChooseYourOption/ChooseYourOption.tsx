import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DefaultButton from '../DefaultButton/DefaultButton';
import Loader from '../Loader/Loader';
import css from './ChooseYourOption.module.css'


export default function ChooseYourOption() {
  const [selectedOption, setSelectedOption] = useState<'moving' | 'parcel' | ''>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();


  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as 'moving' | 'parcel');
  }

  const putNewOrder = async (value: 'moving' | 'parcel' | '') => {
    try {
      const response = await axios.post(
        'https://elogistapp-backend.herokuapp.com/orders/create_order/',
        {
          order_type: value
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  const handleNext = async (): Promise<void> => {
    try {
      const result = await putNewOrder(selectedOption);
      if (result) {
        console.log(result);
        
        sessionStorage.setItem('orderNumber', result.data.order_number);
        navigate('/Order/sender_details');
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      {isLoading && <Loader />}
      <div id={css.optionsWrap}>
        <div id={css.optionsTitleWrap}>
          <h3>Choose your option</h3>
          <p>Which action best describes your shipment</p>
        </div>
        <div id={css.options}>
          <label>
            <input type='radio' value='parcel' checked={selectedOption === 'parcel'} onChange={handleOptionChange} />
            <div className={selectedOption === 'parcel' ? `${css.selectedOpt}` : `${css.option}`}>
              <h3>Parcel</h3>
              <p>a box will be enough</p>
            </div>
          </label>
          <label>
            <input type='radio' value='moving' checked={selectedOption === 'moving'} onChange={handleOptionChange} />
            <div className={selectedOption === 'moving' ? `${css.selectedOpt}` : `${css.option}`}>
              <h3>Moving</h3>
              <p>a truck will be needed</p>
            </div>
          </label>
        </div>
        <DefaultButton disabled={selectedOption === ''} setState={handleNext} button_text={'Next'} width={'100%'} height={40} />
      </div>
    </>
  )
}

