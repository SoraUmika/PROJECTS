export function merge<T>(origin: T, src: Partial<T>): T {
	return Object.assign({}, origin, src);
}

export function updateChanges<T>(origin: Partial<T>, src: Partial<T>, main: T): Partial<T> {
	let merged = merge(origin, src);
	for (let key in merged) {
		if (merged[key] === main[key]) {
			delete merged[key];
		}
	}
	return merged;
}

export function remove<T>(arr: T[], target: T) {
	let copy: T[] = arr.slice();
	let index = copy.indexOf(target);
	if (index > -1) {
		copy.splice(index, 1);
	}
	return copy;
}
