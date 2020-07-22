<?php
  $d = dir("./leisure/log_workout/");
  while (false !== ($entry = $d->read())) {
    if ($entry[0] != ".") { 
      echo "<a href=\"leisure/log_workout/".$entry."\">$entry</a><br>";
    }
  }
  $d->close();
?>
