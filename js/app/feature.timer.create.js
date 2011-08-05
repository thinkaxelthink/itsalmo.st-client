(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(Timer.Create)',
				enabled:true
			});
			
	page.features.push(function(app){
		
		var dom;
		
		dom = $('.pane.start-pane');
		
		app.events.bind('timer.manager.timerLoaded',function(e,d){
			dom.hide();
		});
		
		app.events.bind('timer.manager.noTimerLoaded',function(e,d){
			dom.show();
		});
		
	});
	
})(this);