goog.require('s6.widgets.IArtPieceModel');
goog.require('s6.widgets.ArtType');
goog.require('s6.widgets.ArtPieceModel.EventType');
goog.require('s6.widgets.WishlistStateType');
goog.require('goog.dom.DomHelper');
goog.require('goog.ui.Component');
goog.require('goog.asserts');
goog.require('goog.debug.Logger');
goog.require('goog.dom');

goog.provide('s6.widgets.WishlistItemView');
goog.scope(function(){
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
			goog.events.unlisten(artPieceModel, ArtPieceModel_EventType.ART_TYPE, this.onArtTypeChanged_, false, this);
		}

		this.artPieceModel_ = artPieceModel;
		
		if(artPieceModel){
			goog.events.listen(artPieceModel, ArtPieceModel_EventType.FAVORITED_ENABLED, this.onFavoritedEnabledChanged_, false, this);
			goog.events.listen(artPieceModel, ArtPieceModel_EventType.ART_TYPE, this.onArtTypeChanged_, false, this);
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
		this.onArtTypeChanged_(null);
	};

	

	/** @inheritDoc */
	s6.widgets.WishlistItemView.prototype.createDom = function(){

		var artPieceModel = this.artPieceModel_;
		var artJSON = artPieceModel.getPostJSON();
		var dom = this.dom_;
		// TODOL get id
		
		goog.events
		// TODOM
		var size = '45';
		var formAttributes = '1=' + size;
		var link = artJSON["link"].replace(/[\#\?].*/, '');
		var id = "11264507";

		var templateUrl = s6.global.image_url_template;
		console.log(templateUrl);
		console.log(artJSON);


		var imageUrl = templateUrl;
		var imageUrl = imageUrl.replace('{post_image}', artJSON["post_image"]);
		imageUrl = imageUrl.replace('{product.product_type}', artPieceModel.getArtType());
		imageUrl = imageUrl.replace('{image_size_template}', s6.global["image_size_template"]);

		var artViewRoot = dom.createDom("li", {"data-id":id, "data-url": link + "#" + formAttributes, 'class': 'wishlist-view-item-node'},
			dom.createDom("div", {"class": "art-container"},
				dom.createDom("form", {"id":"add_" + artJSON["post_id"], "data-type":"add", "method":"post", "action":"/shop/cart"},
					dom.createDom("input", {"type":"hidden", "name":"source", "value":"2"}),
					dom.createDom("input", {"type":"hidden", "name":"form_id", "value":"djWJAuNKvd9A5KN"}),
					dom.createDom("input", {"type":"hidden", "name":"post_id", "value":artJSON["post_id"]}),
					dom.createDom("input", {"type":"hidden", "name":"product_id", "value":artJSON["product_id"]}),
					dom.createDom("input", {"type":"hidden", "name":"quantity", "value":"1"}),
					dom.createDom("input", {"type":"hidden", "name":"form_attributes", "value":formAttributes}),
					dom.createDom("input", {"type":"hidden", "name":"form_js", "value":"0"}),
					dom.createDom("input", {"type":"hidden", "name":"form_preview", "value": artJSON["post_image"] + "-prn01"}),
					dom.createDom("input", {"type":"hidden", "name":"form_url", "value":link + "#" + formAttributes}),
					dom.createDom("input", {"type":"hidden", "name":"is_wishlist", "value":"false"}),
					dom.createDom("input", {"type":"hidden", "name":"attr_375914size", "value":size}),
					dom.createDom("input", {"type":"hidden", "name":"attr_375914custom", "value":"6x7.895"}),
					dom.createDom("input", {"type":"hidden", "name":"attr_375914details", "value":"W6-1b"}),
					//dom.createDom("noscript", {"&lt;input "type":"hidden", "name":"nojs", "value":"1" /&gt;</noscript}),
					this.artWorkImage = dom.createDom("img", {"src":imageUrl}),
					dom.createDom("button", {"class":"move", "type":"submit", "name":"add_item", "value":id}, "Move to Cart")
				),
				dom.createDom("form", {"id":"remove_375914", "data-type":"remove", "method":"post", "action":"/shop/cart"},
					dom.createDom("input", {"type":"hidden", "name":"is_wishlist", "value":"true"}),
					dom.createDom("input", {"type":"hidden", "name":"form_url", "value":"/prints"}),
					this.deleteButton = dom.createDom("button", {"class":"delete", "type":"submit", "name":"remove_item", "value":id}, "×")
				),
				dom.createDom("a", {"class":"bg", "href":link + "#" + formAttributes}),
				dom.createDom("a", {"href":link + "#" + formAttributes}, artJSON["post_title"])
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
			goog.events.listen(this.artContainer, EventType.MOUSEDOWN, wishlistItemController.onArtContainerClick, false, wishlistItemController);
		}
		if(this.toolContainer){
			goog.events.listen(this.toolContainer, EventType.MOUSEDOWN, wishlistItemController.onToolContainerClick, false, wishlistItemController);
		}

		if(this.deleteButton){
			goog.events.listen(this.deleteButton, EventType.MOUSEDOWN, wishlistItemController.onDeleteButtonClick, false, wishlistItemController);
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

	s6.widgets.WishlistItemView.prototype.onArtTypeChanged_ = function(event){
		if(!this.getContentElement()){
			return;
		}

		var dataAttributeName = 'data-' + goog.string.toSelectorCase(ArtPieceModel_EventType.ART_TYPE);
		var dataAttributes = {};
		dataAttributes[dataAttributeName] = this.artPieceModel_.getArtType();
		
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