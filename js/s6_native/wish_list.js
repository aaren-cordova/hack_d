// WISH LIST
/**
 * Created by Alex Lea
 *
 * Requires: slider.js
 */
var Wishlist = function(options){
	var wL = '#Wishlist',
		$wL = $(wL),
		items = [], // item cart ids
		slider;
		options = options || {};

	// Toggle slider based on options
	if (typeof options.mobile == 'undefined' ) {
		slider = new Slider(wL+' .slider', {
			itemWidth : 160,
			windowWidth : 922
		});
	}

	/* Methods */
	var init = function(){
		// Fill items
		$wL.find('li[data-id]').each(function(){
			items.push({
				id : $(this).attr('data-id'),
				url : sanitizeUrl($(this).attr('data-url'))
			});
		});

		// Listeners
		$wL.on('updateTotal', function(e, change){
			var self = $(this),
				count = parseInt(self.attr('data-count')) + change,
				$holder = $('#wl-count');
			if (count == 251) {
				return;
			}

			newItemsText = count;
			newItemsText += (count == 1) ? ' item' : ' items';

			// Update counts
			self.attr('data-count', count);
			$holder.html(newItemsText);
			if (typeof options.mobile != 'undefined' ) {
				if (count > 0) {
					$('.wishlist-count').addClass('active').text(count);
				} else {
					$('.wishlist-count').removeClass('active');
				}
			} else {
				$('.wishlist .count').text(count);  // Navigation
			}

					// Empty message
			if ( count <= 0 ) {
				self.addClass('empty');
			} else {
				self.removeClass('empty');
			}

			if ($('#top-register')) {
				if (count == 0) {
					$('#cart-migration').css("visibility", "hidden");
				} else {
					$('#cart-migration').css("visibility", "visible");
				}
			}

			// Refresh slider dimension
			if (typeof options.mobile == 'undefined' ) {
				slider.refresh();
			}
		});

		// Deleting in Wishlist panel
		$wL.on('submit', 'form', function(e){
			// Determine if add to cart or remove from list
			var self = $(this),
				type = self.attr('data-type'),
				itemId = self.find('button:submit').val();

			if ( type == 'remove' ) {
				removeItem(itemId);
				return false;
			}
		});

		if (typeof options.mobile == 'undefined' ) {
			// Wishlist toggle
			$wL.on('click', '.close', function(){
				$wL.removeClass('open');
				return false;
			});

			// Click behavior
			$('body').on('click', function(e){
				var $target = $(e.target);
				if ($target.parent().hasClass('wishlist')) {
					toggle();
					return false;
				} else {
					// Close wishlist if click out of it
					if (!$wL.is(e.target) && $wL.has(e.target).length === 0 && !$target.is('button')) {
						$wL.removeClass('open');
					}
				}
			});
		}
	},

	addItem = function(data, callback) {
		$.ajax({
			url : '/rest/wishlist',
			type : 'POST',
			dataType : 'json',
			data : data
		}).done(function(r){
			if ( r.status == 'success' ) {
				var data = r.data;
				if (typeof options.mobile == 'undefined' ) {
					slider.insert(generateHTML(data), true);
				} else {
					$('.container', wL).prepend(generateHTML(data));
				}
				// Update Settings
				$wL.trigger('updateTotal', [1]);
				// Add item to array
				items.push({
					id : String(data.cart_item_id),
					url : sanitizeUrl(data.item_url)
				});
				// Execute callback
				if ( typeof callback == 'function' ) {
					callback(data);
				}
			} else {
				alert(r.message);
			}
		});
	},

	removeItem = function(itemId, callback) {
		if ( !inWishlist(itemId) ) return;

		$.ajax({
			url : '/rest/wishlist',
			type : 'POST',
			dataType : 'json',
			data : {
				'method' : 'DELETE',
				'cart_item_id' : itemId
			}
		}).done(function(r){
			if ( r.status == 'success' ) {
				// Remove <li>
				$wL.find('li[data-id='+itemId+']').remove();
				// Update settings
				$wL.trigger('updateTotal', [-1]);
				// Remove from Array
				var index = findItemIndex(itemId);
				if ( index > -1 ) {
					items.splice(index, 1);
				}
				// Remove Wishlisted Status
				$('.wishlisted').removeClass('wishlisted');
				// Execute callback
				if ( typeof callback == 'function' ) {
					callback();
				}
			} else {
				alert(r.message);
			}
		});
	},

	inWishlist = function(itemId, key) {
		var key = key || 'id',
			result = findItemIndex(itemId, key);

		if ( result > -1 ) {
			return items[result];
		}

		return false;
	},

	findItemIndex = function(itemId, key) {
		var key = key || 'id';
		itemId = (key == 'url') ? sanitizeUrl(itemId) : itemId;
		for(var i= 0, e=items.length; i<e; i++) {
			if ( items[i][key] == itemId ) {
				return i;
			}
		}
		return -1;
	},

	sanitizeUrl = function(text) {
		var last = text.split('/'),
			result = last[last.length-1];
		// Remove query parameters
		if ( result.indexOf('?') >= 0 ) {
			var arr = result.split('?');
			result = arr[0];
			if ( arr[1].indexOf('#') >= 0 ) {
				result += '#'+arr[1].split('#')[1];
			}
		}
		return result;
	},

	generateHTML = function(data) {
		var newElement = '<li data-id="'+data.cart_item_id+'" data-url="'+data.item_url+'">';
		newElement += '<form id="add_' + data.post_id + '" data-type="add" method="post" action="/shop/cart">';
		newElement += '<input type="hidden" name="source" value="' + data.item_source + '">';
		newElement += '<input type="hidden" name="form_id" value="">';
		newElement += '<input type="hidden" name="post_id" value="' + data.post_id + '">';
		newElement += '<input type="hidden" name="product_id" value="' + data.product_id + '">';
		newElement += '<input type="hidden" name="quantity" value="1">';
		newElement += '<input type="hidden" name="form_attributes" value="' + decodeURIComponent($.param(data.attributes)) + '">';
		newElement += '<input type="hidden" name="form_js" value="2">';
		newElement += '<input type="hidden" name="form_preview" value="' + data.item_preview + '">';
		newElement += '<input type="hidden" name="form_url" value="' + data.item_url + '">';

		if ( typeof data.attributes != 'undefined' ) {
			$.map(data.attributes, function(value, key){
				newElement += '<input type="hidden" name="attr_'+data.post_id+key+'" value="' + value + '">';
			});
		}

		newElement += '<input type="hidden" name="is_wishlist" value="false">';
		newElement += '<img src="' + data.image + '">';
		newElement += '<button class="move" type="submit" name="add_item" value="' + data.cart_item_id + '">Move to Cart</button>';
		newElement += '</form>';
		newElement += '<form id="remove_' + data.post_id + '" data-type="remove" method="post" action="/shop/cart">';
		newElement += '<input type="hidden" name="is_wishlist" value="true">';
		newElement += '<input type="hidden" name="form_url" value="' + data.item_url + '">';
		newElement += '<button class="delete" type="submit" name="remove_item" value="' + data.cart_item_id + '">×</button>';
		newElement += '</form>';
		newElement += '<a class="bg" href="' + data.item_url + '"></a>';
		newElement += '<a href="' + data.item_url + '">' + data.title + '</a>';
		newElement += '</li>';

		return newElement;
	},

	toggle = function(open) {
		if ( typeof open != 'undefined' && $wL.hasClass('open') ) return;

		$wL.toggleClass('open');
	};

	// Initialize class
	init();

	return {
		items : items,
		inWishlist : inWishlist,
		addItem : addItem,
		removeItem : removeItem,
		toggle : toggle,
		slider : slider
	}
};

// Global scope
var wL;
$(document).ready(function(){
	if ($('body').hasClass('mobile')) {
		wL = new Wishlist({
			mobile : true
		});
	} else {
		wL = new Wishlist();
	}
});