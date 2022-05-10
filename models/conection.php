<?php
    $pw = "MA@co.08";
    $user = "sa";
    $dataBase = "OPE_TMS_DEV";
    $server = "192.168.1.17";
    try {
        $conection = new PDO("sqlsrv:server=$server;database=$dataBase", $user, $pw);
        $conection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // echo 'Conexion Exitosa';
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage();
    }