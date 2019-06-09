import * as React from "react";
import { TransitionStatus } from "react-transition-group/Transition";

export function merge<T>(origin: T, src: Partial<T>): T {
	return Object.assign({}, origin, src);
}

export function uid() {
	return Math.random()
		.toString(36)
		.substr(2, 9);
}

export function random(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function clsNameStr(className: string) {
	return className ? " " + className : "";
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type StrObject<T> = { [index: string]: T };

export class AnimationManager {
	allowAnimation = true;
	constructor(public onEntering: () => any, public onExiting: () => any) {}
	animate(status: TransitionStatus) {
		switch (status) {
			case "entering":
				this.allowAnimation && this.onEntering();
				this.allowAnimation = false;
				break;
			case "exiting":
				this.allowAnimation && this.onExiting();
				this.allowAnimation = false;
				break;
			default:
				this.allowAnimation = true;
		}
	}
}

export function getNotifDisplayDuration(text: string) {
	console.log("len: " + text.length);
	let res = Math.min(Math.max(text.length * 50, 2000), 7000);
	console.log("res: " + res);
	return res;
}

export function useDark(r: number, g: number, b: number) {
	return Math.round((r * 299 + g * 587 + b * 114) / 1000) > 125;
}
