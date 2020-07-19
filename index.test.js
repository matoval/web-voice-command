const webVoiceCommand = require('./index.js')

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
    listening = window.SpeechRecognition

    listening.onresult = jest.fn(() => 'test test')
    webVoiceCommand.results = jest.fn((callback) => {
      return callback(listening.onresult())
    })

    listening.start = jest.fn(() => true)
    listening.stop = jest.fn(() => false)
    webVoiceCommand.startStop = jest.fn((numberOfButtons, button) => {
      let listeningToggle = false
      if (numberOfButtons === 1) {
        listeningToggle = !listeningToggle
        if (listeningToggle) {
          return listening.start()
        } else {
          return listening.stop()
        }
      } else if (numberOfButtons === 2) {
        const buttonClicked = button
        if (buttonClicked === 'start') {
          return listening.start()
        } else if (buttonClicked === 'stop') {
          return listening.stop()
        }
      } else {
        return `Error startStopTrigger was passed more than two numberOfButtons`
      }
    })

    webVoiceCommand.wordList = jest.fn((words, withActions, callback) => {
      let actions = []
      let e = {
        results: [
          {
            transcript: 'red blue yellow',
          },
        ],
      }
      mockListen = (e) => {
        // const results = e.results[0]
        let transcripts = e.results[0].transcript.split(' ')
        if (transcripts.length > 0) {
          //return a single word said after the actionWord
          if (withActions) {
            transcripts = ['pick', 'blue']
            actions = words
            for (const action of actions) {
              if (action.actionWord.name === transcripts[0]) {
                actions = action.actionWord
                for (const word of actions.options) {
                  if (word.word === transcripts[1]) {
                    return callback(word.word)
                  }
                }
              }
            }
          }
          //returns an array of all words that match the list of words
          else {
            let filteredTranscript = []
            for (const word of words) {
              filteredTranscript = [
                ...filteredTranscript,
                ...transcripts.filter((match) => match === word.word.name),
              ]
            }
            return callback(filteredTranscript)
          }
        }
      }
      mockListen(e)
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

  it('get results', function () {
    let expectedResult
    webVoiceCommand.results((result) => {
      expectedResult = result
    })
    expect(expectedResult).toEqual('test test')
  })

  it('startStop works with 1 button', function () {
    expect(webVoiceCommand.startStop(1, 'toggle')).toEqual(true)
  })

  it('startStop works with 2 button', function () {
    expect(webVoiceCommand.startStop(2, 'start')).toEqual(true)
  })

  it("startStop doesn't works with 3 button", function () {
    expect(webVoiceCommand.startStop(3, 'toggle')).toEqual(
      'Error startStopTrigger was passed more than two numberOfButtons'
    )
  })

  it('wordList retrun words without actions', function () {
    let test
    const words = [
      {
        word: {
          name: 'red',
          alternateWord: [],
        },
      },
      {
        word: {
          name: 'blue',
          alternateWord: [],
        },
      },
      {
        word: {
          name: 'yellow',
          alternateWord: [],
        },
      },
    ]
    webVoiceCommand.wordList(words, false, function (result) {
      test = result
    })
    expect(test).toEqual(['red', 'blue', 'yellow'])
  })

  it('wordList retrun words withActions', function () {
    let test
    const words = [
      {
        actionWord: {
          name: 'pick',
          options: [
            {
              word: 'blue',
              alternateWord: [],
            },
            {
              word: 'red',
              alternateWord: [],
            },
            {
              word: 'yellow',
              alternateWord: [],
            },
          ],
        },
      },
      {
        actionWord: {
          name: 'select',
          options: [
            {
              word: 'home',
              alternateWord: [],
            },
            {
              word: 'about',
              alternateWord: [],
            },
            {
              word: 'contact',
              alternateWord: [],
            },
          ],
        },
      },
    ]
    webVoiceCommand.wordList(words, true, function (result) {
      test = result
    })
    expect(test).toEqual('blue')
  })
})
