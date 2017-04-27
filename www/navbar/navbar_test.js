describe('myApp.navbars', function(){

	var navbar = require("../../e2e-tests/page-objects/navbar-page.js"),
	    login = require("../../e2e-tests/page-objects/login-page.js");

	beforeEach(function() {
		navbar.get();
	});

	afterEach(function() {
		navbar.passwordAccountBtn.isDisplayed()
		.then(function(isDisplayed) {
			if(isDisplayed) {
				navbar.logoutOfPasswordAccount();
			}
		});
	});

	it('should navigate to the login page when login link is clicked', function() {
		navbar.clickLoginBtn();

		expect(browser.getCurrentUrl()).toEqual(navbar.getUrl('login'));
	});

	it('should navigate to the locomotive reports when the locomotive reports button is clicked', function() {
		navbar.clickLocomotiveReportsBtn();

		expect(browser.getCurrentUrl()).toEqual(navbar.getUrl('locomotive/reports'));
	});

// 	it('should hide the link to the lists view when not logged in', function() {		
// 		expect(navbar.listsBtn.isDisplayed()).toBeFalsy();
// 	});

	it('should logout when the logout button is clicked if a user is logged in', function() {
		
		expect(navbar.loginBtn.isDisplayed()).toBeTruthy();
		expect(navbar.passwordAccountBtn.isDisplayed()).toBeFalsy();
		
		navbar.clickLoginBtn();

		login.loginWithPassword('test@account.com', 'test');

		browser.sleep(1000); // Need to wait for authentication to be returned

		expect(navbar.loginBtn.isDisplayed()).toBeFalsy();
		expect(navbar.passwordAccountBtn.isDisplayed()).toBeTruthy();


		navbar.logoutOfPasswordAccount();


		expect(navbar.loginBtn.isDisplayed()).toBeTruthy();
		expect(navbar.passwordAccountBtn.isDisplayed()).toBeFalsy();
	});

// 	it('should show the link to the lists view when logged in', function() {

// 		navbar.clickLoginBtn();

// 		login.loginWithPassword('test@account.com', 'test');
		
// 		browser.sleep(1000);

// 		expect(navbar.listsBtn.isDisplayed()).toBeTruthy();
// 	});
});