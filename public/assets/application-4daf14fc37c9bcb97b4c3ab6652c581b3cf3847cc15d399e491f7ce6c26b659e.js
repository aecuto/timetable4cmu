/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
Turbolinks 5.2.0
Copyright © 2018 Basecamp, LLC
 */

(function(){var t=this;(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(t,r){return e.controller.visit(t,r)},clearCache:function(){return e.controller.clearCache()},setProgressBarDelay:function(t){return e.controller.setProgressBarDelay(t)}}}).call(this)}).call(t);var e=t.Turbolinks;(function(){(function(){var t,r,n,o=[].slice;e.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},e.closest=function(e,r){return t.call(e,r)},t=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),e.defer=function(t){return setTimeout(t,1)},e.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?o.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},e.dispatch=function(t,e){var r,o,i,s,a,u;return a=null!=e?e:{},u=a.target,r=a.cancelable,o=a.data,i=document.createEvent("Events"),i.initEvent(t,!0,r===!0),i.data=null!=o?o:{},i.cancelable&&!n&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},n=function(){var t;return t=document.createEvent("Events"),t.initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),e.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),e.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){e.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=e.Location.wrap(n).requestURL,this.referrer=e.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return e.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return e.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new e.ProgressBar}var n,o,i;return i=e.HttpRequest,n=i.NETWORK_FAILURE,o=i.TIMEOUT_FAILURE,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case o:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.History=function(){function r(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(t,r){return t=e.Location.wrap(t),this.update("push",t,r)},r.prototype.replace=function(t,r){return t=e.Location.wrap(t),this.update("replace",t,r)},r.prototype.onPopState=function(t){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=t.state)?n.turbolinks:void 0)?(r=e.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(t){return e.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){e.HeadDetails=function(){function t(t){var e,r,n,s,a,u;for(this.elements={},n=0,a=t.length;a>n;n++)u=t[n],u.nodeType===Node.ELEMENT_NODE&&(s=u.outerHTML,r=null!=(e=this.elements)[s]?e[s]:e[s]={type:i(u),tracked:o(u),elements:[]},r.elements.push(u))}var e,r,n,o,i;return t.fromHeadElement=function(t){var e;return new this(null!=(e=null!=t?t.childNodes:void 0)?e:[])},t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},t.prototype.getMetaValue=function(t){var e;return null!=(e=this.findMetaElementByName(t))?e.getAttribute("content"):void 0},t.prototype.findMetaElementByName=function(t){var r,n,o,i;r=void 0,i=this.elements;for(o in i)n=i[o].elements,e(n[0],t)&&(r=n[0]);return r},i=function(t){return r(t)?"script":n(t)?"stylesheet":void 0},o=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},r=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},n=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},e=function(t,e){var r;return r=t.tagName.toLowerCase(),"meta"===r&&t.getAttribute("name")===e},t}()}.call(this),function(){e.Snapshot=function(){function t(t,e){this.headDetails=t,this.bodyElement=e}return t.wrap=function(t){return t instanceof this?t:"string"==typeof t?this.fromHTMLString(t):this.fromHTMLElement(t)},t.fromHTMLString=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromHTMLElement(e)},t.fromHTMLElement=function(t){var r,n,o,i;return o=t.querySelector("head"),r=null!=(i=t.querySelector("body"))?i:document.createElement("body"),n=e.HeadDetails.fromHeadElement(o),new this(n,r)},t.prototype.clone=function(){return new this.constructor(this.headDetails,this.bodyElement.cloneNode(!0))},t.prototype.getRootLocation=function(){var t,r;return r=null!=(t=this.getSetting("root"))?t:"/",new e.Location(r)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.bodyElement.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(e){}},t.prototype.getPermanentElements=function(){return this.bodyElement.querySelectorAll("[id][data-turbolinks-permanent]")},t.prototype.getPermanentElementById=function(t){return this.bodyElement.querySelector("#"+t+"[data-turbolinks-permanent]")},t.prototype.getPermanentElementsPresentInSnapshot=function(t){var e,r,n,o,i;for(o=this.getPermanentElements(),i=[],r=0,n=o.length;n>r;r++)e=o[r],t.getPermanentElementById(e.id)&&i.push(e);return i},t.prototype.findFirstAutofocusableElement=function(){return this.bodyElement.querySelector("[autofocus]")},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){return this.headDetails.getMetaValue("turbolinks-"+t)},t}()}.call(this),function(){var t=[].slice;e.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n,o;return n=arguments[0],r=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,e,function(){}),o.delegate=n,o.render(r),o},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){var t,r,n=function(t,e){function r(){this.constructor=t}for(var n in e)o.call(e,n)&&(t[n]=e[n]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},o={}.hasOwnProperty;e.SnapshotRenderer=function(e){function o(t,e,r){this.currentSnapshot=t,this.newSnapshot=e,this.isPreview=r,this.currentHeadDetails=this.currentSnapshot.headDetails,this.newHeadDetails=this.newSnapshot.headDetails,this.currentBody=this.currentSnapshot.bodyElement,this.newBody=this.newSnapshot.bodyElement}return n(o,e),o.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},o.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},o.prototype.replaceBody=function(){var t;return t=this.relocateCurrentBodyPermanentElements(),this.activateNewBodyScriptElements(),this.assignNewBody(),this.replacePlaceholderElementsWithClonedPermanentElements(t)},o.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},o.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},o.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},o.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},o.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},o.prototype.relocateCurrentBodyPermanentElements=function(){var e,n,o,i,s,a,u;for(a=this.getCurrentBodyPermanentElements(),u=[],e=0,n=a.length;n>e;e++)i=a[e],s=t(i),o=this.newSnapshot.getPermanentElementById(i.id),r(i,s.element),r(o,i),u.push(s);return u},o.prototype.replacePlaceholderElementsWithClonedPermanentElements=function(t){var e,n,o,i,s,a,u;for(u=[],o=0,i=t.length;i>o;o++)a=t[o],n=a.element,s=a.permanentElement,e=s.cloneNode(!0),u.push(r(n,e));return u},o.prototype.activateNewBodyScriptElements=function(){var t,e,n,o,i,s;for(i=this.getNewBodyScriptElements(),s=[],e=0,o=i.length;o>e;e++)n=i[e],t=this.createScriptElement(n),s.push(r(n,t));return s},o.prototype.assignNewBody=function(){return document.body=this.newBody},o.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.newSnapshot.findFirstAutofocusableElement())?t.focus():void 0},o.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},o.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},o.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},o.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},o.prototype.getCurrentBodyPermanentElements=function(){return this.currentSnapshot.getPermanentElementsPresentInSnapshot(this.newSnapshot)},o.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},o}(e.Renderer),t=function(t){var e;return e=document.createElement("meta"),e.setAttribute("name","turbolinks-permanent-placeholder"),e.setAttribute("content",t.id),{element:e,permanentElement:t}},r=function(t,e){var r;return(r=t.parentNode)?r.replaceChild(e,t):void 0}}.call(this),function(){var t=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;e.ErrorRenderer=function(e){function r(t){var e;e=document.createElement("html"),e.innerHTML=t,this.newHead=e.querySelector("head"),this.newBody=e.querySelector("body")}return t(r,e),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceHeadAndBody(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceHeadAndBody=function(){var t,e;return e=document.head,t=document.body,e.parentNode.replaceChild(this.newHead,e),t.parentNode.replaceChild(this.newBody,t)},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(e.Renderer)}.call(this),function(){e.View=function(){function t(t){this.delegate=t,this.htmlElement=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return e.Snapshot.fromHTMLElement(this.htmlElement)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.htmlElement.setAttribute("data-turbolinks-preview",""):this.htmlElement.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,r,n){return e.SnapshotRenderer.render(this.delegate,n,this.getSnapshot(),e.Snapshot.wrap(t),r)},t.prototype.renderError=function(t,r){return e.ErrorRenderer.render(this.delegate,r,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=t(this.onScroll,this),this.onScroll=e.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){e.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var r;return t.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},t.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},t.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(t){return e.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=t(this.performScroll,this),this.identifier=e.uuid(),this.location=e.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new e.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(t,r){return this.response=t,null!=r&&(this.redirectedToLocation=e.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return e.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Controller=function(){function r(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new e.History(this),this.view=new e.View(this),this.scrollManager=new e.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return r.prototype.start=function(){return e.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new e.SnapshotCache(10)},r.prototype.visit=function(t,r){var n,o;return null==r&&(r={}),t=e.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(t,n)):window.location=t:void 0},r.prototype.startVisitToLocationWithAction=function(t,r,n){var o;return e.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(t,r,{restorationData:o})):window.location=t},r.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},r.prototype.startHistory=function(){return this.location=e.Location.wrap(window.location),this.restorationIdentifier=e.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=e.Location.wrap(t)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return null!=(e=this.cache.get(t))?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable();
},r.prototype.cacheSnapshot=function(){var t,r;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),r=this.view.getSnapshot(),t=this.lastRenderedLocation,e.defer(function(e){return function(){return e.cache.put(t,r.clone())}}(this))):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,r){return e.dispatch("turbolinks:click",{target:t,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(t){return e.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(t){return e.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return e.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(t){return e.dispatch("turbolinks:before-render",{data:{newBody:t}})},r.prototype.notifyApplicationAfterRender=function(){return e.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),e.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(t,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new e.Visit(this,t,r),u.restorationIdentifier=null!=a?a:e.uuid(),u.restorationData=e.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?e.closest(t,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(t){var r;return r=new e.Location(t.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(t){var r;return(r=e.closest(t,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,r,n;e.start=function(){return r()?(null==e.controller&&(e.controller=t()),e.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=e),n()},t=function(){var t;return t=new e.Controller,t.adapter=new e.BrowserAdapter(t),t},n=function(){return window.Turbolinks===e},n()&&e.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=e:"function"==typeof define&&define.amd&&define(e)}).call(this);
(function() {


}).call(this);

$(function(){
  $("#sid").inputmask("999999999");
  $("#term").inputmask("9/99");

  if(!$("#timetable").hasClass('js-full')){
    $('.li-width').addClass('mobile-width');
		$('.ul-height').addClass('mobile-height');
  }

  $("#loading").hide();
  $("#submit").click(function(){
    $("#loading").show();
    $("#submit_text").hide();
  });

  takeSnapShot = function (el) {
    html2canvas(document.querySelector("#timetable")).then(canvas => {
      var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      el.href = img;
      el.download = 'timetable(timetable4cmu).png';
      el.click();
    });
  }

  $("#timetable_download").on('click', function () {
    html2canvas(document.querySelector("#timetable")).then(canvas => {
      var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      var el = document.createElement('a');
      el.href = img;
      el.download = 'timetable(timetable4cmu).png';
      el.click();
    });
  });

  $("#mid_download").on('click', function () {
    html2canvas(document.querySelector("#mid")).then(canvas => {
      var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      var el = document.createElement('a');
      el.href = img;
      el.download = 'mid_exam(timetable4cmu).png';
      el.click();
    });
  });

  $("#final_download").on('click', function () {
    html2canvas(document.querySelector("#final")).then(canvas => {
      var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      var el = document.createElement('a');
      el.href = img;
      el.download = 'final_exam(timetable4cmu).png';
      el.click();
    });
  });

});
$(function(){


});
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global.Util = factory(global.jQuery));
}(this, (function ($) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($$$1(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined; // eslint-disable-line no-undefined
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));

        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
          selector = element.getAttribute('href') || '';
        }

        try {
          return document.querySelector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element


        var transitionDuration = $$$1(element).css('transition-duration');
        var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration) {
          return 0;
        } // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $$$1(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      }
    };
    setTransitionEndSupport();
    return Util;
  }($);

  return Util;

})));
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util.js'], factory) :
  (global.ScrollSpy = factory(global.jQuery,global.Util));
}(this, (function ($,Util) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Util = Util && Util.hasOwnProperty('default') ? Util['default'] : Util;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'scrollspy';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };
    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };
    var Event = {
      ACTIVATE: "activate" + EVENT_KEY,
      SCROLL: "scroll" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active'
    };
    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      NAV_ITEMS: '.nav-item',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        $$$1(this._scrollElement).on(Event.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // Getters


      var _proto = ScrollSpy.prototype;

      // Public
      _proto.refresh = function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._scrollElement).off(EVENT_KEY);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, typeof config === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = $$$1(config.target).attr('id');

          if (!id) {
            id = Util.getUID(NAME);
            $$$1(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };

      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        var offsetLength = this._offsets.length;

        for (var i = offsetLength; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


        queries = queries.map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
        });
        var $link = $$$1([].slice.call(document.querySelectorAll(queries.join(','))));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $$$1(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      };

      _proto._clear = function _clear() {
        var nodes = [].slice.call(document.querySelectorAll(this._selector));
        $$$1(nodes).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }; // Static


      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = [].slice.call(document.querySelectorAll(Selector.DATA_SPY));
      var scrollSpysLength = scrollSpys.length;

      for (var i = scrollSpysLength; i--;) {
        var $spy = $$$1(scrollSpys[i]);

        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
    $$$1.fn[NAME].Constructor = ScrollSpy;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  }($);

  return ScrollSpy;

})));
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util.js'], factory) :
  (global.Collapse = factory(global.jQuery,global.Util));
}(this, (function ($,Util) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Util = Util && Util.hasOwnProperty('default') ? Util['default'] : Util;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapse';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      toggle: true,
      parent: ''
    };
    var DefaultType = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var Event = {
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };
    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };
    var Selector = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $$$1.makeArray(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });

          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;

            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters


      var _proto = Collapse.prototype;

      // Public
      _proto.toggle = function toggle() {
        if ($$$1(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) {
            return elem.getAttribute('data-parent') === _this._config.parent;
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $$$1.Event(Event.SHOW);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

          if (!activesData) {
            $$$1(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $$$1(_this._element).trigger(Event.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var $elem = $$$1([].slice.call(document.querySelectorAll(selector)));

              if (!$elem.hasClass(ClassName.SHOW)) {
                $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getDimension = function _getDimension() {
        var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent = null;

        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        $$$1(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $$$1(element).hasClass(ClassName.SHOW);

          if (triggerArray.length) {
            $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }; // Static


      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          var _config = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }

      var $trigger = $$$1(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $$$1(selectors).each(function () {
        var $target = $$$1(this);
        var data = $target.data(DATA_KEY);
        var config = data ? 'toggle' : $trigger.data();

        Collapse._jQueryInterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Collapse._jQueryInterface;
    $$$1.fn[NAME].Constructor = Collapse;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }($);

  return Collapse;

})));
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util.js'], factory) :
  (global.Alert = factory(global.jQuery,global.Util));
}(this, (function ($,Util) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Util = Util && Util.hasOwnProperty('default') ? Util['default'] : Util;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'alert';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
      CLOSE: "close" + EVENT_KEY,
      CLOSED: "closed" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters


      var _proto = Alert.prototype;

      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = document.querySelector(selector);
        }

        if (!parent) {
          parent = $$$1(element).closest("." + ClassName.ALERT)[0];
        }

        return parent;
      };

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $$$1.Event(Event.CLOSE);
        $$$1(element).trigger(closeEvent);
        return closeEvent;
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        $$$1(element).removeClass(ClassName.SHOW);

        if (!$$$1(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $$$1(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        $$$1(element).detach().trigger(Event.CLOSED).remove();
      }; // Static


      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Alert._jQueryInterface;
    $$$1.fn[NAME].Constructor = Alert;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  }($);

  return Alert;

})));
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('popper.js'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', 'popper.js', './util.js'], factory) :
  (global.Tooltip = factory(global.jQuery,global.Popper,global.Util));
}(this, (function ($,Popper,Util) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;
  Util = Util && Util.hasOwnProperty('default') ? Util['default'] : Util;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tooltip';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
      boundary: '(string|element)'
    };
    var AttachmentMap = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
    };
    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent'
    };
    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
    };
    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow'
    };
    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
        } // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      } // Getters


      var _proto = Tooltip.prototype;

      // Public
      _proto.enable = function enable() {
        this._isEnabled = true;
      };

      _proto.disable = function disable() {
        this._isEnabled = false;
      };

      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $$$1(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $$$1(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        $$$1.removeData(this.element, this.constructor.DATA_KEY);
        $$$1(this.element).off(this.constructor.EVENT_KEY);
        $$$1(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $$$1(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if ($$$1(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $$$1.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $$$1(this.element).trigger(showEvent);
          var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) {
            $$$1(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);
          var container = this.config.container === false ? document.body : $$$1(document).find(this.config.container);
          $$$1(tip).data(this.constructor.DATA_KEY, this);

          if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) {
            $$$1(tip).appendTo(container);
          }

          $$$1(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: {
                offset: this.config.offset
              },
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              _this._handlePopperPlacementChange(data);
            }
          });
          $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().on('mouseover', null, $$$1.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if ($$$1(this.tip).hasClass(ClassName.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $$$1(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          $$$1(document.body).children().off('mouseover', null, $$$1.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if ($$$1(this.tip).hasClass(ClassName.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Protected


      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var tip = this.getTipElement();
        this.setElementContent($$$1(tip.querySelectorAll(Selector.TOOLTIP_INNER)), this.getTitle());
        $$$1(tip).removeClass(ClassName.FADE + " " + ClassName.SHOW);
      };

      _proto.setElementContent = function setElementContent($element, content) {
        var html = this.config.html;

        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (html) {
            if (!$$$1(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($$$1(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }; // Private


      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      _proto._setListeners = function _setListeners() {
        var _this3 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
              return _this3.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
            $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) {
              return _this3._enter(event);
            }).on(eventOut, _this3.config.selector, function (event) {
              return _this3._leave(event);
            });
          }

          $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () {
            return _this3.hide();
          });
        });

        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      _proto._fixTitle = function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');

        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this.element).data(), typeof config === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length) {
          $tip.removeClass(tabClass.join(''));
        }
      };

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;

        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(popperData.placement));
      };

      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) {
          return;
        }

        $$$1(tip).removeClass(ClassName.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      }; // Static


      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Tooltip._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tooltip;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  }($, Popper);

  return Tooltip;

})));
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./tooltip.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './tooltip.js'], factory) :
  (global.Popover = factory(global.jQuery,global.Tooltip));
}(this, (function ($,Tooltip) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Tooltip = Tooltip && Tooltip.hasOwnProperty('default') ? Tooltip['default'] : Tooltip;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'popover';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-popover';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');

    var Default = _objectSpread({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });

    var DefaultType = _objectSpread({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TITLE: '.popover-header',
      CONTENT: '.popover-body'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);

      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }

      var _proto = Popover.prototype;

      // Overrides
      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setElementContent($tip.find(Selector.CONTENT), content);
        $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
      }; // Private


      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      }; // Static


      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(Tooltip);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Popover._jQueryInterface;
    $$$1.fn[NAME].Constructor = Popover;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }($);

  return Popover;

})));
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('popper.js'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', 'popper.js', './util.js'], factory) :
  (global.Dropdown = factory(global.jQuery,global.Popper,global.Util));
}(this, (function ($,Popper,Util) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;
  Util = Util && Util.hasOwnProperty('default') ? Util['default'] : Util;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'dropdown';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      DROPRIGHT: 'dropright',
      DROPLEFT: 'dropleft',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      POSITION_STATIC: 'position-static'
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
      RIGHT: 'right-start',
      RIGHTEND: 'right-end',
      LEFT: 'left-start',
      LEFTEND: 'left-end'
    };
    var Default = {
      offset: 0,
      flip: true,
      boundary: 'scrollParent',
      reference: 'toggle',
      display: 'dynamic'
    };
    var DefaultType = {
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // Getters


      var _proto = Dropdown.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
        $$$1(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') {
            $$$1(parent).addClass(ClassName.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $$$1(document.body).children().on('mouseover', null, $$$1.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $$$1(this._menu).toggleClass(ClassName.SHOW);
        $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Private


      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $$$1(this._element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this._element).data(), config);
        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          if (parent) {
            this._menu = parent.querySelector(Selector.MENU);
          }
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $$$1(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(ClassName.DROPUP)) {
          placement = AttachmentMap.TOP;

          if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return $$$1(this._element).closest('.navbar').length > 0;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var _this2 = this;

        var offsetConf = {};

        if (typeof this._config.offset === 'function') {
          offsetConf.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets) || {});
            return data;
          };
        } else {
          offsetConf.offset = this._config.offset;
        }

        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: offsetConf,
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          } // Disable Popper.js if we have a static display

        };

        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }

        return popperConfig;
      }; // Static


      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = $$$1(toggles[i]).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            continue;
          }

          var dropdownMenu = context._menu;

          if (!$$$1(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
          $$$1(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          $$$1(dropdownMenu).removeClass(ClassName.SHOW);
          $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = document.querySelector(selector);
        }

        return parent || element.parentNode;
      }; // eslint-disable-next-line complexity


      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $$$1(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $$$1(toggle).trigger('focus');
          }

          $$$1(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Dropdown;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($$$1(this), 'toggle');
    }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Dropdown._jQueryInterface;
    $$$1.fn[NAME].Constructor = Dropdown;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }($, Popper);

  return Dropdown;

})));
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
  typeof define === 'function' && define.amd ? define(['jquery'], factory) :
  (global.Button = factory(global.jQuery));
}(this, (function ($) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Button = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'button';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };
    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };
    var Event = {
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters


      var _proto = Button.prototype;

      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = this._element.querySelector(Selector.INPUT);

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(Selector.ACTIVE);

                if (activeElement) {
                  $$$1(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }

              input.checked = !this._element.classList.contains(ClassName.ACTIVE);
              $$$1(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $$$1(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Static


      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $$$1(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();
      var button = event.target;

      if (!$$$1(button).hasClass(ClassName.BUTTON)) {
        button = $$$1(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($$$1(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $$$1(event.target).closest(Selector.BUTTON)[0];
      $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Button._jQueryInterface;
    $$$1.fn[NAME].Constructor = Button;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  }($);

  return Button;

})));
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util.js'], factory) :
  (global.Modal = factory(global.jQuery,global.Util));
}(this, (function ($,Util) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Util = Util && Util.hasOwnProperty('default') ? Util['default'] : Util;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'modal';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      RESIZE: "resize" + EVENT_KEY,
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
      KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
      MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      STICKY_CONTENT: '.sticky-top'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(Selector.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._scrollbarWidth = 0;
      } // Getters


      var _proto = Modal.prototype;

      // Public
      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isTransitioning || this._isShown) {
          return;
        }

        if ($$$1(this._element).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });
        $$$1(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        $$$1(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($$$1(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning || !this._isShown) {
          return;
        }

        var hideEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;
        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(document).off(Event.FOCUSIN);
        $$$1(this._element).removeClass(ClassName.SHOW);
        $$$1(this._element).off(Event.CLICK_DISMISS);
        $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._scrollbarWidth = null;
      };

      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $$$1(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $$$1.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._isTransitioning = false;
          $$$1(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };

      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;

        $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
            _this4._element.focus();
          }
        });
      };

      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              event.preventDefault();

              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          $$$1(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          $$$1(window).on(Event.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          $$$1(window).off(Event.RESIZE);
        }
      };

      _proto._hideModal = function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._isTransitioning = false;

        this._showBackdrop(function () {
          $$$1(document.body).removeClass(ClassName.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          $$$1(_this7._element).trigger(Event.HIDDEN);
        });
      };

      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $$$1(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;

        var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            this._backdrop.classList.add(animate);
          }

          $$$1(this._backdrop).appendTo(document.body);
          $$$1(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }

            if (event.target !== event.currentTarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            Util.reflow(this._backdrop);
          }

          $$$1(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          $$$1(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();

            if (callback) {
              callback();
            }
          };

          if ($$$1(this._element).hasClass(ClassName.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }; // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------


      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };

      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT)); // Adjust fixed content padding

          $$$1(fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = $$$1(element).css('padding-right');
            $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin

          $$$1(stickyContent).each(function (index, element) {
            var actualMargin = element.style.marginRight;
            var calculatedMargin = $$$1(element).css('margin-right');
            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $$$1(document.body).css('padding-right');
          $$$1(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }
      };

      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
        $$$1(fixedContent).each(function (index, element) {
          var padding = $$$1(element).data('padding-right');
          $$$1(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + Selector.STICKY_CONTENT));
        $$$1(elements).each(function (index, element) {
          var margin = $$$1(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            $$$1(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding

        var padding = $$$1(document.body).data('padding-right');
        $$$1(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
      };

      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }; // Static


      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data(), typeof config === 'object' && config ? config : {});

          if (!data) {
            data = new Modal(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this10 = this;

      var target;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = document.querySelector(selector);
      }

      var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _objectSpread({}, $$$1(target).data(), $$$1(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }

      var $target = $$$1(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // Only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($$$1(_this10).is(':visible')) {
            _this10.focus();
          }
        });
      });

      Modal._jQueryInterface.call($$$1(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Modal._jQueryInterface;
    $$$1.fn[NAME].Constructor = Modal;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  }($);

  return Modal;

})));
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util.js'], factory) :
  (global.Carousel = factory(global.jQuery,global.Util));
}(this, (function ($,Util) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Util = Util && Util.hasOwnProperty('default') ? Util['default'] : Util;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'carousel';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };
    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };
    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };
    var Event = {
      SLIDE: "slide" + EVENT_KEY,
      SLID: "slid" + EVENT_KEY,
      KEYDOWN: "keydown" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY,
      TOUCHEND: "touchend" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item'
    };
    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this._config = this._getConfig(config);
        this._element = $$$1(element)[0];
        this._indicatorsElement = this._element.querySelector(Selector.INDICATORS);

        this._addEventListeners();
      } // Getters


      var _proto = Carousel.prototype;

      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (this._element.querySelector(Selector.NEXT_PREV)) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $$$1(this._element).one(Event.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        $$$1(this._element).off(EVENT_KEY);
        $$$1.removeData(this._element, DATA_KEY);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          $$$1(this._element).on(Event.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });

          if ('ontouchstart' in document.documentElement) {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $$$1(this._element).on(Event.TOUCHEND, function () {
              _this2.pause();

              if (_this2.touchTimeout) {
                clearTimeout(_this2.touchTimeout);
              }

              _this2.touchTimeout = setTimeout(function (event) {
                return _this2.cycle(event);
              }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
            });
          }
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector.ITEM)) : [];
        return this._items.indexOf(element);
      };

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(this._element.querySelector(Selector.ACTIVE_ITEM));

        var slideEvent = $$$1.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        $$$1(this._element).trigger(slideEvent);
        return slideEvent;
      };

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector.ACTIVE));
          $$$1(indicators).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $$$1(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this3 = this;

        var activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $$$1.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if ($$$1(this._element).hasClass(ClassName.SLIDE)) {
          $$$1(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $$$1(activeElement).addClass(directionalClassName);
          $$$1(nextElement).addClass(directionalClassName);
          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          $$$1(activeElement).one(Util.TRANSITION_END, function () {
            $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
            $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this3._isSliding = false;
            setTimeout(function () {
              return $$$1(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          $$$1(activeElement).removeClass(ClassName.ACTIVE);
          $$$1(nextElement).addClass(ClassName.ACTIVE);
          this._isSliding = false;
          $$$1(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }; // Static


      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data());

          if (typeof config === 'object') {
            _config = _objectSpread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $$$1(selector)[0];

        if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = _objectSpread({}, $$$1(target).data(), $$$1(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($$$1(target), config);

        if (slideIndex) {
          $$$1(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var carousels = [].slice.call(document.querySelectorAll(Selector.DATA_RIDE));

      for (var i = 0, len = carousels.length; i < len; i++) {
        var $carousel = $$$1(carousels[i]);

        Carousel._jQueryInterface.call($carousel, $carousel.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Carousel._jQueryInterface;
    $$$1.fn[NAME].Constructor = Carousel;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  }($);

  return Carousel;

})));
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery'), require('./util.js')) :
  typeof define === 'function' && define.amd ? define(['jquery', './util.js'], factory) :
  (global.Tab = factory(global.jQuery,global.Util));
}(this, (function ($,Util) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Util = Util && Util.hasOwnProperty('default') ? Util['default'] : Util;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tab';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      ACTIVE_UL: '> li > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters


      var _proto = Tab.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var target;
        var previous;
        var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
          previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $$$1.Event(Event.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $$$1(previous).trigger(hideEvent);
        }

        $$$1(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = document.querySelector(selector);
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $$$1.Event(Event.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = $$$1.Event(Event.SHOWN, {
            relatedTarget: previous
          });
          $$$1(previous).trigger(hiddenEvent);
          $$$1(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements;

        if (container.nodeName === 'UL') {
          activeElements = $$$1(container).find(Selector.ACTIVE_UL);
        } else {
          activeElements = $$$1(container).children(Selector.ACTIVE);
        }

        var active = activeElements[0];
        var isTransitioning = callback && active && $$$1(active).hasClass(ClassName.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
          var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        $$$1(element).addClass(ClassName.ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);
        $$$1(element).addClass(ClassName.SHOW);

        if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
          var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector.DROPDOWN_TOGGLE));
            $$$1(dropdownToggleList).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }; // Static


      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      Tab._jQueryInterface.call($$$1(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Tab._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tab;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  }($);

  return Tab;

})));











/*!
 * dist/inputmask.min
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2018 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.0-beta.82
 */

!function webpackUniversalModuleDefinition(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var a=t();for(var n in a)("object"==typeof exports?exports:e)[n]=a[n]}}(window,function(){return function(a){var n={};function __webpack_require__(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return a[e].call(t.exports,t,t.exports,__webpack_require__),t.l=!0,t.exports}return __webpack_require__.m=a,__webpack_require__.c=n,__webpack_require__.d=function(e,t,a){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(t,e){if(1&e&&(t=__webpack_require__(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(__webpack_require__.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)__webpack_require__.d(a,n,function(e){return t[e]}.bind(null,n));return a},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}([function(e,t,a){"use strict";a(1),a(5),a(6),e.exports=a(2)},function(e,t,a){"use strict";var n=a(2);n.extendDefinitions({A:{validator:"[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",casing:"upper"},"&":{validator:"[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",casing:"upper"},"#":{validator:"[0-9A-Fa-f]",casing:"upper"}}),n.extendAliases({cssunit:{regex:"[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"},url:{regex:"(https?|ftp)//.*",autoUnmask:!1},ip:{mask:"i[i[i]].i[i[i]].i[i[i]].i[i[i]]",definitions:{i:{validator:function validator(e,t,a,n,i){return e=-1<a-1&&"."!==t.buffer[a-1]?(e=t.buffer[a-1]+e,-1<a-2&&"."!==t.buffer[a-2]?t.buffer[a-2]+e:"0"+e):"00"+e,new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(e)}}},onUnMask:function onUnMask(e,t,a){return e},inputmode:"numeric"},email:{mask:"*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",greedy:!1,casing:"lower",onBeforePaste:function onBeforePaste(e,t){return(e=e.toLowerCase()).replace("mailto:","")},definitions:{"*":{validator:"[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"},"-":{validator:"[0-9A-Za-z-]"}},onUnMask:function onUnMask(e,t,a){return e},inputmode:"email"},mac:{mask:"##:##:##:##:##:##"},vin:{mask:"V{13}9{4}",definitions:{V:{validator:"[A-HJ-NPR-Za-hj-npr-z\\d]",casing:"upper"}},clearIncomplete:!0,autoUnmask:!0}}),e.exports=n},function(e,t,a){"use strict";var T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(F,M,V){var S=M.document,e=navigator.userAgent,x=0<e.indexOf("MSIE ")||0<e.indexOf("Trident/"),P=isInputEventSupported("touchstart"),_=/iemobile/i.test(e),E=/iphone/i.test(e)&&!_;function Inputmask(e,t,a){if(!(this instanceof Inputmask))return new Inputmask(e,t,a);this.el=V,this.events={},this.maskset=V,!(this.refreshValue=!1)!==a&&(F.isPlainObject(e)?t=e:(t=t||{},e&&(t.alias=e)),this.opts=F.extend(!0,{},this.defaults,t),this.noMasksCache=t&&t.definitions!==V,this.userOptions=t||{},this.isRTL=this.opts.numericInput,resolveAlias(this.opts.alias,t,this.opts))}function resolveAlias(e,t,a){var n=Inputmask.prototype.aliases[e];return n?(n.alias&&resolveAlias(n.alias,V,a),F.extend(!0,a,n),F.extend(!0,a,t),!0):(null===a.mask&&(a.mask=e),!1)}function generateMaskSet(a,s){function generateMask(e,t,a){var n=!1;if(null!==e&&""!==e||(n=null!==a.regex,e=n?(e=a.regex).replace(/^(\^)(.*)(\$)$/,"$2"):(n=!0,".*")),1===e.length&&!1===a.greedy&&0!==a.repeat&&(a.placeholder=""),0<a.repeat||"*"===a.repeat||"+"===a.repeat){var i="*"===a.repeat?0:"+"===a.repeat?1:a.repeat;e=a.groupmarker[0]+e+a.groupmarker[1]+a.quantifiermarker[0]+i+","+a.repeat+a.quantifiermarker[1]}var r,o=n?"regex_"+a.regex:a.numericInput?e.split("").reverse().join(""):e;return Inputmask.prototype.masksCache[o]===V||!0===s?(r={mask:e,maskToken:Inputmask.prototype.analyseMask(e,n,a),validPositions:{},_buffer:V,buffer:V,tests:{},excludes:{},metadata:t,maskLength:V,jitOffset:{}},!0!==s&&(Inputmask.prototype.masksCache[o]=r,r=F.extend(!0,{},Inputmask.prototype.masksCache[o]))):r=F.extend(!0,{},Inputmask.prototype.masksCache[o]),r}if(F.isFunction(a.mask)&&(a.mask=a.mask(a)),F.isArray(a.mask)){if(1<a.mask.length){if(null===a.keepStatic){a.keepStatic="auto";for(var e=0;e<a.mask.length;e++)if(a.mask[e].charAt(0)!==a.mask[0].charAt(0)){a.keepStatic=!0;break}}var n=a.groupmarker[0];return F.each(a.isRTL?a.mask.reverse():a.mask,function(e,t){1<n.length&&(n+=a.groupmarker[1]+a.alternatormarker+a.groupmarker[0]),t.mask===V||F.isFunction(t.mask)?n+=t:n+=t.mask}),generateMask(n+=a.groupmarker[1],a.mask,a)}a.mask=a.mask.pop()}return a.mask&&a.mask.mask!==V&&!F.isFunction(a.mask.mask)?generateMask(a.mask.mask,a.mask,a):generateMask(a.mask,a.mask,a)}function isInputEventSupported(e){var t=S.createElement("input"),a="on"+e,n=a in t;return n||(t.setAttribute(a,"return;"),n="function"==typeof t[a]),t=null,n}function maskScope(e,t,N){t=t||this.maskset,N=N||this.opts;var m,i,g,f,r,u=this,l=this.el,k=this.isRTL,o=!1,c=!1,h=!1,n=!1;function getMaskTemplate(e,t,a,n,i){var r=N.greedy;i&&(N.greedy=!1),t=t||0;var o,s,l,u=[],c=0;getLastValidPosition();do{if(!0===e&&getMaskSet().validPositions[c])l=i&&!0===getMaskSet().validPositions[c].match.optionality&&getMaskSet().validPositions[c+1]===V&&(!0===getMaskSet().validPositions[c].generatedInput||getMaskSet().validPositions[c].input==N.skipOptionalPartCharacter&&0<c)?determineTestTemplate(c,getTests(c,o,c-1)):getMaskSet().validPositions[c],s=l.match,o=l.locator.slice(),u.push(!0===a?l.input:!1===a?s.nativeDef:getPlaceholder(c,s));else{l=getTestTemplate(c,o,c-1),s=l.match,o=l.locator.slice();var p=!0!==n&&(!1!==N.jitMasking?N.jitMasking:s.jit);(!1===p||p===V||"number"==typeof p&&isFinite(p)&&c<p)&&u.push(!1===a?s.nativeDef:getPlaceholder(c,s))}"auto"===N.keepStatic&&s.newBlockMarker&&null!==s.fn&&(N.keepStatic=c-1),c++}while((g===V||c<g)&&(null!==s.fn||""!==s.def)||c<t);return""===u[u.length-1]&&u.pop(),!1===a&&getMaskSet().maskLength!==V||(getMaskSet().maskLength=c-1),N.greedy=r,u}function getMaskSet(){return t}function resetMaskSet(e){var t=getMaskSet();t.buffer=V,!0!==e&&(t.validPositions={},t.p=0)}function getLastValidPosition(e,t,a){var n=-1,i=-1,r=a||getMaskSet().validPositions;for(var o in e===V&&(e=-1),r){var s=parseInt(o);r[s]&&(t||!0!==r[s].generatedInput)&&(s<=e&&(n=s),e<=s&&(i=s))}return-1===n||n==e?i:-1==i?n:e-n<i-e?n:i}function getDecisionTaker(e){var t=e.locator[e.alternation];return"string"==typeof t&&0<t.length&&(t=t.split(",")[0]),t!==V?t.toString():""}function getLocator(e,t){var a=(e.alternation!=V?e.mloc[getDecisionTaker(e)]:e.locator).join("");if(""!==a)for(;a.length<t;)a+="0";return a}function determineTestTemplate(e,t){for(var a,n,i,r=getTest(e=0<e?e-1:0),o=getLocator(r),s=0;s<t.length;s++){var l=t[s];a=getLocator(l,o.length);var u=Math.abs(a-o);(n===V||""!==a&&u<n||i&&i.match.optionality&&"master"===i.match.newBlockMarker&&(!l.match.optionality||!l.match.newBlockMarker)||i&&i.match.optionalQuantifier&&!l.match.optionalQuantifier)&&(n=u,i=l)}return i}function getTestTemplate(e,t,a){return getMaskSet().validPositions[e]||determineTestTemplate(e,getTests(e,t?t.slice():t,a))}function getTest(e,t){return getMaskSet().validPositions[e]?getMaskSet().validPositions[e]:(t||getTests(e))[0]}function positionCanMatchDefinition(e,t){for(var a=!1,n=getTests(e),i=0;i<n.length;i++)if(n[i].match&&n[i].match.def===t){a=!0;break}return a}function getTests(A,e,t){var O,a=getMaskSet().maskToken,B=e?t:0,n=e?e.slice():[0],I=[],L=!1,j=e?e.join(""):"";function resolveTestFromToken(D,C,e,t){function handleMatch(e,t,a){function isFirstMatch(a,n){var i=0===F.inArray(a,n.matches);return i||F.each(n.matches,function(e,t){if(!0===t.isQuantifier?i=isFirstMatch(a,n.matches[e-1]):t.hasOwnProperty("matches")&&(i=isFirstMatch(a,t)),i)return!1}),i}function resolveNdxInitializer(e,i,r){var o,s;if((getMaskSet().tests[e]||getMaskSet().validPositions[e])&&F.each(getMaskSet().tests[e]||[getMaskSet().validPositions[e]],function(e,t){if(t.mloc[i])return o=t,!1;var a=r!==V?r:t.alternation,n=t.locator[a]!==V?t.locator[a].toString().indexOf(i):-1;(s===V||n<s)&&-1!==n&&(o=t,s=n)}),o){var t=o.locator[o.alternation],a=o.mloc[i]||o.mloc[t]||o.locator;return a.slice((r!==V?r:o.alternation)+1)}return r!==V?resolveNdxInitializer(e,i):V}function isSubsetOf(e,t){function expand(e){for(var t,a,n=[],i=0,r=e.length;i<r;i++)if("-"===e.charAt(i))for(a=e.charCodeAt(i+1);++t<a;)n.push(String.fromCharCode(t));else t=e.charCodeAt(i),n.push(e.charAt(i));return n.join("")}return N.regex&&null!==e.match.fn&&null!==t.match.fn?-1!==expand(t.match.def.replace(/[\[\]]/g,"")).indexOf(expand(e.match.def.replace(/[\[\]]/g,""))):e.match.def===t.match.nativeDef}function setMergeLocators(e,t){if(t===V||e.alternation===t.alternation&&-1===e.locator[e.alternation].toString().indexOf(t.locator[t.alternation])){e.mloc=e.mloc||{};var a=e.locator[e.alternation];if(a!==V){if("string"==typeof a&&(a=a.split(",")[0]),e.mloc[a]===V&&(e.mloc[a]=e.locator.slice()),t!==V){for(var n in t.mloc)"string"==typeof n&&(n=n.split(",")[0]),e.mloc[n]===V&&(e.mloc[n]=t.mloc[n]);e.locator[e.alternation]=Object.keys(e.mloc).join(",")}return!0}e.alternation=V}return!1}if(500<B&&a!==V)throw"Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. "+getMaskSet().mask;if(B===A&&e.matches===V)return I.push({match:e,locator:t.reverse(),cd:j,mloc:{}}),!0;if(e.matches!==V){if(e.isGroup&&a!==e){if(e=handleMatch(D.matches[F.inArray(e,D.matches)+1],t,a))return!0}else if(e.isOptional){var n=e;if(e=resolveTestFromToken(e,C,t,a)){if(F.each(I,function(e,t){t.match.optionality=!0}),O=I[I.length-1].match,a!==V||!isFirstMatch(O,n))return!0;L=!0,B=A}}else if(e.isAlternator){var i,r=e,o=[],s=I.slice(),l=t.length,u=0<C.length?C.shift():-1;if(-1===u||"string"==typeof u){var c,p=B,f=C.slice(),d=[];if("string"==typeof u)d=u.split(",");else for(c=0;c<r.matches.length;c++)d.push(c.toString());if(getMaskSet().excludes[A]){for(var g=d.slice(),m=0,k=getMaskSet().excludes[A].length;m<k;m++)d.splice(d.indexOf(getMaskSet().excludes[A][m].toString()),1);0===d.length&&(getMaskSet().excludes[A]=V,d=g)}(!0===N.keepStatic||isFinite(parseInt(N.keepStatic))&&p>=N.keepStatic)&&(d=d.slice(0,1));for(var h=!1,v=0;v<d.length;v++){c=parseInt(d[v]),I=[],C="string"==typeof u&&resolveNdxInitializer(B,c,l)||f.slice(),r.matches[c]&&handleMatch(r.matches[c],[c].concat(t),a)?e=!0:0===v&&(h=!0),i=I.slice(),B=p,I=[];for(var y=0;y<i.length;y++){var b=i[y],M=!1;b.match.jit=b.match.jit||h,b.alternation=b.alternation||l,setMergeLocators(b);for(var S=0;S<o.length;S++){var x=o[S];if("string"!=typeof u||b.alternation!==V&&-1!==F.inArray(b.locator[b.alternation].toString(),d)){if(b.match.nativeDef===x.match.nativeDef){M=!0,setMergeLocators(x,b);break}if(isSubsetOf(b,x)){setMergeLocators(b,x)&&(M=!0,o.splice(o.indexOf(x),0,b));break}if(isSubsetOf(x,b)){setMergeLocators(x,b);break}if(w=x,void 0,!(!((T=T=b).locator.slice(T.alternation).join("")==w.locator.slice(w.alternation).join(""))||null!==T.match.fn||null===w.match.fn)&&w.match.fn.test(T.match.def,getMaskSet(),A,!1,N,!1)){setMergeLocators(b,x)&&(M=!0,o.splice(o.indexOf(x),0,b));break}}}M||o.push(b)}}I=s.concat(o),B=A,L=0<I.length,e=0<o.length,C=f.slice()}else e=handleMatch(r.matches[u]||D.matches[u],[u].concat(t),a);if(e)return!0}else if(e.isQuantifier&&a!==D.matches[F.inArray(e,D.matches)-1])for(var P=e,_=0<C.length?C.shift():0;_<(isNaN(P.quantifier.max)?_+1:P.quantifier.max)&&B<=A;_++){var E=D.matches[F.inArray(P,D.matches)-1];if(e=handleMatch(E,[_].concat(t),E)){if((O=I[I.length-1].match).optionalQuantifier=_>=P.quantifier.min,O.jit=(_||1)*E.matches.indexOf(O)>=P.quantifier.jit,O.optionalQuantifier&&isFirstMatch(O,E)){L=!0,B=A;break}return O.jit&&(getMaskSet().jitOffset[A]=E.matches.indexOf(O)),!0}}else if(e=resolveTestFromToken(e,C,t,a))return!0}else B++;var T,w}for(var a=0<C.length?C.shift():0;a<D.matches.length;a++)if(!0!==D.matches[a].isQuantifier){var n=handleMatch(D.matches[a],[a].concat(e),t);if(n&&B===A)return n;if(A<B)break}}if(-1<A){if(e===V){for(var i,r=A-1;(i=getMaskSet().validPositions[r]||getMaskSet().tests[r])===V&&-1<r;)r--;i!==V&&-1<r&&(n=function mergeLocators(e,t){var n=[];return F.isArray(t)||(t=[t]),0<t.length&&(t[0].alternation===V?0===(n=determineTestTemplate(e,t.slice()).locator.slice()).length&&(n=t[0].locator.slice()):F.each(t,function(e,t){if(""!==t.def)if(0===n.length)n=t.locator.slice();else for(var a=0;a<n.length;a++)t.locator[a]&&-1===n[a].toString().indexOf(t.locator[a])&&(n[a]+=","+t.locator[a])})),n}(r,i),j=n.join(""),B=r)}if(getMaskSet().tests[A]&&getMaskSet().tests[A][0].cd===j)return getMaskSet().tests[A];for(var o=n.shift();o<a.length;o++){var s=resolveTestFromToken(a[o],n,[o]);if(s&&B===A||A<B)break}}return(0===I.length||L)&&I.push({match:{fn:null,optionality:!1,casing:null,def:"",placeholder:""},locator:[],mloc:{},cd:j}),e!==V&&getMaskSet().tests[A]?F.extend(!0,[],I):(getMaskSet().tests[A]=F.extend(!0,[],I),getMaskSet().tests[A])}function getBufferTemplate(){return getMaskSet()._buffer===V&&(getMaskSet()._buffer=getMaskTemplate(!1,1),getMaskSet().buffer===V&&(getMaskSet().buffer=getMaskSet()._buffer.slice())),getMaskSet()._buffer}function getBuffer(e){return getMaskSet().buffer!==V&&!0!==e||(getMaskSet().buffer=getMaskTemplate(!0,getLastValidPosition(),!0),getMaskSet()._buffer===V&&(getMaskSet()._buffer=getMaskSet().buffer.slice())),getMaskSet().buffer}function refreshFromBuffer(e,t,a){var n,i;if(!0===e)resetMaskSet(),e=0,t=a.length;else for(n=e;n<t;n++)delete getMaskSet().validPositions[n];for(n=i=e;n<t;n++)if(resetMaskSet(!0),a[n]!==N.skipOptionalPartCharacter){var r=isValid(i,a[n],!0,!0);!1!==r&&(resetMaskSet(!0),i=r.caret!==V?r.caret:r.pos+1)}}function checkAlternationMatch(e,t,a){for(var n,i=N.greedy?t:t.slice(0,1),r=!1,o=a!==V?a.split(","):[],s=0;s<o.length;s++)-1!==(n=e.indexOf(o[s]))&&e.splice(n,1);for(var l=0;l<e.length;l++)if(-1!==F.inArray(e[l],i)){r=!0;break}return r}function alternate(e,t,a,n,i){var r,o,s,l,u,c,p,f=F.extend(!0,{},getMaskSet().validPositions),d=!1,g=i!==V?i:getLastValidPosition();if(-1===g&&i===V)l=getTest(r=0),o=l.alternation;else for(;0<=g;g--)if((s=getMaskSet().validPositions[g])&&s.alternation!==V){if(l&&l.locator[s.alternation]!==s.locator[s.alternation])break;r=g,o=getMaskSet().validPositions[r].alternation,l=s}if(o!==V){p=parseInt(r),getMaskSet().excludes[p]=getMaskSet().excludes[p]||[],!0!==e&&getMaskSet().excludes[p].push(getDecisionTaker(l));var m=[],k=0;for(u=p;u<getLastValidPosition(V,!0)+1;u++)(c=getMaskSet().validPositions[u])&&!0!==c.generatedInput?m.push(c.input):u<e&&k++,delete getMaskSet().validPositions[u];for(;getMaskSet().excludes[p]&&getMaskSet().excludes[p].length<10;){var h=-1*k,v=m.slice();for(getMaskSet().tests[p]=V,resetMaskSet(!0),d=!0;0<v.length;){var y=v.shift();if(!(d=isValid(getLastValidPosition(V,!0)+1,y,!1,n,!0)))break}if(d&&t!==V){var b=getLastValidPosition(e)+1;for(u=p;u<getLastValidPosition()+1;u++)((c=getMaskSet().validPositions[u])===V||null==c.match.fn)&&u<e+h&&h++;d=isValid(b<(e+=h)?b:e,t,a,n,!0)}if(d)break;if(resetMaskSet(),l=getTest(p),getMaskSet().validPositions=F.extend(!0,{},f),!getMaskSet().excludes[p]){d=alternate(e,t,a,n,p-1);break}var M=getDecisionTaker(l);if(-1!==getMaskSet().excludes[p].indexOf(M)){d=alternate(e,t,a,n,p-1);break}for(getMaskSet().excludes[p].push(M),u=p;u<getLastValidPosition(V,!0)+1;u++)delete getMaskSet().validPositions[u]}}return getMaskSet().excludes[p]=V,d}function isValid(u,e,t,c,a,n){function isSelection(e){return k?1<e.begin-e.end||e.begin-e.end==1:1<e.end-e.begin||e.end-e.begin==1}t=!0===t;var i=u;function _isValid(r,o,s){var l=!1;return F.each(getTests(r),function(e,t){var a=t.match;if(getBuffer(!0),!1!==(l=null!=a.fn?a.fn.test(o,getMaskSet(),r,s,N,isSelection(u)):(o===a.def||o===N.skipOptionalPartCharacter)&&""!==a.def&&{c:getPlaceholder(r,a,!0)||a.def,pos:r})){var n=l.c!==V?l.c:o,i=r;return n=n===N.skipOptionalPartCharacter&&null===a.fn?getPlaceholder(r,a,!0)||a.def:n,l.remove!==V&&(F.isArray(l.remove)||(l.remove=[l.remove]),F.each(l.remove.sort(function(e,t){return t-e}),function(e,t){revalidateMask({begin:t,end:t+1})})),l.insert!==V&&(F.isArray(l.insert)||(l.insert=[l.insert]),F.each(l.insert.sort(function(e,t){return e-t}),function(e,t){isValid(t.pos,t.c,!0,c)})),!0!==l&&l.pos!==V&&l.pos!==r&&(i=l.pos),!0!==l&&l.pos===V&&l.c===V||revalidateMask(u,F.extend({},t,{input:function casing(e,t,a){switch(N.casing||t.casing){case"upper":e=e.toUpperCase();break;case"lower":e=e.toLowerCase();break;case"title":var n=getMaskSet().validPositions[a-1];e=0===a||n&&n.input===String.fromCharCode(Inputmask.keyCode.SPACE)?e.toUpperCase():e.toLowerCase();break;default:if(F.isFunction(N.casing)){var i=Array.prototype.slice.call(arguments);i.push(getMaskSet().validPositions),e=N.casing.apply(this,i)}}return e}(n,a,i)}),c,i)||(l=!1),!1}}),l}u.begin!==V&&(i=k?u.end:u.begin);var r=!0,o=F.extend(!0,{},getMaskSet().validPositions);if(F.isFunction(N.preValidation)&&!t&&!0!==c&&!0!==n&&(r=N.preValidation(getBuffer(),i,e,isSelection(u),N,getMaskSet())),!0===r){if(trackbackPositions(V,i,!0),(g===V||i<g)&&(r=_isValid(i,e,t),(!t||!0===c)&&!1===r&&!0!==n)){var s=getMaskSet().validPositions[i];if(!s||null!==s.match.fn||s.match.def!==e&&e!==N.skipOptionalPartCharacter){if((N.insertMode||getMaskSet().validPositions[seekNext(i)]===V)&&(!isMask(i,!0)||getMaskSet().jitOffset[i]))if(getMaskSet().jitOffset[i]&&getMaskSet().validPositions[seekNext(i)]===V)(r=isValid(i+getMaskSet().jitOffset[i],e,t)).caret=i;else for(var l=i+1,p=seekNext(i);l<=p;l++)if(!1!==(r=_isValid(l,e,t))){r=trackbackPositions(i,r.pos!==V?r.pos:l)||r,i=l;break}}else r={caret:seekNext(i)}}!1!==r||!1===N.keepStatic||null!=N.regex&&!isComplete(getBuffer())||t||!0===a||(r=alternate(i,e,t,c)),!0===r&&(r={pos:i})}if(F.isFunction(N.postValidation)&&!1!==r&&!t&&!0!==c&&!0!==n){var f=N.postValidation(getBuffer(!0),u.begin!==V?k?u.end:u.begin:u,r,N);if(f!==V){if(f.refreshFromBuffer&&f.buffer){var d=f.refreshFromBuffer;refreshFromBuffer(!0===d?d:d.start,d.end,f.buffer)}r=!0===f?r:f}}return r&&r.pos===V&&(r.pos=i),!1!==r&&!0!==n||(resetMaskSet(!0),getMaskSet().validPositions=F.extend(!0,{},o)),r}function trackbackPositions(e,t,a){var n;if(e===V)for(e=t-1;0<e&&!getMaskSet().validPositions[e];e--);for(var i=e;i<t;i++)if(getMaskSet().validPositions[i]===V&&!isMask(i,!0)){var r=0==i?getTest(i):getMaskSet().validPositions[i-1];if(r){var o=getTests(i).slice();""===o[o.length-1].match.def&&o.pop();var s=determineTestTemplate(i,o);if((s=F.extend({},s,{input:getPlaceholder(i,s.match,!0)||s.match.def})).generatedInput=!0,revalidateMask(i,s,!0),!0!==a){var l=getMaskSet().validPositions[t].input;getMaskSet().validPositions[t]=V,n=isValid(t,l,!0,!0)}}}return n}function revalidateMask(e,t,a,n){function IsEnclosedStatic(e,t,a){var n=t[e];if(n===V||(null!==n.match.fn||!0===n.match.optionality)&&n.input!==N.radixPoint)return!1;var i=a.begin<=e-1?t[e-1]&&null===t[e-1].match.fn&&t[e-1]:t[e-1],r=a.end>e+1?t[e+1]&&null===t[e+1].match.fn&&t[e+1]:t[e+1];return i&&r}var i=e.begin!==V?e.begin:e,r=e.end!==V?e.end:e;if(e.begin>e.end&&(i=e.end,r=e.begin),n=n!==V?n:i,i!==r||N.insertMode&&getMaskSet().validPositions[n]!==V&&a===V){var o=F.extend(!0,{},getMaskSet().validPositions),s=getLastValidPosition(V,!0);for(getMaskSet().p=i,f=s;i<=f;f--)getMaskSet().validPositions[f]&&"+"===getMaskSet().validPositions[f].match.nativeDef&&(N.isNegative=!1),delete getMaskSet().validPositions[f];var l=!0,u=n,c=(getMaskSet().validPositions,!1),p=u,f=u;for(t&&(getMaskSet().validPositions[n]=F.extend(!0,{},t),p++,u++,i<r&&f++);f<=s;f++){var d=o[f];if(d!==V&&(r<=f||i<=f&&!0!==d.generatedInput&&IsEnclosedStatic(f,o,{begin:i,end:r}))){for(;""!==getTest(p).match.def;){if(!1===c&&o[p]&&o[p].match.nativeDef===d.match.nativeDef)getMaskSet().validPositions[p]=F.extend(!0,{},o[p]),getMaskSet().validPositions[p].input=d.input,trackbackPositions(V,p,!0),u=p+1,l=!0;else if(N.shiftPositions&&positionCanMatchDefinition(p,d.match.def)){var g=isValid(p,d.input,!0,!0);l=!1!==g,u=g.caret||g.insert?getLastValidPosition():p+1,c=!0}else l=!0===d.generatedInput||d.input===N.radixPoint&&!0===N.numericInput;if(l)break;if(!l&&r<p&&isMask(p,!0)&&(null!==d.match.fn||p>getMaskSet().maskLength))break;p++}""==getTest(p).match.def&&(l=!1),p=u}if(!l)break}if(!l)return getMaskSet().validPositions=F.extend(!0,{},o),resetMaskSet(!0),!1}else t&&(getMaskSet().validPositions[n]=F.extend(!0,{},t));return resetMaskSet(!0),!0}function isMask(e,t){var a=getTestTemplate(e).match;if(""===a.def&&(a=getTest(e).match),null!=a.fn)return a.fn;if(!0!==t&&-1<e){var n=getTests(e);return n.length>1+(""===n[n.length-1].match.def?1:0)}return!1}function seekNext(e,t){for(var a=e+1;""!==getTest(a).match.def&&(!0===t&&(!0!==getTest(a).match.newBlockMarker||!isMask(a))||!0!==t&&!isMask(a));)a++;return a}function seekPrevious(e,t){var a,n=e;if(n<=0)return 0;for(;0<--n&&(!0===t&&!0!==getTest(n).match.newBlockMarker||!0!==t&&!isMask(n)&&((a=getTests(n)).length<2||2===a.length&&""===a[1].match.def)););return n}function writeBuffer(e,t,a,n,i){if(n&&F.isFunction(N.onBeforeWrite)){var r=N.onBeforeWrite.call(u,n,t,a,N);if(r){if(r.refreshFromBuffer){var o=r.refreshFromBuffer;refreshFromBuffer(!0===o?o:o.start,o.end,r.buffer||t),t=getBuffer(!0)}a!==V&&(a=r.caret!==V?r.caret:a)}}if(e!==V&&(e.inputmask._valueSet(t.join("")),a===V||n!==V&&"blur"===n.type?renderColorMask(e,a,0===t.length):caret(e,a),!0===i)){var s=F(e),l=e.inputmask._valueGet();c=!0,s.trigger("input"),setTimeout(function(){l===getBufferTemplate().join("")?s.trigger("cleared"):!0===isComplete(t)&&s.trigger("complete")},0)}}function getPlaceholder(e,t,a){if((t=t||getTest(e).match).placeholder!==V||!0===a)return F.isFunction(t.placeholder)?t.placeholder(N):t.placeholder;if(null!==t.fn)return N.placeholder.charAt(e%N.placeholder.length);if(-1<e&&getMaskSet().validPositions[e]===V){var n,i=getTests(e),r=[];if(i.length>1+(""===i[i.length-1].match.def?1:0))for(var o=0;o<i.length;o++)if(!0!==i[o].match.optionality&&!0!==i[o].match.optionalQuantifier&&(null===i[o].match.fn||n===V||!1!==i[o].match.fn.test(n.match.def,getMaskSet(),e,!0,N))&&(r.push(i[o]),null===i[o].match.fn&&(n=i[o]),1<r.length&&/[0-9a-bA-Z]/.test(r[0].match.def)))return N.placeholder.charAt(e%N.placeholder.length)}return t.def}function HandleNativePlaceholder(e,t){if(x&&e.inputmask._valueGet()!==t){var a=getBuffer().slice(),n=e.inputmask._valueGet();n!==t&&(-1===getLastValidPosition()&&n===getBufferTemplate().join("")?a=[]:clearOptionalTail(a),writeBuffer(e,a))}else e.placeholder!==t&&(e.placeholder=t,""===e.placeholder&&e.removeAttribute("placeholder"))}var a,s={on:function on(e,t,r){var a=function ev(e){var t=this;if(t.inputmask===V&&"FORM"!==this.nodeName){var a=F.data(t,"_inputmask_opts");a?new Inputmask(a).mask(t):s.off(t)}else{if("setvalue"===e.type||"FORM"===this.nodeName||!(t.disabled||t.readOnly&&!("keydown"===e.type&&e.ctrlKey&&67===e.keyCode||!1===N.tabThrough&&e.keyCode===Inputmask.keyCode.TAB))){switch(e.type){case"input":if(!0===c)return c=!1,e.preventDefault();if(P){var n=arguments;return setTimeout(function(){r.apply(t,n),caret(t,t.inputmask.caretPos,V,!0)},0),!1}break;case"keydown":c=o=!1;break;case"keypress":if(!0===o)return e.preventDefault();o=!0;break;case"click":if(_||E){var n=arguments;return setTimeout(function(){r.apply(t,n)},0),!1}}var i=r.apply(t,arguments);return!1===i&&(e.preventDefault(),e.stopPropagation()),i}e.preventDefault()}};e.inputmask.events[t]=e.inputmask.events[t]||[],e.inputmask.events[t].push(a),-1!==F.inArray(t,["submit","reset"])?null!==e.form&&F(e.form).on(t,a):F(e).on(t,a)},off:function off(n,e){var t;n.inputmask&&n.inputmask.events&&(e?(t=[])[e]=n.inputmask.events[e]:t=n.inputmask.events,F.each(t,function(e,t){for(;0<t.length;){var a=t.pop();-1!==F.inArray(e,["submit","reset"])?null!==n.form&&F(n.form).off(e,a):F(n).off(e,a)}delete n.inputmask.events[e]}))}},v={keydownEvent:function keydownEvent(e){var t=this,a=F(t),n=e.keyCode,i=caret(t);if(n===Inputmask.keyCode.BACKSPACE||n===Inputmask.keyCode.DELETE||E&&n===Inputmask.keyCode.BACKSPACE_SAFARI||e.ctrlKey&&n===Inputmask.keyCode.X&&!isInputEventSupported("cut"))e.preventDefault(),handleRemove(0,n,i),writeBuffer(t,getBuffer(!0),getMaskSet().p,e,t.inputmask._valueGet()!==getBuffer().join(""));else if(n===Inputmask.keyCode.END||n===Inputmask.keyCode.PAGE_DOWN){e.preventDefault();var r=seekNext(getLastValidPosition());caret(t,e.shiftKey?i.begin:r,r,!0)}else n===Inputmask.keyCode.HOME&&!e.shiftKey||n===Inputmask.keyCode.PAGE_UP?(e.preventDefault(),caret(t,0,e.shiftKey?i.begin:0,!0)):(N.undoOnEscape&&n===Inputmask.keyCode.ESCAPE||90===n&&e.ctrlKey)&&!0!==e.altKey?(checkVal(t,!0,!1,m.split("")),a.trigger("click")):n!==Inputmask.keyCode.INSERT||e.shiftKey||e.ctrlKey?!0===N.tabThrough&&n===Inputmask.keyCode.TAB&&(!0===e.shiftKey?(null===getTest(i.begin).match.fn&&(i.begin=seekNext(i.begin)),i.end=seekPrevious(i.begin,!0),i.begin=seekPrevious(i.end,!0)):(i.begin=seekNext(i.begin,!0),i.end=seekNext(i.begin,!0),i.end<getMaskSet().maskLength&&i.end--),i.begin<getMaskSet().maskLength&&(e.preventDefault(),caret(t,i.begin,i.end))):(N.insertMode=!N.insertMode,t.setAttribute("im-insert",N.insertMode));N.onKeyDown.call(this,e,getBuffer(),caret(t).begin,N),h=-1!==F.inArray(n,N.ignorables)},keypressEvent:function keypressEvent(e,t,a,n,i){var r=this,o=F(r),s=e.which||e.charCode||e.keyCode;if(!(!0===t||e.ctrlKey&&e.altKey)&&(e.ctrlKey||e.metaKey||h))return s===Inputmask.keyCode.ENTER&&m!==getBuffer().join("")&&(m=getBuffer().join(""),setTimeout(function(){o.trigger("change")},0)),!0;if(s){46===s&&!1===e.shiftKey&&""!==N.radixPoint&&(s=N.radixPoint.charCodeAt(0));var l,u=t?{begin:i,end:i}:caret(r),c=String.fromCharCode(s),p=0;if(N._radixDance&&N.numericInput){var f=getBuffer().indexOf(N.radixPoint.charAt(0))+1;u.begin<=f&&(s===N.radixPoint.charCodeAt(0)&&(p=1),u.begin-=1,u.end-=1)}getMaskSet().writeOutBuffer=!0;var d=isValid(u,c,n);if(!1!==d&&(resetMaskSet(!0),l=d.caret!==V?d.caret:seekNext(d.pos.begin?d.pos.begin:d.pos),getMaskSet().p=l),l=(N.numericInput&&d.caret===V?seekPrevious(l):l)+p,!1!==a&&(setTimeout(function(){N.onKeyValidation.call(r,s,d,N)},0),getMaskSet().writeOutBuffer&&!1!==d)){var g=getBuffer();writeBuffer(r,g,l,e,!0!==t)}if(e.preventDefault(),t)return!1!==d&&(d.forwardPosition=l),d}},pasteEvent:function pasteEvent(e){var t,a=this,n=e.originalEvent||e,i=(F(a),a.inputmask._valueGet(!0)),r=caret(a);k&&(t=r.end,r.end=r.begin,r.begin=t);var o=i.substr(0,r.begin),s=i.substr(r.end,i.length);if(o===(k?getBufferTemplate().reverse():getBufferTemplate()).slice(0,r.begin).join("")&&(o=""),s===(k?getBufferTemplate().reverse():getBufferTemplate()).slice(r.end).join("")&&(s=""),M.clipboardData&&M.clipboardData.getData)i=o+M.clipboardData.getData("Text")+s;else{if(!n.clipboardData||!n.clipboardData.getData)return!0;i=o+n.clipboardData.getData("text/plain")+s}var l=i;if(F.isFunction(N.onBeforePaste)){if(!1===(l=N.onBeforePaste.call(u,i,N)))return e.preventDefault();l||(l=i)}return checkVal(a,!1,!1,l.toString().split("")),writeBuffer(a,getBuffer(),seekNext(getLastValidPosition()),e,m!==getBuffer().join("")),e.preventDefault()},inputFallBackEvent:function inputFallBackEvent(e){var n=this,t=n.inputmask._valueGet();if(getBuffer().join("")!==t){var a=caret(n);if(t=function ieMobileHandler(e,t,a){if(_){var n=t.replace(getBuffer().join(""),"");if(1===n.length){var i=t.split("");i.splice(a.begin,0,n),t=i.join("")}}return t}(0,t=function radixPointHandler(e,t,a){return"."===t.charAt(a.begin-1)&&""!==N.radixPoint&&((t=t.split(""))[a.begin-1]=N.radixPoint.charAt(0),t=t.join("")),t}(0,t,a),a),getBuffer().join("")!==t){var i=getBuffer().join(""),r=!N.numericInput&&t.length>i.length?-1:0,o=t.substr(0,a.begin),s=t.substr(a.begin),l=i.substr(0,a.begin+r),u=i.substr(a.begin+r),c=a,p="",f=!1;if(o!==l){var d,g=(f=o.length>=l.length)?o.length:l.length;for(d=0;o.charAt(d)===l.charAt(d)&&d<g;d++);f&&(c.begin=d-r,p+=o.slice(d,c.end))}if(s!==u&&(s.length>u.length?p+=s.slice(0,1):s.length<u.length&&(c.end+=u.length-s.length,f||""===N.radixPoint||""!==s||o.charAt(c.begin+r-1)!==N.radixPoint||(c.begin--,p=N.radixPoint))),writeBuffer(n,getBuffer(),{begin:c.begin+r,end:c.end+r}),0<p.length)F.each(p.split(""),function(e,t){var a=new F.Event("keypress");a.which=t.charCodeAt(0),h=!1,v.keypressEvent.call(n,a)});else{c.begin===c.end-1&&(c.begin=seekPrevious(c.begin+1),c.begin===c.end-1?caret(n,c.begin):caret(n,c.begin,c.end));var m=new F.Event("keydown");m.keyCode=N.numericInput?Inputmask.keyCode.BACKSPACE:Inputmask.keyCode.DELETE,v.keydownEvent.call(n,m)}e.preventDefault()}}},beforeInputEvent:function beforeInputEvent(e){if(e.cancelable){var n=this;switch(e.inputType){case"insertText":return F.each(e.data.split(""),function(e,t){var a=new F.Event("keypress");a.which=t.charCodeAt(0),h=!1,v.keypressEvent.call(n,a)}),e.preventDefault();case"deleteContentBackward":var t=new F.Event("keydown");return t.keyCode=Inputmask.keyCode.BACKSPACE,v.keydownEvent.call(n,t),e.preventDefault();case"deleteContentForward":var t=new F.Event("keydown");return t.keyCode=Inputmask.keyCode.DELETE,v.keydownEvent.call(n,t),e.preventDefault()}}},setValueEvent:function setValueEvent(e){this.inputmask.refreshValue=!1;var t=e&&e.detail?e.detail[0]:arguments[1],t=t||this.inputmask._valueGet(!0);F.isFunction(N.onBeforeMask)&&(t=N.onBeforeMask.call(u,t,N)||t),checkVal(this,!0,!1,t=t.split("")),m=getBuffer().join(""),(N.clearMaskOnLostFocus||N.clearIncomplete)&&this.inputmask._valueGet()===getBufferTemplate().join("")&&this.inputmask._valueSet("")},focusEvent:function focusEvent(e){var t=this,a=t.inputmask._valueGet();N.showMaskOnFocus&&(!N.showMaskOnHover||N.showMaskOnHover&&""===a)&&(t.inputmask._valueGet()!==getBuffer().join("")?writeBuffer(t,getBuffer(),seekNext(getLastValidPosition())):!1===n&&caret(t,seekNext(getLastValidPosition()))),!0===N.positionCaretOnTab&&!1===n&&v.clickEvent.apply(t,[e,!0]),m=getBuffer().join("")},mouseleaveEvent:function mouseleaveEvent(e){n=!1,N.clearMaskOnLostFocus&&S.activeElement!==this&&HandleNativePlaceholder(this,r)},clickEvent:function clickEvent(e,u){var c=this;setTimeout(function(){if(S.activeElement===c){var e=caret(c);if(u&&(k?e.end=e.begin:e.begin=e.end),e.begin===e.end)switch(N.positionCaretOnClick){case"none":break;case"select":caret(c,0,getBuffer().length);break;case"ignore":caret(c,seekNext(getLastValidPosition()));break;case"radixFocus":if(function doRadixFocus(e){if(""!==N.radixPoint){var t=getMaskSet().validPositions;if(t[e]===V||t[e].input===getPlaceholder(e)){if(e<seekNext(-1))return!0;var a=F.inArray(N.radixPoint,getBuffer());if(-1!==a){for(var n in t)if(a<n&&t[n].input!==getPlaceholder(n))return!1;return!0}}}return!1}(e.begin)){var t=getBuffer().join("").indexOf(N.radixPoint);caret(c,N.numericInput?seekNext(t):t);break}default:var a=e.begin,n=getLastValidPosition(a,!0),i=seekNext(n);if(a<i)caret(c,isMask(a,!0)||isMask(a-1,!0)?a:seekNext(a));else{var r=getMaskSet().validPositions[n],o=getTestTemplate(i,r?r.match.locator:V,r),s=getPlaceholder(i,o.match);if(""!==s&&getBuffer()[i]!==s&&!0!==o.match.optionalQuantifier&&!0!==o.match.newBlockMarker||!isMask(i,N.keepStatic)&&o.match.def===s){var l=seekNext(i);(l<=a||a===i)&&(i=l)}caret(c,i)}}}},0)},cutEvent:function cutEvent(e){F(this);var t=caret(this),a=e.originalEvent||e,n=M.clipboardData||a.clipboardData,i=k?getBuffer().slice(t.end,t.begin):getBuffer().slice(t.begin,t.end);n.setData("text",k?i.reverse().join(""):i.join("")),S.execCommand&&S.execCommand("copy"),handleRemove(0,Inputmask.keyCode.DELETE,t),writeBuffer(this,getBuffer(),getMaskSet().p,e,m!==getBuffer().join(""))},blurEvent:function blurEvent(e){var t=F(this);if(this.inputmask){HandleNativePlaceholder(this,r);var a=this.inputmask._valueGet(),n=getBuffer().slice();""===a&&f===V||(N.clearMaskOnLostFocus&&(-1===getLastValidPosition()&&a===getBufferTemplate().join("")?n=[]:clearOptionalTail(n)),!1===isComplete(n)&&(setTimeout(function(){t.trigger("incomplete")},0),N.clearIncomplete&&(resetMaskSet(),n=N.clearMaskOnLostFocus?[]:getBufferTemplate().slice())),writeBuffer(this,n,V,e)),m!==getBuffer().join("")&&(m=n.join(""),t.trigger("change"))}},mouseenterEvent:function mouseenterEvent(e){n=!0,S.activeElement!==this&&N.showMaskOnHover&&HandleNativePlaceholder(this,(k?getBuffer().slice().reverse():getBuffer()).join(""))},submitEvent:function submitEvent(e){m!==getBuffer().join("")&&i.trigger("change"),N.clearMaskOnLostFocus&&-1===getLastValidPosition()&&l.inputmask._valueGet&&l.inputmask._valueGet()===getBufferTemplate().join("")&&l.inputmask._valueSet(""),N.clearIncomplete&&!1===isComplete(getBuffer())&&l.inputmask._valueSet(""),N.removeMaskOnSubmit&&(l.inputmask._valueSet(l.inputmask.unmaskedvalue(),!0),setTimeout(function(){writeBuffer(l,getBuffer())},0))},resetEvent:function resetEvent(e){l.inputmask.refreshValue=!0,setTimeout(function(){i.trigger("setvalue")},0)}};function checkVal(i,e,r,t,a){var o=this||i.inputmask,s=t.slice(),l="",u=-1,c=V;if(resetMaskSet(),r||!0===N.autoUnmask)u=seekNext(u);else{var n=getBufferTemplate().slice(0,seekNext(-1)).join(""),p=s.join("").match(new RegExp("^"+Inputmask.escapeRegex(n),"g"));p&&0<p.length&&(s.splice(0,p.length*n.length),u=seekNext(u))}-1===u?(getMaskSet().p=seekNext(u),u=0):getMaskSet().p=u,o.caretPos={begin:u},F.each(s,function(e,t){if(t!==V)if(getMaskSet().validPositions[e]===V&&s[e]===getPlaceholder(e)&&isMask(e,!0)&&!1===isValid(e,s[e],!0,V,V,!0))getMaskSet().p++;else{var a=new F.Event("_checkval");a.which=t.charCodeAt(0),l+=t;var n=getLastValidPosition(V,!0);!function isTemplateMatch(e,t){return-1!==getMaskTemplate(!0,0,!1).slice(e,seekNext(e)).join("").replace(/'/g,"").indexOf(t)&&!isMask(e)&&(getTest(e).match.nativeDef===t.charAt(0)||null===getTest(e).match.fn&&getTest(e).match.nativeDef==="'"+t.charAt(0)||" "===getTest(e).match.nativeDef&&(getTest(e+1).match.nativeDef===t.charAt(0)||null===getTest(e+1).match.fn&&getTest(e+1).match.nativeDef==="'"+t.charAt(0)))}(u,l)?(c=v.keypressEvent.call(i,a,!0,!1,r,o.caretPos.begin))&&(u=o.caretPos.begin+1,l=""):c=v.keypressEvent.call(i,a,!0,!1,r,n+1),c&&(writeBuffer(V,getBuffer(),c.forwardPosition,a,!1),o.caretPos={begin:c.forwardPosition,end:c.forwardPosition})}}),e&&writeBuffer(i,getBuffer(),c?c.forwardPosition:V,a||new F.Event("checkval"),a&&"input"===a.type)}function unmaskedvalue(e){if(e){if(e.inputmask===V)return e.value;e.inputmask&&e.inputmask.refreshValue&&v.setValueEvent.call(e)}var t=[],a=getMaskSet().validPositions;for(var n in a)a[n].match&&null!=a[n].match.fn&&t.push(a[n].input);var i=0===t.length?"":(k?t.reverse():t).join("");if(F.isFunction(N.onUnMask)){var r=(k?getBuffer().slice().reverse():getBuffer()).join("");i=N.onUnMask.call(u,r,i,N)}return i}function caret(e,t,a,n){function translatePosition(e){return!k||"number"!=typeof e||N.greedy&&""===N.placeholder||!l||(e=l.inputmask._valueGet().length-e),e}var i;if(t===V)return"selectionStart"in e?(t=e.selectionStart,a=e.selectionEnd):M.getSelection?(i=M.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode!==e&&i.commonAncestorContainer!==e||(t=i.startOffset,a=i.endOffset):S.selection&&S.selection.createRange&&(i=S.selection.createRange(),t=0-i.duplicate().moveStart("character",-e.inputmask._valueGet().length),a=t+i.text.length),{begin:n?t:translatePosition(t),end:n?a:translatePosition(a)};if(F.isArray(t)&&(a=k?t[0]:t[1],t=k?t[1]:t[0]),t.begin!==V&&(a=k?t.begin:t.end,t=k?t.end:t.begin),"number"==typeof t){t=n?t:translatePosition(t),a="number"==typeof(a=n?a:translatePosition(a))?a:t;var r=parseInt(((e.ownerDocument.defaultView||M).getComputedStyle?(e.ownerDocument.defaultView||M).getComputedStyle(e,null):e.currentStyle).fontSize)*a;if(e.scrollLeft=r>e.scrollWidth?r:0,e.inputmask.caretPos={begin:t,end:a},e===S.activeElement){if("selectionStart"in e)e.selectionStart=t,e.selectionEnd=a;else if(M.getSelection){if(i=S.createRange(),e.firstChild===V||null===e.firstChild){var o=S.createTextNode("");e.appendChild(o)}i.setStart(e.firstChild,t<e.inputmask._valueGet().length?t:e.inputmask._valueGet().length),i.setEnd(e.firstChild,a<e.inputmask._valueGet().length?a:e.inputmask._valueGet().length),i.collapse(!0);var s=M.getSelection();s.removeAllRanges(),s.addRange(i)}else e.createTextRange&&((i=e.createTextRange()).collapse(!0),i.moveEnd("character",a),i.moveStart("character",t),i.select());renderColorMask(e,{begin:t,end:a})}}}function determineLastRequiredPosition(e){var t,a,n=getMaskTemplate(!0,getLastValidPosition(),!0,!0),i=n.length,r=getLastValidPosition(),o={},s=getMaskSet().validPositions[r],l=s!==V?s.locator.slice():V;for(t=r+1;t<n.length;t++)a=getTestTemplate(t,l,t-1),l=a.locator.slice(),o[t]=F.extend(!0,{},a);var u=s&&s.alternation!==V?s.locator[s.alternation]:V;for(t=i-1;r<t&&((a=o[t]).match.optionality||a.match.optionalQuantifier&&a.match.newBlockMarker||u&&(u!==o[t].locator[s.alternation]&&null!=a.match.fn||null===a.match.fn&&a.locator[s.alternation]&&checkAlternationMatch(a.locator[s.alternation].toString().split(","),u.toString().split(","))&&""!==getTests(t)[0].def))&&n[t]===getPlaceholder(t,a.match);t--)i--;return e?{l:i,def:o[i]?o[i].match:V}:i}function clearOptionalTail(e){for(var t,a=getMaskTemplate(!(e.length=0),0,!0,V,!0);(t=a.shift())!==V;)e.push(t);return e}function isComplete(e){if(F.isFunction(N.isComplete))return N.isComplete(e,N);if("*"===N.repeat)return V;var t=!1,a=determineLastRequiredPosition(!0),n=seekPrevious(a.l);if(a.def===V||a.def.newBlockMarker||a.def.optionality||a.def.optionalQuantifier){t=!0;for(var i=0;i<=n;i++){var r=getTestTemplate(i).match;if(null!==r.fn&&getMaskSet().validPositions[i]===V&&!0!==r.optionality&&!0!==r.optionalQuantifier||null===r.fn&&e[i]!==getPlaceholder(i,r)){t=!1;break}}}return t}function handleRemove(e,t,a,n,i){if((N.numericInput||k)&&(t===Inputmask.keyCode.BACKSPACE?t=Inputmask.keyCode.DELETE:t===Inputmask.keyCode.DELETE&&(t=Inputmask.keyCode.BACKSPACE),k)){var r=a.end;a.end=a.begin,a.begin=r}if(t===Inputmask.keyCode.BACKSPACE&&a.end-a.begin<1?(a.begin=seekPrevious(a.begin),getMaskSet().validPositions[a.begin]!==V&&getMaskSet().validPositions[a.begin].input===N.groupSeparator&&a.begin--):t===Inputmask.keyCode.DELETE&&a.begin===a.end&&(a.end=isMask(a.end,!0)&&getMaskSet().validPositions[a.end]&&getMaskSet().validPositions[a.end].input!==N.radixPoint?a.end+1:seekNext(a.end)+1,getMaskSet().validPositions[a.begin]!==V&&getMaskSet().validPositions[a.begin].input===N.groupSeparator&&a.end++),revalidateMask(a),!0!==n&&!1!==N.keepStatic||null!==N.regex){var o=alternate(!0);if(o){var s=o.caret!==V?o.caret:o.pos?seekNext(o.pos.begin?o.pos.begin:o.pos):getLastValidPosition(-1,!0);(t!==Inputmask.keyCode.DELETE||a.begin>s)&&a.begin}}var l=getLastValidPosition(a.begin,!0);if(l<a.begin||-1===a.begin)getMaskSet().p=seekNext(l);else if(!0!==n&&(getMaskSet().p=a.begin,!0!==i))for(;getMaskSet().p<l&&getMaskSet().validPositions[getMaskSet().p]===V;)getMaskSet().p++}function initializeColorMask(u){var c=(u.ownerDocument.defaultView||M).getComputedStyle(u,null),e=S.createElement("div");e.style.width=c.width,e.style.textAlign=c.textAlign,f=S.createElement("div"),(u.inputmask.colorMask=f).className="im-colormask",u.parentNode.insertBefore(f,u),u.parentNode.removeChild(u),f.appendChild(u),f.appendChild(e),u.style.left=e.offsetLeft+"px",F(f).on("mouseleave",function(e){return v.mouseleaveEvent.call(u,[e])}),F(f).on("mouseenter",function(e){return v.mouseenterEvent.call(u,[e])}),F(f).on("click",function(e){return caret(u,function findCaretPos(e){var t,a=S.createElement("span");for(var n in c)isNaN(n)&&-1!==n.indexOf("font")&&(a.style[n]=c[n]);a.style.textTransform=c.textTransform,a.style.letterSpacing=c.letterSpacing,a.style.position="absolute",a.style.height="auto",a.style.width="auto",a.style.visibility="hidden",a.style.whiteSpace="nowrap",S.body.appendChild(a);var i,r=u.inputmask._valueGet(),o=0;for(t=0,i=r.length;t<=i;t++){if(a.innerHTML+=r.charAt(t)||"_",a.offsetWidth>=e){var s=e-o,l=a.offsetWidth-e;a.innerHTML=r.charAt(t),s-=a.offsetWidth/3,t=s<l?t-1:t;break}o=a.offsetWidth}return S.body.removeChild(a),t}(e.clientX)),v.clickEvent.call(u,[e])})}function renderColorMask(e,t,a){var n,i,r,o=[],s=!1,l=0;function setEntry(e){if(e===V&&(e=""),s||null!==n.fn&&i.input!==V)if(s&&(null!==n.fn&&i.input!==V||""===n.def)){s=!1;var t=o.length;o[t-1]=o[t-1]+"</span>",o.push(e)}else o.push(e);else s=!0,o.push("<span class='im-static'>"+e)}if(f!==V){var u=getBuffer();if(t===V?t=caret(e):t.begin===V&&(t={begin:t,end:t}),!0!==a){for(var c=getLastValidPosition();getMaskSet().validPositions[l]?(i=getMaskSet().validPositions[l],n=i.match,r=i.locator.slice(),setEntry(u[l])):(i=getTestTemplate(l,r,l-1),n=i.match,r=i.locator.slice(),!1===N.jitMasking||l<c||"number"==typeof N.jitMasking&&isFinite(N.jitMasking)&&N.jitMasking>l?setEntry(getPlaceholder(l,n)):s=!1),l++,(g===V||l<g)&&(null!==n.fn||""!==n.def)||l<c||s;);s&&setEntry(),function setCaret(){S.activeElement===e&&(o.splice(t.begin,0,t.begin===t.end||t.end>getMaskSet().maskLength?'<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">':'<mark class="im-caret-select">'),o.splice(t.end+1,0,"</mark>"))}()}var p=f.getElementsByTagName("div")[0];p.innerHTML=o.join(""),e.inputmask.positionColorMask(e,p)}}if(Inputmask.prototype.positionColorMask=function(e,t){e.style.left=t.offsetLeft+"px"},e!==V)switch(e.action){case"isComplete":return l=e.el,isComplete(getBuffer());case"unmaskedvalue":return l!==V&&e.value===V||(a=e.value,a=(F.isFunction(N.onBeforeMask)&&N.onBeforeMask.call(u,a,N)||a).split(""),checkVal.call(this,V,!1,!1,a),F.isFunction(N.onBeforeWrite)&&N.onBeforeWrite.call(u,V,getBuffer(),0,N)),unmaskedvalue(l);case"mask":!function mask(e){function isElementTypeSupported(e,r){function patchValueProperty(e){var t,a,n;function patchValhook(e){if(F.valHooks&&(F.valHooks[e]===V||!0!==F.valHooks[e].inputmaskpatch)){var a=F.valHooks[e]&&F.valHooks[e].get?F.valHooks[e].get:function(e){return e.value},i=F.valHooks[e]&&F.valHooks[e].set?F.valHooks[e].set:function(e,t){return e.value=t,e};F.valHooks[e]={get:function get(e){if(e.inputmask){if(e.inputmask.opts.autoUnmask)return e.inputmask.unmaskedvalue();var t=a(e);return-1!==getLastValidPosition(V,V,e.inputmask.maskset.validPositions)||!0!==r.nullable?t:""}return a(e)},set:function set(e,t){var a,n=F(e);return a=i(e,t),e.inputmask&&n.trigger("setvalue",[t]),a},inputmaskpatch:!0}}}function getter(){return this.inputmask?this.inputmask.opts.autoUnmask?this.inputmask.unmaskedvalue():-1!==getLastValidPosition()||!0!==r.nullable?S.activeElement===this&&r.clearMaskOnLostFocus?(k?clearOptionalTail(getBuffer().slice()).reverse():clearOptionalTail(getBuffer().slice())).join(""):t.call(this):"":t.call(this)}function setter(e){a.call(this,e),this.inputmask&&F(this).trigger("setvalue",[e])}if(!e.inputmask.__valueGet){if(!0!==r.noValuePatching){if(Object.getOwnPropertyDescriptor){"function"!=typeof Object.getPrototypeOf&&(Object.getPrototypeOf="object"===T("test".__proto__)?function(e){return e.__proto__}:function(e){return e.constructor.prototype});var i=Object.getPrototypeOf?Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e),"value"):V;i&&i.get&&i.set?(t=i.get,a=i.set,Object.defineProperty(e,"value",{get:getter,set:setter,configurable:!0})):"INPUT"!==e.tagName&&(t=function valueGet(){return this.textContent},a=function valueSet(e){this.textContent=e},Object.defineProperty(e,"value",{get:getter,set:setter,configurable:!0}))}else S.__lookupGetter__&&e.__lookupGetter__("value")&&(t=e.__lookupGetter__("value"),a=e.__lookupSetter__("value"),e.__defineGetter__("value",getter),e.__defineSetter__("value",setter));e.inputmask.__valueGet=t,e.inputmask.__valueSet=a}e.inputmask._valueGet=function(e){return k&&!0!==e?t.call(this.el).split("").reverse().join(""):t.call(this.el)},e.inputmask._valueSet=function(e,t){a.call(this.el,null===e||e===V?"":!0!==t&&k?e.split("").reverse().join(""):e)},t===V&&(t=function valueGet(){return this.value},a=function valueSet(e){this.value=e},patchValhook(e.type),n=e,s.on(n,"mouseenter",function(e){var t=F(this),a=this.inputmask._valueGet();a!==getBuffer().join("")&&t.trigger("setvalue")}))}}var t=e.getAttribute("type"),a="INPUT"===e.tagName&&-1!==F.inArray(t,r.supportsInputType)||e.isContentEditable||"TEXTAREA"===e.tagName;if(!a)if("INPUT"===e.tagName){var n=S.createElement("input");n.setAttribute("type",t),a="text"===n.type,n=null}else a="partial";return!1!==a?patchValueProperty(e):e.inputmask=V,a}s.off(e);var t=isElementTypeSupported(e,N);if(!1!==t&&(i=F(l=e),r=l.placeholder,-1===(g=l!==V?l.maxLength:V)&&(g=V),!0===N.colorMask&&initializeColorMask(l),P&&("inputmode"in l&&(l.inputmode=N.inputmode,l.setAttribute("inputmode",N.inputmode)),!0===N.disablePredictiveText&&("autocorrect"in l?l.autocorrect=!1:(!0!==N.colorMask&&initializeColorMask(l),l.type="password"))),!0===t&&(l.setAttribute("im-insert",N.insertMode),s.on(l,"submit",v.submitEvent),s.on(l,"reset",v.resetEvent),s.on(l,"blur",v.blurEvent),s.on(l,"focus",v.focusEvent),!0!==N.colorMask&&(s.on(l,"click",v.clickEvent),s.on(l,"mouseleave",v.mouseleaveEvent),s.on(l,"mouseenter",v.mouseenterEvent)),s.on(l,"paste",v.pasteEvent),s.on(l,"cut",v.cutEvent),s.on(l,"complete",N.oncomplete),s.on(l,"incomplete",N.onincomplete),s.on(l,"cleared",N.oncleared),P||!0===N.inputEventOnly?l.removeAttribute("maxLength"):(s.on(l,"keydown",v.keydownEvent),s.on(l,"keypress",v.keypressEvent)),s.on(l,"input",v.inputFallBackEvent),s.on(l,"beforeinput",v.beforeInputEvent)),s.on(l,"setvalue",v.setValueEvent),m=getBufferTemplate().join(""),""!==l.inputmask._valueGet(!0)||!1===N.clearMaskOnLostFocus||S.activeElement===l)){var a=F.isFunction(N.onBeforeMask)&&N.onBeforeMask.call(u,l.inputmask._valueGet(!0),N)||l.inputmask._valueGet(!0);""!==a&&checkVal(l,!0,!1,a.split(""));var n=getBuffer().slice();m=n.join(""),!1===isComplete(n)&&N.clearIncomplete&&resetMaskSet(),N.clearMaskOnLostFocus&&S.activeElement!==l&&(-1===getLastValidPosition()?n=[]:clearOptionalTail(n)),(!1===N.clearMaskOnLostFocus||N.showMaskOnFocus&&S.activeElement===l||""!==l.inputmask._valueGet(!0))&&writeBuffer(l,n),S.activeElement===l&&caret(l,seekNext(getLastValidPosition()))}}(l);break;case"format":return a=(F.isFunction(N.onBeforeMask)&&N.onBeforeMask.call(u,e.value,N)||e.value).split(""),checkVal.call(this,V,!0,!1,a),e.metadata?{value:k?getBuffer().slice().reverse().join(""):getBuffer().join(""),metadata:maskScope.call(this,{action:"getmetadata"},t,N)}:k?getBuffer().slice().reverse().join(""):getBuffer().join("");case"isValid":e.value?(a=e.value.split(""),checkVal.call(this,V,!0,!0,a)):e.value=getBuffer().join("");for(var p=getBuffer(),d=determineLastRequiredPosition(),y=p.length-1;d<y&&!isMask(y);y--);return p.splice(d,y+1-d),isComplete(p)&&e.value===getBuffer().join("");case"getemptymask":return getBufferTemplate().join("");case"remove":return l&&l.inputmask&&(F.data(l,"_inputmask_opts",null),i=F(l),l.inputmask._valueSet(N.autoUnmask?unmaskedvalue(l):l.inputmask._valueGet(!0)),s.off(l),l.inputmask.colorMask&&((f=l.inputmask.colorMask).removeChild(l),f.parentNode.insertBefore(l,f),f.parentNode.removeChild(f)),Object.getOwnPropertyDescriptor&&Object.getPrototypeOf?Object.getOwnPropertyDescriptor(Object.getPrototypeOf(l),"value")&&l.inputmask.__valueGet&&Object.defineProperty(l,"value",{get:l.inputmask.__valueGet,set:l.inputmask.__valueSet,configurable:!0}):S.__lookupGetter__&&l.__lookupGetter__("value")&&l.inputmask.__valueGet&&(l.__defineGetter__("value",l.inputmask.__valueGet),l.__defineSetter__("value",l.inputmask.__valueSet)),l.inputmask=V),l;case"getmetadata":if(F.isArray(t.metadata)){var b=getMaskTemplate(!0,0,!1).join("");return F.each(t.metadata,function(e,t){if(t.mask===b)return b=t,!1}),b}return t.metadata}}return Inputmask.prototype={dataAttribute:"data-inputmask",defaults:{placeholder:"_",optionalmarker:["[","]"],quantifiermarker:["{","}"],groupmarker:["(",")"],alternatormarker:"|",escapeChar:"\\",mask:null,regex:null,oncomplete:F.noop,onincomplete:F.noop,oncleared:F.noop,repeat:0,greedy:!1,autoUnmask:!1,removeMaskOnSubmit:!1,clearMaskOnLostFocus:!0,insertMode:!0,clearIncomplete:!1,alias:null,onKeyDown:F.noop,onBeforeMask:null,onBeforePaste:function onBeforePaste(e,t){return F.isFunction(t.onBeforeMask)?t.onBeforeMask.call(this,e,t):e},onBeforeWrite:null,onUnMask:null,showMaskOnFocus:!0,showMaskOnHover:!0,onKeyValidation:F.noop,skipOptionalPartCharacter:" ",numericInput:!1,rightAlign:!1,undoOnEscape:!0,radixPoint:"",_radixDance:!1,groupSeparator:"",keepStatic:null,positionCaretOnTab:!0,tabThrough:!1,supportsInputType:["text","tel","password","search"],ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123,0,229],isComplete:null,preValidation:null,postValidation:null,staticDefinitionSymbol:V,jitMasking:!1,nullable:!0,inputEventOnly:!1,noValuePatching:!1,positionCaretOnClick:"lvp",casing:null,inputmode:"verbatim",colorMask:!1,disablePredictiveText:!1,importDataAttributes:!0,shiftPositions:!0},definitions:{9:{validator:"[0-9\uff11-\uff19]",definitionSymbol:"*"},a:{validator:"[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",definitionSymbol:"*"},"*":{validator:"[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]"}},aliases:{},masksCache:{},mask:function mask(e){var i=this;return"string"==typeof e&&(e=S.getElementById(e)||S.querySelectorAll(e)),e=e.nodeName?[e]:e,F.each(e,function(e,t){var a=F.extend(!0,{},i.opts);if(function importAttributeOptions(a,e,n,i){if(!0===e.importDataAttributes){var t,r,o,s,l=function importOption(e,t){null!==(t=t!==V?t:a.getAttribute(i+"-"+e))&&("string"==typeof t&&(0===e.indexOf("on")?t=M[t]:"false"===t?t=!1:"true"===t&&(t=!0)),n[e]=t)},u=a.getAttribute(i);if(u&&""!==u&&(u=u.replace(/'/g,'"'),r=JSON.parse("{"+u+"}")),r)for(s in o=V,r)if("alias"===s.toLowerCase()){o=r[s];break}for(t in l("alias",o),n.alias&&resolveAlias(n.alias,n,e),e){if(r)for(s in o=V,r)if(s.toLowerCase()===t.toLowerCase()){o=r[s];break}l(t,o)}}return F.extend(!0,e,n),("rtl"===a.dir||e.rightAlign)&&(a.style.textAlign="right"),("rtl"===a.dir||e.numericInput)&&(a.dir="ltr",a.removeAttribute("dir"),e.isRTL=!0),Object.keys(n).length}(t,a,F.extend(!0,{},i.userOptions),i.dataAttribute)){var n=generateMaskSet(a,i.noMasksCache);n!==V&&(t.inputmask!==V&&(t.inputmask.opts.autoUnmask=!0,t.inputmask.remove()),t.inputmask=new Inputmask(V,V,!0),t.inputmask.opts=a,t.inputmask.noMasksCache=i.noMasksCache,t.inputmask.userOptions=F.extend(!0,{},i.userOptions),t.inputmask.isRTL=a.isRTL||a.numericInput,(t.inputmask.el=t).inputmask.maskset=n,F.data(t,"_inputmask_opts",a),maskScope.call(t.inputmask,{action:"mask"}))}}),e&&e[0]&&e[0].inputmask||this},option:function option(e,t){return"string"==typeof e?this.opts[e]:"object"===(void 0===e?"undefined":T(e))?(F.extend(this.userOptions,e),this.el&&!0!==t&&this.mask(this.el),this):void 0},unmaskedvalue:function unmaskedvalue(e){return this.maskset=this.maskset||generateMaskSet(this.opts,this.noMasksCache),maskScope.call(this,{action:"unmaskedvalue",value:e})},remove:function remove(){return maskScope.call(this,{action:"remove"})},getemptymask:function getemptymask(){return this.maskset=this.maskset||generateMaskSet(this.opts,this.noMasksCache),maskScope.call(this,{action:"getemptymask"})},hasMaskedValue:function hasMaskedValue(){return!this.opts.autoUnmask},isComplete:function isComplete(){return this.maskset=this.maskset||generateMaskSet(this.opts,this.noMasksCache),maskScope.call(this,{action:"isComplete"})},getmetadata:function getmetadata(){return this.maskset=this.maskset||generateMaskSet(this.opts,this.noMasksCache),maskScope.call(this,{action:"getmetadata"})},isValid:function isValid(e){return this.maskset=this.maskset||generateMaskSet(this.opts,this.noMasksCache),maskScope.call(this,{action:"isValid",value:e})},format:function format(e,t){return this.maskset=this.maskset||generateMaskSet(this.opts,this.noMasksCache),maskScope.call(this,{action:"format",value:e,metadata:t})},setValue:function setValue(e){this.el&&F(this.el).trigger("setvalue",[e])},analyseMask:function analyseMask(e,r,o){var t,a,n,i,s,l,u=/(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?(?:\|[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,c=/\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,p=!1,f=new MaskToken,d=[],g=[];function MaskToken(e,t,a,n){this.matches=[],this.openGroup=e||!1,this.alternatorGroup=!1,this.isGroup=e||!1,this.isOptional=t||!1,this.isQuantifier=a||!1,this.isAlternator=n||!1,this.quantifier={min:1,max:1}}function insertTestDefinition(a,e,n){n=n!==V?n:a.matches.length;var i=a.matches[n-1];if(r)0===e.indexOf("[")||p&&/\\d|\\s|\\w]/i.test(e)||"."===e?a.matches.splice(n++,0,{fn:new RegExp(e,o.casing?"i":""),optionality:!1,newBlockMarker:i===V?"master":i.def!==e,casing:null,def:e,placeholder:V,nativeDef:e}):(p&&(e=e[e.length-1]),F.each(e.split(""),function(e,t){i=a.matches[n-1],a.matches.splice(n++,0,{fn:null,optionality:!1,newBlockMarker:i===V?"master":i.def!==t&&null!==i.fn,casing:null,def:o.staticDefinitionSymbol||t,placeholder:o.staticDefinitionSymbol!==V?t:V,nativeDef:(p?"'":"")+t})})),p=!1;else{var t=(o.definitions?o.definitions[e]:V)||Inputmask.prototype.definitions[e];t&&!p?a.matches.splice(n++,0,{fn:t.validator?"string"==typeof t.validator?new RegExp(t.validator,o.casing?"i":""):new function(){this.test=t.validator}:new RegExp("."),optionality:!1,newBlockMarker:i===V?"master":i.def!==(t.definitionSymbol||e),casing:t.casing,def:t.definitionSymbol||e,placeholder:t.placeholder,nativeDef:e}):(a.matches.splice(n++,0,{fn:null,optionality:!1,newBlockMarker:i===V?"master":i.def!==e&&null!==i.fn,casing:null,def:o.staticDefinitionSymbol||e,placeholder:o.staticDefinitionSymbol!==V?e:V,nativeDef:(p?"'":"")+e}),p=!1)}}function defaultCase(){if(0<d.length){if(insertTestDefinition(i=d[d.length-1],a),i.isAlternator){s=d.pop();for(var e=0;e<s.matches.length;e++)s.matches[e].isGroup&&(s.matches[e].isGroup=!1);0<d.length?(i=d[d.length-1]).matches.push(s):f.matches.push(s)}}else insertTestDefinition(f,a)}function groupify(e){var t=new MaskToken(!0);return t.openGroup=!1,t.matches=e,t}for(r&&(o.optionalmarker[0]=V,o.optionalmarker[1]=V);t=r?c.exec(e):u.exec(e);){if(a=t[0],r)switch(a.charAt(0)){case"?":a="{0,1}";break;case"+":case"*":a="{"+a+"}"}if(p)defaultCase();else switch(a.charAt(0)){case"(?=":case"(?!":case"(?<=":case"(?<!":break;case o.escapeChar:p=!0,r&&defaultCase();break;case o.optionalmarker[1]:case o.groupmarker[1]:if((n=d.pop()).openGroup=!1,n!==V)if(0<d.length){if((i=d[d.length-1]).matches.push(n),i.isAlternator){s=d.pop();for(var m=0;m<s.matches.length;m++)s.matches[m].isGroup=!1,s.matches[m].alternatorGroup=!1;0<d.length?(i=d[d.length-1]).matches.push(s):f.matches.push(s)}}else f.matches.push(n);else defaultCase();break;case o.optionalmarker[0]:d.push(new MaskToken(!1,!0));break;case o.groupmarker[0]:d.push(new MaskToken(!0));break;case o.quantifiermarker[0]:var k=new MaskToken(!1,!1,!0),h=(a=a.replace(/[{}]/g,"")).split("|"),v=h[0].split(","),y=isNaN(v[0])?v[0]:parseInt(v[0]),b=1===v.length?y:isNaN(v[1])?v[1]:parseInt(v[1]);"*"!==y&&"+"!==y||(y="*"===b?0:1),k.quantifier={min:y,max:b,jit:h[1]};var M=0<d.length?d[d.length-1].matches:f.matches;if((t=M.pop()).isAlternator){M.push(t),M=t.matches;var S=new MaskToken(!0),x=M.pop();M.push(S),M=S.matches,t=x}t.isGroup||(t=groupify([t])),M.push(t),M.push(k);break;case o.alternatormarker:var P=function groupQuantifier(e){var t=e.pop();return t.isQuantifier&&(t=groupify([e.pop(),t])),t};if(0<d.length){var _=(i=d[d.length-1]).matches[i.matches.length-1];l=i.openGroup&&(_.matches===V||!1===_.isGroup&&!1===_.isAlternator)?d.pop():P(i.matches)}else l=P(f.matches);if(l.isAlternator)d.push(l);else if(l.alternatorGroup?(s=d.pop(),l.alternatorGroup=!1):s=new MaskToken(!1,!1,!1,!0),s.matches.push(l),d.push(s),l.openGroup){var E=new MaskToken(!(l.openGroup=!1));E.alternatorGroup=!0,d.push(E)}break;default:defaultCase()}}for(;0<d.length;)n=d.pop(),f.matches.push(n);return 0<f.matches.length&&(function verifyGroupMarker(n){n&&n.matches&&F.each(n.matches,function(e,t){var a=n.matches[e+1];(a===V||a.matches===V||!1===a.isQuantifier)&&t&&t.isGroup&&(t.isGroup=!1,r||(insertTestDefinition(t,o.groupmarker[0],0),!0!==t.openGroup&&insertTestDefinition(t,o.groupmarker[1]))),verifyGroupMarker(t)})}(f),g.push(f)),(o.numericInput||o.isRTL)&&function reverseTokens(e){for(var t in e.matches=e.matches.reverse(),e.matches)if(e.matches.hasOwnProperty(t)){var a=parseInt(t);if(e.matches[t].isQuantifier&&e.matches[a+1]&&e.matches[a+1].isGroup){var n=e.matches[t];e.matches.splice(t,1),e.matches.splice(a+1,0,n)}e.matches[t].matches!==V?e.matches[t]=reverseTokens(e.matches[t]):e.matches[t]=((i=e.matches[t])===o.optionalmarker[0]?i=o.optionalmarker[1]:i===o.optionalmarker[1]?i=o.optionalmarker[0]:i===o.groupmarker[0]?i=o.groupmarker[1]:i===o.groupmarker[1]&&(i=o.groupmarker[0]),i)}var i;return e}(g[0]),g}},Inputmask.extendDefaults=function(e){F.extend(!0,Inputmask.prototype.defaults,e)},Inputmask.extendDefinitions=function(e){F.extend(!0,Inputmask.prototype.definitions,e)},Inputmask.extendAliases=function(e){F.extend(!0,Inputmask.prototype.aliases,e)},Inputmask.format=function(e,t,a){return Inputmask(t).format(e,a)},Inputmask.unmask=function(e,t){return Inputmask(t).unmaskedvalue(e)},Inputmask.isValid=function(e,t){return Inputmask(t).isValid(e)},Inputmask.remove=function(e){"string"==typeof e&&(e=S.getElementById(e)||S.querySelectorAll(e)),e=e.nodeName?[e]:e,F.each(e,function(e,t){t.inputmask&&t.inputmask.remove()})},Inputmask.setValue=function(e,a){"string"==typeof e&&(e=S.getElementById(e)||S.querySelectorAll(e)),e=e.nodeName?[e]:e,F.each(e,function(e,t){t.inputmask?t.inputmask.setValue(a):F(t).trigger("setvalue",[a])})},Inputmask.escapeRegex=function(e){return e.replace(new RegExp("(\\"+["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^"].join("|\\")+")","gim"),"\\$1")},Inputmask.keyCode={BACKSPACE:8,BACKSPACE_SAFARI:127,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,RIGHT:39,SPACE:32,TAB:9,UP:38,X:88,CONTROL:17},Inputmask.dependencyLib=F,M.Inputmask=Inputmask}(a(3),a(4))},function(e,t,a){"use strict";var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n=a(4),f=n.document;function isWindow(e){return null!=e&&e===e.window}function isValidElement(e){return e instanceof Element}function DependencyLib(e){return e instanceof DependencyLib?e:this instanceof DependencyLib?void(null!=e&&e!==n&&(this[0]=e.nodeName?e:void 0!==e[0]&&e[0].nodeName?e[0]:f.querySelector(e),void 0!==this[0]&&null!==this[0]&&(this[0].eventRegistry=this[0].eventRegistry||{}))):new DependencyLib(e)}DependencyLib.prototype={on:function on(e,a){if(isValidElement(this[0]))for(var t=function addEvent(e,t){i.addEventListener?i.addEventListener(e,a,!1):i.attachEvent&&i.attachEvent("on"+e,a),n[e]=n[e]||{},n[e][t]=n[e][t]||[],n[e][t].push(a)},n=this[0].eventRegistry,i=this[0],r=e.split(" "),o=0;o<r.length;o++){var s=r[o].split(".");t(s[0],s[1]||"global")}return this},off:function off(e,s){if(isValidElement(this[0]))for(var t=function removeEvent(e,t,a){if(e in l==!0)if(i.removeEventListener?i.removeEventListener(e,a,!1):i.detachEvent&&i.detachEvent("on"+e,a),"global"===t)for(var n in l[e])l[e][n].splice(l[e][n].indexOf(a),1);else l[e][t].splice(l[e][t].indexOf(a),1)},a=function resolveNamespace(e,t){var a,n,i=[];if(0<e.length)if(void 0===s)for(a=0,n=l[e][t].length;a<n;a++)i.push({ev:e,namespace:t&&0<t.length?t:"global",handler:l[e][t][a]});else i.push({ev:e,namespace:t&&0<t.length?t:"global",handler:s});else if(0<t.length)for(var r in l)for(var o in l[r])if(o===t)if(void 0===s)for(a=0,n=l[r][o].length;a<n;a++)i.push({ev:r,namespace:o,handler:l[r][o][a]});else i.push({ev:r,namespace:o,handler:s});return i},l=this[0].eventRegistry,i=this[0],n=e.split(" "),r=0;r<n.length;r++)for(var o=n[r].split("."),u=a(o[0],o[1]),c=0,p=u.length;c<p;c++)t(u[c].ev,u[c].namespace,u[c].handler);return this},trigger:function trigger(e){if(isValidElement(this[0]))for(var t=this[0].eventRegistry,a=this[0],n="string"==typeof e?e.split(" "):[e.type],i=0;i<n.length;i++){var r=n[i].split("."),o=r[0],s=r[1]||"global";if(void 0!==f&&"global"===s){var l,u,c={bubbles:!0,cancelable:!0,detail:arguments[1]};if(f.createEvent){try{l=new CustomEvent(o,c)}catch(e){(l=f.createEvent("CustomEvent")).initCustomEvent(o,c.bubbles,c.cancelable,c.detail)}e.type&&DependencyLib.extend(l,e),a.dispatchEvent(l)}else(l=f.createEventObject()).eventType=o,l.detail=arguments[1],e.type&&DependencyLib.extend(l,e),a.fireEvent("on"+l.eventType,l)}else if(void 0!==t[o])if(e=e.type?e:DependencyLib.Event(e),"global"===s)for(var p in t[o])for(u=0;u<t[o][p].length;u++)t[o][p][u].apply(a,arguments);else for(u=0;u<t[o][s].length;u++)t[o][s][u].apply(a,arguments)}return this}},DependencyLib.isFunction=function(e){return"function"==typeof e},DependencyLib.noop=function(){},DependencyLib.isArray=Array.isArray,DependencyLib.inArray=function(e,t,a){return null==t?-1:function indexOf(e,t){for(var a=0,n=e.length;a<n;a++)if(e[a]===t)return a;return-1}(t,e)},DependencyLib.valHooks=void 0,DependencyLib.isPlainObject=function(e){return"object"===(void 0===e?"undefined":c(e))&&!e.nodeType&&!isWindow(e)&&!(e.constructor&&!Object.hasOwnProperty.call(e.constructor.prototype,"isPrototypeOf"))},DependencyLib.extend=function(){var e,t,a,n,i,r,o=arguments[0]||{},s=1,l=arguments.length,u=!1;for("boolean"==typeof o&&(u=o,o=arguments[s]||{},s++),"object"===(void 0===o?"undefined":c(o))||DependencyLib.isFunction(o)||(o={}),s===l&&(o=this,s--);s<l;s++)if(null!=(e=arguments[s]))for(t in e)a=o[t],o!==(n=e[t])&&(u&&n&&(DependencyLib.isPlainObject(n)||(i=DependencyLib.isArray(n)))?(r=i?(i=!1,a&&DependencyLib.isArray(a)?a:[]):a&&DependencyLib.isPlainObject(a)?a:{},o[t]=DependencyLib.extend(u,r,n)):void 0!==n&&(o[t]=n));return o},DependencyLib.each=function(e,t){var a=0;if(function isArraylike(e){var t="length"in e&&e.length,a=void 0===e?"undefined":c(e);return"function"!==a&&!isWindow(e)&&(!(1!==e.nodeType||!t)||"array"===a||0===t||"number"==typeof t&&0<t&&t-1 in e)}(e))for(var n=e.length;a<n&&!1!==t.call(e[a],a,e[a]);a++);else for(a in e)if(!1===t.call(e[a],a,e[a]))break;return e},DependencyLib.data=function(e,t,a){if(void 0===a)return e.__data?e.__data[t]:null;e.__data=e.__data||{},e.__data[t]=a},"function"==typeof n.CustomEvent?DependencyLib.Event=n.CustomEvent:(DependencyLib.Event=function(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var a=f.createEvent("CustomEvent");return a.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),a}).prototype=n.Event.prototype,e.exports=DependencyLib},function(module,exports,__webpack_require__){"use strict";var __WEBPACK_AMD_DEFINE_RESULT__,_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};__WEBPACK_AMD_DEFINE_RESULT__=function(){return"undefined"!=typeof window?window:new(eval("require('jsdom').JSDOM"))("").window}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)},function(e,t,a){"use strict";var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=a(2),l=s.dependencyLib,c={d:["[1-9]|[12][0-9]|3[01]",Date.prototype.setDate,"day",Date.prototype.getDate],dd:["0[1-9]|[12][0-9]|3[01]",Date.prototype.setDate,"day",function(){return pad(Date.prototype.getDate.call(this),2)}],ddd:[""],dddd:[""],m:["[1-9]|1[012]",Date.prototype.setMonth,"month",function(){return Date.prototype.getMonth.call(this)+1}],mm:["0[1-9]|1[012]",Date.prototype.setMonth,"month",function(){return pad(Date.prototype.getMonth.call(this)+1,2)}],mmm:[""],mmmm:[""],yy:["[0-9]{2}",Date.prototype.setFullYear,"year",function(){return pad(Date.prototype.getFullYear.call(this),2)}],yyyy:["[0-9]{4}",Date.prototype.setFullYear,"year",function(){return pad(Date.prototype.getFullYear.call(this),4)}],h:["[1-9]|1[0-2]",Date.prototype.setHours,"hours",Date.prototype.getHours],hh:["0[1-9]|1[0-2]",Date.prototype.setHours,"hours",function(){return pad(Date.prototype.getHours.call(this),2)}],hhh:["[0-9]+",Date.prototype.setHours,"hours",Date.prototype.getHours],H:["1?[0-9]|2[0-3]",Date.prototype.setHours,"hours",Date.prototype.getHours],HH:["[01][0-9]|2[0-3]",Date.prototype.setHours,"hours",function(){return pad(Date.prototype.getHours.call(this),2)}],HHH:["[0-9]+",Date.prototype.setHours,"hours",Date.prototype.getHours],M:["[1-5]?[0-9]",Date.prototype.setMinutes,"minutes",Date.prototype.getMinutes],MM:["[0-5][0-9]",Date.prototype.setMinutes,"minutes",function(){return pad(Date.prototype.getMinutes.call(this),2)}],s:["[1-5]?[0-9]",Date.prototype.setSeconds,"seconds",Date.prototype.getSeconds],ss:["[0-5][0-9]",Date.prototype.setSeconds,"seconds",function(){return pad(Date.prototype.getSeconds.call(this),2)}],l:["[0-9]{3}",Date.prototype.setMilliseconds,"milliseconds",function(){return pad(Date.prototype.getMilliseconds.call(this),3)}],L:["[0-9]{2}",Date.prototype.setMilliseconds,"milliseconds",function(){return pad(Date.prototype.getMilliseconds.call(this),2)}],t:["[ap]"],tt:["[ap]m"],T:["[AP]"],TT:["[AP]M"],Z:[""],o:[""],S:[""]},n={isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};function getTokenizer(e){if(!e.tokenizer){var t=[];for(var a in c)-1===t.indexOf(a[0])&&t.push(a[0]);e.tokenizer="("+t.join("+|")+")+?|.",e.tokenizer=new RegExp(e.tokenizer,"g")}return e.tokenizer}function parse(e,t,a,n){for(var i,r="";i=getTokenizer(a).exec(e);){if(void 0===t)if(c[i[0]])r+="("+c[i[0]][0]+")";else switch(i[0]){case"[":r+="(";break;case"]":r+=")?";break;default:r+=s.escapeRegex(i[0])}else if(c[i[0]])if(!0!==n&&c[i[0]][3])r+=c[i[0]][3].call(t.date);else c[i[0]][2]?r+=t["raw"+c[i[0]][2]]:r+=i[0];else r+=i[0]}return r}function pad(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}function analyseMask(e,t,r){var o,a,n,i={date:new Date(1,0,1)},s=e;function setValue(e,t,a){e[o]=function extendProperty(e){var t=e.replace(/[^0-9]/g,"0");if(t!=e){var a=e.replace(/[^0-9]/g,""),n=(r.min&&r.min[o]||e).toString(),i=(r.max&&r.max[o]||e).toString();t=a+(a<n.slice(0,a.length)?n.slice(a.length):a>i.slice(0,a.length)?i.slice(a.length):t.toString().slice(a.length))}return t}(t),e["raw"+o]=t,void 0!==n&&n.call(e.date,"month"==o?parseInt(e[o])-1:e[o])}if("string"==typeof s){for(;a=getTokenizer(r).exec(t);){var l=s.slice(0,a[0].length);c.hasOwnProperty(a[0])&&(c[a[0]][0],o=c[a[0]][2],n=c[a[0]][1],setValue(i,l)),s=s.slice(l.length)}return i}if(s&&"object"===(void 0===s?"undefined":u(s))&&s.hasOwnProperty("date"))return s}s.extendAliases({datetime:{mask:function mask(e){return c.S=e.i18n.ordinalSuffix.join("|"),e.inputFormat=n[e.inputFormat]||e.inputFormat,e.displayFormat=n[e.displayFormat]||e.displayFormat||e.inputFormat,e.outputFormat=n[e.outputFormat]||e.outputFormat||e.inputFormat,e.placeholder=""!==e.placeholder?e.placeholder:e.inputFormat.replace(/[\[\]]/,""),e.regex=parse(e.inputFormat,void 0,e),null},placeholder:"",inputFormat:"isoDateTime",displayFormat:void 0,outputFormat:void 0,min:null,max:null,i18n:{dayNames:["Mon","Tue","Wed","Thu","Fri","Sat","Sun","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],ordinalSuffix:["st","nd","rd","th"]},postValidation:function postValidation(e,t,a,n){n.min=analyseMask(n.min,n.inputFormat,n),n.max=analyseMask(n.max,n.inputFormat,n);var i=a,r=analyseMask(e.join(""),n.inputFormat,n);return i&&r.date.getTime()==r.date.getTime()&&(i=(i=function isValidDate(e,t){return(!isFinite(e.rawday)||"29"==e.day&&!isFinite(e.rawyear)||new Date(e.date.getFullYear(),isFinite(e.rawmonth)?e.month:e.date.getMonth()+1,0).getDate()>=e.day)&&t}(r,i))&&function isDateInRange(e,t){var a=!0;if(t.min){if(e.rawyear){var n=e.rawyear.replace(/[^0-9]/g,"");a=t.min.year.substr(0,n.length)<=n}e.year===e.rawyear&&t.min.date.getTime()==t.min.date.getTime()&&(a=t.min.date.getTime()<=e.date.getTime())}return a&&t.max&&t.max.date.getTime()==t.max.date.getTime()&&(a=t.max.date.getTime()>=e.date.getTime()),a}(r,n)),t&&i&&a.pos!==t?{buffer:parse(n.inputFormat,r,n),refreshFromBuffer:{start:t,end:a.pos}}:i},onKeyDown:function onKeyDown(e,t,a,n){if(e.ctrlKey&&e.keyCode===s.keyCode.RIGHT){for(var i,r=new Date,o="";i=getTokenizer(n).exec(n.inputFormat);)"d"===i[0].charAt(0)?o+=pad(r.getDate(),i[0].length):"m"===i[0].charAt(0)?o+=pad(r.getMonth()+1,i[0].length):"yyyy"===i[0]?o+=r.getFullYear().toString():"y"===i[0].charAt(0)&&(o+=pad(r.getYear(),i[0].length));this.inputmask._valueSet(o),l(this).trigger("setvalue")}},onUnMask:function onUnMask(e,t,a){return parse(a.outputFormat,analyseMask(e,a.inputFormat,a),a,!0)},casing:function casing(e,t,a,n){return 0==t.nativeDef.indexOf("[ap]")?e.toLowerCase():0==t.nativeDef.indexOf("[AP]")?e.toUpperCase():e},insertMode:!1,shiftPositions:!1}}),e.exports=s},function(e,t,a){"use strict";var k=a(2),h=k.dependencyLib;function autoEscape(e,t){for(var a="",n=0;n<e.length;n++)k.prototype.definitions[e.charAt(n)]||t.definitions[e.charAt(n)]||t.optionalmarker.start===e.charAt(n)||t.optionalmarker.end===e.charAt(n)||t.quantifiermarker.start===e.charAt(n)||t.quantifiermarker.end===e.charAt(n)||t.groupmarker.start===e.charAt(n)||t.groupmarker.end===e.charAt(n)||t.alternatormarker===e.charAt(n)?a+="\\"+e.charAt(n):a+=e.charAt(n);return a}k.extendAliases({numeric:{mask:function mask(e){if(0!==e.repeat&&isNaN(e.integerDigits)&&(e.integerDigits=e.repeat),e.repeat=0,e.groupSeparator===e.radixPoint&&e.digits&&"0"!==e.digits&&("."===e.radixPoint?e.groupSeparator=",":","===e.radixPoint?e.groupSeparator=".":e.groupSeparator="")," "===e.groupSeparator&&(e.skipOptionalPartCharacter=void 0),e.autoGroup=e.autoGroup&&""!==e.groupSeparator,e.autoGroup&&("string"==typeof e.groupSize&&isFinite(e.groupSize)&&(e.groupSize=parseInt(e.groupSize)),isFinite(e.integerDigits))){var t=Math.floor(e.integerDigits/e.groupSize),a=e.integerDigits%e.groupSize;e.integerDigits=parseInt(e.integerDigits)+(0===a?t-1:t),e.integerDigits<1&&(e.integerDigits="*")}1<e.placeholder.length&&(e.placeholder=e.placeholder.charAt(0)),"radixFocus"===e.positionCaretOnClick&&""===e.placeholder&&!1===e.integerOptional&&(e.positionCaretOnClick="lvp"),e.definitions[";"]=e.definitions["~"],e.definitions[";"].definitionSymbol="~",!0===e.numericInput&&(e.positionCaretOnClick="radixFocus"===e.positionCaretOnClick?"lvp":e.positionCaretOnClick,e.digitsOptional=!1,isNaN(e.digits)&&(e.digits=2),e.decimalProtect=!1);var mask="[+]";if(mask+=autoEscape(e.prefix,e),!0===e.integerOptional?mask+="~{1,"+e.integerDigits+"}":mask+="~{"+e.integerDigits+"}",void 0!==e.digits){var n=e.decimalProtect?":":e.radixPoint,i=e.digits.toString().split(",");isFinite(i[0])&&i[1]&&isFinite(i[1])?mask+=n+";{"+e.digits+"}":(isNaN(e.digits)||0<parseInt(e.digits))&&(e.digitsOptional?mask+="["+n+";{1,"+e.digits+"}]":mask+=n+";{"+e.digits+"}")}return mask+=autoEscape(e.suffix,e),mask+="[-]",e.greedy=!1,mask},placeholder:"",greedy:!1,digits:"*",digitsOptional:!0,enforceDigitsOnBlur:!1,radixPoint:".",positionCaretOnClick:"radixFocus",groupSize:3,groupSeparator:"",autoGroup:!1,allowMinus:!0,negationSymbol:{front:"-",back:""},integerDigits:"+",integerOptional:!0,prefix:"",suffix:"",rightAlign:!0,decimalProtect:!0,min:null,max:null,step:1,insertMode:!0,autoUnmask:!1,unmaskAsNumber:!1,inputType:"text",inputmode:"numeric",preValidation:function preValidation(e,t,a,n,i,r){if("-"===a||a===i.negationSymbol.front)return!0===i.allowMinus&&(i.isNegative=void 0===i.isNegative||!i.isNegative,""===e.join("")||{caret:r.validPositions[t]?t:void 0,dopost:!0});if(!1===n&&a===i.radixPoint&&void 0!==i.digits&&(isNaN(i.digits)||0<parseInt(i.digits))){var o=h.inArray(i.radixPoint,e);if(-1!==o&&void 0!==r.validPositions[o])return!0===i.numericInput?t===o:{caret:o+1}}return!0},postValidation:function postValidation(e,t,a,n){var i=n.suffix.split(""),r=n.prefix.split("");if(void 0===a.pos&&void 0!==a.caret&&!0!==a.dopost)return a;var o=void 0!==a.caret?a.caret:a.pos,s=e.slice();n.numericInput&&(o=s.length-o-1,s=s.reverse());var l=s[o];if(l===n.groupSeparator&&(l=s[o+=1]),o===s.length-n.suffix.length-1&&l===n.radixPoint)return a;void 0!==l&&l!==n.radixPoint&&l!==n.negationSymbol.front&&l!==n.negationSymbol.back&&(s[o]="?",0<n.prefix.length&&o>=(!1===n.isNegative?1:0)&&o<n.prefix.length-1+(!1===n.isNegative?1:0)?r[o-(!1===n.isNegative?1:0)]="?":0<n.suffix.length&&o>=s.length-n.suffix.length-(!1===n.isNegative?1:0)&&(i[o-(s.length-n.suffix.length-(!1===n.isNegative?1:0))]="?")),r=r.join(""),i=i.join("");var u=s.join("").replace(r,"");if(u=(u=(u=(u=u.replace(i,"")).replace(new RegExp(k.escapeRegex(n.groupSeparator),"g"),"")).replace(new RegExp("[-"+k.escapeRegex(n.negationSymbol.front)+"]","g"),"")).replace(new RegExp(k.escapeRegex(n.negationSymbol.back)+"$"),""),isNaN(n.placeholder)&&(u=u.replace(new RegExp(k.escapeRegex(n.placeholder),"g"),"")),1<u.length&&1!==u.indexOf(n.radixPoint)&&("0"===l&&(u=u.replace(/^\?/g,"")),u=u.replace(/^0/g,"")),u.charAt(0)===n.radixPoint&&""!==n.radixPoint&&!0!==n.numericInput&&(u="0"+u),""!==u){if(u=u.split(""),(!n.digitsOptional||n.enforceDigitsOnBlur&&"blur"===a.event)&&isFinite(n.digits)){var c=h.inArray(n.radixPoint,u),p=h.inArray(n.radixPoint,s);-1===c&&(u.push(n.radixPoint),c=u.length-1);for(var f=1;f<=n.digits;f++)n.digitsOptional&&(!n.enforceDigitsOnBlur||"blur"!==a.event)||void 0!==u[c+f]&&u[c+f]!==n.placeholder.charAt(0)?-1!==p&&void 0!==s[p+f]&&(u[c+f]=u[c+f]||s[p+f]):u[c+f]=a.placeholder||n.placeholder.charAt(0)}if(!0!==n.autoGroup||""===n.groupSeparator||l===n.radixPoint&&void 0===a.pos&&!a.dopost)u=u.join("");else{var d=u[u.length-1]===n.radixPoint&&a.c===n.radixPoint;u=k(function buildPostMask(e,t){var a="";if(a+="("+t.groupSeparator+"*{"+t.groupSize+"}){*}",""!==t.radixPoint){var n=e.join("").split(t.radixPoint);n[1]&&(a+=t.radixPoint+"*{"+n[1].match(/^\d*\??\d*/)[0].length+"}")}return a}(u,n),{numericInput:!0,jitMasking:!0,definitions:{"*":{validator:"[0-9?]",cardinality:1}}}).format(u.join("")),d&&(u+=n.radixPoint),u.charAt(0)===n.groupSeparator&&u.substr(1)}}if(n.isNegative&&"blur"===a.event&&(n.isNegative="0"!==u),u=r+u,u+=i,n.isNegative&&(u=n.negationSymbol.front+u,u+=n.negationSymbol.back),u=u.split(""),void 0!==l)if(l!==n.radixPoint&&l!==n.negationSymbol.front&&l!==n.negationSymbol.back)-1<(o=h.inArray("?",u))?u[o]=l:o=a.caret||0;else if(l===n.radixPoint||l===n.negationSymbol.front||l===n.negationSymbol.back){var g=h.inArray(l,u);-1!==g&&(o=g)}n.numericInput&&(o=u.length-o-1,u=u.reverse());var m={caret:void 0!==l&&void 0===a.pos||void 0===o?o:o+(n.numericInput?-1:1),buffer:u,refreshFromBuffer:a.dopost||e.join("")!==u.join("")};return m.refreshFromBuffer?m:a},onBeforeWrite:function onBeforeWrite(e,t,a,n){if(e)switch(e.type){case"keydown":return n.postValidation(t,a,{caret:a,dopost:!0},n);case"blur":case"checkval":var i;if(function parseMinMaxOptions(e){void 0===e.parseMinMaxOptions&&(null!==e.min&&(e.min=e.min.toString().replace(new RegExp(k.escapeRegex(e.groupSeparator),"g"),""),","===e.radixPoint&&(e.min=e.min.replace(e.radixPoint,".")),e.min=isFinite(e.min)?parseFloat(e.min):NaN,isNaN(e.min)&&(e.min=Number.MIN_VALUE)),null!==e.max&&(e.max=e.max.toString().replace(new RegExp(k.escapeRegex(e.groupSeparator),"g"),""),","===e.radixPoint&&(e.max=e.max.replace(e.radixPoint,".")),e.max=isFinite(e.max)?parseFloat(e.max):NaN,isNaN(e.max)&&(e.max=Number.MAX_VALUE)),e.parseMinMaxOptions="done")}(n),null!==n.min||null!==n.max){if(i=n.onUnMask(t.join(""),void 0,h.extend({},n,{unmaskAsNumber:!0})),null!==n.min&&i<n.min)return n.isNegative=n.min<0,n.postValidation(n.min.toString().replace(".",n.radixPoint).split(""),a,{caret:a,dopost:!0,placeholder:"0"},n);if(null!==n.max&&i>n.max)return n.isNegative=n.max<0,n.postValidation(n.max.toString().replace(".",n.radixPoint).split(""),a,{caret:a,dopost:!0,placeholder:"0"},n)}return n.postValidation(t,a,{caret:a,placeholder:"0",event:"blur"},n);case"_checkval":return{caret:a}}},regex:{integerPart:function integerPart(e,t){return t?new RegExp("["+k.escapeRegex(e.negationSymbol.front)+"+]?"):new RegExp("["+k.escapeRegex(e.negationSymbol.front)+"+]?\\d+")},integerNPart:function integerNPart(e){return new RegExp("[\\d"+k.escapeRegex(e.groupSeparator)+k.escapeRegex(e.placeholder.charAt(0))+"]+")}},definitions:{"~":{validator:function validator(e,t,a,n,i,r){var o;if("k"===e||"m"===e){o={insert:[],c:0};for(var s=0,l="k"===e?2:5;s<l;s++)o.insert.push({pos:a+s,c:0});return o.pos=a+l,o}if(!0===(o=n?new RegExp("[0-9"+k.escapeRegex(i.groupSeparator)+"]").test(e):new RegExp("[0-9]").test(e))){if(!0!==i.numericInput&&void 0!==t.validPositions[a]&&"~"===t.validPositions[a].match.def&&!r){var u=t.buffer.join(""),c=(u=(u=u.replace(new RegExp("[-"+k.escapeRegex(i.negationSymbol.front)+"]","g"),"")).replace(new RegExp(k.escapeRegex(i.negationSymbol.back)+"$"),"")).split(i.radixPoint);1<c.length&&(c[1]=c[1].replace(/0/g,i.placeholder.charAt(0))),"0"===c[0]&&(c[0]=c[0].replace(/0/g,i.placeholder.charAt(0))),u=c[0]+i.radixPoint+c[1]||"";var p=t._buffer.join("");for(u===i.radixPoint&&(u=p);null===u.match(k.escapeRegex(p)+"$");)p=p.slice(1);o=void 0===(u=(u=u.replace(p,"")).split(""))[a]?{pos:a,remove:a}:{pos:a}}}else n||e!==i.radixPoint||void 0!==t.validPositions[a-1]||(o={insert:{pos:a,c:0},pos:a+1});return o},cardinality:1},"+":{validator:function validator(e,t,a,n,i){return i.allowMinus&&("-"===e||e===i.negationSymbol.front)},cardinality:1,placeholder:""},"-":{validator:function validator(e,t,a,n,i){return i.allowMinus&&e===i.negationSymbol.back},cardinality:1,placeholder:""},":":{validator:function validator(e,t,a,n,i){var r="["+k.escapeRegex(i.radixPoint)+"]",o=new RegExp(r).test(e);return o&&t.validPositions[a]&&t.validPositions[a].match.placeholder===i.radixPoint&&(o={caret:a+1}),o},cardinality:1,placeholder:function placeholder(e){return e.radixPoint}}},onUnMask:function onUnMask(e,t,a){if(""===t&&!0===a.nullable)return t;var n=e.replace(a.prefix,"");return n=(n=n.replace(a.suffix,"")).replace(new RegExp(k.escapeRegex(a.groupSeparator),"g"),""),""!==a.placeholder.charAt(0)&&(n=n.replace(new RegExp(a.placeholder.charAt(0),"g"),"0")),a.unmaskAsNumber?(""!==a.radixPoint&&-1!==n.indexOf(a.radixPoint)&&(n=n.replace(k.escapeRegex.call(this,a.radixPoint),".")),n=(n=n.replace(new RegExp("^"+k.escapeRegex(a.negationSymbol.front)),"-")).replace(new RegExp(k.escapeRegex(a.negationSymbol.back)+"$"),""),Number(n)):n},isComplete:function isComplete(e,t){var a=(t.numericInput?e.slice().reverse():e).join("");return a=(a=(a=(a=(a=a.replace(new RegExp("^"+k.escapeRegex(t.negationSymbol.front)),"-")).replace(new RegExp(k.escapeRegex(t.negationSymbol.back)+"$"),"")).replace(t.prefix,"")).replace(t.suffix,"")).replace(new RegExp(k.escapeRegex(t.groupSeparator)+"([0-9]{3})","g"),"$1"),","===t.radixPoint&&(a=a.replace(k.escapeRegex(t.radixPoint),".")),isFinite(a)},onBeforeMask:function onBeforeMask(e,t){t.isNegative=void 0;var a=t.radixPoint||",";"number"!=typeof e&&"number"!==t.inputType||""===a||(e=e.toString().replace(".",a));var n=e.split(a),i=n[0].replace(/[^\-0-9]/g,""),r=1<n.length?n[1].replace(/[^0-9]/g,""):"";e=i+(""!==r?a+r:r);var o=0;if(""!==a&&(o=r.length,""!==r)){var s=Math.pow(10,o||1);isFinite(t.digits)&&(o=parseInt(t.digits),s=Math.pow(10,o)),e=e.replace(k.escapeRegex(a),"."),isFinite(e)&&(e=Math.round(parseFloat(e)*s)/s),e=e.toString().replace(".",a)}return 0===t.digits&&-1!==e.indexOf(k.escapeRegex(a))&&(e=e.substring(0,e.indexOf(k.escapeRegex(a)))),function alignDigits(e,t,a){if(0<t){var n=h.inArray(a.radixPoint,e);-1===n&&(e.push(a.radixPoint),n=e.length-1);for(var i=1;i<=t;i++)e[n+i]=e[n+i]||"0"}return e}(e.toString().split(""),o,t).join("")},onKeyDown:function onKeyDown(e,t,a,n){var i=h(this);if(e.ctrlKey)switch(e.keyCode){case k.keyCode.UP:i.val(parseFloat(this.inputmask.unmaskedvalue())+parseInt(n.step)),i.trigger("setvalue");break;case k.keyCode.DOWN:i.val(parseFloat(this.inputmask.unmaskedvalue())-parseInt(n.step)),i.trigger("setvalue")}}},currency:{prefix:"$ ",groupSeparator:",",alias:"numeric",placeholder:"0",autoGroup:!0,digits:2,digitsOptional:!1,clearMaskOnLostFocus:!1},decimal:{alias:"numeric"},integer:{alias:"numeric",digits:0,radixPoint:""},percentage:{alias:"numeric",digits:2,digitsOptional:!0,radixPoint:".",placeholder:"0",autoGroup:!1,min:0,max:100,suffix:" %",allowMinus:!1}}),e.exports=k}])});
/*!
 * dist/jquery.inputmask.min
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2018 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.0-beta.82
 */

!function webpackUniversalModuleDefinition(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t(require("jquery"));else if("function"==typeof define&&define.amd)define(["jquery"],t);else{var a="object"==typeof exports?t(require("jquery")):t(e.jQuery);for(var i in a)("object"==typeof exports?exports:e)[i]=a[i]}}(window,function(__WEBPACK_EXTERNAL_MODULE__5__){return function(a){var i={};function __webpack_require__(e){if(i[e])return i[e].exports;var t=i[e]={i:e,l:!1,exports:{}};return a[e].call(t.exports,t,t.exports,__webpack_require__),t.l=!0,t.exports}return __webpack_require__.m=a,__webpack_require__.c=i,__webpack_require__.d=function(e,t,a){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(t,e){if(1&e&&(t=__webpack_require__(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(__webpack_require__.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)__webpack_require__.d(a,i,function(e){return t[e]}.bind(null,i));return a},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}([function(e,t,a){"use strict";var i=a(1),n=a(5);i.dependencyLib===n&&a(9),e.exports=i},function(e,t,a){"use strict";a(2),a(7),a(8),e.exports=a(3)},function(e,t,a){"use strict";var i=a(3);i.extendDefinitions({A:{validator:"[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",casing:"upper"},"&":{validator:"[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",casing:"upper"},"#":{validator:"[0-9A-Fa-f]",casing:"upper"}}),i.extendAliases({cssunit:{regex:"[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"},url:{regex:"(https?|ftp)//.*",autoUnmask:!1},ip:{mask:"i[i[i]].i[i[i]].i[i[i]].i[i[i]]",definitions:{i:{validator:function validator(e,t,a,i,n){return e=-1<a-1&&"."!==t.buffer[a-1]?(e=t.buffer[a-1]+e,-1<a-2&&"."!==t.buffer[a-2]?t.buffer[a-2]+e:"0"+e):"00"+e,new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]").test(e)}}},onUnMask:function onUnMask(e,t,a){return e},inputmode:"numeric"},email:{mask:"*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",greedy:!1,casing:"lower",onBeforePaste:function onBeforePaste(e,t){return(e=e.toLowerCase()).replace("mailto:","")},definitions:{"*":{validator:"[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"},"-":{validator:"[0-9A-Za-z-]"}},onUnMask:function onUnMask(e,t,a){return e},inputmode:"email"},mac:{mask:"##:##:##:##:##:##"},vin:{mask:"V{13}9{4}",definitions:{V:{validator:"[A-HJ-NPR-Za-hj-npr-z\\d]",casing:"upper"}},clearIncomplete:!0,autoUnmask:!0}}),e.exports=i},function(e,t,a){"use strict";var T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};e.exports=function(L,M,V){var S=M.document,e=navigator.userAgent,x=0<e.indexOf("MSIE ")||0<e.indexOf("Trident/"),P=isInputEventSupported("touchstart"),_=/iemobile/i.test(e),E=/iphone/i.test(e)&&!_;function Inputmask(e,t,a){if(!(this instanceof Inputmask))return new Inputmask(e,t,a);this.el=V,this.events={},this.maskset=V,!(this.refreshValue=!1)!==a&&(L.isPlainObject(e)?t=e:(t=t||{},e&&(t.alias=e)),this.opts=L.extend(!0,{},this.defaults,t),this.noMasksCache=t&&t.definitions!==V,this.userOptions=t||{},this.isRTL=this.opts.numericInput,resolveAlias(this.opts.alias,t,this.opts))}function resolveAlias(e,t,a){var i=Inputmask.prototype.aliases[e];return i?(i.alias&&resolveAlias(i.alias,V,a),L.extend(!0,a,i),L.extend(!0,a,t),!0):(null===a.mask&&(a.mask=e),!1)}function generateMaskSet(a,o){function generateMask(e,t,a){var i=!1;if(null!==e&&""!==e||(i=null!==a.regex,e=i?(e=a.regex).replace(/^(\^)(.*)(\$)$/,"$2"):(i=!0,".*")),1===e.length&&!1===a.greedy&&0!==a.repeat&&(a.placeholder=""),0<a.repeat||"*"===a.repeat||"+"===a.repeat){var n="*"===a.repeat?0:"+"===a.repeat?1:a.repeat;e=a.groupmarker[0]+e+a.groupmarker[1]+a.quantifiermarker[0]+n+","+a.repeat+a.quantifiermarker[1]}var r,s=i?"regex_"+a.regex:a.numericInput?e.split("").reverse().join(""):e;return Inputmask.prototype.masksCache[s]===V||!0===o?(r={mask:e,maskToken:Inputmask.prototype.analyseMask(e,i,a),validPositions:{},_buffer:V,buffer:V,tests:{},excludes:{},metadata:t,maskLength:V,jitOffset:{}},!0!==o&&(Inputmask.prototype.masksCache[s]=r,r=L.extend(!0,{},Inputmask.prototype.masksCache[s]))):r=L.extend(!0,{},Inputmask.prototype.masksCache[s]),r}if(L.isFunction(a.mask)&&(a.mask=a.mask(a)),L.isArray(a.mask)){if(1<a.mask.length){if(null===a.keepStatic){a.keepStatic="auto";for(var e=0;e<a.mask.length;e++)if(a.mask[e].charAt(0)!==a.mask[0].charAt(0)){a.keepStatic=!0;break}}var i=a.groupmarker[0];return L.each(a.isRTL?a.mask.reverse():a.mask,function(e,t){1<i.length&&(i+=a.groupmarker[1]+a.alternatormarker+a.groupmarker[0]),t.mask===V||L.isFunction(t.mask)?i+=t:i+=t.mask}),generateMask(i+=a.groupmarker[1],a.mask,a)}a.mask=a.mask.pop()}return a.mask&&a.mask.mask!==V&&!L.isFunction(a.mask.mask)?generateMask(a.mask.mask,a.mask,a):generateMask(a.mask,a.mask,a)}function isInputEventSupported(e){var t=S.createElement("input"),a="on"+e,i=a in t;return i||(t.setAttribute(a,"return;"),i="function"==typeof t[a]),t=null,i}function maskScope(e,t,F){t=t||this.maskset,F=F||this.opts;var d,n,m,f,r,u=this,l=this.el,k=this.isRTL,s=!1,c=!1,h=!1,i=!1;function getMaskTemplate(e,t,a,i,n){var r=F.greedy;n&&(F.greedy=!1),t=t||0;var s,o,l,u=[],c=0;getLastValidPosition();do{if(!0===e&&getMaskSet().validPositions[c])l=n&&!0===getMaskSet().validPositions[c].match.optionality&&getMaskSet().validPositions[c+1]===V&&(!0===getMaskSet().validPositions[c].generatedInput||getMaskSet().validPositions[c].input==F.skipOptionalPartCharacter&&0<c)?determineTestTemplate(c,getTests(c,s,c-1)):getMaskSet().validPositions[c],o=l.match,s=l.locator.slice(),u.push(!0===a?l.input:!1===a?o.nativeDef:getPlaceholder(c,o));else{l=getTestTemplate(c,s,c-1),o=l.match,s=l.locator.slice();var p=!0!==i&&(!1!==F.jitMasking?F.jitMasking:o.jit);(!1===p||p===V||"number"==typeof p&&isFinite(p)&&c<p)&&u.push(!1===a?o.nativeDef:getPlaceholder(c,o))}"auto"===F.keepStatic&&o.newBlockMarker&&null!==o.fn&&(F.keepStatic=c-1),c++}while((m===V||c<m)&&(null!==o.fn||""!==o.def)||c<t);return""===u[u.length-1]&&u.pop(),!1===a&&getMaskSet().maskLength!==V||(getMaskSet().maskLength=c-1),F.greedy=r,u}function getMaskSet(){return t}function resetMaskSet(e){var t=getMaskSet();t.buffer=V,!0!==e&&(t.validPositions={},t.p=0)}function getLastValidPosition(e,t,a){var i=-1,n=-1,r=a||getMaskSet().validPositions;for(var s in e===V&&(e=-1),r){var o=parseInt(s);r[o]&&(t||!0!==r[o].generatedInput)&&(o<=e&&(i=o),e<=o&&(n=o))}return-1===i||i==e?n:-1==n?i:e-i<n-e?i:n}function getDecisionTaker(e){var t=e.locator[e.alternation];return"string"==typeof t&&0<t.length&&(t=t.split(",")[0]),t!==V?t.toString():""}function getLocator(e,t){var a=(e.alternation!=V?e.mloc[getDecisionTaker(e)]:e.locator).join("");if(""!==a)for(;a.length<t;)a+="0";return a}function determineTestTemplate(e,t){for(var a,i,n,r=getTest(e=0<e?e-1:0),s=getLocator(r),o=0;o<t.length;o++){var l=t[o];a=getLocator(l,s.length);var u=Math.abs(a-s);(i===V||""!==a&&u<i||n&&n.match.optionality&&"master"===n.match.newBlockMarker&&(!l.match.optionality||!l.match.newBlockMarker)||n&&n.match.optionalQuantifier&&!l.match.optionalQuantifier)&&(i=u,n=l)}return n}function getTestTemplate(e,t,a){return getMaskSet().validPositions[e]||determineTestTemplate(e,getTests(e,t?t.slice():t,a))}function getTest(e,t){return getMaskSet().validPositions[e]?getMaskSet().validPositions[e]:(t||getTests(e))[0]}function positionCanMatchDefinition(e,t){for(var a=!1,i=getTests(e),n=0;n<i.length;n++)if(i[n].match&&i[n].match.def===t){a=!0;break}return a}function getTests(D,e,t){var B,a=getMaskSet().maskToken,O=e?t:0,i=e?e.slice():[0],I=[],j=!1,N=e?e.join(""):"";function resolveTestFromToken(A,C,e,t){function handleMatch(e,t,a){function isFirstMatch(a,i){var n=0===L.inArray(a,i.matches);return n||L.each(i.matches,function(e,t){if(!0===t.isQuantifier?n=isFirstMatch(a,i.matches[e-1]):t.hasOwnProperty("matches")&&(n=isFirstMatch(a,t)),n)return!1}),n}function resolveNdxInitializer(e,n,r){var s,o;if((getMaskSet().tests[e]||getMaskSet().validPositions[e])&&L.each(getMaskSet().tests[e]||[getMaskSet().validPositions[e]],function(e,t){if(t.mloc[n])return s=t,!1;var a=r!==V?r:t.alternation,i=t.locator[a]!==V?t.locator[a].toString().indexOf(n):-1;(o===V||i<o)&&-1!==i&&(s=t,o=i)}),s){var t=s.locator[s.alternation],a=s.mloc[n]||s.mloc[t]||s.locator;return a.slice((r!==V?r:s.alternation)+1)}return r!==V?resolveNdxInitializer(e,n):V}function isSubsetOf(e,t){function expand(e){for(var t,a,i=[],n=0,r=e.length;n<r;n++)if("-"===e.charAt(n))for(a=e.charCodeAt(n+1);++t<a;)i.push(String.fromCharCode(t));else t=e.charCodeAt(n),i.push(e.charAt(n));return i.join("")}return F.regex&&null!==e.match.fn&&null!==t.match.fn?-1!==expand(t.match.def.replace(/[\[\]]/g,"")).indexOf(expand(e.match.def.replace(/[\[\]]/g,""))):e.match.def===t.match.nativeDef}function setMergeLocators(e,t){if(t===V||e.alternation===t.alternation&&-1===e.locator[e.alternation].toString().indexOf(t.locator[t.alternation])){e.mloc=e.mloc||{};var a=e.locator[e.alternation];if(a!==V){if("string"==typeof a&&(a=a.split(",")[0]),e.mloc[a]===V&&(e.mloc[a]=e.locator.slice()),t!==V){for(var i in t.mloc)"string"==typeof i&&(i=i.split(",")[0]),e.mloc[i]===V&&(e.mloc[i]=t.mloc[i]);e.locator[e.alternation]=Object.keys(e.mloc).join(",")}return!0}e.alternation=V}return!1}if(500<O&&a!==V)throw"Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. "+getMaskSet().mask;if(O===D&&e.matches===V)return I.push({match:e,locator:t.reverse(),cd:N,mloc:{}}),!0;if(e.matches!==V){if(e.isGroup&&a!==e){if(e=handleMatch(A.matches[L.inArray(e,A.matches)+1],t,a))return!0}else if(e.isOptional){var i=e;if(e=resolveTestFromToken(e,C,t,a)){if(L.each(I,function(e,t){t.match.optionality=!0}),B=I[I.length-1].match,a!==V||!isFirstMatch(B,i))return!0;j=!0,O=D}}else if(e.isAlternator){var n,r=e,s=[],o=I.slice(),l=t.length,u=0<C.length?C.shift():-1;if(-1===u||"string"==typeof u){var c,p=O,f=C.slice(),g=[];if("string"==typeof u)g=u.split(",");else for(c=0;c<r.matches.length;c++)g.push(c.toString());if(getMaskSet().excludes[D]){for(var m=g.slice(),d=0,k=getMaskSet().excludes[D].length;d<k;d++)g.splice(g.indexOf(getMaskSet().excludes[D][d].toString()),1);0===g.length&&(getMaskSet().excludes[D]=V,g=m)}(!0===F.keepStatic||isFinite(parseInt(F.keepStatic))&&p>=F.keepStatic)&&(g=g.slice(0,1));for(var h=!1,v=0;v<g.length;v++){c=parseInt(g[v]),I=[],C="string"==typeof u&&resolveNdxInitializer(O,c,l)||f.slice(),r.matches[c]&&handleMatch(r.matches[c],[c].concat(t),a)?e=!0:0===v&&(h=!0),n=I.slice(),O=p,I=[];for(var y=0;y<n.length;y++){var b=n[y],M=!1;b.match.jit=b.match.jit||h,b.alternation=b.alternation||l,setMergeLocators(b);for(var S=0;S<s.length;S++){var x=s[S];if("string"!=typeof u||b.alternation!==V&&-1!==L.inArray(b.locator[b.alternation].toString(),g)){if(b.match.nativeDef===x.match.nativeDef){M=!0,setMergeLocators(x,b);break}if(isSubsetOf(b,x)){setMergeLocators(b,x)&&(M=!0,s.splice(s.indexOf(x),0,b));break}if(isSubsetOf(x,b)){setMergeLocators(x,b);break}if(w=x,void 0,!(!((T=T=b).locator.slice(T.alternation).join("")==w.locator.slice(w.alternation).join(""))||null!==T.match.fn||null===w.match.fn)&&w.match.fn.test(T.match.def,getMaskSet(),D,!1,F,!1)){setMergeLocators(b,x)&&(M=!0,s.splice(s.indexOf(x),0,b));break}}}M||s.push(b)}}I=o.concat(s),O=D,j=0<I.length,e=0<s.length,C=f.slice()}else e=handleMatch(r.matches[u]||A.matches[u],[u].concat(t),a);if(e)return!0}else if(e.isQuantifier&&a!==A.matches[L.inArray(e,A.matches)-1])for(var P=e,_=0<C.length?C.shift():0;_<(isNaN(P.quantifier.max)?_+1:P.quantifier.max)&&O<=D;_++){var E=A.matches[L.inArray(P,A.matches)-1];if(e=handleMatch(E,[_].concat(t),E)){if((B=I[I.length-1].match).optionalQuantifier=_>=P.quantifier.min,B.jit=(_||1)*E.matches.indexOf(B)>=P.quantifier.jit,B.optionalQuantifier&&isFirstMatch(B,E)){j=!0,O=D;break}return B.jit&&(getMaskSet().jitOffset[D]=E.matches.indexOf(B)),!0}}else if(e=resolveTestFromToken(e,C,t,a))return!0}else O++;var T,w}for(var a=0<C.length?C.shift():0;a<A.matches.length;a++)if(!0!==A.matches[a].isQuantifier){var i=handleMatch(A.matches[a],[a].concat(e),t);if(i&&O===D)return i;if(D<O)break}}if(-1<D){if(e===V){for(var n,r=D-1;(n=getMaskSet().validPositions[r]||getMaskSet().tests[r])===V&&-1<r;)r--;n!==V&&-1<r&&(i=function mergeLocators(e,t){var i=[];return L.isArray(t)||(t=[t]),0<t.length&&(t[0].alternation===V?0===(i=determineTestTemplate(e,t.slice()).locator.slice()).length&&(i=t[0].locator.slice()):L.each(t,function(e,t){if(""!==t.def)if(0===i.length)i=t.locator.slice();else for(var a=0;a<i.length;a++)t.locator[a]&&-1===i[a].toString().indexOf(t.locator[a])&&(i[a]+=","+t.locator[a])})),i}(r,n),N=i.join(""),O=r)}if(getMaskSet().tests[D]&&getMaskSet().tests[D][0].cd===N)return getMaskSet().tests[D];for(var s=i.shift();s<a.length;s++){var o=resolveTestFromToken(a[s],i,[s]);if(o&&O===D||D<O)break}}return(0===I.length||j)&&I.push({match:{fn:null,optionality:!1,casing:null,def:"",placeholder:""},locator:[],mloc:{},cd:N}),e!==V&&getMaskSet().tests[D]?L.extend(!0,[],I):(getMaskSet().tests[D]=L.extend(!0,[],I),getMaskSet().tests[D])}function getBufferTemplate(){return getMaskSet()._buffer===V&&(getMaskSet()._buffer=getMaskTemplate(!1,1),getMaskSet().buffer===V&&(getMaskSet().buffer=getMaskSet()._buffer.slice())),getMaskSet()._buffer}function getBuffer(e){return getMaskSet().buffer!==V&&!0!==e||(getMaskSet().buffer=getMaskTemplate(!0,getLastValidPosition(),!0),getMaskSet()._buffer===V&&(getMaskSet()._buffer=getMaskSet().buffer.slice())),getMaskSet().buffer}function refreshFromBuffer(e,t,a){var i,n;if(!0===e)resetMaskSet(),e=0,t=a.length;else for(i=e;i<t;i++)delete getMaskSet().validPositions[i];for(i=n=e;i<t;i++)if(resetMaskSet(!0),a[i]!==F.skipOptionalPartCharacter){var r=isValid(n,a[i],!0,!0);!1!==r&&(resetMaskSet(!0),n=r.caret!==V?r.caret:r.pos+1)}}function checkAlternationMatch(e,t,a){for(var i,n=F.greedy?t:t.slice(0,1),r=!1,s=a!==V?a.split(","):[],o=0;o<s.length;o++)-1!==(i=e.indexOf(s[o]))&&e.splice(i,1);for(var l=0;l<e.length;l++)if(-1!==L.inArray(e[l],n)){r=!0;break}return r}function alternate(e,t,a,i,n){var r,s,o,l,u,c,p,f=L.extend(!0,{},getMaskSet().validPositions),g=!1,m=n!==V?n:getLastValidPosition();if(-1===m&&n===V)l=getTest(r=0),s=l.alternation;else for(;0<=m;m--)if((o=getMaskSet().validPositions[m])&&o.alternation!==V){if(l&&l.locator[o.alternation]!==o.locator[o.alternation])break;r=m,s=getMaskSet().validPositions[r].alternation,l=o}if(s!==V){p=parseInt(r),getMaskSet().excludes[p]=getMaskSet().excludes[p]||[],!0!==e&&getMaskSet().excludes[p].push(getDecisionTaker(l));var d=[],k=0;for(u=p;u<getLastValidPosition(V,!0)+1;u++)(c=getMaskSet().validPositions[u])&&!0!==c.generatedInput?d.push(c.input):u<e&&k++,delete getMaskSet().validPositions[u];for(;getMaskSet().excludes[p]&&getMaskSet().excludes[p].length<10;){var h=-1*k,v=d.slice();for(getMaskSet().tests[p]=V,resetMaskSet(!0),g=!0;0<v.length;){var y=v.shift();if(!(g=isValid(getLastValidPosition(V,!0)+1,y,!1,i,!0)))break}if(g&&t!==V){var b=getLastValidPosition(e)+1;for(u=p;u<getLastValidPosition()+1;u++)((c=getMaskSet().validPositions[u])===V||null==c.match.fn)&&u<e+h&&h++;g=isValid(b<(e+=h)?b:e,t,a,i,!0)}if(g)break;if(resetMaskSet(),l=getTest(p),getMaskSet().validPositions=L.extend(!0,{},f),!getMaskSet().excludes[p]){g=alternate(e,t,a,i,p-1);break}var M=getDecisionTaker(l);if(-1!==getMaskSet().excludes[p].indexOf(M)){g=alternate(e,t,a,i,p-1);break}for(getMaskSet().excludes[p].push(M),u=p;u<getLastValidPosition(V,!0)+1;u++)delete getMaskSet().validPositions[u]}}return getMaskSet().excludes[p]=V,g}function isValid(u,e,t,c,a,i){function isSelection(e){return k?1<e.begin-e.end||e.begin-e.end==1:1<e.end-e.begin||e.end-e.begin==1}t=!0===t;var n=u;function _isValid(r,s,o){var l=!1;return L.each(getTests(r),function(e,t){var a=t.match;if(getBuffer(!0),!1!==(l=null!=a.fn?a.fn.test(s,getMaskSet(),r,o,F,isSelection(u)):(s===a.def||s===F.skipOptionalPartCharacter)&&""!==a.def&&{c:getPlaceholder(r,a,!0)||a.def,pos:r})){var i=l.c!==V?l.c:s,n=r;return i=i===F.skipOptionalPartCharacter&&null===a.fn?getPlaceholder(r,a,!0)||a.def:i,l.remove!==V&&(L.isArray(l.remove)||(l.remove=[l.remove]),L.each(l.remove.sort(function(e,t){return t-e}),function(e,t){revalidateMask({begin:t,end:t+1})})),l.insert!==V&&(L.isArray(l.insert)||(l.insert=[l.insert]),L.each(l.insert.sort(function(e,t){return e-t}),function(e,t){isValid(t.pos,t.c,!0,c)})),!0!==l&&l.pos!==V&&l.pos!==r&&(n=l.pos),!0!==l&&l.pos===V&&l.c===V||revalidateMask(u,L.extend({},t,{input:function casing(e,t,a){switch(F.casing||t.casing){case"upper":e=e.toUpperCase();break;case"lower":e=e.toLowerCase();break;case"title":var i=getMaskSet().validPositions[a-1];e=0===a||i&&i.input===String.fromCharCode(Inputmask.keyCode.SPACE)?e.toUpperCase():e.toLowerCase();break;default:if(L.isFunction(F.casing)){var n=Array.prototype.slice.call(arguments);n.push(getMaskSet().validPositions),e=F.casing.apply(this,n)}}return e}(i,a,n)}),c,n)||(l=!1),!1}}),l}u.begin!==V&&(n=k?u.end:u.begin);var r=!0,s=L.extend(!0,{},getMaskSet().validPositions);if(L.isFunction(F.preValidation)&&!t&&!0!==c&&!0!==i&&(r=F.preValidation(getBuffer(),n,e,isSelection(u),F,getMaskSet())),!0===r){if(trackbackPositions(V,n,!0),(m===V||n<m)&&(r=_isValid(n,e,t),(!t||!0===c)&&!1===r&&!0!==i)){var o=getMaskSet().validPositions[n];if(!o||null!==o.match.fn||o.match.def!==e&&e!==F.skipOptionalPartCharacter){if((F.insertMode||getMaskSet().validPositions[seekNext(n)]===V)&&(!isMask(n,!0)||getMaskSet().jitOffset[n]))if(getMaskSet().jitOffset[n]&&getMaskSet().validPositions[seekNext(n)]===V)(r=isValid(n+getMaskSet().jitOffset[n],e,t)).caret=n;else for(var l=n+1,p=seekNext(n);l<=p;l++)if(!1!==(r=_isValid(l,e,t))){r=trackbackPositions(n,r.pos!==V?r.pos:l)||r,n=l;break}}else r={caret:seekNext(n)}}!1!==r||!1===F.keepStatic||null!=F.regex&&!isComplete(getBuffer())||t||!0===a||(r=alternate(n,e,t,c)),!0===r&&(r={pos:n})}if(L.isFunction(F.postValidation)&&!1!==r&&!t&&!0!==c&&!0!==i){var f=F.postValidation(getBuffer(!0),u.begin!==V?k?u.end:u.begin:u,r,F);if(f!==V){if(f.refreshFromBuffer&&f.buffer){var g=f.refreshFromBuffer;refreshFromBuffer(!0===g?g:g.start,g.end,f.buffer)}r=!0===f?r:f}}return r&&r.pos===V&&(r.pos=n),!1!==r&&!0!==i||(resetMaskSet(!0),getMaskSet().validPositions=L.extend(!0,{},s)),r}function trackbackPositions(e,t,a){var i;if(e===V)for(e=t-1;0<e&&!getMaskSet().validPositions[e];e--);for(var n=e;n<t;n++)if(getMaskSet().validPositions[n]===V&&!isMask(n,!0)){var r=0==n?getTest(n):getMaskSet().validPositions[n-1];if(r){var s=getTests(n).slice();""===s[s.length-1].match.def&&s.pop();var o=determineTestTemplate(n,s);if((o=L.extend({},o,{input:getPlaceholder(n,o.match,!0)||o.match.def})).generatedInput=!0,revalidateMask(n,o,!0),!0!==a){var l=getMaskSet().validPositions[t].input;getMaskSet().validPositions[t]=V,i=isValid(t,l,!0,!0)}}}return i}function revalidateMask(e,t,a,i){function IsEnclosedStatic(e,t,a){var i=t[e];if(i===V||(null!==i.match.fn||!0===i.match.optionality)&&i.input!==F.radixPoint)return!1;var n=a.begin<=e-1?t[e-1]&&null===t[e-1].match.fn&&t[e-1]:t[e-1],r=a.end>e+1?t[e+1]&&null===t[e+1].match.fn&&t[e+1]:t[e+1];return n&&r}var n=e.begin!==V?e.begin:e,r=e.end!==V?e.end:e;if(e.begin>e.end&&(n=e.end,r=e.begin),i=i!==V?i:n,n!==r||F.insertMode&&getMaskSet().validPositions[i]!==V&&a===V){var s=L.extend(!0,{},getMaskSet().validPositions),o=getLastValidPosition(V,!0);for(getMaskSet().p=n,f=o;n<=f;f--)getMaskSet().validPositions[f]&&"+"===getMaskSet().validPositions[f].match.nativeDef&&(F.isNegative=!1),delete getMaskSet().validPositions[f];var l=!0,u=i,c=(getMaskSet().validPositions,!1),p=u,f=u;for(t&&(getMaskSet().validPositions[i]=L.extend(!0,{},t),p++,u++,n<r&&f++);f<=o;f++){var g=s[f];if(g!==V&&(r<=f||n<=f&&!0!==g.generatedInput&&IsEnclosedStatic(f,s,{begin:n,end:r}))){for(;""!==getTest(p).match.def;){if(!1===c&&s[p]&&s[p].match.nativeDef===g.match.nativeDef)getMaskSet().validPositions[p]=L.extend(!0,{},s[p]),getMaskSet().validPositions[p].input=g.input,trackbackPositions(V,p,!0),u=p+1,l=!0;else if(F.shiftPositions&&positionCanMatchDefinition(p,g.match.def)){var m=isValid(p,g.input,!0,!0);l=!1!==m,u=m.caret||m.insert?getLastValidPosition():p+1,c=!0}else l=!0===g.generatedInput||g.input===F.radixPoint&&!0===F.numericInput;if(l)break;if(!l&&r<p&&isMask(p,!0)&&(null!==g.match.fn||p>getMaskSet().maskLength))break;p++}""==getTest(p).match.def&&(l=!1),p=u}if(!l)break}if(!l)return getMaskSet().validPositions=L.extend(!0,{},s),resetMaskSet(!0),!1}else t&&(getMaskSet().validPositions[i]=L.extend(!0,{},t));return resetMaskSet(!0),!0}function isMask(e,t){var a=getTestTemplate(e).match;if(""===a.def&&(a=getTest(e).match),null!=a.fn)return a.fn;if(!0!==t&&-1<e){var i=getTests(e);return i.length>1+(""===i[i.length-1].match.def?1:0)}return!1}function seekNext(e,t){for(var a=e+1;""!==getTest(a).match.def&&(!0===t&&(!0!==getTest(a).match.newBlockMarker||!isMask(a))||!0!==t&&!isMask(a));)a++;return a}function seekPrevious(e,t){var a,i=e;if(i<=0)return 0;for(;0<--i&&(!0===t&&!0!==getTest(i).match.newBlockMarker||!0!==t&&!isMask(i)&&((a=getTests(i)).length<2||2===a.length&&""===a[1].match.def)););return i}function writeBuffer(e,t,a,i,n){if(i&&L.isFunction(F.onBeforeWrite)){var r=F.onBeforeWrite.call(u,i,t,a,F);if(r){if(r.refreshFromBuffer){var s=r.refreshFromBuffer;refreshFromBuffer(!0===s?s:s.start,s.end,r.buffer||t),t=getBuffer(!0)}a!==V&&(a=r.caret!==V?r.caret:a)}}if(e!==V&&(e.inputmask._valueSet(t.join("")),a===V||i!==V&&"blur"===i.type?renderColorMask(e,a,0===t.length):caret(e,a),!0===n)){var o=L(e),l=e.inputmask._valueGet();c=!0,o.trigger("input"),setTimeout(function(){l===getBufferTemplate().join("")?o.trigger("cleared"):!0===isComplete(t)&&o.trigger("complete")},0)}}function getPlaceholder(e,t,a){if((t=t||getTest(e).match).placeholder!==V||!0===a)return L.isFunction(t.placeholder)?t.placeholder(F):t.placeholder;if(null!==t.fn)return F.placeholder.charAt(e%F.placeholder.length);if(-1<e&&getMaskSet().validPositions[e]===V){var i,n=getTests(e),r=[];if(n.length>1+(""===n[n.length-1].match.def?1:0))for(var s=0;s<n.length;s++)if(!0!==n[s].match.optionality&&!0!==n[s].match.optionalQuantifier&&(null===n[s].match.fn||i===V||!1!==n[s].match.fn.test(i.match.def,getMaskSet(),e,!0,F))&&(r.push(n[s]),null===n[s].match.fn&&(i=n[s]),1<r.length&&/[0-9a-bA-Z]/.test(r[0].match.def)))return F.placeholder.charAt(e%F.placeholder.length)}return t.def}function HandleNativePlaceholder(e,t){if(x&&e.inputmask._valueGet()!==t){var a=getBuffer().slice(),i=e.inputmask._valueGet();i!==t&&(-1===getLastValidPosition()&&i===getBufferTemplate().join("")?a=[]:clearOptionalTail(a),writeBuffer(e,a))}else e.placeholder!==t&&(e.placeholder=t,""===e.placeholder&&e.removeAttribute("placeholder"))}var a,o={on:function on(e,t,r){var a=function ev(e){var t=this;if(t.inputmask===V&&"FORM"!==this.nodeName){var a=L.data(t,"_inputmask_opts");a?new Inputmask(a).mask(t):o.off(t)}else{if("setvalue"===e.type||"FORM"===this.nodeName||!(t.disabled||t.readOnly&&!("keydown"===e.type&&e.ctrlKey&&67===e.keyCode||!1===F.tabThrough&&e.keyCode===Inputmask.keyCode.TAB))){switch(e.type){case"input":if(!0===c)return c=!1,e.preventDefault();if(P){var i=arguments;return setTimeout(function(){r.apply(t,i),caret(t,t.inputmask.caretPos,V,!0)},0),!1}break;case"keydown":c=s=!1;break;case"keypress":if(!0===s)return e.preventDefault();s=!0;break;case"click":if(_||E){var i=arguments;return setTimeout(function(){r.apply(t,i)},0),!1}}var n=r.apply(t,arguments);return!1===n&&(e.preventDefault(),e.stopPropagation()),n}e.preventDefault()}};e.inputmask.events[t]=e.inputmask.events[t]||[],e.inputmask.events[t].push(a),-1!==L.inArray(t,["submit","reset"])?null!==e.form&&L(e.form).on(t,a):L(e).on(t,a)},off:function off(i,e){var t;i.inputmask&&i.inputmask.events&&(e?(t=[])[e]=i.inputmask.events[e]:t=i.inputmask.events,L.each(t,function(e,t){for(;0<t.length;){var a=t.pop();-1!==L.inArray(e,["submit","reset"])?null!==i.form&&L(i.form).off(e,a):L(i).off(e,a)}delete i.inputmask.events[e]}))}},v={keydownEvent:function keydownEvent(e){var t=this,a=L(t),i=e.keyCode,n=caret(t);if(i===Inputmask.keyCode.BACKSPACE||i===Inputmask.keyCode.DELETE||E&&i===Inputmask.keyCode.BACKSPACE_SAFARI||e.ctrlKey&&i===Inputmask.keyCode.X&&!isInputEventSupported("cut"))e.preventDefault(),handleRemove(0,i,n),writeBuffer(t,getBuffer(!0),getMaskSet().p,e,t.inputmask._valueGet()!==getBuffer().join(""));else if(i===Inputmask.keyCode.END||i===Inputmask.keyCode.PAGE_DOWN){e.preventDefault();var r=seekNext(getLastValidPosition());caret(t,e.shiftKey?n.begin:r,r,!0)}else i===Inputmask.keyCode.HOME&&!e.shiftKey||i===Inputmask.keyCode.PAGE_UP?(e.preventDefault(),caret(t,0,e.shiftKey?n.begin:0,!0)):(F.undoOnEscape&&i===Inputmask.keyCode.ESCAPE||90===i&&e.ctrlKey)&&!0!==e.altKey?(checkVal(t,!0,!1,d.split("")),a.trigger("click")):i!==Inputmask.keyCode.INSERT||e.shiftKey||e.ctrlKey?!0===F.tabThrough&&i===Inputmask.keyCode.TAB&&(!0===e.shiftKey?(null===getTest(n.begin).match.fn&&(n.begin=seekNext(n.begin)),n.end=seekPrevious(n.begin,!0),n.begin=seekPrevious(n.end,!0)):(n.begin=seekNext(n.begin,!0),n.end=seekNext(n.begin,!0),n.end<getMaskSet().maskLength&&n.end--),n.begin<getMaskSet().maskLength&&(e.preventDefault(),caret(t,n.begin,n.end))):(F.insertMode=!F.insertMode,t.setAttribute("im-insert",F.insertMode));F.onKeyDown.call(this,e,getBuffer(),caret(t).begin,F),h=-1!==L.inArray(i,F.ignorables)},keypressEvent:function keypressEvent(e,t,a,i,n){var r=this,s=L(r),o=e.which||e.charCode||e.keyCode;if(!(!0===t||e.ctrlKey&&e.altKey)&&(e.ctrlKey||e.metaKey||h))return o===Inputmask.keyCode.ENTER&&d!==getBuffer().join("")&&(d=getBuffer().join(""),setTimeout(function(){s.trigger("change")},0)),!0;if(o){46===o&&!1===e.shiftKey&&""!==F.radixPoint&&(o=F.radixPoint.charCodeAt(0));var l,u=t?{begin:n,end:n}:caret(r),c=String.fromCharCode(o),p=0;if(F._radixDance&&F.numericInput){var f=getBuffer().indexOf(F.radixPoint.charAt(0))+1;u.begin<=f&&(o===F.radixPoint.charCodeAt(0)&&(p=1),u.begin-=1,u.end-=1)}getMaskSet().writeOutBuffer=!0;var g=isValid(u,c,i);if(!1!==g&&(resetMaskSet(!0),l=g.caret!==V?g.caret:seekNext(g.pos.begin?g.pos.begin:g.pos),getMaskSet().p=l),l=(F.numericInput&&g.caret===V?seekPrevious(l):l)+p,!1!==a&&(setTimeout(function(){F.onKeyValidation.call(r,o,g,F)},0),getMaskSet().writeOutBuffer&&!1!==g)){var m=getBuffer();writeBuffer(r,m,l,e,!0!==t)}if(e.preventDefault(),t)return!1!==g&&(g.forwardPosition=l),g}},pasteEvent:function pasteEvent(e){var t,a=this,i=e.originalEvent||e,n=(L(a),a.inputmask._valueGet(!0)),r=caret(a);k&&(t=r.end,r.end=r.begin,r.begin=t);var s=n.substr(0,r.begin),o=n.substr(r.end,n.length);if(s===(k?getBufferTemplate().reverse():getBufferTemplate()).slice(0,r.begin).join("")&&(s=""),o===(k?getBufferTemplate().reverse():getBufferTemplate()).slice(r.end).join("")&&(o=""),M.clipboardData&&M.clipboardData.getData)n=s+M.clipboardData.getData("Text")+o;else{if(!i.clipboardData||!i.clipboardData.getData)return!0;n=s+i.clipboardData.getData("text/plain")+o}var l=n;if(L.isFunction(F.onBeforePaste)){if(!1===(l=F.onBeforePaste.call(u,n,F)))return e.preventDefault();l||(l=n)}return checkVal(a,!1,!1,l.toString().split("")),writeBuffer(a,getBuffer(),seekNext(getLastValidPosition()),e,d!==getBuffer().join("")),e.preventDefault()},inputFallBackEvent:function inputFallBackEvent(e){var i=this,t=i.inputmask._valueGet();if(getBuffer().join("")!==t){var a=caret(i);if(t=function ieMobileHandler(e,t,a){if(_){var i=t.replace(getBuffer().join(""),"");if(1===i.length){var n=t.split("");n.splice(a.begin,0,i),t=n.join("")}}return t}(0,t=function radixPointHandler(e,t,a){return"."===t.charAt(a.begin-1)&&""!==F.radixPoint&&((t=t.split(""))[a.begin-1]=F.radixPoint.charAt(0),t=t.join("")),t}(0,t,a),a),getBuffer().join("")!==t){var n=getBuffer().join(""),r=!F.numericInput&&t.length>n.length?-1:0,s=t.substr(0,a.begin),o=t.substr(a.begin),l=n.substr(0,a.begin+r),u=n.substr(a.begin+r),c=a,p="",f=!1;if(s!==l){var g,m=(f=s.length>=l.length)?s.length:l.length;for(g=0;s.charAt(g)===l.charAt(g)&&g<m;g++);f&&(c.begin=g-r,p+=s.slice(g,c.end))}if(o!==u&&(o.length>u.length?p+=o.slice(0,1):o.length<u.length&&(c.end+=u.length-o.length,f||""===F.radixPoint||""!==o||s.charAt(c.begin+r-1)!==F.radixPoint||(c.begin--,p=F.radixPoint))),writeBuffer(i,getBuffer(),{begin:c.begin+r,end:c.end+r}),0<p.length)L.each(p.split(""),function(e,t){var a=new L.Event("keypress");a.which=t.charCodeAt(0),h=!1,v.keypressEvent.call(i,a)});else{c.begin===c.end-1&&(c.begin=seekPrevious(c.begin+1),c.begin===c.end-1?caret(i,c.begin):caret(i,c.begin,c.end));var d=new L.Event("keydown");d.keyCode=F.numericInput?Inputmask.keyCode.BACKSPACE:Inputmask.keyCode.DELETE,v.keydownEvent.call(i,d)}e.preventDefault()}}},beforeInputEvent:function beforeInputEvent(e){if(e.cancelable){var i=this;switch(e.inputType){case"insertText":return L.each(e.data.split(""),function(e,t){var a=new L.Event("keypress");a.which=t.charCodeAt(0),h=!1,v.keypressEvent.call(i,a)}),e.preventDefault();case"deleteContentBackward":var t=new L.Event("keydown");return t.keyCode=Inputmask.keyCode.BACKSPACE,v.keydownEvent.call(i,t),e.preventDefault();case"deleteContentForward":var t=new L.Event("keydown");return t.keyCode=Inputmask.keyCode.DELETE,v.keydownEvent.call(i,t),e.preventDefault()}}},setValueEvent:function setValueEvent(e){this.inputmask.refreshValue=!1;var t=e&&e.detail?e.detail[0]:arguments[1],t=t||this.inputmask._valueGet(!0);L.isFunction(F.onBeforeMask)&&(t=F.onBeforeMask.call(u,t,F)||t),checkVal(this,!0,!1,t=t.split("")),d=getBuffer().join(""),(F.clearMaskOnLostFocus||F.clearIncomplete)&&this.inputmask._valueGet()===getBufferTemplate().join("")&&this.inputmask._valueSet("")},focusEvent:function focusEvent(e){var t=this,a=t.inputmask._valueGet();F.showMaskOnFocus&&(!F.showMaskOnHover||F.showMaskOnHover&&""===a)&&(t.inputmask._valueGet()!==getBuffer().join("")?writeBuffer(t,getBuffer(),seekNext(getLastValidPosition())):!1===i&&caret(t,seekNext(getLastValidPosition()))),!0===F.positionCaretOnTab&&!1===i&&v.clickEvent.apply(t,[e,!0]),d=getBuffer().join("")},mouseleaveEvent:function mouseleaveEvent(e){i=!1,F.clearMaskOnLostFocus&&S.activeElement!==this&&HandleNativePlaceholder(this,r)},clickEvent:function clickEvent(e,u){var c=this;setTimeout(function(){if(S.activeElement===c){var e=caret(c);if(u&&(k?e.end=e.begin:e.begin=e.end),e.begin===e.end)switch(F.positionCaretOnClick){case"none":break;case"select":caret(c,0,getBuffer().length);break;case"ignore":caret(c,seekNext(getLastValidPosition()));break;case"radixFocus":if(function doRadixFocus(e){if(""!==F.radixPoint){var t=getMaskSet().validPositions;if(t[e]===V||t[e].input===getPlaceholder(e)){if(e<seekNext(-1))return!0;var a=L.inArray(F.radixPoint,getBuffer());if(-1!==a){for(var i in t)if(a<i&&t[i].input!==getPlaceholder(i))return!1;return!0}}}return!1}(e.begin)){var t=getBuffer().join("").indexOf(F.radixPoint);caret(c,F.numericInput?seekNext(t):t);break}default:var a=e.begin,i=getLastValidPosition(a,!0),n=seekNext(i);if(a<n)caret(c,isMask(a,!0)||isMask(a-1,!0)?a:seekNext(a));else{var r=getMaskSet().validPositions[i],s=getTestTemplate(n,r?r.match.locator:V,r),o=getPlaceholder(n,s.match);if(""!==o&&getBuffer()[n]!==o&&!0!==s.match.optionalQuantifier&&!0!==s.match.newBlockMarker||!isMask(n,F.keepStatic)&&s.match.def===o){var l=seekNext(n);(l<=a||a===n)&&(n=l)}caret(c,n)}}}},0)},cutEvent:function cutEvent(e){L(this);var t=caret(this),a=e.originalEvent||e,i=M.clipboardData||a.clipboardData,n=k?getBuffer().slice(t.end,t.begin):getBuffer().slice(t.begin,t.end);i.setData("text",k?n.reverse().join(""):n.join("")),S.execCommand&&S.execCommand("copy"),handleRemove(0,Inputmask.keyCode.DELETE,t),writeBuffer(this,getBuffer(),getMaskSet().p,e,d!==getBuffer().join(""))},blurEvent:function blurEvent(e){var t=L(this);if(this.inputmask){HandleNativePlaceholder(this,r);var a=this.inputmask._valueGet(),i=getBuffer().slice();""===a&&f===V||(F.clearMaskOnLostFocus&&(-1===getLastValidPosition()&&a===getBufferTemplate().join("")?i=[]:clearOptionalTail(i)),!1===isComplete(i)&&(setTimeout(function(){t.trigger("incomplete")},0),F.clearIncomplete&&(resetMaskSet(),i=F.clearMaskOnLostFocus?[]:getBufferTemplate().slice())),writeBuffer(this,i,V,e)),d!==getBuffer().join("")&&(d=i.join(""),t.trigger("change"))}},mouseenterEvent:function mouseenterEvent(e){i=!0,S.activeElement!==this&&F.showMaskOnHover&&HandleNativePlaceholder(this,(k?getBuffer().slice().reverse():getBuffer()).join(""))},submitEvent:function submitEvent(e){d!==getBuffer().join("")&&n.trigger("change"),F.clearMaskOnLostFocus&&-1===getLastValidPosition()&&l.inputmask._valueGet&&l.inputmask._valueGet()===getBufferTemplate().join("")&&l.inputmask._valueSet(""),F.clearIncomplete&&!1===isComplete(getBuffer())&&l.inputmask._valueSet(""),F.removeMaskOnSubmit&&(l.inputmask._valueSet(l.inputmask.unmaskedvalue(),!0),setTimeout(function(){writeBuffer(l,getBuffer())},0))},resetEvent:function resetEvent(e){l.inputmask.refreshValue=!0,setTimeout(function(){n.trigger("setvalue")},0)}};function checkVal(n,e,r,t,a){var s=this||n.inputmask,o=t.slice(),l="",u=-1,c=V;if(resetMaskSet(),r||!0===F.autoUnmask)u=seekNext(u);else{var i=getBufferTemplate().slice(0,seekNext(-1)).join(""),p=o.join("").match(new RegExp("^"+Inputmask.escapeRegex(i),"g"));p&&0<p.length&&(o.splice(0,p.length*i.length),u=seekNext(u))}-1===u?(getMaskSet().p=seekNext(u),u=0):getMaskSet().p=u,s.caretPos={begin:u},L.each(o,function(e,t){if(t!==V)if(getMaskSet().validPositions[e]===V&&o[e]===getPlaceholder(e)&&isMask(e,!0)&&!1===isValid(e,o[e],!0,V,V,!0))getMaskSet().p++;else{var a=new L.Event("_checkval");a.which=t.charCodeAt(0),l+=t;var i=getLastValidPosition(V,!0);!function isTemplateMatch(e,t){return-1!==getMaskTemplate(!0,0,!1).slice(e,seekNext(e)).join("").replace(/'/g,"").indexOf(t)&&!isMask(e)&&(getTest(e).match.nativeDef===t.charAt(0)||null===getTest(e).match.fn&&getTest(e).match.nativeDef==="'"+t.charAt(0)||" "===getTest(e).match.nativeDef&&(getTest(e+1).match.nativeDef===t.charAt(0)||null===getTest(e+1).match.fn&&getTest(e+1).match.nativeDef==="'"+t.charAt(0)))}(u,l)?(c=v.keypressEvent.call(n,a,!0,!1,r,s.caretPos.begin))&&(u=s.caretPos.begin+1,l=""):c=v.keypressEvent.call(n,a,!0,!1,r,i+1),c&&(writeBuffer(V,getBuffer(),c.forwardPosition,a,!1),s.caretPos={begin:c.forwardPosition,end:c.forwardPosition})}}),e&&writeBuffer(n,getBuffer(),c?c.forwardPosition:V,a||new L.Event("checkval"),a&&"input"===a.type)}function unmaskedvalue(e){if(e){if(e.inputmask===V)return e.value;e.inputmask&&e.inputmask.refreshValue&&v.setValueEvent.call(e)}var t=[],a=getMaskSet().validPositions;for(var i in a)a[i].match&&null!=a[i].match.fn&&t.push(a[i].input);var n=0===t.length?"":(k?t.reverse():t).join("");if(L.isFunction(F.onUnMask)){var r=(k?getBuffer().slice().reverse():getBuffer()).join("");n=F.onUnMask.call(u,r,n,F)}return n}function caret(e,t,a,i){function translatePosition(e){return!k||"number"!=typeof e||F.greedy&&""===F.placeholder||!l||(e=l.inputmask._valueGet().length-e),e}var n;if(t===V)return"selectionStart"in e?(t=e.selectionStart,a=e.selectionEnd):M.getSelection?(n=M.getSelection().getRangeAt(0)).commonAncestorContainer.parentNode!==e&&n.commonAncestorContainer!==e||(t=n.startOffset,a=n.endOffset):S.selection&&S.selection.createRange&&(n=S.selection.createRange(),t=0-n.duplicate().moveStart("character",-e.inputmask._valueGet().length),a=t+n.text.length),{begin:i?t:translatePosition(t),end:i?a:translatePosition(a)};if(L.isArray(t)&&(a=k?t[0]:t[1],t=k?t[1]:t[0]),t.begin!==V&&(a=k?t.begin:t.end,t=k?t.end:t.begin),"number"==typeof t){t=i?t:translatePosition(t),a="number"==typeof(a=i?a:translatePosition(a))?a:t;var r=parseInt(((e.ownerDocument.defaultView||M).getComputedStyle?(e.ownerDocument.defaultView||M).getComputedStyle(e,null):e.currentStyle).fontSize)*a;if(e.scrollLeft=r>e.scrollWidth?r:0,e.inputmask.caretPos={begin:t,end:a},e===S.activeElement){if("selectionStart"in e)e.selectionStart=t,e.selectionEnd=a;else if(M.getSelection){if(n=S.createRange(),e.firstChild===V||null===e.firstChild){var s=S.createTextNode("");e.appendChild(s)}n.setStart(e.firstChild,t<e.inputmask._valueGet().length?t:e.inputmask._valueGet().length),n.setEnd(e.firstChild,a<e.inputmask._valueGet().length?a:e.inputmask._valueGet().length),n.collapse(!0);var o=M.getSelection();o.removeAllRanges(),o.addRange(n)}else e.createTextRange&&((n=e.createTextRange()).collapse(!0),n.moveEnd("character",a),n.moveStart("character",t),n.select());renderColorMask(e,{begin:t,end:a})}}}function determineLastRequiredPosition(e){var t,a,i=getMaskTemplate(!0,getLastValidPosition(),!0,!0),n=i.length,r=getLastValidPosition(),s={},o=getMaskSet().validPositions[r],l=o!==V?o.locator.slice():V;for(t=r+1;t<i.length;t++)a=getTestTemplate(t,l,t-1),l=a.locator.slice(),s[t]=L.extend(!0,{},a);var u=o&&o.alternation!==V?o.locator[o.alternation]:V;for(t=n-1;r<t&&((a=s[t]).match.optionality||a.match.optionalQuantifier&&a.match.newBlockMarker||u&&(u!==s[t].locator[o.alternation]&&null!=a.match.fn||null===a.match.fn&&a.locator[o.alternation]&&checkAlternationMatch(a.locator[o.alternation].toString().split(","),u.toString().split(","))&&""!==getTests(t)[0].def))&&i[t]===getPlaceholder(t,a.match);t--)n--;return e?{l:n,def:s[n]?s[n].match:V}:n}function clearOptionalTail(e){for(var t,a=getMaskTemplate(!(e.length=0),0,!0,V,!0);(t=a.shift())!==V;)e.push(t);return e}function isComplete(e){if(L.isFunction(F.isComplete))return F.isComplete(e,F);if("*"===F.repeat)return V;var t=!1,a=determineLastRequiredPosition(!0),i=seekPrevious(a.l);if(a.def===V||a.def.newBlockMarker||a.def.optionality||a.def.optionalQuantifier){t=!0;for(var n=0;n<=i;n++){var r=getTestTemplate(n).match;if(null!==r.fn&&getMaskSet().validPositions[n]===V&&!0!==r.optionality&&!0!==r.optionalQuantifier||null===r.fn&&e[n]!==getPlaceholder(n,r)){t=!1;break}}}return t}function handleRemove(e,t,a,i,n){if((F.numericInput||k)&&(t===Inputmask.keyCode.BACKSPACE?t=Inputmask.keyCode.DELETE:t===Inputmask.keyCode.DELETE&&(t=Inputmask.keyCode.BACKSPACE),k)){var r=a.end;a.end=a.begin,a.begin=r}if(t===Inputmask.keyCode.BACKSPACE&&a.end-a.begin<1?(a.begin=seekPrevious(a.begin),getMaskSet().validPositions[a.begin]!==V&&getMaskSet().validPositions[a.begin].input===F.groupSeparator&&a.begin--):t===Inputmask.keyCode.DELETE&&a.begin===a.end&&(a.end=isMask(a.end,!0)&&getMaskSet().validPositions[a.end]&&getMaskSet().validPositions[a.end].input!==F.radixPoint?a.end+1:seekNext(a.end)+1,getMaskSet().validPositions[a.begin]!==V&&getMaskSet().validPositions[a.begin].input===F.groupSeparator&&a.end++),revalidateMask(a),!0!==i&&!1!==F.keepStatic||null!==F.regex){var s=alternate(!0);if(s){var o=s.caret!==V?s.caret:s.pos?seekNext(s.pos.begin?s.pos.begin:s.pos):getLastValidPosition(-1,!0);(t!==Inputmask.keyCode.DELETE||a.begin>o)&&a.begin}}var l=getLastValidPosition(a.begin,!0);if(l<a.begin||-1===a.begin)getMaskSet().p=seekNext(l);else if(!0!==i&&(getMaskSet().p=a.begin,!0!==n))for(;getMaskSet().p<l&&getMaskSet().validPositions[getMaskSet().p]===V;)getMaskSet().p++}function initializeColorMask(u){var c=(u.ownerDocument.defaultView||M).getComputedStyle(u,null),e=S.createElement("div");e.style.width=c.width,e.style.textAlign=c.textAlign,f=S.createElement("div"),(u.inputmask.colorMask=f).className="im-colormask",u.parentNode.insertBefore(f,u),u.parentNode.removeChild(u),f.appendChild(u),f.appendChild(e),u.style.left=e.offsetLeft+"px",L(f).on("mouseleave",function(e){return v.mouseleaveEvent.call(u,[e])}),L(f).on("mouseenter",function(e){return v.mouseenterEvent.call(u,[e])}),L(f).on("click",function(e){return caret(u,function findCaretPos(e){var t,a=S.createElement("span");for(var i in c)isNaN(i)&&-1!==i.indexOf("font")&&(a.style[i]=c[i]);a.style.textTransform=c.textTransform,a.style.letterSpacing=c.letterSpacing,a.style.position="absolute",a.style.height="auto",a.style.width="auto",a.style.visibility="hidden",a.style.whiteSpace="nowrap",S.body.appendChild(a);var n,r=u.inputmask._valueGet(),s=0;for(t=0,n=r.length;t<=n;t++){if(a.innerHTML+=r.charAt(t)||"_",a.offsetWidth>=e){var o=e-s,l=a.offsetWidth-e;a.innerHTML=r.charAt(t),o-=a.offsetWidth/3,t=o<l?t-1:t;break}s=a.offsetWidth}return S.body.removeChild(a),t}(e.clientX)),v.clickEvent.call(u,[e])})}function renderColorMask(e,t,a){var i,n,r,s=[],o=!1,l=0;function setEntry(e){if(e===V&&(e=""),o||null!==i.fn&&n.input!==V)if(o&&(null!==i.fn&&n.input!==V||""===i.def)){o=!1;var t=s.length;s[t-1]=s[t-1]+"</span>",s.push(e)}else s.push(e);else o=!0,s.push("<span class='im-static'>"+e)}if(f!==V){var u=getBuffer();if(t===V?t=caret(e):t.begin===V&&(t={begin:t,end:t}),!0!==a){for(var c=getLastValidPosition();getMaskSet().validPositions[l]?(n=getMaskSet().validPositions[l],i=n.match,r=n.locator.slice(),setEntry(u[l])):(n=getTestTemplate(l,r,l-1),i=n.match,r=n.locator.slice(),!1===F.jitMasking||l<c||"number"==typeof F.jitMasking&&isFinite(F.jitMasking)&&F.jitMasking>l?setEntry(getPlaceholder(l,i)):o=!1),l++,(m===V||l<m)&&(null!==i.fn||""!==i.def)||l<c||o;);o&&setEntry(),function setCaret(){S.activeElement===e&&(s.splice(t.begin,0,t.begin===t.end||t.end>getMaskSet().maskLength?'<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">':'<mark class="im-caret-select">'),s.splice(t.end+1,0,"</mark>"))}()}var p=f.getElementsByTagName("div")[0];p.innerHTML=s.join(""),e.inputmask.positionColorMask(e,p)}}if(Inputmask.prototype.positionColorMask=function(e,t){e.style.left=t.offsetLeft+"px"},e!==V)switch(e.action){case"isComplete":return l=e.el,isComplete(getBuffer());case"unmaskedvalue":return l!==V&&e.value===V||(a=e.value,a=(L.isFunction(F.onBeforeMask)&&F.onBeforeMask.call(u,a,F)||a).split(""),checkVal.call(this,V,!1,!1,a),L.isFunction(F.onBeforeWrite)&&F.onBeforeWrite.call(u,V,getBuffer(),0,F)),unmaskedvalue(l);case"mask":!function mask(e){function isElementTypeSupported(e,r){function patchValueProperty(e){var t,a,i;function patchValhook(e){if(L.valHooks&&(L.valHooks[e]===V||!0!==L.valHooks[e].inputmaskpatch)){var a=L.valHooks[e]&&L.valHooks[e].get?L.valHooks[e].get:function(e){return e.value},n=L.valHooks[e]&&L.valHooks[e].set?L.valHooks[e].set:function(e,t){return e.value=t,e};L.valHooks[e]={get:function get(e){if(e.inputmask){if(e.inputmask.opts.autoUnmask)return e.inputmask.unmaskedvalue();var t=a(e);return-1!==getLastValidPosition(V,V,e.inputmask.maskset.validPositions)||!0!==r.nullable?t:""}return a(e)},set:function set(e,t){var a,i=L(e);return a=n(e,t),e.inputmask&&i.trigger("setvalue",[t]),a},inputmaskpatch:!0}}}function getter(){return this.inputmask?this.inputmask.opts.autoUnmask?this.inputmask.unmaskedvalue():-1!==getLastValidPosition()||!0!==r.nullable?S.activeElement===this&&r.clearMaskOnLostFocus?(k?clearOptionalTail(getBuffer().slice()).reverse():clearOptionalTail(getBuffer().slice())).join(""):t.call(this):"":t.call(this)}function setter(e){a.call(this,e),this.inputmask&&L(this).trigger("setvalue",[e])}if(!e.inputmask.__valueGet){if(!0!==r.noValuePatching){if(Object.getOwnPropertyDescriptor){"function"!=typeof Object.getPrototypeOf&&(Object.getPrototypeOf="object"===T("test".__proto__)?function(e){return e.__proto__}:function(e){return e.constructor.prototype});var n=Object.getPrototypeOf?Object.getOwnPropertyDescriptor(Object.getPrototypeOf(e),"value"):V;n&&n.get&&n.set?(t=n.get,a=n.set,Object.defineProperty(e,"value",{get:getter,set:setter,configurable:!0})):"INPUT"!==e.tagName&&(t=function valueGet(){return this.textContent},a=function valueSet(e){this.textContent=e},Object.defineProperty(e,"value",{get:getter,set:setter,configurable:!0}))}else S.__lookupGetter__&&e.__lookupGetter__("value")&&(t=e.__lookupGetter__("value"),a=e.__lookupSetter__("value"),e.__defineGetter__("value",getter),e.__defineSetter__("value",setter));e.inputmask.__valueGet=t,e.inputmask.__valueSet=a}e.inputmask._valueGet=function(e){return k&&!0!==e?t.call(this.el).split("").reverse().join(""):t.call(this.el)},e.inputmask._valueSet=function(e,t){a.call(this.el,null===e||e===V?"":!0!==t&&k?e.split("").reverse().join(""):e)},t===V&&(t=function valueGet(){return this.value},a=function valueSet(e){this.value=e},patchValhook(e.type),i=e,o.on(i,"mouseenter",function(e){var t=L(this),a=this.inputmask._valueGet();a!==getBuffer().join("")&&t.trigger("setvalue")}))}}var t=e.getAttribute("type"),a="INPUT"===e.tagName&&-1!==L.inArray(t,r.supportsInputType)||e.isContentEditable||"TEXTAREA"===e.tagName;if(!a)if("INPUT"===e.tagName){var i=S.createElement("input");i.setAttribute("type",t),a="text"===i.type,i=null}else a="partial";return!1!==a?patchValueProperty(e):e.inputmask=V,a}o.off(e);var t=isElementTypeSupported(e,F);if(!1!==t&&(n=L(l=e),r=l.placeholder,-1===(m=l!==V?l.maxLength:V)&&(m=V),!0===F.colorMask&&initializeColorMask(l),P&&("inputmode"in l&&(l.inputmode=F.inputmode,l.setAttribute("inputmode",F.inputmode)),!0===F.disablePredictiveText&&("autocorrect"in l?l.autocorrect=!1:(!0!==F.colorMask&&initializeColorMask(l),l.type="password"))),!0===t&&(l.setAttribute("im-insert",F.insertMode),o.on(l,"submit",v.submitEvent),o.on(l,"reset",v.resetEvent),o.on(l,"blur",v.blurEvent),o.on(l,"focus",v.focusEvent),!0!==F.colorMask&&(o.on(l,"click",v.clickEvent),o.on(l,"mouseleave",v.mouseleaveEvent),o.on(l,"mouseenter",v.mouseenterEvent)),o.on(l,"paste",v.pasteEvent),o.on(l,"cut",v.cutEvent),o.on(l,"complete",F.oncomplete),o.on(l,"incomplete",F.onincomplete),o.on(l,"cleared",F.oncleared),P||!0===F.inputEventOnly?l.removeAttribute("maxLength"):(o.on(l,"keydown",v.keydownEvent),o.on(l,"keypress",v.keypressEvent)),o.on(l,"input",v.inputFallBackEvent),o.on(l,"beforeinput",v.beforeInputEvent)),o.on(l,"setvalue",v.setValueEvent),d=getBufferTemplate().join(""),""!==l.inputmask._valueGet(!0)||!1===F.clearMaskOnLostFocus||S.activeElement===l)){var a=L.isFunction(F.onBeforeMask)&&F.onBeforeMask.call(u,l.inputmask._valueGet(!0),F)||l.inputmask._valueGet(!0);""!==a&&checkVal(l,!0,!1,a.split(""));var i=getBuffer().slice();d=i.join(""),!1===isComplete(i)&&F.clearIncomplete&&resetMaskSet(),F.clearMaskOnLostFocus&&S.activeElement!==l&&(-1===getLastValidPosition()?i=[]:clearOptionalTail(i)),(!1===F.clearMaskOnLostFocus||F.showMaskOnFocus&&S.activeElement===l||""!==l.inputmask._valueGet(!0))&&writeBuffer(l,i),S.activeElement===l&&caret(l,seekNext(getLastValidPosition()))}}(l);break;case"format":return a=(L.isFunction(F.onBeforeMask)&&F.onBeforeMask.call(u,e.value,F)||e.value).split(""),checkVal.call(this,V,!0,!1,a),e.metadata?{value:k?getBuffer().slice().reverse().join(""):getBuffer().join(""),metadata:maskScope.call(this,{action:"getmetadata"},t,F)}:k?getBuffer().slice().reverse().join(""):getBuffer().join("");case"isValid":e.value?(a=e.value.split(""),checkVal.call(this,V,!0,!0,a)):e.value=getBuffer().join("");for(var p=getBuffer(),g=determineLastRequiredPosition(),y=p.length-1;g<y&&!isMask(y);y--);return p.splice(g,y+1-g),isComplete(p)&&e.value===getBuffer().join("");case"getemptymask":return getBufferTemplate().join("");case"remove":return l&&l.inputmask&&(L.data(l,"_inputmask_opts",null),n=L(l),l.inputmask._valueSet(F.autoUnmask?unmaskedvalue(l):l.inputmask._valueGet(!0)),o.off(l),l.inputmask.colorMask&&((f=l.inputmask.colorMask).removeChild(l),f.parentNode.insertBefore(l,f),f.parentNode.removeChild(f)),Object.getOwnPropertyDescriptor&&Object.getPrototypeOf?Object.getOwnPropertyDescriptor(Object.getPrototypeOf(l),"value")&&l.inputmask.__valueGet&&Object.defineProperty(l,"value",{get:l.inputmask.__valueGet,set:l.inputmask.__valueSet,configurable:!0}):S.__lookupGetter__&&l.__lookupGetter__("value")&&l.inputmask.__valueGet&&(l.__defineGetter__("value",l.inputmask.__valueGet),l.__defineSetter__("value",l.inputmask.__valueSet)),l.inputmask=V),l;case"getmetadata":if(L.isArray(t.metadata)){var b=getMaskTemplate(!0,0,!1).join("");return L.each(t.metadata,function(e,t){if(t.mask===b)return b=t,!1}),b}return t.metadata}}return Inputmask.prototype={dataAttribute:"data-inputmask",defaults:{placeholder:"_",optionalmarker:["[","]"],quantifiermarker:["{","}"],groupmarker:["(",")"],alternatormarker:"|",escapeChar:"\\",mask:null,regex:null,oncomplete:L.noop,onincomplete:L.noop,oncleared:L.noop,repeat:0,greedy:!1,autoUnmask:!1,removeMaskOnSubmit:!1,clearMaskOnLostFocus:!0,insertMode:!0,clearIncomplete:!1,alias:null,onKeyDown:L.noop,onBeforeMask:null,onBeforePaste:function onBeforePaste(e,t){return L.isFunction(t.onBeforeMask)?t.onBeforeMask.call(this,e,t):e},onBeforeWrite:null,onUnMask:null,showMaskOnFocus:!0,showMaskOnHover:!0,onKeyValidation:L.noop,skipOptionalPartCharacter:" ",numericInput:!1,rightAlign:!1,undoOnEscape:!0,radixPoint:"",_radixDance:!1,groupSeparator:"",keepStatic:null,positionCaretOnTab:!0,tabThrough:!1,supportsInputType:["text","tel","password","search"],ignorables:[8,9,13,19,27,33,34,35,36,37,38,39,40,45,46,93,112,113,114,115,116,117,118,119,120,121,122,123,0,229],isComplete:null,preValidation:null,postValidation:null,staticDefinitionSymbol:V,jitMasking:!1,nullable:!0,inputEventOnly:!1,noValuePatching:!1,positionCaretOnClick:"lvp",casing:null,inputmode:"verbatim",colorMask:!1,disablePredictiveText:!1,importDataAttributes:!0,shiftPositions:!0},definitions:{9:{validator:"[0-9\uff11-\uff19]",definitionSymbol:"*"},a:{validator:"[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",definitionSymbol:"*"},"*":{validator:"[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]"}},aliases:{},masksCache:{},mask:function mask(e){var n=this;return"string"==typeof e&&(e=S.getElementById(e)||S.querySelectorAll(e)),e=e.nodeName?[e]:e,L.each(e,function(e,t){var a=L.extend(!0,{},n.opts);if(function importAttributeOptions(a,e,i,n){if(!0===e.importDataAttributes){var t,r,s,o,l=function importOption(e,t){null!==(t=t!==V?t:a.getAttribute(n+"-"+e))&&("string"==typeof t&&(0===e.indexOf("on")?t=M[t]:"false"===t?t=!1:"true"===t&&(t=!0)),i[e]=t)},u=a.getAttribute(n);if(u&&""!==u&&(u=u.replace(/'/g,'"'),r=JSON.parse("{"+u+"}")),r)for(o in s=V,r)if("alias"===o.toLowerCase()){s=r[o];break}for(t in l("alias",s),i.alias&&resolveAlias(i.alias,i,e),e){if(r)for(o in s=V,r)if(o.toLowerCase()===t.toLowerCase()){s=r[o];break}l(t,s)}}return L.extend(!0,e,i),("rtl"===a.dir||e.rightAlign)&&(a.style.textAlign="right"),("rtl"===a.dir||e.numericInput)&&(a.dir="ltr",a.removeAttribute("dir"),e.isRTL=!0),Object.keys(i).length}(t,a,L.extend(!0,{},n.userOptions),n.dataAttribute)){var i=generateMaskSet(a,n.noMasksCache);i!==V&&(t.inputmask!==V&&(t.inputmask.opts.autoUnmask=!0,t.inputmask.remove()),t.inputmask=new Inputmask(V,V,!0),t.inputmask.opts=a,t.inputmask.noMasksCache=n.noMasksCache,t.inputmask.userOptions=L.extend(!0,{},n.userOptions),t.inputmask.isRTL=a.isRTL||a.numericInput,(t.inputmask.el=t).inputmask.maskset=i,L.data(t,"_inputmask_opts",a),maskScope.call(t.inputmask,{action:"mask"}))}}),e&&e[0]&&e[0].inputmask||this},option:function option(e,t){return"string"==typeof e?this.opts[e]:"object"===(void 0===e?"undefined":T(e))?(L.extend(this.userOptions,e),this.el&&!0!==t&&this.mask(this.el),this):void 0},unmaskedvalue:function unmaskedvalue(e){return this.maskset=this.maskset||generateMaskSet(this.opts,this.noMasksCache),maskScope.call(this,{action:"unmaskedvalue",value:e})},remove:function remove(){return maskScope.call(this,{action:"remove"})},getemptymask:function getemptymask(){return this.maskset=this.maskset||generateMaskSet(this.opts,this.noMasksCache),maskScope.call(this,{action:"getemptymask"})},hasMaskedValue:function hasMaskedValue(){return!this.opts.autoUnmask},isComplete:function isComplete(){return this.maskset=this.maskset||generateMaskSet(this.opts,this.noMasksCache),maskScope.call(this,{action:"isComplete"})},getmetadata:function getmetadata(){return this.maskset=this.maskset||generateMaskSet(this.opts,this.noMasksCache),maskScope.call(this,{action:"getmetadata"})},isValid:function isValid(e){return this.maskset=this.maskset||generateMaskSet(this.opts,this.noMasksCache),maskScope.call(this,{action:"isValid",value:e})},format:function format(e,t){return this.maskset=this.maskset||generateMaskSet(this.opts,this.noMasksCache),maskScope.call(this,{action:"format",value:e,metadata:t})},setValue:function setValue(e){this.el&&L(this.el).trigger("setvalue",[e])},analyseMask:function analyseMask(e,r,s){var t,a,i,n,o,l,u=/(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?(?:\|[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,c=/\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,p=!1,f=new MaskToken,g=[],m=[];function MaskToken(e,t,a,i){this.matches=[],this.openGroup=e||!1,this.alternatorGroup=!1,this.isGroup=e||!1,this.isOptional=t||!1,this.isQuantifier=a||!1,this.isAlternator=i||!1,this.quantifier={min:1,max:1}}function insertTestDefinition(a,e,i){i=i!==V?i:a.matches.length;var n=a.matches[i-1];if(r)0===e.indexOf("[")||p&&/\\d|\\s|\\w]/i.test(e)||"."===e?a.matches.splice(i++,0,{fn:new RegExp(e,s.casing?"i":""),optionality:!1,newBlockMarker:n===V?"master":n.def!==e,casing:null,def:e,placeholder:V,nativeDef:e}):(p&&(e=e[e.length-1]),L.each(e.split(""),function(e,t){n=a.matches[i-1],a.matches.splice(i++,0,{fn:null,optionality:!1,newBlockMarker:n===V?"master":n.def!==t&&null!==n.fn,casing:null,def:s.staticDefinitionSymbol||t,placeholder:s.staticDefinitionSymbol!==V?t:V,nativeDef:(p?"'":"")+t})})),p=!1;else{var t=(s.definitions?s.definitions[e]:V)||Inputmask.prototype.definitions[e];t&&!p?a.matches.splice(i++,0,{fn:t.validator?"string"==typeof t.validator?new RegExp(t.validator,s.casing?"i":""):new function(){this.test=t.validator}:new RegExp("."),optionality:!1,newBlockMarker:n===V?"master":n.def!==(t.definitionSymbol||e),casing:t.casing,def:t.definitionSymbol||e,placeholder:t.placeholder,nativeDef:e}):(a.matches.splice(i++,0,{fn:null,optionality:!1,newBlockMarker:n===V?"master":n.def!==e&&null!==n.fn,casing:null,def:s.staticDefinitionSymbol||e,placeholder:s.staticDefinitionSymbol!==V?e:V,nativeDef:(p?"'":"")+e}),p=!1)}}function defaultCase(){if(0<g.length){if(insertTestDefinition(n=g[g.length-1],a),n.isAlternator){o=g.pop();for(var e=0;e<o.matches.length;e++)o.matches[e].isGroup&&(o.matches[e].isGroup=!1);0<g.length?(n=g[g.length-1]).matches.push(o):f.matches.push(o)}}else insertTestDefinition(f,a)}function groupify(e){var t=new MaskToken(!0);return t.openGroup=!1,t.matches=e,t}for(r&&(s.optionalmarker[0]=V,s.optionalmarker[1]=V);t=r?c.exec(e):u.exec(e);){if(a=t[0],r)switch(a.charAt(0)){case"?":a="{0,1}";break;case"+":case"*":a="{"+a+"}"}if(p)defaultCase();else switch(a.charAt(0)){case"(?=":case"(?!":case"(?<=":case"(?<!":break;case s.escapeChar:p=!0,r&&defaultCase();break;case s.optionalmarker[1]:case s.groupmarker[1]:if((i=g.pop()).openGroup=!1,i!==V)if(0<g.length){if((n=g[g.length-1]).matches.push(i),n.isAlternator){o=g.pop();for(var d=0;d<o.matches.length;d++)o.matches[d].isGroup=!1,o.matches[d].alternatorGroup=!1;0<g.length?(n=g[g.length-1]).matches.push(o):f.matches.push(o)}}else f.matches.push(i);else defaultCase();break;case s.optionalmarker[0]:g.push(new MaskToken(!1,!0));break;case s.groupmarker[0]:g.push(new MaskToken(!0));break;case s.quantifiermarker[0]:var k=new MaskToken(!1,!1,!0),h=(a=a.replace(/[{}]/g,"")).split("|"),v=h[0].split(","),y=isNaN(v[0])?v[0]:parseInt(v[0]),b=1===v.length?y:isNaN(v[1])?v[1]:parseInt(v[1]);"*"!==y&&"+"!==y||(y="*"===b?0:1),k.quantifier={min:y,max:b,jit:h[1]};var M=0<g.length?g[g.length-1].matches:f.matches;if((t=M.pop()).isAlternator){M.push(t),M=t.matches;var S=new MaskToken(!0),x=M.pop();M.push(S),M=S.matches,t=x}t.isGroup||(t=groupify([t])),M.push(t),M.push(k);break;case s.alternatormarker:var P=function groupQuantifier(e){var t=e.pop();return t.isQuantifier&&(t=groupify([e.pop(),t])),t};if(0<g.length){var _=(n=g[g.length-1]).matches[n.matches.length-1];l=n.openGroup&&(_.matches===V||!1===_.isGroup&&!1===_.isAlternator)?g.pop():P(n.matches)}else l=P(f.matches);if(l.isAlternator)g.push(l);else if(l.alternatorGroup?(o=g.pop(),l.alternatorGroup=!1):o=new MaskToken(!1,!1,!1,!0),o.matches.push(l),g.push(o),l.openGroup){var E=new MaskToken(!(l.openGroup=!1));E.alternatorGroup=!0,g.push(E)}break;default:defaultCase()}}for(;0<g.length;)i=g.pop(),f.matches.push(i);return 0<f.matches.length&&(function verifyGroupMarker(i){i&&i.matches&&L.each(i.matches,function(e,t){var a=i.matches[e+1];(a===V||a.matches===V||!1===a.isQuantifier)&&t&&t.isGroup&&(t.isGroup=!1,r||(insertTestDefinition(t,s.groupmarker[0],0),!0!==t.openGroup&&insertTestDefinition(t,s.groupmarker[1]))),verifyGroupMarker(t)})}(f),m.push(f)),(s.numericInput||s.isRTL)&&function reverseTokens(e){for(var t in e.matches=e.matches.reverse(),e.matches)if(e.matches.hasOwnProperty(t)){var a=parseInt(t);if(e.matches[t].isQuantifier&&e.matches[a+1]&&e.matches[a+1].isGroup){var i=e.matches[t];e.matches.splice(t,1),e.matches.splice(a+1,0,i)}e.matches[t].matches!==V?e.matches[t]=reverseTokens(e.matches[t]):e.matches[t]=((n=e.matches[t])===s.optionalmarker[0]?n=s.optionalmarker[1]:n===s.optionalmarker[1]?n=s.optionalmarker[0]:n===s.groupmarker[0]?n=s.groupmarker[1]:n===s.groupmarker[1]&&(n=s.groupmarker[0]),n)}var n;return e}(m[0]),m}},Inputmask.extendDefaults=function(e){L.extend(!0,Inputmask.prototype.defaults,e)},Inputmask.extendDefinitions=function(e){L.extend(!0,Inputmask.prototype.definitions,e)},Inputmask.extendAliases=function(e){L.extend(!0,Inputmask.prototype.aliases,e)},Inputmask.format=function(e,t,a){return Inputmask(t).format(e,a)},Inputmask.unmask=function(e,t){return Inputmask(t).unmaskedvalue(e)},Inputmask.isValid=function(e,t){return Inputmask(t).isValid(e)},Inputmask.remove=function(e){"string"==typeof e&&(e=S.getElementById(e)||S.querySelectorAll(e)),e=e.nodeName?[e]:e,L.each(e,function(e,t){t.inputmask&&t.inputmask.remove()})},Inputmask.setValue=function(e,a){"string"==typeof e&&(e=S.getElementById(e)||S.querySelectorAll(e)),e=e.nodeName?[e]:e,L.each(e,function(e,t){t.inputmask?t.inputmask.setValue(a):L(t).trigger("setvalue",[a])})},Inputmask.escapeRegex=function(e){return e.replace(new RegExp("(\\"+["/",".","*","+","?","|","(",")","[","]","{","}","\\","$","^"].join("|\\")+")","gim"),"\\$1")},Inputmask.keyCode={BACKSPACE:8,BACKSPACE_SAFARI:127,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,RIGHT:39,SPACE:32,TAB:9,UP:38,X:88,CONTROL:17},Inputmask.dependencyLib=L,M.Inputmask=Inputmask}(a(4),a(6))},function(e,t,a){"use strict";e.exports=a(5)},function(e,t){e.exports=__WEBPACK_EXTERNAL_MODULE__5__},function(module,exports,__webpack_require__){"use strict";var __WEBPACK_AMD_DEFINE_RESULT__,_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};__WEBPACK_AMD_DEFINE_RESULT__=function(){return"undefined"!=typeof window?window:new(eval("require('jsdom').JSDOM"))("").window}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)},function(e,t,a){"use strict";var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=a(3),l=o.dependencyLib,c={d:["[1-9]|[12][0-9]|3[01]",Date.prototype.setDate,"day",Date.prototype.getDate],dd:["0[1-9]|[12][0-9]|3[01]",Date.prototype.setDate,"day",function(){return pad(Date.prototype.getDate.call(this),2)}],ddd:[""],dddd:[""],m:["[1-9]|1[012]",Date.prototype.setMonth,"month",function(){return Date.prototype.getMonth.call(this)+1}],mm:["0[1-9]|1[012]",Date.prototype.setMonth,"month",function(){return pad(Date.prototype.getMonth.call(this)+1,2)}],mmm:[""],mmmm:[""],yy:["[0-9]{2}",Date.prototype.setFullYear,"year",function(){return pad(Date.prototype.getFullYear.call(this),2)}],yyyy:["[0-9]{4}",Date.prototype.setFullYear,"year",function(){return pad(Date.prototype.getFullYear.call(this),4)}],h:["[1-9]|1[0-2]",Date.prototype.setHours,"hours",Date.prototype.getHours],hh:["0[1-9]|1[0-2]",Date.prototype.setHours,"hours",function(){return pad(Date.prototype.getHours.call(this),2)}],hhh:["[0-9]+",Date.prototype.setHours,"hours",Date.prototype.getHours],H:["1?[0-9]|2[0-3]",Date.prototype.setHours,"hours",Date.prototype.getHours],HH:["[01][0-9]|2[0-3]",Date.prototype.setHours,"hours",function(){return pad(Date.prototype.getHours.call(this),2)}],HHH:["[0-9]+",Date.prototype.setHours,"hours",Date.prototype.getHours],M:["[1-5]?[0-9]",Date.prototype.setMinutes,"minutes",Date.prototype.getMinutes],MM:["[0-5][0-9]",Date.prototype.setMinutes,"minutes",function(){return pad(Date.prototype.getMinutes.call(this),2)}],s:["[1-5]?[0-9]",Date.prototype.setSeconds,"seconds",Date.prototype.getSeconds],ss:["[0-5][0-9]",Date.prototype.setSeconds,"seconds",function(){return pad(Date.prototype.getSeconds.call(this),2)}],l:["[0-9]{3}",Date.prototype.setMilliseconds,"milliseconds",function(){return pad(Date.prototype.getMilliseconds.call(this),3)}],L:["[0-9]{2}",Date.prototype.setMilliseconds,"milliseconds",function(){return pad(Date.prototype.getMilliseconds.call(this),2)}],t:["[ap]"],tt:["[ap]m"],T:["[AP]"],TT:["[AP]M"],Z:[""],o:[""],S:[""]},i={isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};function getTokenizer(e){if(!e.tokenizer){var t=[];for(var a in c)-1===t.indexOf(a[0])&&t.push(a[0]);e.tokenizer="("+t.join("+|")+")+?|.",e.tokenizer=new RegExp(e.tokenizer,"g")}return e.tokenizer}function parse(e,t,a,i){for(var n,r="";n=getTokenizer(a).exec(e);){if(void 0===t)if(c[n[0]])r+="("+c[n[0]][0]+")";else switch(n[0]){case"[":r+="(";break;case"]":r+=")?";break;default:r+=o.escapeRegex(n[0])}else if(c[n[0]])if(!0!==i&&c[n[0]][3])r+=c[n[0]][3].call(t.date);else c[n[0]][2]?r+=t["raw"+c[n[0]][2]]:r+=n[0];else r+=n[0]}return r}function pad(e,t){for(e=String(e),t=t||2;e.length<t;)e="0"+e;return e}function analyseMask(e,t,r){var s,a,i,n={date:new Date(1,0,1)},o=e;function setValue(e,t,a){e[s]=function extendProperty(e){var t=e.replace(/[^0-9]/g,"0");if(t!=e){var a=e.replace(/[^0-9]/g,""),i=(r.min&&r.min[s]||e).toString(),n=(r.max&&r.max[s]||e).toString();t=a+(a<i.slice(0,a.length)?i.slice(a.length):a>n.slice(0,a.length)?n.slice(a.length):t.toString().slice(a.length))}return t}(t),e["raw"+s]=t,void 0!==i&&i.call(e.date,"month"==s?parseInt(e[s])-1:e[s])}if("string"==typeof o){for(;a=getTokenizer(r).exec(t);){var l=o.slice(0,a[0].length);c.hasOwnProperty(a[0])&&(c[a[0]][0],s=c[a[0]][2],i=c[a[0]][1],setValue(n,l)),o=o.slice(l.length)}return n}if(o&&"object"===(void 0===o?"undefined":u(o))&&o.hasOwnProperty("date"))return o}o.extendAliases({datetime:{mask:function mask(e){return c.S=e.i18n.ordinalSuffix.join("|"),e.inputFormat=i[e.inputFormat]||e.inputFormat,e.displayFormat=i[e.displayFormat]||e.displayFormat||e.inputFormat,e.outputFormat=i[e.outputFormat]||e.outputFormat||e.inputFormat,e.placeholder=""!==e.placeholder?e.placeholder:e.inputFormat.replace(/[\[\]]/,""),e.regex=parse(e.inputFormat,void 0,e),null},placeholder:"",inputFormat:"isoDateTime",displayFormat:void 0,outputFormat:void 0,min:null,max:null,i18n:{dayNames:["Mon","Tue","Wed","Thu","Fri","Sat","Sun","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],ordinalSuffix:["st","nd","rd","th"]},postValidation:function postValidation(e,t,a,i){i.min=analyseMask(i.min,i.inputFormat,i),i.max=analyseMask(i.max,i.inputFormat,i);var n=a,r=analyseMask(e.join(""),i.inputFormat,i);return n&&r.date.getTime()==r.date.getTime()&&(n=(n=function isValidDate(e,t){return(!isFinite(e.rawday)||"29"==e.day&&!isFinite(e.rawyear)||new Date(e.date.getFullYear(),isFinite(e.rawmonth)?e.month:e.date.getMonth()+1,0).getDate()>=e.day)&&t}(r,n))&&function isDateInRange(e,t){var a=!0;if(t.min){if(e.rawyear){var i=e.rawyear.replace(/[^0-9]/g,"");a=t.min.year.substr(0,i.length)<=i}e.year===e.rawyear&&t.min.date.getTime()==t.min.date.getTime()&&(a=t.min.date.getTime()<=e.date.getTime())}return a&&t.max&&t.max.date.getTime()==t.max.date.getTime()&&(a=t.max.date.getTime()>=e.date.getTime()),a}(r,i)),t&&n&&a.pos!==t?{buffer:parse(i.inputFormat,r,i),refreshFromBuffer:{start:t,end:a.pos}}:n},onKeyDown:function onKeyDown(e,t,a,i){if(e.ctrlKey&&e.keyCode===o.keyCode.RIGHT){for(var n,r=new Date,s="";n=getTokenizer(i).exec(i.inputFormat);)"d"===n[0].charAt(0)?s+=pad(r.getDate(),n[0].length):"m"===n[0].charAt(0)?s+=pad(r.getMonth()+1,n[0].length):"yyyy"===n[0]?s+=r.getFullYear().toString():"y"===n[0].charAt(0)&&(s+=pad(r.getYear(),n[0].length));this.inputmask._valueSet(s),l(this).trigger("setvalue")}},onUnMask:function onUnMask(e,t,a){return parse(a.outputFormat,analyseMask(e,a.inputFormat,a),a,!0)},casing:function casing(e,t,a,i){return 0==t.nativeDef.indexOf("[ap]")?e.toLowerCase():0==t.nativeDef.indexOf("[AP]")?e.toUpperCase():e},insertMode:!1,shiftPositions:!1}}),e.exports=o},function(e,t,a){"use strict";var k=a(3),h=k.dependencyLib;function autoEscape(e,t){for(var a="",i=0;i<e.length;i++)k.prototype.definitions[e.charAt(i)]||t.definitions[e.charAt(i)]||t.optionalmarker.start===e.charAt(i)||t.optionalmarker.end===e.charAt(i)||t.quantifiermarker.start===e.charAt(i)||t.quantifiermarker.end===e.charAt(i)||t.groupmarker.start===e.charAt(i)||t.groupmarker.end===e.charAt(i)||t.alternatormarker===e.charAt(i)?a+="\\"+e.charAt(i):a+=e.charAt(i);return a}k.extendAliases({numeric:{mask:function mask(e){if(0!==e.repeat&&isNaN(e.integerDigits)&&(e.integerDigits=e.repeat),e.repeat=0,e.groupSeparator===e.radixPoint&&e.digits&&"0"!==e.digits&&("."===e.radixPoint?e.groupSeparator=",":","===e.radixPoint?e.groupSeparator=".":e.groupSeparator="")," "===e.groupSeparator&&(e.skipOptionalPartCharacter=void 0),e.autoGroup=e.autoGroup&&""!==e.groupSeparator,e.autoGroup&&("string"==typeof e.groupSize&&isFinite(e.groupSize)&&(e.groupSize=parseInt(e.groupSize)),isFinite(e.integerDigits))){var t=Math.floor(e.integerDigits/e.groupSize),a=e.integerDigits%e.groupSize;e.integerDigits=parseInt(e.integerDigits)+(0===a?t-1:t),e.integerDigits<1&&(e.integerDigits="*")}1<e.placeholder.length&&(e.placeholder=e.placeholder.charAt(0)),"radixFocus"===e.positionCaretOnClick&&""===e.placeholder&&!1===e.integerOptional&&(e.positionCaretOnClick="lvp"),e.definitions[";"]=e.definitions["~"],e.definitions[";"].definitionSymbol="~",!0===e.numericInput&&(e.positionCaretOnClick="radixFocus"===e.positionCaretOnClick?"lvp":e.positionCaretOnClick,e.digitsOptional=!1,isNaN(e.digits)&&(e.digits=2),e.decimalProtect=!1);var mask="[+]";if(mask+=autoEscape(e.prefix,e),!0===e.integerOptional?mask+="~{1,"+e.integerDigits+"}":mask+="~{"+e.integerDigits+"}",void 0!==e.digits){var i=e.decimalProtect?":":e.radixPoint,n=e.digits.toString().split(",");isFinite(n[0])&&n[1]&&isFinite(n[1])?mask+=i+";{"+e.digits+"}":(isNaN(e.digits)||0<parseInt(e.digits))&&(e.digitsOptional?mask+="["+i+";{1,"+e.digits+"}]":mask+=i+";{"+e.digits+"}")}return mask+=autoEscape(e.suffix,e),mask+="[-]",e.greedy=!1,mask},placeholder:"",greedy:!1,digits:"*",digitsOptional:!0,enforceDigitsOnBlur:!1,radixPoint:".",positionCaretOnClick:"radixFocus",groupSize:3,groupSeparator:"",autoGroup:!1,allowMinus:!0,negationSymbol:{front:"-",back:""},integerDigits:"+",integerOptional:!0,prefix:"",suffix:"",rightAlign:!0,decimalProtect:!0,min:null,max:null,step:1,insertMode:!0,autoUnmask:!1,unmaskAsNumber:!1,inputType:"text",inputmode:"numeric",preValidation:function preValidation(e,t,a,i,n,r){if("-"===a||a===n.negationSymbol.front)return!0===n.allowMinus&&(n.isNegative=void 0===n.isNegative||!n.isNegative,""===e.join("")||{caret:r.validPositions[t]?t:void 0,dopost:!0});if(!1===i&&a===n.radixPoint&&void 0!==n.digits&&(isNaN(n.digits)||0<parseInt(n.digits))){var s=h.inArray(n.radixPoint,e);if(-1!==s&&void 0!==r.validPositions[s])return!0===n.numericInput?t===s:{caret:s+1}}return!0},postValidation:function postValidation(e,t,a,i){var n=i.suffix.split(""),r=i.prefix.split("");if(void 0===a.pos&&void 0!==a.caret&&!0!==a.dopost)return a;var s=void 0!==a.caret?a.caret:a.pos,o=e.slice();i.numericInput&&(s=o.length-s-1,o=o.reverse());var l=o[s];if(l===i.groupSeparator&&(l=o[s+=1]),s===o.length-i.suffix.length-1&&l===i.radixPoint)return a;void 0!==l&&l!==i.radixPoint&&l!==i.negationSymbol.front&&l!==i.negationSymbol.back&&(o[s]="?",0<i.prefix.length&&s>=(!1===i.isNegative?1:0)&&s<i.prefix.length-1+(!1===i.isNegative?1:0)?r[s-(!1===i.isNegative?1:0)]="?":0<i.suffix.length&&s>=o.length-i.suffix.length-(!1===i.isNegative?1:0)&&(n[s-(o.length-i.suffix.length-(!1===i.isNegative?1:0))]="?")),r=r.join(""),n=n.join("");var u=o.join("").replace(r,"");if(u=(u=(u=(u=u.replace(n,"")).replace(new RegExp(k.escapeRegex(i.groupSeparator),"g"),"")).replace(new RegExp("[-"+k.escapeRegex(i.negationSymbol.front)+"]","g"),"")).replace(new RegExp(k.escapeRegex(i.negationSymbol.back)+"$"),""),isNaN(i.placeholder)&&(u=u.replace(new RegExp(k.escapeRegex(i.placeholder),"g"),"")),1<u.length&&1!==u.indexOf(i.radixPoint)&&("0"===l&&(u=u.replace(/^\?/g,"")),u=u.replace(/^0/g,"")),u.charAt(0)===i.radixPoint&&""!==i.radixPoint&&!0!==i.numericInput&&(u="0"+u),""!==u){if(u=u.split(""),(!i.digitsOptional||i.enforceDigitsOnBlur&&"blur"===a.event)&&isFinite(i.digits)){var c=h.inArray(i.radixPoint,u),p=h.inArray(i.radixPoint,o);-1===c&&(u.push(i.radixPoint),c=u.length-1);for(var f=1;f<=i.digits;f++)i.digitsOptional&&(!i.enforceDigitsOnBlur||"blur"!==a.event)||void 0!==u[c+f]&&u[c+f]!==i.placeholder.charAt(0)?-1!==p&&void 0!==o[p+f]&&(u[c+f]=u[c+f]||o[p+f]):u[c+f]=a.placeholder||i.placeholder.charAt(0)}if(!0!==i.autoGroup||""===i.groupSeparator||l===i.radixPoint&&void 0===a.pos&&!a.dopost)u=u.join("");else{var g=u[u.length-1]===i.radixPoint&&a.c===i.radixPoint;u=k(function buildPostMask(e,t){var a="";if(a+="("+t.groupSeparator+"*{"+t.groupSize+"}){*}",""!==t.radixPoint){var i=e.join("").split(t.radixPoint);i[1]&&(a+=t.radixPoint+"*{"+i[1].match(/^\d*\??\d*/)[0].length+"}")}return a}(u,i),{numericInput:!0,jitMasking:!0,definitions:{"*":{validator:"[0-9?]",cardinality:1}}}).format(u.join("")),g&&(u+=i.radixPoint),u.charAt(0)===i.groupSeparator&&u.substr(1)}}if(i.isNegative&&"blur"===a.event&&(i.isNegative="0"!==u),u=r+u,u+=n,i.isNegative&&(u=i.negationSymbol.front+u,u+=i.negationSymbol.back),u=u.split(""),void 0!==l)if(l!==i.radixPoint&&l!==i.negationSymbol.front&&l!==i.negationSymbol.back)-1<(s=h.inArray("?",u))?u[s]=l:s=a.caret||0;else if(l===i.radixPoint||l===i.negationSymbol.front||l===i.negationSymbol.back){var m=h.inArray(l,u);-1!==m&&(s=m)}i.numericInput&&(s=u.length-s-1,u=u.reverse());var d={caret:void 0!==l&&void 0===a.pos||void 0===s?s:s+(i.numericInput?-1:1),buffer:u,refreshFromBuffer:a.dopost||e.join("")!==u.join("")};return d.refreshFromBuffer?d:a},onBeforeWrite:function onBeforeWrite(e,t,a,i){if(e)switch(e.type){case"keydown":return i.postValidation(t,a,{caret:a,dopost:!0},i);case"blur":case"checkval":var n;if(function parseMinMaxOptions(e){void 0===e.parseMinMaxOptions&&(null!==e.min&&(e.min=e.min.toString().replace(new RegExp(k.escapeRegex(e.groupSeparator),"g"),""),","===e.radixPoint&&(e.min=e.min.replace(e.radixPoint,".")),e.min=isFinite(e.min)?parseFloat(e.min):NaN,isNaN(e.min)&&(e.min=Number.MIN_VALUE)),null!==e.max&&(e.max=e.max.toString().replace(new RegExp(k.escapeRegex(e.groupSeparator),"g"),""),","===e.radixPoint&&(e.max=e.max.replace(e.radixPoint,".")),e.max=isFinite(e.max)?parseFloat(e.max):NaN,isNaN(e.max)&&(e.max=Number.MAX_VALUE)),e.parseMinMaxOptions="done")}(i),null!==i.min||null!==i.max){if(n=i.onUnMask(t.join(""),void 0,h.extend({},i,{unmaskAsNumber:!0})),null!==i.min&&n<i.min)return i.isNegative=i.min<0,i.postValidation(i.min.toString().replace(".",i.radixPoint).split(""),a,{caret:a,dopost:!0,placeholder:"0"},i);if(null!==i.max&&n>i.max)return i.isNegative=i.max<0,i.postValidation(i.max.toString().replace(".",i.radixPoint).split(""),a,{caret:a,dopost:!0,placeholder:"0"},i)}return i.postValidation(t,a,{caret:a,placeholder:"0",event:"blur"},i);case"_checkval":return{caret:a}}},regex:{integerPart:function integerPart(e,t){return t?new RegExp("["+k.escapeRegex(e.negationSymbol.front)+"+]?"):new RegExp("["+k.escapeRegex(e.negationSymbol.front)+"+]?\\d+")},integerNPart:function integerNPart(e){return new RegExp("[\\d"+k.escapeRegex(e.groupSeparator)+k.escapeRegex(e.placeholder.charAt(0))+"]+")}},definitions:{"~":{validator:function validator(e,t,a,i,n,r){var s;if("k"===e||"m"===e){s={insert:[],c:0};for(var o=0,l="k"===e?2:5;o<l;o++)s.insert.push({pos:a+o,c:0});return s.pos=a+l,s}if(!0===(s=i?new RegExp("[0-9"+k.escapeRegex(n.groupSeparator)+"]").test(e):new RegExp("[0-9]").test(e))){if(!0!==n.numericInput&&void 0!==t.validPositions[a]&&"~"===t.validPositions[a].match.def&&!r){var u=t.buffer.join(""),c=(u=(u=u.replace(new RegExp("[-"+k.escapeRegex(n.negationSymbol.front)+"]","g"),"")).replace(new RegExp(k.escapeRegex(n.negationSymbol.back)+"$"),"")).split(n.radixPoint);1<c.length&&(c[1]=c[1].replace(/0/g,n.placeholder.charAt(0))),"0"===c[0]&&(c[0]=c[0].replace(/0/g,n.placeholder.charAt(0))),u=c[0]+n.radixPoint+c[1]||"";var p=t._buffer.join("");for(u===n.radixPoint&&(u=p);null===u.match(k.escapeRegex(p)+"$");)p=p.slice(1);s=void 0===(u=(u=u.replace(p,"")).split(""))[a]?{pos:a,remove:a}:{pos:a}}}else i||e!==n.radixPoint||void 0!==t.validPositions[a-1]||(s={insert:{pos:a,c:0},pos:a+1});return s},cardinality:1},"+":{validator:function validator(e,t,a,i,n){return n.allowMinus&&("-"===e||e===n.negationSymbol.front)},cardinality:1,placeholder:""},"-":{validator:function validator(e,t,a,i,n){return n.allowMinus&&e===n.negationSymbol.back},cardinality:1,placeholder:""},":":{validator:function validator(e,t,a,i,n){var r="["+k.escapeRegex(n.radixPoint)+"]",s=new RegExp(r).test(e);return s&&t.validPositions[a]&&t.validPositions[a].match.placeholder===n.radixPoint&&(s={caret:a+1}),s},cardinality:1,placeholder:function placeholder(e){return e.radixPoint}}},onUnMask:function onUnMask(e,t,a){if(""===t&&!0===a.nullable)return t;var i=e.replace(a.prefix,"");return i=(i=i.replace(a.suffix,"")).replace(new RegExp(k.escapeRegex(a.groupSeparator),"g"),""),""!==a.placeholder.charAt(0)&&(i=i.replace(new RegExp(a.placeholder.charAt(0),"g"),"0")),a.unmaskAsNumber?(""!==a.radixPoint&&-1!==i.indexOf(a.radixPoint)&&(i=i.replace(k.escapeRegex.call(this,a.radixPoint),".")),i=(i=i.replace(new RegExp("^"+k.escapeRegex(a.negationSymbol.front)),"-")).replace(new RegExp(k.escapeRegex(a.negationSymbol.back)+"$"),""),Number(i)):i},isComplete:function isComplete(e,t){var a=(t.numericInput?e.slice().reverse():e).join("");return a=(a=(a=(a=(a=a.replace(new RegExp("^"+k.escapeRegex(t.negationSymbol.front)),"-")).replace(new RegExp(k.escapeRegex(t.negationSymbol.back)+"$"),"")).replace(t.prefix,"")).replace(t.suffix,"")).replace(new RegExp(k.escapeRegex(t.groupSeparator)+"([0-9]{3})","g"),"$1"),","===t.radixPoint&&(a=a.replace(k.escapeRegex(t.radixPoint),".")),isFinite(a)},onBeforeMask:function onBeforeMask(e,t){t.isNegative=void 0;var a=t.radixPoint||",";"number"!=typeof e&&"number"!==t.inputType||""===a||(e=e.toString().replace(".",a));var i=e.split(a),n=i[0].replace(/[^\-0-9]/g,""),r=1<i.length?i[1].replace(/[^0-9]/g,""):"";e=n+(""!==r?a+r:r);var s=0;if(""!==a&&(s=r.length,""!==r)){var o=Math.pow(10,s||1);isFinite(t.digits)&&(s=parseInt(t.digits),o=Math.pow(10,s)),e=e.replace(k.escapeRegex(a),"."),isFinite(e)&&(e=Math.round(parseFloat(e)*o)/o),e=e.toString().replace(".",a)}return 0===t.digits&&-1!==e.indexOf(k.escapeRegex(a))&&(e=e.substring(0,e.indexOf(k.escapeRegex(a)))),function alignDigits(e,t,a){if(0<t){var i=h.inArray(a.radixPoint,e);-1===i&&(e.push(a.radixPoint),i=e.length-1);for(var n=1;n<=t;n++)e[i+n]=e[i+n]||"0"}return e}(e.toString().split(""),s,t).join("")},onKeyDown:function onKeyDown(e,t,a,i){var n=h(this);if(e.ctrlKey)switch(e.keyCode){case k.keyCode.UP:n.val(parseFloat(this.inputmask.unmaskedvalue())+parseInt(i.step)),n.trigger("setvalue");break;case k.keyCode.DOWN:n.val(parseFloat(this.inputmask.unmaskedvalue())-parseInt(i.step)),n.trigger("setvalue")}}},currency:{prefix:"$ ",groupSeparator:",",alias:"numeric",placeholder:"0",autoGroup:!0,digits:2,digitsOptional:!1,clearMaskOnLostFocus:!1},decimal:{alias:"numeric"},integer:{alias:"numeric",digits:0,radixPoint:""},percentage:{alias:"numeric",digits:2,digitsOptional:!0,radixPoint:".",placeholder:"0",autoGroup:!1,min:0,max:100,suffix:" %",allowMinus:!1}}),e.exports=k},function(e,t,a){"use strict";var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=a(5),s=a(3);void 0===r.fn.inputmask&&(r.fn.inputmask=function(e,t){var a,i=this[0];if(void 0===t&&(t={}),"string"==typeof e)switch(e){case"unmaskedvalue":return i&&i.inputmask?i.inputmask.unmaskedvalue():r(i).val();case"remove":return this.each(function(){this.inputmask&&this.inputmask.remove()});case"getemptymask":return i&&i.inputmask?i.inputmask.getemptymask():"";case"hasMaskedValue":return!(!i||!i.inputmask)&&i.inputmask.hasMaskedValue();case"isComplete":return!i||!i.inputmask||i.inputmask.isComplete();case"getmetadata":return i&&i.inputmask?i.inputmask.getmetadata():void 0;case"setvalue":s.setValue(i,t);break;case"option":if("string"!=typeof t)return this.each(function(){if(void 0!==this.inputmask)return this.inputmask.option(t)});if(i&&void 0!==i.inputmask)return i.inputmask.option(t);break;default:return t.alias=e,a=new s(t),this.each(function(){a.mask(this)})}else{if(Array.isArray(e))return t.alias=e,a=new s(t),this.each(function(){a.mask(this)});if("object"==(void 0===e?"undefined":n(e)))return a=new s(e),void 0===e.mask&&void 0===e.alias?this.each(function(){if(void 0!==this.inputmask)return this.inputmask.option(e);a.mask(this)}):this.each(function(){a.mask(this)});if(void 0===e)return this.each(function(){(a=new s(t)).mask(this)})}})}])});
jQuery(document).ready(function($){
	var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
	var transitionsSupported = ( $('.csstransitions').length > 0 );
	//if browser does not support transitions - use a different event to trigger them
	if( !transitionsSupported ) transitionEnd = 'noTransition';
	
	//should add a loding while the events are organized 

	function SchedulePlan( element ) {
		this.element = element;
		this.timeline = this.element.find('.timeline');
		this.timelineItems = this.timeline.find('li');
		this.timelineItemsNumber = this.timelineItems.length;
		this.timelineStart = getScheduleTimestamp(this.timelineItems.eq(0).text());
		//need to store delta (in our case half hour) timestamp
		this.timelineUnitDuration = getScheduleTimestamp(this.timelineItems.eq(1).text()) - getScheduleTimestamp(this.timelineItems.eq(0).text());

		this.eventsWrapper = this.element.find('.events');
		this.eventsGroup = this.eventsWrapper.find('.events-group');
		this.singleEvents = this.eventsGroup.find('.single-event');
		this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();

		this.modal = this.element.find('.event-modal');
		this.modalHeader = this.modal.find('.header');
		this.modalHeaderBg = this.modal.find('.header-bg');
		this.modalBody = this.modal.find('.body'); 
		this.modalBodyBg = this.modal.find('.body-bg'); 
		this.modalMaxWidth = 800;
		this.modalMaxHeight = 480;

		this.animating = false;

		this.initSchedule();
	}

	SchedulePlan.prototype.initSchedule = function() {
		this.scheduleReset();
		this.initEvents();
	};

	SchedulePlan.prototype.scheduleReset = function() {
		var mq = this.mq();
		if( mq == 'desktop' && !this.element.hasClass('js-full') ) {
			//in this case you are on a desktop version (first load or resize from mobile)
			this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();
			this.element.addClass('js-full');
			this.placeEvents();
			this.element.hasClass('modal-is-open') && this.checkEventModal();
			$('.li-width').removeClass('mobile-width');
			$('.ul-height').removeClass('mobile-height');
			$('.ul-height .single-event').removeClass('card-height');
		} else if(  mq == 'mobile' && this.element.hasClass('js-full') ) {
			//in this case you are on a mobile version (first load or resize from desktop)
			this.element.removeClass('js-full loading');
			this.eventsGroup.children('ul').add(this.singleEvents);
			this.eventsWrapper.children('.grid-line').remove();
			this.element.hasClass('modal-is-open') && this.checkEventModal();
			$('.li-width').addClass('mobile-width');
			$('.ul-height').addClass('mobile-height');
			$('.ul-height .single-event').addClass('card-height');
		} else if( mq == 'desktop' && this.element.hasClass('modal-is-open')){
			//on a mobile version with modal open - need to resize/move modal window
			this.checkEventModal('desktop');
			this.element.removeClass('loading');
		} else {
			this.element.removeClass('loading');
		}
	};

	SchedulePlan.prototype.initEvents = function() {
		var self = this;

		this.singleEvents.each(function(){
			//create the .event-date element for each event
			var durationLabel = '<span class="event-date">'+$(this).data('start')+' - '+$(this).data('end')+'</span>';
			$(this).children('em').prepend($(durationLabel));

			//detect click on the event and open the modal
			// $(this).on('click', 'a', function(event){
			// 	event.preventDefault();
			// 	if( !self.animating ) self.openModal($(this));
			// });
		});

		//close modal window
		this.modal.on('click', '.close', function(event){
			event.preventDefault();
			if( !self.animating ) self.closeModal(self.eventsGroup.find('.selected-event'));
		});
		this.element.on('click', '.cover-layer', function(event){
			if( !self.animating && self.element.hasClass('modal-is-open') ) self.closeModal(self.eventsGroup.find('.selected-event'));
		});
	};

	SchedulePlan.prototype.placeEvents = function() {
		var self = this;
		this.singleEvents.each(function(){
			//place each event in the grid -> need to set top position and height
			var start = getScheduleTimestamp($(this).attr('data-start')),
				duration = getScheduleTimestamp($(this).attr('data-end')) - start;

			var eventTop = self.eventSlotHeight*(start - self.timelineStart)/self.timelineUnitDuration,
				eventHeight = self.eventSlotHeight*duration/self.timelineUnitDuration;
			
			$(this).css({
				top: (eventTop -1) +'px',
				height: (eventHeight+1)+'px'
			});
		});

		this.element.removeClass('loading');
	};

	SchedulePlan.prototype.openModal = function(event) {
		var self = this;
		var mq = self.mq();
		this.animating = true;

		//update event name and time
		this.modalHeader.find('.event-name').text(event.find('.event-name').text());
		this.modalHeader.find('.event-date').text(event.find('.event-date').text());
		this.modal.attr('data-event', event.parent().attr('data-event'));

		//update event content
		this.modalBody.find('.event-info').load(event.parent().attr('data-content')+'.html .event-info > *', function(data){
			//once the event content has been loaded
			self.element.addClass('content-loaded');
		});

		this.element.addClass('modal-is-open');

		setTimeout(function(){
			//fixes a flash when an event is selected - desktop version only
			event.parent('li').addClass('selected-event');
		}, 10);

		if( mq == 'mobile' ) {
			self.modal.one(transitionEnd, function(){
				self.modal.off(transitionEnd);
				self.animating = false;
			});
		} else {
			var eventTop = event.offset().top - $(window).scrollTop(),
				eventLeft = event.offset().left,
				eventHeight = event.innerHeight(),
				eventWidth = event.innerWidth();

			var windowWidth = $(window).width(),
				windowHeight = $(window).height();

			var modalWidth = ( windowWidth*.8 > self.modalMaxWidth ) ? self.modalMaxWidth : windowWidth*.8,
				modalHeight = ( windowHeight*.8 > self.modalMaxHeight ) ? self.modalMaxHeight : windowHeight*.8;

			var modalTranslateX = parseInt((windowWidth - modalWidth)/2 - eventLeft),
				modalTranslateY = parseInt((windowHeight - modalHeight)/2 - eventTop);
			
			var HeaderBgScaleY = modalHeight/eventHeight,
				BodyBgScaleX = (modalWidth - eventWidth);

			//change modal height/width and translate it
			self.modal.css({
				top: eventTop+'px',
				left: eventLeft+'px',
				height: modalHeight+'px',
				width: modalWidth+'px',
			});
			transformElement(self.modal, 'translateY('+modalTranslateY+'px) translateX('+modalTranslateX+'px)');

			//set modalHeader width
			self.modalHeader.css({
				width: eventWidth+'px',
			});
			//set modalBody left margin
			self.modalBody.css({
				marginLeft: eventWidth+'px',
			});

			//change modalBodyBg height/width ans scale it
			self.modalBodyBg.css({
				height: eventHeight+'px',
				width: '1px',
			});
			transformElement(self.modalBodyBg, 'scaleY('+HeaderBgScaleY+') scaleX('+BodyBgScaleX+')');

			//change modal modalHeaderBg height/width and scale it
			self.modalHeaderBg.css({
				height: eventHeight+'px',
				width: eventWidth+'px',
			});
			transformElement(self.modalHeaderBg, 'scaleY('+HeaderBgScaleY+')');
			
			self.modalHeaderBg.one(transitionEnd, function(){
				//wait for the  end of the modalHeaderBg transformation and show the modal content
				self.modalHeaderBg.off(transitionEnd);
				self.animating = false;
				self.element.addClass('animation-completed');
			});
		}

		//if browser do not support transitions -> no need to wait for the end of it
		if( !transitionsSupported ) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
	};

	SchedulePlan.prototype.closeModal = function(event) {
		var self = this;
		var mq = self.mq();

		this.animating = true;

		if( mq == 'mobile' ) {
			this.element.removeClass('modal-is-open');
			this.modal.one(transitionEnd, function(){
				self.modal.off(transitionEnd);
				self.animating = false;
				self.element.removeClass('content-loaded');
				event.removeClass('selected-event');
			});
		} else {
			var eventTop = event.offset().top - $(window).scrollTop(),
				eventLeft = event.offset().left,
				eventHeight = event.innerHeight(),
				eventWidth = event.innerWidth();

			var modalTop = Number(self.modal.css('top').replace('px', '')),
				modalLeft = Number(self.modal.css('left').replace('px', ''));

			var modalTranslateX = eventLeft - modalLeft,
				modalTranslateY = eventTop - modalTop;

			self.element.removeClass('animation-completed modal-is-open');

			//change modal width/height and translate it
			this.modal.css({
				width: eventWidth+'px',
				height: eventHeight+'px'
			});
			transformElement(self.modal, 'translateX('+modalTranslateX+'px) translateY('+modalTranslateY+'px)');
			
			//scale down modalBodyBg element
			transformElement(self.modalBodyBg, 'scaleX(0) scaleY(1)');
			//scale down modalHeaderBg element
			transformElement(self.modalHeaderBg, 'scaleY(1)');

			this.modalHeaderBg.one(transitionEnd, function(){
				//wait for the  end of the modalHeaderBg transformation and reset modal style
				self.modalHeaderBg.off(transitionEnd);
				self.modal.addClass('no-transition');
				setTimeout(function(){
					self.modal.add(self.modalHeader).add(self.modalBody).add(self.modalHeaderBg).add(self.modalBodyBg).attr('style', '');
				}, 10);
				setTimeout(function(){
					self.modal.removeClass('no-transition');
				}, 20);

				self.animating = false;
				self.element.removeClass('content-loaded');
				event.removeClass('selected-event');
			});
		}

		//browser do not support transitions -> no need to wait for the end of it
		if( !transitionsSupported ) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
	}

	SchedulePlan.prototype.mq = function(){
		//get MQ value ('desktop' or 'mobile') 
		var self = this;
		return window.getComputedStyle(this.element.get(0), '::before').getPropertyValue('content').replace(/["']/g, '');
	};

	SchedulePlan.prototype.checkEventModal = function(device) {
		this.animating = true;
		var self = this;
		var mq = this.mq();

		if( mq == 'mobile' ) {
			//reset modal style on mobile
			self.modal.add(self.modalHeader).add(self.modalHeaderBg).add(self.modalBody).add(self.modalBodyBg).attr('style', '');
			self.modal.removeClass('no-transition');	
			self.animating = false;	
		} else if( mq == 'desktop' && self.element.hasClass('modal-is-open') ) {
			self.modal.addClass('no-transition');
			self.element.addClass('animation-completed');
			var event = self.eventsGroup.find('.selected-event');

			var eventTop = event.offset().top - $(window).scrollTop(),
				eventLeft = event.offset().left,
				eventHeight = event.innerHeight(),
				eventWidth = event.innerWidth();

			var windowWidth = $(window).width(),
				windowHeight = $(window).height();

			var modalWidth = ( windowWidth*.8 > self.modalMaxWidth ) ? self.modalMaxWidth : windowWidth*.8,
				modalHeight = ( windowHeight*.8 > self.modalMaxHeight ) ? self.modalMaxHeight : windowHeight*.8;

			var HeaderBgScaleY = modalHeight/eventHeight,
				BodyBgScaleX = (modalWidth - eventWidth);

			setTimeout(function(){
				self.modal.css({
					width: modalWidth+'px',
					height: modalHeight+'px',
					top: (windowHeight/2 - modalHeight/2)+'px',
					left: (windowWidth/2 - modalWidth/2)+'px',
				});
				transformElement(self.modal, 'translateY(0) translateX(0)');
				//change modal modalBodyBg height/width
				self.modalBodyBg.css({
					height: modalHeight+'px',
					width: '1px',
				});
				transformElement(self.modalBodyBg, 'scaleX('+BodyBgScaleX+')');
				//set modalHeader width
				self.modalHeader.css({
					width: eventWidth+'px',
				});
				//set modalBody left margin
				self.modalBody.css({
					marginLeft: eventWidth+'px',
				});
				//change modal modalHeaderBg height/width and scale it
				self.modalHeaderBg.css({
					height: eventHeight+'px',
					width: eventWidth+'px',
				});
				transformElement(self.modalHeaderBg, 'scaleY('+HeaderBgScaleY+')');
			}, 10);

			setTimeout(function(){
				self.modal.removeClass('no-transition');
				self.animating = false;	
			}, 20);
		}
	};

	var schedules = $('.cd-schedule');
	var objSchedulesPlan = [],
		windowResize = false;
	
	if( schedules.length > 0 ) {
		schedules.each(function(){
			//create SchedulePlan objects
			objSchedulesPlan.push(new SchedulePlan($(this)));
		});
	}

	$(window).on('resize', function(){
		if( !windowResize ) {
			windowResize = true;
			(!window.requestAnimationFrame) ? setTimeout(checkResize) : window.requestAnimationFrame(checkResize);
		}
	});

	$(window).keyup(function(event) {
		if (event.keyCode == 27) {
			objSchedulesPlan.forEach(function(element){
				element.closeModal(element.eventsGroup.find('.selected-event'));
			});
		}
	});

	function checkResize(){
		objSchedulesPlan.forEach(function(element){
			element.scheduleReset();
		});
		windowResize = false;
	}

	function getScheduleTimestamp(time) {
		//accepts hh:mm format - convert hh:mm to timestamp
		time = time.replace(/ /g,'');
		var timeArray = time.split(':');
		var timeStamp = parseInt(timeArray[0])*60 + parseInt(timeArray[1]);
		return timeStamp;
	}

	function transformElement(element, value) {
		element.css({
		    '-moz-transform': value,
		    '-webkit-transform': value,
			'-ms-transform': value,
			'-o-transform': value,
			'transform': value
		});
	}
});
/*!
 * html2canvas 1.0.0-alpha.11 <https://html2canvas.hertzen.com>
 * Copyright (c) 2018 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */

!function(A,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.html2canvas=e():A.html2canvas=e()}(this,function(){return function(A){var e={};function t(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return A[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=A,t.c=e,t.d=function(A,e,r){t.o(A,e)||Object.defineProperty(A,e,{configurable:!1,enumerable:!0,get:r})},t.n=function(A){var e=A&&A.__esModule?function(){return A.default}:function(){return A};return t.d(e,"a",e),e},t.o=function(A,e){return Object.prototype.hasOwnProperty.call(A,e)},t.p="",t(t.s=27)}([function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){return function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,B=void 0;try{for(var a,s=A[Symbol.iterator]();!(r=(a=s.next()).done)&&(t.push(a.value),!e||t.length!==e);r=!0);}catch(A){n=!0,B=A}finally{try{!r&&s.return&&s.return()}finally{if(n)throw B}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}();var B=/^#([a-f0-9]{3})$/i,a=function(A){var e=A.match(B);return!!e&&[parseInt(e[1][0]+e[1][0],16),parseInt(e[1][1]+e[1][1],16),parseInt(e[1][2]+e[1][2],16),null]},s=/^#([a-f0-9]{6})$/i,o=function(A){var e=A.match(s);return!!e&&[parseInt(e[1].substring(0,2),16),parseInt(e[1].substring(2,4),16),parseInt(e[1].substring(4,6),16),null]},i=/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,c=function(A){var e=A.match(i);return!!e&&[Number(e[1]),Number(e[2]),Number(e[3]),null]},l=/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d?\.?\d+)\s*\)$/,u=function(A){var e=A.match(l);return!!(e&&e.length>4)&&[Number(e[1]),Number(e[2]),Number(e[3]),Number(e[4])]},Q=function(A){return[Math.min(A[0],255),Math.min(A[1],255),Math.min(A[2],255),A.length>3?A[3]:null]},w=function(A){var e=g[A.toLowerCase()];return e||!1},U=function(){function A(e){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A);var t=Array.isArray(e)?Q(e):a(e)||c(e)||u(e)||w(e)||o(e)||[0,0,0,null],n=r(t,4),B=n[0],s=n[1],i=n[2],l=n[3];this.r=B,this.g=s,this.b=i,this.a=l}return n(A,[{key:"isTransparent",value:function(){return 0===this.a}},{key:"toString",value:function(){return null!==this.a&&1!==this.a?"rgba("+this.r+","+this.g+","+this.b+","+this.a+")":"rgb("+this.r+","+this.g+","+this.b+")"}}]),A}();e.default=U;var g={transparent:[0,0,0,0],aliceblue:[240,248,255,null],antiquewhite:[250,235,215,null],aqua:[0,255,255,null],aquamarine:[127,255,212,null],azure:[240,255,255,null],beige:[245,245,220,null],bisque:[255,228,196,null],black:[0,0,0,null],blanchedalmond:[255,235,205,null],blue:[0,0,255,null],blueviolet:[138,43,226,null],brown:[165,42,42,null],burlywood:[222,184,135,null],cadetblue:[95,158,160,null],chartreuse:[127,255,0,null],chocolate:[210,105,30,null],coral:[255,127,80,null],cornflowerblue:[100,149,237,null],cornsilk:[255,248,220,null],crimson:[220,20,60,null],cyan:[0,255,255,null],darkblue:[0,0,139,null],darkcyan:[0,139,139,null],darkgoldenrod:[184,134,11,null],darkgray:[169,169,169,null],darkgreen:[0,100,0,null],darkgrey:[169,169,169,null],darkkhaki:[189,183,107,null],darkmagenta:[139,0,139,null],darkolivegreen:[85,107,47,null],darkorange:[255,140,0,null],darkorchid:[153,50,204,null],darkred:[139,0,0,null],darksalmon:[233,150,122,null],darkseagreen:[143,188,143,null],darkslateblue:[72,61,139,null],darkslategray:[47,79,79,null],darkslategrey:[47,79,79,null],darkturquoise:[0,206,209,null],darkviolet:[148,0,211,null],deeppink:[255,20,147,null],deepskyblue:[0,191,255,null],dimgray:[105,105,105,null],dimgrey:[105,105,105,null],dodgerblue:[30,144,255,null],firebrick:[178,34,34,null],floralwhite:[255,250,240,null],forestgreen:[34,139,34,null],fuchsia:[255,0,255,null],gainsboro:[220,220,220,null],ghostwhite:[248,248,255,null],gold:[255,215,0,null],goldenrod:[218,165,32,null],gray:[128,128,128,null],green:[0,128,0,null],greenyellow:[173,255,47,null],grey:[128,128,128,null],honeydew:[240,255,240,null],hotpink:[255,105,180,null],indianred:[205,92,92,null],indigo:[75,0,130,null],ivory:[255,255,240,null],khaki:[240,230,140,null],lavender:[230,230,250,null],lavenderblush:[255,240,245,null],lawngreen:[124,252,0,null],lemonchiffon:[255,250,205,null],lightblue:[173,216,230,null],lightcoral:[240,128,128,null],lightcyan:[224,255,255,null],lightgoldenrodyellow:[250,250,210,null],lightgray:[211,211,211,null],lightgreen:[144,238,144,null],lightgrey:[211,211,211,null],lightpink:[255,182,193,null],lightsalmon:[255,160,122,null],lightseagreen:[32,178,170,null],lightskyblue:[135,206,250,null],lightslategray:[119,136,153,null],lightslategrey:[119,136,153,null],lightsteelblue:[176,196,222,null],lightyellow:[255,255,224,null],lime:[0,255,0,null],limegreen:[50,205,50,null],linen:[250,240,230,null],magenta:[255,0,255,null],maroon:[128,0,0,null],mediumaquamarine:[102,205,170,null],mediumblue:[0,0,205,null],mediumorchid:[186,85,211,null],mediumpurple:[147,112,219,null],mediumseagreen:[60,179,113,null],mediumslateblue:[123,104,238,null],mediumspringgreen:[0,250,154,null],mediumturquoise:[72,209,204,null],mediumvioletred:[199,21,133,null],midnightblue:[25,25,112,null],mintcream:[245,255,250,null],mistyrose:[255,228,225,null],moccasin:[255,228,181,null],navajowhite:[255,222,173,null],navy:[0,0,128,null],oldlace:[253,245,230,null],olive:[128,128,0,null],olivedrab:[107,142,35,null],orange:[255,165,0,null],orangered:[255,69,0,null],orchid:[218,112,214,null],palegoldenrod:[238,232,170,null],palegreen:[152,251,152,null],paleturquoise:[175,238,238,null],palevioletred:[219,112,147,null],papayawhip:[255,239,213,null],peachpuff:[255,218,185,null],peru:[205,133,63,null],pink:[255,192,203,null],plum:[221,160,221,null],powderblue:[176,224,230,null],purple:[128,0,128,null],rebeccapurple:[102,51,153,null],red:[255,0,0,null],rosybrown:[188,143,143,null],royalblue:[65,105,225,null],saddlebrown:[139,69,19,null],salmon:[250,128,114,null],sandybrown:[244,164,96,null],seagreen:[46,139,87,null],seashell:[255,245,238,null],sienna:[160,82,45,null],silver:[192,192,192,null],skyblue:[135,206,235,null],slateblue:[106,90,205,null],slategray:[112,128,144,null],slategrey:[112,128,144,null],snow:[255,250,250,null],springgreen:[0,255,127,null],steelblue:[70,130,180,null],tan:[210,180,140,null],teal:[0,128,128,null],thistle:[216,191,216,null],tomato:[255,99,71,null],turquoise:[64,224,208,null],violet:[238,130,238,null],wheat:[245,222,179,null],white:[255,255,255,null],whitesmoke:[245,245,245,null],yellow:[255,255,0,null],yellowgreen:[154,205,50,null]};e.TRANSPARENT=new U([0,0,0,0])},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.calculateLengthFromValueWithUnit=e.LENGTH_TYPE=void 0;var r,n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),B=t(3);(r=B)&&r.__esModule;var a=e.LENGTH_TYPE={PX:0,PERCENTAGE:1},s=function(){function A(e){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.type="%"===e.substr(e.length-1)?a.PERCENTAGE:a.PX;var t=parseFloat(e);this.value=isNaN(t)?0:t}return n(A,[{key:"isPercentage",value:function(){return this.type===a.PERCENTAGE}},{key:"getAbsoluteValue",value:function(A){return this.isPercentage()?A*(this.value/100):this.value}}],[{key:"create",value:function(e){return new A(e)}}]),A}();e.default=s;e.calculateLengthFromValueWithUnit=function(A,e,t){switch(t){case"px":case"%":return new s(e+t);case"em":case"rem":var r=new s(e);return r.value*="em"===t?parseFloat(A.style.font.fontSize):function A(e){var t=e.parent;return t?A(t):parseFloat(e.style.font.fontSize)}(A),r;default:return new s("0")}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.parseBoundCurves=e.calculatePaddingBoxPath=e.calculateBorderBoxPath=e.parsePathForBorder=e.parseDocumentSize=e.calculateContentBox=e.calculatePaddingBox=e.parseBounds=e.Bounds=void 0;var r=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),n=a(t(7)),B=a(t(32));function a(A){return A&&A.__esModule?A:{default:A}}var s=e.Bounds=function(){function A(e,t,r,n){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.left=e,this.top=t,this.width=r,this.height=n}return r(A,null,[{key:"fromClientRect",value:function(e,t,r){return new A(e.left+t,e.top+r,e.width,e.height)}}]),A}(),o=(e.parseBounds=function(A,e,t){return s.fromClientRect(A.getBoundingClientRect(),e,t)},e.calculatePaddingBox=function(A,e){return new s(A.left+e[3].borderWidth,A.top+e[0].borderWidth,A.width-(e[1].borderWidth+e[3].borderWidth),A.height-(e[0].borderWidth+e[2].borderWidth))},e.calculateContentBox=function(A,e,t){var r=e[0].value,n=e[1].value,B=e[2].value,a=e[3].value;return new s(A.left+a+t[3].borderWidth,A.top+r+t[0].borderWidth,A.width-(t[1].borderWidth+t[3].borderWidth+a+n),A.height-(t[0].borderWidth+t[2].borderWidth+r+B))},e.parseDocumentSize=function(A){var e=A.body,t=A.documentElement;if(!e||!t)throw new Error("");var r=Math.max(Math.max(e.scrollWidth,t.scrollWidth),Math.max(e.offsetWidth,t.offsetWidth),Math.max(e.clientWidth,t.clientWidth)),n=Math.max(Math.max(e.scrollHeight,t.scrollHeight),Math.max(e.offsetHeight,t.offsetHeight),Math.max(e.clientHeight,t.clientHeight));return new s(0,0,r,n)},e.parsePathForBorder=function(A,e){switch(e){case 0:return o(A.topLeftOuter,A.topLeftInner,A.topRightOuter,A.topRightInner);case 1:return o(A.topRightOuter,A.topRightInner,A.bottomRightOuter,A.bottomRightInner);case 2:return o(A.bottomRightOuter,A.bottomRightInner,A.bottomLeftOuter,A.bottomLeftInner);case 3:default:return o(A.bottomLeftOuter,A.bottomLeftInner,A.topLeftOuter,A.topLeftInner)}},function(A,e,t,r){var n=[];return A instanceof B.default?n.push(A.subdivide(.5,!1)):n.push(A),t instanceof B.default?n.push(t.subdivide(.5,!0)):n.push(t),r instanceof B.default?n.push(r.subdivide(.5,!0).reverse()):n.push(r),e instanceof B.default?n.push(e.subdivide(.5,!1).reverse()):n.push(e),n}),i=(e.calculateBorderBoxPath=function(A){return[A.topLeftOuter,A.topRightOuter,A.bottomRightOuter,A.bottomLeftOuter]},e.calculatePaddingBoxPath=function(A){return[A.topLeftInner,A.topRightInner,A.bottomRightInner,A.bottomLeftInner]},e.parseBoundCurves=function(A,e,t){var r=t[i.TOP_LEFT][0].getAbsoluteValue(A.width),B=t[i.TOP_LEFT][1].getAbsoluteValue(A.height),a=t[i.TOP_RIGHT][0].getAbsoluteValue(A.width),s=t[i.TOP_RIGHT][1].getAbsoluteValue(A.height),o=t[i.BOTTOM_RIGHT][0].getAbsoluteValue(A.width),l=t[i.BOTTOM_RIGHT][1].getAbsoluteValue(A.height),u=t[i.BOTTOM_LEFT][0].getAbsoluteValue(A.width),Q=t[i.BOTTOM_LEFT][1].getAbsoluteValue(A.height),w=[];w.push((r+a)/A.width),w.push((u+o)/A.width),w.push((B+Q)/A.height),w.push((s+l)/A.height);var U=Math.max.apply(Math,w);U>1&&(r/=U,B/=U,a/=U,s/=U,o/=U,l/=U,u/=U,Q/=U);var g=A.width-a,C=A.height-l,d=A.width-o,F=A.height-Q;return{topLeftOuter:r>0||B>0?c(A.left,A.top,r,B,i.TOP_LEFT):new n.default(A.left,A.top),topLeftInner:r>0||B>0?c(A.left+e[3].borderWidth,A.top+e[0].borderWidth,Math.max(0,r-e[3].borderWidth),Math.max(0,B-e[0].borderWidth),i.TOP_LEFT):new n.default(A.left+e[3].borderWidth,A.top+e[0].borderWidth),topRightOuter:a>0||s>0?c(A.left+g,A.top,a,s,i.TOP_RIGHT):new n.default(A.left+A.width,A.top),topRightInner:a>0||s>0?c(A.left+Math.min(g,A.width+e[3].borderWidth),A.top+e[0].borderWidth,g>A.width+e[3].borderWidth?0:a-e[3].borderWidth,s-e[0].borderWidth,i.TOP_RIGHT):new n.default(A.left+A.width-e[1].borderWidth,A.top+e[0].borderWidth),bottomRightOuter:o>0||l>0?c(A.left+d,A.top+C,o,l,i.BOTTOM_RIGHT):new n.default(A.left+A.width,A.top+A.height),bottomRightInner:o>0||l>0?c(A.left+Math.min(d,A.width-e[3].borderWidth),A.top+Math.min(C,A.height+e[0].borderWidth),Math.max(0,o-e[1].borderWidth),l-e[2].borderWidth,i.BOTTOM_RIGHT):new n.default(A.left+A.width-e[1].borderWidth,A.top+A.height-e[2].borderWidth),bottomLeftOuter:u>0||Q>0?c(A.left,A.top+F,u,Q,i.BOTTOM_LEFT):new n.default(A.left,A.top+A.height),bottomLeftInner:u>0||Q>0?c(A.left+e[3].borderWidth,A.top+F,Math.max(0,u-e[3].borderWidth),Q-e[2].borderWidth,i.BOTTOM_LEFT):new n.default(A.left+e[3].borderWidth,A.top+A.height-e[2].borderWidth)}},{TOP_LEFT:0,TOP_RIGHT:1,BOTTOM_RIGHT:2,BOTTOM_LEFT:3}),c=function(A,e,t,r,a){var s=(Math.sqrt(2)-1)/3*4,o=t*s,c=r*s,l=A+t,u=e+r;switch(a){case i.TOP_LEFT:return new B.default(new n.default(A,u),new n.default(A,u-c),new n.default(l-o,e),new n.default(l,e));case i.TOP_RIGHT:return new B.default(new n.default(A,e),new n.default(A+o,e),new n.default(l,u-c),new n.default(l,u));case i.BOTTOM_RIGHT:return new B.default(new n.default(l,e),new n.default(l,e+c),new n.default(A+o,u),new n.default(A,u));case i.BOTTOM_LEFT:default:return new B.default(new n.default(l,u),new n.default(l-o,u),new n.default(A,e+c),new n.default(A,e))}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),B=t(0),a=(r=B)&&r.__esModule?r:{default:r},s=t(4),o=t(5),i=t(12),c=t(33),l=t(34),u=t(35),Q=t(36),w=t(37),U=t(38),g=t(8),C=t(39),d=t(40),F=t(18),E=t(17),f=t(19),h=t(11),H=t(41),p=t(20),N=t(42),I=t(43),K=t(44),T=t(45),m=t(2),v=t(21),y=t(14);var b=["INPUT","TEXTAREA","SELECT"],S=function(){function A(e,t,r,n){var B=this;!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.parent=t,this.tagName=e.tagName,this.index=n,this.childNodes=[],this.listItems=[],"number"==typeof e.start&&(this.listStart=e.start);var s=e.ownerDocument.defaultView,S=s.pageXOffset,_=s.pageYOffset,D=s.getComputedStyle(e,null),M=(0,l.parseDisplay)(D.display),O="radio"===e.type||"checkbox"===e.type,R=(0,f.parsePosition)(D.position);if(this.style={background:O?v.INPUT_BACKGROUND:(0,o.parseBackground)(D,r),border:O?v.INPUT_BORDERS:(0,i.parseBorder)(D),borderRadius:(e instanceof s.HTMLInputElement||e instanceof HTMLInputElement)&&O?(0,v.getInputBorderRadius)(e):(0,c.parseBorderRadius)(D),color:O?v.INPUT_COLOR:new a.default(D.color),display:M,float:(0,u.parseCSSFloat)(D.float),font:(0,Q.parseFont)(D),letterSpacing:(0,w.parseLetterSpacing)(D.letterSpacing),listStyle:M===l.DISPLAY.LIST_ITEM?(0,g.parseListStyle)(D):null,lineBreak:(0,U.parseLineBreak)(D.lineBreak),margin:(0,C.parseMargin)(D),opacity:parseFloat(D.opacity),overflow:-1===b.indexOf(e.tagName)?(0,d.parseOverflow)(D.overflow):d.OVERFLOW.HIDDEN,overflowWrap:(0,F.parseOverflowWrap)(D.overflowWrap?D.overflowWrap:D.wordWrap),padding:(0,E.parsePadding)(D),position:R,textDecoration:(0,h.parseTextDecoration)(D),textShadow:(0,H.parseTextShadow)(D.textShadow),textTransform:(0,p.parseTextTransform)(D.textTransform),transform:(0,N.parseTransform)(D),visibility:(0,I.parseVisibility)(D.visibility),wordBreak:(0,K.parseWordBreak)(D.wordBreak),zIndex:(0,T.parseZIndex)(R!==f.POSITION.STATIC?D.zIndex:"auto")},this.isTransformed()&&(e.style.transform="matrix(1,0,0,1,0,0)"),M===l.DISPLAY.LIST_ITEM){var P=(0,y.getListOwner)(this);if(P){var X=P.listItems.length;P.listItems.push(this),this.listIndex=e.hasAttribute("value")&&"number"==typeof e.value?e.value:0===X?"number"==typeof P.listStart?P.listStart:1:P.listItems[X-1].listIndex+1}}"IMG"===e.tagName&&e.addEventListener("load",function(){B.bounds=(0,m.parseBounds)(e,S,_),B.curvedBounds=(0,m.parseBoundCurves)(B.bounds,B.style.border,B.style.borderRadius)}),this.image=L(e,r),this.bounds=O?(0,v.reformatInputBounds)((0,m.parseBounds)(e,S,_)):(0,m.parseBounds)(e,S,_),this.curvedBounds=(0,m.parseBoundCurves)(this.bounds,this.style.border,this.style.borderRadius)}return n(A,[{key:"getClipPaths",value:function(){var A=this.parent?this.parent.getClipPaths():[];return this.style.overflow!==d.OVERFLOW.VISIBLE?A.concat([(0,m.calculatePaddingBoxPath)(this.curvedBounds)]):A}},{key:"isInFlow",value:function(){return this.isRootElement()&&!this.isFloating()&&!this.isAbsolutelyPositioned()}},{key:"isVisible",value:function(){return!(0,s.contains)(this.style.display,l.DISPLAY.NONE)&&this.style.opacity>0&&this.style.visibility===I.VISIBILITY.VISIBLE}},{key:"isAbsolutelyPositioned",value:function(){return this.style.position!==f.POSITION.STATIC&&this.style.position!==f.POSITION.RELATIVE}},{key:"isPositioned",value:function(){return this.style.position!==f.POSITION.STATIC}},{key:"isFloating",value:function(){return this.style.float!==u.FLOAT.NONE}},{key:"isRootElement",value:function(){return null===this.parent}},{key:"isTransformed",value:function(){return null!==this.style.transform}},{key:"isPositionedWithZIndex",value:function(){return this.isPositioned()&&!this.style.zIndex.auto}},{key:"isInlineLevel",value:function(){return(0,s.contains)(this.style.display,l.DISPLAY.INLINE)||(0,s.contains)(this.style.display,l.DISPLAY.INLINE_BLOCK)||(0,s.contains)(this.style.display,l.DISPLAY.INLINE_FLEX)||(0,s.contains)(this.style.display,l.DISPLAY.INLINE_GRID)||(0,s.contains)(this.style.display,l.DISPLAY.INLINE_LIST_ITEM)||(0,s.contains)(this.style.display,l.DISPLAY.INLINE_TABLE)}},{key:"isInlineBlockOrInlineTable",value:function(){return(0,s.contains)(this.style.display,l.DISPLAY.INLINE_BLOCK)||(0,s.contains)(this.style.display,l.DISPLAY.INLINE_TABLE)}}]),A}();e.default=S;var L=function(A,e){if(A instanceof A.ownerDocument.defaultView.SVGSVGElement||A instanceof SVGSVGElement){var t=new XMLSerializer;return e.loadImage("data:image/svg+xml,"+encodeURIComponent(t.serializeToString(A)))}switch(A.tagName){case"IMG":var r=A;return e.loadImage(r.currentSrc||r.src);case"CANVAS":var n=A;return e.loadCanvas(n);case"IFRAME":var B=A.getAttribute("data-html2canvas-internal-iframe-key");if(B)return B}return null}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.contains=function(A,e){return 0!=(A&e)},e.distance=function(A,e){return Math.sqrt(A*A+e*e)},e.copyCSSStyles=function(A,e){for(var t=A.length-1;t>=0;t--){var r=A.item(t);"content"!==r&&e.style.setProperty(r,A.getPropertyValue(r))}return e},e.SMALL_IMAGE="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.parseBackgroundImage=e.parseBackground=e.calculateBackgroundRepeatPath=e.calculateBackgroundPosition=e.calculateBackgroungPositioningArea=e.calculateBackgroungPaintingArea=e.calculateGradientBackgroundSize=e.calculateBackgroundSize=e.BACKGROUND_ORIGIN=e.BACKGROUND_CLIP=e.BACKGROUND_SIZE=e.BACKGROUND_REPEAT=void 0;var r=i(t(0)),n=i(t(1)),B=i(t(31)),a=i(t(7)),s=t(2),o=t(17);function i(A){return A&&A.__esModule?A:{default:A}}var c=e.BACKGROUND_REPEAT={REPEAT:0,NO_REPEAT:1,REPEAT_X:2,REPEAT_Y:3},l=e.BACKGROUND_SIZE={AUTO:0,CONTAIN:1,COVER:2,LENGTH:3},u=e.BACKGROUND_CLIP={BORDER_BOX:0,PADDING_BOX:1,CONTENT_BOX:2},Q=e.BACKGROUND_ORIGIN=u,w=function A(e){switch(function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),e){case"contain":this.size=l.CONTAIN;break;case"cover":this.size=l.COVER;break;case"auto":this.size=l.AUTO;break;default:this.value=new n.default(e)}},U=(e.calculateBackgroundSize=function(A,e,t){var r=0,n=0,a=A.size;if(a[0].size===l.CONTAIN||a[0].size===l.COVER){var s=t.width/t.height,o=e.width/e.height;return s<o!=(a[0].size===l.COVER)?new B.default(t.width,t.width/o):new B.default(t.height*o,t.height)}return a[0].value&&(r=a[0].value.getAbsoluteValue(t.width)),a[0].size===l.AUTO&&a[1].size===l.AUTO?n=e.height:a[1].size===l.AUTO?n=r/e.width*e.height:a[1].value&&(n=a[1].value.getAbsoluteValue(t.height)),a[0].size===l.AUTO&&(r=n/e.height*e.width),new B.default(r,n)},e.calculateGradientBackgroundSize=function(A,e){var t=A.size,r=t[0].value?t[0].value.getAbsoluteValue(e.width):e.width,n=t[1].value?t[1].value.getAbsoluteValue(e.height):t[0].value?r:e.height;return new B.default(r,n)},new w("auto")),g=(e.calculateBackgroungPaintingArea=function(A,e){switch(e){case u.BORDER_BOX:return(0,s.calculateBorderBoxPath)(A);case u.PADDING_BOX:default:return(0,s.calculatePaddingBoxPath)(A)}},e.calculateBackgroungPositioningArea=function(A,e,t,r){var n=(0,s.calculatePaddingBox)(e,r);switch(A){case Q.BORDER_BOX:return e;case Q.CONTENT_BOX:var B=t[o.PADDING_SIDES.LEFT].getAbsoluteValue(e.width),a=t[o.PADDING_SIDES.RIGHT].getAbsoluteValue(e.width),i=t[o.PADDING_SIDES.TOP].getAbsoluteValue(e.width),c=t[o.PADDING_SIDES.BOTTOM].getAbsoluteValue(e.width);return new s.Bounds(n.left+B,n.top+i,n.width-B-a,n.height-i-c);case Q.PADDING_BOX:default:return n}},e.calculateBackgroundPosition=function(A,e,t){return new a.default(A[0].getAbsoluteValue(t.width-e.width),A[1].getAbsoluteValue(t.height-e.height))},e.calculateBackgroundRepeatPath=function(A,e,t,r,n){switch(A.repeat){case c.REPEAT_X:return[new a.default(Math.round(n.left),Math.round(r.top+e.y)),new a.default(Math.round(n.left+n.width),Math.round(r.top+e.y)),new a.default(Math.round(n.left+n.width),Math.round(t.height+r.top+e.y)),new a.default(Math.round(n.left),Math.round(t.height+r.top+e.y))];case c.REPEAT_Y:return[new a.default(Math.round(r.left+e.x),Math.round(n.top)),new a.default(Math.round(r.left+e.x+t.width),Math.round(n.top)),new a.default(Math.round(r.left+e.x+t.width),Math.round(n.height+n.top)),new a.default(Math.round(r.left+e.x),Math.round(n.height+n.top))];case c.NO_REPEAT:return[new a.default(Math.round(r.left+e.x),Math.round(r.top+e.y)),new a.default(Math.round(r.left+e.x+t.width),Math.round(r.top+e.y)),new a.default(Math.round(r.left+e.x+t.width),Math.round(r.top+e.y+t.height)),new a.default(Math.round(r.left+e.x),Math.round(r.top+e.y+t.height))];default:return[new a.default(Math.round(n.left),Math.round(n.top)),new a.default(Math.round(n.left+n.width),Math.round(n.top)),new a.default(Math.round(n.left+n.width),Math.round(n.height+n.top)),new a.default(Math.round(n.left),Math.round(n.height+n.top))]}},e.parseBackground=function(A,e){return{backgroundColor:new r.default(A.backgroundColor),backgroundImage:d(A,e),backgroundClip:g(A.backgroundClip),backgroundOrigin:C(A.backgroundOrigin)}},function(A){switch(A){case"padding-box":return u.PADDING_BOX;case"content-box":return u.CONTENT_BOX}return u.BORDER_BOX}),C=function(A){switch(A){case"padding-box":return Q.PADDING_BOX;case"content-box":return Q.CONTENT_BOX}return Q.BORDER_BOX},d=function(A,e){var t=f(A.backgroundImage).map(function(A){if("url"===A.method){var t=e.loadImage(A.args[0]);A.args=t?[t]:[]}return A}),r=A.backgroundPosition.split(","),n=A.backgroundRepeat.split(","),B=A.backgroundSize.split(",");return t.map(function(A,e){var t=(B[e]||"auto").trim().split(" ").map(F),a=(r[e]||"auto").trim().split(" ").map(E);return{source:A,repeat:function(A){switch(A.trim()){case"no-repeat":return c.NO_REPEAT;case"repeat-x":case"repeat no-repeat":return c.REPEAT_X;case"repeat-y":case"no-repeat repeat":return c.REPEAT_Y;case"repeat":return c.REPEAT}return c.REPEAT}("string"==typeof n[e]?n[e]:n[0]),size:t.length<2?[t[0],U]:[t[0],t[1]],position:a.length<2?[a[0],a[0]]:[a[0],a[1]]}})},F=function(A){return"auto"===A?U:new w(A)},E=function(A){switch(A){case"bottom":case"right":return new n.default("100%");case"left":case"top":return new n.default("0%");case"auto":return new n.default("0")}return new n.default(A)},f=e.parseBackgroundImage=function(A){var e=/^\s$/,t=[],r=[],n="",B=null,a="",s=0,o=0,i=function(){var A="";if(n){'"'===a.substr(0,1)&&(a=a.substr(1,a.length-2)),a&&r.push(a.trim());var e=n.indexOf("-",1)+1;"-"===n.substr(0,1)&&e>0&&(A=n.substr(0,e).toLowerCase(),n=n.substr(e)),"none"!==(n=n.toLowerCase())&&t.push({prefix:A,method:n,args:r})}r=[],n=a=""};return A.split("").forEach(function(A){if(0!==s||!e.test(A)){switch(A){case'"':B?B===A&&(B=null):B=A;break;case"(":if(B)break;if(0===s)return void(s=1);o++;break;case")":if(B)break;if(1===s){if(0===o)return s=0,void i();o--}break;case",":if(B)break;if(0===s)return void i();if(1===s&&0===o&&!n.match(/^url$/i))return r.push(a.trim()),void(a="")}0===s?n+=A:a+=A}}),i(),t}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.PATH={VECTOR:0,BEZIER_CURVE:1,CIRCLE:2}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t(6);e.default=function A(e,t){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.type=r.PATH.VECTOR,this.x=e,this.y=t}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.parseListStyle=e.parseListStyleType=e.LIST_STYLE_TYPE=e.LIST_STYLE_POSITION=void 0;var r=t(5),n=e.LIST_STYLE_POSITION={INSIDE:0,OUTSIDE:1},B=e.LIST_STYLE_TYPE={NONE:-1,DISC:0,CIRCLE:1,SQUARE:2,DECIMAL:3,CJK_DECIMAL:4,DECIMAL_LEADING_ZERO:5,LOWER_ROMAN:6,UPPER_ROMAN:7,LOWER_GREEK:8,LOWER_ALPHA:9,UPPER_ALPHA:10,ARABIC_INDIC:11,ARMENIAN:12,BENGALI:13,CAMBODIAN:14,CJK_EARTHLY_BRANCH:15,CJK_HEAVENLY_STEM:16,CJK_IDEOGRAPHIC:17,DEVANAGARI:18,ETHIOPIC_NUMERIC:19,GEORGIAN:20,GUJARATI:21,GURMUKHI:22,HEBREW:22,HIRAGANA:23,HIRAGANA_IROHA:24,JAPANESE_FORMAL:25,JAPANESE_INFORMAL:26,KANNADA:27,KATAKANA:28,KATAKANA_IROHA:29,KHMER:30,KOREAN_HANGUL_FORMAL:31,KOREAN_HANJA_FORMAL:32,KOREAN_HANJA_INFORMAL:33,LAO:34,LOWER_ARMENIAN:35,MALAYALAM:36,MONGOLIAN:37,MYANMAR:38,ORIYA:39,PERSIAN:40,SIMP_CHINESE_FORMAL:41,SIMP_CHINESE_INFORMAL:42,TAMIL:43,TELUGU:44,THAI:45,TIBETAN:46,TRAD_CHINESE_FORMAL:47,TRAD_CHINESE_INFORMAL:48,UPPER_ARMENIAN:49,DISCLOSURE_OPEN:50,DISCLOSURE_CLOSED:51},a=e.parseListStyleType=function(A){switch(A){case"disc":return B.DISC;case"circle":return B.CIRCLE;case"square":return B.SQUARE;case"decimal":return B.DECIMAL;case"cjk-decimal":return B.CJK_DECIMAL;case"decimal-leading-zero":return B.DECIMAL_LEADING_ZERO;case"lower-roman":return B.LOWER_ROMAN;case"upper-roman":return B.UPPER_ROMAN;case"lower-greek":return B.LOWER_GREEK;case"lower-alpha":return B.LOWER_ALPHA;case"upper-alpha":return B.UPPER_ALPHA;case"arabic-indic":return B.ARABIC_INDIC;case"armenian":return B.ARMENIAN;case"bengali":return B.BENGALI;case"cambodian":return B.CAMBODIAN;case"cjk-earthly-branch":return B.CJK_EARTHLY_BRANCH;case"cjk-heavenly-stem":return B.CJK_HEAVENLY_STEM;case"cjk-ideographic":return B.CJK_IDEOGRAPHIC;case"devanagari":return B.DEVANAGARI;case"ethiopic-numeric":return B.ETHIOPIC_NUMERIC;case"georgian":return B.GEORGIAN;case"gujarati":return B.GUJARATI;case"gurmukhi":return B.GURMUKHI;case"hebrew":return B.HEBREW;case"hiragana":return B.HIRAGANA;case"hiragana-iroha":return B.HIRAGANA_IROHA;case"japanese-formal":return B.JAPANESE_FORMAL;case"japanese-informal":return B.JAPANESE_INFORMAL;case"kannada":return B.KANNADA;case"katakana":return B.KATAKANA;case"katakana-iroha":return B.KATAKANA_IROHA;case"khmer":return B.KHMER;case"korean-hangul-formal":return B.KOREAN_HANGUL_FORMAL;case"korean-hanja-formal":return B.KOREAN_HANJA_FORMAL;case"korean-hanja-informal":return B.KOREAN_HANJA_INFORMAL;case"lao":return B.LAO;case"lower-armenian":return B.LOWER_ARMENIAN;case"malayalam":return B.MALAYALAM;case"mongolian":return B.MONGOLIAN;case"myanmar":return B.MYANMAR;case"oriya":return B.ORIYA;case"persian":return B.PERSIAN;case"simp-chinese-formal":return B.SIMP_CHINESE_FORMAL;case"simp-chinese-informal":return B.SIMP_CHINESE_INFORMAL;case"tamil":return B.TAMIL;case"telugu":return B.TELUGU;case"thai":return B.THAI;case"tibetan":return B.TIBETAN;case"trad-chinese-formal":return B.TRAD_CHINESE_FORMAL;case"trad-chinese-informal":return B.TRAD_CHINESE_INFORMAL;case"upper-armenian":return B.UPPER_ARMENIAN;case"disclosure-open":return B.DISCLOSURE_OPEN;case"disclosure-closed":return B.DISCLOSURE_CLOSED;case"none":default:return B.NONE}},s=(e.parseListStyle=function(A){var e=(0,r.parseBackgroundImage)(A.getPropertyValue("list-style-image"));return{listStyleType:a(A.getPropertyValue("list-style-type")),listStyleImage:e.length?e[0]:null,listStylePosition:s(A.getPropertyValue("list-style-position"))}},function(A){switch(A){case"inside":return n.INSIDE;case"outside":default:return n.OUTSIDE}})},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),n=t(20),B=t(22);var a=function(){function A(e,t,r){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.text=e,this.parent=t,this.bounds=r}return r(A,null,[{key:"fromTextNode",value:function(e,t){var r=o(e.data,t.style.textTransform);return new A(r,t,(0,B.parseTextBounds)(r,t,e))}}]),A}();e.default=a;var s=/(^|\s|:|-|\(|\))([a-z])/g,o=function(A,e){switch(e){case n.TEXT_TRANSFORM.LOWERCASE:return A.toLowerCase();case n.TEXT_TRANSFORM.CAPITALIZE:return A.replace(s,i);case n.TEXT_TRANSFORM.UPPERCASE:return A.toUpperCase();default:return A}};function i(A,e,t){return A.length>0?e+t.toUpperCase():A}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t(23),n=function(A){return 0===A[0]&&255===A[1]&&0===A[2]&&255===A[3]},B={get SUPPORT_RANGE_BOUNDS(){var A=function(A){if(A.createRange){var e=A.createRange();if(e.getBoundingClientRect){var t=A.createElement("boundtest");t.style.height="123px",t.style.display="block",A.body.appendChild(t),e.selectNode(t);var r=e.getBoundingClientRect(),n=Math.round(r.height);if(A.body.removeChild(t),123===n)return!0}}return!1}(document);return Object.defineProperty(B,"SUPPORT_RANGE_BOUNDS",{value:A}),A},get SUPPORT_SVG_DRAWING(){var A=function(A){var e=new Image,t=A.createElement("canvas"),r=t.getContext("2d");e.src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";try{r.drawImage(e,0,0),t.toDataURL()}catch(A){return!1}return!0}(document);return Object.defineProperty(B,"SUPPORT_SVG_DRAWING",{value:A}),A},get SUPPORT_BASE64_DRAWING(){return function(A){var e=function(A,e){var t=new Image,r=A.createElement("canvas"),n=r.getContext("2d");return new Promise(function(A){t.src=e;var B=function(){try{n.drawImage(t,0,0),r.toDataURL()}catch(e){return A(!1)}return A(!0)};t.onload=B,t.onerror=function(){return A(!1)},!0===t.complete&&setTimeout(function(){B()},500)})}(document,A);return Object.defineProperty(B,"SUPPORT_BASE64_DRAWING",{value:function(){return e}}),e}},get SUPPORT_FOREIGNOBJECT_DRAWING(){var A="function"==typeof Array.from&&"function"==typeof window.fetch?function(A){var e=A.createElement("canvas");e.width=100,e.height=100;var t=e.getContext("2d");t.fillStyle="rgb(0, 255, 0)",t.fillRect(0,0,100,100);var B=new Image,a=e.toDataURL();B.src=a;var s=(0,r.createForeignObjectSVG)(100,100,0,0,B);return t.fillStyle="red",t.fillRect(0,0,100,100),(0,r.loadSerializedSVG)(s).then(function(e){t.drawImage(e,0,0);var B=t.getImageData(0,0,100,100).data;t.fillStyle="red",t.fillRect(0,0,100,100);var s=A.createElement("div");return s.style.backgroundImage="url("+a+")",s.style.height="100px",n(B)?(0,r.loadSerializedSVG)((0,r.createForeignObjectSVG)(100,100,0,0,s)):Promise.reject(!1)}).then(function(A){return t.drawImage(A,0,0),n(t.getImageData(0,0,100,100).data)}).catch(function(A){return!1})}(document):Promise.resolve(!1);return Object.defineProperty(B,"SUPPORT_FOREIGNOBJECT_DRAWING",{value:A}),A},get SUPPORT_CORS_IMAGES(){var A=void 0!==(new Image).crossOrigin;return Object.defineProperty(B,"SUPPORT_CORS_IMAGES",{value:A}),A},get SUPPORT_RESPONSE_TYPE(){var A="string"==typeof(new XMLHttpRequest).responseType;return Object.defineProperty(B,"SUPPORT_RESPONSE_TYPE",{value:A}),A},get SUPPORT_CORS_XHR(){var A="withCredentials"in new XMLHttpRequest;return Object.defineProperty(B,"SUPPORT_CORS_XHR",{value:A}),A}};e.default=B},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.parseTextDecoration=e.TEXT_DECORATION_LINE=e.TEXT_DECORATION=e.TEXT_DECORATION_STYLE=void 0;var r,n=t(0),B=(r=n)&&r.__esModule?r:{default:r};var a=e.TEXT_DECORATION_STYLE={SOLID:0,DOUBLE:1,DOTTED:2,DASHED:3,WAVY:4},s=e.TEXT_DECORATION={NONE:null},o=e.TEXT_DECORATION_LINE={UNDERLINE:1,OVERLINE:2,LINE_THROUGH:3,BLINK:4},i=function(A){switch(A){case"underline":return o.UNDERLINE;case"overline":return o.OVERLINE;case"line-through":return o.LINE_THROUGH}return o.BLINK};e.parseTextDecoration=function(A){var e,t="none"===(e=A.textDecorationLine?A.textDecorationLine:A.textDecoration)?null:e.split(" ").map(i);return null===t?s.NONE:{textDecorationLine:t,textDecorationColor:A.textDecorationColor?new B.default(A.textDecorationColor):null,textDecorationStyle:function(A){switch(A){case"double":return a.DOUBLE;case"dotted":return a.DOTTED;case"dashed":return a.DASHED;case"wavy":return a.WAVY}return a.SOLID}(A.textDecorationStyle)}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.parseBorder=e.BORDER_SIDES=e.BORDER_STYLE=void 0;var r,n=t(0),B=(r=n)&&r.__esModule?r:{default:r};var a=e.BORDER_STYLE={NONE:0,SOLID:1},s=e.BORDER_SIDES={TOP:0,RIGHT:1,BOTTOM:2,LEFT:3},o=Object.keys(s).map(function(A){return A.toLowerCase()});e.parseBorder=function(A){return o.map(function(e){var t=new B.default(A.getPropertyValue("border-"+e+"-color")),r=function(A){switch(A){case"none":return a.NONE}return a.SOLID}(A.getPropertyValue("border-"+e+"-style")),n=parseFloat(A.getPropertyValue("border-"+e+"-width"));return{borderColor:t,borderStyle:r,borderWidth:isNaN(n)?0:n}})}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.toCodePoints=function(A){for(var e=[],t=0,r=A.length;t<r;){var n=A.charCodeAt(t++);if(n>=55296&&n<=56319&&t<r){var B=A.charCodeAt(t++);56320==(64512&B)?e.push(((1023&n)<<10)+(1023&B)+65536):(e.push(n),t--)}else e.push(n)}return e},e.fromCodePoint=function(){if(String.fromCodePoint)return String.fromCodePoint.apply(String,arguments);var A=arguments.length;if(!A)return"";for(var e=[],t=-1,r="";++t<A;){var n=arguments.length<=t?void 0:arguments[t];n<=65535?e.push(n):(n-=65536,e.push(55296+(n>>10),n%1024+56320)),(t+1===A||e.length>16384)&&(r+=String.fromCharCode.apply(String,e),e.length=0)}return r};for(var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n="undefined"==typeof Uint8Array?[]:new Uint8Array(256),B=0;B<r.length;B++)n[r.charCodeAt(B)]=B;e.decode=function(A){var e=.75*A.length,t=A.length,r=void 0,B=0,a=void 0,s=void 0,o=void 0,i=void 0;"="===A[A.length-1]&&(e--,"="===A[A.length-2]&&e--);var c="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array&&void 0!==Uint8Array.prototype.slice?new ArrayBuffer(e):new Array(e),l=Array.isArray(c)?c:new Uint8Array(c);for(r=0;r<t;r+=4)a=n[A.charCodeAt(r)],s=n[A.charCodeAt(r+1)],o=n[A.charCodeAt(r+2)],i=n[A.charCodeAt(r+3)],l[B++]=a<<2|s>>4,l[B++]=(15&s)<<4|o>>2,l[B++]=(3&o)<<6|63&i;return c},e.polyUint16Array=function(A){for(var e=A.length,t=[],r=0;r<e;r+=2)t.push(A[r+1]<<8|A[r]);return t},e.polyUint32Array=function(A){for(var e=A.length,t=[],r=0;r<e;r+=4)t.push(A[r+3]<<24|A[r+2]<<16|A[r+1]<<8|A[r]);return t}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createCounterText=e.inlineListItemElement=e.getListOwner=void 0;var r=t(4),n=o(t(3)),B=o(t(9)),a=t(8),s=t(24);function o(A){return A&&A.__esModule?A:{default:A}}var i=["OL","UL","MENU"],c=(e.getListOwner=function(A){var e=A.parent;if(!e)return null;do{if(-1!==i.indexOf(e.tagName))return e;e=e.parent}while(e);return A.parent},e.inlineListItemElement=function(A,e,t){var s=e.style.listStyle;if(s){var o=A.ownerDocument.defaultView.getComputedStyle(A,null),i=A.ownerDocument.createElement("html2canvaswrapper");switch((0,r.copyCSSStyles)(o,i),i.style.position="absolute",i.style.bottom="auto",i.style.display="block",i.style.letterSpacing="normal",s.listStylePosition){case a.LIST_STYLE_POSITION.OUTSIDE:i.style.left="auto",i.style.right=A.ownerDocument.defaultView.innerWidth-e.bounds.left-e.style.margin[1].getAbsoluteValue(e.bounds.width)+7+"px",i.style.textAlign="right";break;case a.LIST_STYLE_POSITION.INSIDE:i.style.left=e.bounds.left-e.style.margin[3].getAbsoluteValue(e.bounds.width)+"px",i.style.right="auto",i.style.textAlign="left"}var c=void 0,l=e.style.margin[0].getAbsoluteValue(e.bounds.width),u=s.listStyleImage;if(u)if("url"===u.method){var Q=A.ownerDocument.createElement("img");Q.src=u.args[0],i.style.top=e.bounds.top-l+"px",i.style.width="auto",i.style.height="auto",i.appendChild(Q)}else{var w=.5*parseFloat(e.style.font.fontSize);i.style.top=e.bounds.top-l+e.bounds.height-1.5*w+"px",i.style.width=w+"px",i.style.height=w+"px",i.style.backgroundImage=o.listStyleImage}else"number"==typeof e.listIndex&&(c=A.ownerDocument.createTextNode(F(e.listIndex,s.listStyleType,!0)),i.appendChild(c),i.style.top=e.bounds.top-l+"px");var U=A.ownerDocument.body;U.appendChild(i),c?(e.childNodes.push(B.default.fromTextNode(c,e)),U.removeChild(i)):e.childNodes.push(new n.default(i,e,t,0))}},{integers:[1e3,900,500,400,100,90,50,40,10,9,5,4,1],values:["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]}),l={integers:[9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["Ք","Փ","Ւ","Ց","Ր","Տ","Վ","Ս","Ռ","Ջ","Պ","Չ","Ո","Շ","Ն","Յ","Մ","Ճ","Ղ","Ձ","Հ","Կ","Ծ","Խ","Լ","Ի","Ժ","Թ","Ը","Է","Զ","Ե","Դ","Գ","Բ","Ա"]},u={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,400,300,200,100,90,80,70,60,50,40,30,20,19,18,17,16,15,10,9,8,7,6,5,4,3,2,1],values:["י׳","ט׳","ח׳","ז׳","ו׳","ה׳","ד׳","ג׳","ב׳","א׳","ת","ש","ר","ק","צ","פ","ע","ס","נ","מ","ל","כ","יט","יח","יז","טז","טו","י","ט","ח","ז","ו","ה","ד","ג","ב","א"]},Q={integers:[1e4,9e3,8e3,7e3,6e3,5e3,4e3,3e3,2e3,1e3,900,800,700,600,500,400,300,200,100,90,80,70,60,50,40,30,20,10,9,8,7,6,5,4,3,2,1],values:["ჵ","ჰ","ჯ","ჴ","ხ","ჭ","წ","ძ","ც","ჩ","შ","ყ","ღ","ქ","ფ","ჳ","ტ","ს","რ","ჟ","პ","ო","ჲ","ნ","მ","ლ","კ","ი","თ","ჱ","ზ","ვ","ე","დ","გ","ბ","ა"]},w=function(A,e,t,r,n,B){return A<e||A>t?F(A,n,B.length>0):r.integers.reduce(function(e,t,n){for(;A>=t;)A-=t,e+=r.values[n];return e},"")+B},U=function(A,e,t,r){var n="";do{t||A--,n=r(A)+n,A/=e}while(A*e>=e);return n},g=function(A,e,t,r,n){var B=t-e+1;return(A<0?"-":"")+(U(Math.abs(A),B,r,function(A){return(0,s.fromCodePoint)(Math.floor(A%B)+e)})+n)},C=function(A,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:". ",r=e.length;return U(Math.abs(A),r,!1,function(A){return e[Math.floor(A%r)]})+t},d=function(A,e,t,n,B,s){if(A<-9999||A>9999)return F(A,a.LIST_STYLE_TYPE.CJK_DECIMAL,B.length>0);var o=Math.abs(A),i=B;if(0===o)return e[0]+i;for(var c=0;o>0&&c<=4;c++){var l=o%10;0===l&&(0,r.contains)(s,1)&&""!==i?i=e[l]+i:l>1||1===l&&0===c||1===l&&1===c&&(0,r.contains)(s,2)||1===l&&1===c&&(0,r.contains)(s,4)&&A>100||1===l&&c>1&&(0,r.contains)(s,8)?i=e[l]+(c>0?t[c-1]:"")+i:1===l&&c>0&&(i=t[c-1]+i),o=Math.floor(o/10)}return(A<0?n:"")+i},F=e.createCounterText=function(A,e,t){var r=t?". ":"",n=t?"、":"",B=t?", ":"";switch(e){case a.LIST_STYLE_TYPE.DISC:return"•";case a.LIST_STYLE_TYPE.CIRCLE:return"◦";case a.LIST_STYLE_TYPE.SQUARE:return"◾";case a.LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO:var s=g(A,48,57,!0,r);return s.length<4?"0"+s:s;case a.LIST_STYLE_TYPE.CJK_DECIMAL:return C(A,"〇一二三四五六七八九",n);case a.LIST_STYLE_TYPE.LOWER_ROMAN:return w(A,1,3999,c,a.LIST_STYLE_TYPE.DECIMAL,r).toLowerCase();case a.LIST_STYLE_TYPE.UPPER_ROMAN:return w(A,1,3999,c,a.LIST_STYLE_TYPE.DECIMAL,r);case a.LIST_STYLE_TYPE.LOWER_GREEK:return g(A,945,969,!1,r);case a.LIST_STYLE_TYPE.LOWER_ALPHA:return g(A,97,122,!1,r);case a.LIST_STYLE_TYPE.UPPER_ALPHA:return g(A,65,90,!1,r);case a.LIST_STYLE_TYPE.ARABIC_INDIC:return g(A,1632,1641,!0,r);case a.LIST_STYLE_TYPE.ARMENIAN:case a.LIST_STYLE_TYPE.UPPER_ARMENIAN:return w(A,1,9999,l,a.LIST_STYLE_TYPE.DECIMAL,r);case a.LIST_STYLE_TYPE.LOWER_ARMENIAN:return w(A,1,9999,l,a.LIST_STYLE_TYPE.DECIMAL,r).toLowerCase();case a.LIST_STYLE_TYPE.BENGALI:return g(A,2534,2543,!0,r);case a.LIST_STYLE_TYPE.CAMBODIAN:case a.LIST_STYLE_TYPE.KHMER:return g(A,6112,6121,!0,r);case a.LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH:return C(A,"子丑寅卯辰巳午未申酉戌亥",n);case a.LIST_STYLE_TYPE.CJK_HEAVENLY_STEM:return C(A,"甲乙丙丁戊己庚辛壬癸",n);case a.LIST_STYLE_TYPE.CJK_IDEOGRAPHIC:case a.LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL:return d(A,"零一二三四五六七八九","十百千萬","負",n,14);case a.LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL:return d(A,"零壹貳參肆伍陸柒捌玖","拾佰仟萬","負",n,15);case a.LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL:return d(A,"零一二三四五六七八九","十百千萬","负",n,14);case a.LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL:return d(A,"零壹贰叁肆伍陆柒捌玖","拾佰仟萬","负",n,15);case a.LIST_STYLE_TYPE.JAPANESE_INFORMAL:return d(A,"〇一二三四五六七八九","十百千万","マイナス",n,0);case a.LIST_STYLE_TYPE.JAPANESE_FORMAL:return d(A,"零壱弐参四伍六七八九","拾百千万","マイナス",n,7);case a.LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL:return d(A,"영일이삼사오육칠팔구","십백천만","마이너스 ",B,7);case a.LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL:return d(A,"零一二三四五六七八九","十百千萬","마이너스 ",B,0);case a.LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL:return d(A,"零壹貳參四五六七八九","拾百千","마이너스 ",B,7);case a.LIST_STYLE_TYPE.DEVANAGARI:return g(A,2406,2415,!0,r);case a.LIST_STYLE_TYPE.GEORGIAN:return w(A,1,19999,Q,a.LIST_STYLE_TYPE.DECIMAL,r);case a.LIST_STYLE_TYPE.GUJARATI:return g(A,2790,2799,!0,r);case a.LIST_STYLE_TYPE.GURMUKHI:return g(A,2662,2671,!0,r);case a.LIST_STYLE_TYPE.HEBREW:return w(A,1,10999,u,a.LIST_STYLE_TYPE.DECIMAL,r);case a.LIST_STYLE_TYPE.HIRAGANA:return C(A,"あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん");case a.LIST_STYLE_TYPE.HIRAGANA_IROHA:return C(A,"いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす");case a.LIST_STYLE_TYPE.KANNADA:return g(A,3302,3311,!0,r);case a.LIST_STYLE_TYPE.KATAKANA:return C(A,"アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン",n);case a.LIST_STYLE_TYPE.KATAKANA_IROHA:return C(A,"イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス",n);case a.LIST_STYLE_TYPE.LAO:return g(A,3792,3801,!0,r);case a.LIST_STYLE_TYPE.MONGOLIAN:return g(A,6160,6169,!0,r);case a.LIST_STYLE_TYPE.MYANMAR:return g(A,4160,4169,!0,r);case a.LIST_STYLE_TYPE.ORIYA:return g(A,2918,2927,!0,r);case a.LIST_STYLE_TYPE.PERSIAN:return g(A,1776,1785,!0,r);case a.LIST_STYLE_TYPE.TAMIL:return g(A,3046,3055,!0,r);case a.LIST_STYLE_TYPE.TELUGU:return g(A,3174,3183,!0,r);case a.LIST_STYLE_TYPE.THAI:return g(A,3664,3673,!0,r);case a.LIST_STYLE_TYPE.TIBETAN:return g(A,3872,3881,!0,r);case a.LIST_STYLE_TYPE.DECIMAL:default:return g(A,48,57,!0,r)}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),n=t(6),B=t(11);var a=function(A,e){var t=Math.max.apply(null,A.colorStops.map(function(A){return A.stop})),r=1/Math.max(1,t);A.colorStops.forEach(function(A){e.addColorStop(r*A.stop,A.color.toString())})},s=function(){function A(e){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.canvas=e||document.createElement("canvas")}return r(A,[{key:"render",value:function(A){this.ctx=this.canvas.getContext("2d"),this.options=A,this.canvas.width=Math.floor(A.width*A.scale),this.canvas.height=Math.floor(A.height*A.scale),this.canvas.style.width=A.width+"px",this.canvas.style.height=A.height+"px",this.ctx.scale(this.options.scale,this.options.scale),this.ctx.translate(-A.x,-A.y),this.ctx.textBaseline="bottom",A.logger.log("Canvas renderer initialized ("+A.width+"x"+A.height+" at "+A.x+","+A.y+") with scale "+this.options.scale)}},{key:"clip",value:function(A,e){var t=this;A.length&&(this.ctx.save(),A.forEach(function(A){t.path(A),t.ctx.clip()})),e(),A.length&&this.ctx.restore()}},{key:"drawImage",value:function(A,e,t){this.ctx.drawImage(A,e.left,e.top,e.width,e.height,t.left,t.top,t.width,t.height)}},{key:"drawShape",value:function(A,e){this.path(A),this.ctx.fillStyle=e.toString(),this.ctx.fill()}},{key:"fill",value:function(A){this.ctx.fillStyle=A.toString(),this.ctx.fill()}},{key:"getTarget",value:function(){return this.canvas.getContext("2d").setTransform(1,0,0,1,0,0),Promise.resolve(this.canvas)}},{key:"path",value:function(A){var e=this;this.ctx.beginPath(),Array.isArray(A)?A.forEach(function(A,t){var r=A.type===n.PATH.VECTOR?A:A.start;0===t?e.ctx.moveTo(r.x,r.y):e.ctx.lineTo(r.x,r.y),A.type===n.PATH.BEZIER_CURVE&&e.ctx.bezierCurveTo(A.startControl.x,A.startControl.y,A.endControl.x,A.endControl.y,A.end.x,A.end.y)}):this.ctx.arc(A.x+A.radius,A.y+A.radius,A.radius,0,2*Math.PI,!0),this.ctx.closePath()}},{key:"rectangle",value:function(A,e,t,r,n){this.ctx.fillStyle=n.toString(),this.ctx.fillRect(A,e,t,r)}},{key:"renderLinearGradient",value:function(A,e){var t=this.ctx.createLinearGradient(A.left+e.direction.x1,A.top+e.direction.y1,A.left+e.direction.x0,A.top+e.direction.y0);a(e,t),this.ctx.fillStyle=t,this.ctx.fillRect(A.left,A.top,A.width,A.height)}},{key:"renderRadialGradient",value:function(A,e){var t=this,r=A.left+e.center.x,n=A.top+e.center.y,B=this.ctx.createRadialGradient(r,n,0,r,n,e.radius.x);if(B)if(a(e,B),this.ctx.fillStyle=B,e.radius.x!==e.radius.y){var s=A.left+.5*A.width,o=A.top+.5*A.height,i=e.radius.y/e.radius.x,c=1/i;this.transform(s,o,[1,0,0,i,0,0],function(){return t.ctx.fillRect(A.left,c*(A.top-o)+o,A.width,A.height*c)})}else this.ctx.fillRect(A.left,A.top,A.width,A.height)}},{key:"renderRepeat",value:function(A,e,t,r,n){this.path(A),this.ctx.fillStyle=this.ctx.createPattern(this.resizeImage(e,t),"repeat"),this.ctx.translate(r,n),this.ctx.fill(),this.ctx.translate(-r,-n)}},{key:"renderTextNode",value:function(A,e,t,r,n){var a=this;this.ctx.font=[t.fontStyle,t.fontVariant,t.fontWeight,t.fontSize,t.fontFamily].join(" "),A.forEach(function(A){if(a.ctx.fillStyle=e.toString(),n&&A.text.trim().length?n.slice(0).reverse().forEach(function(e){a.ctx.shadowColor=e.color.toString(),a.ctx.shadowOffsetX=e.offsetX*a.options.scale,a.ctx.shadowOffsetY=e.offsetY*a.options.scale,a.ctx.shadowBlur=e.blur,a.ctx.fillText(A.text,A.bounds.left,A.bounds.top+A.bounds.height)}):a.ctx.fillText(A.text,A.bounds.left,A.bounds.top+A.bounds.height),null!==r){var s=r.textDecorationColor||e;r.textDecorationLine.forEach(function(e){switch(e){case B.TEXT_DECORATION_LINE.UNDERLINE:var r=a.options.fontMetrics.getMetrics(t).baseline;a.rectangle(A.bounds.left,Math.round(A.bounds.top+r),A.bounds.width,1,s);break;case B.TEXT_DECORATION_LINE.OVERLINE:a.rectangle(A.bounds.left,Math.round(A.bounds.top),A.bounds.width,1,s);break;case B.TEXT_DECORATION_LINE.LINE_THROUGH:var n=a.options.fontMetrics.getMetrics(t).middle;a.rectangle(A.bounds.left,Math.ceil(A.bounds.top+n),A.bounds.width,1,s)}})}})}},{key:"resizeImage",value:function(A,e){if(A.width===e.width&&A.height===e.height)return A;var t=this.canvas.ownerDocument.createElement("canvas");return t.width=e.width,t.height=e.height,t.getContext("2d").drawImage(A,0,0,A.width,A.height,0,0,e.width,e.height),t}},{key:"setOpacity",value:function(A){this.ctx.globalAlpha=A}},{key:"transform",value:function(A,e,t,r){this.ctx.save(),this.ctx.translate(A,e),this.ctx.transform(t[0],t[1],t[2],t[3],t[4],t[5]),this.ctx.translate(-A,-e),r(),this.ctx.restore()}}]),A}();e.default=s},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}();var n=function(){function A(e,t,r){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.enabled="undefined"!=typeof window&&e,this.start=r||Date.now(),this.id=t}return r(A,[{key:"child",value:function(e){return new A(this.enabled,e,this.start)}},{key:"log",value:function(){if(this.enabled&&window.console&&window.console.log){for(var A=arguments.length,e=Array(A),t=0;t<A;t++)e[t]=arguments[t];Function.prototype.bind.call(window.console.log,window.console).apply(window.console,[Date.now()-this.start+"ms",this.id?"html2canvas ("+this.id+"):":"html2canvas:"].concat([].slice.call(e,0)))}}},{key:"error",value:function(){if(this.enabled&&window.console&&window.console.error){for(var A=arguments.length,e=Array(A),t=0;t<A;t++)e[t]=arguments[t];Function.prototype.bind.call(window.console.error,window.console).apply(window.console,[Date.now()-this.start+"ms",this.id?"html2canvas ("+this.id+"):":"html2canvas:"].concat([].slice.call(e,0)))}}}]),A}();e.default=n},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.parsePadding=e.PADDING_SIDES=void 0;var r,n=t(1),B=(r=n)&&r.__esModule?r:{default:r};e.PADDING_SIDES={TOP:0,RIGHT:1,BOTTOM:2,LEFT:3};var a=["top","right","bottom","left"];e.parsePadding=function(A){return a.map(function(e){return new B.default(A.getPropertyValue("padding-"+e))})}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=e.OVERFLOW_WRAP={NORMAL:0,BREAK_WORD:1};e.parseOverflowWrap=function(A){switch(A){case"break-word":return r.BREAK_WORD;case"normal":default:return r.NORMAL}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=e.POSITION={STATIC:0,RELATIVE:1,ABSOLUTE:2,FIXED:3,STICKY:4};e.parsePosition=function(A){switch(A){case"relative":return r.RELATIVE;case"absolute":return r.ABSOLUTE;case"fixed":return r.FIXED;case"sticky":return r.STICKY}return r.STATIC}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=e.TEXT_TRANSFORM={NONE:0,LOWERCASE:1,UPPERCASE:2,CAPITALIZE:3};e.parseTextTransform=function(A){switch(A){case"uppercase":return r.UPPERCASE;case"lowercase":return r.LOWERCASE;case"capitalize":return r.CAPITALIZE}return r.NONE}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.reformatInputBounds=e.inlineSelectElement=e.inlineTextAreaElement=e.inlineInputElement=e.getInputBorderRadius=e.INPUT_BACKGROUND=e.INPUT_BORDERS=e.INPUT_COLOR=void 0;var r=l(t(9)),n=t(5),B=t(12),a=l(t(50)),s=l(t(7)),o=l(t(0)),i=l(t(1)),c=(t(2),t(22),t(4));function l(A){return A&&A.__esModule?A:{default:A}}e.INPUT_COLOR=new o.default([42,42,42]);var u=new o.default([165,165,165]),Q=new o.default([222,222,222]),w={borderWidth:1,borderColor:u,borderStyle:B.BORDER_STYLE.SOLID},U=(e.INPUT_BORDERS=[w,w,w,w],e.INPUT_BACKGROUND={backgroundColor:Q,backgroundImage:[],backgroundClip:n.BACKGROUND_CLIP.PADDING_BOX,backgroundOrigin:n.BACKGROUND_ORIGIN.PADDING_BOX},new i.default("50%")),g=[U,U],C=[g,g,g,g],d=new i.default("3px"),F=[d,d],E=[F,F,F,F],f=(e.getInputBorderRadius=function(A){return"radio"===A.type?C:E},e.inlineInputElement=function(A,e){if("radio"===A.type||"checkbox"===A.type){if(A.checked){var t=Math.min(e.bounds.width,e.bounds.height);e.childNodes.push("checkbox"===A.type?[new s.default(e.bounds.left+.39363*t,e.bounds.top+.79*t),new s.default(e.bounds.left+.16*t,e.bounds.top+.5549*t),new s.default(e.bounds.left+.27347*t,e.bounds.top+.44071*t),new s.default(e.bounds.left+.39694*t,e.bounds.top+.5649*t),new s.default(e.bounds.left+.72983*t,e.bounds.top+.23*t),new s.default(e.bounds.left+.84*t,e.bounds.top+.34085*t),new s.default(e.bounds.left+.39363*t,e.bounds.top+.79*t)]:new a.default(e.bounds.left+t/4,e.bounds.top+t/4,t/4))}}else f(h(A),A,e,!1)},e.inlineTextAreaElement=function(A,e){f(A.value,A,e,!0)},e.inlineSelectElement=function(A,e){var t=A.options[A.selectedIndex||0];f(t&&t.text||"",A,e,!1)},e.reformatInputBounds=function(A){return A.width>A.height?(A.left+=(A.width-A.height)/2,A.width=A.height):A.width<A.height&&(A.top+=(A.height-A.width)/2,A.height=A.width),A},function(A,e,t,n){var B=e.ownerDocument.body;if(A.length>0&&B){var a=e.ownerDocument.createElement("html2canvaswrapper");(0,c.copyCSSStyles)(e.ownerDocument.defaultView.getComputedStyle(e,null),a),a.style.position="absolute",a.style.left=t.bounds.left+"px",a.style.top=t.bounds.top+"px",n||(a.style.whiteSpace="nowrap");var s=e.ownerDocument.createTextNode(A);a.appendChild(s),B.appendChild(a),t.childNodes.push(r.default.fromTextNode(s,t)),B.removeChild(a)}}),h=function(A){var e="password"===A.type?new Array(A.value.length+1).join("•"):A.value;return 0===e.length?A.placeholder||"":e}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.parseTextBounds=e.TextBounds=void 0;var r,n=t(2),B=t(11),a=t(10),s=(r=a)&&r.__esModule?r:{default:r},o=t(24);var i=e.TextBounds=function A(e,t){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.text=e,this.bounds=t},c=(e.parseTextBounds=function(A,e,t){for(var r=0!==e.style.letterSpacing?(0,o.toCodePoints)(A).map(function(A){return(0,o.fromCodePoint)(A)}):(0,o.breakWords)(A,e),n=r.length,a=t.parentNode?t.parentNode.ownerDocument.defaultView:null,u=a?a.pageXOffset:0,Q=a?a.pageYOffset:0,w=[],U=0,g=0;g<n;g++){var C=r[g];if(e.style.textDecoration!==B.TEXT_DECORATION.NONE||C.trim().length>0)if(s.default.SUPPORT_RANGE_BOUNDS)w.push(new i(C,l(t,U,C.length,u,Q)));else{var d=t.splitText(C.length);w.push(new i(C,c(t,u,Q))),t=d}else s.default.SUPPORT_RANGE_BOUNDS||(t=t.splitText(C.length));U+=C.length}return w},function(A,e,t){var r=A.ownerDocument.createElement("html2canvaswrapper");r.appendChild(A.cloneNode(!0));var B=A.parentNode;if(B){B.replaceChild(r,A);var a=(0,n.parseBounds)(r,e,t);return r.firstChild&&B.replaceChild(r.firstChild,r),a}return new n.Bounds(0,0,0,0)}),l=function(A,e,t,r,B){var a=A.ownerDocument.createRange();return a.setStart(A,e),a.setEnd(A,e+t),n.Bounds.fromClientRect(a.getBoundingClientRect(),r,B)}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}();var n=function(){function A(e){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.element=e}return r(A,[{key:"render",value:function(A){var e=this;this.options=A,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.width=Math.floor(A.width)*A.scale,this.canvas.height=Math.floor(A.height)*A.scale,this.canvas.style.width=A.width+"px",this.canvas.style.height=A.height+"px",A.logger.log("ForeignObject renderer initialized ("+A.width+"x"+A.height+" at "+A.x+","+A.y+") with scale "+A.scale);var t=B(Math.max(A.windowWidth,A.width)*A.scale,Math.max(A.windowHeight,A.height)*A.scale,A.scrollX*A.scale,A.scrollY*A.scale,this.element);return a(t).then(function(t){return A.backgroundColor&&(e.ctx.fillStyle=A.backgroundColor.toString(),e.ctx.fillRect(0,0,A.width*A.scale,A.height*A.scale)),e.ctx.drawImage(t,-A.x*A.scale,-A.y*A.scale),e.canvas})}}]),A}();e.default=n;var B=e.createForeignObjectSVG=function(A,e,t,r,n){var B="http://www.w3.org/2000/svg",a=document.createElementNS(B,"svg"),s=document.createElementNS(B,"foreignObject");return a.setAttributeNS(null,"width",A),a.setAttributeNS(null,"height",e),s.setAttributeNS(null,"width","100%"),s.setAttributeNS(null,"height","100%"),s.setAttributeNS(null,"x",t),s.setAttributeNS(null,"y",r),s.setAttributeNS(null,"externalResourcesRequired","true"),a.appendChild(s),s.appendChild(n),a},a=e.loadSerializedSVG=function(A){return new Promise(function(e,t){var r=new Image;r.onload=function(){return e(r)},r.onerror=t,r.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent((new XMLSerializer).serializeToString(A))})}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.breakWords=e.fromCodePoint=e.toCodePoints=void 0;var r=t(46);Object.defineProperty(e,"toCodePoints",{enumerable:!0,get:function(){return r.toCodePoints}}),Object.defineProperty(e,"fromCodePoint",{enumerable:!0,get:function(){return r.fromCodePoint}});var n,B=t(3),a=((n=B)&&n.__esModule,t(18));e.breakWords=function(A,e){for(var t=(0,r.LineBreaker)(A,{lineBreak:e.style.lineBreak,wordBreak:e.style.overflowWrap===a.OVERFLOW_WRAP.BREAK_WORD?"break-word":e.style.wordBreak}),n=[],B=void 0;!(B=t.next()).done;)n.push(B.value.slice());return n}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.FontMetrics=void 0;var r=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),n=t(4);e.FontMetrics=function(){function A(e){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this._data={},this._document=e}return r(A,[{key:"_parseMetrics",value:function(A){var e=this._document.createElement("div"),t=this._document.createElement("img"),r=this._document.createElement("span"),B=this._document.body;if(!B)throw new Error("");e.style.visibility="hidden",e.style.fontFamily=A.fontFamily,e.style.fontSize=A.fontSize,e.style.margin="0",e.style.padding="0",B.appendChild(e),t.src=n.SMALL_IMAGE,t.width=1,t.height=1,t.style.margin="0",t.style.padding="0",t.style.verticalAlign="baseline",r.style.fontFamily=A.fontFamily,r.style.fontSize=A.fontSize,r.style.margin="0",r.style.padding="0",r.appendChild(this._document.createTextNode("Hidden Text")),e.appendChild(r),e.appendChild(t);var a=t.offsetTop-r.offsetTop+2;e.removeChild(r),e.appendChild(this._document.createTextNode("Hidden Text")),e.style.lineHeight="normal",t.style.verticalAlign="super";var s=t.offsetTop-e.offsetTop+2;return B.removeChild(e),{baseline:a,middle:s}}},{key:"getMetrics",value:function(A){var e=A.fontFamily+" "+A.fontSize;return void 0===this._data[e]&&(this._data[e]=this._parseMetrics(A)),this._data[e]}}]),A}()},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Proxy=void 0;var r,n=t(10),B=(r=n)&&r.__esModule?r:{default:r};e.Proxy=function(A,e){if(!e.proxy)return Promise.reject(null);var t=e.proxy;return new Promise(function(r,n){var a=B.default.SUPPORT_CORS_XHR&&B.default.SUPPORT_RESPONSE_TYPE?"blob":"text",s=B.default.SUPPORT_CORS_XHR?new XMLHttpRequest:new XDomainRequest;if(s.onload=function(){if(s instanceof XMLHttpRequest)if(200===s.status)if("text"===a)r(s.response);else{var A=new FileReader;A.addEventListener("load",function(){return r(A.result)},!1),A.addEventListener("error",function(A){return n(A)},!1),A.readAsDataURL(s.response)}else n("");else r(s.responseText)},s.onerror=n,s.open("GET",t+"?url="+encodeURIComponent(A)+"&responseType="+a),"text"!==a&&s instanceof XMLHttpRequest&&(s.responseType=a),e.imageTimeout){var o=e.imageTimeout;s.timeout=o,s.ontimeout=function(){return n("")}}s.send()})}},function(A,e,t){"use strict";var r=Object.assign||function(A){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(A[r]=t[r])}return A},n=s(t(15)),B=s(t(16)),a=t(28);function s(A){return A&&A.__esModule?A:{default:A}}var o=function(A,e){var t=e||{},s=new B.default("boolean"!=typeof t.logging||t.logging);s.log("html2canvas 1.0.0-alpha.11");var o=A.ownerDocument;if(!o)return Promise.reject("Provided element is not within a Document");var i=o.defaultView,c={async:!0,allowTaint:!1,backgroundColor:"#ffffff",imageTimeout:15e3,logging:!0,proxy:null,removeContainer:!0,foreignObjectRendering:!1,scale:i.devicePixelRatio||1,target:new n.default(t.canvas),useCORS:!1,windowWidth:i.innerWidth,windowHeight:i.innerHeight,scrollX:i.pageXOffset,scrollY:i.pageYOffset},l=(0,a.renderElement)(A,r({},c,t),s);return l};o.CanvasRenderer=n.default,A.exports=o},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.renderElement=void 0;var r=function(){return function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,B=void 0;try{for(var a,s=A[Symbol.iterator]();!(r=(a=s.next()).done)&&(t.push(a.value),!e||t.length!==e);r=!0);}catch(A){n=!0,B=A}finally{try{!r&&s.return&&s.return()}finally{if(n)throw B}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),n=(Q(t(16)),t(29)),B=Q(t(51)),a=Q(t(23)),s=Q(t(10)),o=t(2),i=t(54),c=t(25),l=t(0),u=Q(l);function Q(A){return A&&A.__esModule?A:{default:A}}e.renderElement=function A(e,t,Q){var w=e.ownerDocument,U=new o.Bounds(t.scrollX,t.scrollY,t.windowWidth,t.windowHeight),g=w.documentElement?new u.default(getComputedStyle(w.documentElement).backgroundColor):l.TRANSPARENT,C=w.body?new u.default(getComputedStyle(w.body).backgroundColor):l.TRANSPARENT,d=e===w.documentElement?g.isTransparent()?C.isTransparent()?t.backgroundColor?new u.default(t.backgroundColor):null:C:g:t.backgroundColor?new u.default(t.backgroundColor):null;return(t.foreignObjectRendering?s.default.SUPPORT_FOREIGNOBJECT_DRAWING:Promise.resolve(!1)).then(function(s){return s?(u=new i.DocumentCloner(e,t,Q,!0,A)).inlineFonts(w).then(function(){return u.resourceLoader.ready()}).then(function(){var A=new a.default(u.documentElement),r=w.defaultView,n=r.pageXOffset,B=r.pageYOffset,s="HTML"===e.tagName||"BODY"===e.tagName?(0,o.parseDocumentSize)(w):(0,o.parseBounds)(e,n,B),i=s.width,c=s.height,l=s.left,U=s.top;return A.render({backgroundColor:d,logger:Q,scale:t.scale,x:"number"==typeof t.x?t.x:l,y:"number"==typeof t.y?t.y:U,width:"number"==typeof t.width?t.width:Math.ceil(i),height:"number"==typeof t.height?t.height:Math.ceil(c),windowWidth:t.windowWidth,windowHeight:t.windowHeight,scrollX:t.scrollX,scrollY:t.scrollY})}):(0,i.cloneWindow)(w,U,e,t,Q,A).then(function(A){var e=r(A,3),a=e[0],s=e[1],i=e[2];var u=(0,n.NodeParser)(s,i,Q),U=s.ownerDocument;return d===u.container.style.background.backgroundColor&&(u.container.style.background.backgroundColor=l.TRANSPARENT),i.ready().then(function(A){var e=new c.FontMetrics(U);var r=U.defaultView,n=r.pageXOffset,i=r.pageYOffset,l="HTML"===s.tagName||"BODY"===s.tagName?(0,o.parseDocumentSize)(w):(0,o.parseBounds)(s,n,i),g=l.width,C=l.height,F=l.left,E=l.top,f={backgroundColor:d,fontMetrics:e,imageStore:A,logger:Q,scale:t.scale,x:"number"==typeof t.x?t.x:F,y:"number"==typeof t.y?t.y:E,width:"number"==typeof t.width?t.width:Math.ceil(g),height:"number"==typeof t.height?t.height:Math.ceil(C)};if(Array.isArray(t.target))return Promise.all(t.target.map(function(A){return new B.default(A,f).render(u)}));var h=new B.default(t.target,f).render(u);return!0===t.removeContainer&&a.parentNode&&a.parentNode.removeChild(a),h})});var u})}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.NodeParser=void 0;var r=i(t(30)),n=i(t(3)),B=i(t(9)),a=t(21),s=t(14),o=t(8);function i(A){return A&&A.__esModule?A:{default:A}}e.NodeParser=function(A,e,t){var B=0,a=new n.default(A,null,e,B++),s=new r.default(a,null,!0);return l(A,a,s,e,B),s};var c=["SCRIPT","HEAD","TITLE","OBJECT","BR","OPTION"],l=function A(e,t,i,l,w){for(var U,g=e.firstChild;g;g=U){U=g.nextSibling;var C=g.ownerDocument.defaultView;if(g instanceof C.Text||g instanceof Text||C.parent&&g instanceof C.parent.Text)g.data.trim().length>0&&t.childNodes.push(B.default.fromTextNode(g,t));else if(g instanceof C.HTMLElement||g instanceof HTMLElement||C.parent&&g instanceof C.parent.HTMLElement){if(-1===c.indexOf(g.nodeName)){var d=new n.default(g,t,l,w++);if(d.isVisible()){"INPUT"===g.tagName?(0,a.inlineInputElement)(g,d):"TEXTAREA"===g.tagName?(0,a.inlineTextAreaElement)(g,d):"SELECT"===g.tagName?(0,a.inlineSelectElement)(g,d):d.style.listStyle&&d.style.listStyle.listStyleType!==o.LIST_STYLE_TYPE.NONE&&(0,s.inlineListItemElement)(g,d,l);var F="TEXTAREA"!==g.tagName,E=u(d,g);if(E||Q(d)){var f=E||d.isPositioned()?i.getRealParentStackingContext():i,h=new r.default(d,f,E);f.contexts.push(h),F&&A(g,d,h,l,w)}else i.children.push(d),F&&A(g,d,i,l,w)}}}else if(g instanceof C.SVGSVGElement||g instanceof SVGSVGElement||C.parent&&g instanceof C.parent.SVGSVGElement){var H=new n.default(g,t,l,w++),p=u(H,g);if(p||Q(H)){var N=p||H.isPositioned()?i.getRealParentStackingContext():i,I=new r.default(H,N,p);N.contexts.push(I)}else i.children.push(H)}}},u=function(A,e){return A.isRootElement()||A.isPositionedWithZIndex()||A.style.opacity<1||A.isTransformed()||w(A,e)},Q=function(A){return A.isPositioned()||A.isFloating()},w=function(A,e){return"BODY"===e.nodeName&&A.parent instanceof n.default&&A.parent.style.background.backgroundColor.isTransparent()}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),B=t(3);(r=B)&&r.__esModule,t(19);var a=function(){function A(e,t,r){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.container=e,this.parent=t,this.contexts=[],this.children=[],this.treatAsRealStackingContext=r}return n(A,[{key:"getOpacity",value:function(){return this.parent?this.container.style.opacity*this.parent.getOpacity():this.container.style.opacity}},{key:"getRealParentStackingContext",value:function(){return!this.parent||this.treatAsRealStackingContext?this:this.parent.getRealParentStackingContext()}}]),A}();e.default=a},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default=function A(e,t){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.width=e,this.height=t}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),B=t(6),a=t(7),s=(r=a)&&r.__esModule?r:{default:r};var o=function(A,e,t){return new s.default(A.x+(e.x-A.x)*t,A.y+(e.y-A.y)*t)},i=function(){function A(e,t,r,n){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.type=B.PATH.BEZIER_CURVE,this.start=e,this.startControl=t,this.endControl=r,this.end=n}return n(A,[{key:"subdivide",value:function(e,t){var r=o(this.start,this.startControl,e),n=o(this.startControl,this.endControl,e),B=o(this.endControl,this.end,e),a=o(r,n,e),s=o(n,B,e),i=o(a,s,e);return t?new A(this.start,r,a,i):new A(i,s,B,this.end)}},{key:"reverse",value:function(){return new A(this.end,this.endControl,this.startControl,this.start)}}]),A}();e.default=i},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.parseBorderRadius=void 0;var r,n=function(){return function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,B=void 0;try{for(var a,s=A[Symbol.iterator]();!(r=(a=s.next()).done)&&(t.push(a.value),!e||t.length!==e);r=!0);}catch(A){n=!0,B=A}finally{try{!r&&s.return&&s.return()}finally{if(n)throw B}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),B=t(1),a=(r=B)&&r.__esModule?r:{default:r};var s=["top-left","top-right","bottom-right","bottom-left"];e.parseBorderRadius=function(A){return s.map(function(e){var t=A.getPropertyValue("border-"+e+"-radius").split(" ").map(a.default.create),r=n(t,2),B=r[0],s=r[1];return void 0===s?[B,B]:[B,s]})}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=e.DISPLAY={NONE:1,BLOCK:2,INLINE:4,RUN_IN:8,FLOW:16,FLOW_ROOT:32,TABLE:64,FLEX:128,GRID:256,RUBY:512,SUBGRID:1024,LIST_ITEM:2048,TABLE_ROW_GROUP:4096,TABLE_HEADER_GROUP:8192,TABLE_FOOTER_GROUP:16384,TABLE_ROW:32768,TABLE_CELL:65536,TABLE_COLUMN_GROUP:1<<17,TABLE_COLUMN:1<<18,TABLE_CAPTION:1<<19,RUBY_BASE:1<<20,RUBY_TEXT:1<<21,RUBY_BASE_CONTAINER:1<<22,RUBY_TEXT_CONTAINER:1<<23,CONTENTS:1<<24,INLINE_BLOCK:1<<25,INLINE_LIST_ITEM:1<<26,INLINE_TABLE:1<<27,INLINE_FLEX:1<<28,INLINE_GRID:1<<29},n=function(A,e){return A|function(A){switch(A){case"block":return r.BLOCK;case"inline":return r.INLINE;case"run-in":return r.RUN_IN;case"flow":return r.FLOW;case"flow-root":return r.FLOW_ROOT;case"table":return r.TABLE;case"flex":return r.FLEX;case"grid":return r.GRID;case"ruby":return r.RUBY;case"subgrid":return r.SUBGRID;case"list-item":return r.LIST_ITEM;case"table-row-group":return r.TABLE_ROW_GROUP;case"table-header-group":return r.TABLE_HEADER_GROUP;case"table-footer-group":return r.TABLE_FOOTER_GROUP;case"table-row":return r.TABLE_ROW;case"table-cell":return r.TABLE_CELL;case"table-column-group":return r.TABLE_COLUMN_GROUP;case"table-column":return r.TABLE_COLUMN;case"table-caption":return r.TABLE_CAPTION;case"ruby-base":return r.RUBY_BASE;case"ruby-text":return r.RUBY_TEXT;case"ruby-base-container":return r.RUBY_BASE_CONTAINER;case"ruby-text-container":return r.RUBY_TEXT_CONTAINER;case"contents":return r.CONTENTS;case"inline-block":return r.INLINE_BLOCK;case"inline-list-item":return r.INLINE_LIST_ITEM;case"inline-table":return r.INLINE_TABLE;case"inline-flex":return r.INLINE_FLEX;case"inline-grid":return r.INLINE_GRID}return r.NONE}(e)};e.parseDisplay=function(A){return A.split(" ").reduce(n,0)}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=e.FLOAT={NONE:0,LEFT:1,RIGHT:2,INLINE_START:3,INLINE_END:4};e.parseCSSFloat=function(A){switch(A){case"left":return r.LEFT;case"right":return r.RIGHT;case"inline-start":return r.INLINE_START;case"inline-end":return r.INLINE_END}return r.NONE}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.parseFont=function(A){return{fontFamily:A.fontFamily,fontSize:A.fontSize,fontStyle:A.fontStyle,fontVariant:A.fontVariant,fontWeight:function(A){switch(A){case"normal":return 400;case"bold":return 700}var e=parseInt(A,10);return isNaN(e)?400:e}(A.fontWeight)}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.parseLetterSpacing=function(A){if("normal"===A)return 0;var e=parseFloat(A);return isNaN(e)?0:e}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=e.LINE_BREAK={NORMAL:"normal",STRICT:"strict"};e.parseLineBreak=function(A){switch(A){case"strict":return r.STRICT;case"normal":default:return r.NORMAL}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.parseMargin=void 0;var r,n=t(1),B=(r=n)&&r.__esModule?r:{default:r};var a=["top","right","bottom","left"];e.parseMargin=function(A){return a.map(function(e){return new B.default(A.getPropertyValue("margin-"+e))})}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=e.OVERFLOW={VISIBLE:0,HIDDEN:1,SCROLL:2,AUTO:3};e.parseOverflow=function(A){switch(A){case"hidden":return r.HIDDEN;case"scroll":return r.SCROLL;case"auto":return r.AUTO;case"visible":default:return r.VISIBLE}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.parseTextShadow=void 0;var r,n=t(0),B=(r=n)&&r.__esModule?r:{default:r};var a=/^([+-]|\d|\.)$/i;e.parseTextShadow=function(A){if("none"===A||"string"!=typeof A)return null;for(var e="",t=!1,r=[],n=[],s=0,o=null,i=function(){e.length&&(t?r.push(parseFloat(e)):o=new B.default(e)),t=!1,e=""},c=function(){r.length&&null!==o&&n.push({color:o,offsetX:r[0]||0,offsetY:r[1]||0,blur:r[2]||0}),r.splice(0,r.length),o=null},l=0;l<A.length;l++){var u=A[l];switch(u){case"(":e+=u,s++;break;case")":e+=u,s--;break;case",":0===s?(i(),c()):e+=u;break;case" ":0===s?i():e+=u;break;default:0===e.length&&a.test(u)&&(t=!0),e+=u}}return i(),c(),0===n.length?null:n}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.parseTransform=void 0;var r,n=t(1),B=(r=n)&&r.__esModule?r:{default:r};var a=function(A){return parseFloat(A.trim())},s=/(matrix|matrix3d)\((.+)\)/,o=(e.parseTransform=function(A){var e=i(A.transform||A.webkitTransform||A.mozTransform||A.msTransform||A.oTransform);return null===e?null:{transform:e,transformOrigin:o(A.transformOrigin||A.webkitTransformOrigin||A.mozTransformOrigin||A.msTransformOrigin||A.oTransformOrigin)}},function(A){if("string"!=typeof A){var e=new B.default("0");return[e,e]}var t=A.split(" ").map(B.default.create);return[t[0],t[1]]}),i=function(A){if("none"===A||"string"!=typeof A)return null;var e=A.match(s);if(e){if("matrix"===e[1]){var t=e[2].split(",").map(a);return[t[0],t[1],t[2],t[3],t[4],t[5]]}var r=e[2].split(",").map(a);return[r[0],r[1],r[4],r[5],r[12],r[13]]}return null}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=e.VISIBILITY={VISIBLE:0,HIDDEN:1,COLLAPSE:2};e.parseVisibility=function(A){switch(A){case"hidden":return r.HIDDEN;case"collapse":return r.COLLAPSE;case"visible":default:return r.VISIBLE}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=e.WORD_BREAK={NORMAL:"normal",BREAK_ALL:"break-all",KEEP_ALL:"keep-all"};e.parseWordBreak=function(A){switch(A){case"break-all":return r.BREAK_ALL;case"keep-all":return r.KEEP_ALL;case"normal":default:return r.NORMAL}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.parseZIndex=function(A){var e="auto"===A;return{auto:e,order:e?0:parseInt(A,10)}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t(13);Object.defineProperty(e,"toCodePoints",{enumerable:!0,get:function(){return r.toCodePoints}}),Object.defineProperty(e,"fromCodePoint",{enumerable:!0,get:function(){return r.fromCodePoint}});var n=t(47);Object.defineProperty(e,"LineBreaker",{enumerable:!0,get:function(){return n.LineBreaker}})},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.LineBreaker=e.inlineBreakOpportunities=e.lineBreakAtIndex=e.codePointsToCharacterClasses=e.UnicodeTrie=e.BREAK_ALLOWED=e.BREAK_NOT_ALLOWED=e.BREAK_MANDATORY=e.classes=e.LETTER_NUMBER_MODIFIER=void 0;var r,n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),B=function(){return function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,B=void 0;try{for(var a,s=A[Symbol.iterator]();!(r=(a=s.next()).done)&&(t.push(a.value),!e||t.length!==e);r=!0);}catch(A){n=!0,B=A}finally{try{!r&&s.return&&s.return()}finally{if(n)throw B}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=t(48),s=t(49),o=(r=s)&&r.__esModule?r:{default:r},i=t(13);var c=e.LETTER_NUMBER_MODIFIER=50,l=10,u=13,Q=15,w=17,U=18,g=19,C=20,d=21,F=22,E=24,f=25,h=26,H=27,p=28,N=30,I=32,K=33,T=34,m=35,v=37,y=38,b=39,S=40,L=42,_=(e.classes={BK:1,CR:2,LF:3,CM:4,NL:5,SG:6,WJ:7,ZW:8,GL:9,SP:l,ZWJ:11,B2:12,BA:u,BB:14,HY:Q,CB:16,CL:w,CP:U,EX:g,IN:C,NS:d,OP:F,QU:23,IS:E,NU:f,PO:h,PR:H,SY:p,AI:29,AL:N,CJ:31,EB:I,EM:K,H2:T,H3:m,HL:36,ID:v,JL:y,JV:b,JT:S,RI:41,SA:L,XX:43},e.BREAK_MANDATORY="!"),D=e.BREAK_NOT_ALLOWED="×",M=e.BREAK_ALLOWED="÷",O=e.UnicodeTrie=(0,a.createTrieFromBase64)(o.default),R=[N,36],P=[1,2,3,5],X=[l,8],z=[H,h],x=P.concat(X),V=[y,b,S,T,m],k=[Q,u],J=e.codePointsToCharacterClasses=function(A){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"strict",t=[],r=[],n=[];return A.forEach(function(A,B){var a=O.get(A);if(a>c?(n.push(!0),a-=c):n.push(!1),-1!==["normal","auto","loose"].indexOf(e)&&-1!==[8208,8211,12316,12448].indexOf(A))return r.push(B),t.push(16);if(4===a||11===a){if(0===B)return r.push(B),t.push(N);var s=t[B-1];return-1===x.indexOf(s)?(r.push(r[B-1]),t.push(s)):(r.push(B),t.push(N))}return r.push(B),31===a?t.push("strict"===e?d:v):a===L?t.push(N):29===a?t.push(N):43===a?A>=131072&&A<=196605||A>=196608&&A<=262141?t.push(v):t.push(N):void t.push(a)}),[r,t,n]},G=function(A,e,t,r){var n=r[t];if(Array.isArray(A)?-1!==A.indexOf(n):A===n)for(var B=t;B<=r.length;){var a=r[++B];if(a===e)return!0;if(a!==l)break}if(n===l)for(var s=t;s>0;){var o=r[--s];if(Array.isArray(A)?-1!==A.indexOf(o):A===o)for(var i=t;i<=r.length;){var c=r[++i];if(c===e)return!0;if(c!==l)break}if(o!==l)break}return!1},Y=function(A,e){for(var t=A;t>=0;){var r=e[t];if(r!==l)return r;t--}return 0},W=function(A,e,t,r,n){if(0===t[r])return D;var B=r-1;if(Array.isArray(n)&&!0===n[B])return D;var a=B-1,s=B+1,o=e[B],i=a>=0?e[a]:0,c=e[s];if(2===o&&3===c)return D;if(-1!==P.indexOf(o))return _;if(-1!==P.indexOf(c))return D;if(-1!==X.indexOf(c))return D;if(8===Y(B,e))return M;if(11===O.get(A[B])&&(c===v||c===I||c===K))return D;if(7===o||7===c)return D;if(9===o)return D;if(-1===[l,u,Q].indexOf(o)&&9===c)return D;if(-1!==[w,U,g,E,p].indexOf(c))return D;if(Y(B,e)===F)return D;if(G(23,F,B,e))return D;if(G([w,U],d,B,e))return D;if(G(12,12,B,e))return D;if(o===l)return M;if(23===o||23===c)return D;if(16===c||16===o)return M;if(-1!==[u,Q,d].indexOf(c)||14===o)return D;if(36===i&&-1!==k.indexOf(o))return D;if(o===p&&36===c)return D;if(c===C&&-1!==R.concat(C,g,f,v,I,K).indexOf(o))return D;if(-1!==R.indexOf(c)&&o===f||-1!==R.indexOf(o)&&c===f)return D;if(o===H&&-1!==[v,I,K].indexOf(c)||-1!==[v,I,K].indexOf(o)&&c===h)return D;if(-1!==R.indexOf(o)&&-1!==z.indexOf(c)||-1!==z.indexOf(o)&&-1!==R.indexOf(c))return D;if(-1!==[H,h].indexOf(o)&&(c===f||-1!==[F,Q].indexOf(c)&&e[s+1]===f)||-1!==[F,Q].indexOf(o)&&c===f||o===f&&-1!==[f,p,E].indexOf(c))return D;if(-1!==[f,p,E,w,U].indexOf(c))for(var N=B;N>=0;){var L=e[N];if(L===f)return D;if(-1===[p,E].indexOf(L))break;N--}if(-1!==[H,h].indexOf(c))for(var x=-1!==[w,U].indexOf(o)?a:B;x>=0;){var J=e[x];if(J===f)return D;if(-1===[p,E].indexOf(J))break;x--}if(y===o&&-1!==[y,b,T,m].indexOf(c)||-1!==[b,T].indexOf(o)&&-1!==[b,S].indexOf(c)||-1!==[S,m].indexOf(o)&&c===S)return D;if(-1!==V.indexOf(o)&&-1!==[C,h].indexOf(c)||-1!==V.indexOf(c)&&o===H)return D;if(-1!==R.indexOf(o)&&-1!==R.indexOf(c))return D;if(o===E&&-1!==R.indexOf(c))return D;if(-1!==R.concat(f).indexOf(o)&&c===F||-1!==R.concat(f).indexOf(c)&&o===U)return D;if(41===o&&41===c){for(var W=t[B],j=1;W>0&&41===e[--W];)j++;if(j%2!=0)return D}return o===I&&c===K?D:M},j=(e.lineBreakAtIndex=function(A,e){if(0===e)return D;if(e>=A.length)return _;var t=J(A),r=B(t,2),n=r[0],a=r[1];return W(A,a,n,e)},function(A,e){e||(e={lineBreak:"normal",wordBreak:"normal"});var t=J(A,e.lineBreak),r=B(t,3),n=r[0],a=r[1],s=r[2];return"break-all"!==e.wordBreak&&"break-word"!==e.wordBreak||(a=a.map(function(A){return-1!==[f,N,L].indexOf(A)?v:A})),[n,a,"keep-all"===e.wordBreak?s.map(function(e,t){return e&&A[t]>=19968&&A[t]<=40959}):null]}),q=(e.inlineBreakOpportunities=function(A,e){var t=(0,i.toCodePoints)(A),r=D,n=j(t,e),a=B(n,3),s=a[0],o=a[1],c=a[2];return t.forEach(function(A,e){r+=(0,i.fromCodePoint)(A)+(e>=t.length-1?_:W(t,o,s,e+1,c))}),r},function(){function A(e,t,r,n){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this._codePoints=e,this.required=t===_,this.start=r,this.end=n}return n(A,[{key:"slice",value:function(){return i.fromCodePoint.apply(void 0,function(A){if(Array.isArray(A)){for(var e=0,t=Array(A.length);e<A.length;e++)t[e]=A[e];return t}return Array.from(A)}(this._codePoints.slice(this.start,this.end)))}}]),A}());e.LineBreaker=function(A,e){var t=(0,i.toCodePoints)(A),r=j(t,e),n=B(r,3),a=n[0],s=n[1],o=n[2],c=t.length,l=0,u=0;return{next:function(){if(u>=c)return{done:!0};for(var A=D;u<c&&(A=W(t,s,a,++u,o))===D;);if(A!==D||u===c){var e=new q(t,A,l,u);return l=u,{value:e,done:!1}}return{done:!0}}}}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Trie=e.createTrieFromBase64=e.UTRIE2_INDEX_2_MASK=e.UTRIE2_INDEX_2_BLOCK_LENGTH=e.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH=e.UTRIE2_INDEX_1_OFFSET=e.UTRIE2_UTF8_2B_INDEX_2_LENGTH=e.UTRIE2_UTF8_2B_INDEX_2_OFFSET=e.UTRIE2_INDEX_2_BMP_LENGTH=e.UTRIE2_LSCP_INDEX_2_LENGTH=e.UTRIE2_DATA_MASK=e.UTRIE2_DATA_BLOCK_LENGTH=e.UTRIE2_LSCP_INDEX_2_OFFSET=e.UTRIE2_SHIFT_1_2=e.UTRIE2_INDEX_SHIFT=e.UTRIE2_SHIFT_1=e.UTRIE2_SHIFT_2=void 0;var r=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),n=t(13);var B=e.UTRIE2_SHIFT_2=5,a=e.UTRIE2_SHIFT_1=11,s=e.UTRIE2_INDEX_SHIFT=2,o=e.UTRIE2_SHIFT_1_2=a-B,i=e.UTRIE2_LSCP_INDEX_2_OFFSET=65536>>B,c=e.UTRIE2_DATA_BLOCK_LENGTH=1<<B,l=e.UTRIE2_DATA_MASK=c-1,u=e.UTRIE2_LSCP_INDEX_2_LENGTH=1024>>B,Q=e.UTRIE2_INDEX_2_BMP_LENGTH=i+u,w=e.UTRIE2_UTF8_2B_INDEX_2_OFFSET=Q,U=e.UTRIE2_UTF8_2B_INDEX_2_LENGTH=32,g=e.UTRIE2_INDEX_1_OFFSET=w+U,C=e.UTRIE2_OMITTED_BMP_INDEX_1_LENGTH=65536>>a,d=e.UTRIE2_INDEX_2_BLOCK_LENGTH=1<<o,F=e.UTRIE2_INDEX_2_MASK=d-1,E=(e.createTrieFromBase64=function(A){var e=(0,n.decode)(A),t=Array.isArray(e)?(0,n.polyUint32Array)(e):new Uint32Array(e),r=Array.isArray(e)?(0,n.polyUint16Array)(e):new Uint16Array(e),B=r.slice(12,t[4]/2),a=2===t[5]?r.slice((24+t[4])/2):t.slice(Math.ceil((24+t[4])/4));return new E(t[0],t[1],t[2],t[3],B,a)},e.Trie=function(){function A(e,t,r,n,B,a){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.initialValue=e,this.errorValue=t,this.highStart=r,this.highValueIndex=n,this.index=B,this.data=a}return r(A,[{key:"get",value:function(A){var e=void 0;if(A>=0){if(A<55296||A>56319&&A<=65535)return e=((e=this.index[A>>B])<<s)+(A&l),this.data[e];if(A<=65535)return e=((e=this.index[i+(A-55296>>B)])<<s)+(A&l),this.data[e];if(A<this.highStart)return e=g-C+(A>>a),e=this.index[e],e+=A>>B&F,e=((e=this.index[e])<<s)+(A&l),this.data[e];if(A<=1114111)return this.data[this.highValueIndex]}return this.errorValue}}]),A}())},function(A,e,t){"use strict";A.exports="KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA"},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t(6);e.default=function A(e,t,n){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.type=r.PATH.CIRCLE,this.x=e,this.y=t,this.radius=n}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r,n=function(){return function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,B=void 0;try{for(var a,s=A[Symbol.iterator]();!(r=(a=s.next()).done)&&(t.push(a.value),!e||t.length!==e);r=!0);}catch(A){n=!0,B=A}finally{try{!r&&s.return&&s.return()}finally{if(n)throw B}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),B=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),a=t(2),s=(t(25),t(52)),o=t(9),i=(r=o)&&r.__esModule?r:{default:r},c=t(5),l=t(12);var u=function(){function A(e,t){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.target=e,this.options=t,e.render(t)}return B(A,[{key:"renderNode",value:function(A){A.isVisible()&&(this.renderNodeBackgroundAndBorders(A),this.renderNodeContent(A))}},{key:"renderNodeContent",value:function(A){var e=this,t=function(){if(A.childNodes.length&&A.childNodes.forEach(function(t){if(t instanceof i.default){var r=t.parent.style;e.target.renderTextNode(t.bounds,r.color,r.font,r.textDecoration,r.textShadow)}else e.target.drawShape(t,A.style.color)}),A.image){var t=e.options.imageStore.get(A.image);if(t){var r=(0,a.calculateContentBox)(A.bounds,A.style.padding,A.style.border),n="number"==typeof t.width&&t.width>0?t.width:r.width,B="number"==typeof t.height&&t.height>0?t.height:r.height;n>0&&B>0&&e.target.clip([(0,a.calculatePaddingBoxPath)(A.curvedBounds)],function(){e.target.drawImage(t,new a.Bounds(0,0,n,B),r)})}}},r=A.getClipPaths();r.length?this.target.clip(r,t):t()}},{key:"renderNodeBackgroundAndBorders",value:function(A){var e=this,t=!A.style.background.backgroundColor.isTransparent()||A.style.background.backgroundImage.length,r=A.style.border.some(function(A){return A.borderStyle!==l.BORDER_STYLE.NONE&&!A.borderColor.isTransparent()}),n=function(){var r=(0,c.calculateBackgroungPaintingArea)(A.curvedBounds,A.style.background.backgroundClip);t&&e.target.clip([r],function(){A.style.background.backgroundColor.isTransparent()||e.target.fill(A.style.background.backgroundColor),e.renderBackgroundImage(A)}),A.style.border.forEach(function(t,r){t.borderStyle===l.BORDER_STYLE.NONE||t.borderColor.isTransparent()||e.renderBorder(t,r,A.curvedBounds)})};if(t||r){var B=A.parent?A.parent.getClipPaths():[];B.length?this.target.clip(B,n):n()}}},{key:"renderBackgroundImage",value:function(A){var e=this;A.style.background.backgroundImage.slice(0).reverse().forEach(function(t){"url"===t.source.method&&t.source.args.length?e.renderBackgroundRepeat(A,t):/gradient/i.test(t.source.method)&&e.renderBackgroundGradient(A,t)})}},{key:"renderBackgroundRepeat",value:function(A,e){var t=this.options.imageStore.get(e.source.args[0]);if(t){var r=(0,c.calculateBackgroungPositioningArea)(A.style.background.backgroundOrigin,A.bounds,A.style.padding,A.style.border),n=(0,c.calculateBackgroundSize)(e,t,r),B=(0,c.calculateBackgroundPosition)(e.position,n,r),a=(0,c.calculateBackgroundRepeatPath)(e,B,n,r,A.bounds),s=Math.round(r.left+B.x),o=Math.round(r.top+B.y);this.target.renderRepeat(a,t,n,s,o)}}},{key:"renderBackgroundGradient",value:function(A,e){var t=(0,c.calculateBackgroungPositioningArea)(A.style.background.backgroundOrigin,A.bounds,A.style.padding,A.style.border),r=(0,c.calculateGradientBackgroundSize)(e,t),n=(0,c.calculateBackgroundPosition)(e.position,r,t),B=new a.Bounds(Math.round(t.left+n.x),Math.round(t.top+n.y),r.width,r.height),o=(0,s.parseGradient)(A,e.source,B);if(o)switch(o.type){case s.GRADIENT_TYPE.LINEAR_GRADIENT:this.target.renderLinearGradient(B,o);break;case s.GRADIENT_TYPE.RADIAL_GRADIENT:this.target.renderRadialGradient(B,o)}}},{key:"renderBorder",value:function(A,e,t){this.target.drawShape((0,a.parsePathForBorder)(t,e),A.borderColor)}},{key:"renderStack",value:function(A){var e=this;if(A.container.isVisible()){var t=A.getOpacity();t!==this._opacity&&(this.target.setOpacity(A.getOpacity()),this._opacity=t);var r=A.container.style.transform;null!==r?this.target.transform(A.container.bounds.left+r.transformOrigin[0].value,A.container.bounds.top+r.transformOrigin[1].value,r.transform,function(){return e.renderStackContent(A)}):this.renderStackContent(A)}}},{key:"renderStackContent",value:function(A){var e=w(A),t=n(e,5),r=t[0],B=t[1],a=t[2],s=t[3],o=t[4],i=Q(A),c=n(i,2),l=c[0],u=c[1];this.renderNodeBackgroundAndBorders(A.container),r.sort(U).forEach(this.renderStack,this),this.renderNodeContent(A.container),u.forEach(this.renderNode,this),s.forEach(this.renderStack,this),o.forEach(this.renderStack,this),l.forEach(this.renderNode,this),B.forEach(this.renderStack,this),a.sort(U).forEach(this.renderStack,this)}},{key:"render",value:function(A){this.options.backgroundColor&&this.target.rectangle(this.options.x,this.options.y,this.options.width,this.options.height,this.options.backgroundColor),this.renderStack(A);var e=this.target.getTarget();return e}}]),A}();e.default=u;var Q=function(A){for(var e=[],t=[],r=A.children.length,n=0;n<r;n++){var B=A.children[n];B.isInlineLevel()?e.push(B):t.push(B)}return[e,t]},w=function(A){for(var e=[],t=[],r=[],n=[],B=[],a=A.contexts.length,s=0;s<a;s++){var o=A.contexts[s];o.container.isPositioned()||o.container.style.opacity<1||o.container.isTransformed()?o.container.style.zIndex.order<0?e.push(o):o.container.style.zIndex.order>0?r.push(o):t.push(o):o.container.isFloating()?n.push(o):B.push(o)}return[e,t,r,n,B]},U=function(A,e){return A.container.style.zIndex.order>e.container.style.zIndex.order?1:A.container.style.zIndex.order<e.container.style.zIndex.order?-1:A.container.index>e.container.index?1:-1}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.transformWebkitRadialGradientArgs=e.parseGradient=e.RadialGradient=e.LinearGradient=e.RADIAL_GRADIENT_SHAPE=e.GRADIENT_TYPE=void 0;var r=function(){return function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,B=void 0;try{for(var a,s=A[Symbol.iterator]();!(r=(a=s.next()).done)&&(t.push(a.value),!e||t.length!==e);r=!0);}catch(A){n=!0,B=A}finally{try{!r&&s.return&&s.return()}finally{if(n)throw B}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),n=(i(t(3)),t(53)),B=i(t(0)),a=t(1),s=i(a),o=t(4);function i(A){return A&&A.__esModule?A:{default:A}}function c(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}var l=/^(to )?(left|top|right|bottom)( (left|top|right|bottom))?$/i,u=/^([+-]?\d*\.?\d+)% ([+-]?\d*\.?\d+)%$/i,Q=/(px)|%|( 0)$/i,w=/^(from|to|color-stop)\((?:([\d.]+)(%)?,\s*)?(.+?)\)$/i,U=/^\s*(circle|ellipse)?\s*((?:([\d.]+)(px|r?em|%)\s*(?:([\d.]+)(px|r?em|%))?)|closest-side|closest-corner|farthest-side|farthest-corner)?\s*(?:at\s*(?:(left|center|right)|([\d.]+)(px|r?em|%))\s+(?:(top|center|bottom)|([\d.]+)(px|r?em|%)))?(?:\s|$)/i,g=e.GRADIENT_TYPE={LINEAR_GRADIENT:0,RADIAL_GRADIENT:1},C=e.RADIAL_GRADIENT_SHAPE={CIRCLE:0,ELLIPSE:1},d={left:new s.default("0%"),top:new s.default("0%"),center:new s.default("50%"),right:new s.default("100%"),bottom:new s.default("100%")},F=e.LinearGradient=function A(e,t){c(this,A),this.type=g.LINEAR_GRADIENT,this.colorStops=e,this.direction=t},E=e.RadialGradient=function A(e,t,r,n){c(this,A),this.type=g.RADIAL_GRADIENT,this.colorStops=e,this.shape=t,this.center=r,this.radius=n},f=(e.parseGradient=function(A,e,t){var r=e.args,n=e.method,B=e.prefix;return"linear-gradient"===n?h(r,t,!!B):"gradient"===n&&"linear"===r[0]?h(["to bottom"].concat(y(r.slice(3))),t,!!B):"radial-gradient"===n?H(A,"-webkit-"===B?v(r):r,t):"gradient"===n&&"radial"===r[0]?H(A,y(v(r.slice(1))),t):void 0},function(A,e,t){for(var r=[],n=e;n<A.length;n++){var a=A[n],o=Q.test(a),i=a.lastIndexOf(" "),c=new B.default(o?a.substring(0,i):a),l=o?new s.default(a.substring(i+1)):n===e?new s.default("0%"):n===A.length-1?new s.default("100%"):null;r.push({color:c,stop:l})}for(var u=r.map(function(A){var e=A.color,r=A.stop;return{color:e,stop:0===t?0:r?r.getAbsoluteValue(t)/t:null}}),w=u[0].stop,U=0;U<u.length;U++)if(null!==w){var g=u[U].stop;if(null===g){for(var C=U;null===u[C].stop;)C++;for(var d=C-U+1,F=(u[C].stop-w)/d;U<C;U++)w=u[U].stop=w+F}else w=g}return u}),h=function(A,e,t){var r=(0,n.parseAngle)(A[0]),B=l.test(A[0]),a=B||null!==r||u.test(A[0]),s=a?null!==r?p(t?r-.5*Math.PI:r,e):B?I(A[0],e):K(A[0],e):p(Math.PI,e),i=a?1:0,c=Math.min((0,o.distance)(Math.abs(s.x0)+Math.abs(s.x1),Math.abs(s.y0)+Math.abs(s.y1)),2*e.width,2*e.height);return new F(f(A,i,c),s)},H=function(A,e,t){var r=e[0].match(U),n=r&&("circle"===r[1]||void 0!==r[3]&&void 0===r[5])?C.CIRCLE:C.ELLIPSE,B={},s={};r&&(void 0!==r[3]&&(B.x=(0,a.calculateLengthFromValueWithUnit)(A,r[3],r[4]).getAbsoluteValue(t.width)),void 0!==r[5]&&(B.y=(0,a.calculateLengthFromValueWithUnit)(A,r[5],r[6]).getAbsoluteValue(t.height)),r[7]?s.x=d[r[7].toLowerCase()]:void 0!==r[8]&&(s.x=(0,a.calculateLengthFromValueWithUnit)(A,r[8],r[9])),r[10]?s.y=d[r[10].toLowerCase()]:void 0!==r[11]&&(s.y=(0,a.calculateLengthFromValueWithUnit)(A,r[11],r[12])));var o={x:void 0===s.x?t.width/2:s.x.getAbsoluteValue(t.width),y:void 0===s.y?t.height/2:s.y.getAbsoluteValue(t.height)},i=m(r&&r[2]||"farthest-corner",n,o,B,t);return new E(f(e,r?1:0,Math.min(i.x,i.y)),n,o,i)},p=function(A,e){var t=e.width,r=e.height,n=.5*t,B=.5*r,a=(Math.abs(t*Math.sin(A))+Math.abs(r*Math.cos(A)))/2,s=n+Math.sin(A)*a,o=B-Math.cos(A)*a;return{x0:s,x1:t-s,y0:o,y1:r-o}},N=function(A){return Math.acos(A.width/2/((0,o.distance)(A.width,A.height)/2))},I=function(A,e){switch(A){case"bottom":case"to top":return p(0,e);case"left":case"to right":return p(Math.PI/2,e);case"right":case"to left":return p(3*Math.PI/2,e);case"top right":case"right top":case"to bottom left":case"to left bottom":return p(Math.PI+N(e),e);case"top left":case"left top":case"to bottom right":case"to right bottom":return p(Math.PI-N(e),e);case"bottom left":case"left bottom":case"to top right":case"to right top":return p(N(e),e);case"bottom right":case"right bottom":case"to top left":case"to left top":return p(2*Math.PI-N(e),e);case"top":case"to bottom":default:return p(Math.PI,e)}},K=function(A,e){var t=A.split(" ").map(parseFloat),n=r(t,2),B=n[0],a=n[1],s=B/100*e.width/(a/100*e.height);return p(Math.atan(isNaN(s)?1:s)+Math.PI/2,e)},T=function(A,e,t,r){return[{x:0,y:0},{x:0,y:A.height},{x:A.width,y:0},{x:A.width,y:A.height}].reduce(function(A,n){var B=(0,o.distance)(e-n.x,t-n.y);return(r?B<A.optimumDistance:B>A.optimumDistance)?{optimumCorner:n,optimumDistance:B}:A},{optimumDistance:r?1/0:-1/0,optimumCorner:null}).optimumCorner},m=function(A,e,t,r,n){var B=t.x,a=t.y,s=0,i=0;switch(A){case"closest-side":e===C.CIRCLE?s=i=Math.min(Math.abs(B),Math.abs(B-n.width),Math.abs(a),Math.abs(a-n.height)):e===C.ELLIPSE&&(s=Math.min(Math.abs(B),Math.abs(B-n.width)),i=Math.min(Math.abs(a),Math.abs(a-n.height)));break;case"closest-corner":if(e===C.CIRCLE)s=i=Math.min((0,o.distance)(B,a),(0,o.distance)(B,a-n.height),(0,o.distance)(B-n.width,a),(0,o.distance)(B-n.width,a-n.height));else if(e===C.ELLIPSE){var c=Math.min(Math.abs(a),Math.abs(a-n.height))/Math.min(Math.abs(B),Math.abs(B-n.width)),l=T(n,B,a,!0);i=c*(s=(0,o.distance)(l.x-B,(l.y-a)/c))}break;case"farthest-side":e===C.CIRCLE?s=i=Math.max(Math.abs(B),Math.abs(B-n.width),Math.abs(a),Math.abs(a-n.height)):e===C.ELLIPSE&&(s=Math.max(Math.abs(B),Math.abs(B-n.width)),i=Math.max(Math.abs(a),Math.abs(a-n.height)));break;case"farthest-corner":if(e===C.CIRCLE)s=i=Math.max((0,o.distance)(B,a),(0,o.distance)(B,a-n.height),(0,o.distance)(B-n.width,a),(0,o.distance)(B-n.width,a-n.height));else if(e===C.ELLIPSE){var u=Math.max(Math.abs(a),Math.abs(a-n.height))/Math.max(Math.abs(B),Math.abs(B-n.width)),Q=T(n,B,a,!1);i=u*(s=(0,o.distance)(Q.x-B,(Q.y-a)/u))}break;default:s=r.x||0,i=void 0!==r.y?r.y:s}return{x:s,y:i}},v=e.transformWebkitRadialGradientArgs=function(A){var e="",t="",r="",n="",B=0,a=/^(left|center|right|\d+(?:px|r?em|%)?)(?:\s+(top|center|bottom|\d+(?:px|r?em|%)?))?$/i,s=/^\d+(px|r?em|%)?(?:\s+\d+(px|r?em|%)?)?$/i,o=A[B].match(a);o&&B++;var i=A[B].match(/^(circle|ellipse)?\s*(closest-side|closest-corner|farthest-side|farthest-corner|contain|cover)?$/i);i&&(e=i[1]||"","contain"===(r=i[2]||"")?r="closest-side":"cover"===r&&(r="farthest-corner"),B++);var c=A[B].match(s);c&&B++;var l=A[B].match(a);l&&B++;var u=A[B].match(s);u&&B++;var Q=l||o;Q&&Q[1]&&(n=Q[1]+(/^\d+$/.test(Q[1])?"px":""),Q[2]&&(n+=" "+Q[2]+(/^\d+$/.test(Q[2])?"px":"")));var w=u||c;return w&&(t=w[0],w[1]||(t+="px")),!n||e||t||r||(t=n,n=""),n&&(n="at "+n),[[e,r,t,n].filter(function(A){return!!A}).join(" ")].concat(A.slice(B))},y=function(A){return A.map(function(A){return A.match(w)}).map(function(e,t){if(!e)return A[t];switch(e[1]){case"from":return e[4]+" 0%";case"to":return e[4]+" 100%";case"color-stop":return"%"===e[3]?e[4]+" "+e[2]:e[4]+" "+100*parseFloat(e[2])+"%"}})}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=/([+-]?\d*\.?\d+)(deg|grad|rad|turn)/i;e.parseAngle=function(A){var e=A.match(r);if(e){var t=parseFloat(e[1]);switch(e[2].toLowerCase()){case"deg":return Math.PI*t/180;case"grad":return Math.PI/200*t;case"rad":return t;case"turn":return 2*Math.PI*t}}return null}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.cloneWindow=e.DocumentCloner=void 0;var r=function(){return function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,B=void 0;try{for(var a,s=A[Symbol.iterator]();!(r=(a=s.next()).done)&&(t.push(a.value),!e||t.length!==e);r=!0);}catch(A){n=!0,B=A}finally{try{!r&&s.return&&s.return()}finally{if(n)throw B}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),B=t(2),a=t(26),s=u(t(55)),o=t(4),i=t(5),c=u(t(15)),l=t(56);function u(A){return A&&A.__esModule?A:{default:A}}var Q=e.DocumentCloner=function(){function A(e,t,r,n,B){!function(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}(this,A),this.referenceElement=e,this.scrolledElements=[],this.copyStyles=n,this.inlineImages=n,this.logger=r,this.options=t,this.renderer=B,this.resourceLoader=new s.default(t,r,window),this.pseudoContentData={counters:{},quoteDepth:0},this.documentElement=this.cloneNode(e.ownerDocument.documentElement)}return n(A,[{key:"inlineAllImages",value:function(A){var e=this;if(this.inlineImages&&A){var t=A.style;Promise.all((0,i.parseBackgroundImage)(t.backgroundImage).map(function(A){return"url"===A.method?e.resourceLoader.inlineImage(A.args[0]).then(function(A){return A&&"string"==typeof A.src?'url("'+A.src+'")':"none"}).catch(function(A){0}):Promise.resolve(""+A.prefix+A.method+"("+A.args.join(",")+")")})).then(function(A){A.length>1&&(t.backgroundColor=""),t.backgroundImage=A.join(",")}),A instanceof HTMLImageElement&&this.resourceLoader.inlineImage(A.src).then(function(e){if(e&&A instanceof HTMLImageElement&&A.parentNode){var t=A.parentNode,r=(0,o.copyCSSStyles)(A.style,e.cloneNode(!1));t.replaceChild(r,A)}}).catch(function(A){0})}}},{key:"inlineFonts",value:function(A){var e=this;return Promise.all(Array.from(A.styleSheets).map(function(e){return e.href?fetch(e.href).then(function(A){return A.text()}).then(function(A){return U(A,e.href)}).catch(function(A){return[]}):w(e,A)})).then(function(A){return A.reduce(function(A,e){return A.concat(e)},[])}).then(function(A){return Promise.all(A.map(function(A){return fetch(A.formats[0].src).then(function(A){return A.blob()}).then(function(A){return new Promise(function(e,t){var r=new FileReader;r.onerror=t,r.onload=function(){var A=r.result;e(A)},r.readAsDataURL(A)})}).then(function(e){return A.fontFace.setProperty("src",'url("'+e+'")'),"@font-face {"+A.fontFace.cssText+" "})}))}).then(function(t){var r=A.createElement("style");r.textContent=t.join("\n"),e.documentElement.appendChild(r)})}},{key:"createElementClone",value:function(A){var e=this;if(this.copyStyles&&A instanceof HTMLCanvasElement){var t=A.ownerDocument.createElement("img");try{return t.src=A.toDataURL(),t}catch(A){0}}if(A instanceof HTMLIFrameElement){var r=A.cloneNode(!1),n=N();r.setAttribute("data-html2canvas-internal-iframe-key",n);var a=(0,B.parseBounds)(A,0,0),s=a.width,i=a.height;return this.resourceLoader.cache[n]=K(A,this.options).then(function(A){return e.renderer(A,{async:e.options.async,allowTaint:e.options.allowTaint,backgroundColor:"#ffffff",canvas:null,imageTimeout:e.options.imageTimeout,logging:e.options.logging,proxy:e.options.proxy,removeContainer:e.options.removeContainer,scale:e.options.scale,foreignObjectRendering:e.options.foreignObjectRendering,useCORS:e.options.useCORS,target:new c.default,width:s,height:i,x:0,y:0,windowWidth:A.ownerDocument.defaultView.innerWidth,windowHeight:A.ownerDocument.defaultView.innerHeight,scrollX:A.ownerDocument.defaultView.pageXOffset,scrollY:A.ownerDocument.defaultView.pageYOffset},e.logger.child(n))}).then(function(e){return new Promise(function(t,n){var B=document.createElement("img");B.onload=function(){return t(e)},B.onerror=n,B.src=e.toDataURL(),r.parentNode&&r.parentNode.replaceChild((0,o.copyCSSStyles)(A.ownerDocument.defaultView.getComputedStyle(A),B),r)})}),r}if(A instanceof HTMLStyleElement&&A.sheet&&A.sheet.cssRules){var l=[].slice.call(A.sheet.cssRules,0).reduce(function(A,t){try{return t&&t.cssText?A+t.cssText:A}catch(r){return e.logger.log("Unable to access cssText property",t.name),A}},""),u=A.cloneNode(!1);return u.textContent=l,u}return A.cloneNode(!1)}},{key:"cloneNode",value:function(A){var e=A.nodeType===Node.TEXT_NODE?document.createTextNode(A.nodeValue):this.createElementClone(A),t=A.ownerDocument.defaultView,r=A instanceof t.HTMLElement?t.getComputedStyle(A):null,n=A instanceof t.HTMLElement?t.getComputedStyle(A,":before"):null,B=A instanceof t.HTMLElement?t.getComputedStyle(A,":after"):null;this.referenceElement===A&&e instanceof t.HTMLElement&&(this.clonedReferenceElement=e),e instanceof t.HTMLBodyElement&&h(e);for(var a=(0,l.parseCounterReset)(r,this.pseudoContentData),s=(0,l.resolvePseudoContent)(A,n,this.pseudoContentData),i=A.firstChild;i;i=i.nextSibling)i.nodeType===Node.ELEMENT_NODE&&("SCRIPT"===i.nodeName||i.hasAttribute("data-html2canvas-ignore")||"function"==typeof this.options.ignoreElements&&this.options.ignoreElements(i))||this.copyStyles&&"STYLE"===i.nodeName||e.appendChild(this.cloneNode(i));var c=(0,l.resolvePseudoContent)(A,B,this.pseudoContentData);if((0,l.popCounters)(a,this.pseudoContentData),A instanceof t.HTMLElement&&e instanceof t.HTMLElement)switch(n&&this.inlineAllImages(C(A,e,n,s,d)),B&&this.inlineAllImages(C(A,e,B,c,F)),!r||!this.copyStyles||A instanceof HTMLIFrameElement||(0,o.copyCSSStyles)(r,e),this.inlineAllImages(e),0===A.scrollTop&&0===A.scrollLeft||this.scrolledElements.push([e,A.scrollLeft,A.scrollTop]),A.nodeName){case"CANVAS":this.copyStyles||g(A,e);break;case"TEXTAREA":case"SELECT":e.value=A.value}return e}}]),A}(),w=function(A,e){return(A.cssRules?Array.from(A.cssRules):[]).filter(function(A){return A.type===CSSRule.FONT_FACE_RULE}).map(function(A){for(var t=(0,i.parseBackgroundImage)(A.style.getPropertyValue("src")),r=[],n=0;n<t.length;n++)if("url"===t[n].method&&t[n+1]&&"format"===t[n+1].method){var B=e.createElement("a");B.href=t[n].args[0],e.body&&e.body.appendChild(B);var a={src:B.href,format:t[n+1].args[0]};r.push(a)}return{formats:r.filter(function(A){return/^woff/i.test(A.format)}),fontFace:A.style}}).filter(function(A){return A.formats.length})},U=function(A,e){var t=document.implementation.createHTMLDocument(""),r=document.createElement("base");r.href=e;var n=document.createElement("style");return n.textContent=A,t.head&&t.head.appendChild(r),t.body&&t.body.appendChild(n),n.sheet?w(n.sheet,t):[]},g=function(A,e){try{if(e){e.width=A.width,e.height=A.height;var t=A.getContext("2d"),r=e.getContext("2d");t?r.putImageData(t.getImageData(0,0,A.width,A.height),0,0):r.drawImage(A,0,0)}}catch(A){}},C=function(A,e,t,r,n){if(t&&t.content&&"none"!==t.content&&"-moz-alt-content"!==t.content&&"none"!==t.display){var B=e.ownerDocument.createElement("html2canvaspseudoelement");if((0,o.copyCSSStyles)(t,B),r)for(var a=r.length,s=0;s<a;s++){var c=r[s];switch(c.type){case l.PSEUDO_CONTENT_ITEM_TYPE.IMAGE:var u=e.ownerDocument.createElement("img");u.src=(0,i.parseBackgroundImage)("url("+c.value+")")[0].args[0],u.style.opacity="1",B.appendChild(u);break;case l.PSEUDO_CONTENT_ITEM_TYPE.TEXT:B.appendChild(e.ownerDocument.createTextNode(c.value))}}return B.className=E+" "+f,e.className+=n===d?" "+E:" "+f,n===d?e.insertBefore(B,e.firstChild):e.appendChild(B),B}},d=":before",F=":after",E="___html2canvas___pseudoelement_before",f="___html2canvas___pseudoelement_after",h=function(A){H(A,"."+E+d+'{\n    content: "" !important;\n    display: none !important;\n}\n         .'+f+F+'{\n    content: "" !important;\n    display: none !important;\n}')},H=function(A,e){var t=A.ownerDocument.createElement("style");t.innerHTML=e,A.appendChild(t)},p=function(A){var e=r(A,3),t=e[0],n=e[1],B=e[2];t.scrollLeft=n,t.scrollTop=B},N=function(){return Math.ceil(Date.now()+1e7*Math.random()).toString(16)},I=/^data:text\/(.+);(base64)?,(.*)$/i,K=function(A,e){try{return Promise.resolve(A.contentWindow.document.documentElement)}catch(t){return e.proxy?(0,a.Proxy)(A.src,e).then(function(A){var e=A.match(I);return e?"base64"===e[2]?window.atob(decodeURIComponent(e[3])):decodeURIComponent(e[3]):Promise.reject()}).then(function(e){return T(A.ownerDocument,(0,B.parseBounds)(A,0,0)).then(function(A){var t=A.contentWindow.document;t.open(),t.write(e);var r=m(A).then(function(){return t.documentElement});return t.close(),r})}):Promise.reject()}},T=function(A,e){var t=A.createElement("iframe");return t.className="html2canvas-container",t.style.visibility="hidden",t.style.position="fixed",t.style.left="-10000px",t.style.top="0px",t.style.border="0",t.width=e.width.toString(),t.height=e.height.toString(),t.scrolling="no",t.setAttribute("data-html2canvas-ignore","true"),A.body?(A.body.appendChild(t),Promise.resolve(t)):Promise.reject("")},m=function(A){var e=A.contentWindow,t=e.document;return new Promise(function(r,n){e.onload=A.onload=t.onreadystatechange=function(){var e=setInterval(function(){t.body.childNodes.length>0&&"complete"===t.readyState&&(clearInterval(e),r(A))},50)}})},v=(e.cloneWindow=function(A,e,t,r,n,B){var a=new Q(t,r,n,!1,B),s=A.defaultView.pageXOffset,o=A.defaultView.pageYOffset;return T(A,e).then(function(n){var B=n.contentWindow,i=B.document,c=m(n).then(function(){a.scrolledElements.forEach(p),B.scrollTo(e.left,e.top),!/(iPad|iPhone|iPod)/g.test(navigator.userAgent)||B.scrollY===e.top&&B.scrollX===e.left||(i.documentElement.style.top=-e.top+"px",i.documentElement.style.left=-e.left+"px",i.documentElement.style.position="absolute");var t=Promise.resolve([n,a.clonedReferenceElement,a.resourceLoader]),s=r.onclone;return a.clonedReferenceElement instanceof B.HTMLElement||a.clonedReferenceElement instanceof A.defaultView.HTMLElement||a.clonedReferenceElement instanceof HTMLElement?"function"==typeof s?Promise.resolve().then(function(){return s(i)}).then(function(){return t}):t:Promise.reject("")});return i.open(),i.write(v(document.doctype)+"<html></html>"),function(A,e,t){!A.defaultView||e===A.defaultView.pageXOffset&&t===A.defaultView.pageYOffset||A.defaultView.scrollTo(e,t)}(t.ownerDocument,s,o),i.replaceChild(i.adoptNode(a.documentElement),i.documentElement),i.close(),c})},function(A){var e="";return A&&(e+="<!DOCTYPE ",A.name&&(e+=A.name),A.internalSubset&&(e+=A.internalSubset),A.publicId&&(e+='"'+A.publicId+'"'),A.systemId&&(e+='"'+A.systemId+'"'),e+=">"),e})},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.ResourceStore=void 0;var r,n=function(){function A(A,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(A,r.key,r)}}return function(e,t,r){return t&&A(e.prototype,t),r&&A(e,r),e}}(),B=t(10),a=(r=B)&&r.__esModule?r:{default:r},s=t(26);function o(A,e){if(!(A instanceof e))throw new TypeError("Cannot call a class as a function")}var i=function(){function A(e,t,r){o(this,A),this.options=e,this._window=r,this.origin=this.getOrigin(r.location.href),this.cache={},this.logger=t,this._index=0}return n(A,[{key:"loadImage",value:function(A){var e=this;if(this.hasResourceInCache(A))return A;if(g(A))return this.cache[A]=d(A,this.options.imageTimeout||0),A;if(!C(A)||a.default.SUPPORT_SVG_DRAWING){if(!0===this.options.allowTaint||w(A)||this.isSameOrigin(A))return this.addImage(A,A,!1);if(!this.isSameOrigin(A)){if("string"==typeof this.options.proxy)return this.cache[A]=(0,s.Proxy)(A,this.options).then(function(A){return d(A,e.options.imageTimeout||0)}),A;if(!0===this.options.useCORS&&a.default.SUPPORT_CORS_IMAGES)return this.addImage(A,A,!0)}}}},{key:"inlineImage",value:function(A){var e=this;return w(A)?d(A,this.options.imageTimeout||0):this.hasResourceInCache(A)?this.cache[A]:this.isSameOrigin(A)||"string"!=typeof this.options.proxy?this.xhrImage(A):this.cache[A]=(0,s.Proxy)(A,this.options).then(function(A){return d(A,e.options.imageTimeout||0)})}},{key:"xhrImage",value:function(A){var e=this;return this.cache[A]=new Promise(function(t,r){var n=new XMLHttpRequest;if(n.onreadystatechange=function(){if(4===n.readyState)if(200!==n.status)r("Failed to fetch image "+A.substring(0,256)+" with status code "+n.status);else{var e=new FileReader;e.addEventListener("load",function(){var A=e.result;t(A)},!1),e.addEventListener("error",function(A){return r(A)},!1),e.readAsDataURL(n.response)}},n.responseType="blob",e.options.imageTimeout){var B=e.options.imageTimeout;n.timeout=B,n.ontimeout=function(){return r("")}}n.open("GET",A,!0),n.send()}).then(function(A){return d(A,e.options.imageTimeout||0)}),this.cache[A]}},{key:"loadCanvas",value:function(A){var e=String(this._index++);return this.cache[e]=Promise.resolve(A),e}},{key:"hasResourceInCache",value:function(A){return void 0!==this.cache[A]}},{key:"addImage",value:function(A,e,t){var r=this;var n=function(A){return new Promise(function(n,B){var a=new Image;if(a.onload=function(){return n(a)},A&&!t||(a.crossOrigin="anonymous"),a.onerror=B,a.src=e,!0===a.complete&&setTimeout(function(){n(a)},500),r.options.imageTimeout){var s=r.options.imageTimeout;setTimeout(function(){return B("")},s)}})};return this.cache[A]=U(e)&&!C(e)?a.default.SUPPORT_BASE64_DRAWING(e).then(n):n(!0),A}},{key:"isSameOrigin",value:function(A){return this.getOrigin(A)===this.origin}},{key:"getOrigin",value:function(A){var e=this._link||(this._link=this._window.document.createElement("a"));return e.href=A,e.href=e.href,e.protocol+e.hostname+e.port}},{key:"ready",value:function(){var A=this,e=Object.keys(this.cache),t=e.map(function(e){return A.cache[e].catch(function(A){return null})});return Promise.all(t).then(function(A){return new c(e,A)})}}]),A}();e.default=i;var c=e.ResourceStore=function(){function A(e,t){o(this,A),this._keys=e,this._resources=t}return n(A,[{key:"get",value:function(A){var e=this._keys.indexOf(A);return-1===e?null:this._resources[e]}}]),A}(),l=/^data:image\/svg\+xml/i,u=/^data:image\/.*;base64,/i,Q=/^data:image\/.*/i,w=function(A){return Q.test(A)},U=function(A){return u.test(A)},g=function(A){return"blob"===A.substr(0,4)},C=function(A){return"svg"===A.substr(-3).toLowerCase()||l.test(A)},d=function(A,e){return new Promise(function(t,r){var n=new Image;n.onload=function(){return t(n)},n.onerror=r,n.src=A,!0===n.complete&&setTimeout(function(){t(n)},500),e&&setTimeout(function(){return r("")},e)})}},function(A,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.parseContent=e.resolvePseudoContent=e.popCounters=e.parseCounterReset=e.TOKEN_TYPE=e.PSEUDO_CONTENT_ITEM_TYPE=void 0;var r=function(){return function(A,e){if(Array.isArray(A))return A;if(Symbol.iterator in Object(A))return function(A,e){var t=[],r=!0,n=!1,B=void 0;try{for(var a,s=A[Symbol.iterator]();!(r=(a=s.next()).done)&&(t.push(a.value),!e||t.length!==e);r=!0);}catch(A){n=!0,B=A}finally{try{!r&&s.return&&s.return()}finally{if(n)throw B}}return t}(A,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),n=t(14),B=t(8),a=e.PSEUDO_CONTENT_ITEM_TYPE={TEXT:0,IMAGE:1},s=e.TOKEN_TYPE={STRING:0,ATTRIBUTE:1,URL:2,COUNTER:3,COUNTERS:4,OPENQUOTE:5,CLOSEQUOTE:6},o=(e.parseCounterReset=function(A,e){if(!A||!A.counterReset||"none"===A.counterReset)return[];for(var t=[],n=A.counterReset.split(/\s*,\s*/),B=n.length,a=0;a<B;a++){var s=n[a].split(/\s+/),o=r(s,2),i=o[0],c=o[1];t.push(i);var l=e.counters[i];l||(l=e.counters[i]=[]),l.push(parseInt(c||0,10))}return t},e.popCounters=function(A,e){for(var t=A.length,r=0;r<t;r++)e.counters[A[r]].pop()},e.resolvePseudoContent=function(A,e,t){if(!e||!e.content||"none"===e.content||"-moz-alt-content"===e.content||"none"===e.display)return null;var n=o(e.content),B=n.length,i=[],u="",Q=e.counterIncrement;if(Q&&"none"!==Q){var w=Q.split(/\s+/),U=r(w,2),g=U[0],C=U[1],d=t.counters[g];d&&(d[d.length-1]+=void 0===C?1:parseInt(C,10))}for(var F=0;F<B;F++){var E=n[F];switch(E.type){case s.STRING:u+=E.value||"";break;case s.ATTRIBUTE:A instanceof HTMLElement&&E.value&&(u+=A.getAttribute(E.value)||"");break;case s.COUNTER:var f=t.counters[E.name||""];f&&(u+=l([f[f.length-1]],"",E.format));break;case s.COUNTERS:var h=t.counters[E.name||""];h&&(u+=l(h,E.glue,E.format));break;case s.OPENQUOTE:u+=c(e,!0,t.quoteDepth),t.quoteDepth++;break;case s.CLOSEQUOTE:t.quoteDepth--,u+=c(e,!1,t.quoteDepth);break;case s.URL:u&&(i.push({type:a.TEXT,value:u}),u=""),i.push({type:a.IMAGE,value:E.value||""})}}return u&&i.push({type:a.TEXT,value:u}),i},e.parseContent=function(A,e){if(e&&e[A])return e[A];for(var t=[],r=A.length,n=!1,B=!1,a=!1,o="",c="",l=[],u=0;u<r;u++){var Q=A.charAt(u);switch(Q){case"'":case'"':B?o+=Q:(n=!n,a||n||(t.push({type:s.STRING,value:o}),o=""));break;case"\\":B?(o+=Q,B=!1):B=!0;break;case"(":n?o+=Q:(a=!0,c=o,o="",l=[]);break;case")":if(n)o+=Q;else if(a){switch(o&&l.push(o),c){case"attr":l.length>0&&t.push({type:s.ATTRIBUTE,value:l[0]});break;case"counter":if(l.length>0){var w={type:s.COUNTER,name:l[0]};l.length>1&&(w.format=l[1]),t.push(w)}break;case"counters":if(l.length>0){var U={type:s.COUNTERS,name:l[0]};l.length>1&&(U.glue=l[1]),l.length>2&&(U.format=l[2]),t.push(U)}break;case"url":l.length>0&&t.push({type:s.URL,value:l[0]})}a=!1,o=""}break;case",":n?o+=Q:a&&(l.push(o),o="");break;case" ":case"\t":n?o+=Q:o&&(i(t,o),o="");break;default:o+=Q}"\\"!==Q&&(B=!1)}return o&&i(t,o),e&&(e[A]=t),t}),i=function(A,e){switch(e){case"open-quote":A.push({type:s.OPENQUOTE});break;case"close-quote":A.push({type:s.CLOSEQUOTE})}},c=function(A,e,t){var r=A.quotes?A.quotes.split(/\s+/):["'\"'","'\"'"],n=2*t;return n>=r.length&&(n=r.length-2),e||++n,r[n].replace(/^["']|["']$/g,"")},l=function(A,e,t){for(var r=A.length,a="",s=0;s<r;s++)s>0&&(a+=e||""),a+=(0,n.createCounterText)(A[s],(0,B.parseListStyleType)(t||"decimal"),!1);return a}}])});
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//










;
