<?php
if(isset($_GET['ruta'])){
    if($_GET['ruta'] == './') { 
        include "./login.php";
    } else if($_GET['ruta'] == 'destroySession') {
        include "".$_GET["ruta"].".php"; 
    } else if($_GET['ruta'] == 'cuentas') {
        include "./includes/modules/".$_GET["ruta"].".php"; 
    }else if($_GET['ruta'] == 'casetas') {
        include "./includes/modules/".$_GET["ruta"].".php"; 
    }
}
?>