<div class="container-fluid system-layout">
    <div class="row">
        <?php include_once './navegation.php'; ?>
        <div class="col-2 border vh-100">
            <h1 class="text-center pt-4">Menú</h1>
            <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Modulo 1
                        </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <i class="fa fa-folder-open"></i>
                            Sub Modulo 1
                        </div>
                        <div class="accordion-body">
                            <i class="fa fa-folder-open"></i>
                            Sub Modulo 2
                        </div>
                        <div class="accordion-body">
                            <i class="fa fa-folder-open"></i>
                            Sub Modulo 3
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Modulo 2
                        </button>
                    </h2>
                    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                        data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <i class="fa fa-folder-open"></i>
                            Sub Modulo 1
                        </div>
                        <div class="accordion-body">
                            <i class="fa fa-folder-open"></i>
                            Sub Modulo 2
                        </div>
                        <div class="accordion-body">
                            <i class="fa fa-folder-open"></i>
                            Sub Modulo 3
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-10 p-0">
            <section class="col-12 dx-viewport">
                <p class="head-module">Cuentas Bancos</p>
                <div class="row p-3">
                    <div class="actions my-3">
                        <button type="button" class="btn btn-actions" data-bs-toggle="modal" data-bs-target="#add"
                            title="Agregar">
                            <i class="fa fa-plus"></i>
                        </button>
                        <span id="modalID">
                            <button id="update" type="button" class="btn btn-actions" data-bs-toggle="modal"
                                data-bs-target="#modal" title="Editar">
                                <i class="fa fa-pencil"></i>
                            </button>
                        </span>
                        <button id="delete" type="button" class="btn btn-actions" title="Eliminar">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                    <div class="demo-container">
                        <div id="gridContainer"></div>
                        <div id="rowID"></div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>
<!-- Modal agregar nuevo registro -->
<div class="modal fade" id="add" tabindex="-1" aria-labelledby="addLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="addLabel">Nuevo Registro</h5>

                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form method="post" id="formAdd">
                    <div class="alert alert-danger d-flex align-items-center justify-content-center py-1" id="alert-danger" role="alert">
                        <i class="fa fa-warning"></i>
                        <p class="m-0 textAlert"></p>
                    </div>
                    <div class="box-form">
                        <div class="form-group d-flex gap-2">
                            <label class="my-2" for="account">Cuenta</label>
                            <input type="text" class="form-control" name="account" id="account" placeholder="Número de cuenta">
                        </div>
                        <div class="form-group">
                            <label class="my-2" for="nameAcount">Nombre de la cuenta</label>
                            <input type="text" class="form-control" name="nameAcount" id="nameAcount" placeholder="Ingresa el nombre de la cuenta">
                        </div>
                        <div class="form-group">
                            <label class="my-2" for="banco">Banco</label>
                            <select class="form-select banco" name="banco" id="banco">
                                <option value="0">Selecciona</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer d-flex flex-column align-items-start justify-content-start">
                <div class="form-group d-flex w-100 justify-content-end">
                    <button type="button" class="btn btn-actions" id="insertData">Guardar</button>
                    <button type="button" class="btn btn-actions" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal editar registro -->
<div id="testModal"></div>
<?php include_once './footer.php'; ?>