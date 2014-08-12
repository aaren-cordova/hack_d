goog.require('goog.debug.Logger');
goog.require('s6.widgets.ArtPieceModel');
goog.require('s6.widgets.ArtPieceController');
goog.require('s6.widgets.ArtPieceView');

goog.provide('s6.Main');
goog.scope(function(){

	var Logger = goog.debug.Logger;
	var ArtPieceModel = s6.widgets.ArtPieceModel;
	var ArtPieceController = s6.widgets.ArtPieceController;
	var ArtPieceView = s6.widgets.ArtPieceView;

	/** @constructor */
	s6.Main = function(){
		Logger.getLogger('').setLevel(Logger.Level.ALL);

		this.model_ = new ArtPieceModel();
		this.controller_ = new ArtPieceController();
		this.controller_.setArtPieceModel(this.model_);

		this.view_ = new ArtPieceView();
		this.view_.setArtPieceModel(this.model_);
		this.view_.setArtPieceController(this.controller_);
	};

	/** @return {s6.widgets.IArtPieceModel} */
	s6.Main.prototype.getModel = function(){
		return this.model_;
	};

	goog.addSingletonGetter(s6.Main);


	goog.exportSymbol('s6.Main', s6.Main);
	goog.exportProperty(s6.Main, 'getInstance', s6.Main.getInstance);
});


s6.Main.getInstance();