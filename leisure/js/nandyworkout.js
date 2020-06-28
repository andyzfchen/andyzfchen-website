function hello() {
  var available_voices;

  // list of languages is probably not loaded, wait for it
  if(window.speechSynthesis.getVoices().length == 0) {
    window.speechSynthesis.addEventListener('voiceschanged', function() {
      available_voices = window.speechSynthesis.getVoices();
    });
  }
  else {
    available_voices = window.speechSynthesis.getVoices();

    var text = "";
    var i;
    for (i=0; i<available_voices.length; i++) {
      text += available_voices[i].name + "<br>";
    }

    document.getElementById("output").innerHTML = text;

    textToSpeech("planks");
    textToSpeech("elevated crunches");
  }
}

function textToSpeech(text) {
  // get all voices that browser offers
  var available_voices = window.speechSynthesis.getVoices();

  // this will hold an english voice
  var english_voice = '';

  // find all voices with language locale "en-US" and chooses last one
  // if none then select the first voice
  for(var i=0; i<available_voices.length; i++) {
    if(available_voices[i].lang === 'en-US') {
      english_voice = available_voices[i];
    }
  }
  if(english_voice === '')
    english_voice = available_voices[0];

  // new SpeechSynthesisUtterance object
  var utter = new SpeechSynthesisUtterance();
  utter.rate = 1;
  utter.pitch = 0.5;
  utter.text = text;
  utter.voice = english_voice;

  // speak
  window.speechSynthesis.speak(utter);
}
