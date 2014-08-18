goog.require('goog.asserts');
goog.require('goog.Disposable');

goog.require('s6.net.PersistentDataModel');
goog.require('s6.widgets.IWishlistController');
goog.require('s6.widgets.IWishlistModel');
goog.require('s6.widgets.WishlistModel.EventType');
goog.require('s6.widgets.WishlistStateType');
goog.provide('s6.widgets.WishlistController');

goog.scope(function(){
	var PersistentDataModel = s6.net.PersistentDataModel;
	var WishlistModel_EventType = s6.widgets.WishlistModel.EventType;
	var WishlistStateType = s6.widgets.WishlistStateType;

	/**
	 * @constructor
	 * @implements {s6.widgets.IWishlistController}
	 * @extends {s6.widgets.Disposable }
	 */
	s6.widgets.WishlistController = function(){
		goog.Disposable.call(this);

		this.persistentDataModel_ = new PersistentDataModel();
	};
	goog.inherits(s6.widgets.WishlistController, goog.Disposable);
	goog.addSingletonGetter(s6.widgets.WishlistController);

	/**
	 * @param {s6.widgets.IWishlistModel} wishlistModel
	 */
	s6.widgets.WishlistController.prototype.setWishlistModel = function(wishlistModel){
		this.wishlistModel_ = wishlistModel;
		goog.events.listen(wishlistModel, WishlistModel_EventType.NUM_ITEMS, this.onNumItemsChanged_, false, this);
		goog.events.listen(wishlistModel, WishlistModel_EventType.ITEMS, this.onItemsChanged_, false, this);
	};

	/** @inheritDoc */
	s6.widgets.WishlistController.prototype.onNodeClick = function(event){
	};

	/** @inheritDoc */
	s6.widgets.WishlistController.prototype.onOpenButtonClick = function(event){
		s6.widgets.WishlistController.hardClose = false;

		var wishlistState = this.wishlistModel_.getWishlistState();
		switch(wishlistState){
			case WishlistStateType.CLOSE:
			case WishlistStateType.PENCIL:
				if(this.wishlistModel_.getNumItems() > 6){
					this.wishlistModel_.setWishlistState(WishlistStateType.FULL);
				}
				else{
					this.wishlistModel_.setWishlistState(WishlistStateType.LIST);
				}
				break;
			case WishlistStateType.LIST:
				if(this.wishlistModel_.getNumItems()){
					if(this.wishlistModel_.getNumItems() > 6){
						this.wishlistModel_.setWishlistState(WishlistStateType.FULL);
					}
				}
				break;
			case WishlistStateType.FULL:
				if(this.wishlistModel_.getNumItems()){
					this.wishlistModel_.setWishlistState(WishlistStateType.PENCIL);
				}
				break;
		}
		
		event.preventDefault();
		return false;
	};

	/** @inheritDoc */
	s6.widgets.WishlistController.prototype.onToolContainerClick = function(event){
		console.log('onToolContainerClick',event.target)

		if(jQuery('#s6-widgets-wishlist-view-root .tool-container').length){
			if(jQuery('#s6-widgets-wishlist-view-root .tool-container')[0] !== event.target )  { 
				return;
			}
		}

		var wishlistState = this.wishlistModel_.getWishlistState();
		switch(wishlistState){
			case WishlistStateType.CLOSE:
			case WishlistStateType.PENCIL:
				if(this.wishlistModel_.getNumItems() > 6){
					this.wishlistModel_.setWishlistState(WishlistStateType.FULL);
				}
				else{
					this.wishlistModel_.setWishlistState(WishlistStateType.LIST);
				}
				break;
			case WishlistStateType.LIST:
				if(this.wishlistModel_.getNumItems() > 6){
					this.wishlistModel_.setWishlistState(WishlistStateType.FULL);
				}
				break;
			case WishlistStateType.FULL:
				if(this.wishlistModel_.getNumItems() > 5){
					this.wishlistModel_.setWishlistState(WishlistStateType.LIST);
				}
				else if(!this.wishlistModel_.getNumItems()){
					this.wishlistModel_.setWishlistState(WishlistStateType.PENCIL);
				}
				break;
		}
	};

	/** @inheritDoc */
	s6.widgets.WishlistController.prototype.onCloseButtonClick = function(event){
		s6.widgets.WishlistController.hardClose = true;
		this.wishlistModel_.setWishlistState(WishlistStateType.CLOSE);
	};

	/** @inheritDoc */
	s6.widgets.WishlistController.prototype.onPencilButtonClick = function(event){
		this.wishlistModel_.setWishlistState(WishlistStateType.PENCIL);

		event.stopPropagation();
		return false;
	};

	/** @inheritDoc */
	s6.widgets.WishlistController.prototype.onListButtonClick = function(event){
		this.wishlistModel_.setWishlistState(WishlistStateType.LIST);
		event.stopPropagation();
		return false;
	};

	/** @inheritDoc */
	s6.widgets.WishlistController.prototype.onFullButtonClick = function(event){
		this.wishlistModel_.setWishlistState(WishlistStateType.FULL);
		event.stopPropagation();
		return false;
	};

	/** @inheritDoc */
	s6.widgets.WishlistController.prototype.onProductionOptionsChange = function(event){
		this.invalidate();
	};

	/** @public */
	s6.widgets.WishlistController.prototype.invalidate = function(){
		var artType = jQuery('.product_options').children('select').val();
		if(artType){
			var numItems = this.wishlistModel_.getNumItems();
			for(var i = 0; i < numItems; ++i){
				var artPieceModel = this.wishlistModel_.getItemAt(i);
				artPieceModel.setArtType(artType);
			}
		}
	};

	/** @private */
	s6.widgets.WishlistController.prototype.onItemsChanged_ = function(event){
		this.invalidate();
	};

	/** @public */
	s6.widgets.WishlistController.prototype.togglWishlist = function(){
		var wishlistState = this.wishlistModel_.getWishlistState();
		switch(wishlistState){
			case WishlistStateType.CLOSE:
				this.wishlistModel_.setWishlistState(WishlistStateType.FULL);
				break;
			case WishlistStateType.PENCIL:
			case WishlistStateType.LIST:
			case WishlistStateType.FULL:
				this.wishlistModel_.setWishlistState(WishlistStateType.CLOSE);
				break;
			default:
				goog.asserts.fail("Unknown wishlist state: " + wishlistState);
				return;
		}
	};

	/** @private */
	s6.widgets.WishlistController.prototype.onNumItemsChanged_ = function(event){
		if(this.wishlistModel_.getNumItems() == 0) {
			this.wishlistModel_.setWishlistState(WishlistStateType.CLOSE);
		}
		else if(!s6.widgets.WishlistController.hardClose) {
			var wishlistState = this.wishlistModel_.getWishlistState();
			switch(wishlistState){
				case WishlistStateType.CLOSE:
					this.wishlistModel_.setWishlistState(WishlistStateType.PENCIL)
					break;
				case WishlistStateType.PENCIL:
					// do nothing
					break;
				case WishlistStateType.LIST:
					if(this.wishlistModel_.getNumItems() > 6){
						this.wishlistModel_.setWishlistState(WishlistStateType.FULL);
					}
					break;
				case WishlistStateType.FULL:
					if(this.wishlistModel_.getNumItems() > 6){
						// Do nothing.
					}
					else if(this.wishlistModel_.getNumItems() > 0){
						this.wishlistModel_.setWishlistState(WishlistStateType.LIST);
					}
					break;
				default:
					goog.asserts.fail("Unknown wishlist state: " + wishlistState);
					return;
			}

		}
	};
});