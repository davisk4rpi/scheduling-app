import axios from 'axios';
import { FETCH_USER, FETCH_EVENTS, FETCH_EVENT } from './types';

import timeJoin from './helpers/timeJoin';

export const fetchUser = () => async dispatch => {
  console.log(10);
  const res = await axios.get('/api/current_user');
  console.log(res);
  // all import info is attached to the 'data' property of the response
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitEvent = (values, history) => async dispatch => {
  let { startTimeTime, startTimeDate } = values;
  values.startTime = timeJoin(startTimeTime, startTimeDate);
  const res = await axios.post('/api/events', values);
  history.push('/dashboard');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchEvents = () => async dispatch => {
  const res = await axios.get('/api/events');
  dispatch({ type: FETCH_EVENTS, payload: res.data });
};

export const fetchEvent = id => async dispatch => {
  const res = await axios.get(`/api/events/${id}`);
  dispatch({ type: FETCH_EVENT, payload: res.data });
};

export const updateEvent = (id, values, history) => async dispatch => {
  let { startTimeTime, startTimeDate } = values;
  values.startTime = timeJoin(startTimeTime, startTimeDate);
  const res = await axios.put(`/api/events/${id}`, values);
  history.push('/dashboard');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const deleteEvent = id => async dispatch => {
  const res = await axios.delete(`/api/events/${id}`);
  dispatch({ type: FETCH_EVENTS, payload: res.data });
};
