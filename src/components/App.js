import React from 'react';
import classnames from 'classnames';
import {} from '@material-ui/core';
import {} from '@material-ui/icons'; 
import {} from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
@withRouter
@withStyles(theme => ({
	root: {}, 
}))
export default class App extends React.Component
{
	render()
	{
		const {
			history, 
			classes, 
		} = this.props;
		return (
			<div className={classnames(classes.root)}>
				appp
			</div>
		);
	}
};