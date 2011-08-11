(function(window) {
	
	var page = window.page,
			log = new NI.Logging({
				moduleName:'Feature(BrowserDetection)',
				enabled:true
			});
			
	page.features.push(function(app){
		var browser_header;
		
		app.browserDetection = new NI.BrowserDetection({});
		browser_header = $('.browser-invalid');
		
		browser_header.find('.browser-close').bind('click',function(e,d){
			e.preventDefault();
			browser_header.hide();
		});
		
		if($.browser.msie || $.browser.opera){
			browser_header.show().animate({
				top:'0px'
			},600,function(){
				
			});
		}
		
		
	});
	
})(this);