goog.require('s6.widgets.IArtPieceController');
goog.require('s6.widgets.IArtPieceModel');

goog.provide('s6.widgets.ArtPieceController');
goog.scope(function(){
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
	};

	s6.widgets.ArtPieceController.prototype.onPinButtonClick = function(event){
		this.artPieceModel_.setPinEnabled(!this.artPieceModel_.getPinEnabled());
	};
	
	s6.widgets.ArtPieceController.prototype.onFavoriteButtonClick = function(event){
		this.artPieceModel_.setFavoritedEnabled(!this.artPieceModel_.getFavoritedEnabled());
	};
	
	s6.widgets.ArtPieceController.prototype.onFullScreenButtonClick = function(event){
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

	goog.exportProperty(s6.widgets.ArtPieceController.prototype, 'onPinButtonClick', s6.widgets.ArtPieceController.prototype.onPinButtonClick);
	goog.exportProperty(s6.widgets.ArtPieceController.prototype, 'onFavoriteButtonClick', s6.widgets.ArtPieceController.prototype.onFavoriteButtonClick);
	goog.exportProperty(s6.widgets.ArtPieceController.prototype, 'onFullScreenButtonClick', s6.widgets.ArtPieceController.prototype.onFullScreenButtonClick);
	goog.exportProperty(s6.widgets.ArtPieceController.prototype, 'onLikeButtonClick', s6.widgets.ArtPieceController.prototype.onLikeButtonClick);
	goog.exportProperty(s6.widgets.ArtPieceController.prototype, 'onDislikeButtonClick', s6.widgets.ArtPieceController.prototype.onDislikeButtonClick);
	goog.exportProperty(s6.widgets.ArtPieceController.prototype, 'onPromoteButtonClick', s6.widgets.ArtPieceController.prototype.onPromoteButtonClick);
});