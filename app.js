(function () {
'use strict';

angular.module('ShoppingListCheckoff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.controller('AddItemController', AddItemController)
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

AddItemController.$inject = ['ShoppingListCheckoffService'];
function AddItemController(ShoppingListCheckoffService) {
  var itemAdder = this;

  itemAdder.nameToAdd = "";
  itemAdder.quantityToAdd = "";
  itemAdder.addItem = function () {
  	ShoppingListCheckoffService.addItem(itemAdder.nameToAdd, itemAdder.quantityToAdd);
  };
}

function ShoppingListCheckoffService() {
  var service = this;

  var itemsToBuy = [
  				{ name: "butter", quantity: "2 lbs" },
  				{ name: "butter", quantity: "2 lbs" },
  				{ name: "flour", quantity: "5 lbs" },
  				{ name: "granulated sugar", quantity: "2 lbs" },
  				{ name: "brown sugar", quantity: "2 lbs" },
  				{ name: "baking soda", quantity: "1 box" }
  			];
  var itemsBought = [];

  service.addItem = function (itemName, itemQuantity) {
  	var item = { name: itemName, quantity: itemQuantity };
  	itemsToBuy.push(item);
  }

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