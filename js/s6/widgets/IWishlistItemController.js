goog.require('s6.widgets.IArtPieceModel');

goog.provide('s6.widgets.IWishlistItemController');
goog.scope(function(){
	/**
	 * @interface
	 */
	s6.widgets.IWishlistItemController = function(){};

	/**
	 * @param {s6.widgets.IArtPieceModel} artPieceModel
	 * @param {s6.widgets.IWishlistItemController}
	 */
	s6.widgets.IWishlistItemController.prototype.setArtPieceModel = function(artPieceModel){
		this.artPieceModel_ = artPieceModel;
	};

	s6.widgets.IWishlistItemController.prototype.onArtContainerClick = function(event){
		// Do nothing
	};

	s6.widgets.IWishlistItemController.prototype.onToolContainerClick = function(event){
		// Do nothing
	};
});