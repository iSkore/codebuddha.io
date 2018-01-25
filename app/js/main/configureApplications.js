/** ****************************************************************************************************
 * File: configureApplications.js
 * Project: codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 24-Jan-2018
 *******************************************************************************************************/
'use strict';

import config from '../config';

export default function() {
    const apps = $( config.appContainerId );

    console.log( config );
    config.applications.map(
        app => {
            console.log( app.route );
            // app.route = require( app.route );
            
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
                .click(
                    () => {}
                )
                .appendTo( body );

            app.group = group;
            apps.append( group );

            return app;
        }
    );
}
