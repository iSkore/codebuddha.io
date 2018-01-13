/** ****************************************************************************************************
 * File: isAuthenticated.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 20-Oct-2017
 *******************************************************************************************************/
'use strict';

export default function() {
    const M = window.M;
    return M.UPC.cognitoUser || false;
}