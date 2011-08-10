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
			document.title = 'It\'s Almost'; 
			future = new Date();
			future.setMinutes(future.getMinutes()+30);
			elements.url.css({
				opacity:0.0
			});
			elements.start_btn.addClass('disabled');
			elements.name.get(0).value = '';
			elements.date.get(0).value = (future.getMonth()+1)+'/'+future.getDate()+'/'+future.getFullYear();
			elements.time.hour.get(0).value = ((future.getHours() > 12) ? future.getHours() - 12 : future.getHours());
			elements.time.minute.get(0).value = future.getMinutes();
			elements.time.period.get(0).value = ((future.getHours() > 12) ? 'PM' : 'AM');
		}
		
		function generate_id(name,append_random){
			var i, invalidCharacters;
			tempTimerId = $.trim(name);
			for(i in invalidCharacters = [
				' ',
				'\\.', '\,',
				'\!',
				'\/', '\\\\',
				'@',
				'\'','\"',
				'\;', '\:',
				'\<', '\>',
				'\\[', '\\]',
				'\\(', '\\)'])
			{
				tempTimerId = tempTimerId.replace(new RegExp(invalidCharacters[i],'g'),'');
			}
			//tempTimerId.replace(/\//g, '').replace(/\\/g, '');
			if(tempTimerId == oldTempTimerId && !append_random){
				return;
			}
			oldTempTimerId = tempTimerId;
			if(!tempTimerId.length){
				elements.start_btn.addClass('disabled');
				elements.url.stop().animate({
					opacity:0.0
				},300);
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
				document.title = 'It\'s Almost';
				dom.stop().css('opacity',0.0).show().animate({
					opacity:1.0
				},500,function(){
					
				});
			} else {
				newTimerId = null;
				dom.stop().animate({
					opacity:0.0
				},500,function(){
					$(this).hide();
				});
			}
		});
		
		var emptyPhrases;
		emptyPhrases = (function(arr){
			// array shuffler from http://yelotofu.com/2008/08/jquery-shuffle-plugin/
			for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
			return arr;
		})([
			"time to go",
			"hammer time",
			"donk o'clock",
			"beer time",
			"winning",
			"the apocalypse",
			"lunch time",
			"my birthday!",
			"time to rock",
			"happy hour",
			"party time",
			'for cupcakes'
		]);
		
		(function() {
			var hint_timer, fadeSpeed, textDiv, i;
			
			hint_timer = setTimeout(changeText, 1000);
			textDiv = $('.countdown-name-empty-overlay');
			i = 0;
			
			function changeText() {
				if (!textDiv.hasClass('hidden')) {
					var j = i % emptyPhrases.length;
					textDiv.animate({
						opacity:0.0
					}, 400, function(){
						textDiv.html(emptyPhrases[j]).animate({
							opacity:0.35
						}, 400);
					});
					i++;
				}
				hint_timer = setTimeout(changeText,3000);
			}
			
			/* handle the hiding/showing of the empty state text for countdown name */
			tc.jQ('.countdown-name-empty-overlay').click(function() {
				tc.jQ('#countdown-name').focus();
			});
			tc.jQ('#countdown-name').focus(function() {
				if(hint_timer){
					clearTimeout(hint_timer);
				}
				tc.jQ('.countdown-name-empty-overlay').stop().animate({
					opacity:0.0
				},150).addClass('hidden');
			});
			tc.jQ('#countdown-name').blur(function() {
				if(tc.jQ('#countdown-name').val().length){
					return;
				}
				hint_timer = setTimeout(function(){
					tc.jQ('.countdown-name-empty-overlay').animate({
						opacity:0.35
					},150,function(){
						hint_timer = setTimeout(changeText, 1500);
					}).removeClass('hidden');
				},100);
			});
			
		})();
		
	});
	
})(this);