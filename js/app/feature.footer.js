(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(Footer)',
				enabled:true
			});
			
	page.features.push(function(app){
		
		var dom, elements;
		
		dom = $('.footer');
		
		elements = {
			social:dom.find('.social'),
			share_button:dom.find('.share-btn'),
			modal:{
				overlay:$('.modal-overlay'),
				container:$('.modal-container'),
				url_link:$('.modal-container').find('.url a'),
				url_text:$('.modal-container').find('.url a .text'),
				twitter_link:$('.modal-container').find('.twitter a'),
				facebook_link:$('.modal-container').find('.fb a')
			}
		};
		
		app.events.bind('hashchange.hashChanged',function(e,d){
			if(!d.hash.length){
				elements.social.stop().animate({
					'opacity':0.0
				},500);
			} else {
				elements.social.stop().animate({
					'opacity':1.0
				},500);
			}
		});
		
		app.events.bind('timer.manager.timerLoaded',function(e,d){
			var url, twitter_url, facebook_url;
			
			url = 'http://itsalmo.st/#' + window.escape(d.id);
			twitter_url = 'http://twitter.com/share?url=' + window.escape(url) + '&text=' + window.escape('It\'s Almost ' + d.name);
			facebook_url = 'http://www.facebook.com/sharer.php?u=' + window.escape(url) + '&t=' + window.escape('It\'s Almost ' + d.name);
			
			elements.modal.url_link.attr('href',url);
			elements.modal.url_text.text(url);
			elements.modal.twitter_link.attr('href',twitter_url);
			elements.modal.facebook_link.attr('href',facebook_url);
		});
		
		/* handle modal hiding and showing */
		elements.share_button.click(function() {
			elements.modal.overlay.fadeIn(600);
			elements.modal.container.css('opacity',0.0).show().delay(400).animate({
				opacity:1.0
			},600);
			
			//centers the modal when it is shown;
			(function(ele){
				var winHeight = tc.jQ(window).height() - tc.jQ('.footer').height();
				var eleHeight = ele.height();
				ele.css('top', Math.ceil((winHeight - eleHeight) * 0.4));
			})(elements.modal.container);
			
		});
		
		tc.jQ('#share-done-btn, .modal-overlay').click(function(e) {
			e.preventDefault();
			elements.modal.container.fadeOut(250);
			elements.modal.overlay.delay(150).fadeOut(400);
		});
		
	});
	
})(this);