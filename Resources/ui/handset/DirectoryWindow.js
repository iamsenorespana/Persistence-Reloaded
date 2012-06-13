
function DirectoryWindow(){
	var self = Ti.UI.createWindow({
		title: 'Directory',
		id: 'appWindow'
	});


		
		var directoryLabel = Ti.UI.createLabel({
			text: 'Browsing contents of App Data Directory',
			top: 0,
			height: 30,
			font: {
				fontSize: 14,
				fontWeight: 'bold'
			},
			textAlign: 'center'
		});
		
		self.add( directoryLabel );
		
			var refreshBtn = Ti.UI.createButton({
				title: 'Refresh'
			});
				refreshBtn.addEventListener('click', function(e){
					alert('Feature to Refresh Directory Listing');
				});
				
		self.setRightNavButton( refreshBtn );
		
		var directoryTable = Ti.UI.createTableView({
			top: 30,
			data: [{title: 'Loading directory contents'}] 
		});
		
		self.add( directoryTable );
		
				var dir = Titanium.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory); //   + '/db/' getApplicationDataDirectory;  , 'test.json'   //Ti.Filesystem.getFile( Ti.Filesystem.applicationDataDirectory+'/database');
				Ti.API.debug( dir.getDirectoryListing() );
				
				// var supportDir = Titanium.Filesystem.getFile(Ti.Filesystem.applicationSupportDirectory,'/analytics' );
				// Ti.API.debug( supportDir.getDirectoryListing() );
		
		// create blalnk array
		var fileData = [];
		
			var fileList = dir.getDirectoryListing();
			
			for( var i=0;i<fileList.length;i++){
				
				var row = Ti.UI.createTableViewRow({});
				
				row.fileList = fileList[i];
				row.hasChild = true;
				row.add(
					Ti.UI.createLabel({
						text: fileList[i],
						//backgroundColor: 'red',
						height: 'auto',
						left: 20,
						top: 5,
						bottom: 10,
						width: 250,
						font:  {
							fontSize: 16
						},
						color: '#000'
					})
				);
				fileData.push(
					row
				);
				
			};
			
			var fileListingsTable = Ti.UI.createTableView({
				data: fileData,
				top: 10,
				height: 280 //'100%'
			});	
		
		self.add(fileListingsTable);
		
			fileListingsTable.addEventListener('click', function(e) {
				
				var _nextWindow = Ti.UI.createWindow({
					title: 'File Contents',	
					backButtonTitle: 'Directory',		
					id: "appWindow"
					 
				});
				
					_nextWindow.add(
						Ti.UI.createLabel({
							text: e.row.fileList,
							top: 5,
							height: 20,
							
							textAlign: 'center',
							color: '#000',
							font: {
								fontSize: 14,
								fontWeight: 'bold'
							}
						})
					);
					
					// var btn = Ti.UI.createButton({
						// title: 'close',
						// style: Ti.UI.iPhone.SystemButtonStyle.DONE,
// 						
					// }); //UI
					// btn.addEventListener('click', function(){
						// _self.close();
					// });
					// _self.setRightNavButton(btn);
					
					//alert('filename: ' + e.row.fileList );
					var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, e.row.fileList );//+ '/analytics/
					//alert(f.read());
					
		 			var scrollView = Ti.UI.createScrollView({
		 				top: 30,
		 				width: 300,
		 				showVerticalScrollIndicator: true,
		 				height: 400,
		 				//backgroundColor: 'red',
		 				contentHeight: 600
		 			});
		 			
		 			
					var fileContents = Ti.UI.createLabel({
						top: 30,
						//backgroundColor: 'red',
						font: {
							fontSize: 12
						},
						text: f.read().text,
						height: '90%',
						width: '95%',
						color: '#000'
					});
					
					scrollView.add(fileContents);
					
				_nextWindow.add( scrollView );	
				App.mainTabGroup.activeTab.open( _nextWindow,  {animated: true});
				 
				
				
				
			});
			
		
	
	return self;
};

module.exports = DirectoryWindow;