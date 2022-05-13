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
    /*********************************************************
    Variables globales para consultar la API                               
    *******************************************************/
    const url = "https://192.168.1.22/OperacionesTMS";
    const urlCAT = "https://192.168.1.22/Catalogos";
    const valToken = $('#valToken').val();
    const userActive = $('#userActive').text();
    const account = $('#account').val();
    const nameAcount = $('#nameAcount').val();
    const banco = $('#banco').val();
    /*********************************************************
    Cargar datos para select box desde la API                               
    *******************************************************/
    const requestSelect = $.ajax({
        url: urlCAT,
        type: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        dataType: 'json',
        data: JSON.stringify({
            "Accion": "CORECatalogos",
            "Data": "<clsParametros><Opcion>CTC</Opcion><ClaveTipo>Bancos_TMS</ClaveTipo></clsParametros>",
            "Token": valToken
        })
    });
    requestSelect.done(function (res) {
        console.log(res);
        const atributos = JSON.parse(res.dataResponse);
        $('#banco').html();
        for (let i = 0; i < atributos.Table.length; i += 1) {
            const optionSel = `<option value="${atributos.Table[i].Id}">
                                    ${atributos.Table[i].Nombre}
                                </option>`;
            $('#banco').append(optionSel);
        }
    });
    /*********************************************************
    Insertar registro BD                               
    *******************************************************/
    $('#insertData').click(function () {

        // const account = $('#account').val();
        // const nameAcount = $('#nameAcount').val();
        // const banco = $('#banco').val();
        $.ajax({
            url: url,
            type: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            dataType: "json",
            data: JSON.stringify({
                "Accion": "TMSCuentasBancoDEV",
                "Data": `<clsParametros>
                            <Opcion>G</Opcion>
                            <Usuario>${userActive}</Usuario>
                            <clsCuentasBancos>
                                <Id>0</Id>
                                <Cuenta>${account}</Cuenta>
                                <Nombre>${nameAcount}</Nombre>
                                <CAT_Banco>${banco}</CAT_Banco>
                            </clsCuentasBancos>
                        </clsParametros>`,
                "Token": valToken
            }),
            success: function () {
                Swal.fire({
                    icon: 'success',
                    title: 'Se agrego correctamente',
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        });
    });

    /*********************************************************
    Actualizar registro BD                               
    *******************************************************/


    /*********************************************************
    Eliminar registro BD                               
    *******************************************************/
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
        // console.log(ob.Table);
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
                // Agrupamiento de columnas Header
                groupPanel: {
                    visible: true
                },
                grouping: {
                    autoExpandAll: false
                },
                // Exposrtar tabla a excel
                export: {
                    enabled: true,
                    allowExportSelectedData: true,
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
                        dataType: 'string',
                        alignment: 'left'
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
                        allowEditing: false,
                        format: 'dd/MMM/yyyy',
                    },
                ],
            });
        });
    });
    request.fail(function (textStatus) {
        alert("Request failed: " + textStatus);
    });
});