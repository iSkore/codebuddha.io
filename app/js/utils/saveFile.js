/** ****************************************************************************************************
 * File: saveFile.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 01-Nov-2017
 *******************************************************************************************************/
'use strict';
// @formatter: off

module.exports = ( download, type, data ) => {
    const
        a    = $( '<a>' ),
        href = window.URL.createObjectURL( new Blob( [ data ], { type } ) );

    a.attr( { href, download } );
    a.css( { display: 'none' } );

    $( 'body' ).append( a );
    a[ 0 ].click();

    window.URL.revokeObjectURL( href );

    a.remove();
};