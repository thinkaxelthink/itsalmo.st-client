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
			social:dom.find('.social')
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
		
		/* handle modal hiding and showing */
		tc.jQ('#share-btn').click(function(e,d) {
			tc.jQ('.modal-overlay').fadeIn(500);
			tc.jQ('.modal-container').delay(400).fadeIn(500);
		});
		
		tc.jQ('#share-done-btn, .modal-overlay').click(function(e,d) {
			e.preventDefault();
			tc.jQ('.modal-container').fadeOut(250);
			tc.jQ('.modal-overlay').delay(150).fadeOut(400);
		});
		
	});
	
})(this);