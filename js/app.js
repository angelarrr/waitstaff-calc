var app = angular.module('wsCalc', []);

app.controller('wsController', function($scope) {
	$scope.tipTotal=0;
	$scope.mealCount = 0;
	$scope.avgTip = 0;

	/* tax calculation */
	$scope.taxCalc = function(price, taxRate) {
		return price*(1+(taxRate/100))
	};

	/* tip calculation */
	$scope.tipCalc = function(price, tipPercent) {
		return price*(tipPercent/100);
	}

	/* submit function */
	$scope.submit = function() {
		if($scope.myCalc.$valid) {
			/* subtotal calculation incl. tax */
			$scope.subtotal = $scope.taxCalc($scope.mealPrice, $scope.taxRate);
			/* calculate tip based on subtotal */
			$scope.tipAmount = $scope.tipCalc($scope.mealPrice, $scope.tipPercent);
			/* calculate meal total */
			$scope.mealTotal = $scope.subtotal + $scope.tipAmount;
		}
	}

	$scope.cancel = function() {
		$scope.mealPrice = "";
		$scope.taxRate = "";
		$scope.tipPercent = "";
	}

	$scope.reset = function() {
		$scope.mealPrice = "";
		$scope.tipTotal = 0;
		$scope.mealCount = 0;
		$scope.avgTip = 0;
		$scope.subtotal = 0;
		$scope.tipAmount = 0;
		$scope.mealTotal=0;
		$scope.cancel();
	};
});