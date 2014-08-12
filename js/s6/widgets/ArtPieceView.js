goog.require('s6.widgets.IArtPieceModel');
goog.require('s6.widgets.IArtPieceController');
goog.require('s6.widgets.ArtPieceModel.EventType');
goog.require('goog.dom.DomHelper');
goog.require('goog.ui.Component');
goog.require('goog.debug.Logger');
goog.require('goog.dom');

goog.provide('s6.widgets.ArtPieceView');
goog.scope(function(){
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
		this.render(document.body);
	};
	goog.inherits(s6.widgets.ArtPieceView, Component);

	/**
	 * @param {s6.widgets.IArtPieceModel} artPieceModel
	 * @return {s6.widgets.ArtPieceView}
	 */
	s6.widgets.ArtPieceView.prototype.setArtPieceModel = function(artPieceModel){
		this.artPieceModel_ = artPieceModel;
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

	// TODO remove
	s6.widgets.ArtPieceView.prototype.getS6Item = function (){
		var dom = this.dom_;
		return dom.createDom(
			'div',
			{'class':'item_wrap', 'data-dmc':'prod-item-wrap'},
			dom.createDom(
				'div', 
				{'class':'image_wrap'},
				dom.createDom(
					'a',
					{'href': '', 'data-dmc': 'prod-image'},
					dom.createDom(
						'img',
						{'class': 'photo size-j', 'width': 200, 'height': 200, 'alt': '', 'src': 'http://a1.s6img.com/cdn/0010/p/2583372_7359597-prn01_j.jpg'}
					)
				),
				dom.createDom(
					'h2',
					undefined,
					dom.createDom(
						'a',
						{'href': '', 'data-dmc': 'prod-title'},
						'Reassurance'
					)
				)
			),
			dom.createDom(
				'span',
				{'class': 'fr', 'data-dmc': 'prod-price'},
				'$15.00'
			)
		);
	};
	s6.widgets.ArtPieceView.prototype.invalidate = function(){
		this.onProductTypeChanged_(null);
		this.onHideEnabledChanged_(null);
		this.onPinEnabledChanged_(null);
		this.onFavoritedEnabledChanged_(null);
		this.onFullscreenEnabledChanged_(null);
		this.onLikeEnabledChanged_(null);
		this.onDislikeEnabledChanged_(null);
		this.onFeaturedEnabledChanged_(null);
	};

	/** @inheritDoc */
	s6.widgets.ArtPieceView.prototype.createDom = function(){
		var id = this.makeId('art-piece');
		//var element = dom.createDom('div');
		// TODO REMOVE
		var element = this.getS6Item();

		this.decorateInternal(element);
	};


	/** @inheritDoc */
	s6.widgets.ArtPieceView.prototype.decorateInternal = function(element){
		var dom = this.dom_;
		var artViewRoot = dom.createDom(
				'div',
				undefined,
				element, 
				dom.createDom(
					'div',
					{'id': this.makeId('art-piece'), 'class' : 'art-piece'},
					this.artContainer = dom.createDom(
						'div',
						{'class' : 'art-container'},
						
						this.toolContainer = dom.createDom(
							'div',
							{'class' : 'tool-container'},
							this.pinButton = dom.createDom(
								'div',
								{'class' : 'pin-button'}
							), 
							this.favoriteButton = dom.createDom(
								'div',
								{'class' : 'favorite-button'}
							),
							this.featuredIcon = dom.createDom(
								'div',
								{'class' : 'featured-icon'}
							),
							this.dislikeButton = dom.createDom(
								'div',
								{'class' : 'dislike-button'}
							),
							this.likeButton = dom.createDom(
								'div',
								{'class' : 'like-button'}
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

		this.setElementInternal(artViewRoot);
		this.invalidate();
	};

	/** @inheritDoc */
	s6.widgets.ArtPieceView.prototype.enterDocument = function(){
		goog.base(this, 'enterDocument');

		var artPieceModel = this.artPieceModel_;
		goog.events.listen(artPieceModel, ArtPieceModel_EventType.PRODUCT_TYPE, this.onProductTypeChanged_, false, this);
		goog.events.listen(artPieceModel, ArtPieceModel_EventType.HIDE_ENABLED, this.onHideEnabledChanged_, false, this);
		goog.events.listen(artPieceModel, ArtPieceModel_EventType.PIN_ENABLED, this.onPinEnabledChanged_, false, this);
		goog.events.listen(artPieceModel, ArtPieceModel_EventType.FAVORITED_ENABLED, this.onFavoritedEnabledChanged_, false, this);
		goog.events.listen(artPieceModel, ArtPieceModel_EventType.FULLSCREEN_ENABLED, this.onFullscreenEnabledChanged_, false, this);
		goog.events.listen(artPieceModel, ArtPieceModel_EventType.LIKE_ENABLED, this.onLikeEnabledChanged_, false, this);
		goog.events.listen(artPieceModel, ArtPieceModel_EventType.DISLIKE_ENABLED, this.onDislikeEnabledChanged_, false, this);
		goog.events.listen(artPieceModel, ArtPieceModel_EventType.FEATURED_ENABLED, this.onFeaturedEnabledChanged_, false, this);
		this.invalidate();
	};

	s6.widgets.ArtPieceView.prototype.onProductTypeChanged_ = function(event){
		goog.dom.setProperty(
			this.getContentElement(),
			'data-' + goog.string.toSelectorCase(ArtPieceModel_EventType.PRODUCT_TYPE),
			this.artPieceModel_.getProductType()
		);
	};

	s6.widgets.ArtPieceView.prototype.onHideEnabledChanged_ = function(event){
		goog.dom.setProperty(
			this.getContentElement(),
			'data-' + goog.string.toSelectorCase(ArtPieceModel_EventType.HIDE_ENABLED),
			this.artPieceModel_.getHideEnabled()
		);
	};

	s6.widgets.ArtPieceView.prototype.onPinEnabledChanged_ = function(event){
		goog.dom.setProperty(
			this.pinButton,
			'data-enabled',
			this.artPieceModel_.getPinEnabled()
		);
	};

	s6.widgets.ArtPieceView.prototype.onFavoritedEnabledChanged_ = function(event){
		goog.dom.setProperty(
			this.favoriteButton,
			'data-enabled',
			this.artPieceModel_.getFavoritedEnabled()
		);
	};

	s6.widgets.ArtPieceView.prototype.onFullscreenEnabledChanged_ = function(event){
		goog.dom.setProperty(
			this.fullscreenButton,
			'data-enabled',
			this.artPieceModel_.getFullScreenEnabled()
		);
	};

	s6.widgets.ArtPieceView.prototype.onLikeEnabledChanged_ = function(event){
		goog.dom.setProperty(
			this.likeButton,
			'data-enabled',
			this.artPieceModel_.getLikeEnabled()
		);
	};

	s6.widgets.ArtPieceView.prototype.onDislikeEnabledChanged_ = function(event){
		goog.dom.setProperty(
			this.dislikeButton,
			'data-enabled',
			this.artPieceModel_.getDislikeEnabled()
		);
	};

	s6.widgets.ArtPieceView.prototype.onFeaturedEnabledChanged_ = function(event){
		goog.dom.setProperty(
			this.featuredIcon,
			'data-enabled',
			this.artPieceModel_.getFeaturedEnabled()
		);
	};

	s6.widgets.ArtPieceView.prototype.logger_ = Logger.getLogger('s6.widgets.ArtPieceView');
});