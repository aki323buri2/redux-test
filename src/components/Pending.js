import React from 'react';
import classnames from 'classnames';
import {
	Fade, 
	CircularProgress, 
} from '@material-ui/core';
import {} from '@material-ui/icons';
import {} from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
@withStyles(theme => ({
	root: {
		position: 'absolute', 
		left: 0, 
		top: 0, 
		right: 0, 
		bottom: 0, 
		background: theme.palette.action.active, 
		color: theme.palette.common.white, 
		display: 'flex', 
		justifyContent: 'center', 
		alignItems: 'center', 
	}, 

	circularProgress: {
		fontSize: 'inherit', 
		marginRight: theme.spacing.unit, 
	}, 
}))
export default class Pending extends React.Component
{
	render()
	{
		const {
			classes, 
			pending, 
			text, 
		} = this.props;
		return (
			<Fade in={pending} unmountOnExit>
				<div className={classnames(classes.root)}>
					<div className={classnames(classes.displayContainer)}>
						<CircularProgress className={classnames(classes.circularProgress)}/>
						<div className={classnames(classes.text)}>{text}</div>
					</div>
				</div>
			</Fade>
		);
	}
}