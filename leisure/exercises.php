<?php
  $d = dir("./leisure/exercises/");
  while (false !== ($entry = $d->read())) {
    if ($entry[0] != ".") { 
      echo "<a href=\"leisure/exercises/".$entry."\">$entry</a><br>";
    }
  }
  $d->close();
?>
