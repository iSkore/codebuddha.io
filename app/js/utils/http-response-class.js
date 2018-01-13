/** ****************************************************************************************************
 * File: http-response-class.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 28-Oct-2017
 *******************************************************************************************************/
'use strict';
// @formatter: off

function Response( statusCode, data, origin ) {
    if( statusCode && ( typeof statusCode !== 'number' || statusCode !== +statusCode ) )
        throw 'Argument Error - [statusCode] must be typeof number.';
    else if( statusCode && !this.isHTTPCode( statusCode ) )
        throw 'Argument Error - [statusCode] must be valid HTTP code';

    Object.defineProperty( this, 'codes', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: {
            100: 'Continue',
            101: 'Switching Protocols',
            102: 'Processing',
            200: 'OK',
            201: 'Created',
            202: 'Accepted',
            203: 'Non-Authoritative Information',
            204: 'No Content',
            205: 'Reset Content',
            206: 'Partial Content',
            207: 'Multi-Status',
            208: 'Already Reported',
            226: 'IM Used',
            300: 'Multiple Choices',
            301: 'Moved Permanently',
            302: 'Found',
            303: 'See Other',
            304: 'Not Modified',
            305: 'Use Proxy',
            307: 'Temporary Redirect',
            308: 'Permanent Redirect',
            400: 'Bad Request',
            401: 'Unauthorized',
            402: 'Payment Required',
            403: 'Forbidden',
            404: 'Not Found',
            405: 'Method Not Allowed',
            406: 'Not Acceptable',
            407: 'Proxy Authentication Required',
            408: 'Request Timeout',
            409: 'Conflict',
            410: 'Gone',
            411: 'Length Required',
            412: 'Precondition Failed',
            413: 'Payload Too Large',
            414: 'URI Too Long',
            415: 'Unsupported Media Type',
            416: 'Range Not Satisfiable',
            417: 'Expectation Failed',
            418: 'I\'m a teapot',
            421: 'Misdirected Request',
            422: 'Unprocessable Entity',
            423: 'Locked',
            424: 'Failed Dependency',
            425: 'Unordered Collection',
            426: 'Upgrade Required',
            428: 'Precondition Required',
            429: 'Too Many Requests',
            431: 'Request Header Fields Too Large',
            451: 'Unavailable For Legal Reasons',
            500: 'Internal Server Error',
            501: 'Not Implemented',
            502: 'Bad Gateway',
            503: 'Service Unavailable',
            504: 'Gateway Timeout',
            505: 'HTTP Version Not Supported',
            506: 'Variant Also Negotiates',
            507: 'Insufficient Storage',
            508: 'Loop Detected',
            509: 'Bandwidth Limit Exceeded',
            510: 'Not Extended',
            511: 'Network Authentication Required'
        }
    } );

    this.statusCode = statusCode;
    this.data       = data;
    this.message    = this.codes[ statusCode ];

    if( origin )
        this.origin = origin;
}

Response.prototype.isSuccess = function( code ) {
    return /^(20[0-8]|226)$/.test( code || this.statusCode );
};

Response.prototype.isHTTPCode = function( code ) {
    return /^(10[0-2])|(20[0-8]|226)|(30[0-8])|(40[0-9]|41[0-8]|42[1-6,8,9]|431|451)|(50[0-9]|51[0,1])$/.test( code || this.statusCode );
};

module.exports = Response;