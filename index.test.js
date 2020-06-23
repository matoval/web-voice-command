const webVoiceCommand = require('web-voice-command')

describe('webVoiceCommand and methods defined', function () {
  it('wordList is a function', function () {
    expect(typeof webVoiceCommand).toBe('object')
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

describe('Mock the SpeechRecognition object', function () {
  // SpeechRecognition = jest.fn()
  const mockSpeech = {
    results() {
      return (event = {
        results: [{ transcript: 'test test test' }],
      })
    },
  }
  beforeEach(() => {
    const listening = jest.spyOn(mockSpeech, 'window.SpeechRecognition')
  })

  it('SpeechRecognition is defined', function () {
    expect(window.SpeechRecognition).toBeDefined()
  })

  it('setOptions calls start function', function () {
    expect(webVoiceCommand.setOptions).toBeDefined()
  })

  it('setOptions calls SpeechRecognition function', function () {
    webVoiceCommand.results()
    expect(window.SpeechRecognition).toHaveBeenCalled()
  })
})
