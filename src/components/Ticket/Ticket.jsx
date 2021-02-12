import React from 'react';

import PropTypes from 'prop-types';

import ticketStyle from './Ticket.module.scss';

// import s7Logo from '../../img/S7Logo.svg';

const Ticket = ({ ticketToData, ticketFromData, price, carrier }) => {
  const addZeroes = (time) => {
    if (time < 10) {
      return `0${time}`;
    }
    return time;
  };

  const convertTime = (time) => {
    const hours = time / 60;
    const resHours = Math.floor(hours);
    const minutes = (hours - resHours) * 60;
    const resMinutes = Math.round(minutes);
    return `${addZeroes(resHours)}ч ${addZeroes(resMinutes)}м`;
  };

  const transfersConverter = (trs) => {
    if (trs.length === 1) {
      return 'Пересадка';
    }
    if (trs.length === 0) {
      return 'Пересадок';
    }
    return 'Пересадки';
  };

  // Возвращает время посадки и время прилёта
  const calculateArivalTime = (from, to) => {
    const hoursFrom = new Date(from).getHours();
    const minutesFrom = new Date(from).getMinutes();
    const fromToMillsec = Date.parse(new Date(from)) + to * 1000 * 60;
    const hoursTo = new Date(fromToMillsec).getHours();
    const minTo = new Date(fromToMillsec).getMinutes();
    return `${addZeroes(hoursFrom)}:${addZeroes(minutesFrom)} - ${addZeroes(hoursTo)}:${addZeroes(minTo)}`;
  };

  return (
    <ul className={ticketStyle.ticket} type="none">
      <li className={ticketStyle.ticket__price}>
        <p>{`${price} Р`}</p>
      </li>
      <li className={ticketStyle['ticket__img-container']}>
        <img className={ticketStyle.ticket__img} src={`https://pics.avs.io/99/36/${carrier}.png`} alt={carrier} />
      </li>
      <li className={ticketStyle['ticket-item']}>
        <p className={ticketStyle['ticket-item__param']}>{ticketToData.toAndFrom}</p>
        <p className={ticketStyle['ticket-item__value']}>
          {calculateArivalTime(ticketToData.date, ticketToData.timeToFly)}
        </p>
      </li>
      <li className={ticketStyle['ticket-item']}>
        <p className={ticketStyle['ticket-item__param']}>В ПУТИ</p>
        <p className={ticketStyle['ticket-item__value']}>{convertTime(ticketToData.timeToFly)}</p>
      </li>
      <li className={ticketStyle['ticket-item']}>
        <p className={ticketStyle['ticket-item__param']}>{`${ticketToData.transfers.length} ${transfersConverter(
          ticketToData.transfers
        )}`}</p>
        <p className={ticketStyle['ticket-item__value']}>{ticketToData.transfers.join(', ')}</p>
      </li>
      <li className={ticketStyle['ticket-item']}>
        <p className={ticketStyle['ticket-item__param']}>{ticketFromData.toAndFrom}</p>
        <p className={ticketStyle['ticket-item__value']}>
          {calculateArivalTime(ticketFromData.date, ticketFromData.timeToFly)}
        </p>
      </li>
      <li className={ticketStyle['ticket-item']}>
        <p className={ticketStyle['ticket-item__param']}>В ПУТИ</p>
        <p className={ticketStyle['ticket-item__value']}>{convertTime(ticketFromData.timeToFly)}</p>
      </li>
      <li className={ticketStyle['ticket-item']}>
        <p className={ticketStyle['ticket-item__param']}>{`${ticketFromData.transfers.length} ${transfersConverter(
          ticketFromData.transfers
        )}`}</p>
        <p className={ticketStyle['ticket-item__value']}>{ticketFromData.transfers.join(',')}</p>
      </li>
    </ul>
  );
};

Ticket.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  ticketToData: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  ticketFromData: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired,
  carrier: PropTypes.string.isRequired,
};

export default Ticket;
