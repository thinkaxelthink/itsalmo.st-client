(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(BrowserDetection)',
				enabled:true
			});
			
	page.features.push(function(app){
		
		app.google_analytics = new NI.GoogleAnalytics({
			account:app.page.env.ga_account
		});
		
		if(!app.google_analytics.tracker){
			return;
		}
		
		app.events.bind('hashchange.hashChanged',function(e,d){
			console.log(d);
			if(!d.hash.length){
				app.google_analytics.tracker._trackEvent('page', 'home');
			} else {
				app.google_analytics.tracker._trackEvent('page', 'timer', d.hash);
			}
		});
		
	});
	
})(this);