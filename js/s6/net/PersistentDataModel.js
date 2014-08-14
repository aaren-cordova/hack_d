goog.require('goog.asserts');
goog.require('goog.net.Cookies');
goog.require('goog.events.EventTarget');
goog.require('s6.net.IPersistentDataModel');

// TODO - remove
goog.require('s6.net.CookiesModel');
goog.require('goog.net.Cookies');

goog.provide('s6.net.PersistentDataModel');

goog.scope(function(){

	/**
	* @constructor
	* @extends {goog.events.EventTarget}
	* @implements {s6.net.IPersistentDataModel}
	*/
	s6.net.PersistentDataModel = function(){
		goog.events.EventTarget.call(this);

		this.dataMutators_ = [];

		// TODO - req in args
		this.dataMutators_.push(
			new s6.net.CookiesModel(
				new goog.net.Cookies(document)
			)
		);
	};
	goog.inherits(s6.net.PersistentDataModel, goog.events.EventTarget);

	/** @return {boolean} */
	s6.net.PersistentDataModel.prototype.isEnabled = function(){
		for(var i = 0; i < this.dataMutators_.length; i++){
			var dataMutator = this.dataMutators_[i];
			if(dataMutator.isEnabled()){
				return true;
			}
		}

		return false;
	};

	/** 
	 * @param {string} name
	 * @param {*=} opt_value
	 * @return {?}
	 */
	s6.net.PersistentDataModel.prototype.getProperty = function(name, opt_value){
		goog.asserts.assertString(name);

		for(var i = 0; i < this.dataMutators_.length; i++){
			var dataMutator = this.dataMutators_[i];
			if(dataMutator.isEnabled()){
				return dataMutator.getProperty(name);
			}
		}

		return opt_value;
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
	s6.net.PersistentDataModel.prototype.setProperty = function(name, value, opt_maxAge, opt_path, opt_domain){
		goog.asserts.assertString(name);
		goog.asserts.assert(goog.isDef(value));

		for(var i = 0; i < this.dataMutators_.length; i++){
			var dataMutator = this.dataMutators_[i];
			if(dataMutator.isEnabled()){
				return dataMutator.setProperty(name, value, opt_maxAge, opt_path, opt_domain);
			}
		}

		return this;
	};

	/** 
	 * @param {string} name
	 * @return {boolean}
	 */
	s6.net.PersistentDataModel.prototype.hasProperty = function(name){
		goog.asserts.assertString(name);

		for(var i = 0; i < this.dataMutators_.length; i++){
			var dataMutator = this.dataMutators_[i];
			if(dataMutator.isEnabled()){
				return dataMutator.hasProperty(name);
			}
		}

		return false;
	};

	/**
	* @param {string} name
	* @param {string=} opt_path
	* @param {string=} opt_domain
	* @return {boolean}
	*/
	s6.net.PersistentDataModel.prototype.deleteProperty = function(name, opt_path, opt_domain){
		goog.asserts.assertString(name);

		for(var i = 0; i < this.dataMutators_.length; i++){
			var dataMutator = this.dataMutators_[i];
			if(dataMutator.isEnabled()){
				return dataMutator.deleteProperty(name, opt_path, opt_domain);
			}
		}

		return false;
	};


	/**
	 * @private
	 * @type {Array.<s6.net.IPersistentDataModel>}
	 */
	s6.net.PersistentDataModel.prototype.dataMutators_ = null;
});