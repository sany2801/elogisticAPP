import React from 'react';
import arrow_right from '../../images/ArrowRight.svg';
import arrow_left from '../../images/ArrowLeft.svg';
import css from './TablePagination.module.css';

type TablePaginationProps = {
  isPrevActive: boolean,
  isNextActive: boolean,
  totalPages: number,
  currentPage: number,
  handlePrev: () => void,
  handleNext: () => void,
  setCurrentPage: (page: number) => void,
}

const TablePagination: React.FC<TablePaginationProps> = ({ isPrevActive, isNextActive, totalPages, currentPage, handlePrev, handleNext, setCurrentPage }) => {


  return (
    <div id={css.tablePaginationWrap}>
      <img style={{ opacity: isPrevActive ? 1 : 0.5, cursor: isPrevActive ? 'pointer' : 'default' }} onClick={handlePrev} src={arrow_left} alt="prev" />
      <div id={css.pages}>
        {Array.from(Array(totalPages).keys()).map((page, i) => (
          <div
            key={i}
            className={currentPage === page ? `${css.pageBtn} ${css.activeBtn}` : `${css.pageBtn}`}
            onClick={() => setCurrentPage(page)}
          >
            {page + 1}
          </div>
        ))}

      </div>
      <img style={{ opacity: isNextActive ? 1 : 0.5, cursor: isNextActive ? 'pointer' : 'default' }} onClick={handleNext} src={arrow_right} alt="next" />
    </div>
  );
};

export default TablePagination;