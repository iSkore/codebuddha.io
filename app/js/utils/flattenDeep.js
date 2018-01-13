/** ****************************************************************************************************
 * File: flattenDeep.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 06-Nov-2017
 *******************************************************************************************************/
'use strict';
// @formatter: off

export default function flattenDeep( arr, final = [] ) {
    arr.forEach(
        item => Array.isArray( item ) ?
            flattenDeep( item, final ) :
            final.push( item )
    );

    return final;
}