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
			
			diff = new Date(timer.expires - new Date(Date.now()));
			
			$('.description span').text(timer.title);
			$('.description').show();
			$('.timer').text(''+
				diff.getMinutes() + ' Minutes ' +
				diff.getSeconds() + ' Seconds');
		};
		
		app.events.bind('timer.manager.timerLoaded',function(e,d){
			timer = d;
		});
		
		cycle();
		
	});
	
})(window);