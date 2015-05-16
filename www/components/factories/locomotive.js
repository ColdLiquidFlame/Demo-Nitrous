angular.module('locomotive-factory', ['firebase'])

.factory('LocomotiveReport', [ '$firebaseObject', '$firebaseArray' , function($firebaseObject, $firebaseArray) {
	var ref = new Firebase("https://nitrous-demo.firebaseio.com/locomotive-reports");
	var reports = $firebaseArray(ref);

	var add = function(report) {
	    return $firebaseArray(ref).$add(report);
	};

	var update = function(reportId, report){
        var reportRef = ref.child(reportId);
        reportRef.set(report);
        return $firebaseObject(reportRef);
	};

	var remove = function(report){
		var record = reports.$getRecord(report.$id);
		return reports.$remove(record);
	};

	var getAllReports = function(){
        return reports;
	};

	var getReportById = function(reportId){
        var reportRef = ref.child(reportId);
        return $firebaseObject(reportRef);
	};

	var getReportByUserId = function(uid){
        var reportByUserRef = ref.child(uid);
        return $firebaseObject(reportByUserRef);
	};

	return {
		Add: add,
		Update: update,
		Remove: remove,
		GetAllReports: getAllReports,
		GetReportById: getReportById,
		GetReportByUserId: getReportByUserId
	};
}]);