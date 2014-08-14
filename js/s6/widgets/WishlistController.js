goog.require('goog.asserts');
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
	 */
	s6.widgets.WishlistController = function(){
	};
	goog.addSingletonGetter(s6.widgets.WishlistController);

	s6.widgets.WishlistController.prototype.onCloseButtonClick = function(event){
		var persistentDataModel = PersistentDataModel.getInstance();
		persistentDataModel.setProperty('s6.widgets.Wishlist.hasClosed', true);

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

	/**
	 * @param {s6.widgets.IWishlistModel} wishlistModel
	 */
	s6.widgets.WishlistController.prototype.setWishlistModel = function(wishlistModel){
		this.wishlistModel_ = wishlistModel;

		//goog.events.listen(wishlistModel, WishlistModel_EventType.FAVORITED_ENABLED, this.onFavoritedEnabledChanged_, false, this);
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
	/*
	window['wL']['toggle'] = function(){
		s6.widgets.WishlistController.getInstance().togglWishlist();
	};

	*/

	s6.widgets.WishlistController.prototype.onNumItemsChanged_ = function(event){
		var persistentDataModel = PersistentDataModel.getInstance();

		if(!persistentDataModel.getProperty('s6.widgets.Wishlist.hasClosed', false)){
			if(this.wishlistModel_.getNumItems() == 0){
				this.wishlistModel_.setWishlistState(WishlistStateType.CLOSE);
			}
		}
	};

	s6.widgets.WishlistController.prototype.onWishlistClosed_ = function(event){
		events.unlisten(this.wishlistModel_, WishlistModel_EventType.NUM_ITEMS, this.onNumItemsChanged_, false);
	};
});