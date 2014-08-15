goog.require('s6.widgets.IArtPieceModel');
goog.require('s6.widgets.ArtPieceModel.EventType');
goog.require('s6.widgets.WishlistStateType');
goog.require('goog.dom.DomHelper');
goog.require('goog.ui.Component');
goog.require('goog.asserts');
goog.require('goog.debug.Logger');
goog.require('goog.dom');

goog.provide('s6.widgets.WishlistItemView');
goog.scope(function(){
	var events = goog.events;
	var EventType = goog.events.EventType;
	var WishlistStateType = s6.widgets.WishlistStateType;

	var ArtPieceModel_EventType = s6.widgets.ArtPieceModel.EventType;
	var Logger = goog.debug.Logger;
	var Component = goog.ui.Component;

	/**
	 * @constructor
	 * @extends {goog.ui.Component}
	 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
	 */
	s6.widgets.WishlistItemView = function(opt_domHelper){
		Component.call(this, opt_domHelper);
	};
	goog.inherits(s6.widgets.WishlistItemView, Component);

	/**
	 * @param {s6.widgets.IArtPieceModel} artPieceModel
	 * @return {s6.widgets.WishlistItemView}
	 */
	s6.widgets.WishlistItemView.prototype.setArtPieceModel = function(artPieceModel){
		if(artPieceModel){
			goog.events.unlisten(artPieceModel, ArtPieceModel_EventType.FAVORITED_ENABLED, this.onFavoritedEnabledChanged_, false);
			goog.events.unlisten(artPieceModel, ArtPieceModel_EventType.PRODUCT_TYPE, this.onProductTypeChanged_, false, this);
		}

		this.artPieceModel_ = artPieceModel;
		
		if(artPieceModel){
			goog.events.listen(artPieceModel, ArtPieceModel_EventType.FAVORITED_ENABLED, this.onFavoritedEnabledChanged_, false, this);
			goog.events.listen(artPieceModel, ArtPieceModel_EventType.PRODUCT_TYPE, this.onProductTypeChanged_, false, this);
		}


		this.artPieceModel_ = artPieceModel;
		
		this.invalidate();
		return this;
	};

	/**
	 * @param {s6.widgets.IWishlistItemController} wishlistItemController
	 * @return {s6.widgets.WishlistItemView}
	 */
	s6.widgets.WishlistItemView.prototype.setWishlistItemController = function(wishlistItemController){
		this.wishlistItemController_ = wishlistItemController;
		return this;
	};

	s6.widgets.WishlistItemView.prototype.invalidate = function(){
		this.onProductTypeChanged_(null);
	};

	/** @inheritDoc */
	s6.widgets.WishlistItemView.prototype.createDom = function(){
		var dom = this.dom_;
		var artViewRoot = dom.createDom("li", {"data-id":"11264507", "data-url":"/product/the-whale-vah_print#1=45", 'class': 'wishlist-view-item-node'},
			dom.createDom("div", {"class": "art-container"},
				dom.createDom("form", {"id":"add_375914", "data-type":"add", "method":"post", "action":"/shop/cart"},
					dom.createDom("input", {"type":"hidden", "name":"source", "value":"2"}),
					dom.createDom("input", {"type":"hidden", "name":"form_id", "value":"djWJAuNKvd9A5KN"}),
					dom.createDom("input", {"type":"hidden", "name":"post_id", "value":"375914"}),
					dom.createDom("input", {"type":"hidden", "name":"product_id", "value":"4"}),
					dom.createDom("input", {"type":"hidden", "name":"quantity", "value":"1"}),
					dom.createDom("input", {"type":"hidden", "name":"form_attributes", "value":"1=45"}),
					dom.createDom("input", {"type":"hidden", "name":"form_js", "value":"0"}),
					dom.createDom("input", {"type":"hidden", "name":"form_preview", "value":"0027/p/12941908_7806896-prn01"}),
					dom.createDom("input", {"type":"hidden", "name":"form_url", "value":"/product/the-whale-vah_print#1=45"}),
					dom.createDom("input", {"type":"hidden", "name":"is_wishlist", "value":"false"}),
					dom.createDom("input", {"type":"hidden", "name":"attr_375914size", "value":"45"}),
					dom.createDom("input", {"type":"hidden", "name":"attr_375914custom", "value":"6x7.895"}),
					dom.createDom("input", {"type":"hidden", "name":"attr_375914details", "value":"W6-1b"}),
					//dom.createDom("noscript", {"&lt;input "type":"hidden", "name":"nojs", "value":"1" /&gt;</noscript}),
					dom.createDom("img", {"src":"http://a1.s6img.com/cdn/0027/p/12941908_7806896-prn01_r.jpg"}),
					dom.createDom("button", {"class":"move", "type":"submit", "name":"add_item", "value":"11264507"}, "Move to Cart")
				),
				dom.createDom("form", {"id":"remove_375914", "data-type":"remove", "method":"post", "action":"/shop/cart"},
					dom.createDom("input", {"type":"hidden", "name":"is_wishlist", "value":"true"}),
					dom.createDom("input", {"type":"hidden", "name":"form_url", "value":"/prints"}),
					this.deleteButton = dom.createDom("button", {"class":"delete", "type":"submit", "name":"remove_item", "value":"11264507"}, "×")
				),
				dom.createDom("a", {"class":"bg", "href":"/product/the-whale-vah_print#1=45"}),
				dom.createDom("a", {"href":"/product/the-whale-vah_print#1=45"}, 'The Whale')
			)
		);

		this.decorateInternal(artViewRoot);
	};

	/** @inheritDoc */
	s6.widgets.WishlistItemView.prototype.decorateInternal = function(element){
		this.setElementInternal(element);
		this.addButtonListeners_();
		this.invalidate();
	};

	/** @private */
	s6.widgets.WishlistItemView.prototype.addButtonListeners_ = function (){
		goog.asserts.assert(this.wishlistItemController_, 'Controller required before rendering');

		var wishlistItemController = this.wishlistItemController_;
		if(this.artContainer){
			events.listen(this.artContainer, EventType.MOUSEDOWN, wishlistItemController.onArtContainerClick, false, wishlistItemController);
		}
		if(this.toolContainer){
			events.listen(this.toolContainer, EventType.MOUSEDOWN, wishlistItemController.onToolContainerClick, false, wishlistItemController);
		}

		if(this.deleteButton){
			events.listen(this.deleteButton, EventType.MOUSEDOWN, wishlistItemController.onDeleteButtonClick, false, wishlistItemController);
		}
	};


	s6.widgets.WishlistItemView.prototype.onNodeChanged_ = function(event){
		var node = this.artPieceModel_.getNode();

		jQuery(node).addClass('s6_widgets_art_piece_view_node')

		var parent = jQuery(node).parent()[0];
		this.render(parent);

		goog.dom.appendChild(this.artContainer, node);

		var imageWrap = jQuery(node).find('.image_wrap')[0];
		goog.dom.appendChild(imageWrap, this.toolContainer);
	};

	s6.widgets.WishlistItemView.prototype.onProductTypeChanged_ = function(event){
		if(!this.getContentElement()){
			return;
		}

		var dataAttributeName = 'data-' + goog.string.toSelectorCase(ArtPieceModel_EventType.PRODUCT_TYPE);
		var dataAttributes = {};
		dataAttributes[dataAttributeName] = this.artPieceModel_.getProductType();
		
		goog.dom.setProperties(
			this.getContentElement(),
			dataAttributes
		);
	};

	s6.widgets.WishlistItemView.prototype.onFavoritedEnabledChanged_ = function(event){
		if(!this.isDisposed()){
			this.dispose();
		}
	};
});