import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './authReducer';
import eventsReducer from './eventsReducer';

export default combineReducers({
  auth: authReducer,
  events: eventsReducer,
  form: reduxForm
});
