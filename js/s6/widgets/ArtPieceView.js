goog.require('s6.widgets.IArtPieceModel');
goog.require('s6.widgets.IArtPieceController');
goog.require('s6.widgets.ArtPieceModel.EventType');
goog.require('goog.dom.DomHelper');
goog.require('goog.ui.Component');
goog.require('goog.asserts');
goog.require('goog.debug.Logger');
goog.require('goog.dom');

goog.provide('s6.widgets.ArtPieceView');
goog.scope(function(){
	var events = goog.events;
	var EventType = goog.events.EventType;

	var ArtPieceModel_EventType = s6.widgets.ArtPieceModel.EventType;
	var Logger = goog.debug.Logger;
	var Component = goog.ui.Component;

	/**
	 * @constructor
	 * @extends {goog.ui.Component}
	 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
	 */
	s6.widgets.ArtPieceView = function(opt_domHelper){
		Component.call(this, opt_domHelper);
	};
	goog.inherits(s6.widgets.ArtPieceView, Component);

	/**
	 * @param {s6.widgets.IArtPieceModel} artPieceModel
	 * @return {s6.widgets.ArtPieceView}
	 */
	s6.widgets.ArtPieceView.prototype.setArtPieceModel = function(artPieceModel){
		this.artPieceModel_ = artPieceModel;

		events.listen(artPieceModel, ArtPieceModel_EventType.ART_PIECE_NODE, this.onArtPieceNodeChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.PRODUCT_TYPE, this.onProductTypeChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.HIDE_ENABLED, this.onHideEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.PIN_ENABLED, this.onPinEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.FAVORITED_ENABLED, this.onFavoritedEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.FULLSCREEN_ENABLED, this.onFullscreenEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.LIKE_ENABLED, this.onLikeEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.DISLIKE_ENABLED, this.onDislikeEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.FEATURED_ENABLED, this.onFeaturedEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.SHOPPING_CART_ENABLED, this.onShoppingCartEnabledChanged_, false, this);

		return this;
	};

	/**
	 * @param {s6.widgets.IArtPieceController} artPieceController
	 * @return {s6.widgets.ArtPieceView}
	 */
	s6.widgets.ArtPieceView.prototype.setArtPieceController = function(artPieceController){
		this.artPieceController_ = artPieceController;
		return this;
	};

	

	s6.widgets.ArtPieceView.prototype.invalidate = function(){
		this.onArtPieceNodeChanged_(null);
		this.onProductTypeChanged_(null);
		this.onHideEnabledChanged_(null);
		this.onPinEnabledChanged_(null);
		this.onFavoritedEnabledChanged_(null);
		this.onFullscreenEnabledChanged_(null);
		this.onLikeEnabledChanged_(null);
		this.onDislikeEnabledChanged_(null);
		this.onFeaturedEnabledChanged_(null);
		this.onShoppingCartEnabledChanged_(null);
	};

	/** @inheritDoc */
	s6.widgets.ArtPieceView.prototype.createDom = function(){
		var dom = this.dom_;
		var artViewRoot = dom.createDom(
				'div',
				{'id': this.makeId('art-piece'), 'class' : 'art-piece'},
				dom.createDom(
					'div',
					undefined,
					this.artContainer = dom.createDom(
						'div',
						{'class' : 'art-container'},
						
						this.toolContainer = dom.createDom(
							'div',
							{'class' : 'tool-container'},
							this.shoppingCartButton = dom.createDom(
								'div',
								{'class' : 'shopping-cart-button'}
							),

							this.favoriteButton = dom.createDom(
								'div',
								{'class' : 'favorite-button'}
							),

							this.pinButton = dom.createDom(
								'div',
								{'class' : 'pin-button'}
							),
							this.dislikeButton = dom.createDom(
								'div',
								{'class' : 'dislike-button'}
							),
							this.likeButton = dom.createDom(
								'div',
								{'class' : 'like-button'}
							),
							this.featuredIcon = dom.createDom(
								'div',
								{'class' : 'featured-icon'}
							),
							this.fullscreenButton = dom.createDom(
								'div',
								{'class' : 'fullscreen-button'}
							)
						)
					)
				)
			)
		;

		this.addButtonListeners_();
		this.decorateInternal(artViewRoot);
	};

	/** @inheritDoc */
	s6.widgets.ArtPieceView.prototype.decorateInternal = function(element){
		this.setElementInternal(element);
	};

	/** @private */
	s6.widgets.ArtPieceView.prototype.addButtonListeners_ = function (){
		goog.asserts.assert(this.artPieceController_, 'Controller required before rendering');

		events.listen(this.artContainer, EventType.CLICK, this.artPieceController_.onArtContainerClick);
		events.listen(this.toolContainer, EventType.CLICK, this.artPieceController_.onToolContainerClick);
		events.listen(this.shoppingCartButton, EventType.CLICK, this.artPieceController_.onShoppingCartButtonClick);
		events.listen(this.favoriteButton, EventType.CLICK, this.artPieceController_.onFavoriteButtonClick);
		events.listen(this.pinButton, EventType.CLICK, this.artPieceController_.onPinButtonClick);
		events.listen(this.dislikeButton, EventType.CLICK, this.artPieceController_.onDislikeButtonClick);
		events.listen(this.likeButton, EventType.CLICK, this.artPieceController_.onLikeButtonClick);
		events.listen(this.featuredIcon, EventType.CLICK, this.artPieceController_.onFeaturedIconClick);
		events.listen(this.fullscreenButton, EventType.CLICK, this.artPieceController_.onFullscreenButtonClick);
	};

	/** @inheritDoc */
	s6.widgets.ArtPieceView.prototype.enterDocument = function(){
		goog.base(this, 'enterDocument');
	};

	s6.widgets.ArtPieceView.prototype.onArtPieceNodeChanged_ = function(event){
		// TODO
	};

	s6.widgets.ArtPieceView.prototype.onProductTypeChanged_ = function(event){
		var dataAttributeName = 'data-' + goog.string.toSelectorCase(ArtPieceModel_EventType.PRODUCT_TYPE);
		var dataAttributes = {};
		dataAttributes[dataAttributeName] = this.artPieceModel_.getProductType();
		
		goog.dom.setProperties(
			this.getContentElement(),
			dataAttributes
		);
	};

	s6.widgets.ArtPieceView.prototype.onHideEnabledChanged_ = function(event){
		var dataAttributeName = 'data-' + goog.string.toSelectorCase(ArtPieceModel_EventType.HIDE_ENABLED);
		var dataAttributes = {};
		dataAttributes[dataAttributeName] = this.artPieceModel_.getHideEnabled();

		goog.dom.setProperties(
			this.getContentElement(),
			dataAttributes
		);
	};

	s6.widgets.ArtPieceView.prototype.onPinEnabledChanged_ = function(event){
		goog.dom.setProperties(
			this.pinButton,
			{'data-enabled': this.artPieceModel_.getPinEnabled()}
		);
	};

	s6.widgets.ArtPieceView.prototype.onFavoritedEnabledChanged_ = function(event){
		goog.dom.setProperties(
			this.favoriteButton,
			{'data-enabled' : this.artPieceModel_.getFavoritedEnabled()}
		);
	};

	s6.widgets.ArtPieceView.prototype.onFullscreenEnabledChanged_ = function(event){
		goog.dom.setProperties(
			this.fullscreenButton,
			{'data-enabled': this.artPieceModel_.getFullScreenEnabled()}
		);
	};

	s6.widgets.ArtPieceView.prototype.onLikeEnabledChanged_ = function(event){
		goog.dom.setProperties(
			this.likeButton,
			{'data-enabled': this.artPieceModel_.getLikeEnabled()}
		);
	};

	s6.widgets.ArtPieceView.prototype.onDislikeEnabledChanged_ = function(event){
		goog.dom.setProperties(
			this.dislikeButton,
			{'data-enabled': this.artPieceModel_.getDislikeEnabled()}
		);
	};

	s6.widgets.ArtPieceView.prototype.onFeaturedEnabledChanged_ = function(event){
		goog.dom.setProperties(
			this.featuredIcon,
			{'data-enabled': this.artPieceModel_.getFeaturedEnabled()}
		);
	};

	s6.widgets.ArtPieceView.prototype.onShoppingCartEnabledChanged_ = function(event){
		goog.dom.setProperties(
			this.shoppingCartButton,
			{'data-enabled': this.artPieceModel_.getShoppingCartEnabled()}
		);
	};
});