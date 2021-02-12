/* eslint-disable no-param-reassign */
import React from 'react';

import { connect } from 'react-redux';

import { PropTypes } from 'prop-types';

import { Alert } from 'antd';

import { nothingFound } from '../../constants';

import ticketListStyle from './TicketList.module.scss';

import Ticket from '../Ticket/Ticket';

const TicketList = ({ tickets, checkAll, check0, check1, check2, check3, tabCheap, ticketsToShow }) => {
  // эта функция визуально преобразовывает цену, чтобы она имела пробел в себе
  const convertPrice = (price) => {
    let newPrice = price.toString();

    if (+newPrice >= 100000) {
      newPrice = newPrice.split('');
      const firstHalfNewPrice = newPrice.splice(0, 3);
      newPrice = [...firstHalfNewPrice, ' ', ...newPrice];
      return newPrice.join('');
    }

    if (+newPrice >= 10000) {
      newPrice = newPrice.split('');
      const firstHalfNewPrice = newPrice.splice(0, 2);
      newPrice = [...firstHalfNewPrice, ' ', ...newPrice];
      return newPrice.join('');
    }

    return price;
  };

  // эта функция создаёт список билетов и сортируе их как по значениям табов, так и по значениям чекбоксов
  const createTickets = (toShow) => {
    if (tabCheap) {
      tickets.sort((sortVal1, sortVal2) => sortVal1.price - sortVal2.price);
    }

    if (!tabCheap) {
      tickets.sort(
        (sortVal1, sortVal2) =>
          sortVal1.segments[0].duration +
          sortVal1.segments[1].duration -
          (sortVal2.segments[0].duration + sortVal2.segments[1].duration)
      );
    }

    let filteredTickets = tickets.filter((el) => {
      const zeroStops = check0 ? 0 : undefined;
      const oneStop = check1 ? 1 : undefined;
      const twoStops = check2 ? 2 : undefined;
      const threeStops = check3 ? 3 : undefined;

      const arrOfChecks = [checkAll, zeroStops, oneStop, twoStops, threeStops];

      // тут я отключил правило линта, которое запрещало переписывать параметр acc. Мне это нужно, чтобы вернуть булевый тип данных
      const filterResult = arrOfChecks.reduce((acc, elemOfchecks) => {
        if (elemOfchecks === true && acc === false) {
          acc = elemOfchecks;
          return acc;
        }
        if (elemOfchecks === 0 && acc === false) {
          acc = el.segments[0].stops.length === elemOfchecks && el.segments[1].stops.length === elemOfchecks;
          return acc;
        }
        if (elemOfchecks === 1 && acc === false) {
          acc = el.segments[0].stops.length === elemOfchecks && el.segments[1].stops.length === elemOfchecks;
          return acc;
        }
        if (elemOfchecks === 2 && acc === false) {
          acc = el.segments[0].stops.length === elemOfchecks && el.segments[1].stops.length === elemOfchecks;
          return acc;
        }
        if (elemOfchecks === 3 && acc === false) {
          acc = el.segments[0].stops.length === elemOfchecks && el.segments[1].stops.length === elemOfchecks;
          return acc;
        }
        return acc;
      }, false);

      return filterResult;
    });

    filteredTickets = filteredTickets
      .map((el) => {
        const ticketInfo = {
          carier: el.carrier,
          id: el.id,
          price: convertPrice(el.price),
          ticketToData: {
            toAndFrom: `${el.segments[0].origin} — ${el.segments[0].destination}`,
            date: el.segments[0].date,
            timeToFly: el.segments[0].duration,
            transfers: el.segments[0].stops,
          },
          ticketFromData: {
            toAndFrom: `${el.segments[1].origin} — ${el.segments[1].destination}`,
            date: el.segments[0].date,
            timeToFly: el.segments[1].duration,
            transfers: el.segments[1].stops,
          },
        };

        const ticket = (
          <li className={ticketListStyle['ticket-list__item']} key={ticketInfo.id}>
            <Ticket
              carrier={ticketInfo.carier}
              ticketToData={ticketInfo.ticketToData}
              ticketFromData={ticketInfo.ticketFromData}
              price={ticketInfo.price}
            />
          </li>
        );
        return ticket;
      })
      // этот слайс отвечает за количество показываемых билетов
      .slice(0, toShow);

    if (filteredTickets.length === 0) {
      return (
        <li>
          <Alert className={ticketListStyle.infoNotif} message={nothingFound} type="info" showIcon />
        </li>
      );
    }
    return filteredTickets;
  };

  return (
    <ul className={ticketListStyle['ticket-list']} type="none">
      {createTickets(ticketsToShow)}
    </ul>
  );
};

TicketList.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  checkAll: PropTypes.bool.isRequired,
  check0: PropTypes.bool.isRequired,
  check1: PropTypes.bool.isRequired,
  check2: PropTypes.bool.isRequired,
  check3: PropTypes.bool.isRequired,
  tabCheap: PropTypes.bool.isRequired,
  ticketsToShow: PropTypes.number.isRequired,
};

const mapStatesToProps = (state) => ({
  tickets: state.tickets,
  checkAll: state.filter.checkAll,
  check0: state.filter.check0,
  check1: state.filter.check1,
  check2: state.filter.check2,
  check3: state.filter.check3,
  tabCheap: state.tabCheap,
  ticketsToShow: state.ticketsToShow,
});

export default connect(mapStatesToProps)(TicketList);
