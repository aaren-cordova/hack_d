goog.require('goog.asserts');
goog.require('s6.widgets.IArtPieceController');
goog.require('s6.widgets.IArtPieceModel');
goog.require('s6.widgets.ArtPieceModel.EventType');
goog.require('s6.widgets.WishlistStateType');

goog.provide('s6.widgets.ArtPieceController');
goog.scope(function(){
	var ArtPieceModel_EventType = s6.widgets.ArtPieceModel.EventType;
	var WishlistStateType = s6.widgets.WishlistStateType;

	/**
	 * @constructor
	 * @implements {s6.widgets.IArtPieceController}
	 */
	s6.widgets.ArtPieceController = function(){
	};

	/**
	 * @param {s6.widgets.IArtPieceModel} artPieceModel
	 */
	s6.widgets.ArtPieceController.prototype.setArtPieceModel = function(artPieceModel){
		this.artPieceModel_ = artPieceModel;

		goog.events.listen(artPieceModel, ArtPieceModel_EventType.FULLSCREEN_ENABLED, this.onFullscreenEnabledChanged_, false, this);
		goog.events.listen(artPieceModel, ArtPieceModel_EventType.SHOPPING_CART_ENABLED, this.onShoppingCartEnabledChanged_, false, this);
		goog.events.listen(artPieceModel, ArtPieceModel_EventType.FAVORITED_ENABLED, this.onFavoritedEnabledChanged_, false, this);

		this.artPieceModel_.setFavoritedEnabled(!this.artPieceModel_.getFavoritedEnabled());
	};
	

	s6.widgets.ArtPieceController.prototype.onFullscreenEnabledChanged_ = function(event){
	};

	s6.widgets.ArtPieceController.prototype.onFavoritedEnabledChanged_ = function(event){
		var artPieceModel = this.artPieceModel_;

		if(artPieceModel.getWishlistState() === WishlistStateType.CLOSE){
			goog.events.unlisten(artPieceModel, ArtPieceModel_EventType.FAVORITED_ENABLED, this.onFavoritedEnabledChanged_);
			artPieceModel.setWishlistState(WishlistStateType.PENCIL)
		}
	};

	s6.widgets.ArtPieceController.prototype.onShoppingCartEnabledChanged_ = function(event){
		if(this.artPieceModel_.getShoppingCartEnabled()){
			this.addToShoppingCart_();
		}
		else{
			this.removeFromShoppingCart_();
		}
	};


	

	/** @private */
	s6.widgets.ArtPieceController.prototype.addToShoppingCart_ = function(){
		// TODO
	};

	/** @private */
	s6.widgets.ArtPieceController.prototype.removeFromShoppingCart_ = function(){
		// TODO
	};

	s6.widgets.ArtPieceController.prototype.onFavoriteButtonClick = function(event){
		this.artPieceModel_.setFavoritedEnabled(!this.artPieceModel_.getFavoritedEnabled());
	};

	s6.widgets.ArtPieceController.prototype.onPinButtonClick = function(event){
		this.artPieceModel_.setPinEnabled(!this.artPieceModel_.getPinEnabled());
	};
	
	
	s6.widgets.ArtPieceController.prototype.onFullscreenButtonClick = function(event){
		this.artPieceModel_.setFullScreenEnabled(!this.artPieceModel_.getFullScreenEnabled());
	};

	s6.widgets.ArtPieceController.prototype.onLikeButtonClick = function(event){
		this.artPieceModel_.setLikeEnabled(!this.artPieceModel_.getLikeEnabled());
		this.artPieceModel_.setDislikeEnabled(false);
	};
	
	s6.widgets.ArtPieceController.prototype.onDislikeButtonClick = function(event){
		this.artPieceModel_.setDislikeEnabled(!this.artPieceModel_.getDislikeEnabled());
		this.artPieceModel_.setLikeEnabled(false);
	};

	s6.widgets.ArtPieceController.prototype.onPromoteButtonClick = function(event){
		this.artPieceModel_.setPromoteEnabled(!this.artPieceModel_.getPromoteEnabled());
	};

	s6.widgets.ArtPieceController.prototype.onArtContainerClick = function(event){
		// Do nothing
	};

	s6.widgets.ArtPieceController.prototype.onShoppingCartButtonClick = function(event){
		this.artPieceModel_.setShoppingCartEnabled(!this.artPieceModel_.getShoppingCartEnabled());

	};

	s6.widgets.ArtPieceController.prototype.onFeaturedIconClick = function(event){
		// Do nothing
	};

	s6.widgets.ArtPieceController.prototype.onToolContainerClick = function(event){
		// Do nothing
	};



	goog.exportProperty(s6.widgets.ArtPieceController.prototype, 'onPinButtonClick', s6.widgets.ArtPieceController.prototype.onPinButtonClick);
	goog.exportProperty(s6.widgets.ArtPieceController.prototype, 'onFavoriteButtonClick', s6.widgets.ArtPieceController.prototype.onFavoriteButtonClick);
	goog.exportProperty(s6.widgets.ArtPieceController.prototype, 'onFullscreenButtonClick', s6.widgets.ArtPieceController.prototype.onFullscreenButtonClick);
	goog.exportProperty(s6.widgets.ArtPieceController.prototype, 'onLikeButtonClick', s6.widgets.ArtPieceController.prototype.onLikeButtonClick);
	goog.exportProperty(s6.widgets.ArtPieceController.prototype, 'onDislikeButtonClick', s6.widgets.ArtPieceController.prototype.onDislikeButtonClick);
	goog.exportProperty(s6.widgets.ArtPieceController.prototype, 'onPromoteButtonClick', s6.widgets.ArtPieceController.prototype.onPromoteButtonClick);
});