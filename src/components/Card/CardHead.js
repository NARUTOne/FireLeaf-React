import React from 'react';
import classnames from 'classnames';

const CardHead = (props) => {
	const {className, children, ...other} = props;

	return (
		<div className={classnames('xj-card-head', className)} {...other}>
			{children}
		</div>
	);
};

export default CardHead;