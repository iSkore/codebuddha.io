/** ****************************************************************************************************
 * File: clearNavItems.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 20-Oct-2017
 *******************************************************************************************************/
'use strict';

export default function() {
    const
        itemContainer = $( 'nav' );

    // itemContainer.children()
    //     .each( function() {
    //         this.remove();
    //     } );

    itemContainer.html( '' );
}