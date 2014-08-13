goog.require('s6.widgets.ArtPieceModel');
goog.require('s6.widgets.ArtPieceController');
goog.require('s6.widgets.ArtPieceView');
goog.require('goog.events.EventType');

goog.provide('s6.Main');
goog.scope(function(){
	var EventType = goog.events.EventType;
	var ArtPieceModel = s6.widgets.ArtPieceModel;
	var ArtPieceController = s6.widgets.ArtPieceController;
	var ArtPieceView = s6.widgets.ArtPieceView;

	/** @constructor */
	s6.Main = function(){
		this.models = [];
		goog.events.listenOnce(document, EventType.READYSTATECHANGE, this.onDocumentReady_, false, this);
	};

	s6.Main.prototype.onDocumentReady_ = function(event){
		var i, itemWrap, model, controller, view, wrappedItemNodes;

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

			model.setArtPieceNode(itemWrap);
			view.render(jQuery(itemWrap).parent());
		}
	};

	goog.addSingletonGetter(s6.Main);


	goog.exportSymbol('s6.Main', s6.Main);
	goog.exportProperty(s6.Main, 'getInstance', s6.Main.getInstance);
});


s6.Main.getInstance();