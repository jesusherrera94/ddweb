
let valor = 3;
var food = {};
var food_to_select= [];
var food_to_select_index = 0;
var selectorID = 1;


fillBD()
cleanTables()


//llenado de los combobox
fillCombobox()
//generacion de un nuevo combobox

//Llenar la base de datos
function fillBD(){

      $.getJSON("./BD/BD_INCAP_V1.json", function(response){
        $.each(response.grupo_alimentos,function(i,val){
          food[val.grupo]=val.grupo;
          food_to_select[food_to_select_index] = val.grupo;
          food_to_select_index++;
          $.each(val.alimentos,function(j,val_alimentos){
            food[val_alimentos.nombre]=val_alimentos;
            food_to_select[food_to_select_index]=val_alimentos.nombre;
            food_to_select_index++;
           })

        })
      })

}

//estas lineas solo trabajan la parte de las tablas
//extraer el valor del combobox
$('select#times').on('change',function(){
	$('.nutriente').prop('checked', false);
   valor = $(this).val();
   cleanTables()
   generateTables()
   generateDinamicRows(valor)
   fillCombobox()
})


function generateDinamicRows(valor){
  let generateDRows = ''
  for(i=1;i<=7;i++){
    for(j=1;j<=valor; j++){
      generateDRows = '<tr id="row-'+i+"-"+j+'"> <th scope="row"> '+j+' </th> '+
      ' <td><div class="times-col"> <input type="text" name="times" value="" id="time-'+i+"-"+j+'" placeholder="Tiempo" class="in-table" required> </div> </td>  <td><div id="col-2-'+i+"-"+j+'"></div><br>'+
      '<div id="margin-button"><button type="button" class="btn btn-success btn-sm" id="btn-'+i+"-"+j+'">+</button></div> </td> '+
      ' <td> <div class="times-col" id="col-3-'+i+"-"+j+'"> '+
      '</div> </td>  <td>'+'<div class="times-col" id="col-4-'+i+"-"+j+'">  </div> '
      +' </td>  <td><div id="col-5-'+i+'-'+j+'">'+
      `
        <ul>
        <li class="agua" style="display: none;" id="agua-${i}-${j}">Agua:</li>
        <li class="energia" style="display: none;" id="energia-${i}-${j}">Energía:</li>
        <li class="proteina" style="display: none;" id="proteina-${i}-${j}">Proteina:</li>
        <li class="grasa-total" style="display: none;" id="grasa-total-${i}-${j}">Grasa Total:</li>
        <li class="carbohidratos" style="display: none;" id="carbohidratos-${i}-${j}">Carbohidratos:</li>
        <li class="fibra-diet" style="display: none;" id="fibra-diet-${i}-${j}">Fibra Diet. Total:</li>
        <li class="ceniza" style="display: none;" id="ceniza-${i}-${j}">Ceniza:</li>
        <li class="calcio" style="display: none;" id="calcio-${i}-${j}">Calcio:</li>
        <li class="fosforo" style="display: none;" id="fosforo-${i}-${j}">Fósforo:</li>
        <li class="hierro" style="display: none;" id="hierro-${i}-${j}">Hierro:</li>
        <li class="tiamina" style="display: none;" id="tiamina-${i}-${j}">Tiamina:</li>
        <li class="ruboflavina" style="display: none;" id="ruboflavina-${i}-${j}">Ruboflavina:</li>
        <li class="niacina" style="display: none;" id="niacina-${i}-${j}">Niacina:</li>
        <li class="vitamina-c" style="display: none;" id="vitamina-c-${i}-${j}">Vitamina C:</li>
        <li class="vitamina-a" style="display: none;" id="vitamina-a-${i}-${j}">Vit A equi. Retinol:</li>
        <li class="mono-insat" style="display: none;" id="mono-insat-${i}-${j}">Ac. grasos mono-insat:</li>
        <li class="poli-insat" style="display: none;" id="poli-insat-${i}-${j}">Ac. grasos poli-insat:</li>
        <li class="grasos-saturados" style="display: none;" id="grasos-saturados-${i}-${j}">Ac. grasos saturados:</li>
        <li class="colesterol" style="display: none;" id="colesterol-${i}-${j}">Colesterol:</li>
        <li class="potasio" style="display: none;" id="potasio-${i}-${j}">Potasio:</li>
        <li class="sodio" style="display: none;" id="sodio-${i}-${j}">Sodio:</li>
        <li class="zinc" style="display: none;" id="zinc-${i}-${j}">Zinc:</li>
        <li class="magnesio" style="display: none;" id="magnesio-${i}-${j}">Magnesio:</li>
        <li class="vitamina-b6" style="display: none;" id="vitamina-b6-${i}-${j}">Vitamina B6:</li>
        <li class="vitamina-b12" style="display: none;" id="vitamina-b12-${i}-${j}">Vitamina B12:</li>
        <li class="acido-folico" style="display: none;" id="acido-folico-${i}-${j}">Ácido Fólico:</li>
        <li class="folato" style="display: none;" id="folato-${i}-${j}">Folato Equiv. FD:</li>
        <li class="fr-comestible" style="display: none;" id="fr-comestible-${i}-${j}">Fracción Comestible:</li>
      </ul>
      `
      +'</div> </td> </tr>'
      $('#resumentbl'+i).append(generateDRows)
    }

  }
}

function generateTables(){
  let generateDTables = ''
  let generateDTotal = ''
for(i=0; i<7; i++){
  generateDTables = '<table class="table table-sm table-bordered" style="background: #fff;" id="resumentbl'+(i+1)+'"> <thead> <th>#</th> <th>Tiempo</th> <th>Alimento(s)</th> '+
  '<th >medida</th> <th>Cantidad</th> <th>Nutriente(s)</th> </thead> <tbody>  </tbody> </table>'

generateDTotal=`
<div class="card bg-light text-dark">
  <h6>Nutrientes Totales del Día:</h6>
    <div class="card-body">
      <ul class="navlist">
        <li class="agua" style="display: none;" id="agua-total-${i+1}">Agua:</li>
        <li class="energia" style="display: none;" id="energia-total-${i+1}">Energía(Kcal):</li>
        <li class="proteina" style="display: none;" id="proteina-total-${i+1}">Proteina:</li>
        <li class="grasa-total" style="display: none;" id="grasa-total-${i+1}">Grasa Total:</li>
        <li class="carbohidratos" style="display: none;" id="carbohidratos-total-${i+1}">Carbohidratos:</li>
        <li class="fibra-diet" style="display: none;" id="fibra-diet-total-${i+1}">Fibra Diet. Total:</li>
        <li class="ceniza" style="display: none;" id="ceniza-total-${i+1}">Ceniza:</li>
        <li class="calcio" style="display: none;" id="calcio-total-${i+1}">Calcio:</li>
        <li class="fosforo" style="display: none;" id="fosforo-total-${i+1}">Fósforo:</li>
        <li class="hierro" style="display: none;" id="hierro-total-${i+1}">Hierro:</li>
        <li class="tiamina" style="display: none;" id="tiamina-total-${i+1}">Tiamina:</li>
        <li class="ruboflavina" style="display: none;" id="ruboflavina-total-${i+1}">Ruboflavina:</li>
        <li class="niacina" style="display: none;" id="niacina-total-${i+1}">Niacina:</li>
        <li class="vitamina-c" style="display: none;" id="vitamina-c-total-${i+1}">Vitamina C:</li>
        <li class="vitamina-a" style="display: none;" id="vitamina-a-total-${i+1}">Vit A equi. Retinol:</li>
        <li class="mono-insat" style="display: none;" id="mono-insat-total-${i+1}">Ac. grasos mono-insat:</li>
        <li class="poli-insat" style="display: none;" id="poli-insat-total-${i+1}">Ac. grasos poli-insat:</li>
        <li class="grasos-saturados" style="display: none;" id="grasos-saturados-total-${i+1}">Ac. grasos saturados:</li>
        <li class="colesterol" style="display: none;" id="colesterol-total-${i+1}">Colesterol:</li>
        <li class="potasio" style="display: none;" id="potasio-total-${i+1}">Potasio:</li>
        <li class="sodio" style="display: none;" id="sodio-total-${i+1}">Sodio:</li>
        <li class="zinc" style="display: none;" id="zinc-total-${i+1}">Zinc:</li>
        <li class="magnesio" style="display: none;" id="magnesio-total-${i+1}">Magnesio:</li>
        <li class="vitamina-b6" style="display: none;" id="vitamina-b6-total-${i+1}">Vitamina B6:</li>
        <li class="vitamina-b12" style="display: none;" id="vitamina-b12-total-${i+1}">Vitamina B12:</li>
        <li class="acido-folico" style="display: none;" id="acido-folico-total-${i+1}">Ácido Fólico:</li>
        <li class="folato" style="display: none;" id="folato-total-${i+1}">Folato Equiv. FD:</li>
        <li class="fr-comestible" style="display: none;" id="fr-comestible-total-${i+1}">Fracción Comestible:</li>
      </ul>
    
    <hr>
    <h6>Distribuciones:</h6>
        <ul class="navlist">
        <li class ="energia-hb hb-report" style="display: none;"><li>
        <li class ="proteina-hb hb-report" style="display: none;"><li>
        <li class ="carbohidratos-hb hb-report" style="display: none;"><li>
        <li class ="grasas-hb hb-report" style="display: none;"><li>
        <li class ="leche-descremada-hb hb-report" style="display: none;"><li>
        <li class ="leche-hb hb-report" style="display: none;"><li>
        <li class ="vegetales-hb hb-report" style="display: none;"><li>
        <li class ="frutas-hb hb-report" style="display: none;"><li>
        <li class ="cereales-hb hb-report" style="display: none;"><li>
        <li class ="carnes-hb hb-report" style="display: none;"><li>
        <li class ="porcion-grasas-hb hb-report" style="display: none;"><li>
        <li class ="azucares-hb hb-report" style="display: none;"><li>
      </ul>
      </div>

  </div><br>
`
  $('#group-table').append(generateDTables)
  $('#group-table').append(generateDTotal)
}
}
function cleanTables(){
  $(document).ready(()=>{
$('#group-table').replaceWith('<div id="group-table"></div>')
  generateTables()
  generateDinamicRows(valor)
  })
}

function fillCombobox(selectr){
let generateOptions = ''
//llena el último combobox generado con el botón +
  if(selectr){
    for(i=0;i<food_to_select.length;i++){
      generateOptions = '<option value="'+food_to_select[i]+'">'+food_to_select[i]+'</select>'
      $('#select-'+selectr).append(generateOptions)
    }
  }
//llena los combobox generados al inicio de correr el programa
  else{
    for(i=0;i<food_to_select.length;i++){
    generateOptions = '<option value="'+food_to_select[i]+'">'+food_to_select[i]+'</select>'
    $('.foodSelector').append(generateOptions)
    }
  }
}

//Fin de la generación de las tablas y filas.
//Comienzo del trabajo de los botones-plus

$(function() {
 $(document).on('click', 'button[type="button"]', function(event) {
    let id = this.id;
    onClickPlus(id);
  });
});

function onClickPlus(btnId){
  let  generateSelect = '<div class="container-foodSelector"><select name="foodSelector" class="foodSelector" id="select-'+selectorID+'"> </select> <button class="btn btn-sm btn-danger btn-circle" type="reset" id="btn-e-'+selectorID+'">-</button><br id="-'+selectorID+'"></div>'
  let generateInputMedida = '<input type="text" name="medida-empirica"  id="medida-empirica-'+selectorID+'" placeholder="taza, cucharada, etc..." class="in-table" required><br id="-'+selectorID+'">'
  let generateInputStandar =  '<input type="number" min="0" max="1000" name="medida-estandar"  id="medida-estandar-'+selectorID+'" placeholder="100" class="in-table" size="3" required><strong id="s-'+selectorID+'">  gr.</strong><br id="-'+selectorID+'">'
  $('#col-2'+btnId.substr(3,6)).append(generateSelect)
  $('#col-3'+btnId.substr(3,6)).append(generateInputMedida)
  $('#col-4'+btnId.substr(3,6)).append(generateInputStandar)
  fillCombobox(selectorID)
  //converir el select simple a un select2
  $('.foodSelector').select2();
  selectorID++;
  }


//comienzo de funciones para eliminar selects
$(function() {
 $(document).on('click', 'button[type="reset"]', function(event) {
    let idLess = this.id;
    onClickLess(idLess);    
  });
});

function onClickLess(btnIdLess){
	var i_less = 0;
 	var j_less = 0;
 	food_selected_less = [];
 	gr_less = [];
	let col_id_less = $('#'+btnIdLess).parent().parent().attr('id')

    $('#medida-empirica'+btnIdLess.substr(5,8)).remove()
  $('#medida-estandar'+btnIdLess.substr(5,8)).remove()
   $( "strong" ).remove( '#s'+btnIdLess.substr(5,8));
  $('button').remove('#'+btnIdLess);
 $("#select"+btnIdLess.substr(5,8)).select2('destroy'); 
  $('select').remove('#select'+btnIdLess.substr(5,8))
  $('br').remove('#'+btnIdLess.substr(5,8))
//Bug de auto-calculo al eliminar un select
//Re-calculo.
  $('#'+col_id_less+ ' select').each(function(){
       food_selected_less[i_less]=food[$(this).val()];
       i_less++;
  });
  $('#col-4'+col_id_less.substr(5,10)+' input[type="number"]').each(function(){
  		gr_less[j_less]=$(this).val();
  		j_less++
  });
  calc(food_selected_less, col_id_less, gr_less);
}