
Ti.include('ui/controllers/ui.js');


switch(App.os){
	case 'iphone':
		// Include iPhone Controller
		Ti.include('ui/controllers/ui-iphone.js');
		
		//App.mainWin = App.ui.createAppTabGroup();
		//App.mainWin = App.ui.createCustomNavGroup();
		//App.mainWin.open();
		
		
	break;
	case 'ipad':
		// Include iPad Controller
		Ti.include('ui/controllers/ui-ipad.js');
		
	break;
	case 'android':
		// Include Android Controller
		Ti.include('ui/controllers/ui-android.js');

			switch(App.ui.density){
			case 'high':

						//Ti.include('controllers/ui-android-high.js');
						//Ti.include('controllers/ui-android-medium.js');
						//
						if ( App.ui.pWidth == 600 ) {
							Ti.include('ui/controllers/ui-android-high-galaxy.js');
							App.mainWin = App.ui.android.galaxy.createMainWindow();

						} else {
							Ti.include('ui/controllers/ui-android-high.js');

							App.mainWin = App.ui.android.high.createMainWindow();
						}

				break;		
				case 'medium':	

						if ( App.ui.pWidth > 600 ){
							// Show Motorola Zoom 
							Ti.include('ui/controllers/ui-android-medium-zoom.js');

							// create Zoom Display
							App.mainWin = App.ui.android.zoom.createMainWindow();
						} else {
							Ti.include('ui/controllers/ui-android-medium.js');

							// Create Medium Window
							App.mainWin = App.ui.android.medium.createMainWindow();	
						}	

				break;
				case 'low':
						Ti.include('ui/controllers/ui-android-low.js');

						//
						App.mainWin = App.ui.android.createErrorWindow();			

				break;
				}		
	break;
}



