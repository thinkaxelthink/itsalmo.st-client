/*    _____                    _____          
     /\    \                  /\    \         
    /::\    \                /::\    \        
    \:::\    \              /::::\    \       
     \:::\    \            /::::::\    \      
      \:::\    \          /:::/\:::\    \     
       \:::\    \        /:::/  \:::\    \    
       /::::\    \      /:::/    \:::\    \   
      /::::::\    \    /:::/    / \:::\    \  
     /:::/\:::\    \  /:::/    /   \:::\    \ 
    /:::/  \:::\____\/:::/____/     \:::\____\
   /:::/    \::/    /\:::\    \      \::/    /
  /:::/    / \/____/  \:::\    \      \/____/ 
 /:::/    /            \:::\    \             
/:::/    /              \:::\    \            
\::/    /                \:::\    \           
 \/____/                  \:::\    \          
                           \:::\    \         
                            \:::\____\        
                             \::/    /        
                              \/____/         
                             TYPE/CODE        
                         From 2010 till ∞     */

if(!tc){ var tc = {}; }

tc.jQ = jQuery;

jQuery(document).bind('ready',function(){
	var app = new tc.app(page);
});

tc.app = function(page){
	var me;
	me = this;
	this.page = page;
	this.events = $({});
	this.init(page);
};

tc.app.prototype.init = function(page){
	var me;
	me = this;
	if(page.features){
		for(i in page.features){
			if(tc.jQ.isFunction(page.features[i])){
				if(page.features[i](me) === false){
					break;
				}
			}
		}
		
		this.events.trigger('app.featuresInitialized');
	}
};

tc.app.prototype.components = {};
tc.app.prototype.events = tc.jQ({});