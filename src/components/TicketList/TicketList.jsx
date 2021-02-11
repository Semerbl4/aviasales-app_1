import React from 'react';

import { connect } from 'react-redux';

import { PropTypes } from 'prop-types';

import ticketListStyle from './TicketList.module.scss';

import Ticket from '../Ticket/Ticket';

const TicketList = ({ tickets, checkAll, check0, check1, check2, check3, tabCheap, ticketsToShow }) => {
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

  const createTickets = () => {
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

    return tickets.map((el) => {
      const ticketInfo = {
        carier: el.carrier,
        id: el.id,
        price: convertPrice(el.price),
        ticketToData: {
          toAndFrom: `${el.segments[0].origin} - ${el.segments[0].destination}`,
          date: el.segments[0].date,
          timeToFly: el.segments[0].duration,
          transfers: el.segments[0].stops,
        },
        ticketFromData: {
          toAndFrom: `${el.segments[1].origin} - ${el.segments[1].destination}`,
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

      if (checkAll) {
        return ticket;
      }

      if (
        check0 &&
        ticketInfo.ticketToData.transfers.length === 0 &&
        ticketInfo.ticketFromData.transfers.length === 0
      ) {
        return ticket;
      }
      if (
        check1 &&
        ticketInfo.ticketToData.transfers.length === 1 &&
        ticketInfo.ticketFromData.transfers.length === 1
      ) {
        return ticket;
      }
      if (
        check2 &&
        ticketInfo.ticketToData.transfers.length === 2 &&
        ticketInfo.ticketFromData.transfers.length === 2
      ) {
        return ticket;
      }
      if (
        check3 &&
        ticketInfo.ticketToData.transfers.length === 3 &&
        ticketInfo.ticketFromData.transfers.length === 3
      ) {
        return ticket;
      }
      return null;
    });
  };

  return (
    <ul className={ticketListStyle['ticket-list']} type="none">
      {createTickets().splice(0, ticketsToShow)}
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
