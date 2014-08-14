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
	}
	goog.inherits(s6.widgets.WishlistModel, goog.events.EventTarget);
	goog.addSingletonGetter(s6.widgets.WishlistModel);

	/** @enum {string} */
	s6.widgets.WishlistModel.EventType = {
		"WISHLIST_STATE": "wishlistState",
		"WISHLIST_NODE": 'wishlistNode',
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
	 * @param {number} mode
	 * @return {s6.widgets.IWishlistModel} [description]
	 */
	s6.widgets.WishlistModel.prototype.setWishlistState = function(mode){
		goog.asserts.assertNumber(mode, 'mode must be number');
		goog.asserts.assert(mode >= 0 && mode < s6.widgets.WishlistStateType.TOTAL_STATES);

		return this.setProperty(s6.widgets.WishlistModel.EventType.WISHLIST_STATE, mode);
	};


	/** @return {Node} */
	s6.widgets.WishlistModel.prototype.getWishlistNode = function(){
		return this.getProperty(s6.widgets.WishlistModel.EventType.WISHLIST_NODE, null);
	};

	/** 
	 * @param {Node} wishlistModelNode
	 * @return {s6.widgets.IWishlistModel}
	 */
	s6.widgets.WishlistModel.prototype.setWishlistNode = function(wishlistModelNode){
		goog.asserts.assert(wishlistModelNode instanceof Node);
		return this.setProperty(s6.widgets.WishlistModel.EventType.WISHLIST_NODE, wishlistModelNode);
	};

	/** 
	* @return {number}
	*/
	s6.widgets.WishlistModel.prototype.getNumItems = function(){
		return this.items_.length;
	};

	/** 
	 * @param {Object} item
	 * @return {s6.widgets.IWishlistModel}
	 */
	s6.widgets.WishlistModel.prototype.addItem = function(item){
		return this.addItemAt(item, this.getNumItems());
	};

	/** 
	 * @param {Object} item
	 * @param {number} index
	 * @return {s6.widgets.IWishlistModel}
	 */
	s6.widgets.WishlistModel.prototype.addItemAt = function(item, index){
		goog.asserts.assertNumber(index);
		goog.asserts.assert(index > 0 && index < this.getNumItems(), 'Index out of bounds.');

		var oldvalue = this.items_[index];
		if(oldvalue !== item){
			var dispatchLenghtChangeEvent = index != this.getNumItems();
			goog.object.set(this.items_, index, item);
			this.dispatchEvent(s6.widgets.WishlistModel.EventType.ITEMS);
			
			if(dispatchLenghtChangeEvent){
			this.dispatchEvent(s6.widgets.WishlistModel.EventType.NUM_ITEMS);
			}
		}

		return this;
	};
})