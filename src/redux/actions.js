import { nanoid } from 'nanoid';

import {
  allType,
  noneType,
  oneType,
  twoType,
  threeType,
  cheapType,
  notCheapType,
  showMoreTicketsType,
  setRestTicketsErrorType,
  setSearchIdErrorType,
  setTicketsErrorType,
  setTicketsType,
  setSearchIdType,
  setRestTicketsType,
} from './actionTypes';

export const all = () => ({ type: allType });

export const none = () => ({ type: noneType });

export const one = () => ({ type: oneType });

export const two = () => ({ type: twoType });

export const three = () => ({ type: threeType });

export const cheap = () => ({ type: cheapType });

export const notCheap = () => ({ type: notCheapType });

export const showMoreTickets = () => ({ type: showMoreTicketsType });

export const setRestTicketsError = () => ({ type: setRestTicketsErrorType });

export const setSearchIdError = () => ({ type: setSearchIdErrorType });

export const setTicketsError = () => ({ type: setTicketsErrorType });

export const setSearchId = (payload) => ({ type: setSearchIdType, payload });

export const setTickets = (payload) => ({ type: setTicketsType, payload });

export const setRestTickets = (payload) => ({ type: setRestTicketsType, payload });

// eslint-disable-next-line consistent-return
export const getSearchId = () => async (dispatch) => {
  let resp = await fetch(`https://front-test.beta.aviasales.ru/search`);
  if (resp.ok) {
    resp = await resp.json();
    dispatch(setSearchId(resp.searchId));
    return resp.searchId;
  }
  dispatch(setSearchIdError());
};

export const getTickets = (srchId) => async (disppatch) => {
  let resp = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${srchId}`); // добавить равно перед доларом
  if (resp.ok) {
    resp = await resp.json();
    const respWithIds = resp.tickets.map((el) => {
      // eslint-disable-next-line no-param-reassign
      el.id = nanoid();
      return el;
    });
    disppatch(setTickets(respWithIds));
  } else disppatch(setTicketsError());
};

export const getRestTickets = (srchId) => async (dispatch) => {
  const restTcikets = [];
  for (let i = false; i !== true; ) {
    // eslint-disable-next-line no-await-in-loop
    let response = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${srchId}`);
    if (response.ok) {
      if (response.stop === true) {
        break;
      }
      // eslint-disable-next-line no-await-in-loop
      response = await response.json();
      response = response.tickets.map((el) => {
        // eslint-disable-next-line no-param-reassign
        el.id = nanoid();
        return el;
      });
      restTcikets.push(...response);
    } else {
      dispatch(setRestTicketsError());
      break;
    }
  }
  dispatch(setRestTickets(restTcikets));
};
