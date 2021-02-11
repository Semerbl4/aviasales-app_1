import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import cn from 'classnames';

import * as actions from '../../actions';

import tabsStyle from './Tabs.module.scss';

const Tabs = ({ tabCheap, cheap, notCheap }) => {
  const tabCheapCn = cn(tabsStyle['tabs-buttons'], {
    [tabsStyle['tabs-buttons_selected']]: tabCheap,
  });

  const tabNotCheapCn = cn(tabsStyle['tabs-buttons'], {
    [tabsStyle['tabs-buttons_selected']]: !tabCheap,
  });

  // console.log(tabsStyle)

  return (
    <div className={tabsStyle['tabs-container']}>
      <button className={tabCheapCn} type="button" onClick={cheap}>
        САМЫЙ ДЕШЁВЫЙ
      </button>
      <button className={tabNotCheapCn} type="button" onClick={notCheap}>
        САМЫЙ БЫСТРЫЙ
      </button>
    </div>
  );
};

Tabs.propTypes = {
  tabCheap: PropTypes.bool.isRequired,
  cheap: PropTypes.func.isRequired,
  notCheap: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tabCheap: state.tabCheap,
});

export default connect(mapStateToProps, actions)(Tabs);
