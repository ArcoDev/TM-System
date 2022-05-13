/*********************************************************
Tooltip Bootstrap 5                               
*******************************************************/
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});
/*********************************************************
PETICION AJAX PARA LA BASE DE DATOS Y PASAR DATOS POR POST
PARA EL INGRESO AL SISTEMA                               
*******************************************************/
$(document).ready(function () {
    $('#send').click(function (event) {
        event.preventDefault();
        // Valores del fomrulario 
        const user = $('#user').val();
        const pw = $('#pw').val();
        // console.log(`{Usuario: '${user}', Password: '${pw}' }`);
        // Peticion ajax para login
        const endPoint = "https://192.168.1.22/Access";
        var request = $.ajax({
            url: endPoint,
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
            $.post('./sistema.php', {
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
                            title: 'Bienvenido al sistema',
                            showConfirmButton: false,
                            timer: 1500
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
                            window.location.href = "./sistema.php"
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
});

/*********************************************************
PETICION AJAX PARA LA BASE DE DATOS Y TRANSFORMACIÓN 
DE LA TABLA CON DEVEXPRESS                               
*******************************************************/

$(document).ready(function () {
    //Variables globales para consultar la API
    var url = "https://192.168.1.22/OperacionesTMS";
    const valToken = $('#valToken').val();
    // Traer datos de BD desde la API
    var request = $.ajax({
        url: url,
        type: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        dataType: "json",
        data: JSON.stringify({
            "Accion": "TMSCuentasBancoDEV",
            "Data": "<clsParametros><Opcion>C</Opcion></clsParametros>",
            "Token": valToken

        })
    });
    request.done(function (msg) {
        // console.log(msg);
        const ob = JSON.parse(msg.dataResponse);

        // Inicio DevExpress
        $(function () {
            $('#gridContainer').dxDataGrid({
                dataSource: ob.Table,
                keyExpr: 'Id',
                allowColumnReordering: true,
                allowColumnResizing: true,
                columnAutoWidth: true,
                showBorders: true,
                closeOnOutsideClick: true,
                columnChooser: {
                    enabled: true,
                },
                // Agrupapiemnto de columnas Header
                groupPanel: {
                    visible: true
                },
                grouping: {
                    autoExpandAll: false
                },
                // Seleccionar ID de cada renglon al cual se le da click
                selection: {
                    mode: 'single',
                },
                onSelectionChanged: function (e) {
                    e.component.byKey(e.currentSelectedRowKeys[0]).done(rowID => {
                        if (rowID) {
                            var identify = rowID.Id;
                            $('#rowID').text(identify);
                            // console.log($("#rowID").text(identify));
                        }
                    });
                },

                // Buscador
                searchPanel: {
                    visible: true,
                },
                // Filtros 
                filterRow: {
                    visible: true,
                    applyFilter: 'auto',
                },
                headerFilter: {
                    visible: true,
                },
                // Sumatoria y contador
                summary: {
                    totalItems: [{
                        column: 'Usuario',
                        summaryType: 'count',
                    }, {
                        column: 'OrderDate',
                        summaryType: 'min',
                        customizeText(data) {
                            return `First: ${DevExpress.localization.formatDate(data.value, 'MMM dd, yyyy')}`;
                        },
                    }, {
                        column: 'Cuenta',
                        summaryType: 'sum',
                        valueFormat: 'currency',
                    }],
                },
                headerFilter: {
                    visible: true,
                },
                columnFixing: {
                    enabled: true,
                },
                columns: [{
                        dataField: 'Cuenta',
                        dataType: 'number',
                        // alignment: 'right'
                    },
                    {
                        dataField: 'Nombre',
                        dataType: 'string'
                    },
                    {
                        dataField: 'Banco',
                        dataType: 'string'
                    },
                    {
                        dataField: 'Usuario',
                        dataType: 'string',
                        allowEditing: false
                    },
                    {
                        dataField: 'Fecha',
                        dataType: 'date',
                        allowEditing: false
                    },
                ],
            });
        });
    });

    request.fail(function (textStatus) {
        alert("Request failed: " + textStatus);
    });
});