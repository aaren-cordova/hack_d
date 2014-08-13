var Slider = function(selector, options){
	// Properties
	var self = $(selector),
		$container = $('.container', selector),
		$items = $('.container li', selector),
		itemWidth = options.itemWidth || 160,
		windowWidth = options.windowWidth || 1000,
		current = 0,
		total = $items.length,
		allowed = total - Math.floor(windowWidth/itemWidth),
		totalVisible = Math.round(windowWidth/itemWidth),
		legacy = (navigator.appName.indexOf('Internet Explorer') != -1);  // IE

	// Set up transitions
	$.fn.extend({
		applyCSS : function(property, value) {
			var vendors = ['webkit', 'moz', 'ms', 'o'];
			for(var i=0, e=vendors.length; i<e; i++) {
				$(this).css('-'+vendors[i]+'-'+property, value);
			}
			// Default value
			$(this).css(property, value);
		}
	});

	// Methods
	var init = function(){

		// Prevent weird highlighting when clicking
		self.css({
			'-webkit-touch-callout':'none',
			'-webkit-user-select':'none'
		});

		// Transition Effect
		$container.applyCSS('transition', 'all 0.2s ease-out');

		// Initial setup
		refresh();
	},

	refresh = function(){
		// Updates
		$items = $('.container li', selector);
		total = $items.length;
		allowed = total - Math.floor(windowWidth/itemWidth);

		var newWidth = total * itemWidth;

		$container.width(newWidth);
		// Must exceed window width to scroll
		if ( newWidth > windowWidth ) {
			// Listen on clicks
			$('.control', selector).off('click').on('click', function(){
				var self = $(this),
					scrollTo = 0;

				if ( self.hasClass('next') ) {
					current = (current<allowed) ? current+1 : current;
					self.trigger('slide', current);
				} else if ( self.hasClass('prev') ) {
					current = (current>0) ? current-1 : current;
				}
				scrollTo = -current*itemWidth;

				// Animate container
				if ( legacy ) {
					$container.css('margin-left', scrollTo+'px');
				} else {
					$container.applyCSS('transform', 'translate3d('+scrollTo+'px,0,0)');
				}

				updateControls(current, allowed);
			});
			self.removeClass('noScroll');
		} else {
			self.addClass('noScroll');
		}

		// Update controls
		updateControls(current, allowed);
	},

	insert = function(newHTML, front){
		if (typeof front != 'undefined' && front) {
			$container.prepend(newHTML);
		} else {
			$container.append(newHTML);
		}
		refresh();
	},

	updateControls = function(current, allowed){
		if ( allowed <= 0 ) {
			self.find('.control').hide();
		} else {
			if ( current == 0 ) {
				self.find('.control.prev').hide();
				self.find('.control.next').show();
			} else if ( current >= allowed-1 ) {
				self.find('.control.next').hide();
				self.find('.control.prev').show();
			} else {
				self.find('.control').show();
			}
		}
	};

	// Initialize slider
	init();

	// Public Methods
	return {
		selector : selector,
		totalVisible : totalVisible,
		refresh : refresh,
		insert : insert
	};
};