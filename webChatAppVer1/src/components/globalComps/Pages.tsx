/**
 * This component implements the ability to switch between different components.
 */
import * as React from 'react';

interface Props {
	items: JSX.Element[];
	index: number;
}

const Pages: React.FC<Props> = (props) => {
	const { items, index } = props;
	return items[index];
};

export default Pages;
