import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import {
	Paper, 
} from '@material-ui/core';
import {} from '@material-ui/icons'; 
import {} from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { routines as actions, lastPeriod } from '../actions';
import DataDisplay from './DataDisplay';
import Field from './Field';
import Pending from './Pending';
@withRouter
@connect(({ routines: { bySyozok, buka }, ...state }) => ({ ...state, ...bySyozok, buka }))
@withStyles(theme => ({
	root: {
		position: 'relative', 
	}, 
	paper: {
		padding: theme.spacing.unit, 
	}, 
}))
export default class BySyozok extends React.Component
{
	componentDidMount()
	{
		const { yyyymm, zdkubn } = this.props.match;
		if (yyyymm === undefined)
		{
			this.props.dispatch(lastPeriod());
		}
		else
		{
			this.props.dispatch(actions.bySyozok.trigger({ yyyymm, zdkubn }));
		}
	}
	render()
	{
		const {
			router, 
			classes, 
			buka, 
			params, 
			pending, 
			error, 
			data: _data, 
		} = this.props;
		const {
			yyyymm, 
			zdkubn, 
		} = params;
		const kensu = _data.length;

		let simeb = createDate(yyyymm, zdkubn);

		let data = [ ..._data ];
		data = buka.data.map(({ syozok, ...row }) => 
		{
			return { 
				syozok, 
				...row, 
				...data.find(b => b.syozok === syozok), 
			};
		});
		return (
			<Paper className={classnames(classes.paper, classes.root)}>

				<Pending pending={pending} text="所属別在庫金額一覧を取得しています・・・" />

				<Paper className={classnames(classes.paper, classes.params)}>
					<Field title="締め日">{simeb}</Field>
					<Field title="取得件数">{kensu} / {buka.data.length}</Field>
				</Paper>

				
				{error && (
					<Paper className={classnames(classes.paper, classes.error)}>
					{error.stack.split('\n').map((stack, key) => (
						<div key={key} className={classnames(classes.stack)}>{stack}</div>
					))}
					</Paper>
				)}

				<DataDisplay columns={columns} data={data}
					bodyRowClick={this.bodyRowClick}
				/>

			</Paper>
		);
	}
	bodyRowClick = (e, row) =>
	{
		const { yyyymm, zdkubn, syozok } = row;
		this.props.history.push(`/by-shcds/${yyyymm}/${zdkubn}/${syozok}`);
	}
};
const columns = [
	{ name: 'syozok' , title: '所属CD', type: 'code', }, 
	{ name: 'bukm'   , title: '部署名', type: '', }, 
	{ name: 'kensu' , title: '件数', type: 'decimal', }, 
	{ name: 'kzkin'  , title: '在庫金額', type: 'decimal', }, 
];


const createDate = (yyyymm, zdkubn) => 
{
	let date;
	if (yyyymm && zdkubn)
	{
		date = moment(yyyymm, 'YYYYMM').startOf('month');
		if (zdkubn > 20)
		{
			date.endOf('month');
		}
		else
		{
			date.add(zdkubn - 1, 'days');
		}
		date = date.format('YYYY年M月D日');
	}
	return date;
}