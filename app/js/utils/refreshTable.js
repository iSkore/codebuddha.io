/** ****************************************************************************************************
 * File: refreshTable.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 27-Oct-2017
 *******************************************************************************************************/

'use strict';
// @formatter: off

import clearTable from './clearTable';
import { showAlert, showWarning } from '../components/statusBar';
import tableItem from '../components/tableItem';
import Response from './http-response-class';

import breadcrumbs from '../components/breadcrumbs';

export function listFiles( key ) {
    const M = window.M;
    return M.S3.listObjects( key || M.S3.cwd )
        .then( r => r.data.items[ M.S3.lwd ] );
}

export function addItemToTable( item ) {
    const M = window.M;

<<<<<<< HEAD:app/js/pages/utils/refreshTable.js
    // TODO: Issue #21
    // https://github.com/Parellin-Technologies-LLC/files.codebuddha.io/issues/21
    
    if( item.name.includes( '/' ) ) {
=======
    item.name = M.S3.toBasename( item.key );
    console.log( item );
    if( M.S3.toBasePath( item.key ) !== M.S3.lwd )
        return;

    if( M.S3.endsWithSlash( item.name ) ) {
        item.isFolder = true;
        item.size     = 0;

        const nameOffset = item.name.split( '/' );
        item.name        = nameOffset.shift() + '/';

        if( nameOffset.length >= 2 )
            return;
        else
            item.key = item.key.replace( nameOffset[ 0 ], '' );
    } else {
        item.isFolder = false;
    }

    const
        exists = M.S3.items[ M.S3.lwd ].filter( i => i.name === item.name ).length;

    if( !exists )
        M.S3.items[ M.S3.lwd ].push( item );
}

export function addItemsToTable( items ) {
    const M = window.M;

    items.map(
        item => {
            if( item instanceof Response )
                item = item.data;

            console.log( item );
            if( M.S3.toBasePath( item.key ) !== M.S3.lwd ) {
                // TODO: properly add items to table without duplicates
			}
        }
    );

    console.log( items );

    return;

    item.name = M.S3.toBasename( item.key );
    console.log( item );
    if( M.S3.toBasePath( item.key ) !== M.S3.lwd )
        return;

    if( M.S3.endsWithSlash( item.name ) ) {
>>>>>>> development:app/js/utils/refreshTable.js
        item.isFolder = true;
        item.size     = 0;

        const nameOffset = item.name.split( '/' );
        item.name        = nameOffset.shift() + '/';

        if( nameOffset.length >= 2 )
            return;
        else
            item.key = item.key.replace( nameOffset[ 0 ], '' );
    } else {
        item.isFolder = false;
    }

    const
        exists = M.S3.items[ M.S3.lwd ].filter( i => i.name === item.name ).length;

    if( !exists )
        M.S3.items[ M.S3.lwd ].push( item );
}

export function removeItemFromTable( item ) {
    const M                = window.M;
    M.S3.items[ M.S3.lwd ] = M.S3.items[ M.S3.lwd ].filter( i => i.name !== item.name );
}

export function updateTable( list ) {
    const M = window.M;

    if( list instanceof Response )
        list = list.data || list;

    list = list || M.S3.getFolderItems( M.S3.lwd );

    clearTable();
    return list.map( item => tableItem( item ) );
}

export function refreshTable( key ) {
    const M = window.M;

    return M.S3.navigateTo( key || '~/' )
        .then( updateTable )
        .then( breadcrumbs )
        .catch( showAlert );
}

window.addEventListener( 'updateRequired', () => {
    const M = window.M;

    if( !M.S3.getFolderItems( M.S3.lwd ).length )
        M.S3.putFolder( M.S3.lwd );

    return Promise.resolve()
        .then( updateTable )
        .then( breadcrumbs )
        .catch( showAlert );
} );