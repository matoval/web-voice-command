const webVoiceCommand = require('web-voice-command')
const { Corti } = require('./node_modules/corti/src/corti')

describe('webVoiceCommand and methods defined', function () {
  it('webVoiceCommand is an object', function () {
    expect(typeof webVoiceCommand.startStop).toBe('function')
  })

  it('setOptions is a function', function () {
    expect(typeof webVoiceCommand.setOptions).toBe('function')
  })

  it('results is a function', function () {
    expect(typeof webVoiceCommand.results).toBe('function')
  })

  it('startStop is a function', function () {
    expect(typeof webVoiceCommand.startStop).toBe('function')
  })

  it('wordList is a function', function () {
    expect(typeof webVoiceCommand.wordList).toBe('function')
  })
})
