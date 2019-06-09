import * as React from 'react';
import Paper from '@material-ui/core/Paper';

import CSS from '../../css';
import * as P from './props';
import PageNav from './PageNav';
import Context from '../../context/Context';
import ThemeType from '../../redux/types/themeType';

type Props = {
	navPageState: P.PageNavState;
	navPageFunc: P.PageNavFunc;
};

export default class Navigation extends React.Component<Props, {}> {
	static contextType = Context;
	render() {
		const { navPageFunc, navPageState } = this.props;
		const theme: ThemeType = this.context.theme;
		return (
			<Paper
				style={CSS.multi({
					size: { width: '100%', height: '100%' },
					bg: theme.colorBgPrime
				})}
				square
				elevation={1}
			>
				<PageNav {...navPageFunc} {...navPageState} />
			</Paper>
		);
	}
}
