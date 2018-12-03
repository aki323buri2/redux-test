import './index.scss';
import React from 'react'; 
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import { createBrowserHistory as createHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { default as createSaga } from 'redux-saga';
import { createLogger } from 'redux-logger'; 
import reducers from './reducers';
import sagas from './sagas';
import App from './components/App';
import BySyozok from './components/BySyozok';
import ByShcds from './components/ByShcds';
global.reduxLogger = true;
Promise.resolve().then(e => 
{
	const history = createHistory();
	const reducer = combineReducers({
		...reducers, 
		router: connectRouter(history), 
	});
	const saga = createSaga();
	const logger = createLogger({
		predicate: (getState, action) => global.reduxLogger, 
	});
	const middleware = applyMiddleware(...[
		saga, 
		logger, 
		routerMiddleware(history), 
	]);
	const store = createStore(reducer, middleware);
	const app = (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<div>
					<Route path="/" component={App} />
					<Route path="/" component={BySyozok} exact />
					<Route path="/by-syozok/:yyyymm?/:zdkubn?" component={BySyozok} />
					<Route path="/by-shcds/:yyyymm?/:zdkubn?/:syozok?" component={ByShcds} />
				</div>
			</ConnectedRouter>
		</Provider>
	);
	saga.run(sagas);
	render(app, document.body.appendChild(document.createElement('div')));
});