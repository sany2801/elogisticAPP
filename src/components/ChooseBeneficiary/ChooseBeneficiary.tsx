import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import DefaultButton from '../DefaultButton/DefaultButton';
import WhiteButton from '../WhiteButton/WhiteButton';
import optionCss from'../ChooseYourOption/ChooseYourOption.module.css'
import css from './ChooseBeneficiary.module.css'

type Props = {
  moveBack: () => void
}

function ChooseBeneficiary({ moveBack }: Props) {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate()

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  }

  const handleStart = () => {

    // implement saving of Chosen option
    navigate('/Order/sender_details')
  }

  return (
    <div id={optionCss.optionsWrap}>
      <div id={optionCss.optionsTitleWrap}>
        <h3>Who will be the beneficiary</h3>
        <p>Which of these options better describes the recipient?</p>
      </div>
      <div id={optionCss.options}>
        <label>
          <input type='radio' value='individual' checked={selectedOption === 'individual'} onChange={handleOptionChange} />
          <div className={selectedOption === 'individual' ? `${optionCss.option} selected`  : `${optionCss.option}`}>
            <h3>Individual</h3>
            <p>is a private shipment</p>
          </div>
        </label>
        <label>
          <input type='radio' value='company' checked={selectedOption === 'company'} onChange={handleOptionChange} />
          <div className={selectedOption === 'company' ? `${optionCss.option} selected`  : `${optionCss.option}`}>
            <h3>Company</h3>
            <p>beneficiary is a legal entity </p>
          </div>
        </label>
      </div>
      <div id={css.actionsButtonsWrap}>
        <WhiteButton setState={moveBack} button_text={'Back'} width={'100%'} height={40} />
        <DefaultButton disabled={selectedOption === ''} setState={handleStart} button_text={'Start'} width={'100%'} height={40} />
      </div>
    </div>
  )
}

export default ChooseBeneficiary