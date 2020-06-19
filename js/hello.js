var i = 0;
var txt = 'Hello. Welcome to my world.';
var speed = 50;


function typeWriter() {
  if (i < txt.length) {
    if (i < 5) {
      document.getElementById("hello").innerHTML += txt.charAt(i);
      setTimeout(typeWriter, speed);
    }
    else if (i == 5) {
      document.getElementById("hello").innerHTML += txt.charAt(i);
      setTimeout(typeWriter, 2000);
    }
    else {
      document.getElementById("welcome").innerHTML += txt.charAt(i);
      setTimeout(typeWriter, speed);
    }
    i++;
  }
}

setTimeout(document.getElementById("hello").innerHTML = "// ",5000);
document.getElementById("welcome").innerHTML = "// ";
typeWriter()
