# web-voice-command

## Install
```javasript
npm install web-voice-command
```

## Usage
  ### Compatibility:
  Currently only works on chrome but the next update to the package will work on more browsers.

  ### Options:
  - **Use setOptions to set the options you need.**
  - **persistentListening:** If true listening will be continuous, if false listening will only last four secounds. * *When using the startStop method persistentListening option doesn't come into effect. StartStop method will continuously listen until stoped*
  - **listenOnLoad:** If ture listening will start when the page loads. If persistentListening is false listening will only last four seconds.

  *Default options* 
  - persistentListening: false
  - listenOnLoad: false
  
  ### Methods:
  - **results:** Returns all voice inputs in arrays separated by pauses in voice inputs.
  ```javascript
   webVoiceCommand.results(function(result){
    console.log(result)
  })
  ```
  - **setOptions:** Used to set options
  ```javascript
   webVoiceCommand.setOptions({
    persistentListening: true,
    listenOnLoad: true
  })
  ```
  - **startStop:** Use with DOM events, like buttons, to start and stop listening. First parameter is either 1 or 2. 1 being a toggle and 2 being two separate inputs, one input sending the value “start” and the other sending the value “stop”
  ```javascript
  function handleClick(event) {
    webVoiceCommand.startStop(2, event.target.value)
  }
  ```
  ```html
  <button value='start' onClick={handleClick}>Start</button>
  <button value='stop' onClick={handleClick}>Stop</button>
  ```
  - **wordList:** **Requires the persistentListening option to be set to true.*
    - wordList is used to return only word you listed. 
      - **Array of words:** returns an **array of words** as many time they are vocilized. But will only return words that are listed.
      - **Array of objects using actionWords:** returns only a **single word** vocilized after the actionWord and that is listed in the options array as a word.
    - Takes three parameters:  
    1. First either an array of words or an array of objects to use with withActions.
    ```javascript
    const words = ['red', 'blue', 'yellow']
    ```
    ```javascript
    const words = [
      {
        actionWord: {
          name: 'pick',
          options: [
            {
              word: 'blue',
              alternateWord: []
            }, 
            {
              word: 'red',
              alternateWord: []
            }, 
            {
              word: 'yellow',
              alternateWord: []
          }]
        }
      },
      {
        actionWord: {
          name: 'select',
          options: [
            {
              word: 'home',
              alternateWord: []
            },
            {
              word: 'about',
              alternateWord: []
            },
            {
              word: 'contact',
              alternateWord: []
            }
          ]
        }
      }
    ]
    ```
    2. Second a boolean if actionWords are being used.
    ```javascript
    const withActions = false
    ```
    3. Third a callback that returns an array of matched words if you are not using actionWords or a single word if you are using actionWords.
    ```javascript
    webVoiceCommand.wordList(words, withActions, function(result) {
    console.log(result)
    })
    ```




## Author
Matthew Sandoval
- Twitter: [@matthewsand0val](https://twitter.com/Matthewsand0val)
- Github: [@matoval](https://github.com/matoval)
- LinkedIn: [@matoval](https://www.linkedin.com/in/matoval/)