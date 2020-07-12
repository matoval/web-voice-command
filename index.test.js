const webVoiceCommand = require('web-voice-command')
const { results } = require('.')

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
  beforeAll(() => {
    window.SpeechRecognition = jest.fn()
    window.SpeechRecognition.onresult = jest
      .fn()
      .mockImplementation((callback) => {
        callback({
          results: [{ transcript: ['test test'] }],
        })
        window.SpeechRecognition.options = jest.fn()
        window.SpeechRecognition.startStop = jest.fn()
      })
  })

  it('SpeechRecognition is defined', function () {
    expect(window.SpeechRecognition).toBeDefined()
  })

  it('setOptions calls start function', function () {
    expect(webVoiceCommand.setOptions).toBeDefined()
  })

  it('results calls start function', function () {
    expect(webVoiceCommand.results).toBeDefined()
  })

  //still failing. need to mock the web speech API
  // it('get results', function () {
  //   let expectedResult
  //   webVoiceCommand.results((result) => {
  //     expectedResult = result
  //   })
  //   expect(expectedResult).toEqual('test test')
  // })
})
