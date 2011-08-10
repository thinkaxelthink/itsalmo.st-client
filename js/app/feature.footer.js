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
		tc.jQ('#share-btn').click(function() {
			tc.jQ('.modal-overlay').fadeIn(600);
			tc.jQ('.modal-container').delay(400).fadeIn(600);
			vertCenter(tc.jQ('.modal-container'));
		});
		tc.jQ('#share-done-btn, .modal-overlay').click(function() {
			event.preventDefault();
			tc.jQ('.modal-container').fadeOut(250);
			tc.jQ('.modal-overlay').delay(150).fadeOut(400);
		});
		
	});
	
})(this);