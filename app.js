(function () {
'use strict';

angular.module('ShoppingListCheckoff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckoffService', ShoppingListCheckoffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckoffService'];
function ToBuyShoppingController(ShoppingListCheckoffService) {
  var toBuyItems = this;
  toBuyItems.items = ShoppingListCheckoffService.getItems();
  
  toBuyItems.markBought = function (itemIndex) {
  	return ShoppingListCheckoffService.markItemBought(itemIndex);
  };

  toBuyItems.isEmpty = function () {
  	return ShoppingListCheckoffService.toBuyListIsEmpty();
  };
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckoffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckoffService) {
  var boughtItems = this;

  boughtItems.items = ShoppingListCheckoffService.getBoughtItems();
  boughtItems.isEmpty = function () {
  	return ShoppingListCheckoffService.boughtItemsIsEmpty();
  };
}

function ShoppingListCheckoffService() {
  var service = this;

  var itemsToBuy = [
  				{name: "butter", quantity: "2 lbs"},
  				{name: "eggs", quantity: "1 dozen"},
  				{name: "flour", quantity: "5 lbs"},
  				{name: "granulated sugar", quantity: "2 lbs"},
  				{name: "brown sugar", quantity: "2 lbs"},
  				{name: "baking soda", quantity: "1 box"}
  			];
  var itemsBought = [];

  service.markItemBought = function (itemIndex) {
    var item = itemsToBuy[itemIndex];
    itemsBought.push(item);
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return itemsToBuy;
  };

  service.toBuyListIsEmpty = function () {
  	return (itemsToBuy.length === 0);
  }

  service.getBoughtItems = function () {
    return itemsBought;
  };

  service.boughtItemsIsEmpty = function () {
  	return (itemsBought.length === 0);
  }

}

})();