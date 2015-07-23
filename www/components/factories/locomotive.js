angular.module('locomotive-factory', ['firebase'])

.factory('LocomotiveReport', function($firebaseObject, $firebaseArray, $q, $rootScope) {
	var baseUrl = "https://nitrous-demo.firebaseio.com/",
		locomotiveUrl = baseUrl + "locomotives/",
		reportUrl = baseUrl + "locomotive-reports/",
		ref = new Firebase(baseUrl),
		reports = [],
		reportsByLocomotiveNumber = [];

	var add = function(report) {
		// Check to see if locmotive has been reported before
		var locomotiveRef = new Firebase(locomotiveUrl + report.locomotiveNumber);
		locomotiveRef.once("value", function(snapshot) {
			if (!snapshot.exists()) {
				new Firebase(locomotiveUrl).
				child(report.locomotiveNumber).
				set({
					name: report.locomotiveNumber
				});
			}
		});
		var reportRef = new Firebase(reportUrl);

		return $firebaseArray(reportRef).$add(report);
	};

	var update = function(reportId, report) {
		var reportRef = ref.child(reportId);
		reportRef.set(report);
		return $firebaseObject(reportRef);
	};

	var remove = function(report) {
		var record = reports.$getRecord(report.$id);
		return reports.$remove(record);
	};

	var getAllReports = function() {
		var deferred = $q.defer();

		var query = new Firebase(reportUrl);
		query.on('value', function(snapshot) {
			reports.length = 0;
			var locomotiveRef = new Firebase(locomotiveUrl).
			once('value', function(l_snapshot) {
				l_snapshot.forEach(function(l) {
					query.
					orderByChild("locomotiveNumber").
					equalTo(l.key()).
					once('value', function(r_snapshot) {
						if (r_snapshot.val() !== null) {
							var tempTable = [];
							for (var p in Object.keys(r_snapshot.val())) {
								var report = r_snapshot.val()[Object.keys(r_snapshot.val())[p]];
								report.id = Object.keys(r_snapshot.val())[p]; //p;
								report.options = {
									labelContent: report.locomotiveNumber,
									labelClass: 'marker-label'
								};
								tempTable.push(report);
							}
							reports.push(
								tempTable.reduce(function(a, b) {
									var result = a.dateSpotted >= b.dateSpotted ? a : b;
									return result;
								})
							);
						}
					});
				});

				deferred.resolve(reports);
				$rootScope.$apply();
			});
		});

		return deferred.promise;
	};

	var getReportByLocomotiveNumber = function(locomotiveNumber) {
		var deferred = $q.defer();

		var query = new Firebase(reportUrl).
		orderByChild("locomotiveNumber").
		equalTo(locomotiveNumber).
		on('value', function(r_snapshot) {
			reportsByLocomotiveNumber.length = 0;
			if (r_snapshot.val() !== null) {
				var tempTable = [];
				for (var p in Object.keys(r_snapshot.val())) {
					reportsByLocomotiveNumber.push(r_snapshot.val()[Object.keys(r_snapshot.val())[p]]);
				}

				reportsByLocomotiveNumber.sort(function(a, b) {
					if (a.dateSpotted < b.dateSpotted) return -1;
					if (a.dateSpotted > b.dateSpotted) return 1;
					return 0;
				});
				deferred.resolve(reportsByLocomotiveNumber);
				$rootScope.$apply();
			}
		});

		return deferred.promise;
	};

	var getReportByUserId = function(uid) {
		var reportByUserRef = ref.child(uid);
		return $firebaseObject(reportByUserRef);
	};
	return {
		Add: add,
		Update: update,
		Remove: remove,
		GetAllReports: getAllReports,
		GetReportByLocomotiveNumber: getReportByLocomotiveNumber,
		//GetReportByUserId: getReportByUserId,
		Reports: reports,
		ReportsByLocomotiveNumber: reportsByLocomotiveNumber

	};
});
