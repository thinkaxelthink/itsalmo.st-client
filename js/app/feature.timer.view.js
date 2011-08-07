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
			render.display();
			timeout = setTimeout(cycle,25);
		};
		
		var render = {
			loading:function(){
				$('.description span').text('loading');
			},
			display:function(){
				if(!timer){ return false; }
				var diff;
				diff = timer.expires - Date.now();
				if(timer.name != $('.description span').text()){
					$('.description span').text(timer.name);
				}
				$('.timer .milliseconds').text(Math.floor((diff%1000)));
				$('.timer .seconds').text(Math.floor((diff/1000)%60));
				$('.timer .minutes').text(Math.floor((diff/1000/60)%60));
				$('.timer .hours').text(Math.floor((diff/1000/60/60)%24));
				$('.timer .days').text(Math.floor(diff/1000/60/60/24));
			}
		}
		
		app.events.bind('timer.manager.timerLoaded',function(e,d){
			timer = d;
			if(timeout){
				clearTimeout(timeout);
			}
			document.title = 'It\'s Almost ' + timer.name; 
			cycle();
		});
		
		app.events.bind('timer.manager.noTimerLoaded',function(e,d){
			if(timeout){
				clearTimeout(timeout);
			}
		});
		
		app.events.bind('hashchange.hashChanged',function(e,d){
			if(!d.hash.length){
				dom.hide();
			} else {
				dom.show();
				render.loading();
			}
		});
		
		cycle();
		
	});
	
})(this);