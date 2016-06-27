require('../helper');

var http = require('http')
var db = require('../../config/database').get('tweetz');
var server;

before(function() {
  server = http.createServer(require('../../app'));
  server.listen(0);
  browser.baseUrl = 'http://localhost:' + server.address().port;
});

beforeEach(function() {
  db.remove({});
  db.insert({text: 'I like animals'});
  db.insert({text: 'Animals sux'});
  db.insert({text: 'Stuff'});
  return browser.ignoreSynchronization = true;
});

after(function(){
  server.close();
});

describe('Tweeter', function() {
  it('should have a header', function(done) {
    browser.get('/');
    var header = $('h1');
    header.getText().then(function(text) {
      console.log(text);
      expect(text).to.equal('Thought Board');
      done();
    });
  });

  describe('New thoughts', function (){
    it('should have an empty text box', function(done) {
      browser.get('/');
      var textBox = element(by.tagName('textarea'));
      textBox.getAttribute('value').then(function(text) {
        expect(text).to.equal('');
        done();
      });
    });

    it('should allow user to enter text', function(done) {
      browser.get('/');
      var textBox = element(by.tagName('textarea'));
      textBox.sendKeys('something');
      textBox.getAttribute('value').then(function(text) {
        expect(text).to.equal('something');
        done();
      })
    });

    it('should have a submit button', function(done) {
      browser.get('/');
      var button = element(by.tagName('button'));
      button.getAttribute('value').then(function(text) {
        expect(text).to.equal('Thought Board It!');
        done();
      })
    });

    it('should clear text field after submit button is clicked', function(done) {
      browser.get('/');
      var textBox = element(by.tagName('textarea'));
      textBox.sendKeys('something');

      var button = element(by.tagName('button'));
      button.click();
      textBox.getAttribute('value').then(function(text) {
        expect(text).to.equal('');
        done();
      })
    });
    it('should append the thought to the bottom of posted thoughts', function(done) {
      browser.get('/');
      var textBox = element(by.tagName('textarea'));
      textBox.sendKeys('something');
      var button = element(by.tagName('button'));
      button.click();
      // var temp = element(by.id('post'));
      var post = element.all(by.id('post')).last();
      post.getText().then(function(text) {
        expect(text).to.equal('something');
        done();
      });
    });
    it('should append another thought to the obttom of posted thoughts', function(done) {
      browser.get('/');
      var textBox = element(by.tagName('textarea'));
      textBox.sendKeys('something');
      var button = element(by.tagName('button'));
      button.click();
      textBox.sendKeys('something else');
      button.click();
      var post = element.all(by.id('post')).last();
      post.getText().then(function(text) {
        expect(text).to.equal('something else');
        done();
      });
    })
  });
  describe('posted thoughts', function() {

  })
});
