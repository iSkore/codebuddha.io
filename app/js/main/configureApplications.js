/** ****************************************************************************************************
 * File: configureApplications.js
 * Project: codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 24-Jan-2018
 *******************************************************************************************************/
'use strict';

import config from '../config';
import { objectId } from '../utils/util';
import CRC32 from 'faster-crc32';

export default function() {
    const
        apps         = $( config.appContainerId ),
        modelTitle   = $( config.appModuleTitleId ),
        modelFooter  = $( config.appModuleFooterId ),
        appContainer = $( config.appModuleContainerId );

    console.log( config );
    config.applications.map(
        app => {
            const
                group = $( '<div>' ),
                card  = $( '<div>' ),
                body  = $( '<div>' ),
                title = $( '<h5>' ),
                desc  = $( '<p>' ),
                open  = $( '<button>' );

            modelTitle.text( app.title );

            modelFooter.html();
            app.footerItems.forEach(
                item => modelFooter.append( item )
            );
            modelFooter.append( config.defaultCloseButton );

            app.openApplication = () => {
                appContainer.html( `<div>${ app.html }</div>` );
                // app.js.default();
                console.log( app.js );
                sessionStorage.setItem( config.currentApplicationKey, app.id );
            };

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
                .attr( 'data-target', config.appModuleId )
                .text( 'Open' )
                .click( app.openApplication )
                .appendTo( body );

            app.group = group;
            apps.append( group );

            return new CRC32( Buffer.from( JSON.stringify( app ) ) )
                .then( id => app.id = id )
                .then( () => app );
        }
    );
}
