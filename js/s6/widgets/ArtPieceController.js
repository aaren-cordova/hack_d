goog.require('goog.asserts');
goog.require('s6.widgets.IArtPieceController');
goog.require('s6.widgets.IArtPieceModel');
goog.require('s6.widgets.ArtPieceModel.EventType');
goog.require('s6.widgets.WishlistStateType');
goog.require('s6.widgets.WishlistModel');

goog.provide('s6.widgets.ArtPieceController');
goog.scope(function(){
	var ArtPieceModel_EventType = s6.widgets.ArtPieceModel.EventType;
	var WishlistStateType = s6.widgets.WishlistStateType;
	var WishlistModel = s6.widgets.WishlistModel;

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

		goog.events.listen(artPieceModel, ArtPieceModel_EventType.ART_TYPE, this.onArtTypeChanged_, false, this);
		goog.events.listen(artPieceModel, ArtPieceModel_EventType.FULLSCREEN_ENABLED, this.onFullscreenEnabledChanged_, false, this);
		goog.events.listen(artPieceModel, ArtPieceModel_EventType.SHOPPING_CART_ENABLED, this.onShoppingCartEnabledChanged_, false, this);
		goog.events.listen(artPieceModel, ArtPieceModel_EventType.FAVORITED_ENABLED, this.onFavoritedEnabledChanged_, false, this);
	};
	
	/** @private */
	s6.widgets.ArtPieceController.prototype.onArtTypeChanged_ = function(event){
		var artJSON = this.artPieceModel_.getPostJSON();
		var templateUrl = s6["global"]["image_url_template"];

		var imageURL = templateUrl;
		imageURL = imageURL.replace('{post_image}', artJSON["post_image"]);
		imageURL = imageURL.replace('{product.product_type}', this.artPieceModel_.getArtType());
		imageURL = imageURL.replace('{image_size_template}', s6["global"]["image_size_template"]);

		this.artPieceModel_.setImageURL(imageURL);
	};

	/** @private */
	s6.widgets.ArtPieceController.prototype.onFullscreenEnabledChanged_ = function(event){
	};

	/** @private */
	s6.widgets.ArtPieceController.prototype.onFavoritedEnabledChanged_ = function(event){
		var wishlistModel = WishlistModel.getInstance();

		if(this.artPieceModel_.getFavoritedEnabled()){
			wishlistModel.addItem(this.artPieceModel_);
		}
		else{
			wishlistModel.removeItem(this.artPieceModel_);
		}
	};

	/** @private */
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

	/** @inheritDoc */
	s6.widgets.ArtPieceController.prototype.onFavoriteButtonClick = function(event){
		this.artPieceModel_.setFavoritedEnabled(!this.artPieceModel_.getFavoritedEnabled());
	};

	/** @inheritDoc */
	s6.widgets.ArtPieceController.prototype.onPinButtonClick = function(event){
		this.artPieceModel_.setPinEnabled(!this.artPieceModel_.getPinEnabled());
	};

	/** @inheritDoc */
	s6.widgets.ArtPieceController.prototype.onFullscreenButtonClick = function(event){
		this.artPieceModel_.setFullScreenEnabled(!this.artPieceModel_.getFullScreenEnabled());
	};

	/** @inheritDoc */
	s6.widgets.ArtPieceController.prototype.onLikeButtonClick = function(event){
		this.artPieceModel_.setLikeEnabled(!this.artPieceModel_.getLikeEnabled());
		this.artPieceModel_.setDislikeEnabled(false);
	};

	/** @inheritDoc */
	s6.widgets.ArtPieceController.prototype.onDislikeButtonClick = function(event){
		this.artPieceModel_.setDislikeEnabled(!this.artPieceModel_.getDislikeEnabled());
		this.artPieceModel_.setLikeEnabled(false);
	};

	/** @inheritDoc */
	s6.widgets.ArtPieceController.prototype.onPromoteButtonClick = function(event){
		if(!this.artPieceModel_.getPromoteEnabled()){
			this.artPieceModel_.setNumPromoted(this.artPieceModel_.getNumPromoted() + 1);
			this.artPieceModel_.setPromoteEnabled(true);
		}
		/*
		else{
			if(this.artPieceModel_.getNumPromoted() >= 0){
				this.artPieceModel_.setNumPromoted(this.artPieceModel_.getNumPromoted() -1);
			}
			
			this.artPieceModel_.setPromoteEnabled(false);
		}
		*/
	};

	/** @inheritDoc */
	s6.widgets.ArtPieceController.prototype.onArtContainerClick = function(event){
		// Do nothing
	};

	/** @inheritDoc */
	s6.widgets.ArtPieceController.prototype.onShoppingCartButtonClick = function(event){
		this.artPieceModel_.setShoppingCartEnabled(!this.artPieceModel_.getShoppingCartEnabled());

	};

	/** @inheritDoc */
	s6.widgets.ArtPieceController.prototype.onFeaturedIconClick = function(event){
		// Do nothing
	};

	/** @inheritDoc */
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