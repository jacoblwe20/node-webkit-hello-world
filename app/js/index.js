'use strict';

var app = {};

// basic ui stuff and attaching window
app._window = this;
app.gui = require('nw.gui');
app.request = require('request');
app.menu = (require('./js/menu')).bind( app );
app.login = function ( ){ 
	alert('Logging In...');
}

app.menu( app.gui );