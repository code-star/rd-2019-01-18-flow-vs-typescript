//      

function foo(x         )         {
	if (x) {
		return x;
	}
	return "default string";
}

class Test {
	             
	constructor(name        )       {
		this.name = name;
	}
}

let t = new Test("test");
console.log(t.name);
