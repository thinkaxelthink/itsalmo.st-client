(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(Hashchange)',
				enabled:true
			});

	page.features.push(function(app){
			
		app.events.bind('hashchange.hashChanged',function(e,d){
			console.log(d);
		});
		
	});
	
})(window);