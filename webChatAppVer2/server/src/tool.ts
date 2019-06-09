import { AnyPackages } from "./packages";

export const logFactory = (id: string) => (description: string, pk?: AnyPackages) => {
	console.log("<" + id + ">: " + description);
	pk && console.log(pk);
};

export const pkGuard = (pk: AnyPackages) => pk;

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>