<?php 
    include_once '../head.php';
?>
<div class="login-box d-flex align-items-center justify-content-center">
    <div class="container">
        <div class="row d-flex align-content-center justify-content-center">
            <div class="col-lg-4">
                <div class="card login-form">
                    <div class="card-body">
                        <h2 class="card-title text-center">Transmontes</h2>
                        <div class="text-center">
                            <a href="#" class="card-text text-center user-action">Inicio de sesion</a>
                            |
                            <a href="#" class="card-text text-center user-action">Registrarme</a>
                        </div>
                        <hr>
                        <form method="POST">
                            <div class="form-group my-4">
                                <label for="user">Usuario</label>
                                <input type="text" name="user" id="user" class="form-control"  placeholder="Ingresa tu usuario">
                            </div>
                            <div class="form-group my-4">
                                <label for="password">Password</label>
                                <input type="password" name="pw" id="pw" class="form-control" autocomplete="off" placeholder="Ingresa tu contraseña">
                            </div>
                            <input type="hidden" name="token" id="token">
                            <button id="send" class="btn btn-primary">Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="container border mt-2" style="overflow: hidden">
        <p class="m-0">Datos post desde post.php</p>
        <br>
        <div id="test"></div>
    </div> -->
</div>
</body>

</html>