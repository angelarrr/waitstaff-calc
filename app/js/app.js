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
	$scope.meal = {};
	$scope.customer = {};
	$scope.earnings = {};

	/* submit function */
	$scope.submit = function() {
		if($scope.myCalc.$valid) {

			$scope.customer.subtotal = $scope.meal.price * (1 + ($scope.meal.taxRate/100));
			$scope.customer.tip = $scope.meal.price*($scope.meal.tipPercent/100);
			$scope.customer.total = $scope.customer.subtotal + $scope.customer.tip;

			$scope.earnings.tips += $scope.customer.tip;
			$scope.earnings.mealCount += 1
			$scope.earnings.avgTip = $scope.earnings.tips/$scope.earnings.mealCount;

			$scope.meal = {};
		} else {
			console.log("form not valid");
		}
	};

	/* reset function for enter meal details */
	$scope.cancel = function() {
		$scope.meal = {};
		$scope.customer = {};
	};

	/* reset all values */
	$scope.reset = function() {
		$scope.earnings = {};
		$scope.cancel();
	};
});