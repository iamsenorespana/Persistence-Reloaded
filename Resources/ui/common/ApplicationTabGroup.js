
function ApplicationTabGroup(){
	
	// create tab group
	var tabGroup = Titanium.UI.createTabGroup();

	
	var PropertiesWindow = require('ui/handset/PropertiesWindow'),
		FilesystemWindow = require('ui/handset/FilesystemWindow'),
		DatabaseWindow = require('ui/handset/DatabaseWindow'),
		DirectoryWindow = require('ui/handset/DirectoryWindow');
	
	
	var win1 = new PropertiesWindow(),
		win2 = new FilesystemWindow(),
		win3 = new DatabaseWindow(),
		win4 = new DirectoryWindow();


	// Create Individual Tabs
		var tab1 = Titanium.UI.createTab({
		  title:'Properties',
		  window:win1
		});

		var tab2 = Titanium.UI.createTab({  
		    title:'Filesystem',
		    window:win2
		});
		
		
		var tab3 = Titanium.UI.createTab({  
		    title:'Database',
		    window:win3
		});
		
		
		var tab4 = Titanium.UI.createTab({  
		    title:'Directory',
		    window:win4
		});
		//
		//  add tabs
		//
		tabGroup.addTab(tab1);  
		tabGroup.addTab(tab2);  
		tabGroup.addTab(tab3);
		tabGroup.addTab(tab4);
		
	return tabGroup;
	
};

module.exports = ApplicationTabGroup;
