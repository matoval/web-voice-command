const webVoiceCommand = require('./index.js')

describe('webVoiceCommand and methods defined', function () {
  it('wordList is a object', function () {
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
  beforeEach(() => {
    class MockedSpeechRecognition {
      constructor() {
        this.onresult = (e) => {
          return (e = {
            results: [
              {
                transcript: 'test test',
              },
            ],
          })
        }
        window.addEventListener('result', this.onresult)
      }
      start = () => {
        return jest.fn()
      }
    }

    SpeechRecognition = jest.fn(MockedSpeechRecognition)
    listening = jest.fn(new MockedSpeechRecognition())
    window.dispatchEvent(new Event('result'))
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
  // it('get results', function () {
  //   let expectedResult
  //   webVoiceCommand.results((result) => {
  //     expectedResult = result
  //   })
  //   expect(expectedResult).toEqual('test test')
  // })

  // it('startStop works with 1 button', function () {
  //   expect(webVoiceCommand.startStop(1, 'toggle')).toEqual(true)
  // })

  // it('startStop works with 2 button', function () {
  //   expect(webVoiceCommand.startStop(2, 'start')).toEqual(true)
  // })

  // it("startStop doesn't works with 3 button", function () {
  //   expect(webVoiceCommand.startStop(3, 'toggle')).toEqual(
  //     'Error startStopTrigger was passed more than two numberOfButtons'
  //   )
  // })

  // it('wordList retrun words without actions', function () {
  //   let test
  //   const words = [
  //     {
  //       word: {
  //         name: 'red',
  //         alternateWord: [],
  //       },
  //     },
  //     {
  //       word: {
  //         name: 'blue',
  //         alternateWord: [],
  //       },
  //     },
  //     {
  //       word: {
  //         name: 'yellow',
  //         alternateWord: [],
  //       },
  //     },
  //   ]
  //   webVoiceCommand.wordList(words, false, function (result) {
  //     test = result
  //   })
  //   expect(test).toEqual(['red', 'blue', 'yellow'])
  // })

  // it('wordList retrun words withActions', function () {
  //   let test
  //   const words = [
  //     {
  //       actionWord: {
  //         name: 'pick',
  //         options: [
  //           {
  //             word: 'blue',
  //             alternateWord: [],
  //           },
  //           {
  //             word: 'red',
  //             alternateWord: [],
  //           },
  //           {
  //             word: 'yellow',
  //             alternateWord: [],
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       actionWord: {
  //         name: 'select',
  //         options: [
  //           {
  //             word: 'home',
  //             alternateWord: [],
  //           },
  //           {
  //             word: 'about',
  //             alternateWord: [],
  //           },
  //           {
  //             word: 'contact',
  //             alternateWord: [],
  //           },
  //         ],
  //       },
  //     },
  //   ]
  //   webVoiceCommand.wordList(words, true, function (result) {
  //     test = result
  //   })
  //   expect(test).toEqual('blue')
  // })
})
