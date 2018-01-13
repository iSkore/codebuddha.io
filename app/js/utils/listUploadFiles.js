/** ****************************************************************************************************
 * File: listUploadFiles.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 23-Oct-2017
 *******************************************************************************************************/
'use strict';
// @formatter:off

function traverseFileTree( item, path = '', files = [] ) {
    return new Promise(
        res => {
            if( item.isFile ) {
                item.file(
                    file => {
                        file.filepath = path + file.name;
                        files.push( file );
                        res( file );
                    }
                );
            } else if( item.isDirectory ) {
                let dirReader = item.createReader();

                path = item.fullPath + '/';

                dirReader.readEntries(
                    entries => {
                        const entriesPromises = [];

                        for( const item of entries )
                            entriesPromises.push(
                                traverseFileTree( item, path, files )
                            );

                        res( Promise.all( entriesPromises ) );
                    }
                );
            }
        }
    );
}

export default function( dataTransferItems ) {
    return new Promise(
        ( res, rej ) => {
            const entriesPromises = [];

            for( const item of dataTransferItems )
                entriesPromises.push(
                    traverseFileTree( item.webkitGetAsEntry() )
                );

            Promise.all( entriesPromises )
                .then( res )
                .catch( rej );
        }
    );
}