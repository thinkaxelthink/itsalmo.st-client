(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(Hashchange)',
				enabled:true
			});

	page.features.push(function(app){
		var $w;
		
		$w = $(window);
		$w.hashchange(function(){
			app.events.trigger('hashchange.hashChanged',{
				hash:window.location.hash.substring(1,window.location.hash.length).toLowerCase()
			});
		});
		
		app.events.bind('app.featuresInitialized',function(e,d){
			$w.trigger('hashchange');
		});
		
	});
	
})(this);