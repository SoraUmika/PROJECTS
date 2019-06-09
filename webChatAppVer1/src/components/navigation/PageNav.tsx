import * as React from 'react';
import List from '@material-ui/core/List';

import { PageNavFunc, PageNavState } from './props';
import NavItem from '../globalComps/NavItem';
import { NAMES } from '../globalComps/Icon';
import CSS from "../../css";

type Props = PageNavFunc & PageNavState;

const pageNavNames: { icon: NAMES; text: string }[] = [
	{ icon: 'chat', text: 'Chat' },
	{ icon: 'contact', text: 'Contect' },
	{ icon: 'room', text: 'Room' }
];

const PageNav: React.FC<Props> = (props: Props) => {
	const { pageNavindex, pageNavOnClick } = props;
	return (
		<List style={CSS.padding({ top: "16px", bottom: "16px" })}>
			{pageNavNames.map(({ icon, text }, index: number) => (
				<NavItem
					id={index}
					text={text}
					icon={icon}
					onClick={pageNavOnClick}
					select={pageNavindex === index}
					key={index}
				/>
			))}
		</List>
	);
};

export default PageNav;
