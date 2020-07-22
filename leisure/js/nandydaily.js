function listRoutines() {
  //let headers = new Headers();
  //headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  //headers.append('Access-Control-Allow-Credentials', 'true');
  var xhttp = new XMLHttpRequest();

  var text = "";

  //for (i=0; i<files.length; i++) {
  //  text += files[i] + "<br>";
  //}

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("routinelog").innerHTML = this.responseText;
    }
  };

  //xhttp.open("GET","log_workout/2020-06-18_abs.csv");
  //xhttp.open("GET","hello.txt");
  xhttp.open("GET","js/test.php",true);
  xhttp.send();

}

//listRoutines();
