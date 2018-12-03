import { createAction } from 'redux-actions';
import { actions as routines } from '../routines';
export {
	routines, 
};
export const lastPeriod = createAction('LAST_PERIOD');