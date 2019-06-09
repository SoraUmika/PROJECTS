import * as React from "react";
import { connect } from "react-redux";
import Transition from "react-transition-group/Transition";
import { TransitionGroup } from "react-transition-group";

import * as actions from "../../redux/actions";
import State from "../../redux/State";
import { TempNotif, PersistNotif } from "./Notification";
import jss from "../../jss";
import TempNotifComp, { TempNotifProps } from "../../components/TempNotif";
import { Omit, StrObject, getNotifDisplayDuration } from "../../util";

const ROOT = jss("notifier-container", {
	"": {
		position: "absolute",
		right: "0px",
		height: "auto",
		width: "auto"
	}
});

const mapStateToProps = (state: State) => {
	const {
		notifications: { persistQueue, tempQueue },
		setting: {
			notificationDurationDisplaying,
			notificationDurationEntering,
			notificationDurationExisting,
			notificationPositionDisplay,
			notificationPositionInsert,
			notificationDurationMode
		}
	} = state;
	return {
		persistQueue: persistQueue,
		tempQueue: tempQueue,
		displayDuration: notificationDurationDisplaying,
		enterDuration: notificationDurationEntering,
		exitDuration: notificationDurationExisting,
		position: notificationPositionDisplay,
		insert: notificationPositionInsert,
		durationMode: notificationDurationMode
	};
};

export type NotifierProps = {
	persistQueue: PersistNotif[];
	tempQueue: TempNotif[];
	displayDuration: number;
	enterDuration: number;
	exitDuration: number;
	position: "top" | "bottom";
	insert: "top" | "bottom";
	durationMode: "auto" | "custom";
};

class Notifier extends React.Component<NotifierProps> {
	rendered: StrObject<(key: string) => JSX.Element> = {};

	TempNotifCompHolder = (
		props: Omit<TempNotifProps, "status" | "enterDuration" | "exitDuration" | "displayDuration">
	) => {
		let { enterDuration, exitDuration, displayDuration, durationMode } = this.props;
		if (durationMode === "auto") {
			enterDuration = 400;
			exitDuration = 1350;
			displayDuration = getNotifDisplayDuration(props.message);
		}
		return (key: string) => (
			<Transition
				timeout={{
					enter: enterDuration,
					exit: exitDuration
				}}
				key={key}
			>
				{status => (
					<TempNotifComp
						{...props}
						status={status}
						enterDuration={enterDuration}
						exitDuration={exitDuration}
						displayDuration={displayDuration}
					/>
				)}
			</Transition>
		);
	};

	shouldComponentUpdate({ tempQueue }: NotifierProps) {
		return tempQueue.length > 0;
	}

	removeFromRendered = (id: string) => {
		delete this.rendered[id];
		this.forceUpdate();
	};

	render() {
		const { tempQueue, position, insert } = this.props;
		let newRendered: StrObject<(key: string) => JSX.Element> = {};

		tempQueue.forEach(({ message, id, type }) => {
			newRendered[id] = this.TempNotifCompHolder({
				message: message,
				type: type,
				onRemove: () => this.removeFromRendered(id)
			});
		});

		if (insert === "bottom") {
			this.rendered = {
				...this.rendered,
				...newRendered
			};
		} else {
			this.rendered = {
				...newRendered,
				...this.rendered
			};
		}

		actions.cleanTempNotifQueue();
		return (
			<div
				className={ROOT}
				style={{
					top: position === "top" ? "13%" : undefined,
					bottom: position === "bottom" ? "0px" : undefined
				}}
			>
				<TransitionGroup>
					{Object.keys(this.rendered).map(key => this.rendered[key](key))}
				</TransitionGroup>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Notifier);
