goog.require("goog.events.EventTarget");
goog.require("goog.asserts");
goog.require("goog.object");
goog.require("s6.widgets.IArtPieceModel");
goog.require("s6.widgets.ArtType");

goog.provide("s6.widgets.ArtPieceModel");

goog.scope(function(){
	/**
	 * @constructor
	 * @implements {s6.widgets.IArtPieceModel}
	 * @extends {goog.events.EventTarget}
	 */
	s6.widgets.ArtPieceModel = function(){
		goog.events.EventTarget.call(this);
	};
	goog.inherits(s6.widgets.ArtPieceModel, goog.events.EventTarget);

	/** 
	 * @param {string} name
	 * @param {*} opt_value
	 * @return {?}
	 */
	s6.widgets.ArtPieceModel.prototype.getProperty = function(name, opt_value){
		return goog.object.get(this, name, opt_value);
	};

	/** 
	 * @param {string} name
	 * @param {*} value
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setProperty = function(name, value){
		goog.asserts.assertString(name);
		goog.asserts.assert(goog.isDef(value));

		var oldvalue = this[name];
		if(oldvalue !== value){
			goog.object.set(this, name, value);
			this.dispatchEvent(name);
		}

		return this;
	};

	/** @return {string} */
	s6.widgets.ArtPieceModel.prototype.getProductType = function(){
		return this.getProperty("productType", "");
	};

	/** 
	 * @param {string} productType
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setProductType = function(productType){
		goog.asserts.assertString(productType);
		return this.setProperty("productType", productType);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getHideEnabled = function(){
		return this.getProperty("hideEnabled", false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setHideEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty("hideEnabled", isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getPinEnabled = function(){
		return this.getProperty("pinEnabled", false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setPinEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty("pinEnabled", isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getFavoritedEnabled = function(){
		return this.getProperty("favoritedEnabled", false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setFavoritedEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty("favoritedEnabled", isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getFullScreenEnabled = function(){
		return this.getProperty("fullscreenEnabled", false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setFullScreenEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty("fullscreenEnabled", isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getLikeEnabled = function(){
		return this.getProperty("likeEnabled", false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setLikeEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty("likeEnabled", isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getDislikeEnabled = function(){
		return this.getProperty("dislikeEnabled", false);
	};

	s6.widgets.ArtPieceModel.prototype.setDislikeEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty("dislikeEnabled", isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getFeaturedEnabled = function(){
		return this.getProperty("featuredEnabled", false);
	};

	s6.widgets.ArtPieceModel.prototype.setFeaturedEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty("featuredEnabled", isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getPromoteEnabled = function(){
		return this.getProperty("promoteEnabled", false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setPromoteEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty("promoteEnabled", isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getControlsEnabled = function(){
		return this.getProperty("controlsEnabled", false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setControlsEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty("controlsEnabled", isEnabled);
	};

	/** @return {!Object} */
	s6.widgets.ArtPieceModel.prototype.toJSON = function(){
		return {
			'__class__': 's6.widgets.ArtPieceModel',
			'productType': this.getProductType(),
			'hideEnabled': this.getHideEnabled(),
			'pinEnabled': this.getPinEnabled(),
			'favoritedEnabled': this.getFavoritedEnabled(),
			'fullScreenEnabled': this.getFullScreenEnabled(),
			'likeEnabled': this.getLikeEnabled(),
			'dislikeEnabled': this.getDislikeEnabled(),
			'featuredEnabled': this.getFeaturedEnabled(),
			'promoteEnabled': this.getPromoteEnabled(),
			'controlsEnabled': this.getControlsEnabled()
		};
	};

	/** 
	 * @param  {!Object} json
	 * @return {!s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.fromJSON = function(json){
		this.setProductType(json['productType']);
		this.setHideEnabled(json['hideEnabled']);
		this.setPinEnabled(json['pinEnabled']);
		this.setFavoritedEnabled(json['favoritedEnabled']);
		this.setFullScreenEnabled(json['fullScreenEnabled']);
		this.setLikeEnabled(json['likeEnabled']);
		this.setDislikeEnabled(json['dislikeEnabled']);
		this.setFeaturedEnabled(json['featuredEnabled']);
		this.setPromoteEnabled(json['promoteEnabled']);
		this.setControlsEnabled(json['controlsEnabled']);
		return this;
	};

	/**
	 * @private
	 * @type {string} 
	 */
	s6.widgets.ArtPieceModel.prototype.productType = s6.widgets.ArtType.DEFAULT_PRODUCT_TYPE;
	/**
	 * @private
	 * @type {boolean} 
	 */
	s6.widgets.ArtPieceModel.prototype.hideEnabled = false;
	/**
	 * @private
	 * @type {boolean} 
	 */
	s6.widgets.ArtPieceModel.prototype.pinEnabled = false;
	/**
	 * @private
	 * @type {boolean} 
	 */
	s6.widgets.ArtPieceModel.prototype.favoritedEnabled = false;
	/**
	 * @private
	 * @type {boolean} 
	 */
	s6.widgets.ArtPieceModel.prototype.fullScreenEnabled = false;
	/**
	 * @private
	 * @type {boolean} 
	 */
	s6.widgets.ArtPieceModel.prototype.likeEnabled = false;
	/**
	 * @private
	 * @type {boolean} 
	 */
	s6.widgets.ArtPieceModel.prototype.dislikeEnabled = false;
	/**
	 * @private
	 * @type {boolean} 
	 */
	s6.widgets.ArtPieceModel.prototype.featuredEnabled = false;

	/** 
	 * @param  {!Object} json
	 * @return {!s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.fromJSON = function(json){
		var artPieceModel = new s6.widgets.ArtPieceModel();
		return artPieceModel.fromJSON(json);
	};

	goog.exportSymbol('s6.widgets.ArtPieceModel', s6.widgets.ArtPieceModel);

	goog.exportProperty(s6.widgets.ArtPieceModel, "fromJSON", s6.widgets.ArtPieceModel.fromJSON);

	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "toJSON", s6.widgets.ArtPieceModel.prototype.toJSON);
	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "fromJSON", s6.widgets.ArtPieceModel.prototype.fromJSON);

	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "getProductType", s6.widgets.ArtPieceModel.prototype.getProductType);
	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "setProductType", s6.widgets.ArtPieceModel.prototype.setProductType);

	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "getHideEnabled", s6.widgets.ArtPieceModel.prototype.getHideEnabled);
	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "setHideEnabled", s6.widgets.ArtPieceModel.prototype.setHideEnabled);

	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "getPinEnabled", s6.widgets.ArtPieceModel.prototype.getPinEnabled);
	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "setPinEnabled", s6.widgets.ArtPieceModel.prototype.setPinEnabled);

	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "getFavoritedEnabled", s6.widgets.ArtPieceModel.prototype.getFavoritedEnabled);
	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "setFavoritedEnabled", s6.widgets.ArtPieceModel.prototype.setFavoritedEnabled);

	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "getFullScreenEnabled", s6.widgets.ArtPieceModel.prototype.getFullScreenEnabled);
	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "setFullScreenEnabled", s6.widgets.ArtPieceModel.prototype.setFullScreenEnabled);

	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "getLikeEnabled", s6.widgets.ArtPieceModel.prototype.getLikeEnabled);
	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "setLikeEnabled", s6.widgets.ArtPieceModel.prototype.setLikeEnabled);

	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "getDislikeEnabled", s6.widgets.ArtPieceModel.prototype.getDislikeEnabled);
	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "setDislikeEnabled", s6.widgets.ArtPieceModel.prototype.setDislikeEnabled);

	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "getFeaturedEnabled", s6.widgets.ArtPieceModel.prototype.getFeaturedEnabled);
	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "setFeaturedEnabled", s6.widgets.ArtPieceModel.prototype.setFeaturedEnabled);

	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "getPromoteEnabled", s6.widgets.ArtPieceModel.prototype.getPromoteEnabled);
	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "setPromoteEnabled", s6.widgets.ArtPieceModel.prototype.setPromoteEnabled);

	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "getControlsEnabled", s6.widgets.ArtPieceModel.prototype.getControlsEnabled);
	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "setControlsEnabled", s6.widgets.ArtPieceModel.prototype.setControlsEnabled);
});

goog.provide("s6.widgets.ArtPieceModel.EventType");

goog.scope(function(){
	/** @enum {string} */
	s6.widgets.ArtPieceModel.EventType = {
		PRODUCT_TYPE: "productType",
		HIDE_ENABLED: "hideEnabled",
		PIN_ENABLED: "pinEnabled",
		FAVORITED_ENABLED: "favoritedEnabled",
		FULLSCREEN_ENABLED: "fullscreenEnabled",
		LIKE_ENABLED: "likeEnabled",
		DISLIKE_ENABLED: "dislikeEnabled",
		FEATURED_ENABLED: "featuredEnabled",
		PROMOTE_ENABLED: "promoteEnabled"
	};

	goog.exportSymbol('s6.widgets.ArtPieceModel.EventType', s6.widgets.ArtPieceModel.EventType);
});