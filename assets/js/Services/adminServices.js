

/*adminServices.factory('mindFactory', ['$resource', function($resource){
	return $resource('/mind/:id', {id: '@id'}, {
      update: {method:'PUT'},
			fetchByRole: {method: 'GET', url:'/mind/fetchByRole', isArray:true}
    });
}]);*/

adminServices.factory('roles', [function(){
		return [{code:'guest', name:'Guest'},
		        {code:'demo', name:'Demo'},
		        {code:'mind', name:'Mind'},
		        {code:'meteologist', name:'Meteologist'},
		        {code:'validator', name:'Validator'},
		        {code:'admin', name:'Administrator'}];
}]);

adminServices.factory('timezones', [function(){
	return ['Europe/Paris', 'Europe/London'];
}]);

/*adminServices.factory('recovery', ['$resource',
  function($resource){
    return $resource('/admin/resetIndices', {}, {
      query: {method:'GET', isArray:false}
    });
}]);*/
