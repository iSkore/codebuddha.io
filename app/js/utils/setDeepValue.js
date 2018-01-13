/** ****************************************************************************************************
 * File: setDeepValue.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 04-Nov-2017
 *******************************************************************************************************/
'use strict';

// @formatter: off

/**
 * setValue
 * @param obj - target object
 * @param path - path to set
 * @param val - value to set to
 * @returns {*}
 */
export function setValue( obj, path, val ) {
    let a;

    if( !Array.isArray( path ) ) {
        const symbol = path.includes( '/' );
        a = path.split( symbol ? '/' : '.' );
    } else
        a = path;

    const
        len = a.length;

    let
        o = obj,
        i = 0;

    for( ; i < len - 1; i++ ) {
        const n = a[ i ];

        if( n in o )
            o = o[ n ];
        else {
            o[ n ] = {};
            o      = o[ n ];
        }
    }

    o[ a[ len - 1 ] ] = val;

    return o;
}

/**
 * getValue
 * @param obj - target object
 * @param path - path to get
 * @returns {*}
 */
export function getValue( obj, path ) {
    path    = path.replace( /\//g, '.' );
    const a = path.split( '.' ).filter( i => !!i );
    let o   = obj;

    console.log( obj );

    while( a.length ) {
        const n = a.shift();
        if( n in o )
            o = o[ n ];
        else
            return;
    }

    return o;
}

export default { setValue, getValue };