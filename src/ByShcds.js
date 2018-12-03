import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import numeral from 'numeral';
import {} from '@material-ui/core';
import {} from '@material-ui/icons';
import {} from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
@connect(({ routines: { byShcds } ,...state }) => ({ ...state, ...byShcds }))
@withRouter, 
@withStyles(theme => ({
	root: {}, 
}))
export default class ByShcds extends React.Component
{
	render()
	{
		const {
			classes, 
			params, 
			pending, 
			error, 
			data, 
		} = this.props; 
		return (
			<Paper className={classenames(classes.paper, classes.root)}>
			</Paper>
		);
	}
};