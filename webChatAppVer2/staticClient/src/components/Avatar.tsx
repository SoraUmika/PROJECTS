import * as React from "react";
import _Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import User from "../client/User";
import jss, { important } from "../jss";
import { clsNameStr } from "../util";

const ROOT = jss("avatar", {
	"": {
		"border-radius": "50%" + important,
		padding: "0px" + important,
		"min-width": "unset" + important
	}
});

export type AvatarProps = {
	user: User;
	button?: boolean;
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	className?: string;
};

const Avatar: React.FC<AvatarProps> = props => {
	const { user, button, onClick, className } = props;
	const { name, avatar } = user;
	const mainComp = (
		<_Avatar
			alt={name}
			src={avatar ? avatar : undefined}
			children={avatar ? undefined : name.charAt(0)}
			onClick={onClick}
			className={button ? undefined : className}
		/>
	);
	return button ? <Button className={ROOT + clsNameStr(className)}>{mainComp}</Button> : mainComp;
};

export default Avatar;
