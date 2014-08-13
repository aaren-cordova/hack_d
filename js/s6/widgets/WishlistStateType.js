goog.provide('s6.widgets.WishlistStateType');
goog.scope(function(){
	s6.widgets.WishlistStateType.CLOSE = 0;
	s6.widgets.WishlistStateType.PENCIL = 1;
	s6.widgets.WishlistStateType.LIST = 2;
	s6.widgets.WishlistStateType.FULL = 3;

	goog.exportSymbol('s6.widgets.WishlistStateType', s6.widgets.WishlistStateType);
	goog.exportProperty(s6.widgets.WishlistStateType, 'CLOSE', s6.widgets.WishlistStateType.CLOSE);
	goog.exportProperty(s6.widgets.WishlistStateType, 'PENCIL', s6.widgets.WishlistStateType.PENCIL);
	goog.exportProperty(s6.widgets.WishlistStateType, 'LIST', s6.widgets.WishlistStateType.LIST);
	goog.exportProperty(s6.widgets.WishlistStateType, 'FULL', s6.widgets.WishlistStateType.FULL);
});