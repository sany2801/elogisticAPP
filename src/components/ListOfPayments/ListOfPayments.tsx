import React, { useState } from 'react';
import filter_arrow_down from '../../images/FilterArrowDown.svg';
import filter_arrow_up from '../../images/FilterArrowUp.svg';
import filter_double_arrow from '../../images/FilterDoubleArrow.svg';
import DownLoadBtn from '../DownLoadBtn/DownLoadBtn';
import TablePagination from '../TablePagination/TablePagination';
import css from './ListOfPayments.module.css';

type PaymentType = {
  date: string,
  order_id: number,
  payment_method: string,
  cost: number,
  status: string,
}

const mockData: PaymentType[] = [
  {
    date: '2023-04-10',
    order_id: 1,
    payment_method: 'Credit Card',
    cost: 100,
    status: 'Successfully',
  },
  {
    date: '2023-04-11',
    order_id: 2,
    payment_method: 'Debit Card',
    cost: 200,
    status: 'In progress',
  },
  {
    date: '2023-04-12',
    order_id: 3,
    payment_method: 'Cash',
    cost: 300,
    status: 'Successfully',
  },
  {
    date: '2023-04-13',
    order_id: 4,
    payment_method: 'Credit Card',
    cost: 400,
    status: 'Canceled',
  },
  {
    date: '2023-04-14',
    order_id: 5,
    payment_method: 'Debit Card',
    cost: 500,
    status: 'Successfully',
  },
  {
    date: '2023-04-15',
    order_id: 6,
    payment_method: 'Cash',
    cost: 600,
    status: 'In progress',
  },
  {
    date: '2023-04-16',
    order_id: 7,
    payment_method: 'Credit Card',
    cost: 700,
    status: 'Successfully',
  },
  {
    date: '2023-04-17',
    order_id: 8,
    payment_method: 'Debit Card',
    cost: 800,
    status: 'Canceled',
  },
  {
    date: '2023-04-18',
    order_id: 9,
    payment_method: 'Cash',
    cost: 900,
    status: 'Successfully',
  },
  {
    date: '2023-04-19',
    order_id: 10,
    payment_method: 'Credit Card',
    cost: 1000,
    status: 'In progress',
  },
  {
    date: '2023-04-20',
    order_id: 11,
    payment_method: 'Debit Card',
    cost: 1100,
    status: 'Successfully',
  }
]

const ListOfPayments: React.FC = () => {
  const [data, setData] = useState<PaymentType[]>(mockData)
  const [currentPage, setCurrentPage] = useState(0);

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string }>({
    key: '',
    direction: '',
  });

  const pageSize = 10; // Number of rows per page
  const totalPages = Math.ceil(data.length / pageSize);

  // const getData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://elogistapp-backend.herokuapp.com/orders/list_user_orders/`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("access")}`,
  //         },
  //       }
  //     );
  //     return response;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const sortedData = () => {
    if (sortConfig.key !== '' && data) {
      const sorted = [...data].sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      return sorted;
    }
    return data;
  };

  const paginatedData = sortedData().slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const isPrevActive = currentPage > 0
  const handlePrev = () => {
    if (isPrevActive) setCurrentPage(prev => prev - 1)
  }

  const isNextActive = currentPage < totalPages - 1
  const handleNext = () => {
    if (isNextActive) setCurrentPage(prev => prev + 1)
  }

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getColor = (status: string) => {
    switch (status) {
      case 'Successfully':
        return '#3D910A';
      case 'In progress':
        return '#B1881D';
      case 'Canceled':
        return '#D83F3F';
      default:
        return 'black';
    }
  }

  const getHeadername = (key: string) => {
    switch (key) {
      case 'date':
        return 'DATE';
      case 'order_id':
        return 'ORDER ID';
      case 'payment_method':
        return 'PAYMENT METHOD';
      case 'cost':
        return 'COST';
      case 'status':
        return 'STATUS';
      default:
        return key;
    }
  }

  const handleClick = () => { }

  return (
    <>
      {paginatedData.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                {Object.keys(paginatedData[0]).map((key, i) => {
                  return (
                    <th className={css.headerCell} key={i} onClick={() => requestSort(key)}>
                      <div className={css.th_wrap}>
                        {getHeadername(key)}
                        {sortConfig.key === '' && (
                          <img className={css.defaultArrows} src={filter_double_arrow} alt='default' />
                        )}
                        {sortConfig.key === key && (
                          <div className={css.arrows}>
                            {sortConfig.direction === 'ascending' ? (
                              <img src={filter_arrow_down} alt='down' />
                            ) : (
                              <img src={filter_arrow_up} alt='up' />
                            )}
                          </div>
                        )}
                      </div>
                    </th>
                  )
                })}
                <th className={`${css.bodyCell} ${css.statement}`}>INVOICE</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((payment: PaymentType, i: number) => (
                <tr key={i}>
                  {payment && Object.values(payment).map((value, idx) => {
                    value = value === '' ? '-' : value
                    return (
                      <td className={css.bodyCell} key={idx}>
                        {idx === 4 ? (
                          <>
                            <span style={{ color: getColor(value as string) }}>{value}</span>
                          </>
                        ) : (
                          value
                        )}
                      </td>
                    )
                  })}
                  <td className={`${css.bodyCell} ${css.statement}`}>
                    <DownLoadBtn func={handleClick} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <TablePagination
              isPrevActive={isPrevActive}
              isNextActive={isNextActive}
              totalPages={totalPages}
              handlePrev={handlePrev}
              handleNext={handleNext}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className={css.emptyPageWrap}>
          <span className={css.noteTitle}>No payments yet</span>
          <span className={css.noteSubTitle}>When you make your first payment, it will be displayed here</span>
        </div>
      )
      }
    </>
  );
};

export default ListOfPayments;