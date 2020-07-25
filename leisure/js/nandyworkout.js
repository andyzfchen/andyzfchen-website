var available_voices = window.speechSynthesis.getVoices();
var english_voice = '';


// ####################################
// global webapp variables
//var exercises = ["planks","twisting crunches","leg lifts"];
var exercises = "";
var currentexercise = "";
var nexercise = 0;
var nextexercise = "";
var gettingReady = true;
var goingToRest = false;
var switchingSides = false;
var resting = false;
var paused = false;
var started = false;
var timer = 0;
var iTimer = 0;
var nRep = 0;
var tRep = 0;
var nRpS = 0;
var tReady = 0;
var tBreak = 0;
var nInt = 0;
var iRep = -1;
var iInt = 0;
// ####################################

function customWorkout() {
  initializeTTS();
  eMode = $('input[name=eMode]:checked').val();
  fetch("leisure/exercises/"+eMode+"_exercises.csv")
  .then( response => response.text() )
  .then( text => exercises = text )
  setTimeout(function() {initializeWorkout(eMode);}, 100);
}

function initializeWorkout(eMode) {
  exercises = $.csv.toArrays(exercises);
  nexercise = exercises.length;
  console.log(nexercise);

  gettingReady = true;
  goingToRest = false;
  switchingSides = false;
  resting = false;
  started = true;
  timer = 11;
  iTimer = 0;
  nRep = parseInt(document.getElementById("nRep").value);
  tRep = parseInt(document.getElementById("tRep").value);
  nRpS = parseInt(document.getElementById("nRpS").value);
  tReady = parseInt(document.getElementById("tReady").value);
  tBreak = parseInt(document.getElementById("tBreak").value);
  tTotal = nRep*tRep + Math.floor((nRep-1)/nRpS)*tBreak;
  nInt = nRep + Math.floor((nRep-1)/nRpS);
  iRep = -1;
  iInt = 0;

  // first exercise
  say("welcome to the custom workout");
  var durationText= "this "+eMode+" session is "+Math.floor(tTotal/60)+" minutes";
  if (tTotal/60 > 0.00001) {
    durationText += " and "+(tTotal-Math.floor(tTotal/60)*60)+" seconds";
  }
  say(durationText);
  iterateExercise();
  document.getElementById("status").innerHTML = "Welcome";
  document.getElementById("exercise").innerHTML = "";
  document.getElementById("nextstatus").innerHTML = "First Exercise";
  document.getElementById("nextexercise").innerHTML = currentexercise;
  document.getElementById("timer").innerHTML = "Timer";
  say("first exercise");
  say(currentexercise);

  if (paused) {
    pauseWorkout();
  }
  else {
    document.getElementById("start").innerHTML = "Restart!";
    document.getElementById("start").disabled = true;
    document.getElementById("pause").disabled = false;
    timeLoop();
  }
}

function timeLoop() {
  // timer manager
  timer -= 1;

  if (iRep < nRep) {
    // next exercise
    if (timer == 10) {
      setNextExercise();
    }
    // switch sides
    else if (timer == Math.floor(tRep/2)) {
      switchSides();
    }
    // changes at end of rep
    else if (timer == 0) {
      resetTimer();
    }

    // countdown timer
    if (timer <= 3) {
      countdown();
    }

    // increment cumulative time
    if (!gettingReady && !switchingSides) {
      iTimer += 1;
    }

    document.getElementById("time").innerHTML = timer;
    document.getElementById('pb').style.width = Math.floor(iTimer/tTotal*1000)/10+'%';
    document.getElementById('pb').setAttribute("aria-valuenow", Math.floor(iTimer/tTotal*1000)/10);

    if (!paused) {
      setTimeout(function() {timeLoop();}, 1000);
    }
  }
}

function finishWorkout() {
  timer = "";
  document.getElementById("status").innerHTML = "Workout Completed";
  document.getElementById("exercise").innerHTML = "";
  document.getElementById("timer").innerHTML = "";
  document.getElementById("time").innerHTML = "";
  document.getElementById("nextstatus").innerHTML = "You Made It!";
  document.getElementById("nextexercise").innerHTML = "";
  say("congrats");
  say("you have finished your workout");
}

function resetTimer() {
  // continue an exercise after switching sides
  if (switchingSides) {
    document.getElementById("nextstatus").innerHTML = "Begin";
    timer = Math.floor(tRep/2);
    switchingSides = false;
    say("begin");
  }
  // reset to break time
  else if (goingToRest) {
    document.getElementById("status").innerHTML = "Break Time";
    document.getElementById("exercise").innerHTML = "relax and stretch";
    document.getElementById("nextstatus").innerHTML = "";
    document.getElementById("nextexercise").innerHTML = "";
    iInt += 1;
    timer = tBreak;
    gettingReady = false;
    goingToRest = false;
    resting = true;
    say("take a "+tBreak+" second break");
  }
  // reset to exercising or getting ready
  else {
    // reset to exercising
    if (gettingReady) {
      gettingReady = false;
      document.getElementById("status").innerHTML = "Current Exercise";
      document.getElementById("exercise").innerHTML = currentexercise;
      document.getElementById("nextstatus").innerHTML = "Begin";
      document.getElementById("nextexercise").innerHTML = "";
      timer = tRep;
      say("begin");
    }
    // reset to getting ready
    else {
      iterateExercise();
      if (iRep < nRep) {
        gettingReady = true;
        document.getElementById("status").innerHTML = "Current Exercise";
        document.getElementById("exercise").innerHTML = currentexercise;
        document.getElementById("nextstatus").innerHTML = "Get Ready";
        document.getElementById("nextexercise").innerHTML = "";
        iInt += 1;
        timer = tReady;
        say(currentexercise);
      }
      else {
        finishWorkout();
      }
    }
  }
}

function setNextExercise() {
  if (!gettingReady) {
    if ((iRep+1) == nRep) {
      document.getElementById("nextstatus").innerHTML = "Almost done!";
      document.getElementById("nextexercise").innerHTML = "";
      say("almost done");
    }
    else if ((iInt+1) % (nRpS+1) == nRpS) {
      goingToRest = true;
      document.getElementById("nextstatus").innerHTML = "Next Exercise";
      document.getElementById("nextexercise").innerHTML = "break time";
      say("next exercise");
      say("break time");
    }
    else {
      document.getElementById("nextstatus").innerHTML = "Next Exercise";
      document.getElementById("nextexercise").innerHTML = nextexercise;
      say("next exercise");
      say(nextexercise);
    }
  }
}

function switchSides() {
  if (!resting && !gettingReady) {
    if (exercises[iRep][1] == 1) {
      document.getElementById("nextstatus").innerHTML = "Switching Sides";
      document.getElementById("nextexercise").innerHTML = "Other Side";
      switchingSides = true;
      say("switch sides");
      timer = 5;
    }
  }
}

function countdown() {
  if (!gettingReady && !switchingSides) {
    say(timer);
  }
}

function iterateExercise() {
  iRep += 1;
  if ((iRep % nexercise) == 0) {
    shuffle(exercises);
  }

  currentexercise = exercises[iRep % nexercise][0];
  nextexercise = exercises[(iRep+1) % nexercise][0];
}

function pauseWorkout() {
  if (started) {
    if (!paused) {
      paused = true;
      document.getElementById("start").disabled = false;
      document.getElementById("pause").innerHTML = "Resume";
      document.getElementById("pausestatus").innerHTML = "Workout Paused";
    }
    else {
      paused = false;
      document.getElementById("start").disabled = true;
      document.getElementById("pause").innerHTML = "Pause";
      document.getElementById("pausestatus").innerHTML = "";
      setTimeout(function() {timeLoop();}, 1000);
    }
  }
}

function initializeTTS() {
  // get all voices that browser offers
  available_voices = window.speechSynthesis.getVoices();

  // find all voices with language locale "en-US" and chooses last one
  // if none then select the first voice
  for(var i=0; i<available_voices.length; i++) {
    if(available_voices[i].lang === 'en-US') {
      english_voice = available_voices[i];
    }
  }
  if(english_voice === '')
    english_voice = available_voices[0];
}

function say(text) {
  // new SpeechSynthesisUtterance object
  var utter = new SpeechSynthesisUtterance();
  utter.rate = 1;
  utter.pitch = 0.5;
  utter.text = text;
  utter.voice = english_voice;

  // speak
  window.speechSynthesis.speak(utter);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
