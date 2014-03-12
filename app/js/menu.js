function _getMethod ( methodString ) {
	var chain = methodString.split('.'),
		prevContext,
		context = this;

	chain.forEach(function( method ){
		if ( context[ method ] ) {
			prevContext = context;
			context = context[ method ];
		}
	});

	if ( typeof context === 'function' ) {
		return context.bind( prevContext );
	} 

	return function(){};
}

function _eachMenuItem ( key, subItems ) {
	var getMethod = _getMethod.bind( this ),
		menuItem = new this.gui.MenuItem({ label: key });
		submenu = new this.gui.Menu();

	subItems.forEach(function( subItem ){
		subItem = subItem.split(' ');

		var method = subItem.pop(),
			label = subItem.join(' ');

		submenu.append(
			new this.gui.MenuItem({ 
				label: label,
				click : getMethod( method )
			})
		);
	}.bind( this ));
	menuItem.submenu = submenu;
	return menuItem;
}

function setup ( ) {
	
	// spec should be a data object that build out
	// the file menu. 

	var gui = this.gui,
		config = require('../config/menu.json'), 
		eachMenuItem = _eachMenuItem.bind( this ),
		menu = new gui.Menu({ type: 'menubar' });

	gui.Window.get().menu = menu;

	for( var key in config ) {
		menu.append(eachMenuItem( key, config[key] ));
	}
}

module.exports = setup;