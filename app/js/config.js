/** ****************************************************************************************************
 * File: config.js
 * Project: codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 24-Jan-2018
 *******************************************************************************************************/
'use strict';

module.exports = {
    appContainerId: '#appContainer',
    appModuleTitleId: '#appModuleTitle',
    appModuleId: '#appModule',
    appModuleFooterId: '#appModuleFooter',
    appModuleContainerId: '#appModuleContainer',
    defaultCloseButton: '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>',
    applications: [
        {
            title: 'Byte Converter',
            desc: 'Convert Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes',
            js: require( './modules/byteConverter/index' ),
            html: require( './modules/byteConverter/module.html' ),
            footerItems: []
        }
    ]
};
