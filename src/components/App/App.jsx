import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import 'antd/dist/antd.css';
import { Alert } from 'antd';

import { idErrorConst, ticketsErrorConst, moreTicketsErrConst } from '../../constants';

import appStyle from './App.module.scss';

import * as actions from '../../redux/actions';

import Tabs from '../Tabs/Tabs';
import TicketList from '../TicketList/TicketList';
import Filters from '../Filters/Filters';

import logo from '../../img/Logo.svg';
import loader from '../../img/Pulse-1.4s-151px.gif';

const App = ({
  getSearchId,
  getTickets,
  getRestTickets,
  showMoreTickets,
  moreTicketsToLoad,
  moreTicketsError,
  searchIdError,
  ticketsError,
  checkBoxes,
}) => {
  useEffect(() => {
    getSearchId().then((res) => {
      getTickets(res);
      getRestTickets(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAnyBoxActive = () => Object.values(checkBoxes).includes(true);

  return (
    <div className={appStyle.container}>
      <header>
        <img className="logo" src={logo} alt="Авиасэйлс лого" />
      </header>
      {searchIdError ? (
        <Alert message={idErrorConst} type="error" showIcon closable />
      ) : (
        <main>
          <Filters />
          <section className={appStyle['tickets-info']}>
            <Tabs />
            {ticketsError ? <Alert message={ticketsErrorConst} type="error" showIcon closable /> : <TicketList />}
            {moreTicketsToLoad ? (
              <img src={loader} alt="загрузка билетов" className={appStyle.loader} />
            ) : (
              <button className={appStyle['show-more']} type="button" onClick={showMoreTickets}>
                ПОКАЗАТЬ ЕЩЁ
              </button>
            )}
            {moreTicketsError && isAnyBoxActive() && (
              <Alert message={moreTicketsErrConst} type="warning" showIcon closable />
            )}
          </section>
        </main>
      )}
    </div>
  );
};

App.propTypes = {
  getSearchId: PropTypes.func.isRequired,
  getTickets: PropTypes.func.isRequired,
  getRestTickets: PropTypes.func.isRequired,
  showMoreTickets: PropTypes.func.isRequired,
  moreTicketsToLoad: PropTypes.bool.isRequired,
  moreTicketsError: PropTypes.bool.isRequired,
  searchIdError: PropTypes.bool.isRequired,
  ticketsError: PropTypes.bool.isRequired,
  checkBoxes: PropTypes.objectOf(PropTypes.bool).isRequired,
};

const mapStatesToProps = (state) => ({
  moreTicketsToLoad: state.mainReducer.moreTicketsToLoad,
  moreTicketsError: state.errorsReducer.moreTicketsError,
  searchIdError: state.errorsReducer.searchIdError,
  ticketsError: state.errorsReducer.ticketsError,
  tickets: state.mainReducer.tickets,
  checkBoxes: state.filter,
});

const mapDispatchToProps = (dispatch) => {
  const { getSearchId, getTickets, getRestTickets, showMoreTickets } = bindActionCreators(actions, dispatch);
  return { getSearchId, getTickets, getRestTickets, showMoreTickets };
};

export default connect(mapStatesToProps, mapDispatchToProps)(App);
