<?php
  $d = dir("./leisure/exerciselists/");
  while (false !== ($entry = $d->read())) {
    if ($entry[0] != ".") { 
      echo "<div class=\"row\">";
      echo "  <div class=\"col-sm-2\">";
      echo "  </div>";
      echo "  <div class=\"col-sm-5\">";
      echo "    <p>".$entry."</p>";
      echo "  </div>";
      echo "  <div class=\"col-sm-1\">";
      echo "    <a href=\"leisure/exerciselists/".$entry."\" target=\"_blank\" class=\"btn btn-primary btn-lg\">Get List</a>";
      echo "  </div>";
      echo "  <div class=\"col-sm-4\">";
      echo "  </div>";
      echo "</div>";
      echo "<br>";
    }


  }
  $d->close();
?>
