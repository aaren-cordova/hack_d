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
	};


	s6.widgets.WishlistController.prototype.onNodeClick = function(event){
		/*
		var wishlistState = this.wishlistModel_.getWishlistState();
		switch(wishlistState){
			case WishlistStateType.FULL:
				this.wishlistModel_.setWishlistState(WishlistStateType.PENCIL);
				break;
			case WishlistStateType.PENCIL:
				this.wishlistModel_.setWishlistState(WishlistStateType.LIST);
				break;
			case WishlistStateType.LIST:
				this.wishlistModel_.setWishlistState(WishlistStateType.FULL);
				break;
			default:
				goog.asserts.fail("Clicked on unsupported wishlist state: " + wishlistState);
				return;
		}
		*/
	};

	s6.widgets.WishlistController.prototype.onOpenButtonClick = function(event){
		s6.widgets.WishlistController.hardClose = false;

		var wishlistState = this.wishlistModel_.getWishlistState();
		switch(wishlistState){
			case WishlistStateType.CLOSE:
			case WishlistStateType.PENCIL:
				this.wishlistModel_.setWishlistState(WishlistStateType.LIST);
				break;
			case WishlistStateType.LIST:
				this.wishlistModel_.setWishlistState(WishlistStateType.FULL);
				break;
		}
		
		event.preventDefault();
		return false;
	};

	s6.widgets.WishlistController.prototype.onCloseButtonClick = function(event){
		s6.widgets.WishlistController.hardClose = true;
		this.wishlistModel_.setWishlistState(WishlistStateType.CLOSE);
	};

	s6.widgets.WishlistController.prototype.onPencilButtonClick = function(event){
		this.wishlistModel_.setWishlistState(WishlistStateType.PENCIL);
	};

	s6.widgets.WishlistController.prototype.onListButtonClick = function(event){
		this.wishlistModel_.setWishlistState(WishlistStateType.LIST);
	};

	s6.widgets.WishlistController.prototype.onFullButtonClick = function(event){
		this.wishlistModel_.setWishlistState(WishlistStateType.FULL);
	};

	s6.widgets.WishlistController.prototype.togglWishlist = function(){
		var wishlistState = this.wishlistModel_.getWishlistState();
		switch(wishlistState){
			case WishlistStateType.CLOSE:
				this.wishlistModel_.setWishlistState(WishlistStateType.LIST)
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
				case WishlistStateType.LIST:
				case WishlistStateType.FULL:
					// Do nothing
					break;
				default:
					goog.asserts.fail("Unknown wishlist state: " + wishlistState);
					return;
			}

		}
	};
});