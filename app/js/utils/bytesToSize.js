/** ****************************************************************************************************
 * File: bytesToSize.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 01-Nov-2017
 *******************************************************************************************************/
'use strict';
// @formatter: off

import isMovileDevice from './isMobileDevice';

export default function( bytes ) {
    if( !bytes )
        return '0 Byte';

    const
        Bytes = isMovileDevice() ? 'B' : 'Bytes',
        sizes = [ Bytes, 'KB', 'MB', 'GB', 'TB' ],
        i     = parseInt( ~~( Math.log( bytes ) / Math.log( 1024 ) ) );

    return Math.round( bytes / Math.pow( 1024, i ) ) + ' ' + sizes[ i ];
}