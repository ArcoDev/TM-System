const test = document.querySelectorAll('.dx-button-content');
console.log(test);

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
        console.log(`{Usuario: '${user}', Password: '${pw}' }`);
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
                stToken: statusToken
            }, function (data, status) {
                // console.log(data);
                if (data != null) {
                    console.log("OK");
                    if (tokenUsr == null) {
                        alert('Credenciales incorrectas');
                        window.location.href = "./index.php";
                    } else {
                        alert('Bienvenido al sistema');
                        // $('#test').html(data);
                        window.location.href = "./sistema.php";
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
    var url = "https://192.168.1.22/OperacionesTMS";
    const valToken = $('#valToken').val();
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
        console.log(msg);
        var ob = JSON.parse(msg.dataResponse);
        // Table Dev Express con datos sql
        $(function () {
            const dataGrid = $('#gridContainer').dxDataGrid({
                dataSource: ob.Table,
                keyExpr: 'Id',
                allowColumnReordering: true,
                allowColumnResizing: true,
                columnAutoWidth: true,
                showBorders: true,
                focusedRowEnabled: true,
                focusedRowKey: 4,
                columnChooser: {
                    enabled: true,
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
                // Selection 
                // selection: {
                //     mode: 'multiple'
                // },
                // Editar campos con ventana modal
                editing: {
                    mode: 'popup',
                    allowUpdating: true,
                    allowDeleting: true,
                    allowAdding: true,
                    popup: {
                        title: 'Cuentas Bancarias',
                        showTitle: true,
                        width: 700,
                    },
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
                        dataType: 'left'
                    },
                    {
                        dataField: 'Nombre',
                        dataType: 'left'
                    },
                    {
                        dataField: 'Banco',
                        dataType: 'left'
                    },
                    {
                        dataField: 'Usuario',
                        dataType: 'left'
                    },
                    {
                        dataField: 'Fecha',
                        dataType: 'date'
                    }
                ],

            });
        });
    });

    request.fail(function (jqXHR, textStatus) {
        alert("Request failed: " + textStatus);
    });
});