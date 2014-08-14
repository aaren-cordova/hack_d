goog.require('s6.widgets.WishlistModel');
goog.require('s6.widgets.WishlistController');
goog.require('s6.widgets.WishlistView');


goog.require('s6.widgets.ArtPieceModel');
goog.require('s6.widgets.ArtPieceController');
goog.require('s6.widgets.ArtPieceView');
goog.require('goog.events.EventType');
goog.require('goog.json');
goog.require('goog.array');

goog.provide('s6.Main');
goog.scope(function(){
	var EventType = goog.events.EventType;
	var ArtPieceModel = s6.widgets.ArtPieceModel;
	var ArtPieceController = s6.widgets.ArtPieceController;
	var ArtPieceView = s6.widgets.ArtPieceView;
	var WishlistModel = s6.widgets.WishlistModel;
	var WishlistController = s6.widgets.WishlistController;
	var WishlistView = s6.widgets.WishlistView;

	/** @constructor */
	s6.Main = function(){
		this.models = [];
		goog.events.listenOnce(document, EventType.READYSTATECHANGE, this.onDocumentReady_, false, this);
	};

	s6.Main.prototype.getProdcutIDList = function(){
		var list = goog.json.parse(window['google_tag_params']['ecomm_prodid']);
		goog.array.forEach(list, function(value, index, array){
			array[index] = value.replace(/\D/g, '') | 0;
		});
		return list;
	};

	s6.Main.prototype.onDocumentReady_ = function(event){
		var i, itemWrap, model, controller, view, wrappedItemNodes, productIdList;

		productIdList = this.getProdcutIDList();

		wrappedItemNodes = jQuery('.item_wrap');
		for(i = 0; i < wrappedItemNodes.length; ++i){
			itemWrap = wrappedItemNodes[i];
			model = new ArtPieceModel();
			controller = new ArtPieceController();
			controller.setArtPieceModel(model);
			view = new ArtPieceView();
			view.setArtPieceModel(model);
			view.setArtPieceController(controller);

			this.models.push(model);

			model.setArtPieceID(productIdList[i]);
			model.setArtPieceNode(itemWrap);
		}

		var wishlistModel = WishlistModel.getInstance();
		var wishlistController = WishlistController.getInstance();
		wishlistController.setWishlistModel(wishlistModel);


		var wishlistView = WishlistView.getInstance();
		wishlistView.setWishlistModel(wishlistModel);
		wishlistView.setWishlistController(wishlistController);


		wishlistModel.setWishlistNode(jQuery("#Wishlist")[0]);

	};
	goog.addSingletonGetter(s6.Main);

	goog.exportSymbol('s6.Main', s6.Main);
	goog.exportProperty(s6.Main, 'getInstance', s6.Main.getInstance);
});


s6.Main.getInstance();