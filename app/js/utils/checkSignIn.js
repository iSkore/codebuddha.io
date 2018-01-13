/** ****************************************************************************************************
 * File: signIn.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 20-Oct-2017
 *******************************************************************************************************/
'use strict';

export default function( username, password ) {
    return new Promise(
        ( res, rej ) => {
            if( !username )
                return rej( 'Oops - Must add Username.' );
            else if( !password )
                return rej( 'Oops - Must add Password.' );
            else
                res( { username, password } );
        }
    );
}