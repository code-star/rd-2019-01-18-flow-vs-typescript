// @flow

export opaque type FileID = string;

export function isFile(id: FileID): boolean {
	return true;
}

export function foo(x: ?string): string {
	if (x) {
		return x;
	}
	return "default string";
}

export class Test {
	name: string;
	constructor(name: string): void {
		this.name = name;
	}
}

let t = new Test("test");
console.log(t.name);
