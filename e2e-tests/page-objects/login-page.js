var LoginPage = function() {
	var self = this;
	self.email = element(by.model('user.email'));
	self.password = element(by.model('user.password'));
	self.loginBtn = element(by.buttonText('Login'));

	self.clickLoginBtn = function() {
		return self.loginBtn.click();
	};

	self.loginWithPassword = function(email, password) {
		self.email.sendKeys(email);
		self.password.sendKeys(password);

		return self.clickLoginBtn();
	};
};

module.exports = new LoginPage();