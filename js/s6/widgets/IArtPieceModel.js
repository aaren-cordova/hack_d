goog.require('goog.events.Listenable');

goog.provide('s6.widgets.IArtPieceModel');

goog.scope(function(){

	/**
	 * @interface 
	 * @extends {goog.events.Listenable}
	*/
	s6.widgets.IArtPieceModel = function(){};


	/** @return {Node} */
	s6.widgets.IArtPieceModel.prototype.getArtPieceNode = function(){};

	/** 
	 * @param {Node} artPieceNode
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.IArtPieceModel.prototype.setArtPieceNode = function(artPieceNode){};

	/** 
	 * @param {string} name
	 * @param {*} opt_value
	 * @return {?}
	 */
	s6.widgets.IArtPieceModel.prototype.getProperty = function(name, opt_value){};

	/** 
	 * @param {string} name
	 * @param {*} value
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.IArtPieceModel.prototype.setProperty = function(name, value){};


	/** @return {*} */
	s6.widgets.IArtPieceModel.prototype.getProductType = function(){};

	/** 
	 * @param {string} productType
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.IArtPieceModel.prototype.setProductType = function(productType){};

	/** @return {boolean} */
	s6.widgets.IArtPieceModel.prototype.getHideEnabled = function(){};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.IArtPieceModel.prototype.setHideEnabled = function(isEnabled){};

	/** @return {boolean} */
	s6.widgets.IArtPieceModel.prototype.getPinEnabled = function(){};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.IArtPieceModel.prototype.setPinEnabled = function(isEnabled){};

	/** @return {boolean} */
	s6.widgets.IArtPieceModel.prototype.getFavoritedEnabled = function(){};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.IArtPieceModel.prototype.setFavoritedEnabled = function(isEnabled){};

	/** @return {boolean} */
	s6.widgets.IArtPieceModel.prototype.getFullScreenEnabled = function(){};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.IArtPieceModel.prototype.setFullScreenEnabled = function(isEnabled){};

	/** @return {boolean} */
	s6.widgets.IArtPieceModel.prototype.getLikeEnabled = function(){};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.IArtPieceModel.prototype.setLikeEnabled = function(isEnabled){};

	/** @return {boolean} */
	s6.widgets.IArtPieceModel.prototype.getDislikeEnabled = function(){};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.IArtPieceModel.prototype.setDislikeEnabled = function(isEnabled){};

	/** @return {boolean} */
	s6.widgets.IArtPieceModel.prototype.getFeaturedEnabled = function(){};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.IArtPieceModel.prototype.setFeaturedEnabled = function(isEnabled){};

	/** @return {boolean} */
	s6.widgets.IArtPieceModel.prototype.getPromoteEnabled = function(){};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.IArtPieceModel.prototype.setPromoteEnabled = function(isEnabled){};

	/** @return {boolean} */
	s6.widgets.IArtPieceModel.prototype.getControlsEnabled = function(){};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.IArtPieceModel.prototype.setControlsEnabled = function(isEnabled){};

	/** @return {boolean} */
	s6.widgets.IArtPieceModel.prototype.getShoppingCartEnabled = function(){};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.IArtPieceModel.prototype.setShoppingCartEnabled = function(isEnabled){};

	/** @return {int} */
	s6.widgets.IArtPieceModel.prototype.getArtPieceID = function(){};

	/** 
	 * @param {int} id
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.IArtPieceModel.prototype.setArtPieceID = function(id){};
});
