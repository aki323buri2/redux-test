import { createRoutine } from 'redux-saga-routines';
import { createAction, handleActions } from 'redux-actions';
import { put, call, fork, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { camelCase, merge } from 'lodash';
import apis from '../apis';
export const basicParams = () => ({
	kjob: {
		since: moment.invalid(), 
		until: moment.invalid(), 
	}, 
	syozok: null, 
	tokuno: [], 
});
export const params = {
	buka: {}, 
	periods: {}, 
	bySyozok: {
		...basicParams(), 
	}, 
	byShcds: {
		...basicParams(), 
		syozok: null, 
	}, 
	aging: {
		...basicParams(), 
		syozok: null, 
	}, 
};
export const actions = Object.keys(params).reduce((actions, name) => Object.assign(actions, {
	[name]: createRoutine(camelCase(name).toUpperCase()), 
}), {});
export const reducers = Object.entries(params).reduce((reducers, [ name, params ]) => Object.assign(reducers, {
	[name]: handleActions({
		[actions[name].trigger]: (state, { payload }) => ({ ...state, params: merge(state.params, payload), pending: true }), 
		[actions[name].success]: (state, { payload }) => ({ ...state, data  : payload, error: null }), 
		[actions[name].failure]: (state, { payload }) => ({ ...state, error : payload }), 
		[actions[name].fulfill]: (state, { payload }) => ({ ...state, pending: false }), 
	}, {
		params, 
		data: [], 
		error: null, 
		pending: false, 
	}), 
}), {});
export const sagas = Object.keys(params).map(name => call(function *()
{
	const action = actions[name];
	const api = apis[name];
	yield takeLatest(action.trigger, function *({ payload })
	{
		try
		{
			const data = yield call(api, payload);
			if (data.error) throw { stack: data.error };
			yield put(action.success(data));
		}
		catch (error)
		{
			yield put(action.failure(error));
		}
		finally
		{
			yield put(action.fulfill());
		}
	});
}));