$("#logout").click(function() {
    $('#logout').html('<i class="fas fa-spinner fa-pulse"></i> Logout');
    $('#logout').prop("disabled", true);
	$.ajax({
		url:"https://dd-auth-server.herokuapp.com/logout",
		data:'user='+ipcRenderer.sendSync('get-user','user'),
        method: "POST",
        success:function(respuesta){
            console.log('respuesta exitosa')
            location.href='./Login_v3/index.html';
                
        }
    });

})