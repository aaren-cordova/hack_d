goog.require("goog.events.EventTarget");
goog.require("goog.asserts");
goog.require("goog.json");
goog.require("goog.object");
goog.require("s6.widgets.IArtPieceModel");
goog.require("s6.widgets.ArtType");
goog.provide("s6.widgets.ArtPieceModel");
goog.provide("s6.widgets.ArtPieceModel.EventType");

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

	/** @enum {string} */
	s6.widgets.ArtPieceModel.EventType = {
		"ART_TYPE": "artType",
		"HIDE_ENABLED": "hideEnabled",
		"PIN_ENABLED": "pinEnabled",
		"FAVORITED_ENABLED": "favoritedEnabled",
		"FULLSCREEN_ENABLED": "fullscreenEnabled",
		"LIKE_ENABLED": "likeEnabled",
		"DISLIKE_ENABLED": "dislikeEnabled",
		"FEATURED_ENABLED": "featuredEnabled",
		"NUM_PROMOTED": "numPromoted",
		"SHOPPING_CART_ENABLED": "shoppingCartEnabled",
		"NODE": "node",
		"PROMOTE_ENABLED": "promoteEnabled",
		"CONTROLS_ENABLED":"controlsEnabled",
		"ART_PIECE_ID":"artPieceId",
		"IMAGE_URL": "imageURL",
		"POST_JSON": "post_json"
	};

	goog.exportSymbol("s6.widgets.ArtPieceModel.EventType", s6.widgets.ArtPieceModel.EventType);

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

	/** @return {Node} */
	s6.widgets.ArtPieceModel.prototype.getNode = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.NODE, null);
	};

	/** 
	 * @param {Node} node
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setNode = function(node){
		goog.asserts.assert(node instanceof Node);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.NODE, node);
	};

	/** @return {string} */
	s6.widgets.ArtPieceModel.prototype.getArtType = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.ART_TYPE, "");
	};

	/** 
	 * @param {string} artType
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setArtType = function(artType){
		goog.asserts.assertString(artType);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.ART_TYPE, artType);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getHideEnabled = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.HIDE_ENABLED, false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setHideEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.HIDE_ENABLED, isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getPinEnabled = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.PIN_ENABLED, false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setPinEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.PIN_ENABLED, isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getFavoritedEnabled = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.FAVORITED_ENABLED, false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setFavoritedEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.FAVORITED_ENABLED, isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getFullScreenEnabled = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.FULLSCREEN_ENABLED, false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setFullScreenEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.FULLSCREEN_ENABLED, isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getLikeEnabled = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.LIKE_ENABLED, false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setLikeEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.LIKE_ENABLED, isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getDislikeEnabled = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.DISLIKE_ENABLED, false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setDislikeEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.DISLIKE_ENABLED, isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getNumPromoted = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.NUM_PROMOTED, 0);
	};

	/** @return {string} */
	s6.widgets.ArtPieceModel.prototype.getImageURL = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.IMAGE_URL, 0);
	};

	/** 
	* @param {string} url
	* @return {s6.widgets.IArtPieceModel}
	*/
	s6.widgets.ArtPieceModel.prototype.setImageURL = function(url){
		goog.asserts.assertString(url);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.IMAGE_URL, url);
	};

	/** 
	 * @param {boolean} numFeatured
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setNumPromoted = function(numFeatured){
		goog.asserts.assertNumber(numFeatured);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.NUM_PROMOTED, numFeatured);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getFeaturedEnabled = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.FEATURED_ENABLED, false);
	};

	s6.widgets.ArtPieceModel.prototype.setFeaturedEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.FEATURED_ENABLED, isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getPromoteEnabled = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.PROMOTE_ENABLED, false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setPromoteEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.PROMOTE_ENABLED, isEnabled);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getShoppingCartEnabled = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.SHOPPING_CART_ENABLED, false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setShoppingCartEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.SHOPPING_CART_ENABLED, isEnabled);
	};


	/** @return {Object} */
	s6.widgets.ArtPieceModel.prototype.getPostJSON = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.POST_JSON, false);
	};

	/** 
	 * @param {Object} json
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setPostJSON = function(json){
		goog.asserts.assert(json);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.POST_JSON, json);
	};

	/** @return {boolean} */
	s6.widgets.ArtPieceModel.prototype.getControlsEnabled = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.CONTROLS_ENABLED, false);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setControlsEnabled = function(isEnabled){
		goog.asserts.assertBoolean(isEnabled);
		return this.setProperty(s6.widgets.ArtPieceModel.EventType.CONTROLS_ENABLED, isEnabled);
	};

	/** @return {number} */
	s6.widgets.ArtPieceModel.prototype.getArtPieceID = function(){
		return this.getProperty(s6.widgets.ArtPieceModel.EventType.ART_PIECE_ID, 0);
	};

	/** 
	 * @param {number} id
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.setArtPieceID = function(id){
		goog.asserts.assertNumber(id);
		goog.asserts.assert(id > 0);

		return this.setProperty(s6.widgets.ArtPieceModel.EventType.ART_PIECE_ID, id);
	};

	/** @return {s6.widgets.IArtPieceModel} */
	s6.widgets.ArtPieceModel.prototype.clone = function(){
		return s6.widgets.ArtPieceModel.fromJSON(this.toJSON());
	};

	/** @return {!Object} */
	s6.widgets.ArtPieceModel.prototype.toJSON = function(){
		return {
			"__class__": "s6.widgets.ArtPieceModel",
			"artType": this.getArtType(),
			"hideEnabled": this.getHideEnabled(),
			"pinEnabled": this.getPinEnabled(),
			"favoritedEnabled": this.getFavoritedEnabled(),
			"fullscreenEnabled": this.getFullScreenEnabled(),
			"likeEnabled": this.getLikeEnabled(),
			"dislikeEnabled": this.getDislikeEnabled(),
			"featuredEnabled": this.getFeaturedEnabled(),
			"promoteEnabled": this.getPromoteEnabled(),
			"numPromoted": this.getNumPromoted(),
			"shoppingCartEnabled": this.getShoppingCartEnabled(),
			"node": this.getNode(),
			"controlsEnabled": this.getControlsEnabled(),
			"artPieceId": this.getArtPieceID(),
			"imageURL": this.getImageURL(),
			"post_json": goog.json.parse(goog.json.serialize(this.getPostJSON()))
		};
	};


	/** 
	 * @param  {!Object} json
	 * @return {!s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.prototype.fromJSON = function(json){
		this.setArtType(json["artType"]);
		this.setHideEnabled(json["hideEnabled"]);
		this.setPinEnabled(json["pinEnabled"]);
		this.setFavoritedEnabled(json["favoritedEnabled"]);
		this.setFullScreenEnabled(json["fullscreenEnabled"]);
		this.setLikeEnabled(json["likeEnabled"]);
		this.setDislikeEnabled(json["dislikeEnabled"]);
		this.setFeaturedEnabled(json["featuredEnabled"]);
		this.setPromoteEnabled(json["promoteEnabled"]);
		this.setNumPromoted(json["numPromoted"]);
		this.setShoppingCartEnabled(json["shoppingCartEnabled"]);
		this.setNode(json["node"]);
		this.setControlsEnabled(json["controlsEnabled"]);
		this.setNode(json["artPieceId"]);
		this.setNode(json["imageURL"]);
		this.setPostJSON(goog.json.parse(goog.json.serialize(json["post_json"])));

		return this;
	};

	/** 
	 * @param  {!Object} json
	 * @return {!s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtPieceModel.fromJSON = function(json){
		var artPieceModel = new s6.widgets.ArtPieceModel();
		return artPieceModel.fromJSON(json);
	};

	/**
	 * @private
	 * @type {string} 
	 */
	s6.widgets.ArtPieceModel.prototype.artType = s6.widgets.ArtType.DEFAULT_ART_TYPE;
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

	goog.exportSymbol("s6.widgets.ArtPieceModel", s6.widgets.ArtPieceModel);

	goog.exportProperty(s6.widgets.ArtPieceModel, "fromJSON", s6.widgets.ArtPieceModel.fromJSON);

	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "toJSON", s6.widgets.ArtPieceModel.prototype.toJSON);
	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "fromJSON", s6.widgets.ArtPieceModel.prototype.fromJSON);

	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "getArtType", s6.widgets.ArtPieceModel.prototype.getArtType);
	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "setArtType", s6.widgets.ArtPieceModel.prototype.setArtType);

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

	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "getShoppingCartEnabled", s6.widgets.ArtPieceModel.prototype.getShoppingCartEnabled);
	goog.exportProperty(s6.widgets.ArtPieceModel.prototype, "setShoppingCartEnabled", s6.widgets.ArtPieceModel.prototype.setShoppingCartEnabled);

});
