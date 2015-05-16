exports.config = {
  capabilities: {
  	'browserName': 'chrome',
  	'chromeOptions': {
  		args: ['show-fps-counter=true']
  	},
  	'framework': 'jasmine2'
  },
  specs: ['../www/**/*_test.js']
}