(function($){
	$.fn.colorTip = function(settings){

		var defaultSettings = {
			color		: 'yellow',
			timeout		: 40
		}
		
		var supportedColors = ['red','green','blue','white','yellow','black'];
		
		/* Combining the default settings object with the supplied one */
		settings = $.extend(defaultSettings,settings);

		/*
		*	Looping through all the elements and returning them afterwards.
		*	This will add chainability to the plugin.
		*/
		return this.each(function(){

			var elem = $(this);
			
			// If the title attribute is empty, continue with the next element
//			if(elem.attr('title')) return true;
    	if(!elem.hasClass('new-tooltip')) return true;
			// Creating new eventScheduler and Tip objects for this element.
			// (See the class definition at the bottom).
			
			var scheduleEvent = new eventScheduler();
			var tip = new Tip(elem.html());

			// Adding the tooltip markup to the element and
			// applying a special class:
			
			elem.parent().append(tip.generate()).addClass('colorTipContainer');

			// Checking to see whether a supported color has been
			// set as a classname on the element.
			
			var hasClass = false;
			for(var i=0;i<supportedColors.length;i++)
			{
				if(elem.parent().hasClass(supportedColors[i])){
					hasClass = true;
					break;
				}
			}
			
			// If it has been set, it will override the default color
			
			if(!hasClass){
				elem.parent().addClass(settings.color);
			}
			
			// On mouseenter, show the tip, on mouseleave set the
			// tip to be hidden in half a second.
			
			elem.parent().hover(function(){

				tip.show();
				
				// If the user moves away and hovers over the tip again,
				// clear the previously set event:
				
				scheduleEvent.clear();

			},function(){

				// Schedule event actualy sets a timeout (as you can
				// see from the class definition below).
				
				scheduleEvent.set(function(){
					tip.hide();
				},settings.timeout);

			});
			
			// Removing the title attribute, so the regular OS titles are
			// not shown along with the tooltips.
			
			elem.parent().removeAttr('title');
		});
		
	}


	/*
	/	Event Scheduler Class Definition
	*/

	function eventScheduler(){}
	
	eventScheduler.prototype = {
		set	: function (func,timeout){

			// The set method takes a function and a time period (ms) as
			// parameters, and sets a timeout

			this.timer = setTimeout(func,timeout);
		},
		clear: function(){
			
			// The clear method clears the timeout
			
			clearTimeout(this.timer);
		}
	}


	/*
	/	Tip Class Definition
	*/

	function Tip(txt){
		this.content = txt;
		this.shown = false;
	}
	
	Tip.prototype = {
		generate: function(){
			
			// The generate method returns either a previously generated element
			// stored in the tip variable, or generates it and saves it in tip for
			// later use, after which returns it.
			
			return this.tip || (this.tip = $('<span class="colorTip"><!--<span class="pointyTipShadow"></span><span class="pointyTip"></span>-->'+this.content+
											 '</span>'));
		},
		show: function(){
			if(this.shown) return;
			// Center the tip and start a fadeIn animation
			this.tip.css('margin-left',-this.tip.outerWidth()-10).fadeIn('fast');
			this.tip.css('whitespace', 'pre');
			this.tip.css('color', '#010203');
			this.shown = true;
		},
		hide: function(){
			this.tip.fadeOut();
			this.shown = false;
		}
	}
	
})(jQuery);
