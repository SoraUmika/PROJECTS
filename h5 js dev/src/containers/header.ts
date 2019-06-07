/**
 * Container components
 * See rep components at src\components\header\Header.tsx
 */
import { connect } from 'react-redux';

import { State } from '../redux/types/stateType';
import Dispatch from '../redux/types/dispatchType';
import Header from '../components/header/Header';

const mapStateToProps = (state: State) => {
	const { open } = state.settingDialog;
	return {
		systemState: {
			settDialogOpen: open
		}
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	systemFunc: {
		openSettDialog: () =>
			dispatch({
				type: 'UI::settingDialog::open::<toggle>',
				payload: { bool: true }
			}),
		closeSettDialog: () =>
			dispatch({
				type: 'UI::settingDialog::open::<toggle>',
				payload: { bool: false }
			})
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
