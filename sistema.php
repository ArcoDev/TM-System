<?php 
    include_once './view/includes/head.php';
    include_once './post.php';
    session_start();
    $nameUser = $_SESSION['test']['user'] = "Christian Acosta";
    $tokenUser = $_SESSION['test']['token'];
    // var_dump($nameUser);
    // $status = $_SESSION['test']['stToken'];
    // var_dump($status);
    if($nameUser == false){
        // echo 'Usuario existe';
        // echo 'Usuario no exite';
        header('Location: ./index.php');
    } else {
    }
?>
<style>
</style>
<nav class="container-fluid navegation">
    <div class="row p-2">
        <div class="col-lg-6">
            <div class="logo d-flex gap-2 align-items-center">
                <img src="./view//assets//img//transmontes.jpg" alt="Transmontes" class="img-responsive">
                <h2 class="m-0">Transmontes</h2>
            </div>
        </div>
        <div class="col-lg-6 d-flex justify-content-end">
            <div class="sesion-user d-flex align-items-center" style="gap: 0.5rem;">
                <div class="dropdown" onclick="this.blur();">
                    <button class="btn btn-default dropdown-toggle d-flex align-items-center gap-1" type="button"
                        id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <p class="m-0"><?php echo $nameUser ?></p>
                    </button>
                    <ul class="dropdown-menu p-3" aria-labelledby="dropdownMenuButton1">
                        <li class="d-flex gap-2 align-items-center">
                            <a href="#" class="d-flex gap-2 align-items-center text-decoration-none link-dropdown">
                                <i class="fa-solid fa-gear"></i>
                                <p class="m-0">Configuración</p>
                            </a>
                        </li>
                        <li>
                            <a name="delSession"
                                class="d-flex gap-2 align-items-center text-decoration-none link-dropdown">
                                <i class="fa-solid fa-door-closed"></i>
                                <p class="m-0">Cerrar Sesion</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <input type="hidden" id="valToken" name="delSession" value="<?php echo $tokenUser ?>">
        </div>
    </div>
</nav>
<section class="container-fluid mt-3 dx-viewport">
    <div class="row p-3">
        <div class="demo-container">
            <div id="gridContainer"></div>
        </div>
    </div>
</section>