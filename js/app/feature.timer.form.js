(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(Timer.Create)',
				enabled:true
			});
			
	page.features.push(function(app){
		
		var dom, elements, lookup_timer, newTimerId, tempTimerId, oldTempTimerId;
		
		dom = $('.pane.start-pane');
		
		elements = {
			name:dom.find('#countdown-name'),
			url:dom.find('p.url'),
			url_id:dom.find('.url_id'),
			url_id_loader:dom.find('.url_id_loader'),
			date:dom.find('#countdown-date'),
			time:{
				hour:dom.find('#countdown-hour'),
				minute:dom.find('#countdown-minutes'),
				period:dom.find('#countdown-timeperiod')
			},
			start_btn:dom.find('#start-btn')
		};
		
		function clear_form(){
			var future;
			future = new Date();
			future.setMinutes(future.getMinutes()+30);
			elements.url.css({
				opacity:0.0
			});
			elements.name.get(0).value = '';
			elements.date.get(0).value = (future.getMonth()+1)+'/'+future.getDate()+'/'+future.getFullYear();
			elements.time.hour.get(0).value = ((future.getHours() > 12) ? future.getHours() - 12 : future.getHours());
			elements.time.minute.get(0).value = future.getMinutes();
			elements.time.period.get(0).value = ((future.getHours() > 12) ? 'PM' : 'AM');
		}
		
		function generate_id(name,append_random){
			tempTimerId = $.trim(name.replace(/ /g,''));
			if(tempTimerId == oldTempTimerId && !append_random){
				return;
			}
			oldTempTimerId = tempTimerId;
			if(!tempTimerId.length){
				return;
			}
			if(append_random){
				tempTimerId = newTimerId + '_' + (function(){
					var out = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", i;
					for( i=0; i < 5; i++ ) out += possible.charAt(Math.floor(Math.random() * possible.length));
					return out;
				})();
			}
			if(lookup_timer){
				clearTimeout(lookup_timer);
			}
			elements.url.stop().animate({
				opacity:1.0
			},300);
			newTimerId = tempTimerId;
			elements.url_id.text(newTimerId);
			elements.start_btn.addClass('disabled');
			if(newTimerId.length){
				elements.url_id_loader.show();
				lookup_timer = setTimeout(function(){
					app.events.trigger('form.newTimerIdGenerated',{
						newTimerId:newTimerId
					});
				},500);
			}
		};
		
		function validate_and_submit(){
			
			if(!elements.name.val().length){
				return false;
			}
			
			date = elements.date.val().split('/');
			if(date.length != 3){
				console.log('date incorrect');
				return false;
			}
			
			date = new Date(
				((date[2].length == 4) ? date[2] : '20'+date[2]),
				(date[0] - 1),
				date[1],
				((elements.time.period.val().toLowerCase() == 'pm') ? ((elements.time.hour.val()*1.0) + 12) : elements.time.hour.val()),
				elements.time.minute.val()
			);
			
			if(date.getTime() < (new Date())){
				console.log('before now');
				return false;
			}
			
			app.events.trigger('form.timerGenerated',{
				newTimerId:newTimerId,
				timer:{
					name:elements.name.val(),
					expires:date
				}
			});
			
			return true;
			
		};
		
		
		elements.name.bind('change keyup',function(e,d){
			generate_id(elements.name.val());
		});
		
		elements.start_btn.bind('click',function(e,d){
			if(!validate_and_submit()){}
		}).addClass('disabled');
		
		app.events.bind('timer.manager.timerLoaded',function(e,d){
			if(newTimerId){
				generate_id(newTimerId,true);
			}
			elements.url_id_loader.hide();
		});
		
		app.events.bind('timer.manager.timerCreated',function(e,d){
			newTimerId = null;
		});
		
		app.events.bind('timer.manager.noTimerLoaded',function(e,d){
			elements.start_btn.removeClass('disabled');
			elements.url_id_loader.hide();
		});
		
		app.events.bind('hashchange.hashChanged',function(e,d){
			if(!d.hash.length){
				clear_form();
				dom.show();
			} else {
				newTimerId = null;
				dom.hide();
			}
		});
	});
	
})(this);