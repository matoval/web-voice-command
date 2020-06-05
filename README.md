# web-voice-command

## **Install**
```javasript
npm i web-voice-command
```

## **Usage**
## Compatibility:
  Currently only works on chrome. Other browsers do not have support for the Web Speech API as of June 2020.

## Options:
  - **Use setOptions to set the options you need.**
  - **persistentListening:** If true listening will be continuous, if false listening will only last four secounds. * *When using the startStop method persistentListening option doesn't come into effect. StartStop method will continuously listen until stoped*
  - **listenOnLoad:** If ture listening will start when the page loads. If persistentListening is false listening will only last four seconds.

  *Default options* 
  - persistentListening: false
  - listenOnLoad: false
  - language: 'en-US'
  
## Methods:
  - **setOptions:** Used to set options
  ```javascript
   webVoiceCommand.setOptions({
    persistentListening: true,
    listenOnLoad: true,
    language: 'ro-RO' //set language to ro-RO Romanian Romania
  })
  ```
  *setting language use BCP 47 Language Codes*
  BCP 47 Language Codes:

ar-SA Arabic Saudi Arabia\
cs-CZ Czech Czech Republic\
da-DK Danish Denmark\
de-DE German Germany\
el-GR Modern Greek Greece\
en-AU English Australia\
en-GB English United Kingdom\
en-IE English Ireland\
en-US English United States\
en-ZA English South Africa\
es-ES Spanish Spain\
es-MX Spanish Mexico\
fi-FI Finnish Finland\
fr-CA French Canada\
fr-FR French France\
he-IL Hebrew Israel\
hi-IN Hindi India\
hu-HU Hungarian Hungary\
id-ID Indonesian Indonesia\
it-IT Italian Italy\
ja-JP Japanese Japan\
ko-KR Korean Republic of Korea\
nl-BE Dutch Belgium\
nl-NL Dutch Netherlands\
no-NO Norwegian Norway\
pl-PL Polish Poland\
pt-BR Portuguese Brazil\
pt-PT Portuguese Portugal\
ro-RO Romanian Romania\
ru-RU Russian Russian Federation\
sk-SK Slovak Slovakia\
sv-SE Swedish Sweden\
th-TH Thai Thailand\
tr-TR Turkish Turkey\
zh-CN Chinese China\
zh-HK Chinese Hong Kong\
zh-TW Chinese Taiwan
  - **results:** Returns all voice inputs in arrays that are separated by pauses in voice inputs.
  ```javascript
   webVoiceCommand.results(function(result){
    console.log(result)
  })
  ```
console with voice input "hello world".
  ```javascript
 (2) ["hello", "world"]
  ```

  - **startStop:** Use with DOM events, like button clicks, to start and stop listening. First parameter is either 1 or 2. 1 being one DOM element and 2 being two separate DOM elements, one element sending the value “start” and the other sending the value “stop”.
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
      - **Without actionsWords:** returns an **array of words** as many time they are vocilized. But will only return words that are listed.
      - **With actionWords:** returns only a **single word** vocilized after the actionWord and that is listed in the options array as a word.
    - Takes three parameters:  
    1. First an array of objects with or without actionWords.
    
    Without actionWords
    ```javascript
    const words = [
      {
        word: {
        name: 'red',
        alternateWord: []
        }
      },
      { 
        word: {
          name: 'blue',
          alternateWord: []
        }
      },
      {
        word: {
          name: 'yellow',
          alternateWord: []
        }
      }
    ]
    ```
    With actionWords
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
    console without actionWords. Voice input "red blue yellow".
    ```javascript
    (3) ["red", "blue", "yellow"]
    ```
    console with actionWords. Voice input "select home".
    ```javascript
    home
    ```




## **Author**
Matthew Sandoval
- Twitter: [@matthewsand0val](https://twitter.com/Matthewsand0val)
- Github: [@matoval](https://github.com/matoval)
- LinkedIn: [@matoval](https://www.linkedin.com/in/matoval/)