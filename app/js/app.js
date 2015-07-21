var app = angular.module('wsCalc', ['ngRoute', 'ngAnimate']);

app.run(function($rootScope, $location, $timeout) {
	$rootScope.$on('$routeChangeError', function() {
		$location.path("/error");
	});
	$rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
	});
	$rootScope.$on('$routeChangeSuccess', function() {
		$timeout(function() {
			$rootScope.isLoading = false;
		}, 1000);
	});
})

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

app.factory('data', function(){
	return {
		subtotal: 0,
		tipAmount: 0,
		mealTotal: 0,
		tipTotal: 0,
		mealCount: 0,
		avgTip: 0
	}
})

app.controller('wsController', ['$scope', '$route', 'data', function($scope, $route, data) {
	$scope.tipTotal = data.tipTotal;
	$scope.mealCount = data.mealCount;
	$scope.avgTip = data.avgTip;

	/* submit function */
	$scope.submit = function() {
		if($scope.myCalc.$valid) {
			// customer charges
			$scope.subtotal = $scope.mealPrice * (1 + ($scope.taxRate/100));
			$scope.tipAmount = $scope.mealPrice*($scope.tipPercent/100);
			$scope.mealTotal = $scope.subtotal + $scope.tipAmount;

			// earnings
			data.tipTotal += $scope.tipAmount;
			data.mealCount += 1
			data.avgTip = data.tipTotal/data.mealCount;

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
		data.subtotal = 0;
		data.tipAmount = 0;
		data.mealTotal=0;
		data.tipTotal = 0;
		data.mealCount = 0;
		data.avgTip = 0;
		$scope.cancel();
		$route.reload();
	};
}]);