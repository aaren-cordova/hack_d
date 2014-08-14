goog.require('s6.widgets.IWishlistModel');
goog.require('s6.widgets.WishlistStateType');
goog.require('goog.dom.DomHelper');
goog.require('goog.ui.Component');
goog.require('goog.asserts');
goog.require('goog.debug.Logger');
goog.require('goog.dom');

goog.provide('s6.widgets.WishlistView');
goog.scope(function(){
	var events = goog.events;
	var EventType = goog.events.EventType;
	var WishlistStateType = s6.widgets.WishlistStateType;

	var WishlistModel_EventType = s6.widgets.WishlistModel.EventType;
	var Logger = goog.debug.Logger;
	var Component = goog.ui.Component;

	/**
	 * @constructor
	 * @extends {goog.ui.Component}
	 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
	 */
	s6.widgets.WishlistView = function(opt_domHelper){
		Component.call(this, opt_domHelper);
	};
	goog.inherits(s6.widgets.WishlistView, Component);
	goog.addSingletonGetter(s6.widgets.WishlistView);

	/**
	 * @param {s6.widgets.IWishlistModel} wishlistModel
	 * @return {s6.widgets.WishlistView}
	 */
	s6.widgets.WishlistView.prototype.setWishlistModel = function(wishlistModel){
		this.wishlistModel_ = wishlistModel;

		events.listen(wishlistModel, WishlistModel_EventType.WISHLIST_NODE, this.onWishlistNodeChanged_, false, this);
		events.listen(wishlistModel, WishlistModel_EventType.WISHLIST_STATE, this.onWishlistStateChanged_, false, this);
		events.listen(wishlistModel, WishlistModel_EventType.NUM_ITEMS, this.onNumItemsChanged_, false, this);



		return this;
	};

	/**
	 * @param {s6.widgets.IWishlistController} wishlistController
	 * @return {s6.widgets.WishlistView}
	 */
	s6.widgets.WishlistView.prototype.setWishlistController = function(wishlistController){
		this.wishlistController_ = wishlistController;
		return this;
	};

	s6.widgets.WishlistView.prototype.invalidate = function(){
		this.onWishlistStateChanged_(null);
		this.onNumItemsChanged_(null);
	};

	/** @inheritDoc */
	s6.widgets.WishlistView.prototype.createDom = function(){
		var dom = this.dom_;
		var artViewRoot = dom.createDom(
				'div',
				{'id': this.makeId('wishlist'), 'class' : 'art-piece'},
				
				this.wishlistContainer = dom.createDom(
					'div',
					{'class' : 'wishlist-container'}
				),
				this.toolContainer = dom.createDom(
					'div',
					{'class' : 'tool-container'},
					this.directionIcon = dom.createDom(
						'div',
						{'class' : 'direction-icon'}
					),
					this.pencilButton = dom.createDom(
						'div',
						{'class' : 'pencil-button'}
					),
					this.listButton = dom.createDom(
						'div',
						{'class' : 'list-button'}
					),
					this.fullButton = dom.createDom(
						'div',
						{'class' : 'full-button'}
					),
					this.closeButton = dom.createDom(
						'div',
						{'class' : 'close-button'}
					)
				)
			)
		;

		this.addButtonListeners_();
		this.decorateInternal(artViewRoot);
	};

	/** @inheritDoc */
	s6.widgets.WishlistView.prototype.decorateInternal = function(element){
		this.setElementInternal(element);
		this.invalidate();
	};

	/** @private */
	s6.widgets.WishlistView.prototype.addButtonListeners_ = function (){
		goog.asserts.assert(this.wishlistController_, 'Controller required before rendering');

		var wishlistController = this.wishlistController_;
		
		if(this.closeButton){
			events.listen(this.closeButton, EventType.CLICK, wishlistController.onCloseButtonClick, false, wishlistController);
		}

		if(this.pencilButton){
			events.listen(this.pencilButton, EventType.CLICK, wishlistController.onPencilButtonClick, false, wishlistController);
		}

		if(this.listButton){
			events.listen(this.listButton, EventType.CLICK, wishlistController.onListButtonClick, false, wishlistController);
		}

		if(this.fullButton){
			events.listen(this.fullButton, EventType.CLICK, wishlistController.onFullButtonClick, false, wishlistController);
		}
	};

	/** @inheritDoc */
	s6.widgets.WishlistView.prototype.enterDocument = function(){
		goog.base(this, 'enterDocument');
	};

	s6.widgets.WishlistView.prototype.onWishlistNodeChanged_ = function(event){
		var wishlistNode = this.wishlistModel_.getWishlistNode();
		var parent = jQuery(wishlistNode).parent()[0];
		this.render(parent);
		console.log('wishlistNode', wishlistNode);
		goog.dom.appendChild(this.wishlistContainer, wishlistNode);

		var imageWrap = jQuery(wishlistNode).find('.wrapper')[0];
		goog.dom.appendChild(imageWrap, this.toolContainer);
	};

	
	s6.widgets.WishlistView.prototype.onWishlistStateChanged_ = function(event){
		var wishlistState = this.wishlistModel_.getWishlistState();
		switch(wishlistState){
			case WishlistStateType.CLOSE:
				jQuery(this.wishlistContainer).attr('data-state', 'close');
				break;
			case WishlistStateType.PENCIL:
				jQuery(this.wishlistContainer).attr('data-state', 'pencil');
				break;
			case WishlistStateType.LIST:
				jQuery(this.wishlistContainer).attr('data-state', 'list');
				break;
			case WishlistStateType.FULL:
				jQuery(this.wishlistContainer).attr('data-state', 'full');
				break;
			default:
				goog.asserts.fail("Unknown wishlist state: " + wishlistState);
				return;
		}
	};
	s6.widgets.WishlistView.prototype.onNumItemsChanged_ = function(event){
		// TODO
	};

});