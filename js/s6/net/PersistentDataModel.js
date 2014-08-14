goog.require('goog.object');
goog.require('goog.events.EventTarget');
goog.provide('s6.net.PersistentDataModel');

goog.scope(function(){

	/**
	* @constructor
	* @extends {goog.events.EventTarget}
	*/
	s6.net.PersistentDataModel = function(){
		goog.events.EventTarget.call(this);
	};
	goog.inherits(s6.net.PersistentDataModel, goog.events.EventTarget);

	/** 
	 * @param {string} name
	 * @param {*} opt_value
	 * @return {?}
	 */
	s6.widgets.WishlistModel.prototype.getProperty = function(name, opt_value){
		return goog.object.get(this, name, opt_value);
	};

	/** 
	 * @param {string} name
	 * @param {*} value
	 * @return {s6.widgets.IWishlistModel}
	 */
	s6.widgets.WishlistModel.prototype.setProperty = function(name, value){
		goog.asserts.assertString(name);
		goog.asserts.assert(goog.isDef(value));

		var oldvalue = this[name];
		if(oldvalue !== value){
			goog.object.set(this, name, value);
			this.dispatchEvent(name);
		}

		return this;
	};

});