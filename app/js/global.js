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
} );
