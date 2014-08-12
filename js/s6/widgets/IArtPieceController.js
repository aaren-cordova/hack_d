goog.provide('s6.widgets.IArtPieceController');

goog.scope(function(){
	/** @interface */
	s6.widgets.IArtPieceController = function(){};

	/**
	 * @param {s6.widgets.IArtPieceModel} artPieceModel
	 * @return {s6.widgets.IArtPieceController}
	 */
	s6.widgets.IArtPieceController.prototype.setArtPieceModel = function(artPieceModel){};
	
	s6.widgets.IArtPieceController.prototype.onPinButtonClick = function(event){};

	s6.widgets.IArtPieceController.prototype.onFavoriteButtonClick = function(event){};

	s6.widgets.IArtPieceController.prototype.onFullscreenButtonClick = function(event){};

	s6.widgets.IArtPieceController.prototype.onLikeButtonClick = function(event){};

	s6.widgets.IArtPieceController.prototype.onDislikeButtonClick = function(event){};

	s6.widgets.IArtPieceController.prototype.onPromoteButtonClick = function(event){};

	s6.widgets.IArtPieceController.prototype.onArtContainerClick = function(event){};

	s6.widgets.IArtPieceController.prototype.onShoppingCartButtonClick = function(event){};

	s6.widgets.IArtPieceController.prototype.onFeaturedIconClick = function(event){};
	
	s6.widgets.IArtPieceController.prototype.onToolContainerClick = function(event){};
});










