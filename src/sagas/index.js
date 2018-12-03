import { put, call, fork, all, takeLatest } from 'redux-saga/effects';
import { take, race, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { sagas } from '../routines';
import { routines, lastPeriod as lastPeriodAction } from '../actions';
export default function *()
{
	const {
		buka, 
		bySyozok, 
	} = routines;
	yield all([
		...sagas, 
		takeLatest(lastPeriodAction, function *()
		{
			const { yyyymm, zdkubn } = yield call(lastPeriod);
			
			yield put(bySyozok.trigger({ yyyymm, zdkubn }));
		}), 
		put(buka.trigger()), 
	]);
};
const lastPeriod = function *()
{
	const {
		periods, 
	} = routines;

	const { timeout, success: { yyyymm, zdkubn } } = yield race({
		tiemout: call(delay, 10 * 1000), 
		success: call(function *()
		{
			yield put(periods.trigger());
			yield take(periods.fulfill);
			const { error, data } = yield select(state => state.routines.periods);
			if (error) 
			{
				throw error;
			}
			if (data.length === 0) throw new Exception('periods empty!!');
			const { yyyymm, zdkubn } = data[0];
			return { yyyymm, zdkubn };
		}), 
	});

	if (timeout)
	{
		throw new Exception('timeout!');
	}


	return { yyyymm, zdkubn };
};