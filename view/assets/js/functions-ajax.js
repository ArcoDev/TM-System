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
            $('.banco').html();
            for (let i = 0; i < atributos.Table.length; i += 1) {
                const optionSel = `<option value="${atributos.Table[i].Id}">
                                       ${atributos.Table[i].Nombre}
                                       </option>`;
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
        $('#loadForm').html();
        const testJS = "Value desde JS";
        const form = `<form method="post" id="formAdd">
                        <div class="alert alert-danger d-flex align-items-center justify-content-center py-1"
                            id="alert-danger" role="alert">
                            <i class="fa fa-warning"></i>
                            <p class="m-0">Todos los datos son obligatorios</p>
                        </div>
                        <div class="box-form">
                            <div class="form-group">
                                <label class="my-2" for="account">Cuenta</label>
                                <input type="text" class="form-control" name="account" id="account" aria-describedby="helpId" 
                                placeholder="Número de cuenta" value="${testJS}" readonly>
                            </div>
                            <div class="form-group">
                                <label class="my-2" for="nameAcount">Nombre de la cuenta</label>
                                <input type="text" class="form-control" name="nameAcount" id="nameAcount" aria-describedby="helpId" 
                                placeholder="Ingresa el nombre de la cuenta" value="${testJS}">
                            </div>
                            <div class="form-group">
                                <label class="my-2" for="banco">Banco</label>
                                <select class="form-select banco" name="banco" id="banco">
                                    <option>Selecciona</option>
                                </select>
                            </div>
                        </div>
                    </form>`;
        $('#loadForm').append(form);
        let testID = $('#rowID').text();
        console.log(testID);
    }
    updateData();


    function deleteData() {
        /*********************************************************
        Eliminar registro BD                               
        *******************************************************/
        $('#delete').click(() => {
            Swal.fire({
                title: '¿Estas Seguro que deseas eliminar el registro?',
                icon: 'info',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Eliminar',
                denyButtonText: `Cancelar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('Eliminado')
                    Swal.fire('Se elimino correctamente!', '', 'success');
                }
            })
        });
    }
    deleteData();

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
                                // console.log(identify);
                                // console.log($("#rowID").text(identify));
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