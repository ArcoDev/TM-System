<?php 
    include_once './view/includes/head.php';
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $user = $_POST['user'];
        $password = $_POST['pw'];
        $token = $_POST['token'];
        $status = $_POST['stToken'];
        // session_start();
        // $_SESSION['test'] = $user;
        session_start();
        $_SESSION['test'] = array();
        $userVer = $_SESSION['test']['user'] = $user;
        $tokenVer = $_SESSION['test']['token'] = $token;
        $statusUser = $_SESSION['test']['stToken'] = $status;
        
        // $nameUser = $_SESSION['test']['user'] = $userVer;
        // $tokenUser = $_SESSION['test']['token'] = $tokenVer;
    }
?>