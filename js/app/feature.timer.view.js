(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(Timer.View)',
				enabled:true
			});
	
	
	// fix for IE Date.now as per:
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date/now
	if (!Date.now) {
		Date.now = function now() {
			return +new Date();
		};
	}
	
	page.features.push(function(app){
		
		var timer, favicon, dom, timeout, elements;
		
		favicon = new NI.Favicon({});
		
		dom = $('.pane.timer-pane');
		
		elements = {
			qualifier:dom.find('.description span.qualifier'),
			qualified:dom.find('.description span.qualified'),
			timer:dom.find('.timer'),
			milliseconds:dom.find('.timer .milliseconds'),
			seconds:dom.find('.timer .seconds'),
			minutes:dom.find('.timer .minutes'),
			hours:dom.find('.timer .hours'),
			days:dom.find('.timer .days')
		};
		
		function cycle(){
			if(render.display()){
				timeout = setTimeout(cycle,25);
			}
		};
		
		var render = {
			loading:function(){
				
			},
			start:function(){
				favicon.setFavicon("./img/favicon/favicon-still.png");
				elements.qualifier.text('It\'s almost');
				elements.timer.show();
				elements.minutes.parent().show();
				elements.hours.parent().show();
				elements.days.parent().show();
			},
			display:function(){
				var diff, time_exploded;
				if(!timer){ return false; }
				
				diff = timer.expires - Date.now();
				
				if(diff <= 0){
					render.expired();
					return false;
				}
				
				time_exploded = {
					milliseconds:Math.floor((diff)%1000),
					seconds:Math.floor((diff/1000)%60),
					minutes:Math.floor((diff/1000/60)%60),
					hours:Math.floor((diff/1000/60/60)%24),
					days:Math.floor(diff/1000/60/60/24)
				};
				
				if(timer.name != elements.qualified.text()){
					elements.qualified.text(timer.name);
				}
				
				elements.milliseconds.text(time_exploded.milliseconds);
				elements.seconds.text(time_exploded.seconds);
				
				if(!time_exploded.minutes){
					elements.minutes.parent().hide();
				} else {
					elements.minutes.text(time_exploded.minutes);
				}
				
				if(!time_exploded.hours){
					elements.hours.parent().hide();
				} else {
					elements.hours.text(time_exploded.hours);
				}
				
				if(!time_exploded.days){
					elements.days.parent().hide();
				} else {
					elements.days.text(time_exploded.days);
				}
				
				return true;
			},
			expired:function(){
				favicon.setFavicon("./img/favicon/favicon-ani.gif");
				elements.qualifier.text('It\'s');
				document.title = 'It\'s ' + timer.name;
				elements.timer.hide();
			}
		}
		
		app.events.bind('timer.manager.timerLoaded',function(e,d){
			timer = d;
			if(timeout){ clearTimeout(timeout); }
			if(dom.filter(':visible').length){
				document.title = 'It\'s Almost ' + timer.name;
			}
			render.start();
			cycle();
		});
		
		app.events.bind('timer.manager.noTimerLoaded',function(e,d){
			if(timeout){
				clearTimeout(timeout);
			}
		});
		
		app.events.bind('hashchange.hashChanged',function(e,d){
			if(!d.hash.length){
				vertCenter(tc.jQ('.timer-pane'));
				dom.stop().animate({
					opacity:0.0
				},500,function(){
					render.start();
					$(this).hide();
				});
			} else {
				render.start();
				vertCenter(tc.jQ('.timer-pane'));
				dom.stop().css('opacity',0.0).show().animate({
					opacity:1.0
				},500,function(){
				});
				
			}
		});
		
		//cycle();
		
		// Vertical centering
		function vertCenter(ele) {
			var winHeight = tc.jQ(window).height() - tc.jQ('.footer').height();
			var eleHeight = ele.height();
			ele.css('top', Math.ceil((winHeight - eleHeight) * 0.4));
		}
		
		tc.jQ(window).resize(function() {
			vertCenter(tc.jQ('.start-pane'));
			vertCenter(tc.jQ('.timer-pane'));
			vertCenter(tc.jQ('.modal-container'));
		});
	
		vertCenter(tc.jQ('.pane'));
		
	});
	
})(this);