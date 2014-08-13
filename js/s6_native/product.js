var autoSet = true;
var prevImg = null;

document.jsDollarValue = ($ === jQuery) ? ('jQuery=' + jQuery().jquery) : ($.toString());

function getCookie (name) {
	var re = new RegExp('(?:^|;\\s*)' + name + '\\s*=\\s*([^;]*)');
	var c = document.cookie.match(re);
	return c ? c[1] : null;
}

function productRedirect () {
	if (typeof defMap == 'undefined') return false;

	var redirected = false;
	$('.product_options select').each(function () {
		var valId = $(':selected', this).val();
		if (!valId) return;

		var redirect = typeof(details[valId]) != 'undefined' ? details[valId].rd : null;
		if (!redirect) return;

		redirect = redirect.split('#');
		var newUrn = redirect[0];
		var newHash = redirect[1] || '';

		var url = window.location.pathname;
		url = url.replace(/_[a-zA-Z0-9-]+$/, '_' + newUrn);
		url += window.location.search + '#' + newHash;
		redirected = true;
		window.location.replace(url);
	});

	return redirected;
}

$(document).ready(function() {
	$('#form_js').val('1');

	var zoomSize = $('.preview a').attr('href');
	zoomSize = zoomSize.substr(zoomSize.lastIndexOf('_') + 1);

	$('.product_options select').change(function () {
		if (productRedirect()) return;
		if (autoSet) setProduct(true);
	});
	if($.browser.mozilla){
		$('button').attr('disabled', false);
	}
	var $cartForm = $('#cart-add'),
		$removeButton = $cartForm.find('#wishlist-remove'),
		submitId = 'cart-submit';

	$cartForm.on('click', 'button', function($e) {
		submitId = $($e.target).attr('id');
	});

	// Adding an item to cart/wishlist
	$cartForm.validate({
		submitHandler: function(form) {
			switch(submitId) {
				case 'wishlist-submit':
					$('#is_wishlist').val(true);
					var formData = $("#cart-add").formToJSON();
					// Add to Wishlist
					wL.addItem(formData, function(data){
						$removeButton.val(data.cart_item_id);
						$cartForm.addClass('wishlisted');
					});
					return false;
				break;

				case 'wishlist-remove':
					var itemId = $removeButton.val();
					// Remove from Wishlist
					if ( itemId != "" ) {
						wL.removeItem(itemId);
					}
					return false;
				break;

				default:
					$('#is_wishlist').val(false);
					postForm(form);
				break;
			}
		}
	});

	$(".preview .zoom").fancybox();

	$('.preview img').load(function() {
		$(this).fadeIn('fast');
	});

	$('.live-preview select').change(function () {
		if (productRedirect()) return;

		var prev = getPrev();
		if (!prev) return;

		var key = keyName+prev;
		var path = pathUrl+key;

		if (path != prevImg) {
			prevImg = path;
			$('#form_preview').attr('value', key);
			i = $('.preview img');
			if (i.height() > 100) $('.preview .loader').width(i.width()).height(i.height());
			var coverImg = path+'_b.jpg';
			if (coverImg != $('.preview img').attr('src')) $('.preview img').hide();
			$('.preview img').attr('src', coverImg);
			$('.preview a').attr('href', path+'_'+zoomSize);
			$('#clickToZoom').attr('href', path+'_'+zoomSize);
		}

		var valId = $(this).val();
		if (views && details[valId]) {
			var attrId = $(this).parent().attr('id').substring(5);
			var names = views.split(',');
			$.each(names, function(key, value) {
				if (value.indexOf('[ATTR:') !== -1) {
					var matches = value.match(/\[ATTR:([0-9]+)\]/);
					if (attrId != matches[1]) return;
					value = value.replace(matches[0], details[valId]['prev']);
					$('#preview_'+key+' img').attr('src', '/images/prevs/'+(productPreview||'frm')+value+'_s.jpg');
					$('#preview_'+key+' a').attr('href', '/images/prevs/'+(productPreview||'frm')+value+'_m.jpg');
				} else if (value.indexOf('[ARTATTR:') !== -1) {
					var matches = value.match(/\[ARTATTR:([0-9]+)\]/);
					if (attrId != matches[1]) return;
					value = value.replace(matches[0], details[valId]['prev']);
					value = value.replace(/mm$/, '');
					var prevImg = pathUrl + keyName + value;
					$('#preview_'+key+' img').attr('src', prevImg+'_s.jpg');
					$('#preview_'+key+' a').attr('href', prevImg+'_l.jpg');
				} else {
					return;
				}
			});
		}

		$('.zoom', this).fancybox();
	}).keypress(function () { $(this).change() });

	var updateButton = function() {
		var uri = window.location.pathname + window.location.hash,
			wLItem = wL.inWishlist(uri, 'url');

		if (wLItem) {
			$cartForm.addClass('wishlisted');
			$removeButton.val(wLItem.id);
		} else {
			$cartForm.removeClass('wishlisted');
			$removeButton.val('');
		}
	}

	parseHash(true);
	$(window).bind('hashchange', function() {
		parseHash();
		updateButton();
	});

	setProduct(true);
	updateButton();
});

function getPrev() {
	var prev = '';
	$('.product_options select').each(function() {
		var val = $(':selected', this).attr('value');
		if (!val) val = 0;
		if (details[val] && details[val]['prev']) {
			prev += details[val]['prev'];
		}
	});
	return prev;
}

function postForm(form) {
	if(document.ColorSearchMixpanel != undefined) {
		if(document.ColorSearchMixpanelObj != undefined) {
			mixpanel.track(document.ColorSearchMixpanel, document.ColorSearchMixpanelObj);
		} else {
			mixpanel.track(document.ColorSearchMixpanel);
		}
	}
	$('button', form).text('Please Wait...');
	$('button', form).attr('disabled', 'disabled');
	$('#form_js').val('2');
	form.submit();
}

function setProduct(printHash) {
	var amount = 0;
	var title = '';

	var description = '';
	var hash = '';
	var shouldFadePrice = false;

	$('.product_options select').each(function(index) {
		var sel = $(':selected', this);
		var val = sel.attr('value');
		if (!val) val = 0;
		if (details[val]) {
			if (val != 0 && typeof defMap != 'undefined' && defMap.vals[val]) {
				var attrName = defMap.vals[val][0];
				var valueName = defMap.vals[val][1];
				document.cookie = 'attr_' + attrName + '=' + valueName;
			}
			var attr = details[val]['attr'];
			if (attr && attr != 0) setDropdown(attr);
			if (val != 0 && details[val]['desc'] && details[val].rd == null) description += '<p>'+details[val]['desc']+'</p>';
			if (val == 0) return;
			title += (details[val]['label'] && details[val].rd == null) ? ' '+details[val]['label'] : '' ;
			// FIXIT: iphone5C, ipodTouch, Galaxy 5, Galaxy 6 are missing a side image asset. As assets become available, remove from the hide list
			if(val == 151 || val == 152 || val == 195 || val == 324) {
				$(".additional_views").hide();
			} else {
				$(".additional_views").show();
			}
		}

		if (index==0) {
			$('.product_options .learn').attr('id', 'g'+val);  // For toggling Learn More
		}

		if (!printHash) $('#val_'+val+' img').addClass('selected');

		amount += Number(sel.attr('title'));
		if (hash) hash += '&';
		hash += $(this).parent().attr('id').substring(5)+'='+val;

		shouldFadePrice = ('$' + (retail + amount).toFixed(2)) != $('.price').text() && amount > 0;
	});

	if (printHash && shouldFadePrice) {
		$('.price').fadeOut(0).text('$' + (retail + amount).toFixed(2)).fadeIn(500);
	} else {
		$('.price').text('$' + (retail + amount).toFixed(2));
	}

	if (typeof discounts !== 'undefined') {
		$('span.price').addClass('retail');
		var lowestDiscountPrice = retail + amount;

		$.each(discounts, function(key, discount) {
			var discountAmount = discount.type === 'fixed'
				? (retail + amount) - discount.amount
				: (retail + amount) * ((100 - discount.percent) / 100);
			lowestDiscountPrice  = lowestDiscountPrice > discountAmount ? discountAmount : lowestDiscountPrice;
		});

		discount = $('#discount-price');

		if (printHash && shouldFadePrice) {
			discount.fadeOut(0).text('$' + lowestDiscountPrice.toFixed(2)).fadeIn(500);
		} else {
			discount.text('$' + lowestDiscountPrice.toFixed(2));
		}
	}

	if (title) $('.details h2 span').text(' /'+title);
	if (!description) description = details['0']['desc'];

	$('#product-description').html(description);

	$('#form_attributes').val(hash);

	// Scroll to comments or promoters
	var curHash = window.location.hash.substring(1);
	if ( curHash == 'comments' || curHash == 'user_list' ) {
		var $el = $('[name='+curHash+']');
		if ($el.length > 0) {
			$('html,body').animate({
				scrollTop: $el.offset().top
			}, 1000);
		}
	}

	if (printHash && curHash != hash) {
        var newUrl = window.location.href.split('#')[0] + '#' + hash;
        window.history.replaceState({}, 'Product', newUrl);
		parseHash();
	}

	autoSet = true;
}


function setSwatch (spanElt) {
	var swtc = spanElt.parent();
	var attr = swtc.attr('id').substring(5);
	var id = spanElt.attr('id').substring(4);
	$('img', swtc).removeClass('selected');
	$('img', spanElt).addClass('selected');
	$('select', swtc).val(id).change();
}


function setDropdown (attr) {
	for (var attribute_id in attr) {
		var $s = $('#swtc_' + attribute_id);

		for (var value_id in attributes[attribute_id]) {
			var option = $('#attr_' + attribute_id + ' option[value=' + value_id + ']');
			// var swatch = $('#swtc_' + attribute_id + ' #val_' + value_id);
			var swatch = $s.find(' #val_' + value_id);
			if (attr[attribute_id][value_id]) {
				if (option.length == 0) {
					$('#attr_' + attribute_id + ' select').append('<option value="' + value_id + '" title="' + details[value_id]['retail'] + '">' + attributes[attribute_id][value_id] + '</option>');
				}
				if (swatch.length > 0) swatch.show();
			} else {
				if (option.length > 0) option.remove();
				if (swatch.length > 0) swatch.hide();
			}
		}

		if ($s.length > 0) {
			if ($s.find('img.selected:visible').length == 0) {
				setSwatch($s.find('span:visible').first())
			}
		}
	}
}

function parseHash(firstRun) {
	var hash = window.location.hash.substring(1);
	var skipVars = {};
	if (hash) {
		autoSet = false;
		var vars = hash.split('&');
		$.each(vars, function(x, y) {
			var data = y.split('=');
			var sel = $('#attr_'+data[0]+' select');
			var valId = $('option[value=' + data[1] + ']', sel).val();
			if (typeof(details[valId]) != 'undefined' && !details[valId].rd) {
				skipVars[data[0]] = 1;
				sel.val(data[1]);
				sel.change();
			}
		});
	}

	if (firstRun) {

		if (typeof defMap != 'undefined') {

			var triggerChange = [];

			$('.product_options select').each(function() {

				var attrId = $(this).closest('li').attr('id').substr(5);
				if (skipVars[attrId] || !defMap.attrs[attrId]) return;

				var attrName = defMap.attrs[attrId].name,
					valKey = getCookie('attr_' + attrName),
					vals = defMap.attrs[attrId].vals[valKey];
				if (!vals) return;

				$.each(vals, function(i, val) {
					var sel = $('#attr_' + attrId + ' select');
					var opt = $('[value='+val+']', sel);
					if (opt) {
						sel.val(val);
						triggerChange.push(sel);
					}
				});
			});

			$.each(triggerChange, function(i, e) { $(e).change() });
		}
	}

	setProduct(false);
}