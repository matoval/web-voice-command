const webVoiceCommand = require('web-voice-command')
const { Corti } = require('./node_modules/corti/src/corti')

describe('Corti.patch', function() {

  it('is Corti an object', function () {
    expect(typeof Corti).toBe('object');
  });

  it('is Corti.patch a function', function () {
    expect(typeof Corti.patch).toBe('function');
  });

  it('is Corti.unpatch a function', function () {
    expect(typeof Corti.unpatch).toBe('function');
  });

  it('is Corti defined should fail', function () {
    expect(Corti.patch).toBeDefined();
  });

  it('should make SpeechRecognition defined', function () {
    expect(window.SpeechRecognition).toBeUndefined();
    Corti.patch();
    expect(window.SpeechRecognition).toBeDefined();
    Corti.unpatch();
  });

});
