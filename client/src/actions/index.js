import axios from 'axios';
import { FETCH_USER, FETCH_EVENTS, FETCH_EVENT } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  // all import info is attached to the 'data' property of the response
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitEvent = (values, history) => async dispatch => {
  let { startTimeTime, startTimeDate } = values;
  let startTime;
  if (startTimeDate) {
    const startDate = Date.parse(startTimeDate);
    startTimeTime = new Date(startTimeTime);
    const time =
      (startTimeTime.getHours() * 60 + startTimeTime.getMinutes()) * 60 * 1000;
    startTime = startDate + time;
  } else {
    startTime = Date.now();
  }
  values.startTime = startTime;
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
  let startTime;
  if (startTimeDate) {
    const startDate = Date.parse(startTimeDate);
    startTimeTime = new Date(startTimeTime);
    const time =
      (startTimeTime.getHours() * 60 + startTimeTime.getMinutes()) * 60 * 1000;
    startTime = startDate + time;
  } else {
    startTime = Date.now();
  }
  values.startTime = startTime;
  const res = await axios.put(`/api/events/${id}`, values);
  history.push('/dashboard');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const deleteEvent = id => async dispatch => {
  const res = await axios.delete(`/api/events/${id}`);
  dispatch({ type: FETCH_EVENTS, payload: res.data });
};
