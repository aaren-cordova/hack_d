goog.require('s6.widgets.ArtPieceModel');

goog.provide('s6.widgets.ArtSet');
goog.scope(function(){
	var ArtPieceModel = s6.widgets.ArtPieceModel;

	/**
	 * @constructor
	 * @param {string} selector
	 * @param {Array.<s6.widgets.IArtPieceModel>} artPieces
	 * @implements {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtSet = function(selector, artPieces){
		this.selector_ = selector;
		this.artPieces_ = artPieces;
	};
	
	s6.widgets.ArtSet.prototype.foreach = function(callName, args){
		for(var i = 0; i < this.artPieces_.length; ++i){
			var artPiece = this.artPieces_[i];
			var fn = artPiece[callName];
			fn.apply(artPiece, args);
		}

		return this;
	};

	s6.widgets.ArtSet.prototype.setProductType = function(productType){
		return this.foreach('setProductType', [productType]);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtSet.prototype.setHideEnabled = function(isEnabled){
		return this.foreach('setHideEnabled', [isEnabled]);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtSet.prototype.setPinEnabled = function(isEnabled){
		return this.foreach('setPinEnabled', [isEnabled]);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtSet.prototype.setFavoritedEnabled = function(isEnabled){
		return this.foreach('setFavoritedEnabled', [isEnabled]);
	};

	/** 
	 * @param {boolean} isEnabled
	 * @return {s6.widgets.IArtPieceModel}
	 */
	s6.widgets.ArtSet.prototype.setFullScreenEnabled = function(isEnabled){
		return this.foreach('setFullScreenEnabled', [isEnabled]);
	};

	s6.widgets.ArtSet.prototype.setLikeEnabled = function(isEnabled){
		return this.foreach('setLikeEnabled', [isEnabled]);
	};

	s6.widgets.ArtSet.prototype.setDislikeEnabled = function(isEnabled){
		return this.foreach('setDislikeEnabled', [isEnabled]);
	};

	s6.widgets.ArtSet.prototype.setFeaturedEnable = function(isEnabled){
		return this.foreach('setFeaturedEnable', [isEnabled]);
	};

	goog.exportProperty(s6.widgets.ArtSet.prototype, 'setProductType', s6.widgets.ArtSet.prototype.setProductType);
	goog.exportProperty(s6.widgets.ArtSet.prototype, 'setHideEnabled', s6.widgets.ArtSet.prototype.setHideEnabled);
	goog.exportProperty(s6.widgets.ArtSet.prototype, 'setPinEnabled', s6.widgets.ArtSet.prototype.setPinEnabled);
	goog.exportProperty(s6.widgets.ArtSet.prototype, 'setFavoritedEnabled', s6.widgets.ArtSet.prototype.setFavoritedEnabled);
	goog.exportProperty(s6.widgets.ArtSet.prototype, 'setFullScreenEnabled', s6.widgets.ArtSet.prototype.setFullScreenEnabled);
	goog.exportProperty(s6.widgets.ArtSet.prototype, 'setLikeEnabled', s6.widgets.ArtSet.prototype.setLikeEnabled);
	goog.exportProperty(s6.widgets.ArtSet.prototype, 'setDislikeEnabled', s6.widgets.ArtSet.prototype.setDislikeEnabled);
	goog.exportProperty(s6.widgets.ArtSet.prototype, 'setFeaturedEnable', s6.widgets.ArtSet.prototype.setFeaturedEnable);
});