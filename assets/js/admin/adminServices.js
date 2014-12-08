var adminServices = angular.module('adminServices', ['ngResource']);

adminServices.factory('mindFactory', ['$resource', function($resource){
	return $resource('/mind/:id', {id: '@id'}, {
      update: {method:'PUT'}
    });
}]);

adminServices.factory('sensorFactory', ['$resource', function($resource){
	return $resource('/sensor/:id', {id: '@id'}, {
		query: {method:'GET', isArray:false},
		update: {method:'PUT'},
		suggest: {method:'GET', url:'/sensor/suggest', isArray:true}
	});
}]);

adminServices.factory('roles', [function(){
		return [{code:'guest', name:'Guest'},
		        {code:'demo', name:'Demo'},
		        {code:'mind', name:'Mind'},
		        {code:'meteologist', name:'Meteologist'},
		        {code:'validator', name:'Validator'},
		        {code:'admin', name:'Administrator'}];
}]);

adminServices.factory('sensorStatus', [function(){
	return [{code:'unapproved', name:'Unapproved'},
	        {code:'approved', name:'Approved'},
	        {code:'assigned', name:'Assigned'}];
}]);

adminServices.factory('timezones', [function(){
	return ['Europe/Paris', 'Europe/London'];
}]);

adminServices.factory('recovery', ['$resource',
  function($resource){
    return $resource('/admin/recreate-indexes', {}, {
      query: {method:'GET', isArray:true}
    });
}]);
