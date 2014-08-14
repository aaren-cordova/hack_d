goog.require('goog.object');
goog.require('goog.asserts');
goog.require('goog.events.EventTarget');
goog.require('goog.net.Cookies');

goog.provide('s6.net.CookieModel');
goog.scope(function(){
	var Cookies = goog.net.Cookies;

	/** 
	* @constructor
	* @implements {s6.net.IPersistentDataModel}
	* @param {cookies} cookies The context document to get/set cookies on.
	*/
	s6.net.CookieModel = function(cookies){
		goog.events.EventTarget.call(this);
	};
	goog.inherits(s6.net.CookieModel, goog.events.EventTarget);

	/**  @return {boolean} */
	s6.net.CookieModel.prototype.isEnabled = function(){
		this.cookies_.isEmpty();
	};

	/** 
	* @param {string} name
	* @return {boolean}
	*/
	s6.net.CookieModel.prototype.hasProperty = function(name){
		return this.cookies_.containsKey(name);
	};

	/**
	* @param {string} name
	* @param {string=} opt_path
	* @param {string=} opt_domain
	* @return {boolean}
	*/
	s6.net.CookieModel.prototype.deleteProperty = function(name, opt_path, opt_domain){
		return this.cookies_.remove(name, opt_path, opt_domain);
	};

	/** 
	* @param {string} name
	* @param {*=} opt_value
	* @return {?}
	*/
	s6.net.CookieModel.prototype.getProperty = function(name, opt_value){
		return this.cookies_.get(name, opt_value);
	};

	/** 
	* @param {string} name
	* @param {*} value
	* @return {s6.net.CookieModel}
	*/
	s6.net.CookieModel.prototype.setProperty = function(name, value){
		goog.asserts.assertString(name);
		goog.asserts.assert(goog.isDef(value));

		var oldvalue = this.getProperty(name);
		if(oldvalue !== value){
			this.cookies_.set(name, value);
			this.dispatchEvent(name);
		}

		return this;
	};

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
	* @param {string} value
	* @param {number=} opt_maxAge
	* @param {?string=} opt_path
	* @param {?string=} opt_domain
	* @param {boolean=} opt_secure
	* @return {s6.net.IPersistentDataModel}
	*/
	s6.widgets.WishlistModel.prototype.setProperty = function(name, value){
		
	};
});