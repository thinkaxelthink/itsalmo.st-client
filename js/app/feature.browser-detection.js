(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(Browser Detection)',
				enabled:true
			});

	page.features.push(function(app){
			
		if (navigator.userAgent.match(/iPad/i) != null) {
			$('body').addClass('broswer-ipad');
		}
			
	});
	
})(this);