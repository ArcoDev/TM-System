$(document).ready(function () {
    /*********************************************************
    Variables globales para consultar la API                               
    *******************************************************/
    const url = 'https://192.168.1.22/';
    const valToken = $('#valToken').val();
    const userActive = $('#userActive').text();

    function login() {
        /*********************************************************
        PETICION AJAX PARA LA BASE DE DATOS Y PASAR DATOS POR POST
        PARA EL INGRESO AL SISTEMA                               
        *******************************************************/
        $('#send').click(function (event) {
            event.preventDefault();
            // Valores del fomrulario 
            const user = $('#user').val();
            const pw = $('#pw').val();

            // Peticion ajax para login
            var request = $.ajax({
                // url: endPoint,
                url: `${url}/Access`,
                type: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    "Data": `{Usuario: '${user}', Password: '${pw}' }`
                })
            });
            request.done(function (jsonResponse) {
                tokenUsr = jsonResponse.dataResponse;
                $.post('./system.php', {
                    user: user,
                    pw: pw,
                    token: tokenUsr,
                    // stToken: statusToken
                }, function (data) {
                    // console.log(data);
                    if (data != null) {
                        console.log("OK");
                        if (tokenUsr == null) {
                            Swal.fire({
                                icon: 'error',
                                title: 'No se pudo entrar al sistema, verifique sus credenciales o contacte al administrador',
                                showConfirmButton: false,
                                timer: 2000
                            });
                            setTimeout(function () {
                                window.location.href = "./index.php"
                            }, 1000)
                        } else {
                            Swal.fire({
                                icon: 'success',
                                title: 'Bienvenido al sistema',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            setTimeout(function () {
                                window.location.href = "./system.php"
                            }, 1000)
                            // $('#test').html(data);
                        }
                    } else {
                        console.log("Error");
                    }
                });
            });
            request.fail(function (textStatus) {
                console.log('Request fail: ', +textStatus);
            });
        });
    }
    login();
});