let listening
let listeningToggle = false
//Set options
function setOptions(newOptions) {
  // const window = window

  //Call browser API for Web Speech
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
  listening = new SpeechRecognition()

  //Options defaults
  let options = {
    persistentListening: false,
    listenOnLoad: false,
    language: 'en-US',
  }

  options = { ...options, ...newOptions }

  if (options.persistentListening) {
    listening.start()
    listening.addEventListener('end', listening.start)
  }

  if (options.listenOnLoad) {
    listening.start()
  }

  if (options.language) {
    listening.lang = options.language
  }
}

//Get all voice inputs
function results(callback) {
  listening.onresult = function (e) {
    const results = e.results[0]
    const transcripts = results[0].transcript.split(' ')
    return callback(transcripts)
  }
}

//Start and stop listening using one or two buttons
function startStop(numberOfButtons, button) {
  if (numberOfButtons === 1) {
    listeningToggle = !listeningToggle
    if (listeningOn) {
      listening.start()
      listening.addEventListener('end', listening.start)
    } else {
      listening.removeEventListener('end', listening.start)
      listening.stop()
    }
  } else if (numberOfButtons === 2) {
    const buttonClicked = button
    if (buttonClicked === 'start') {
      listening.start()
      listening.addEventListener('end', listening.start)
    } else if (buttonClicked === 'stop') {
      listening.removeEventListener('end', listening.start)
      listening.stop()
    }
  } else {
    console.log(
      `Error startStopTrigger was passed more than two numberOfButtons`
    )
  }
}
//Get results that match word list
function wordList(words, withActions, callback) {
  let actions = []
  listening.onresult = function (e) {
    const results = e.results[0]
    const transcripts = results[0].transcript.split(' ')
    if (transcripts.length > 0) {
      //return a single word said after the actionWord
      if (withActions) {
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
}

module.exports = { setOptions, results, startStop, wordList }
