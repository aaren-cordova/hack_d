goog.require('s6.widgets.IArtPieceModel');
goog.require('s6.widgets.ArtPieceModel.EventType');
goog.require('s6.widgets.WishlistStateType');
goog.require('goog.dom.DomHelper');
goog.require('goog.ui.Component');
goog.require('goog.asserts');
goog.require('goog.debug.Logger');
goog.require('goog.dom');

goog.provide('s6.widgets.ArtPieceView');
goog.scope(function(){
	var events = goog.events;
	var EventType = goog.events.EventType;
	var WishlistStateType = s6.widgets.WishlistStateType;

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

		events.listen(artPieceModel, ArtPieceModel_EventType.NODE, this.onNodeChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.ART_TYPE, this.onArtTypeChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.HIDE_ENABLED, this.onHideEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.PIN_ENABLED, this.onPinEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.FAVORITED_ENABLED, this.onFavoritedEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.FULLSCREEN_ENABLED, this.onFullscreenEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.LIKE_ENABLED, this.onLikeEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.DISLIKE_ENABLED, this.onDislikeEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.FEATURED_ENABLED, this.onFeaturedEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.SHOPPING_CART_ENABLED, this.onShoppingCartEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.PROMOTE_ENABLED, this.onPromoteEnabledChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.NUM_PROMOTED, this.onNumPromotedChanged_, false, this);
		events.listen(artPieceModel, ArtPieceModel_EventType.IMAGE_URL, this.onImageURLChanged_, false, this);

		this.invalidate();
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
		this.onArtTypeChanged_(null);
		this.onHideEnabledChanged_(null);
		this.onPinEnabledChanged_(null);
		this.onFavoritedEnabledChanged_(null);
		this.onFullscreenEnabledChanged_(null);
		this.onLikeEnabledChanged_(null);
		this.onDislikeEnabledChanged_(null);
		this.onFeaturedEnabledChanged_(null);
		this.onShoppingCartEnabledChanged_(null);
		this.onPromoteEnabledChanged_(null);
		this.onNumPromotedChanged_(null);
		this.onImageURLChanged_(null);

	};



	/** @inheritDoc */
	s6.widgets.ArtPieceView.prototype.createDom = function(){
		var dom = this.dom_;
		var artViewRoot = dom.createDom(
				'div',
				{'id': this.makeId('art-piece'), 'class' : 'art-piece'},
				
				this.artContainer = dom.createDom(
					'div',
					{'class' : 'art-container'}
				),

				this.toolContainer = dom.createDom(
					'div',
					{'class' : 'tool-container'},
					/*
					this.shoppingCartButton = dom.createDom(
						'div',
						{'class' : 'shopping-cart-button'}
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
					*/
					this.favoriteButton = dom.createDom(
						'div',
						{'class' : 'favorite-button icon-star', 'title': 'Add to Wishlist'}
					),
					this.promoteButton = dom.createDom(
						'div',
						{'class' : 'promote-button icon-heart', 'title': 'Promote this Piece'}
					),

					this.promotedCount = dom.createDom(
						'span',
						{'class' : 'promoted-count'}
					),

					this.fullscreenButton = dom.createDom(
						'div',
						{'class' : 'fullscreen-button icon-zoom-in', 'title': 'Preview'}
					)
				)
			)
		;

		this.decorateInternal(artViewRoot);
	};

	/** @inheritDoc */
	s6.widgets.ArtPieceView.prototype.decorateInternal = function(element){
		this.setElementInternal(element);
		this.addButtonListeners_();
		this.invalidate();
	};

	/** @private */
	s6.widgets.ArtPieceView.prototype.addButtonListeners_ = function (){
		goog.asserts.assert(this.artPieceController_, 'Controller required before rendering');

		var artPieceController = this.artPieceController_;
		if(this.artContainer){
			events.listen(this.artContainer, EventType.CLICK, artPieceController.onArtContainerClick, false, artPieceController);
		}
		if(this.toolContainer){
			events.listen(this.toolContainer, EventType.CLICK, artPieceController.onToolContainerClick, false, artPieceController);
		}
		if(this.shoppingCartButton){
			events.listen(this.shoppingCartButton, EventType.CLICK, artPieceController.onShoppingCartButtonClick, false, artPieceController);
		}
		if(this.favoriteButton){
			events.listen(this.favoriteButton, EventType.CLICK, artPieceController.onFavoriteButtonClick, false, artPieceController);
		}
		if(this.pinButton){
			events.listen(this.pinButton, EventType.CLICK, artPieceController.onPinButtonClick, false, artPieceController);
		}
		if(this.dislikeButton){
			events.listen(this.dislikeButton, EventType.CLICK, artPieceController.onDislikeButtonClick, false, artPieceController);
		}
		if(this.likeButton){
			events.listen(this.likeButton, EventType.CLICK, artPieceController.onLikeButtonClick, false, artPieceController);
		}
		if(this.featuredIcon){
			events.listen(this.featuredIcon, EventType.CLICK, artPieceController.onFeaturedIconClick, false, artPieceController);
		}
		if(this.fullscreenButton){
			events.listen(this.fullscreenButton, EventType.CLICK, artPieceController.onFullscreenButtonClick, false, artPieceController);
		}
		if(this.promoteButton){
			events.listen(this.promoteButton, EventType.CLICK, artPieceController.onPromoteButtonClick, false, artPieceController);
		}
	};

	/** @inheritDoc */
	s6.widgets.ArtPieceView.prototype.enterDocument = function(){
		goog.base(this, 'enterDocument');
	};

	s6.widgets.ArtPieceView.prototype.onNodeChanged_ = function(event){
		var node = this.artPieceModel_.getNode();


		jQuery(node).addClass('s6_widgets_art_piece_view_node')

		var parent = jQuery(node).parent()[0];
		this.render(parent);

		goog.dom.appendChild(this.artContainer, node);

		var imageWrap = jQuery(node).find('.image_wrap')[0];
		goog.dom.appendChild(imageWrap, this.toolContainer);

		this.invalidate();
	};

	s6.widgets.ArtPieceView.prototype.onArtTypeChanged_ = function(event){
		if(!this.getContentElement()){
			return;
		}

		var dataAttributeName = 'data-' + goog.string.toSelectorCase(ArtPieceModel_EventType.ART_TYPE);
		var dataAttributes = {};
		dataAttributes[dataAttributeName] = this.artPieceModel_.getArtType();
		
		goog.dom.setProperties(
			this.getContentElement(),
			dataAttributes
		);
	};

	s6.widgets.ArtPieceView.prototype.onHideEnabledChanged_ = function(event){
		if(!this.getContentElement()){
			return;
		}

		var dataAttributeName = 'data-' + goog.string.toSelectorCase(ArtPieceModel_EventType.HIDE_ENABLED);
		var dataAttributes = {};
		dataAttributes[dataAttributeName] = this.artPieceModel_.getHideEnabled();

		goog.dom.setProperties(
			this.getContentElement(),
			dataAttributes
		);
	};

	s6.widgets.ArtPieceView.prototype.onPinEnabledChanged_ = function(event){
		if(this.pinButton){
			goog.dom.setProperties(
				this.pinButton,
				{'data-enabled': this.artPieceModel_.getPinEnabled()}
			);
		}
	};

	s6.widgets.ArtPieceView.prototype.onFavoritedEnabledChanged_ = function(event){
		if(this.favoriteButton){
			goog.dom.setProperties(
				this.favoriteButton,
				{'data-enabled' : this.artPieceModel_.getFavoritedEnabled()}
			);
		}
	};

	s6.widgets.ArtPieceView.prototype.onFullscreenEnabledChanged_ = function(event){
		if(this.fullscreenButton){
			goog.dom.setProperties(
				this.fullscreenButton,
				{'data-enabled': this.artPieceModel_.getFullScreenEnabled()}
			);
		}
	};

	s6.widgets.ArtPieceView.prototype.onLikeEnabledChanged_ = function(event){
		if(this.likeButton){
			goog.dom.setProperties(
				this.likeButton,
				{'data-enabled': this.artPieceModel_.getLikeEnabled()}
			);
		}
	};

	s6.widgets.ArtPieceView.prototype.onDislikeEnabledChanged_ = function(event){
		if(this.dislikeButton){
			goog.dom.setProperties(
				this.dislikeButton,
				{'data-enabled': this.artPieceModel_.getDislikeEnabled()}
			);
		}
	};

	s6.widgets.ArtPieceView.prototype.onFeaturedEnabledChanged_ = function(event){
		if(this.featuredIcon){
			goog.dom.setProperties(
				this.featuredIcon,
				{'data-enabled': this.artPieceModel_.getFeaturedEnabled()}
			);
		}
	};

	s6.widgets.ArtPieceView.prototype.onShoppingCartEnabledChanged_ = function(event){
		if(this.shoppingCartButton){
			goog.dom.setProperties(
				this.shoppingCartButton,
				{'data-enabled': this.artPieceModel_.getShoppingCartEnabled()}
			);
		}
	};

	s6.widgets.ArtPieceView.prototype.onPromoteEnabledChanged_ = function(event){
		if(this.promoteButton){
			goog.dom.setProperties(
				this.promoteButton,
				{'data-enabled': this.artPieceModel_.getPromoteEnabled()}
			);
		}
	};

	s6.widgets.ArtPieceView.prototype.onNumPromotedChanged_ = function(event){
		if(this.promotedCount){
			jQuery(this.promotedCount).text(this.artPieceModel_.getNumPromoted());
		}
	};

	s6.widgets.ArtPieceView.prototype.onImageURLChanged_ = function(event){
		var url = this.artPieceModel_.getImageURL();
		var cache = s6.widgets.ArtPieceView.cache_;
		
		if(!cache[url]){
			var image = new Image();
			image.src = url;
			cache[url] = image;
		}

		/*
		if(this.artContainer){
			jQuery(this.artContainer).find('img').attr('src', url);
		}
		*/
	};

	s6.widgets.ArtPieceView.cache_ = {};
});