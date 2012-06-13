// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var App = {
	os: Ti.Platform.osname,
	udid: Ti.Platform.id,
	mainWin: null,
	mainNav: null,
	server: null,
	mainTabGroup: null
};

(function(){
	
	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup'); //')
	App.mainTabGroup = new ApplicationTabGroup();
	
	App.mainTabGroup.open();
	
})();

/************************************
 * App Level Event Listeners 
 */


Ti.App.addEventListener('resumed', function(){
	
	
});