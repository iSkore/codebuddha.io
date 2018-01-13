/** ****************************************************************************************************
 * File: recursivelyPromisify.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 04-Nov-2017
 *******************************************************************************************************/
'use strict';
// @formatter: off

export default function( P ) {
    let map   = ( pl, n ) => Promise.all( pl.map( p => Promise.resolve( p ).then( n ) ) ),
        props = o => {
            let arr = [];
            Object.keys( o ).map( k => arr.push( Promise.resolve( o[ k ] ).then( v => ( o[ k ] = v, o ) ) ) );
            return Promise.all( arr ).then( () => ( o ) );
        },
        rNP   = o => Promise.resolve( o ).then( o => {
            if( Array.isArray( o ) ) return map( o, rNP );
            else if( typeof o === 'object' ) {
                let oa = {};
                for( const ka in o )
                    oa[ ka ] = rNP( o[ ka ] );
                return props( oa );
            }
            return o;
        } );
    return rNP( P );
}