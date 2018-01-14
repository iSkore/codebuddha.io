/** ****************************************************************************************************
 * File: global.js
 * Project: codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Jan-2018
 *******************************************************************************************************/
'use strict';

import config from './config';

$( document ).ready( () => {
    const apps = $( '#applications' );

    console.log( config );
    config.applications.forEach(
        app => {
            const
                group = $( '<div>' ),
                card  = $( '<div>' ),
                body  = $( '<div>' ),
                title = $( '<h5>' ),
                desc  = $( '<p>' ),
                open  = $( '<button>' );

            group.addClass( 'col-sm mb-5' );

            card
                .addClass( 'card' )
                .css( { width: '18rem' } )
                .appendTo( group );

            body
                .addClass( 'card-body' )
                .appendTo( card );

            title
                .addClass( 'card-title' )
                .text( app.title )
                .appendTo( body );

            desc
                .addClass( 'card-text' )
                .text( app.desc )
                .appendTo( body );

            open
                .addClass( 'btn btn-primary' )
                .attr( 'type', 'button' )
                .attr( 'data-toggle', 'modal' )
                .attr( 'data-target', '#appModal' )
                .text( 'Open' )
                .appendTo( body );

            apps.append( group );
        }
    );
} );