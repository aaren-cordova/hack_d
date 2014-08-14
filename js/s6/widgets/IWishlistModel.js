goog.require('goog.object');
goog.require('goog.events.EventTarget');

goog.provide('s6.widgets.IWishlistModel');
goog.scope(function(){

	/**
	 * @interface
	 * @extends {goog.events.Listenable}
	 */
	s6.widgets.IWishlistModel = function(){;}

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

	s6.widgets.IWishlistModel.prototype.getWishlistState = function(){};

	/**
	* @param {number} mode
	* @return {s6.widgets.IWishlistModel} [description]
	*/
	s6.widgets.IWishlistModel.prototype.setWishlistState = function(mode){};

	/**
	* @return {s6.widgets.IWishlistModel}
	*/
	s6.widgets.IWishlistModel.prototype.invalidateWislistItems = function(){};
});