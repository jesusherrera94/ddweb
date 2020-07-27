const {ipcRenderer} = require('electron')
let valorExport = 3;

var dias =["Lunes","Martes","Miércoles","Jueves","Viernes","Sabado","Domingo"]

var configs= {}

$(document).on('change','input[name=times]',function(){
  $('#col-export-1'+this.id.substr(4,10)).text($('#'+this.id).val())
})
function readConfig(){
  $.getJSON("./config/config.json", function(response){
    configs = response;
    $('#prefijo').val(configs.config.prefijo)
    $('#nombre-lic').val(configs.config.nombre)
    $('#clinica').val(configs.config.clinica)
    $('#telefono').val(configs.config.telefono)
    $('#direccion').val(configs.config.direccion)
  })
}
$('#save-config').click(()=>{
  $('#save-config').html('<i class="fas fa-spinner fa-pulse"></i>');
        $('#save-config').prop("disabled", true);
  var str = []
   str[0] = `
  {
    "config":{
        "nombre" : "${$('#nombre-lic').val()}",
        "clinica": "${$('#clinica').val()}",
        "telefono" : "${$('#telefono').val()}",
        "direccion" : "${$('#direccion').val()}",
        "prefijo":"${$('#prefijo').val()}"
    }
    
}
  `
  if(ipcRenderer.sendSync('save-setting1',str)=='0'){
    $('#save-config').html('Guardar');
        $('#save-config').prop("disabled", false);
        $('#error-config').css('display','none')
        $('#config-success').css('display','block')
  readConfig();
}else{
  $('#error-config').css('display','block')
  $('#config-success').css('display','none')
}
})
$('.cancel-config').click(()=>{
  $('#config-success').css('display','none')
  $('#error-config').css('display','none')
})
//Generar las tablas que se van a exportar
readConfig()
cleanTablesExport()
generateTablesExport()
generateDinamicRowsExport(valorExport)
appendTableDistribucion()

$('#por-lch-des').change(()=>{
  $("#por-lch-des-exp").text($('#por-lch-des').val())
})
$('#por-lch').change(()=>{
$("#por-lch-exp").text($("#por-lch").val())
})
$('#por-veg').change(()=>{
  $("#por-veg-exp").text($('#por-veg').val())
})

$('#por-frutas').change(()=>{
  $("#por-frutas-exp").text($('#por-frutas').val())
})
$('#por-cer').change(()=>{
  $('#por-cer-exp').text($('#por-cer').val())
})
$('#por-car').change(()=>{
  $('#por-car-exp').text($('#por-car').val())
})
$('#por-lip-grasa').change(()=>{
  $('#por-lip-grasa-exp').text($('#por-lip-grasa').val())
})
$('#por-azucar').change(()=>{
  $('#por-azucar-exp').text($('#por-azucar').val())
})
function appendTableDistribucion(){
  $('#group-table-export').append(`
  <h3>Distribuciónes</h3>
  <table class="table table-sm">
				  <thead>
				    <tr>
				      <th scope="col">Grupo</th>
				      <th scope="col">Porción</th>
				    </tr>
				  </thead>
				  <tbody>
				    <tr>
				    
				      <td>Leche Descremada</td>
				      <td><div id="por-lch-des-exp">${$('#por-lch-des').val()}</div></td>
				    </tr>
				    <tr>
				     
				      <td>Leche</td>
				      <td><div id="por-lch-exp">${$('#por-lch').val()}</div></td>
				    </tr>
				    <tr>
				      
				      <td>Vegetables</td>
				      <td><div id="por-veg-exp">${$('#por-veg').val()}</div></td>
				    </tr>
				    <tr>
				      
				      <td>Frutas</td>
				      <td><div id="por-frutas-exp">${$('#por-frutas').val()}</div></td>
				    </tr>
				    <tr>
				     
				      <td>Cereales</td>
				      <td><div id="por-cer-exp">${$('#por-cer').val()}</div></td>
				    </tr>
				    <tr>
				      
              <td>Carnes</td>
				      <td><div id="por-car-exp">${$('#por-car').val()}</div></td>
				    </tr>
				    <tr>
				      
				      <td>Grasas</td>
				      <td><div id="por-lip-grasa-exp">${$('#por-lip-grasa').val()}</div></td>
				    </tr>
				    <tr>
				      
				      <td>Azucares</td>
				      <td><div id="por-azucar-exp">${$('#por-azucar').val()}</div></td>
				    </tr>
				  </tbody>
				</table>

  `)
}


$('select#times').on('change',function(){
	$('.nutriente').prop('checked', false);
  valorExport = $(this).val();
   cleanTablesExport()
   generateTablesExport()
   generateDinamicRowsExport(valorExport)
   appendTableDistribucion()
   
})
function generateTablesExport(){
  let generateDTablesExport = ''

for(i=0; i<7; i++){
  generateDTablesExport = `<h6>${dias[i]}</h6>`+'<table class="table table-sm table-bordered export" style="background: #fff;" id="resumentbl-export'+(i+1)+'"> <thead> <th>#</th> <th>Tiempo</th> <th>Alimento(s)</th> '+
  '<th >medida</th> <th>Cantidad</th> </thead> <tbody>  </tbody> </table>'

  $('#group-table-export').append(generateDTablesExport)
}
}
function cleanTablesExport(){
$('#group-table-export').replaceWith('<div id="group-table-export"></div>')
}


function generateDinamicRowsExport(valor){
  let generateDRows = ''
  for(i=1;i<=7;i++){
    for(j=1;j<=valor; j++){
      generateDRows = `<tr id="row-${i}-${j}"> <th scope="row"> ${j} </th> 
      <td><div class="times-col" id="col-export-1-${i}-${j}"> </div> </td>  
     <td><div id="col-export-2-${i}-${j}"></div></td> 
     <td> <div class="times-col" id="col-export-3-${i}-${j}"></div> </td>  
     <td><div class="times-col" id="col-export-4-${i}-${j}"></div> </td>  
      </tr>`
      $('#resumentbl-export'+i).append(generateDRows)
    }

  }
}
//columna2
$(function(){
  $(document).on('change', 'select[name= foodSelector ]', function(event) {
    let id_select = this.id;
    foodSelectedExport = '';
     let col_id = $('#'+id_select).parent().parent().attr('id')
      foodSelectedExport += '<ol>'
     $('#'+col_id+ ' select').each(function(){
      foodSelectedExport +='<li>'
        foodSelectedExport += $(this).val()
        foodSelectedExport +='</li>'
       });
       foodSelectedExport +='</ol>'
       $('#col-export-'+col_id.substr(4,10)).html(foodSelectedExport);
 });
});
//columna4
$(function(){
  $(document).on('change', 'input[type= number ]', function(event) {
     let input_id = this.id;
     let gr=''
     let col_id = $('#'+input_id).parent().attr('id')
      gr +='<ol>'
     $('#'+col_id+ ' input[type="number"]').each(function(){
       gr += '<li>'
       gr+=$(this).val();
       gr+=' gr. </li>'
       });
       gr+='</ol>'
       $('#col-export-'+col_id.substr(4,10)).html(gr);
 });
});
//columna3
 $(function(){
  $(document).on('change', 'input[name= medida-empirica ]', function(event) {
     let input_id = this.id;
     let medida=''
     let col_id = $('#'+input_id).parent().attr('id')
      medida +='<ol>'
     $('#'+col_id+ ' input[name= medida-empirica]').each(function(){
       medida += '<li>'
       medida+=$(this).val();
       medida+='</li>'
       });
       medida+='</ol>'
       $('#col-export-'+col_id.substr(4,10)).html(medida);
 });
});

//EXPORTAR A PDF_________________________________________________________________________________________________________________

function exportarPDF(){
  var hoy = new Date();
  var dd = hoy.getDate();
  var mm = hoy.getMonth()+1;
  var yyyy = hoy.getFullYear();
  
  if(dd<10) {
      dd='0'+dd
  } 
  
  if(mm<10) {
      mm='0'+mm
  } 
  
  cd = dd+'/'+mm+'/'+yyyy;
  $.fileDownload(ipcRenderer.sendSync('synchronous-message',
        `
        <!DOCTYPE html>
<html lang="en">
<head>
        <link rel="stylesheet" type="text/css" href="./bower_components/bootstrap/dist/css/bootstrap.min.css">
        <style>
        @media print {
            thead{
                background-color: cornflowerblue;
            }
            table, th, td{
              border: 1px solid #262626;
              border-collapse: collapse;
              font-family: Arial, Helvetica, sans-serif;
          }
          table{
            margin-bottom: 5px;
        }
        thead{
          color: #fff;
        }
        .group {
          margin-top: 3mm;
        }
        .line {
          color: black;
          position: relative;
          font-family: Arial, Helvetica, sans-serif;
        }
        .page {
          margin-botton: 10px;
        }
        h1,h2,h3,h4,h5,h6{
          font-family: Arial, Helvetica, sans-serif;
        }
        td{
          font-size: 10px;
        }
        }
        
        </style>
</head>
<body>
        <div class="page">
        <div class="bottom">
          <div class="line">${configs.config.prefijo} ${configs.config.nombre}</div>

          <div class="group">
          <di class="line">${configs.config.clinica}</div>
            <div class="line">Tel. ${configs.config.telefono}</div>
            <div class="line">Dirección: ${configs.config.direccion} </div>
            <div class="line">Email: ${ipcRenderer.sendSync('get-user','user')}</div>
          </div>
          <div class="group">
            <div class="line">Paciente: ${$("#nombre").val()}</div>
            <div class="line">Fecha: ${cd}</div>
          </div>
        </div>
        </div>
        <hr>
        <h3>Menú</h3>
        ${$('#group-table-export').html()}
        <script type="text/javascript" src="./bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
</body>
</html>
        `)
      )

}

 $('#exportar').click(()=>{

  $('#exportar').html('<i class="fas fa-spinner fa-pulse"></i>');
  $('#exportar').prop("disabled", true);
  
$.when(
  exportarPDF()  
  ).then(()=>{
    $('#exportar').html('Exportar');
    $('#exportar').prop("disabled", false);
            })
    })