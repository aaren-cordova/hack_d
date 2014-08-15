
goog.require('s6.widgets.ArtSet');
goog.provide('s6.widgets.ArtGallery');
goog.scope(function(){
	var ArtSet = s6.widgets.ArtSet;

	s6.widgets.ArtGallery = function(artSet){
		this.artSet_ = artSet;
	};

	s6.widgets.ArtGallery.prototype.foreach = function(callName, args){
		for(var i = 0; i < this.artSet_.length; ++i){
			var artSet = this.artSet_[i];
			var fn = artSet[callName];
			fn.apply(artSet, args);
		}

		return this;
	};

	s6.widgets.ArtGallery.prototype.setArtType = s6.widgets.ArtSet.prototype.setArtType;

	s6.widgets.ArtGallery.prototype.setHideEnabled = s6.widgets.ArtSet.prototype.setHideEnabled;

	s6.widgets.ArtGallery.prototype.setPinEnabled = s6.widgets.ArtSet.prototype.setPinEnabled;

	s6.widgets.ArtGallery.prototype.setFavoritedEnabled = s6.widgets.ArtSet.prototype.setFavoritedEnabled;

	s6.widgets.ArtGallery.prototype.setFullScreenEnabled = s6.widgets.ArtSet.prototype.setFullScreenEnabled;

	s6.widgets.ArtGallery.prototype.setLikeEnabled = s6.widgets.ArtSet.prototype.setLikeEnabled;

	s6.widgets.ArtGallery.prototype.setDislikeEnabled = s6.widgets.ArtSet.prototype.setDislikeEnabled;

	s6.widgets.ArtGallery.prototype.setFeaturedEnable = s6.widgets.ArtSet.prototype.setFeaturedEnable;

	s6.widgets.ArtGallery.prototype.onPinButtonClick_ = s6.widgets.ArtPiece.prototype.onPinButtonClick_;
	s6.widgets.ArtGallery.prototype.onFavoriteButtonClick_ = s6.widgets.ArtPiece.prototype.onFavoriteButtonClick_;
	s6.widgets.ArtGallery.prototype.onFullScreenButtonClick_ = s6.widgets.ArtPiece.prototype.onFullScreenButtonClick_;
	s6.widgets.ArtGallery.prototype.onLikeButtonClick_ = s6.widgets.ArtPiece.prototype.onLikeButtonClick_;
	s6.widgets.ArtGallery.prototype.onDislikeButtonClick_ = s6.widgets.ArtPiece.prototype.onDislikeButtonClick_;
	s6.widgets.ArtGallery.prototype.onFeaturedButtonClick_ = s6.widgets.ArtPiece.prototype.onFeaturedButtonClick_;

	goog.exportProperty(s6.widgets.ArtGallery.prototype, 'setArtType', s6.widgets.ArtGallery.prototype.setArtType);
	goog.exportProperty(s6.widgets.ArtGallery.prototype, 'setHideEnabled', s6.widgets.ArtGallery.prototype.setHideEnabled);
	goog.exportProperty(s6.widgets.ArtGallery.prototype, 'setPinEnabled', s6.widgets.ArtGallery.prototype.setPinEnabled);
	goog.exportProperty(s6.widgets.ArtGallery.prototype, 'setFavoritedEnabled', s6.widgets.ArtGallery.prototype.setFavoritedEnabled);
	goog.exportProperty(s6.widgets.ArtGallery.prototype, 'setFullScreenEnabled', s6.widgets.ArtGallery.prototype.setFullScreenEnabled);
	goog.exportProperty(s6.widgets.ArtGallery.prototype, 'setLikeEnabled', s6.widgets.ArtGallery.prototype.setLikeEnabled);
	goog.exportProperty(s6.widgets.ArtGallery.prototype, 'setDislikeEnabled', s6.widgets.ArtGallery.prototype.setDislikeEnabled);
	goog.exportProperty(s6.widgets.ArtGallery.prototype, 'setFeaturedEnable', s6.widgets.ArtGallery.prototype.setFeaturedEnable);

	s6.widgets.ArtGallery.prototype.pageIndex_ = 0;
	s6.widgets.ArtGallery.prototype.setPageIndex = function(index){
	};

	s6.widgets.ArtGallery.prototype.getPageIndex = function(){
	};

	s6.widgets.ArtGallery.prototype.nextPageIndex = function(){
	};

	s6.widgets.ArtGallery.prototype.previousPageIndex = function(){
	};
});