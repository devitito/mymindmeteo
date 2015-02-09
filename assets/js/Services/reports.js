/**
 * @project Mind meteo
 * @author devitito
 * @date
 *
 */

adminServices.factory('reportsFactory', ['$resource', function($resource){
	var factory = $resource('/report/:id', {id:'@id'}, {});
	return factory;
}]);

adminServices.factory('reportCategories', [function(){
		return [{code:'pro', name:'Professional'},
		        {code:'friends', name:'Friends'},
		        {code:'family', name:'Family'},
		        {code:'lover', name:'Lover'}];
}]);

adminServices.factory('reportRanges', [function(){
		return [{code:'highest', name:'Highest'},
		        {code:'hight', name:'High'},
		        {code:'zero', name:'Zero'},
		        {code:'low', name:'Low'},
					 	{code:'lowest', name:'Lowest'}];
}]);
