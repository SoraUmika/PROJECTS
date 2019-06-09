import * as React from "react";
import ListItem from "@material-ui/core/ListItem";

import jss from "../jss";

const ROOT = jss("list-item", {
	".background": {
		position: "absolute",
		width: "100%",
		height: "100%",
		left: "0px",
		"border-radius": "8px"
	},
	".container": {
		"z-index": 0
	},
	".background.selected": {
		backgroundColor: "black"
	}
});

export type ListItemProps = {
	selected?: boolean;
};

const Item: React.FC<ListItemProps> = props => {
	const { children, selected } = props;
	return (
		<ListItem className={ROOT}>
			<div className={"background" + selected ? " selected" : ""} />
			<div className="container">{children}</div>
		</ListItem>
	);
};

export default Item;
