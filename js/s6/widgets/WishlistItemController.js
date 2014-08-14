goog.require('goog.asserts');
goog.require('s6.widgets.IWishlistItemController');
goog.require('goog.Disposable');

goog.require('s6.widgets.IArtPieceModel');
goog.require('s6.widgets.ArtPieceModel.EventType');
goog.require('s6.widgets.WishlistStateType');
goog.require('s6.widgets.WishlistModel');

goog.provide('s6.widgets.WishlistItemController');
goog.scope(function(){
	var ArtPieceModel_EventType = s6.widgets.ArtPieceModel.EventType;
	var WishlistStateType = s6.widgets.WishlistStateType;
	var WishlistModel = s6.widgets.WishlistModel;

	/**
	 * @constructor
	 * @implements {s6.widgets.IWishlistItemController}
	 * @implements {goog.Disposable}
	 */
	s6.widgets.WishlistItemController = function(){
		goog.Disposable.call(this);
	};
	goog.inherits(s6.widgets.WishlistController, goog.Disposable)
	/**
	 * @param {s6.widgets.IArtPieceModel} artPieceModel
	 * @param {s6.widgets.IWishlistItemController}
	 */
	s6.widgets.WishlistItemController.prototype.setArtPieceModel = function(artPieceModel){
		if(artPieceModel){
			goog.events.unlisten(artPieceModel, ArtPieceModel_EventType.FAVORITED_ENABLED, this.onFavoritedEnabledChanged_, false);
		}

		this.artPieceModel_ = artPieceModel;
		
		if(artPieceModel){
			goog.events.listen(artPieceModel, ArtPieceModel_EventType.FAVORITED_ENABLED, this.onFavoritedEnabledChanged_, false, this);
		}

		return this;
	};

	s6.widgets.WishlistItemController.prototype.onArtContainerClick = function(event){
		// Do nothing
	};

	s6.widgets.WishlistItemController.prototype.onToolContainerClick = function(event){
		// Do nothing
	};

	s6.widgets.WishlistItemController.prototype.onDeleteButtonClick = function(event){
		this.artPieceModel_.setFavoritedEnabled(false);
	};

	s6.widgets.WishlistItemController.prototype.onFavoritedEnabledChanged_ = function(event){
		alert('onFavoritedEnabledChanged_')
		var wishlistModel = WishlistModel.getInstance();

		if(!this.artPieceModel_.getFavoritedEnabled()){
			if(wishlistModel.indexOfItem(this.artPieceModel_) !== -1){
				wishlistModel.removeItem(this.artPieceModel_);
			}

			if(!this.isDisposed()){
				this.dispose();
			}
		}
	};
});