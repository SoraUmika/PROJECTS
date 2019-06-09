import { connect } from 'react-redux';

import { State } from '../redux/types/stateType';
import Dispatch from '../redux/types/dispatchType';
import Navigation from '../components/navigation/Navigation';

const mapStateToProps = (state: State) => {
	const { pageNavindex} = state.navigation;
	return {
		navPageState: {
			pageNavindex: pageNavindex,
		}
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	navPageFunc: {
		pageNavOnClick: (index: 0 | 1 | 2) =>
			dispatch({
				type: 'UI::navigation::pageNavIndex::<set>',
				payload: { index: index }
            })
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
