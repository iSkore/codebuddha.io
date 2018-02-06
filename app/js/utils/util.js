/** ****************************************************************************************************
 * File: util.js
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 16-OCT-2017
 *******************************************************************************************************/
'use strict';

/**
 * @typedef {number} milliseconds
 * @description
 *     A number assumed to be in milliseconds.<br/>
 *     Number is likely to be calculated against a Unix Epoch based timestamp or milliseconds since Jan 01 1970.<br/>
 *     When multiplied by <code>1e-3</code>, number should convert to seconds
 */

/**
 * @typedef {number[]} hrtime
 * @description
 *     A "tuple" assumed to be a result of calling for high resolution time <code>process.hrtime</code><br/>
 *     typically, a resulting <code>hrtime</code> should be the returned value of
 *     <code>process.hrtime( process.hrtime() );</code> where the inner <code>hrtime</code>
 *     is likely called before a function is run to calculate the time it took to run a process.
 *     tuple is assumed to be in nanoseconds
 * @example
 * [ 22727, 841838045 ]
 */

/**
 * @typedef {number|string} radix
 * @property {number} binary - specify 2 to return binary radix value
 * @property {number} octal - specify 8 to return octal radix value
 * @property {number} base10 - specify 10 to return base10 radix value
 * @property {number} hexadecimal - specify 16 to return hexadecimal radix value
 */

/**
 * @typedef {string} uuid
 * @description
 *     UUIDs (Universally Unique IDentifier), also known as GUIDs (Globally Unique IDentifier).
 *     A UUID is 128 bits long, and can guarantee uniqueness across space and time.
 *     <a href="https://tools.ietf.org/html/rfc4122">RFC 4122</a>
 *
 *     Assumed to be a hexadecimal string compliant with one of the following:
 *     <ul>
 *     <li><a href="https://tools.ietf.org/html/rfc4122#section-4.1.5">Time-Based UUID Version 1</a></li>
 *     <li><a href="https://tools.ietf.org/html/rfc4122#section-4.3">Name-Based UUID Version 3 & 5</a></li>
 *     <li><a href="https://tools.ietf.org/html/rfc4122#section-4.4">Truly-Random or Pseudo-Random Version 4</a></li>
 *     </ul>
 * @example
 * a0ac3f6e-510e-45d8-b199-07d63f23a011
 */

const
    querystring                = require( 'querystring' ),
    ERROR                      = 'Error',
    FUNCTION_ERROR             = `${ERROR} - Function failed.`,
    ARGUMENT_ERROR             = 'Argument Error',
    ARGUMENT_ERROR_PROPERTY    = p => `${ARGUMENT_ERROR} - Item expected to have property: ${p}`,
    ARGUMENT_ERROR_BOOLEAN     = `${ARGUMENT_ERROR} - Item expected to be typeof Boolean`,
    ARGUMENT_ERROR_STRING      = `${ARGUMENT_ERROR} - Item expected to be typeof String`,
    ARGUMENT_ERROR_NUMBER      = `${ARGUMENT_ERROR} - Item expected to be typeof Number`,
    ARGUMENT_ERROR_ARRAY       = `${ARGUMENT_ERROR} - Item expected to be typeof Array`,
    ARGUMENT_ERROR_OBJECT      = `${ARGUMENT_ERROR} - Item expected to be typeof Object`,
    ARGUMENT_ERROR_POWER       = `${ARGUMENT_ERROR} - Item expected to be power of two`,
    ARGUMENT_ERROR_HTTP        = `${ARGUMENT_ERROR} - Method expected to be valid HTTP method`,
    ARGUMENT_ERROR_EMAIL       = `${ARGUMENT_ERROR} - Item expected to be valid email`,
    ARGUMENT_ERROR_IPV4        = `${ARGUMENT_ERROR} - Item expected to be valid IPv4`,
    ARGUMENT_ERROR_DOMAIN_NAME = `${ARGUMENT_ERROR} - Item expected to be valid domain name`,
    LARGE_ARRAY_SIZE           = 200,
    FLOAT_EPSILON              = 1.19209290e-7,
    DOUBLE_EPSILON             = 2.2204460492503131e-16,
    { isArray: array }         = Array;

function _isNotNaN( n ) {
    return ( n === n );
}

function isNaN( ...n ) {
    return !n.filter( _isNotNaN ).length;
}

function _isNotUndefined( n ) {
    return n && typeof n !== 'undefined';
}

function isUndefined( ...n ) {
    return !n.filter( _isNotUndefined ).length;
}

function _isNotNull( n ) {
    return ( n && _isNotNaN( n ) && _isNotUndefined( n ) );
}

function isNull( ...n ) {
    return !n.filter( _isNotNull ).length;
}

function _isNotBoolean( n ) {
    return typeof n !== 'boolean';
}

function isBoolean( ...n ) {
    return !n.filter( _isNotBoolean ).length;
}

function _isNotString( n ) {
    return typeof n !== 'string';
}

function isString( ...n ) {
    return !n.filter( _isNotString ).length;
}

function _isNotNumber( n ) {
    return ( +n !== n );
}

function isNumber( ...n ) {
    return !n.filter( _isNotNumber ).length;
}

function _isNotArray( n ) {
    return !array( n );
}

function isArray( ...n ) {
    return !n.filter( _isNotArray ).length;
}

function _isNotObject( n ) {
    return !( _isNotArray( n ) && typeof n === 'object' );
}

function isObject( ...n ) {
    return !n.filter( _isNotObject ).length;
}

function _isNotBuffer( n ) {
    return !( Buffer.isBuffer( n ) );
}

function isBuffer( ...n ) {
    return !n.filter( _isNotBuffer ).length;
}

function _isNotFunction( n ) {
    return typeof n !== 'function';
}

function isFunction( ...n ) {
    return !n.filter( _isNotFunction ).length;
}

function isPowerOfTwo( n ) {
    return !( n & ( n - 1 ) );
}

function keys( o ) {
    return isObject( o ) ? Object.keys( o ) : o;
}

function values( o ) {
    return isObject( o ) ? Object.values( o ) : o;
}

function publicObject( o ) {
    return isObject( o ) ? keys( o ).reduce( ( r, i ) => ( r[ i ] = o[ i ], r ), {} ) : o;
}

function has( o, ...args ) {
    if( isString( o ) ) {
        return args.filter( i => o.indexOf( i ) !== -1 ).length === args.length;
    } else if( isArray( o ) ) {
        return args.filter( i => o.includes( i ) ).length === args.length;
    } else if( isObject( o ) ) {
        return args.filter( i => o.hasOwnProperty( i ) ).length === args.length;
    } else {
        return false;
    }
}

function hasSome( o, ...args ) {
    if( isString( o ) ) {
        return !!( args.filter( i => o.indexOf( i ) !== -1 ).length );
    } else if( isArray( o ) ) {
        return !!( args.filter( i => o.includes( i ) ).length );
    } else if( isObject( o ) ) {
        return !!( args.filter( i => o.hasOwnProperty( i ) ).length );
    } else {
        return false;
    }
}

function sortObject( o ) {
    if( !isObject( o ) ) {
        throw new Error( ARGUMENT_ERROR_OBJECT );
    }

    const
        sorted = {},
        a      = [];

    for( const key in o ) {
        if( o.hasOwnProperty( key ) ) {
            a.push( key );
        }
    }

    a.sort();

    for( let i = 0; i < a.length; i++ ) {
        sorted[ a[ i ] ] = o[ a[ i ] ];
    }

    return sorted;
}

function sort( obj ) {
    if( isArray( obj ) ) {
        return obj.sort();
    } else if( isObject( obj ) ) {
        return sortObject( obj );
    } else {
        throw new Error( ARGUMENT_ERROR_ARRAY );
    }
}

function stringify( n ) {
    if( isObject( n ) ) {
        return JSON.stringify( n );
    } else {
        throw new Error( ARGUMENT_ERROR_OBJECT );
    }
}

function parse( n ) {
    n = n.trim();

    if( isString( n ) ) {
        if( n.startsWith( '{' ) || n.startsWith( '[' ) ) {
            return JSON.parse( n );
        } else {
            return n;
        }
    } else {
        throw new Error( ARGUMENT_ERROR_STRING );
    }
}

function map( o, fn ) {
    if( isArray( o ) && isFunction( fn ) ) {
        return o.map( fn );
    } else if( isObject( o ) && isFunction( fn ) ) {
        return keys( o ).reduce( ( r, i ) => {
            fn( i, r[ i ], r );
            return r;
        }, o );
    } else {
        throw new Error( ARGUMENT_ERROR_ARRAY );
    }
}

function startsWith( str, char ) {
    return isString( str ) && str.startsWith( char );
}

function isValidJSON( str ) {
    if( !isString( str ) || isUndefined( str ) || isNull( str ) ) {
        return false;
    }

    return /^[\],:{}\s]*$/.test(
        str
            .replace( /\\["\\\/bfnrtu]/g, '@' )
            .replace( /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']' )
            .replace( /(?:^|:|,)(?:\s*\[)+/g, '' )
    );
}

function isValidHTTPMethod( n ) {
    return (
        isString( n ) &&
        /^(GET|POST|PUT|PATCH|DELETE|COPY|HEAD|OPTIONS|CONNECT)$/.test( n.toUpperCase() )
    );
}

function isValidWebDAVMethod( n ) {
    return (
        isString( n ) &&
        (
            isValidHTTPMethod( n ) ||
            /^(LINK|UNLINK|PURGE|LOCK|UNLOCK|PROPFIND|VIEW)$/.test( n.toUpperCase() )
        )
    );
}

function isProtocol( n ) {
    return (
        isString( n ) &&
        /s?m?h?f?t?tps?|wss|file/i.test( n.toLowerCase() )
    );
}

function isValidEmail( n ) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test( n );
}

function isValidIPv4( n ) {
    return /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/.test( n );
}

function isValidDomainName( n ) {
    return (
        n === 'localhost' ||
        /^(?:(?:(?:[a-zA-Z0-9\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9-\.]){1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/i.test( n )
    );
}

function isPath( n ) {
    return /(\\|\/)([a-z0-9\s_@\-^!#$%&+={}\[\]]+)(\\|\/)/i.test( n );
}

function isValidQueryString( qs ) {
    const t = querystring.parse( qs );
    return isString( qs ) && isObject( t );
}

function buildQueryString( qs ) {
    if( !isObject( qs ) ) {
        throw new Error( ARGUMENT_ERROR_OBJECT );
    }

    function deepCheck( o ) {
        map( o, ( k, v ) => {
            if( isObject( v ) ) {
                o[ k ] = querystring.stringify( v, ',', ':' );
            }
        } );

        return o;
    }

    qs = deepCheck( qs );
    qs = querystring.stringify( qs );

    if( isValidQueryString( qs ) ) {
        return `?${qs}`;
    } else {
        throw new Error( FUNCTION_ERROR );
    }
}

function isEmpty( o ) {
    return !o || ( isArray( o ) ? !o.length : !Object.keys( o ).length );
}

function flatten( arr, result = [] ) {
    const
        length = arr && arr.length;

    if( !length ) {
        return result;
    }

    let index = -1;

    while( ++index < length ) {
        let value = arr[ index ];
        if( isArray( value ) ) {
            flatten( value, result );
        } else {
            result[ result.length ] = value;
        }
    }
    return result;
}

function extractIP( inets ) {
    return flatten( values( inets ) )
        .filter( a => !a.internal && a.family !== 'IPv6' )
        .map( a => a.address )[ 0 ] || 'offline';
}

function defineProperty( o, name, g, s = null ) {
    let prop;
    if( !s && isObject( g ) ) {
        return Object.defineProperty( o, name, g );
    } else {
        prop = {
            enumerable: false,
            set: s || undefined,
            get: g || undefined
        };
    }

    if( o.hasOwnProperty( name ) ) {
        throw new Error( `Property "${name}" already exists on object: ` + JSON.stringify( Object.getOwnPropertyDescriptor( o, name ) ) );
    }

    Object.defineProperty( o, name, prop );
    return o;
}

function nonEnumerableProperty( o, name, val ) {
    if( isNull( o, name ) || isBoolean( o ) || isString( o ) || isNumber( o ) )
        return;

    const prop = {
        configurable: true,
        writable: true,
        enumerable: false
    };

    if( typeof val !== 'undefined' )
        prop.value = val;

    Object.defineProperty( o, name, prop );
}

function pad2( n ) {
    return n < 10 ? '0' + n : n;
}

function secondsToReadableTime( n ) {
    const
        sec = parseInt( n, 10 ),
        h   = pad2( ~~( sec / 3600 ) ),
        m   = pad2( ~~( ( sec - ( h * 3600 ) ) / 60 ) ),
        s   = pad2( sec - ( h * 3600 ) - ( m * 60 ) );
    return `${h}:${m}:${s}`;
}

function isObjectId( id ) {
    return /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test( id );
}

/**
 * objectFilteredForRegex
 * @description returns an object with key-value pairs that match regex
 * @param {Object} obj - object to evaluate
 * @param {RegExp} rx - regex to compare object's keys to
 * @returns {{}} - filtered object with keys matching regex
 * @example
 * objectFilteredForRegex( { a: 0, b: 1 }, /A/i ) // -> returns { a: 0 }
 */
function objectFilteredForRegex( obj, rx ) {
    const keys = {};
    for( const key in obj ) {
        if( obj.hasOwnProperty( key ) && rx.test( key ) ) {
            keys[ key ] = obj[ key ];
        }
    }
    return keys;
}

/**
 * getValueForRegexKey
 * @description allows key-value extraction from an object based on a regex like: <code>obj[ /reg/i ]</code>
 * @param {Object} obj - object to evaluate
 * @param {RegExp} rx - regex to compare object's keys to
 * @returns {*} value extracted from an object
 * @example
 * getValueForRegexKey( { a: 0 }, /A/i ) // -> returns 0
 */
function getValueForRegexKey( obj, rx ) {
    for( const key in obj ) {
        if( obj.hasOwnProperty( key ) && rx.test( key ) ) {
            return obj[ key ];
        }
    }
}

/**
 * wait
 * @description similar to <code>usleep</code> in C++
 * @param {milliseconds} t - time to wait
 * @param {*} passValue - optional value to pass through when promise resolves
 * @returns {Promise<any>} - promise to be resolved in [t] milliseconds
 * @example
 * wait( 100, 'hello world' )
 *     .then() // -> will pass 'hello world' in 100ms
 */
function wait( t, passValue ) {
    return new Promise(
        res => setTimeout( () => res( passValue ), t )
    );
}

/**
 * absoluteValue
 * @param {number} n - number to compute absolute value
 * @returns {number} - will always be a positive number
 * @example
 * absoluteValue( -50 ) // -> returns 50
 */
function absoluteValue( n ) {
    if( ~~n === n ) {
        return ( n ^ ( n >> 31 ) ) - ( n >> 31 );
    } else {
        return Math.abs( n );
    }
}

/**
 * performanceDifference
 * @description
 *     Measures the performance difference between a newTime and oldTime.
 *     Assumed that newTime and oldTime will be similar unit values
 * @param {number|milliseconds} newTime - new value to compare
 * @param {number|milliseconds} oldTime - old value to compare
 * @returns {string} - pretty string that evaluates if the delta is an increase or decrease
 * @example
 * performanceDifference( 50, 100 ) // -> Performance increase of: 50%
 */
function performanceDifference( newTime, oldTime ) {
    const time = ( ( newTime - oldTime ) / oldTime ) * 100;

    if( time < 0 ) {
        return `Performance increase of: ${absoluteValue( time )}%`;
    } else if( time > 0 ) {
        return `Performance decrease of: ${absoluteValue( time )}%`;
    } else {
        return 'Performance did not change';
    }
}

/**
 * bytesToSize
 * @description
 *     Convert bytes to human readable format
 * @param {bytes} bytes - unit in bytes to parse
 * @returns {string} - pretty string in the format [n unit]
 * @example
 * bytesToSize( 1073741824 ) // -> 1 GB
 */
function bytesToSize( bytes ) {
    if( !bytes )
        return '0 Byte';

    const
        sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB' ],
        i     = parseInt( ~~( Math.log( bytes ) / Math.log( 1024 ) ) );

    return Math.round( bytes / Math.pow( 1024, i ) ) + ' ' + sizes[ i ];
}

/**
 * radixToNumber
 * @description convert possible radix string to radix number value
 * @param {number|string} radix - a number or string to convert radix to a number
 * @returns {number} 2, 8, 10, or 16 to specify radix
 */
function radixToNumber( radix ) {
    if( radix === 'binary' ) {
        radix = 2;
    } else if( radix === 'octal' ) {
        radix = 8;
    } else if( radix === 'base10' ) {
        radix = 10;
    } else {
        radix = 16;
    }

    return radix;
}

/**
 * generateRandomNumber
 * @description generate a random number between two values
 * @param {number} [min=0] - minimum possible random value
 * @param {number} [max=16] - maximum possible random value
 * @param {boolean} [floored=true] - should value be floored
 * @returns {number} - random generated number
 */
function generateRandomNumber( min = 0, max = 16, floored = true ) {
    let n;

    if( min < 0 ) {
        n = min + Math.random() * ( absoluteValue( min ) + max );
    } else {
        n = min + Math.random() * max;
    }

    return floored ? n | 0 : n;
}

/**
 * generateRandomString
 * @description generate a random string with radix encoding
 * @param {number} [min=0] - minimum possible random value
 * @param {number} [max=16] - maximum possible random value
 * @param {radix} [radix=16] - return radix type
 * @param {boolean} [floored=true] - should value be floored
 * @returns {string} - random generated string with specified radix encoding
 */
function generateRandomString( min = 0, max = 16, radix = 16, floored = true ) {
    radix = radixToNumber( radix );
    return generateRandomNumber( min, max, floored ).toString( radix );
}

/**
 * generateRandomHex
 * @description generate random hex value <code>[0-9A-F]</code>
 * @returns {string} - random generated hex character
 */
function generateRandomHex() {
    return generateRandomString();
}

/**
 * getRandomInt
 * @description generate random integer value <code>[0-9]</code>
 * @param {number} min - minimum generated value
 * @param {number} max - maximum generated value
 * @returns {number} random number between minimum and maximum specified values
 */
function getRandomInt( min, max ) {
    min = ~~min;
    max = ~~max;
    return ~~( Math.random() * ( max - min ) ) + min;
}

/**
 * replaceMatchesWithValue
 * @description - find and replace items in a string with RegExp identifier
 * @param {string} item - item to mutate
 * @param {RegExp} identifier - match to find in the item
 * @param {string} replacement - value to replace the match with
 * @returns {*} - string with replacement values
 * @example
 * replaceMatchesWithValue( "abc", /abc/i, "123" )
 */
function replaceMatchesWithValue( item, identifier, replacement ) {
    if( !isString( item ) ) {
        throw new Error( ARGUMENT_ERROR_STRING );
    } else if( !isNumber( replacement ) && !isString( replacement ) ) {
        throw new Error( ARGUMENT_ERROR );
    }

    let check;

    if( identifier instanceof RegExp ) {
        check = item.match( identifier );
    } else {
        check = item.includes( identifier );
    }

    if( check ) {
        return item.replace( identifier, replacement );
    } else {
        return item;
    }
}

/**
 * recursivePromiseResolve
 * @description recursively resolve all Promise's in an data object
 * @param {object|array|Promise<*>} P - an object, array, or anything to recursively resolve
 * @returns {*} the original object in the same structure with all promises resolved
 * @example
 * recursivePromiseResolve( { key: [ Promise.resolve( 2 ) ] } )
 *     .then() // -> { key: [ 2 ] }
 */
function recursivePromiseResolve( P ) {
    const
        map   = ( pl, n ) => Promise.all(
            pl.map( p => Promise.resolve( p ).then( n ) )
        ),
        props = o => {
            const arr = [];

            Object.keys( o )
                .map(
                    k => arr.push(
                        Promise.resolve( o[ k ] )
                            .then( v => ( o[ k ] = v, o ) )
                    )
                );

            return Promise.all( arr ).then( () => ( o ) );
        },
        rNP   = o => Promise.resolve( o )
            .then( o => {
                if( isArray( o ) ) {
                    return map( o, rNP );
                } else if( typeof o === 'object' ) {
                    const oa = {};

                    for( const ka in o ) {
                        if( o.hasOwnProperty( ka ) ) {
                            oa[ ka ] = rNP( o[ ka ] );
                        }
                    }

                    return props( oa );
                }
                return o;
            } );

    return ( rNP )( P );
}

/**
 * objectId
 * @description
 * similar to a MongoId but not strictly compliant.
 * starts with 8 bytes of a hexadecimal timestamp followed by
 * 16 bytes (or otherwise specified) of random hexadecimal bytes
 * @param {number} len - number of random bytes to append to timestamp
 * @returns {string}
 * returns an ObjectId of random bytes with the length specified
 * @example
 * objectId() // -> "5a5cfafcbf2752b429d4cba7"
 */
function objectId( len = 16 ) {
    const timestamp = ( new Date().getTime() / 1000 | 0 ).toString( 16 );
    return timestamp + ( 'x'.repeat( len ) ).replace( /[x]/g, generateRandomHex ).toLowerCase();
}

/**
 * convertHighResolutionTime
 * @description
 * converts a "final" high resolution time stamp into seconds, milliseconds, and nanoseconds
 * @param {hrtime} hrtime - high resolution time tuple returned from <code>process.hrtime</code>
 * @returns {{seconds: number, milli: number, micro: number, nano: number}}
 * seconds, milliseconds, microseconds, nanoseconds based on passed in high resolution time tuple
 * @example
 * const
 *     start = process.hrtime(),
 *     end   = process.hrtime( start );
 *
 * convertHighResolutionTime( end ); // -> { seconds: 0.000002, milli: 0.002, micro: 2, nano: 2000 }
 */
function convertHighResolutionTime( hrtime ) {
    if( !isArray( hrtime ) ) {
        throw new Error( ARGUMENT_ERROR_ARRAY );
    } else if( hrtime.length !== 2 ) {
        throw new Error( ARGUMENT_ERROR_PROPERTY( 'hrtime_tuple' ) );
    }

    const
        nano    = ( hrtime[ 0 ] * 1e9 ) + hrtime[ 1 ],
        micro   = nano / 1e3,
        milli   = nano / 1e6,
        seconds = nano / 1e9;

    return { seconds, milli, micro, nano };
}

/**
 * isUUIDv4
 * should evaluate if a parameter (uuid) is RFC4122 Section 4.4 (Version 4) compliant
 * @param {uuid} uuid
 * random string of bytes assumed to be in the following format [xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx]
 * @returns {boolean}
 * signifies if the passed in UUID is RFC4122 Section 4.4 compliant
 * @example
 * isUUIDv4( 'b33ce0f0-fadc-11e7-8da3-d19e5c798a48' ) // -> false
 */
function isUUIDv4( uuid ) {
    if( !isString( uuid ) ) {
        throw new Error( ARGUMENT_ERROR_STRING );
    }

    return /[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/i.test( uuid );
}

/**
 * ascendingSort
 * @description
 * basic evaluation wrapper for the <code>sort<code> function
 * @param {number} n1 - first number comparision
 * @param {number} n2 - second number comparision
 * @returns {number} - delta of first and second float
 * @example
 * ascendingSort( 10, 9 ) // -> 1
 */
function ascendingSort( n1, n2 ) {
    if( !isNumber( n1, n2 ) ) {
        throw new Error( ARGUMENT_ERROR_NUMBER );
    }

    return n1 - n2;
}

/**
 * clamp
 * @description
 * clamps a value between a minimum float and maximum float value
 * @param {number} n - number to clamp
 * @param {number} min - minimum to clamp to
 * @param {number} max - maximum to clamp to
 * @returns {number} - number clamped to min and max value
 * @example
 * clamp( 0.900001, 0.1, 0.9 ) // -> 0.9
 */
function clamp( n, min, max ) {
    return Math.max( min, Math.min( n, max ) );
}

/**
 * absoluteMinimum
 * @description
 * evaluates the absolute minimum between two numbers
 * @param {number} n1 - first number comparision
 * @param {number} n2 - second number comparision
 * @returns {number} - minimum number of the two values
 * @example
 * absoluteMinimum( 1.5, 2.1 ) // -> 1.5
 */
function absoluteMinimum( n1, n2 ) {
    return Math.min( absoluteValue( n1 ), absoluteValue( n2 ) );
}

/**
 * absoluteMaximum
 * @description
 * evaluates the absolute maximum between two numbers
 * @param {number} n1 - first number comparision
 * @param {number} n2 - second number comparision
 * @returns {number} - maximum number of the two values
 * @example
 * absoluteMaximum( 1.5, 2.1 ) // -> 2.1
 */
function absoluteMaximum( n1, n2 ) {
    return Math.max( absoluteValue( n1 ), absoluteValue( n2 ) );
}

/**
 * precisionDelta
 * @description
 * evaluates if two numbers are approximately equal to the specified tolerance
 * precision is guaranteed up to 32-bit floats
 * please unsign the number or use the <code>doublePrecision</code> method if 64-bit evaluation is necessary
 * @param {number} n1 - first number comparision
 * @param {number} n2 - second number comparision
 * @param {number} absoluteTolerance - fixed minimal tolerance (set to 0 to ignore)
 * @param {number} relativeTolerance - tolerance that scales with n1 / n2 (set to 0 to ignore)
 * @returns {boolean} - returns true if precision delta is within specified tolerance
 * @example
 * precisionDelta( 100, 101, 0.99999999999999999, 0 ) // -> true
 * precisionDelta( 100, 101, 0.9999999999999999, 0 ) // -> false
 */
function precisionDelta( n1, n2, absoluteTolerance = 0, relativeTolerance = 0 ) {
    if( !isNumber( n1, n2, absoluteTolerance, relativeTolerance ) ) {
        throw new Error( ARGUMENT_ERROR_NUMBER );
    }

    const delta = absoluteValue( n1 - n2 );

    return delta <= absoluteTolerance ||
        delta <= relativeTolerance * absoluteMinimum( n1, n2 ) ||
        n1 === n2;
}

/**
 * floatPrecision
 * @description
 * evaluates if two numbers are approximately equal with respect to the floating point (32-bit) epsilon
 * @param {number} n1 - first float comparision
 * @param {number} n2 - second float comparision
 * @returns {boolean} - returns true if precision delta is within float epsilon tolerance (1.19209290e-7)
 * @example
 * floatPrecision( 100, 100.00001 ) // -> true
 * floatPrecision( 100, 100.0001 ) // -> false
 */
function floatPrecisionDelta( n1, n2 ) {
    return precisionDelta( n1, n2, FLOAT_EPSILON, FLOAT_EPSILON );
}

/**
 * doublePrecision
 * @description
 * evaluates if two numbers are approximately equal with respect to the double-precision floating-point (64-bit) epsilon
 * @param {number} n1 - first double comparison
 * @param {number} n2 - second double comparison
 * @returns {boolean} - returns true if precision delta is within double epsilon tolerance (2.2204460492503131e-16)
 * @example
 * doublePrecision( 100, 100.00000000000001 ) // -> true
 * doublePrecision( 100, 100.0000000000001 ) // -> false
 */
function doublePrecisionDelta( n1, n2 ) {
    return precisionDelta( n1, n2, DOUBLE_EPSILON, DOUBLE_EPSILON );
}

/**
 * percentError
 * @description
 * evaluates the precision of your calculations
 * Warning: cannot evaluate percent difference from zero (i.e if n2 is zero, the function will return false)
 * @param {number} n1 - the experimental value
 * @param {number} n2 - the expected or theoretical value
 * @param {number} acceptedDelta - expected to be a number between 0 and 1 evaluated as a percentage
 * @return {boolean} - if the first and second comparison are within the accepted tolerance
 * @example
 * percentError( 1, 1.09, 0.09 ) // -> true
 * percentError( 1, 1.09, 0.08 ) // -> false
 */
function percentError( n1, n2, acceptedDelta ) {
    if( !isNumber( n1, n2, acceptedDelta ) ) {
        throw new Error( ARGUMENT_ERROR_NUMBER );
    } else if( ~~acceptedDelta !== 0 ) {
        throw new Error( ARGUMENT_ERROR_PROPERTY( 'acceptedDelta must be a number between 0 and 1' ) );
    }

    if( acceptedDelta === 0 ) {
        return n1 === n2;
    }

    return acceptedDelta >= absoluteValue( ( n1 - n2 ) / n2 );
}

/**
 * sum
 * @description
 * returns the sum of a list of parameters or array of numbers
 * @param {number[]} args - arguments to operate on
 * @returns {number} - result of cumulative additions
 * @example
 * sum( 1, 2, 3 ); // -> 6
 */
function sum( ...args ) {
    if( isArray( args[ 0 ] ) ) {
        args = args[ 0 ];
    }

    if( !isNumber( ...args ) ) {
        throw new Error( ARGUMENT_ERROR_NUMBER );
    }

    let n = 0;

    for( let i = 0; i < args.length; i++ ) {
        n += args[ i ];
    }

    return n;
}

/**
 * mean
 * @description
 * returns the mean of a list of parameters or array of numbers
 * @param {number[]} args - arguments to operate on
 * @returns {number} - result of argument mean value
 * @example
 * mean( 1, 2, 3 ) // -> 2
 */
function mean( ...args ) {
    return sum( ...args ) / args.length;
}

module.exports = {
    ERROR,
    FUNCTION_ERROR,
    ARGUMENT_ERROR,
    ARGUMENT_ERROR_PROPERTY,
    ARGUMENT_ERROR_BOOLEAN,
    ARGUMENT_ERROR_STRING,
    ARGUMENT_ERROR_NUMBER,
    ARGUMENT_ERROR_ARRAY,
    ARGUMENT_ERROR_OBJECT,
    ARGUMENT_ERROR_POWER,
    ARGUMENT_ERROR_HTTP,
    ARGUMENT_ERROR_EMAIL,
    ARGUMENT_ERROR_IPV4,
    ARGUMENT_ERROR_DOMAIN_NAME,
    LARGE_ARRAY_SIZE,
    FLOAT_EPSILON,
    DOUBLE_EPSILON,
    array,
    isNaN,
    isUndefined,
    isNull,
    isBoolean,
    isString,
    isNumber,
    isArray,
    isObject,
    isBuffer,
    isFunction,
    isPowerOfTwo,
    keys,
    values,
    publicObject,
    has,
    hasSome,
    sortObject,
    sort,
    isValidJSON,
    stringify,
    parse,
    map,
    startsWith,
    isValidHTTPMethod,
    isValidWebDAVMethod,
    isProtocol,
    isValidEmail,
    isValidIPv4,
    isPath,
    isValidDomainName,
    isValidQueryString,
    buildQueryString,
    querystring,
    isEmpty,
    flatten,
    extractIP,
    defineProperty,
    nonEnumerableProperty,
    pad2,
    secondsToReadableTime,
    isObjectId,
    objectFilteredForRegex,
    getValueForRegexKey,
    wait,
    absoluteValue,
    performanceDifference,
    bytesToSize,
    radixToNumber,
    generateRandomNumber,
    generateRandomString,
    generateRandomHex,
    getRandomInt,
    replaceMatchesWithValue,
    recursivePromiseResolve,
    objectId,
    convertHighResolutionTime,
    isUUIDv4,
    ascendingSort,
    clamp,
    absoluteMinimum,
    absoluteMaximum,
    precisionDelta,
    floatPrecisionDelta,
    doublePrecisionDelta,
    percentError,
    sum,
    mean
};