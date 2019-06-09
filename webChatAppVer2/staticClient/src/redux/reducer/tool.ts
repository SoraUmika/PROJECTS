export function merge<T>(origin: T, src: Partial<T>): T {
	return Object.assign({}, origin, src);
}
