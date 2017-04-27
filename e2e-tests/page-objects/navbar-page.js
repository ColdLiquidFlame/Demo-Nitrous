var url = require('url');

var NavbarPage = function() {
	var self = this;
	self.address = 'http://localhost:3000';

	self.loginBtn = element(by.css("a[href='/login']"));
	self.locomotiveReportsBtn = element(by.css("a[href='/locomotive/reports']"));
	self.listsBtn = element(by.css("a[href='/lists']"));
	self.passwordAccountBtn = element(by.css("a[data-toggle='dropdown']"));
	self.logoutBtn = element(by.css("a[ng-click='logout()']"));

	self.clickLoginBtn = function() {
		return self.loginBtn.click();
	};

	self.clickLogoutBtn = function() {
		return self.logoutBtn.click();
	};

	self.clickLocomotiveReportsBtn = function() {
		return self.locomotiveReportsBtn.click();
	};

	self.clickPasswordAccountBtn = function() {
		return self.passwordAccountBtn.click();
	};

	self.logoutOfPasswordAccount = function() {
		self.clickPasswordAccountBtn();

		return self.clickLogoutBtn();
	};

	self.get = function(route) {
		var fullUrl = self.getUrl(route);
		return browser.get(fullUrl);
	};

	self.getUrl = function(route) {
		route = route || '';

		var fullUrl = url.resolve(self.address, route);

		return fullUrl;
	};
};

module.exports = new NavbarPage();