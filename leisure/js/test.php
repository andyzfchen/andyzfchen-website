<?php
  $path = '.';
  $files = scandir($path);
  foreach ($files as $file) {
    echo $file;
    echo "\n";
  }
?>
