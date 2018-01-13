/** ****************************************************************************************************
 * File: Path.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 09-Nov-2017
 *******************************************************************************************************/
'use strict';
// @formatter:off

export default class Path extends String
{
    constructor( ...path )
    {
        const delimiter = '/';
        path            = path.join( delimiter );

        super( path );

        this.originalPath = path;
        this.path         = path.split( delimiter );

        this.delimiter = delimiter;
        this.rfolder   = new RegExp( /\/$/ );
        this.folder    = this.isFolder( this.originalPath );

        if( this.folder )
            this.path = this.path.filter( i => !!i );
    }

    isFolder( path )
    {
        path = Array.isArray( path ) ? `${path.join( this.delimiter )}/` : this.originalPath;
        return this.rfolder.test( path );
    }

    static isFolder( path )
    {
        return new RegExp( /\/$/ ).test( path );
    }

    toString()
    {
        return `${this.path.join( this.delimiter )}${this.folder ? this.delimiter : ''}`;
    }

    static toString( path, delimiter = '/' )
    {
        return Array.isArray( path ) ? path.join( delimiter ) : path.toString();
    }

    static get [Symbol.species]()
    {
        return String;
    }

    * iterator()
    {
        for( const arg of this.path )
            yield arg;
    }

    [Symbol.iterator]()
    {
        return this.iterator();
    }

    [Symbol.toStringTag]()
    {
        return this.constructor.name;
    }

    [Symbol.toPrimitive]( hint )
    {
        console.log( hint );
        if( hint === 'string' || hint === 'default' ) {
            return this.toString();
        } else if( hint === 'number' ) {
            return this.path.length;
        } else {
            throw 'Argument Error - Path must be typeof "string"';
        }
    }
}