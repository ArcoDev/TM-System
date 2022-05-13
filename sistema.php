<?php 
    include_once './view/includes/head.php';
    include_once './post.php';
    session_start();
    $nameUser = $_SESSION['test']['user'];
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
                        <p id="userActive" class="m-0"><?php echo $nameUser ?></p>
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
<section class="container-fluid mt-3 dx-viewport rounded-3"
    style="box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 4px, rgba(0, 0, 0, 0.1) 0px 2px 3px">
    <div class="row p-3">
        <div class="actions my-3">
            <button type="button" class="btn btn-actions" data-bs-toggle="modal" data-bs-target="#add" title="Agregar">
                <i class="fa fa-plus"></i>
            </button>
            <button type="button" class="btn btn-actions" data-bs-toggle="modal" data-bs-target="#edit" title="Editar">
                <i class="fa fa-pencil"></i>
            </button>
            <button type="button" class="btn btn-actions" title="Eliminar">
                <i class="fa fa-trash"></i>
            </button>
        </div>
        <div class="demo-container">
            <div id="gridContainer"></div>
            <div id="rowID"></div>
        </div>
    </div>
</section>

<!-- Modal agregar nuevo registro -->
<div class="modal fade" id="add" tabindex="-1" aria-labelledby="addLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addLabel">Nuevo Registro</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form method="post">
                    <div class="alert alert-danger d-flex align-items-center justify-content-center py-1"
                        id="alert-danger" role="alert">
                        <i class="fa fa-warning"></i>
                        <p class="m-0">Todos los datos son obligatorios</p>
                    </div>
                    <div class="box-form">
                        <div class="form-group">
                            <label class="my-2" for="account">Cuenta</label>
                            <input type="text" class="form-control" name="account" id="account"
                                aria-describedby="helpId" placeholder="Número de cuenta">
                        </div>
                        <div class="form-group">
                            <label class="my-2" for="nameAcount">Nombre de la cuenta</label>
                            <input type="text" class="form-control" name="nameAcount" id="nameAcount"
                                aria-describedby="helpId" placeholder="Ingresa el nombre de la cuenta" required>
                        </div>
                        <div class="form-group">
                            <label class="my-2" for="banco">Banco</label>
                            <select class="form-select" name="banco" id="banco" required>
                                <option>Selecciona</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-actions" id="insertData">Guardar</button>
                <button type="button" class="btn btn-actions" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<!-- Modal editar registro -->
<div class="modal fade" id="edit" tabindex="-1" aria-labelledby="editLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editLabel">Editar</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h1>Edit</h1>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-actions" id="updateData">Actualizar</button>
                <button type="button" class="btn btn-actions" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>