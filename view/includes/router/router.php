<?php

class Router {
    public static function getView($ruta) {
        switch($ruta) {
            case 'sistema':
                include("../../../sistema.php");
                break;
                default:
                    include('../template/404.php');
        }
    }
    public static function getHead($ruta) {
        switch($ruta) {
            case 'sistema':
                include("../../../sistema.php");
                break;
                default:
                    include('../template/404.php');
        }

    }
}