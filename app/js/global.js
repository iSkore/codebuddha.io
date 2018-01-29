/** ****************************************************************************************************
 * File: global.js
 * Project: codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Jan-2018
 *******************************************************************************************************/
'use strict';

import config from './config';
import configureApplications from './main/configureApplications';

$( document ).ready( () => {
    configureApplications();

    const currentApplication = sessionStorage.getItem( config.currentApplicationKey );
    if( currentApplication ) {
        for( let i = 0; i < config.applications.length; i++ ) {
            if( config.applications[ i ].id === currentApplication ) {
                config.applications.openApplication();
                $( config.appModuleId ).modal( 'show' );
                console.log( currentApplication );
            }
        }
    }
} );
