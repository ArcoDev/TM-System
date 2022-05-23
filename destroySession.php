<?php
    include './models/conection.php';
    session_start();
    $_SESSION = array();
    if(ini_get('session.use.cookies')){
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 4200,
        $params["path"], $params["domain"], 
        $params["secure"], $params["httponly"]);
    }
    try {
        session_destroy();
        echo "Session eliminada correctamente";
        header('Location: ./index.php');
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }
    include './post.php';
    session_start();
    $changeStatus = $_SESSION['transmontes']['token'];
    // var_dump($changeStatus);
    session_destroy();
?>