import * as React from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

import Toggle from '../Toggle';
import * as P from '../props';
import { StringObject } from '../../../types';

type Props = P.Setting & {
	getVal: <T>(change: Partial<StringObject<T>>, origin: StringObject<T>, name: string) => any;
};

export default class Display extends React.Component<Props, {}> {
	render() {
		const { addSettingModif, setting_changes, origin_setting, getVal } = this.props;
		return (
			<React.Fragment>
				<List subheader={<ListSubheader>Test</ListSubheader>}>
					<Toggle
						text="test"
						handeler={(bool: boolean) => addSettingModif({ test: !bool })}
						checked={getVal(setting_changes, origin_setting, 'test')}
					/>
				</List>
			</React.Fragment>
		);
	}
}
