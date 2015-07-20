var app = angular.module('wsCalc', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/', {
		templateUrl : 'home.html',
		controller : 'wsController'
	}).when('/meal', {
		templateUrl : 'meal.html',
		controller : 'wsController'
	}).when('/earnings', {
		templateUrl : 'earnings.html',
		controller : 'wsController'
	}).otherwise('/');
}])

app.controller('wsController', function($scope) {
	$scope.tipTotal = 0;
	$scope.mealCount = 0;
	$scope.avgTip = 0;

	/* tax calculation */
	$scope.taxCalc = function(price, taxRate) {
		return price*(1+(taxRate/100));
	};

	/* tip calculation */
	$scope.tipCalc = function(price, tipPercent) {
		return price*(tipPercent/100);
	};

	/* submit function */
	$scope.submit = function() {
		if($scope.myCalc.$valid) {
			/* customer charges section */
			/* subtotal calculation incl. tax */
			$scope.subtotal = $scope.taxCalc($scope.mealPrice, $scope.taxRate);
			/* calculate tip based on subtotal */
			$scope.tipAmount = $scope.tipCalc($scope.mealPrice, $scope.tipPercent);
			/* calculate meal total */
			$scope.mealTotal = $scope.subtotal + $scope.tipAmount;

			/* earnings */
			/* add tip amount to tip total */
			$scope.tipTotal += $scope.tipAmount;
			/* add meal count */
			$scope.mealCount += 1
			/* calculate avg tip per meal */
			$scope.avgTip = $scope.tipTotal/$scope.mealCount;

			$scope.cancel();
		} else {
			console.log("form not valid");
		}
	};

	/* reset function for enter meal details */
	$scope.cancel = function() {
		$scope.mealPrice = "";
		$scope.taxRate = "";
		$scope.tipPercent = "";
	};

	/* reset all values */
	$scope.reset = function() {
		$scope.subtotal = 0;
		$scope.tipAmount = 0;
		$scope.mealTotal=0;
		$scope.tipTotal = 0;
		$scope.mealCount = 0;
		$scope.avgTip = 0;
		$scope.cancel();
	};
});