/**
 * Container components
 * See rep components at src\components\App.tsx
 */
import { connect } from 'react-redux';

import { State } from '../redux/types/stateType';
import Dispatch from '../redux/types/dispatchType';
import App from '../components/App';

const mapStateToProps = (state: State) => {
	const { pageNavindex } = state.navigation;
	const { setting, theme } = state.config;
	return {
		pageIndex: pageNavindex,
		setting: setting,
		theme: theme
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
