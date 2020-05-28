module.exports.webVoiceCommand = () => {
  window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
  const listening = new SpeechRecognition()
  listening.start()
}
