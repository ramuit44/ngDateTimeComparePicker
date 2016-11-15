var macApp	=	angular.module('macApp',['csrf-token-interceptor','ngRoute','ngTable','duScroll','angucomplete-alt','googlechart',"ngSanitize", 'ngCsv',
          	 	                        'ui.bootstrap','textAngular', 'ngAnimate']);
macApp.config(['$httpProvider', function ($httpProvider) {  	
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
}]);

});
