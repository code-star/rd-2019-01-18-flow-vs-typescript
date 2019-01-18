# Getting to grips with Flow

### VSCode

If you've used TypeScript before with VSCode, you may need to do some settings to stop it from bothering you ('Types can only be used in files with a .ts extension').
You can disable it permanently or for just your Flow workspace, by disabling `javascript.validate.enable` in your settings.

### Compilation

There's two simple layers of compilation required to get from the current Flow syntax, back to valid JavaScript that your browser will accept.

##### flow-remove-types

This one is quite literal in it's function. It literally removes the type syntax that Flow uses. Fun fact: It leaves spaces where the type info used to be, so it does more of a replace than anything else.

```
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
```

##### babel

Babel is about as straightforward to setup, with one additional configuration file to add:

```
{
	"presets": ["flow"]
}
```

And from there it's the same thing: `babel src/ -d dist-babel/`

This one does clean up the spaces neatly.

### Import / Export

Exporting a type is as you would expect: `export opaque type FileID = string`
Importing is a bit different, `import { type FileID} from './index'`, if you forget the `type` in this part; it will complain about using it as a value instead of a type.

### Differences
- Predicate Functions
- ReadOnlyArray
- Classes are limited; no private / public / etc


#### Predicate Functions
Adds the `%checks` syntax to a function. It's return value is then used by the compiler to make non-null assumptions of variables. This is currently not available in TypeScript.

#### ReadOnlyArray
This makes an Array, actually readonly through the compiler. It will actively error when you try to do `.push()` or assign `arr[2]` directly, which is something that TypeScript does not do by default.

#### Limited class access modifiers
In Flow there are no (known) ways to indicate `private` or `public` functions or variables.

## Conclusion

Flow is more of a small layer on top of your code. In the end you're stil writing raw JavaScript but mixing in the Flow specific type syntax.
- Pro: Well, it's close to JavaScript.
- Con: You have non-JS in your `.js` files and in your repository. You can't run a `.js` file in your browser with Flow syntax in it.

TypeScript is a separate language. The extension changes and that makes it feel a bit cleaner. One could argue that you could do the same with Flow's files of course.
A con of TypeScript in our opinion is that your code is transformed into garbled up JavaScript that is hardly human-readable anymore. You all of a sudden require SourceMaps to make your code readable and debugable, where with Flow you're just running with raw Javascript. 

It's a matter of taste. Flow definitely is easy to setup (although VSCode is a bit TypeScript biased) and has little effect in your build process, where TypeScript is a full on superset and therefore a different language, that requires compilation.