<?php
  $d = dir("./leisure/skilltrees/");
  while (false !== ($entry = $d->read())) {
    if ($entry[0] != ".") { 
      echo "<a href=\"leisure/skilltrees/".$entry."\">$entry</a><br>";
    }
  }
  $d->close();
?>
