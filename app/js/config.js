/** ****************************************************************************************************
 * File: config.js
 * Project: codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 24-Jan-2018
 *******************************************************************************************************/
'use strict';

module.exports = {
    appContainerId: '#appContainer',
    appModuleContainerId: '#appModuleContainer',
    applications: [
        {
            title: 'Byte Converter',
            desc: 'Convert Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes',
            route: require( './modules/byteConverter/index' ),
            footerButtons: []
        }
    ]
};
