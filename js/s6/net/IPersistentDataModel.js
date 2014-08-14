goog.require('goog.events.Listenable');

goog.provide('s6.net.IPersistentDataModel');
goog.scope(function(){

	/** 
	 * @interface
	 * @extends {goog.events.Listenable}
	 */
	s6.net.IPersistentDataModel = function(){};

	/**  @return {boolean} */
	s6.net.IPersistentDataModel.prototype.isEnabled = function(){};

	/** 
	 * @param {string} name
	 * @return {boolean}
	 */
	s6.net.IPersistentDataModel.prototype.hasProperty = function(name){};

	/**
	* @param {string} name
	* @param {string=} opt_path
	* @param {string=} opt_domain
	* @return {boolean}
	*/
	s6.net.IPersistentDataModel.prototype.deleteProperty = function(name){};

	/** 
	 * @param {string} name
	 * @param {*=} opt_value
	 * @return {?}
	 */
	s6.net.IPersistentDataModel.prototype.getProperty = function(name, opt_value){};

	/**
	* @param {string} name
	* @param {string} value
	* @param {number=} opt_maxAge
	* @param {?string=} opt_path
	* @param {?string=} opt_domain
	* @param {boolean=} opt_secure
	* @return {s6.net.IPersistentDataModel}
	*/
	s6.net.IPersistentDataModel.prototype.setProperty = function(name, value, opt_maxAge, opt_path, opt_domain, opt_secure){

	};
});