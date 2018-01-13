/** ****************************************************************************************************
 * File: isMobileDevice.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 01-Nov-2017
 *******************************************************************************************************/
'use strict';
// @formatter: off

export default function() {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test( navigator.userAgent.toLowerCase() );
}