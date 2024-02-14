import React, { useEffect, useState } from 'react';
import axios from 'axios';
import diagonal_cross_icon from '../../images/DiagonalCrossIcon.svg';
import filter_arrow_down from '../../images/FilterArrowDown.svg'
import filter_arrow_up from '../../images/FilterArrowUp.svg'
import filter_double_arrow from '../../images/FilterDoubleArrow.svg'
import FilterItem from '../FilterItem/FilterItem';
import FilterByCost from '../FilterByCost/FilterByCost';
import FilterByDate from '../FilterByDate/FilterByDate';
import FilterByTrackingNumber from '../FilterByTrackingNumber/FilterByTrackingNumber';
import TablePagination from '../TablePagination/TablePagination';
import DotsMenu from '../DotsMenu/DotsMenu';
import css from './ListOfOrders.module.css';
import { useLocation, useNavigate } from 'react-router';


type OrderType = {
  role: string;
  type: string;
  tracking_number: number;
  from: string;
  to: string;
  order_date: string;
  cost: number;
  status: string;
};

const roleFields = ['Sender', 'Recipient', 'Payer']
const typeFields = ['Parcel', 'Moving']
const statusFields = ['New', 'In progress', 'Awaiting payment', 'Paid', 'Accepted', 'In transit', 'Complete', 'Failed']

type PropsType = {
  isDraft?: boolean;
  shownSubMenu?: number;
  setShownSubMenu?: (value: number) => void;
}

const ListOfOrders: React.FC<PropsType> = ({ isDraft, shownSubMenu, setShownSubMenu }) => {
  const [data, setData] = useState<OrderType[]>([])
  const [isRoleChanged, setIsRoleChanged] = useState<boolean>(false)
  const [isTypeChanged, setIsTypeChanged] = useState<boolean>(false)
  const [isDateChanged, setIsDateChanged] = useState<boolean>(false)
  const [isCostChanged, setIsCostChanged] = useState<boolean>(false)
  const [isStatusChanged, setIsStatusChanged] = useState<boolean>(false)
  const [isTrackingChanged, setIsTrackingChanged] = useState<boolean>(false)
  const filterRoleRef = React.useRef<{ clearAll: () => void, setIsExtended: (isExtended: boolean) => void } | null>(null);
  const filterTypeRef = React.useRef<{ clearAll: () => void, setIsExtended: (isExtended: boolean) => void } | null>(null);
  const filterStatusRef = React.useRef<{ clearAll: () => void, setIsExtended: (isExtended: boolean) => void } | null>(null);
  const filterCostRef = React.useRef<{ handleClear: () => void, setIsExtended: (isExtended: boolean) => void } | null>(null);
  const filterDateRef = React.useRef<{ handleClear: () => void, setIsExtended: (isExtended: boolean) => void } | null>(null);
  const filterTrackingRef = React.useRef<{ handleClear: () => void, setIsExtended: (isExtended: boolean) => void } | null>(null);
  const isSomethingChanged = isRoleChanged || isTypeChanged || isDateChanged || isCostChanged || isStatusChanged || isTrackingChanged
  const [currentPage, setCurrentPage] = useState(0);

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string }>({
    key: '',
    direction: '',
  });
  const navigate = useNavigate()
  const location = useLocation();


  const pageSize = 20; // Number of rows per page
  const totalPages = Math.ceil(data.length / pageSize);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://elogistapp-backend.herokuapp.com/orders/list_user_orders/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }

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

  const handleClearAll = () => {

    if (filterRoleRef.current) {
      filterRoleRef.current.clearAll();

    }
    if (filterTypeRef.current) {
      filterTypeRef.current.clearAll();
    }
    if (filterStatusRef.current) {
      filterStatusRef.current.clearAll();
    }
    if (filterCostRef.current) {
      filterCostRef.current.handleClear();
    }
    if (filterDateRef.current) {
      filterDateRef.current.handleClear();
    }
    if (filterTrackingRef.current) {
      filterTrackingRef.current.handleClear();
    }
    navigate("../shipments")
  }

  const handleExtendedAll = (): void => {
    if (filterRoleRef.current) {
      filterRoleRef.current.setIsExtended(false);
    }
    if (filterTypeRef.current) {
      filterTypeRef.current.setIsExtended(false);
    }
    if (filterStatusRef.current) {
      filterStatusRef.current.setIsExtended(false);
    }
    if (filterCostRef.current) {
      filterCostRef.current.setIsExtended(false);
    }
    if (filterDateRef.current) {
      filterDateRef.current.setIsExtended(false);
    }
    if (filterTrackingRef.current) {
      filterTrackingRef.current.setIsExtended(false);
    }
  }

  const getHeaderName = (name: string) => {
    switch (name) {
      case 'role':
        return 'Role';
      case 'type':
        return 'Type';
      case 'tracking_number':
        return 'Tracking number';
      case 'from':
        return 'From';
      case 'to':
        return 'To';
      case 'order_date':
        return 'Order date';
      case 'cost':
        return 'Cost';
      case 'status':
        return 'Status';
      default:
        return '';
    }
  }

  const getStatusClassName = (status: string) => {
    switch (status) {
      case 'New':
        return `${css.status_new}`;
      case 'In progress':
        return `${css.statu_in_progress}`;
      case 'Awaiting payment':
        return `${css.status_awaiting_payment}`;
      case 'Paid':
        return `${css.status_paid}`;
      case 'Accepted':
        return `${css.status_accepted}`;
      case 'In transit':
        return `${css.status_in_transit}`;
      case 'Complete':
        return `${css.status_complete}`;
      case 'Failed':
        return `${css.status_failed}`;
      default:
        return '';
    }
  }

  const closeSubMenu = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    if (setShownSubMenu) {
      setShownSubMenu(-1);
    }
  }

  useEffect(() => {
    getData().then(res => {
      if (res) {
        if (isDraft) {
          const correctedData: OrderType[] = res.data.filter((item: any) => item.order_status === 'Draft')
            .map((item: any) => {
              return {
                role: item.role,
                type: item.order_type,
                tracking_number: +item.order_number,
                from: item.shipper.shipper_city,
                to: item.consignee.consignee_city,
                order_date: item.date_creation,
                cost: item.total_cost,
                status: item.order_status,
              };
            })
          if (correctedData) setData(correctedData)
        } else {
          const correctedData: OrderType[] = res.data.filter((item: any) => item.order_status !== 'Draft')
            .map((item: any) => {
              return {
                role: item.role,
                type: item.order_type,
                tracking_number: +item.order_number,
                from: item.shipper.shipper_city,
                to: item.consignee.consignee_city,
                order_date: item.date_creation,
                cost: item.total_cost,
                status: item.order_status,
              };
            })
          if (correctedData) setData(correctedData)
        }
      }
    })
  }, [isDraft])

  return (
    <>
      {paginatedData.length > 0 ? (
        <>
          <div onClick={closeSubMenu} id={css.filters_wrap}>
            <FilterItem handleExtendedAll={handleExtendedAll} ref={filterRoleRef} setStatus={setIsRoleChanged} listOfFilterFields={roleFields} title={'Role'} />
            <FilterItem handleExtendedAll={handleExtendedAll} ref={filterTypeRef} setStatus={setIsTypeChanged} listOfFilterFields={typeFields} title={'Type'} />
            <FilterByDate handleExtendedAll={handleExtendedAll} ref={filterDateRef} setStatus={setIsDateChanged} title={'Date'} />
            <FilterByCost handleExtendedAll={handleExtendedAll} ref={filterCostRef} setStatus={setIsCostChanged} title={'Cost'} />
            <FilterItem handleExtendedAll={handleExtendedAll} ref={filterStatusRef} setStatus={setIsStatusChanged} listOfFilterFields={statusFields} title={'Status'} />
            <FilterByTrackingNumber handleExtendedAll={handleExtendedAll} ref={filterTrackingRef} setStatus={setIsTrackingChanged} title={'Tracking Number'} />
            {isSomethingChanged && (
              <div onClick={handleClearAll} id={css.clear_btn}>
                <img src={diagonal_cross_icon} alt="clear" />
                <span>Clear filters</span>
              </div>
            )}
          </div>

          <table>
            <thead onClick={closeSubMenu}>
              <tr>
                {Object.keys(paginatedData[0]).map((key, i) => {
                  const draft = isDraft && key === 'status';

                  return (
                    <th className={key === 'tracking_number' ? `${css.headerCell} ${css.trNumber}` : `${css.headerCell}`} key={i} onClick={draft ? () => { } : () => requestSort(key)}>
                      <>
                        {draft ? null : (
                          <div className={css.th_wrap}>
                            {getHeaderName(key)}
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
                        )}
                      </>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((order, i) => (
                <tr key={i}>
                  {order && Object.values(order).map((value, idx) => {
                    value = value === '' ? '-' : value

                    return (
                      <td className={idx === 2 ? `${css.bodyCell} ${css.trNumber}` : `${css.bodyCell}`} key={idx}>
                        {value && (idx === 7 ? (
                          <>
                            {isDraft ? (
                              <DotsMenu
                                orderNumber={order.tracking_number}
                                shownSubMenu={shownSubMenu}
                                i={i + 1}
                                setShownSubMenu={setShownSubMenu}
                              />
                            ) : (
                              <div className={getStatusClassName(value.toString())}>
                                {value}
                              </div>
                            )}
                          </>
                        ) : (
                          value
                        ))}
                      </td>
                    )
                  })}
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

          <div id={css.blank_space}></div>
        </>
      ) : (
        <div id={css.no_value_wrap}>
          <span>No shipments yet</span>
          <span id={css.subtext}>All shipments will be displayed here</span>
        </div>
      )
      }
    </>
  );
};

export default ListOfOrders;
