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
				url_link:$('.url a'),
				url_text:$('.url a .text'),
				twitter_link:$(),
				facebook_link:$()
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
			var url;
			console.log(e);
			console.log(d);
			
			url = 'http://itsalmo.st/#'+d.id;
			
			elements.modal.url_link.attr('href',url);
			elements.modal.url_text.text('http://itsalmo.st/#'+url);
			
			'http://twitter.com/home?status=XXXXXX'
			'http://www.facebook.com/sharer.php?u=XXXXXXX&t=XXXXXXX'
			
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