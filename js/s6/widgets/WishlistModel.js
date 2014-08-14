goog.require('goog.asserts');
goog.require('goog.object');
goog.require('goog.events.EventTarget');
goog.require('s6.widgets.WishlistStateType');
goog.require('s6.widgets.IWishlistModel');
goog.provide('s6.widgets.WishlistModel');
goog.provide('s6.widgets.WishlistModel.EventType');
goog.scope(function(){
	var WishlistStateType = s6.widgets.WishlistStateType;

	/** 
	 * @constructor
	 * @implements{s6.widgets.IWishlistModel}
	 * @extends {goog.events.EventTarget}
	 */
	s6.widgets.WishlistModel = function(){
		goog.events.EventTarget.call(this);

		this.items_ = [];
		this.states_ = [];
	}
	goog.inherits(s6.widgets.WishlistModel, goog.events.EventTarget);
	goog.addSingletonGetter(s6.widgets.WishlistModel);

	/** @enum {string} */
	s6.widgets.WishlistModel.EventType = {
		"WISHLIST_STATE": "wishlistState",
		"NODE": 'node',
		"ITEMS": 'items',
		"NUM_ITEMS": 'numItems'
	};

	/** 
	 * @param {string} name
	 * @param {*} opt_value
	 * @return {?}
	 */
	s6.widgets.WishlistModel.prototype.getProperty = function(name, opt_value){
		return goog.object.get(this, name, opt_value);
	};

	/** 
	 * @param {string} name
	 * @param {*} value
	 * @return {s6.widgets.IWishlistModel}
	 */
	s6.widgets.WishlistModel.prototype.setProperty = function(name, value){

		goog.asserts.assertString(name);
		goog.asserts.assert(goog.isDef(value));

		var oldvalue = this[name];
		if(oldvalue !== value){
			goog.object.set(this, name, value);
			this.dispatchEvent(name);
		}

		return this;
	};

	/** @return {number} */
	s6.widgets.WishlistModel.prototype.getWishlistState = function(){
		return this.getProperty(s6.widgets.WishlistModel.EventType.WISHLIST_STATE, 0);
	};

	/**
	 * @param {number} state
	 * @return {number}
	 */
	s6.widgets.WishlistModel.prototype.getIndexOfWishlistState = function(state){
		return this.states_.indexOf(state);
	};

	/**
	 * @param {number} state
	 * @return {s6.widgets.IWishlistModel} [description]
	 */
	s6.widgets.WishlistModel.prototype.setWishlistState = function(state){
		goog.asserts.assertNumber(state, 'state must be number');
		goog.asserts.assert(state >= 0 && state < s6.widgets.WishlistStateType.TOTAL_STATES);

		this.states_.push(state);
		return this.setProperty(s6.widgets.WishlistModel.EventType.WISHLIST_STATE, state);
	};


	/** @return {Node} */
	s6.widgets.WishlistModel.prototype.getNode = function(){
		return this.getProperty(s6.widgets.WishlistModel.EventType.NODE, null);
	};

	/** 
	 * @param {Node} wishlistModelNode
	 * @return {s6.widgets.IWishlistModel}
	 */
	s6.widgets.WishlistModel.prototype.setNode = function(wishlistModelNode){
		goog.asserts.assert(wishlistModelNode instanceof Node);
		return this.setProperty(s6.widgets.WishlistModel.EventType.NODE, wishlistModelNode);
	};

	/** 
	* @return {number}
	*/
	s6.widgets.WishlistModel.prototype.getNumItems = function(){
		return this.items_.length;
	};

	/**
	 * @param {number} item
	 * @return {s6.widgets.IWishlistModel}
	 */
	s6.widgets.WishlistModel.prototype.addItem = function(item){
		return this.addItemAt(item, this.getNumItems());
	};

	/** 
	 * @param {number} item
	 * @param {number} index
	 * @return {s6.widgets.IWishlistModel}
	 */
	s6.widgets.WishlistModel.prototype.addItemAt = function(item, index){
		window.love = this;
		goog.asserts.assertNumber(index);
		goog.asserts.assert(index >= 0 && index <= this.getNumItems(), 'Index (' + index + ')out of bounds.');

		var oldvalue = this.items_[index];
		if(oldvalue !== item){
			var dispatchLenghtChangeEvent = index >= this.getNumItems();
			goog.object.set(this.items_, index, item);
			this.dispatchEvent(s6.widgets.WishlistModel.EventType.ITEMS);
			
			if(dispatchLenghtChangeEvent){
				this.dispatchEvent(s6.widgets.WishlistModel.EventType.NUM_ITEMS);
			}
		}

		return this;
	};

		/**
	 * @param {number} index
	 * @return {number}
	 */
	s6.widgets.WishlistModel.prototype.removeItemAt = function(index){
		goog.asserts.assertNumber(index);
		goog.asserts.assert(index >= 0 && index < this.getNumItems(), 'Index (' + index + ')out of bounds.');
		
		var removedItem = this.items_.splice(index, 1);
		this.dispatchEvent(s6.widgets.WishlistModel.EventType.ITEMS);
		this.dispatchEvent(s6.widgets.WishlistModel.EventType.NUM_ITEMS);

		return removedItem[0];
	};

	/**
	 * @param {number} item
	 * @return {s6.widgets.IWishlistModel}
	 */
	s6.widgets.WishlistModel.prototype.removeItem = function(item){
		return this.removeItemAt(this.indexOfItem(item));
	};

	s6.widgets.WishlistModel.prototype.indexOfItem = function(item){
		return this.items_.indexOf(item);
	}

})