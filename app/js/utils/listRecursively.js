/** ****************************************************************************************************
 * File: listRecursively.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 07-Nov-2017
 *******************************************************************************************************/
'use strict';
// @formatter: off

import flattenDeep from './flattenDeep';

export default function listRecursively( item ) {
    const M = window.M;

    return new Promise(
        ( res, rej ) => {
            function checkAndPush( i, origin ) {
                if( i.isFolder ) {
                    return listFolder( i );
                } else {
                    return {
                        origin,
                        size: i.size,
                        key: M.S3.toBasename( i.key ),
                        file: p => M.S3.getObject( i.key, p )
                    };
                }
            }

            function listFolder( opt, dir = [] ) {
                return new Promise(
                    ( rev, rex ) => {
                        M.S3.listObjects( opt.key )
                            .then( l => M.S3.processList( l ) )
                            .then( l => M.S3.getFolderItems( l ) )
                            .then(
                                items => {
                                    const
                                        origin  = M.S3.absolutePath( opt.key );

                                    items.forEach(
                                        i => dir.push(
                                            checkAndPush( i, origin )
                                        )
                                    );

                                    Promise.all( dir )
                                        .then( rev )
                                        .catch( rex );
                                }
                            )
                            .catch( rex );
                    }
                );
            }

            listFolder( item )
                .then( i => flattenDeep( i ) )
                .then( res )
                .catch( rej );
        }
    );
}