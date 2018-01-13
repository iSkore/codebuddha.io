/** ****************************************************************************************************
 * File: checkPassword.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 27-Oct-2017
 *******************************************************************************************************/
'use strict';
// @formatter: off

export default function( o_pwd, n_pwd, c_pwd ) {
    return new Promise(
        ( res, rej ) => {
            if( !o_pwd )
                return rej( 'Oops - Must input old password.' );
            else if( !n_pwd || !c_pwd )
                return rej( 'Oops - Must input a new password.' );
            else if( n_pwd !== c_pwd )
                return rej( 'Oops - Passwords do not match.' );
            else if( c_pwd === o_pwd )
                return rej( 'Oops - New password may not be the same as old password.' );
            else
                res( n_pwd );
        }
    );
}