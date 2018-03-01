/** ****************************************************************************************************
 * File: buildStatus.js
 * Project: codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 01-Mar-2018
 *******************************************************************************************************/
'use strict';

const
	AWS    = require( 'aws-sdk' ),
	S3     = new AWS.S3(),
	STATUS = {
		RUNNING: 'RUNNING',
		SUCCEEDED: 'SUCCEEDED',
		FAILED: 'FAILED'
	};

function copyBuildStatus( status ) {
	let CopySource;
	
	if( status === STATUS.RUNNING ) {
		CopySource = `${ process.env.BUCKET }/badges/build_running.svg`;
	} else if( status === STATUS.SUCCEEDED ) {
		CopySource = `${ process.env.BUCKET }/badges/build_passing.svg`;
	} else {
		CopySource = `${ process.env.BUCKET }/badges/build_failing.svg`;
	}
	
	return {
		Bucket: process.env.BUCKET,
		CopySource,
		Key: 'badges/build_status.svg',
		ContentType: 'image/svg+xml;charset=utf-8'
	};
}

exports.handler = function( event, context ) {
	console.log( JSON.stringify( event, null, 4 ) );
	
	const
		{ phase, status }    = event,
		STATUS_FILE          = {
			Bucket: process.env.BUCKET,
			Key: 'status.json'
		},
		BUILD_VERSION_FILE    = {
			Bucket: process.env.BUCKET,
			Key: 'build_version.json'
		},
		BUILD_BADGE_TEMPLATE = {
			Bucket: process.env.BUCKET,
			Key: 'badges/build_version_template.svg'
		},
		BUILD_BADGE          = {
			Bucket: process.env.BUCKET,
			Key: 'badges/build_version.svg',
			ContentType: 'image/svg+xml;charset=utf-8'
		},
		NODE_BADGE_TEMPLATE  = {
			Bucket: process.env.BUCKET,
			Key: 'badges/node_version_template.svg'
		},
		NODE_BADGE           = {
			Bucket: process.env.BUCKET,
			Key: 'badges/node_version.svg',
			ContentType: 'image/svg+xml;charset=utf-8'
		},
		NPM_BADGE_TEMPLATE   = {
			Bucket: process.env.BUCKET,
			Key: 'badges/npm_version_template.svg'
		},
		NPM_BADGE            = {
			Bucket: process.env.BUCKET,
			Key: 'badges/npm_version.svg',
			ContentType: 'image/svg+xml;charset=utf-8'
		};
	
	if( phase === 'SUBMITTED' ) {
		console.log( JSON.stringify( copyBuildStatus( STATUS.RUNNING ), null, 4 ) );
		
		return S3.copyObject( copyBuildStatus( STATUS.RUNNING ) ).promise()
			.then( () => context.succeed( 'finished' ) )
			.catch( context.fail );
	} else if( phase === 'BUILD' ) {
		console.log( JSON.stringify( copyBuildStatus( status ), null, 4 ) );
		
		return S3.copyObject( copyBuildStatus( status ) )
			.promise()
			.then( () => S3.getObject( STATUS_FILE ).promise() )
			.then( d => d.Body.toString( 'utf8' ) )
			.then( d => JSON.parse( d ) )
			.then(
				d => Promise.all(
					[
						S3.getObject( NODE_BADGE_TEMPLATE ).promise()
							.then( t => t.Body.toString( 'utf8' ) )
							.then( t => t.replace( /\$\{NODE_VERSION\}/g, d.node_version ) )
							.then( t => NODE_BADGE.Body = t )
							.then( () => S3.putObject( NODE_BADGE ).promise() ),
						S3.getObject( NPM_BADGE_TEMPLATE ).promise()
							.then( t => t.Body.toString( 'utf8' ) )
							.then( t => t.replace( /\$\{NPM_VERSION\}/g, d.npm_version ) )
							.then( t => NPM_BADGE.Body = t )
							.then( () => S3.putObject( NPM_BADGE ).promise() )
					]
				)
			)
			.then( () => S3.getObject( BUILD_STATUS_FILE ).promise() )
			.then( d => d.Body.toString( 'utf8' ) )
			.then( d => JSON.parse( d ) )
			.then(
				d => S3.getObject( BUILD_BADGE_TEMPLATE ).promise()
					.then( t => t.Body.toString( 'utf8' ) )
					.then( t => t.replace( /\$\{BUILD_VERSION\}/g, d.build_version ) )
					.then( t => BUILD_BADGE.Body = t )
					.then( () => S3.putObject( BUILD_BADGE ).promise() )
			)
			.then( () => context.succeed( 'finished' ) )
			.catch( context.fail );
	} else {
		if( status !== STATUS.SUCCEEDED ) {
			return S3.copyObject( copyBuildStatus( STATUS.FAILED ) ).promise()
				.then( () => context.succeed( 'finished' ) )
				.catch( context.fail );
		} else {
			context.succeed( 'finished' );
		}
	}
};
