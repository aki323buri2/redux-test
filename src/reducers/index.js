import { reducers as routines } from '../routines';
import { combineReducers } from 'redux';
export default {
	routines: combineReducers(routines), 
};