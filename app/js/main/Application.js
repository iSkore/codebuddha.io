/** ****************************************************************************************************
 * File: Application.js
 * Project: codebuddha.io
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 02-Mar-2018
 *******************************************************************************************************/
'use strict';

export default class Application
{
	// TODO::: import javascript files into memory and build class based on JSON or raw javascript
	// TODO: pull apps from database
	constructor( opts )
	{
		this.opts        = opts;
		this.title       = opts.title;
		this.description = opts.description;
		this.html        = opts.html;
		this.js          = opts.js;
		this.css         = opts.css;
	}
	
	onApplicationPreload()
	{
	
	}
	
	onApplicationDidAppear()
	{
	
	}
	
	onApplicationDidLoad()
	{
	
	}
	
	onApplicationIsReady()
	{
	
	}
	
	onApplicationDidUnload()
	{
	
	}
	
	onApplicationDidDisappear()
	{
	
	}
}
