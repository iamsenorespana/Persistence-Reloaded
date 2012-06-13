
function FilesystemWindow(){
	var self = Ti.UI.createWindow({
		title: 'Filesystem',
		layout: 'vertical',
		id: "appWindow"
	});

		var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'test.json');
		// PLEASE NOTE - resourcesDirectory is read-only on the device - use applicationDataDirectory for writes
		Ti.API.debug(f.exists());  
		if( !f.exists() ){
			// Data file does not exists in App Dir, use Resources Dir
			var f = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, 'test.json');
		}  
		 
		var resources = JSON.parse(f.read().text);
		
		var tf1 = Titanium.UI.createTextField({
			value:resources.en_us.hello,
			width:250,
			height:40,
			top:10,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			autocorrect:false
		});
		tf1.addEventListener('return', function() {
			tf1.blur();
		});
		tf1.addEventListener('change', function(e) {
		  resources.en_us.hello = e.value;
		});
		self.add(tf1);
		
		var tf2 = Titanium.UI.createTextField({
			value:resources.en_us.goodbye,
			width:250,
			height:40,
			top:10,
			borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
			autocorrect:false
		});
		tf2.addEventListener('return', function() {
			tf2.blur();
		});
		tf2.addEventListener('change', function(e) {
		  resources.en_us.goodbye = e.value;
		});
		self.add(tf2);
		
		var b1 = Titanium.UI.createButton({
			title:'Save Resources',
			width:200,
			height:40,
			top:10
		});
		b1.addEventListener("click", function(e) {
			
		  // WARNING - resourcesDirectory is not writeable on the device - use applicationDataDirectory instead
		var saveLocation = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'test.json');
		saveLocation.write(JSON.stringify(resources));
		 
		
		});
		self.add(b1);
	
	
	return self;
};

module.exports = FilesystemWindow;