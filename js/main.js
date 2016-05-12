angular.module('flickr', ['ngAnimate'])
.config(function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
	.controller('flickrCtrl', function($scope, $http, $sce) {
		"use strict";

		$scope.trustSrc = function(src) {
			return $sce.trustAsResourceUrl(src);
		}

		$scope.searchFlickr = function(userInput) {
			$scope.userInput = userInput;

			var url = "https://api.flickr.com/services/rest";

			var request = {
			    method: 'flickr.photos.search',
			    api_key: 'd0ea579ba5590c98f751bf1469e182b0',
			    tags: $scope.userInput,
			    format: 'json',
			    nojsoncallback: 1				
			}

			$scope.query = "Searching Flickr for photos with " + "\"" + $scope.userInput + "\"";

			$http({
				method: 'GET',
				url: url,
				params: request
			})	
			.then(function(response) {
				$scope.photos = response.data.photos.photo;
		  		$scope.query = "There are " + response.data.photos.total + " found";
		  		$scope.userInput = "";			
			},
			function(response) {
				alert('error');
			});
		};
	});


