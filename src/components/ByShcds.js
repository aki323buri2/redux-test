import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import numeral from 'numeral';
import {
	Paper, 
} from '@material-ui/core';
import {} from '@material-ui/icons';
import {} from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Pending from './Pending';
import Field from './Field';
import DataDisplay from './DataDisplay';
import { routines } from '../actions';
@connect(({ routines: { byShcds } ,...state }) => ({ ...state, ...byShcds }))
@withRouter
@withStyles(theme => ({
	root: {}, 
}))
export default class ByShcds extends React.Component
{
	componentDidMount()
	{
		const { yyyymm, zdkubn, syozok } = this.props.match.params;
		this.props.dispatch(routines.byShcds.trigger({ yyyymm, zdkubn, syozok }));
	}
	render()
	{
		const {
			classes, 
			params, 
			pending, 
			error, 
			data, 
		} = this.props; 
		const {
			yyyymm, 
			zdkubn, 
			syozok, 
		} = params;
		return (
			<Paper className={classnames(classes.paper, classes.root)}>
				
				<Pending pending={pending} text="商品別在庫金額合計票を取得しています・・・"></Pending>

				<Paper className={classnames(classes.paper, classes.params)}>
					<Field title="締め日">{simeb(yyyymm, zdkubn)}</Field>
					<Field title="所属CD">{syozok}</Field>
					<Field title="件数">{numeral(data.length).format('0,0')}件</Field>
				</Paper>

				<DataDisplay columns={columns} data={data}
				/>

			</Paper>
		);
	}
};
const columns = [
	{ name: 'shcds'  , title: '商品CD', type: 'code', }, 
	{ name: 'shnms'  , title: '商品名', type: 'string', }, 
	{ name: 'kensu'  , title: '件数', type: 'decimal', }, 
	{ name: 'ksuryo' , title: '在庫数量', type: 'number', }, 
	{ name: 'kzkin'  , title: '在庫金額', type: 'decimal', }, 
]; 





const simeb = (yyyymm, zdkubn) => 
{
	if (!yyyymm) return '';
	let simeb = moment(yyyymm, 'YYYYMM').startOf('month');
	if (zdkubn <= 20)
	{
		simeb.add(zdkubn - 1, 'days');
	}
	else
	{
		simeb.endOf('month');
	}
	return simeb.format('YYYY年M月D日');
};