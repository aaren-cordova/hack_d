// CORE
var loc = document.location.toString();

$(document).ready(function(){

	$('body').append('<div id="app-alerts" style="display: none;"></div>');
	$('body').append('<div id="app-alerts" style="display: none;"></div>');
	$('#top-search-box').fieldHelp('Find products, artists and more');
	$('#newsletter_email').fieldHelp('Enter your email address');

	$('#menu-user').hover(
		function() { $('#menu-user-dropdown').show(); },
		function() { $('#menu-user-dropdown').hide(); }
	);

	$('#menu-shop').hover(
		function() { $('#menu-shop-dropdown').show(); },
		function() { $('#menu-shop-dropdown').hide(); }
	);

	$('a[rel=external]').click(function(){
		this.target = "_blank";
	});

	$('.tooltip').tooltip({showURL: false});

	$('a.zoom').fancybox({
		autoScale: true
	});

	$('li.click, tr.click, .home-stage .click, .home-stage-v2 .click, .jcarousel .click, .autoclick, .home-popular .click').click(function (e) {
		var url = $('a', this).attr('href');
		e.preventDefault();
		window.location = url;
	});

	$('.inline-log').blur(function(){
		$(this).fadeOut(150);
	});

	// homepage tile behavior for tablet/mobile
	if (typeof platform !== 'undefined'){
		if (platform=='mobile' || platform=='tablet') {
			$('.tile a').on('click', function(e){
				e.preventDefault();
			});
			$('.tile').on('click', function(){
				var self = $(this);
				if (self.hasClass('active')) {
					window.location.href = self.find('a').attr('href');
				} else {
					self.addClass('active');
				}
			});
		}
	}

	$(".gaq-event").on("click", function(ev) {
		// Set a delay of 0 to have no delay
		var delay = $(this).data('gaq-delay') ;
		var delayNum = isNaN(delay) ? 300 : parseInt(delay);
		var dataStr = $(this).data('gaq-values');
		// Comma-delimited list of category,action,label,value
		var data = dataStr.split(",");
		if(data.length>3) {
			data[3] = parseInt(data[3]);
		}
		data.unshift('_trackEvent');
		_gaq.push(data);

		if(delayNum > 0) {
			ev.preventDefault();
			// Check if this element is a link click or form post
			if($(this).attr("href")) {
				var url = $(this).attr("href");
				setTimeout(function() {
					window.location = url;
				}, delayNum);
			} else {
				var submitForm = $(this).closest("form");
				setTimeout(function() {
					HTMLFormElement.prototype.submit.call($(submitForm)[0]);
				}, delayNum);
			}
		}
	});
});

/*
success: function(r) { alert($(r).text()) },
error: function(xhr, desc, e){ alert(xhr.responseText); }
*/

jQuery.appError = function(message) { $.showAlert(message, 'error'); }
jQuery.appConfirm = function(message) { $.showAlert(message, 'confirm'); }
jQuery.showAlert = function(message, type)
{
	$('#app-alerts').html('<span class="'+type+'">'+message+'</span>');
	$('#app-alerts').css('display', 'block');
	t = window.setTimeout("$('#app-alerts').fadeOut('slow')", 2000);
}


/**
 * Form Field TIP
 * @param {Object} text
 */
jQuery.fn.fieldHelp = function(text){
	return this.each(function(){

		if (this.type != 'text' && this.type != 'textarea') {
			return;
		}

		var fld_current = this;

		if(this.value=='' || this.value == text) {
			this.value = text;
			$(this).addClass('helper');
		} else {
			return;
		}

		$(this).focus(function() {
			if (this.value == text || this.value == '') {
				this.value = '';
				$(this).removeClass('helper');
			}
		});

		$(this).blur(function() {
			if (this.value == text || this.value == '') {
				$(this).addClass('helper');
				this.value = text;
			}
		});

		$(this).parents('form').each(function() {
			$(this).submit(function() {
				if(fld_current.value == text) { fld_current.value = ''; }
			});
		});

	});

};


Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

jQuery.fn.formToJSON = function(){
	var array = $(this).serializeArray();
	var json = {};

	jQuery.each(array, function() {
		json[this.name] = this.value || '';
	});

	return json;
};

jQuery.fn.toggle = function() {
	return this.each(function(){
		$(this).click(function(){
			if ($(this).is('.toggled')) {
				$(this).removeClass('toggled');
				$(this).next().slideUp('fast');
			} else {
				$(this).addClass('toggled');
				$(this).next().slideDown('fast');
			}
		});
	});
};

jQuery.fn.toggleFade = function(id) {
	return this.each(function(){
		$(this).click(function(){
			if ($(this).is('.toggled')) {
				$(this).removeClass('toggled');
				$(id).slideUp('fast');
			} else {
				$(this).addClass('toggled');
				$(id).slideDown('fast');
			}
		});
	});
};




jQuery.editField = function(obj, recordId, fieldName){
	var string = $(obj).text();
	string = string.replace(/"/g, '&quot;');
	var objId = $(obj).attr('id');
	var input = '<div id="editing-wrap-'+objId+'" class="editing-wrap"><input type="text" id="editing-'+objId+'" name="editing-'+objId+'" value="'+string+'" class="editing-field"></div>';
	$(obj).hide();
	$(obj).after(input);
	var editing = $('#editing-'+objId);
	editing.focus();
	editing.select();
	editing.blur( function() { resetField(); } );
	editing.keydown( function(e) {
		if (e.keyCode == 27) { resetField(); }
		if (e.keyCode == 13) { submitField( editing.val() ); }
	});
	function resetField() {
		$('#editing-wrap-'+objId).remove();
		$(obj).show();
	}
	function submitField(newString) {
		if (newString != string) {
			$.ajax({
				type: "POST",
				url: "/rest/"+recordId,
				data: "method=PUT&"+fieldName+"="+escape(newString),
				error: function(){ $(obj).text(string); appError('Error: editField'); }
			});
		}
		$(obj).text(newString);
		resetField();
	}

}

jQuery.openUser = function(username){
	window.location = 'http://www.society6.com/'+username;
}


function uploadImage(obj, target) {
	$(obj).hide();
	$('.'+target).show();
}



jQuery.toggleLogin = function()
{
	$("#top-right").css("display", "none");
	$("#top-login").fadeIn(function(){$("#side-username").focus()});
	return false;
}


function addComment(postId, targetUrl)
{
	var form = '<form action="'+targetUrl+'#comment-new" method="POST" onsubmit="return submitComment('+postId+')"><input id="done" name="done" type="hidden" value="1"/>';
	form += '<div class="input-wrap"><textarea id="comment_body" name="comment_body"/></textarea></div>';
	form += '<div class="buttons"><button type="submit" class="track" data-gaq="comment">Add Comment</button></div>';
	form += '</form>';
	$('#post-comment-'+postId).html(form);
}

function submitComment(postId)
{
	$('#post-comment-'+postId+' button').text('Please Wait').attr('disabled', 'disabled');
	return true;
}



// Post Promotions
jQuery.addPromotion = function(postId)
{
	var promo = $('#promo-'+postId);
	var count = $('.promo-count', promo);
	var promote = $('.status', promo);
	var countNum = 0;
	if (count.html() != '') var countNum = $('.promo-count strong', promo);
	countNum = (count.html() == '') ? 1 : parseInt($('strong', count).html())+1 ;
	promo.removeClass('promo-empty');
	count.fadeOut('fast', function() { $(this).html('<strong>'+countNum+'</strong>').fadeIn('fast'); });

	promote.removeAttr('onclick');
	promote.html('Promoted');
	promote.removeClass('promote');
	$.ajax({
		type: "POST",
		url: "/rest/posts/"+postId,
		data: { method: "POST", promotion: 1 }
		//error: function(){ $.appError('Function: addPromotion'); }
	});
}


function toSlug(text)
{
	return text.toLowerCase().replace(/[^\w -]+/g,'').replace(/-{2,}/g,'-').replace(/ {2,}/g,' ').replace(/ /g,'-');
}


/* Follow User */
function follow(userId, followId) {
	$('#btn-follow-'+followId).html('<a class="remove just-followed" onclick="unfollow('+userId+', '+followId+')" onmouseout="$(this).removeClass(\'just-followed\')"><span>Following</span><span class="unfollow">Unfollow</span></a>');
	$.appConfirm('This person\'s updates will appear on your Society');
	$.ajax({
		type: "POST",
		url: "/rest/follow/"+userId,
		data: { method: "POST", follow_user_id: followId }
		//error: function(){ $.appError('Unable to Follow'); }
	});
}

function unfollow(userId, followId) {
	$('#btn-follow-'+followId).html('<a class="add" onclick="follow('+userId+', '+followId+')"><span>Follow</span></a>');
	$.appConfirm('You are no longer following this person');
	$.ajax({
		type: "POST",
		url: "/rest/follow/"+userId,
		data: { method: "DELETE", follow_user_id: followId }
	});
}


function deleteComment(commentId){
	var answer = confirm("Are you sure you want to delete this Comment?");
	if (answer){
		$.ajax({
			type: "POST",
			url: "/rest/comments/"+commentId,
			data: { method: "DELETE" },
			success: function(r) { $("#comment-"+commentId).hide(); },
			error: function(){ $.appError('function: deleteCommentt'); }
		});
	}
}


function promoLog(p) {
	_gaq.push(['_trackEvent', 'guest', 'promote', 'post']);
	var cnt = $('#content').offset();
	var pos = p.offset();
	var log = $('.inline-log');
	log.hide();
	log.css({left: (pos.left - cnt.left - p.width()), top: (pos.top - cnt.top + p.height() + 4)});
	log.slideDown(50);
	log.focus();
}

function truncateText(text, charLimit) {
	var result = text;

	if ( text.length > charLimit ) {
		result = text.slice(0, charLimit)+'...';
	}

	return result;
}

/**
 * Adds different linking actions and keyboard input handling for a search form with a <ul> of options
 * HTML: <div><form><input><button><ul><li><a>...
 * @param options - list of URL parameters for each <li> item. The href of the <a> indicates the form action
 *   options format: {params:[[{k:key, v:value}, ...], ...]}
 */
jQuery.fn.searchDropDown = function(options) {
	var self = {sel:this.selector, con:this.context, opt:options},
		searchInput = $('input', self.sel),
		searchForm = $('form', self.sel),
		searchBtn = $('button', self.sel),
		searchOptions = $('ul', self.sel),
		searchItems = $('li', searchOptions),
		searchItemLinks = $('a', searchItems),
		searchKeyWords = $('.keyword', searchOptions),
		searchItemsHovered = false;

	if (!searchInput.length || !searchForm.length || !searchBtn.length || !searchOptions.length) {
		// Error: Invalid HTML
		return this;
	}

	searchInput.keyup(function(e) {
		searchKeyWords.text(searchInput.val());
		searchInput.val().length ? searchOptions.show() : searchOptions.hide();

		var oldItem = searchItems.filter('.selected'),
			newItem = oldItem;

		switch (e.keyCode) {
			case 38: // UP
				newItem = oldItem.prev();
				if (newItem.length === 0) {
					oldItem.removeClass('selected');
				}
				break;
			case 40: // DOWN
				if (oldItem.length === 0) {
					searchItems.first().addClass('selected');
				}
				newItem = oldItem.next();
				break;
		}

		if (newItem.is('li')) {
			oldItem.removeClass('selected');
			newItem.addClass('selected');
			searchItemsHovered ? newItem.addClass('unhighlight') : newItem.removeClass('unhighlight');
		}
	});

	searchItems.hover(function() {
		var oldItem = searchItems.filter('.selected');
		if (!$(this).hasClass('selected')) {
			oldItem.addClass('unhighlight');
		}
		searchItemsHovered = true;
	}, function() {
		var oldItem = searchItems.filter('.selected');
		oldItem.removeClass('unhighlight');
		searchItemsHovered = false;
	});

	searchItemLinks.click(function(e) {
		e.preventDefault();
		var oldItem = searchItems.filter('.selected');
		oldItem.removeClass('selected');
		$(this).parent().addClass('selected');
		searchBtn.click();
	});

	// Search form does not use submit event. Actually simulates a click event on the form button here:
	searchBtn.click(function() {
		updateSearchFormParameters();
	});

	$(document).on('mouseup', function(e) {
		if (searchInput.val().length) {
			searchKeyWords.text(searchInput.val());
			searchOptions.show();
		}
		if (!searchForm.is(e.target) && searchForm.has(e.target).length === 0) {
			searchOptions.hide();
			searchItems.removeClass('selected');
		}
	});

	function updateSearchFormParameters()
	{
		$('input[type="hidden"]', searchForm).remove();
		var currItem = searchItems.filter('.selected'),
			currIndex = currItem.index(),
			analytics = _gaq || [],
			params = self.opt.params;

		if (currIndex < 0) {
			analytics.push(['_trackEvent', 'searchbox', 'search_click', 'search-default']);
			return;
		} else {
			var searchType = currItem.attr('id');
			analytics.push(['_trackEvent', 'searchbox', 'search_click', searchType]);
		}

		searchForm.attr('action', currItem.find('a').attr('href'));

		for (var param in params[currIndex]) {
			var paramValue = params[currIndex][param].v || getUrlParameterByName(params[currIndex][param].k);
			if (paramValue) {
				searchForm.prepend('<input name="'+params[currIndex][param].k+'" type="hidden" value="'+paramValue+'" />')
			}
		}
	}
};

function getUrlParameterByName(name)
{
	var match = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function moreToggle(toggleClass) {
	$("."+toggleClass).each(function(){
		if($(this).css("display") != "none") {
			$(this).css("display", "none");
		} else {
			$(this).css("display", "");
		}
	});
}


