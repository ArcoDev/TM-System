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
                                title: 'No se pudo entrar al sistema, verifique sus credenciales o contacte al administrador',
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
    }
    login();

    /*********************************************************
    Cargar datos para select box desde la API                               
    *******************************************************/
    function loadSelectBox() {
        const requestSelect = $.ajax({
            url: `${url}/Catalogos`,
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
            const atributos = JSON.parse(res.dataResponse);
            for (let i = 0; i < atributos.Table.length; i += 1) {
                const optionSel = `<option value="${atributos.Table[i].Id}">
                                        ${atributos.Table[i].Nombre}
                                    </option>`;
                $('.banco-up').append(optionSel);
                $('.banco').append(optionSel);
            }
        });
    }
    loadSelectBox();

    function insertData() {
        /*********************************************************
        Insertar registro BD                               
        *******************************************************/
        $('#insertData').click(function () {
            const account = $('#account').val();
            const nameAcount = $('#nameAcount').val();
            const banco = $('#banco').val();
            const alert = document.getElementById('alert-danger');
            /*********************************************************
            Validacion formulario                             
            *******************************************************/
            // console.log(account);
            // if(account.length === '') {
            //     console.log('Los datos estan vacios');
            // } else {
            //     console.log('Datos correctos');
            //     alert.classList.add('animaAlert');
            //     setTimeout(() => {
            //         alert.classList.remove('animaAlert');
            //     }, 2500);
            // }
            $.ajax({
                // url: url,
                url: `${url}/OperacionesTMS`,
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
                        timer: 1200
                    });
                    $('#add').modal('hide');
                    $('#formAdd')[0].reset();
                    loadDevExpress();
                }
            });
        });
    }
    insertData();


    function updateData() {
        /*********************************************************
        Actualizar registro BD                               
        *******************************************************/
        const idRowSelection = $('#rowID').text();
        $('#loadForm').html();
        var request = $.ajax({
            url: `${url}/OperacionesTMS`,
            type: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            dataType: "json",
            data: JSON.stringify({
                "Accion": "TMSCuentasBancoDEV",
                "Data": `<clsParametros>
                            <Opcion>CI</Opcion>
                            <clsCuentasBancos>
                                <Id>${idRowSelection}</Id>
                            </clsCuentasBancos>
                        </clsParametros>`,
                "Token": valToken

            })
        });
        request.done(function (resID) {
            const rowID = JSON.parse(resID.dataResponse);
            const responseArray = rowID.Table[0];
            loadSelectBox();
            // Modal
            const modal = `<div class="modal fade" id="modal" tabindex="-1" aria-labelledby="editLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="editLabel">Editar</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body" id="loadForm">
                                            <form method="post" id="formUpdate">
                                                <div class="form-group">
                                                    <label class="my-2" for="account">Cuenta</label>
                                                    <input type="text" class="form-control" name="account" id="account"
                                                    aria-describedby="helpId" value="${responseArray.Cuenta}" readonly>
                                                </div>
                                                <div class="form-group">
                                                    <label class="my-2" for="nameAcount">Nombre de la cuenta</label>
                                                    <input type="text" class="form-control" name="nameAccountUP" id="nameAccountUP"
                                                    aria-describedby="helpId" value="${responseArray.Nombre}">
                                                </div>
                                                <div class="form-group">
                                                    <label class="my-2" for="banco">Banco</label>
                                                    <select class="form-select banco-up" name="banco" id="bancoUP">
                                                        <option value="${responseArray.CAT_Banco}">${responseArray.banco}</option>
                                                    </select>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-actions" id="updateData">Actualizar</button>
                                            <button type="button" class="btn btn-actions" data-bs-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
            $('#testModal').append(modal); 
            // AJAX Update
            function ajaxUpdate() {
                const bancoUP = $('#bancoUP').val();
                const accountNameUP = $('#nameAccountUP').val();
                $.ajax({
                    url: `${url}/OperacionesTMS`,
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
                                        <Id>${responseArray.Id}</Id>
                                        <Cuenta>${responseArray.Cuenta}</Cuenta>
                                        <Nombre>${accountNameUP}</Nombre>
                                        <CAT_Banco>${bancoUP}</CAT_Banco>
                                        <Activo>${responseArray.Activo}</Activo>
                                    </clsCuentasBancos>
                                </clsParametros>`,
                        "Token": valToken
                    }),
                    success: function () {
                        Swal.fire({
                            icon: 'success',
                            title: 'El registro se actualizo correctamente',
                            showConfirmButton: false,
                            timer: 1200
                        });
                        $('#modal').modal('hide');
                        loadDevExpress
                        // location.reload();
                    }
                });
            }

            $('#updateData').click((e) => {
                e.preventDefault();
                ajaxUpdate();
            });
        });
    }

    /*********************************************************
    Eliminar registro BD                               
    *******************************************************/
    $('#delete').click(() => {
        const idRowDelete = $('#rowID').text();
        Swal.fire({
            title: '¿Estas Seguro que deseas eliminar el registro?',
            icon: 'info',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Eliminar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `${url}/OperacionesTMS`,
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
                                            <Id>${idRowDelete}</Id>
                                            <Activo>false</Activo>
                                        </clsCuentasBancos>
                                    </clsParametros>`,
                        "Token": valToken
                    }),
                    success: function () {
                        Swal.fire('El registro se elimino correctamente!', '', 'success');
                        loadDevExpress();
                    }
                });
            }
        })
    });

    function loadDevExpress() {
        /*********************************************************
        Traer datos de BD desde la API
        *******************************************************/
        var request = $.ajax({
            url: `${url}/OperacionesTMS`,
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
                    onExporting(e) {
                        const workbook = new ExcelJS.Workbook();
                        const worksheet = workbook.addWorksheet('Employees');

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet,
                            autoFilterEnabled: true,
                        }).then(() => {
                            workbook.xlsx.writeBuffer().then((buffer) => {
                                saveAs(new Blob([buffer], {
                                    type: 'application/octet-stream'
                                }), 'Test.xlsx');
                            });
                        });
                        e.cancel = true;
                    },
                    // Seleccionar ID de cada renglon al cual se le da click
                    selection: {
                        mode: 'multiple',
                    },
                    onSelectionChanged: function (e) {
                        e.component.byKey(e.currentSelectedRowKeys[0]).done(rowID => {
                            if (rowID) {
                                var identify = rowID.Id;
                                $('#rowID').text(identify);
                                $('#testModal').html('');
                                updateData();
                            }
                        });
                    },
                    // Paginador
                    paging: {
                        pageSize: 10
                    },
                    pager: {
                        showPageSizeSelector: true,
                        allowedPageSizes: [10, 25, 50, 100],
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
                    // 
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
                            alignment: 'left',
                            // groupIndex: 0,
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
    }
    loadDevExpress();
});