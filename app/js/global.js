/** ****************************************************************************************************
 * File: global.js
 * Project: codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 13-Jan-2018
 *******************************************************************************************************/
'use strict';

import config from './config';
import configureApplications from './main/configureApplications';

function checkOpenApplication() {
	const currentApplication = sessionStorage.getItem( config.currentApplicationKey );
	if( currentApplication ) {
		console.log( currentApplication );
		const currentApp = config.get( currentApplication );
		
		console.log( 'currentApp', currentApp );
		currentApp.openApplication();
		$( config.appModuleId ).modal( 'show' );
	}
}

$( document ).ready( () => {
	$( '#version' ).text( process.env.VERSION );
	
	configureApplications()
		.then( () => console.log( config ) )
		.then( () => checkOpenApplication() )
		.catch( console.error );
} );
