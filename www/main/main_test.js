describe('myApp.main module', function() {
  it('should have a title', function() {
    browser.get('http://localhost:3000/');

    expect(browser.getTitle()).toEqual('Demo');
  });

  it('should have default text when input is blank', function() {
  	element(by.model('message')).sendKeys('');

  	var message = element(by.binding('message'));

  	expect(message.getText()).toEqual('Enter message below');
  });

  it('should mimic the text input', function() {
  	var testText = "Hello, this is a test";

  	element(by.model('message')).sendKeys(testText);

  	var message = element(by.binding('message'));

  	expect(message.getText()).toEqual(testText);
  });
});