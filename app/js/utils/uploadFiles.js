/** ****************************************************************************************************
 * File: uploadFiles.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 24-Oct-2017
 *******************************************************************************************************/
'use strict';

import progressBar from './progressBarActions';
import flattenDeep from './flattenDeep';

export default function( files ) {
    const M = window.M;

    function gatherFiles( files ) {
        return files.reduce(
            ( r, item ) => {
                if( Array.isArray( item ) ) {
                    r.push( gatherFiles( item ) );
                } else if( item.name !== '.DS_Store' ) {

                    // TODO: push items to directory and not flatten on `addItemToTable`
                    const key = M.S3.join( M.S3.cwd, item.filepath );
                    r.push(
                        {
                            key,
                            size: item.size,
                            file: p => M.S3.putObject( key, item.type, item, p )
                        }
                    );
                }

                return r;
            }, []
        );
    }

    const items = flattenDeep( gatherFiles( files ) );

    return progressBar.beginProgress( items );
}