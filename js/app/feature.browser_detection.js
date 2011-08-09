(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(BrowserDetection)',
				enabled:true
			});
			
	page.features.push(function(app){
		
		app.browserDetection = new NI.BrowserDetection({});
		
	});
	
})(this);