import React from 'react'; 
import classnames from 'classnames'; 
import {} from '@material-ui/core';
import {} from '@material-ui/icons';
import {} from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles'; 
@withStyles(theme => ({
	root: {
		display: 'flex', 
	}, 
	title: {
		textAlign: 'right', 
		width: 100, 
		marginRight: theme.spacing.unit, 
	}, 
	body: {}, 
}))
export default class Field extends React.Component
{
	render()
	{
		const { 
			classes, 
			title, 
			children, 
		} = this.props;
		return (
			<div className={classnames(classes.root)}>
				<div className={classnames(classes.title)}>{title} : </div>
				<div className={classnames(classes.body)}>{children}</div>
			</div>
		);
	}
};