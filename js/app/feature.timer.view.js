(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(Timer.View)',
				enabled:true
			});
			
	page.features.push(function(app){
		
		var timer;
		
		function cycle(){
			update_display();
			setTimeout(cycle,1000);
		};
		
		function update_display(){
			if(!timer){ return false; }
			var diff;
			diff = timer.expires.getTime() - Date.now();
			$('.description span').text(timer.title);
			$('.description').show();
			$('.timer').text(diff);
		};
		
		app.events.bind('timer.manager.timerLoaded',function(e,d){
			timer = d;
		});
		
		app.events.bind('timer.manager.noTimerLoaded',function(e,d){
			
		});
		
		cycle();
		
	});
	
})(this);