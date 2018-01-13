/** ****************************************************************************************************
 * File: progressBar.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 24-Oct-2017
 *******************************************************************************************************/
'use strict';
// @formatter: off

export default {
    progressBar: null,
    setup: function() {
        this.progressBar = $( '.progress-bar' );
    },
    progress: function( p ) {
        this.progressBar.css( { width: `${p}%` } );
    },
    calculateProgress: function() {
        let
            completed     = Object.keys( this.itemProgress ).reduce(
                ( r, item ) => {
                    item = this.itemProgress[ item ];
                    r.loaded += item.loaded;
                    r.total += item.total;
                    return r;
                }, {
                    loaded: 0,
                    total: 0
                }
            ),
            totalProgress = ( completed.loaded / completed.total ) * 100;

        this.progress( totalProgress );

        if( totalProgress >= 100 )
            this.delayClear( 200 );
    },
    delayClear: function( t ) {
        setTimeout( () => this.clearProgress(), t );
    },
    acknowledgeProgress: function( self, e ) {
        if( self.itemProgress[ e.key ] )
            self.itemProgress[ e.key ].loaded = e.loaded;
        else
            return this.delayClear( 2000 );
        self.calculateProgress();
    },
    itemProgress: {},
    clearProgress: function() {
        this.progress( 0 );
        this.itemProgress = {};
    },
    beginProgress: function( items, download = false ) {
        const self = this;

        this.progress( 1 );
        const red = items.reduce(
            ( r, item ) => {
                this.itemProgress[ item.key ] = {
                    loaded: 0,
                    total: item.size
                };

                r.push(
                    item.file( e => {
                        e.key = item.key;
                        return this.acknowledgeProgress( self, e );
                    } )
                        .then( t => download ? ( item.data = t.data, item ) : t )
                );

                return r;
            }, []
        );

        return Promise.all( red );
    }
};