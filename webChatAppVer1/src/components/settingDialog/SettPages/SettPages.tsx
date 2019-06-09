import * as React from 'react';

import Pages from '../../globalComps/Pages';
import Display from './Display';
import Account from './Account';
import * as P from '../props';
import { StringObject } from '../../../types';

type Props = {
	index: number;
	settingProps: P.Setting;
	themeProps: P.Theme;
	getVal: <T>(change: Partial<StringObject<T>>, origin: StringObject<T>, name: string) => any;
};

export default class SettPages extends React.Component<Props, {}> {
	render() {
		const { index, settingProps, themeProps, getVal } = this.props;
		return <Pages items={[ <Display {...settingProps} getVal={getVal} />, <Account /> ]} index={index} />;
	}
}
