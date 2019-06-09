import { CSSProperties } from "jss/css";
import { StrObject } from "./util";

type JSS = StrObject<CSSProperties & StrObject<any>>;
let uidCounter = 0;

const addStyle = (id: string, style: JSS, rawId: boolean = false) => {
	let uid: string;
	if (rawId) {
		uid = id;
	} else {
		uidCounter++;
		uid = id + uidCounter;
	}
	document.head.appendChild(document.createElement("style")).textContent = jssToCss(style, uid);
	return uid;
};

const jssToCss = (style: JSS, uid: string) => {
	let cssString = "";
	let initTarget = "." + uid;
	for (let selector in style) {
		let fullSelector =
			initTarget + (selector.charAt(0) === "$" ? selector.substring(1) : " " + selector);
		cssString += fullSelector + "{";
		let properties = style[selector];
		for (let propertyName in properties) {
			cssString += propertyName + ":" + properties[propertyName] + ";";
		}
		cssString += "}";
	}
	return cssString;
};

export const important = "!important";

export default addStyle;
