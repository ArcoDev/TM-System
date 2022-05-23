<?php 
    include_once './view/includes/head.php';
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $user = $_POST['user'];
        $password = $_POST['pw'];
        $token = $_POST['token'];
        $status = $_POST['stToken'];
        session_start();
        $_SESSION['transmontes'] = array();
        $userVer = $_SESSION['transmontes']['user'] = $user;
        $tokenVer = $_SESSION['transmontes']['token'] = $token;
        $statusUser = $_SESSION['transmontes']['stToken'] = $status;
    }
?>