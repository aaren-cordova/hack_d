goog.require('s6.widgets.IWishlistModel');
goog.require('s6.widgets.WishlistStateType');
goog.require('goog.dom.DomHelper');
goog.require('goog.ui.Component');
goog.require('goog.asserts');
goog.require('goog.debug.Logger');
goog.require('goog.dom');

goog.require('s6.widgets.WishlistItemController');
goog.require('s6.widgets.IWishlistItemController');
goog.require('s6.widgets.WishlistItemView');

goog.provide('s6.widgets.WishlistView');
goog.scope(function(){
	var EventType = goog.events.EventType;
	var WishlistStateType = s6.widgets.WishlistStateType;
	var WishlistItemController = s6.widgets.WishlistItemController;
	var WishlistItemView = s6.widgets.WishlistItemView;

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

		this.itemControllers_ = [];
		this.itemViews_ = [];
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
		goog.events.listen(wishlistModel, WishlistModel_EventType.ITEMS, this.onItemsChanged_, false, this);

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

				this.wishlistContainer = dom.createDom(
					'div',
					{'id' : 'wishlist-container'}
				),

				this.toolContainer = dom.createDom(
					'div',
					{'class': 'tool-container'},
					dom.createDom(
						"div", 
						{"class": "message icon-star"},
						dom.createDom("span", undefined, "You have ("),
						this.numItemsCounter = dom.createDom("span", {"class": "num-items"}, "0"),
						dom.createDom("span", undefined, ") in your Wishlist")
					),

					this.buttonList = dom.createDom(
						'ul',
						{'class' : 'list'},
						dom.createDom(
							'li',
							{'class': 'list-item'},
							this.pencilButton = dom.createDom(
								'div',
								{'class' : 'pencil-button', 'title': 'Pencil View'},
								dom.createDom('div', {'class':'up-icon icon-up-open-big'}),
								dom.createDom('div', {'class':'down-icon icon-down-open-big'})
							)
						),
						/*
						dom.createDom(
							'li',
							{'class': 'list-item', 'style': 'display:none'},
							this.listButton = dom.createDom(
								'div',
								{'class' : 'list-button', 'title': 'List View'},
								dom.createDom('div', {'class':'up-icon icon-up-open-big'}),
								dom.createDom('div', {'class':'down-icon icon-down-open-big'})
							)
						),
						*/
						dom.createDom(
							'li',
							{'class': 'list-item'},
							this.fullButton = dom.createDom(
								'div',
								{'class' : 'full-button', 'title': 'Full View'},

								dom.createDom('div', {'class':'up-icon  icon-up-open-big'}),
								dom.createDom('div', {'class':'down-icon icon-down-open-big'})
							)
						),
						dom.createDom(
							'li',
							{'class': 'list-item'},
							this.closeButton = dom.createDom(
								'div',
								{'class' : 'close-button icon-cancel', 'title': 'Close Wishlist'}
							)
						)
					)
				),
				this.productOptions = dom.createDom('fieldset', {"class":"product_options"},
					dom.createDom('label', {}, 'View artwork as:'),
					dom.createDom('select', {"id":"attr_232908size", "name":"attr_232908size", "class":"required valid"},
						dom.createDom('option', {"title": "Default", "value": "prn01"}, "Default"),
						dom.createDom('option', {"title": "Framed Art Prints", "value": "frm715bl01"}, "Framed Art Prints"),
						dom.createDom('option', {"title": "Stretched Canvases", "value": "cnv01"}, "Stretched Canvases"),
						dom.createDom('option', {"title": "Laptop and iPad Skins", "value": "sknipd2"}, "Laptop and iPad Skins"),
						dom.createDom('option', {"title": "iPad Cases", "value": "cseipd"}, "iPad Cases"),
						dom.createDom('option', {"title": "iPhone and iPod cases", "value": "caseiphone5"}, "iPhone and iPod cases"),
						dom.createDom('option', {"title": "iPhone and iPod skins", "value": "iphone5a"}, "iPhone and iPod skins"),
						dom.createDom('option', {"title": "Stationary Cards", "value": "stscrd01"}, "Stationary Cards"),
						dom.createDom('option', {"title": "T-Shirts", "value": "tsrmw105"}, "T-Shirts"),
						dom.createDom('option', {"title": "Tank Tops", "value": "tnkw119m"}, "Tank Tops"),
						dom.createDom('option', {"title": "Hoodies", "value": "sswtz010"}, "Hoodies"),
						dom.createDom('option', {"title": "Onesies", "value": "onew110"}, "Onesies"),
						dom.createDom('option', {"title": "Kids T-Shirts", "value": "kidtw212"}, "Kids T-Shirts"),
						dom.createDom('option', {"title": "V Neck T-shirts", "value": "vnkw122m"}, "V Neck T-shirts"),
						dom.createDom('option', {"title": "Biker Tanks", "value": "bktw119m"}, "Biker Tanks"),
						dom.createDom('option', {"title": "Throw Pillows", "value": "plwfr2"}, "Throw Pillows"),
						dom.createDom('option', {"title": "Tote Bags", "value": "bagtote16"}, "Tote Bags"),
						dom.createDom('option', {"title": "Shower Curtains", "value": "crtn"}, "Shower Curtains"),
						dom.createDom('option', {"title": "Duvet Covers", "value": "duvetqueen"}, "Duvet Covers"),
						dom.createDom('option', {"title": "Mugs", "value": "mugs11"}, "Mugs"),
						dom.createDom('option', {"title": "Wall Clocks", "value": "clkfkhk"}, "Wall Clocks"),
						dom.createDom('option', {"title": "Rugs", "value": "rgv23"}, "Rugs"),
						dom.createDom('option', {"title": "Prints", "value": "prn01"}, "Prints")
					)
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

		if(this.toolContainer){
			goog.events.listen(this.toolContainer, EventType.CLICK, wishlistController.onToolContainerClick, false, wishlistController);
		}

		if(this.productOptions){
			goog.events.listen(this.productOptions, EventType.CHANGE, wishlistController.onProductionOptionsChange, false, wishlistController);
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
		this.invalidate();
	};

	s6.widgets.WishlistView.prototype.onWishlistStateChanged_ = function(event){
		var wishlistState = this.wishlistModel_.getWishlistState();

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

	s6.widgets.WishlistView.prototype.onItemsChanged_ = function(event){
	};

	s6.widgets.WishlistView.prototype.onItemAtIndexChange_ = function(event){
		var type, index, model, controller, view;

		type = event.type;
		index = type.replace(/\D+/g, '') | 0;

		model = this.wishlistModel_.getItemAt(index);

		if(this.itemControllers_[index]){
			controller = this.itemControllers_[index];
			
			if(!controller.isDisposed()){
				controller.dispose();
			}
		}

		controller = new WishlistItemController();
		this.itemControllers_[index] = controller;

		if(this.itemViews_[index]){
			view = this.itemViews_[index];

			if(!view.isDisposed()){
				view.dispose();
			}
		}

		view = new WishlistItemView();
		this.itemViews_[index] = view;
		controller.setArtPieceModel(model);

		view.setArtPieceModel(model);
		view.setWishlistItemController(controller);

		view.render(jQuery('#wishlist-container .s6-widgets-wishlist-view-node .wrapper .window .container')[0]);

		this.invalidate();
	};

	s6.widgets.WishlistView.prototype.onNumItemsChanged_ = function(event){
		var node = this.wishlistModel_.getNode();

		var numItems = this.wishlistModel_.getNumItems();

		for(var i = 0; i < numItems; ++i){
			var eventType = WishlistModel_EventType.getItemIndexEvent(i);

			if(!goog.events.hasListener(this.wishlistModel_, eventType, false)){
				goog.events.listen(this.wishlistModel_, eventType, this.onItemAtIndexChange_, false, this);
				this.onItemAtIndexChange_({type:eventType})
			}
		}

		jQuery(node).attr('data-count', numItems);
		
		jQuery('[data-dmc="head-wishlist"] .count').each(function(){
			var text = jQuery(this).text() || '';
			text = text.replace(/\d+/, numItems);
			jQuery(this).text(text);
		});

		jQuery(this.numItemsCounter).text(numItems);
	};

	/**
	 * @private
	 * @type {Array.<s6.widgets.IWishlistItemController>}
	 */
	s6.widgets.WishlistView.prototype.itemControllers_;

	/**
	 * @private
	 * @type {Array.<s6.widgets.WishlistItemView>}
	 */
	s6.widgets.WishlistView.prototype.itemViews_;
});