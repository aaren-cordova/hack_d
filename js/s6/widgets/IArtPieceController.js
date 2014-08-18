/** @fileOverview Enum of each way a single piece of art can be rendered. */

goog.provide('s6.widgets.IArtPieceController');

goog.scope(function(){
	/** @interface */
	s6.widgets.IArtPieceController = function(){};

	/**
	 * @param {s6.widgets.IArtPieceModel} artPieceModel
	 * @return {s6.widgets.IArtPieceController}
	 */
	s6.widgets.IArtPieceController.prototype.setArtPieceModel = function(artPieceModel){};
	
	/** @public */
	s6.widgets.IArtPieceController.prototype.onPinButtonClick = function(event){};
	
	/** @public */
	s6.widgets.IArtPieceController.prototype.onFavoriteButtonClick = function(event){};
	/** @public */
	s6.widgets.IArtPieceController.prototype.onFullscreenButtonClick = function(event){};
	/** @public */
	s6.widgets.IArtPieceController.prototype.onLikeButtonClick = function(event){};
	/** @public */
	s6.widgets.IArtPieceController.prototype.onDislikeButtonClick = function(event){};
	/** @public */
	s6.widgets.IArtPieceController.prototype.onPromoteButtonClick = function(event){};
	/** @public */
	s6.widgets.IArtPieceController.prototype.onArtContainerClick = function(event){};
	/** @public */
	s6.widgets.IArtPieceController.prototype.onShoppingCartButtonClick = function(event){};
	/** @public */
	s6.widgets.IArtPieceController.prototype.onFeaturedIconClick = function(event){};
	/** @public */
	s6.widgets.IArtPieceController.prototype.onToolContainerClick = function(event){};
});










