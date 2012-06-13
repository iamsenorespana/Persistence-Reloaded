
function PropertiesWindow(){
	var self = Ti.UI.createWindow({
		title: 'Properties',
		layout: 'vertical',
		id: 'appWindow'
	});

		var foo = Titanium.App.Properties.getString("foo");
		
		var tf1 = Titanium.UI.createTextField({
			value:foo,
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
		  Titanium.App.Properties.setString("foo",e.value);
		});
		
		self.add(tf1);	
	
	return self;
};

module.exports = PropertiesWindow;