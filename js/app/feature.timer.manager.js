(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(Timer.Manager)',
				enabled:true
			});

	page.features.push(function(app){
		
		$.ajaxSetup({
			cache: false,
			dataType: 'json'
		});
		
		function lookup_timer(id){
			if(!id){ return false; }
			switch(id){
				case 'goinghome':
					return {
						title:'Going Home',
						expires:new Date(2011, 08, 05, 20, 0, 0, 0)
					}
					break;
				case 'beertime':
					return {
						title:'Beer Time',
						expires:new Date(2011, 08, 05, 18, 0, 0, 0)
					}
					break;
			}
			return false;
		}
		
		function get_timer(id){
			$.ajax({
				url:'/timer/'+id,
				method:'POST',
				data:timer,
				success:function(data, textStatus, jqXHR){
				
				},
				error:function(jqXHR, textStatus, errorThrown){
					
				}
			});
		};
		
		function create_timer(timer){
			$.ajax({
				url:'/timer/',
				method:'POST',
				data:timer,
				success:function(data, textStatus, jqXHR){
					
				},
				error:function(jqXHR, textStatus, errorThrown){
					
				}
			});
		};
		
		app.events.bind('hashchange.hashChanged',function(e,d){
			var timer;
			if(timer = lookup_timer(d.hash)){
				app.events.trigger('timer.manager.timerLoaded',timer);
				return;
			}
			app.events.trigger('timer.manager.noTimerLoaded',{});
		});
		
	});
	
})(this);