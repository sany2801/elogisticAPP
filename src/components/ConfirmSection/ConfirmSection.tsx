import React from 'react';
import css from './ConfirmSection.module.css';

type ConfirmSectionProps = {
  title: string;
  children: React.ReactNode;
}

const ConfirmSection: React.FC<ConfirmSectionProps> = ({ title, children }) => {


  return (
    <>
      <div className={css.title}>{title}</div>
      <div className={css.contentWrap}>
        {children}
      </div>
      <div className={css.line} />
    </>
  );
};

export default ConfirmSection;