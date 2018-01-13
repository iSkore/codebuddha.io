/** ****************************************************************************************************
 * File: downloadFiles.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 06-Nov-2017
 *******************************************************************************************************/
'use strict';
// @formatter: off

import progressBar from './progressBarActions';
import listRecursively from './listRecursively';
import { showInfo } from '../components/statusBar';

export default function( items ) {
    showInfo( 'Listing files...' );

    return listRecursively( items )
        .then( d => {
            showInfo( 'Downloading files...' );
            return progressBar.beginProgress( d, true );
        } );
}