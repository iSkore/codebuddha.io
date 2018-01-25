/** ****************************************************************************************************
 * File: index.js
 * Project: codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 24-Jan-2018
 *******************************************************************************************************/
'use strict';

export const html = new Promise(
    ( res, rej ) => {
        $.get( 'module.html', function( data ) {
            console.log( data );
            $( this ).children( 'div:first' ).html( data );
        } );
    }
);

export default function() {

}