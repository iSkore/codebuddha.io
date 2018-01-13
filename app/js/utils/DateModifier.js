/** ****************************************************************************************************
 * File: DateModifier.js
 * Project: files.codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 02-Nov-2017
 *******************************************************************************************************/
'use strict';
// @formatter: off

import isMobile from './isMobileDevice';
import pad2 from '../utils/pad2';

export default class DateModifier
{
    constructor( date, tz )
    {
        if( date instanceof Date )
            this.Date = date;
        else
            this.Date = new Date();

        this.timezoneOffset = 3600000 * ( tz || 0 );

        this.date = {
            month: pad2( this.Date.getMonth() + 1 ),
            day: pad2( this.Date.getDate() ),
            year: this.Date.getFullYear()
        };

        this.aux = {
            monthName: DateModifier.Months[ this.Date.getMonth() ],
            dayName: DateModifier.Days[ this.Date.getDay() ]
        };

        this.time = {
            hours: pad2( this.Date.getHours() ),
            minutes: pad2( this.Date.getMinutes() ),
            seconds: pad2( this.Date.getSeconds() ),
            milliseconds: this.Date.getMilliseconds()
        };
    }

    getNow()
    {
        return this.Date.now();
    }
    
    getReadableDate()
    {
        let date = `${this.date.month}/${this.date.day}/`;

        if( isMobile() )
            date += ( '' + this.Date.getFullYear() ).replace( /(^20|^19)/, '' );
        else
            date += this.Date.getFullYear();

        return date;
    }

    getTime()
    {
        return `${this.time.hours}:${this.time.minutes}:${this.time.seconds}`;
    }
}

DateModifier.Days   = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
DateModifier.Months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];