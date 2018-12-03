import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import numeral from 'numeral';
import {
	Paper, 
	Table, 
	TableRow, 
	TableCell, 
	TableHead, 
	TableBody, 
} from '@material-ui/core';
import {} from '@material-ui/icons';
import {} from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
@withStyles(theme => ({
	root: {}, 
	paper: {
		padding: theme.spacing.unit, 
	}, 
	tableHeadCell: {
		fontWeight: 700, 
	}, 
}))
export default class DataDisplay extends React.Component
{
	state = {
		offset: 0, 
		limit: 25, 
	};
	render() 
	{
		const {
			offset, 
			limit, 
		} = this.state;
		const {
			classes, 
			columns: _columns, 
			data: _data, 
			bodyRowClick = e => e, 
		} = this.props;
		let columns = [ ..._columns ]; 
		let data = _data;
		// columns
		if (columns.length === 0 && data.length > 0)
		{
			columns = Object.keys(data[0]).map(name => ({ name, title: name }));
		}
		// display data
		let display = data;
		// numbering
		columns.unshift({ name: 'no', title: 'No.', type: 'code' });
		display = display.map((row, i) => ({ ...row, no: i + 1 }));
		// last adjustment
		columns = columns.map(({ type, ...other }) =>
		{
			const numeric = [ 'code', 'decimal', 'number' ].includes(type);
			const format = (
				type === 'decimal' ? value => numeral(value).format('0,0') : (
				type === 'number'  ? value => numeral(value).format('0,0.00') : (
				value => value
			)));
			return { type, numeric, format, ...other };
		});
		return (
			<Paper className={classnames(classes.paper, classes.root)}>

				<Table className={classnames(classes.table)}>
					<TableHead className={classnames(classes.tableHead)}>
						<TableRow className={classnames(classes.tableRow)}>
						{columns.map(({ name, title, type }, key) => (
							<TableCell key={key} className={classnames(...[
								classes.tableCell, 
								classes.tableHeadCell, 
								name
							])}
							>
								{title}
							</TableCell>
						))}
						</TableRow>
					</TableHead>
					<TableBody className={classnames(classes.tableBody)}>
					{display.slice(offset, offset + limit).map((row, key) => (
						<TableRow key={key} className={classnames(classes.tableRow)}
							onClick={e => bodyRowClick(e, row)}
						>
						{columns.map(({ name, title, type, numeric, format }, key) => (
							<TableCell key={key} className={classnames(classes.tableCell, name)}
								numeric={numeric}
							>
								{format(row[name])}
							</TableCell>
						))}
						</TableRow>
					))}
					</TableBody>
				</Table>
			</Paper>
		);
	}
};