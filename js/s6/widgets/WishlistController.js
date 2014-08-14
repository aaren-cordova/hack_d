goog.require('goog.asserts');
goog.require('s6.widgets.IWishlistController');
goog.require('s6.widgets.IWishlistModel');
goog.require('s6.widgets.WishlistModel.EventType');
goog.require('s6.widgets.WishlistStateType');

goog.provide('s6.widgets.WishlistController');
goog.scope(function(){
	var WishlistModel_EventType = s6.widgets.WishlistModel.EventType;
	var WishlistStateType = s6.widgets.WishlistStateType;

	/**
	 * @constructor
	 * @implements {s6.widgets.IWishlistController}
	 */
	s6.widgets.WishlistController = function(){
	};
	goog.addSingletonGetter(s6.widgets.WishlistController);

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

	window['wL']['toggle'] = function(){
		s6.widgets.WishlistController.getInstance().togglWishlist();
	};

});