/** ****************************************************************************************************
 * File: createZip.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 07-Nov-2017
 *******************************************************************************************************/

'use strict';
// @formatter: off

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { showInfo } from '../components/statusBar';

export default function createZip( items, name ) {
    const zip = new JSZip();
    name      = name.replace( /\//g, '' );

    showInfo( 'Creating zip...' );

    items.map(
        item => zip
            .folder(
                item.origin.substr(
                    item.origin.indexOf( name ), item.origin.length
                )
            )
            .file( item.key, item.data.Body )
    );

    zip.generateAsync( { type: 'blob' } )
        .then( data => saveAs( data, name ) );
}