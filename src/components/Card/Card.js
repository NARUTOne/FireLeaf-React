import React from 'react';
import classnames from 'classnames';

const Card = (props) => {
	const {className, children, ...other} = props;

	return (
		<div className={classnames('xj-card', className)} {...other}>
			{children}
		</div>
	);
};

export default Card;