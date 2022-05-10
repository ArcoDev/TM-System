$( document ).ready(function() {

    
    var url = "https://192.168.1.22/OperacionesTMS";
    var request = $.ajax({
        url: url,
        type: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        dataType:"json", 
        data: JSON.stringify({
            "Accion": "AppOperadorTDC",
            "Data": "<clsParametros><Opcion>ROS</Opcion><UserAPP>pedro.reyes</UserAPP><PwdAPP>pedro1</PwdAPP></clsParametros>",
            "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDbGllbnQgQXBpIFRNIjoiam9zZS5iZXRhbmNvdXJ0IiwibmJmIjoxNjQ5NDM3NTk1LCJleHAiOjE2NTIwMjk1OTUsImlhdCI6MTY0OTQzNzU5NSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo3MTk2IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo3MTk2In0.ZNF5FTu4HwM7DpUutWcK_GlVDh5gvLN0_sHDDW04yBw"
        })               
    });

    request.done(function(msg) {
        console.log(msg);
        var ob = JSON.parse(msg.dataResponse);
        for (var i = 0; i < ob.Table.length; i+=1) {
            console.log(ob.Table[i].USU_Usuario);
        }
        
    }); 

    request.fail(function(jqXHR, textStatus) {
        alert( "Request failed: " + textStatus );
    });
    

  })