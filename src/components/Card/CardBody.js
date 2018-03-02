import React from 'react';
import classnames from 'classnames';

const CardBody = (props) => {
	const {className, children, ...other} = props;

	return (
		<div className={classnames('xj-card-body', className)} {...other}>
			{children}
		</div>
	);
};

export default CardBody;