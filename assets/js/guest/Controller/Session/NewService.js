
guestServices.factory('sessionFactory', ['$resource', function($resource){
	return $resource('/session', {}, {
      create: {method:'POST', url:'/session/create'},
			destroy: {method: 'GET', url:'/session/destroy'}
    });
}]);
