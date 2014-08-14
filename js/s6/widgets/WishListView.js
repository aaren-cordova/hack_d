goog.require('s6.widgets.IWishlistModel');
goog.require('s6.widgets.WishlistStateType');
goog.require('goog.dom.DomHelper');
goog.require('goog.ui.Component');
goog.require('goog.asserts');
goog.require('goog.debug.Logger');
goog.require('goog.dom');

goog.provide('s6.widgets.WishlistView');
goog.scope(function(){
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

		goog.events.listen(wishlistModel, WishlistModel_EventType.NODE, this.onNodeChanged_, false, this);
		goog.events.listen(wishlistModel, WishlistModel_EventType.WISHLIST_STATE, this.onWishlistStateChanged_, false, this);
		goog.events.listen(wishlistModel, WishlistModel_EventType.NUM_ITEMS, this.onNumItemsChanged_, false, this);

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
		
		this.openButton = jQuery('a[data-dmc="head-wishlist"]')[0];

		var artViewRoot = dom.createDom(
				'div',
				{'id': 's6-widgets-wishlist-view-root', 'class' : 'wishlist'},

				this.toolContainer = dom.createDom(
					'div',
					{'class': 'tool-container'},
					this.buttonList = dom.createDom(
						'ul',
						{'class' : 'list'},
						dom.createDom(
							'li',
							{'class': 'list-item'},
							this.pencilButton = dom.createDom(
								'div',
								{'class' : 'pencil-button', 'title': 'Pencil View'}
							)
						),
						dom.createDom(
							'li',
							{'class': 'list-item'},
							this.listButton = dom.createDom(
								'div',
								{'class' : 'list-button', 'title': 'List View'}
							)
						),
						dom.createDom(
							'li',
							{'class': 'list-item'},
							this.fullButton = dom.createDom(
								'div',
								{'class' : 'full-button', 'title': 'Full View'}
							)
						),
						dom.createDom(
							'li',
							{'class': 'list-item'},
							this.closeButton = dom.createDom(
								'div',
								{'class' : 'close-button', 'title': 'Close Wishlist'}
							)
						)
					)
				),
				this.wishlistContainer = dom.createDom(
					'div',
					{'id' : 'wishlist-container'}
				)
			)
		;

		this.decorateInternal(artViewRoot);
	};

	/** @inheritDoc */
	s6.widgets.WishlistView.prototype.decorateInternal = function(element){
		this.setElementInternal(element);
		this.addButtonListeners_();
		this.invalidate();
	};

	/** @private */
	s6.widgets.WishlistView.prototype.addButtonListeners_ = function (){
		goog.asserts.assert(this.wishlistController_, 'Controller required before rendering');
		goog.asserts.assert(this.getElement(), 'Root element required before rendering');

		var wishlistController = this.wishlistController_;
		
		goog.events.listen(this.getElement(), EventType.CLICK, wishlistController.onNodeClick, false, wishlistController);

		if(this.closeButton){
			goog.events.listen(this.closeButton, EventType.CLICK, wishlistController.onCloseButtonClick, false, wishlistController);
		}

		if(this.pencilButton){
			goog.events.listen(this.pencilButton, EventType.CLICK, wishlistController.onPencilButtonClick, false, wishlistController);
		}

		if(this.listButton){
			goog.events.listen(this.listButton, EventType.CLICK, wishlistController.onListButtonClick, false, wishlistController);
		}

		if(this.fullButton){
			goog.events.listen(this.fullButton, EventType.CLICK, wishlistController.onFullButtonClick, false, wishlistController);
		}

		if(this.openButton){
			goog.events.listen(this.openButton, EventType.CLICK, wishlistController.onOpenButtonClick, false, wishlistController);
		}
	};

	/** @inheritDoc */
	s6.widgets.WishlistView.prototype.enterDocument = function(){
		goog.base(this, 'enterDocument');
	};

	s6.widgets.WishlistView.prototype.onNodeChanged_ = function(event){
		var node = this.wishlistModel_.getNode();
		goog.asserts.assert(node, 'Node cannot be set to null');
		var wishlistController = this.wishlistController_;
		goog.asserts.assert(wishlistController, 'Controller must exist');

		jQuery(node).addClass('s6-widgets-wishlist-view-node');
		var parent = jQuery(node).parent()[0];
		this.render(parent);


		goog.dom.appendChild(this.wishlistContainer, node);
		
		jQuery(node).find('.close').hide();
	};

	
	s6.widgets.WishlistView.prototype.onWishlistStateChanged_ = function(event){
		var wishlistState = this.wishlistModel_.getWishlistState();
		jQuery(this.getElement()).css('height', '');

		switch(wishlistState){
			case WishlistStateType.CLOSE:
				jQuery(this.getElement()).attr('data-state', 'close');
				break;
			case WishlistStateType.PENCIL:
				jQuery(this.getElement()).attr('data-state', 'pencil');
				break;
			case WishlistStateType.LIST:
				jQuery(this.getElement()).attr('data-state', 'list');
				break;
			case WishlistStateType.FULL:
				jQuery(this.getElement()).attr('data-state', 'full');
				break;
			default:
				goog.asserts.fail("Unknown wishlist state: " + wishlistState);
				return;
		}
	};


	s6.widgets.WishlistView.prototype.onNumItemsChanged_ = function(event){
		var node = this.wishlistModel_.getNode();

		var numItems = this.wishlistModel_.getNumItems()
		jQuery(node).attr('data-count', numItems);
		
		jQuery('#wl-count, [data-dmc="head-wishlist"] .count').each(function(){
			var text = jQuery(this).text() || '';
			text = text.replace(/\d+/, numItems);
			jQuery(this).text(text);
		});
	};
});