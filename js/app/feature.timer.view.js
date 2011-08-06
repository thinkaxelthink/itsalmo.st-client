(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(Timer.View)',
				enabled:true
			});
			
	page.features.push(function(app){
		
		var timer, dom, timeout;
		
		dom = $('.pane.timer-pane');
		
		function cycle(){
			update_display();
			timeout = setTimeout(cycle,1000);
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
			dom.show();
			timer = d;
		});
		
		app.events.bind('timer.manager.noTimerLoaded',function(e,d){
			dom.hide();
			if(timeout){
				clearTimeout(timeout);
			}
		});
		
		cycle();
		
	});
	
})(this);