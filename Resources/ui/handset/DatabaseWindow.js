
function DatabaseWindow(){
	var self = Ti.UI.createWindow({
		title: 'Database',
		id: "appWindow"
	});
	
		var currentNote = '';
		var db = Titanium.Database.open('todos');
		db.execute('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, todo TEXT)');
		
		//create data entry view
		var entryView = Ti.UI.createView({
		  backgroundColor:'#0060AA',
		  width:'100%',
		  height:50,
		  top:0
		});
		
		var controlsView = Ti.UI.createView({
		  width:270,
		  height:'auto'
		});
		
		var b1 = Titanium.UI.createButton({
			title:'Save',
			width:60,
			height:35,
			right:0,
			enabled:false
		});
		controlsView.add(b1);
		
		var tf1 = Titanium.UI.createTextField({
			width:200,
			height:35,
			left:0,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			autocorrect:false,
			hintText:'Enter a note...'
		});
		tf1.addEventListener('return', function() {
			tf1.blur();
		});
		tf1.addEventListener("change", function(e) {
		  currentNote = e.value;
		  if (currentNote == '') {
		    b1.enabled = false;
		  }
		  else {
		    b1.enabled = true;
		  }
		});
		controlsView.add(tf1);
		
		entryView.add(controlsView);
		self.add(entryView);
		
		//This is the array we'll use to back the table view
		var data = [];
		
		//Get data for tableview
		var rows = db.execute('SELECT * FROM todos');
		while (rows.isValidRow()) {
		  data.push({
		    title: rows.fieldByName('todo'),
		    id: rows.fieldByName('id')
		  });
			rows.next();
		}
		rows.close();
		
		// create table view
		var tableview = Titanium.UI.createTableView({
			data:data,
			editable:true,
			top:50
		});
		
		// create table view event listener
		tableview.addEventListener('click', function(e) {
			Titanium.UI.createAlertDialog({
			  title:'DB Test', 
			  message:'Now would be a perfect time to update the record at index ' + e.rowData.id 
			}).show();
		});
		
		// add delete event listener
		tableview.addEventListener('delete',function(e) {
		  db.execute("DELETE FROM todos WHERE id = ?", e.rowData.id);
		});
		
		// add table view to the window
		self.add(tableview);
		
		//Add event listener for save button
		b1.addEventListener("click", function(e) {
		  if (b1.enabled) {
		    db.execute('INSERT INTO todos (todo) VALUES(?)',currentNote);
		    var last = db.execute("SELECT * FROM todos ORDER BY id DESC LIMIT 1");
		    tableview.appendRow({
		      title:last.fieldByName('todo'),
		      id:last.fieldByName('id')
		    });
		    last.close();
		    currentNote = '';
		    tf1.value = '';
		    tf1.blur();
		    b1.enabled = false;
		  }
		});
		
		//
		//  create edit/cancel buttons for nav bar
		//
		if ( Ti.Platform.osname === 'iphone' ){
			var edit = Titanium.UI.createButton({
				title:'Edit'
			});
			var cancel = Titanium.UI.createButton({
				title:'Cancel',
				style:Titanium.UI.iPhone.SystemButtonStyle.DONE
			});
			
			edit.addEventListener('click', function() {
				self.setRightNavButton(cancel);
				tableview.editing = true;
			});
			cancel.addEventListener('click', function() {
				self.setRightNavButton(edit);
				tableview.editing = false;
			});
			
			self.setRightNavButton(edit);
			
			// Add the Email Database Button
			
				var emailButton = Ti.UI.createButton({
					title: 'Email DB'
				});
					emailButton.addEventListener('click', function(e){
						createDBEmail();
					});
			
			self.setLeftNavButton( emailButton );
			
			
		}
	
	return self;
};

module.exports = DatabaseWindow;


var createDBEmail = function(){
	
		function privateDocumentsDirectory(){
	
			Ti.API.info('We need to open a file object to get our directory info');
			var testFile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory);
			Ti.API.info('Now we remove the Documents folder reference');
			var privateDir = testFile.nativePath.replace('Documents/','');	
			Ti.API.info('This is our base App Directory =' + privateDir);
			Ti.API.info('Now we add the Private Documents Directory');
			privateDir+='Library/Private%20Documents/';
			Ti.API.info('Our new path is ' + privateDir);
			return privateDir;		
		};
		
		var myDbName = 'todos';
		Ti.API.info('We create a db to test our method')	
		var testDb = Ti.Database.open(myDbName);
		var testNativePath = testDb.getFile().nativePath;
		Ti.API.info('Our nativePath to test against is ' + testNativePath + ' this is what we need to end up with');
		var privateDocFolder = privateDocumentsDirectory();
		Ti.API.info('Our Private Document Folder is ' + privateDocFolder);
		Ti.API.info("Let's see if we can find our database");
		var dbCheck =  Ti.Filesystem.getFile(privateDocFolder, myDbName+ '.sql');
		Ti.API.info('Did we find it? ' + dbCheck.exists());
		Ti.API.info('Do our file paths match? ' + (dbCheck.nativePath==testNativePath));
		Ti.API.info('Example Finished');
	
	
		// if ( Ti.App.Properties.hasProperties("foo") ){
			// Ti.App.Properties.removeProperty("foo");
		// }
		
	 	var emailDialog = Titanium.UI.createEmailDialog();
			   if (!emailDialog.isSupported()) {
				   	Ti.UI.createAlertDialog({
				   		title:'Error',
				   		message:'Email not available'
				   	}).show();
				   	return;
			   }
			   emailDialog.setSubject('SQLITE DB');
			  // emailDialog.setToRecipients(['jamilhassanspain@gmail.com']);
		
				 
				 // attach a blob
				emailDialog.addAttachment(dbCheck);
				emailDialog.open();
				
}; 





