goog.require('goog.object');
goog.require('goog.events.EventTarget');

goog.provide('s6.widgets.IWishlistModel');
goog.scope(function(){

	/**
	 * @interface
	 * @extends {goog.events.Listenable}
	 */
	s6.widgets.IWishlistModel = function(){};

	/** 
	 * @param {string} name
	 * @param {*} opt_value
	 * @return {?}
	 */
	s6.widgets.IWishlistModel.prototype.getProperty = function(name, opt_value){};

	/** 
	 * @param {string} name
	 * @param {*} value
	 * @return {s6.widgets.IWishlistModel}
	 */
	s6.widgets.IWishlistModel.prototype.setProperty = function(name, value){};

	/** @return {number} */
	s6.widgets.IWishlistModel.prototype.getWishlistState = function(){};

	/**
	 * @param {number} state
	 * @return {number}
	 */
	s6.widgets.IWishlistModel.prototype.getIndexOfWishlistState = function(state){};

	/**
	 * @param {number} state
	 * @return {s6.widgets.IWishlistModel} [description]
	 */
	s6.widgets.IWishlistModel.prototype.setWishlistState = function(state){};


	/** @return {Node} */
	s6.widgets.IWishlistModel.prototype.getNode = function(){};

	/** 
	 * @param {Node} wishlistModelNode
	 * @return {s6.widgets.IWishlistModel}
	 */
	s6.widgets.IWishlistModel.prototype.setNode = function(wishlistModelNode){};

	/** 
	* @return {number}
	*/
	s6.widgets.IWishlistModel.prototype.getNumItems = function(){};

	/** 
	* @param {number} index
	* @return {s6.widgets.IArtPieceModel}
	*/
	s6.widgets.IWishlistModel.prototype.getItemAt = function(index){};

	/**
	 * @param {!s6.widgets.IArtPieceModel} item
	 * @return {s6.widgets.IWishlistModel}
	 */
	s6.widgets.IWishlistModel.prototype.addItem = function(item){};

	/** 
	 * @param {!s6.widgets.IArtPieceModel} item
	 * @param {number} index
	 * @return {s6.widgets.IWishlistModel}
	 */
	s6.widgets.IWishlistModel.prototype.addItemAt = function(item, index){};

	/**
	 * @param {!s6.widgets.IArtPieceModel} item
	 * @return {s6.widgets.IWishlistModel}
	 */
	s6.widgets.IWishlistModel.prototype.removeItem = function(item){};

	/**
	 * @param {number} index
	 * @return {number}
	 */
	s6.widgets.IWishlistModel.prototype.removeItemAt = function(index){};

	/** 
	* @param {s6.widgets.IArtPieceModel}
	* @return number
	*/
	s6.widgets.IWishlistModel.prototype.indexOfItem = function(item){};
});