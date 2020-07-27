const {ipcRenderer} = require('electron')

$('#userless').click(()=>{
    ipcRenderer.sendSync('openTab','ok')
})

$(function() {
$(document).on('click', 'button[type="button"]', function() {
	let usuario = $('#usuario')
	let usuarioValidado = caracteresCorreoValido(usuario)
	let password = $('#contrasena')
	let contrasenaValidadaNV = contrasenaValidada(password)
	//ingresar al Diet Design
	if(caracteresCorreoValido&&contrasenaValidadaNV){
        $('#entrar').html('<i class="fas fa-spinner fa-pulse"></i>');
        $('#entrar').prop("disabled", true);
        crypt(usuario.val(),password.val())
        }
})
});


//Validar si el input contiene los caracteres para ser correo
    function caracteresCorreoValido(usuario){
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(usuario.val()) == false){
         var thisAlert = $(usuario).parent();
        $(thisAlert).addClass('alert-validate');
    	$("#correo-invalido").css('display','block')
        return false;
    }else{
        var thisAlert = $(usuario).parent();
        $(thisAlert).removeClass('alert-validate');
        $("#correo-invalido").css('display','none')
        return true;
    }
}

//Validar si la contraseña no está vacía
function contrasenaValidada(password){
	if(password.val() == ''){
		var thisAlert = $(password).parent();
        $(thisAlert).addClass('alert-validate');
        $("#contraseña-vacia").css('display','block');
        return false;
	}else{
		var thisAlert = $(password).parent();
        $(thisAlert).removeClass('alert-validate');
        $("#contraseña-vacia").css('display','none')
        return true;
	}
}

//este fragmento del codigo se tiene que ofuscar.
function crypt(user,pass){
    var response =''
    var truster = '42'
    var encrypted_user = CryptoJS.AES.encrypt(user, truster);
    var encrypted_pass = CryptoJS.AES.encrypt(pass, truster);

    var dataS = encrypted_user.toString()+encrypted_pass.toString()
    $.ajax({
                        type: 'POST',
                        data: "id="+encodeURIComponent(dataS)+"&user="+encodeURIComponent(encrypted_user)+"&pass="+encodeURIComponent(encrypted_pass),
                        url: 'https://dd-auth-server.herokuapp.com/login',                      
                        success: function(data) {
                            if(data=='auth/invalid-email'){
                                $('#entrar').html('Entrar');
                                $('#entrar').prop("disabled", false);
                                var thisAlert = $($('#usuario')).parent();
                                $(thisAlert).addClass('alert-validate');
    	                        $("#correo-invalido").css('display','block')
                            }
                            else{
                        if(data=='auth/network-request-failed'){
                            $('#entrar').html('Entrar');
                            $('#entrar').prop("disabled", false);
                            $("#correo-invalido").text('Error de conexión')
                            $("#contraseña-vacia").text('')
                            $("#correo-invalido").css('display','block')
                            $("#contraseña-vacia").css('display','block');
                        }else{
                            if(data=='auth/user-not-found' || data=='auth/wrong-password'){
                                $('#entrar').html('Entrar');
                                $('#entrar').prop("disabled", false);
                                $("#correo-invalido").text('Contraseña o correo')
                                $("#contraseña-vacia").text('inválidos')
                                $("#correo-invalido").css('display','block')
                                $("#contraseña-vacia").css('display','block');
                            }
                            else{
                                if(data=='usuario logeado previamente'){
                                    $('#entrar').html('Entrar');
                                    $('#entrar').prop("disabled", false);
                                    $("#correo-invalido").text('Usuario en Uso')
                                    $("#contraseña-vacia").text('')
                                    $("#correo-invalido").css('display','block')
                                    $("#contraseña-vacia").css('display','block');
                                }else{
                                    $('#entrar').html('Entrar');
                                    $('#entrar').prop("disabled", false);
                                    ipcRenderer.sendSync('save-user',user);
                                    console.log('data:'+data);
                                    location.href=data;
                                }
                            }
                        }
                    }

                    }
                    });

}