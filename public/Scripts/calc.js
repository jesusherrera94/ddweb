//Esta parte es los calculos de Harris-benedict
var hb = 0;
var pro = 0;
var cho = 0;
var lip = 0;
$(function(){
 $(document).on('change', 'input[type="range"]', function(event) {
 	var actividadFisica = $(this).val();
 	var actividadFisicaPorcentual = Number(actividadFisica)/10;
 	$('#ejercicio').text(actividadFisicaPorcentual);
});});

$(function(){
$(document).on('change','input',function(event){
	if($('input[name=genero]:checked').val()=='femenino'){
		hb = (655+9.56*Number($('#peso').val())+1.85*Number($('#altura').val())-4.68*Number($('#edad').val()))*(Number($('#ejercicio').text()))
		var imc=Number($('#peso').val())/((Number($('#altura').val()/100))*(Number($('#altura').val()/100)))
		$('#ht-total').text('HB(Kcal): '+hb.toFixed(3));
		$('#imc').text('IMC(kg/m2): '+imc.toFixed(3));
		$('.mc-hb').text(hb.toFixed(3))
	}
	else{
		hb = (66.5+13.75*Number($('#peso').val())+5*Number($('#altura').val())-6.79*Number($('#edad').val()))*(Number($('#ejercicio').text()))
		var imc=Number($('#peso').val())/((Number($('#altura').val()/100))*(Number($('#altura').val()/100)))
		$('#ht-total').text('HB(Kcal): '+hb.toFixed(3));
		$('#imc').text('IMC(kg/m2): '+imc.toFixed(3));
		$('.mc-hb').text(hb.toFixed(3))
	}
});});
//Distribucion de macronutrientes
$(function(){
$(document).on('change','input',function(event){
	var kcalCho =( Number($('#por-cho').val())*hb)/100;
	$('#kcal-cho').text(kcalCho.toFixed(2));
	var totalCho = kcalCho.toFixed(2) / Number($('#mc-gr-cho').text())
	$('#mc-total-cho').text(totalCho.toFixed(2));

	var kcalPro =( Number($('#por-pro').val())*hb)/100;
	$('#kcal-pro').text(kcalPro.toFixed(2));
	var totalPro = kcalPro.toFixed(2) / Number($('#mc-gr-pro').text())
	$('#mc-total-pro').text(totalPro.toFixed(2));

	var kcalLip =( Number($('#por-lip').val())*hb)/100;
	$('#kcal-lip').text(kcalLip.toFixed(2));
	var totalLip = kcalLip.toFixed(2) / Number($('#mc-gr-lip').text())
	$('#mc-total-lip').text(totalLip.toFixed(2));
	cho = totalCho;
	pro = totalPro;
	lip = totalLip;
	 var flag = Number($('#por-cho').val()) + Number($('#por-pro').val()) + Number($('#por-lip').val())

	if(flag > 100){
		$('#sobre-porcentaje').removeClass( "on-limit under-limit" ).addClass( "overflow" );
		let diference = flag - 100;
		$('#sobre-porcentaje').text('Se pasa por:'+diference.toFixed(2))
		$('#sobre-porcentaje').css( "display", "block" );
	}else{
		$('#sobre-porcentaje').removeClass( "overflow under-limit" ).addClass( "on-limit" );
		let diference = 100 - flag ;
		$('#sobre-porcentaje').text('falta:'+diference.toFixed(2))
		$('#sobre-porcentaje').css( "display", "block" );
	}

})})
//Distribucion por grupo de alimentos
$(function(){
$(document).on('change','input',function(event){
//Leche descremada
$('#lch-des-kcal').text(Number($('#por-lch-des').val())*70); $('#lch-des-pro').text(Number($('#por-lch-des').val())*7); $('#lch-des-cho').text(Number($('#por-lch-des').val())*11); $('#lch-des-lip').text('0');
//leche
$('#lch-kcal').text(Number($('#por-lch').val())*135); $('#lch-pro').text(Number($('#por-lch').val())*7); $('#lch-cho').text(Number($('#por-lch').val())*11); $('#lch-lip').text(Number($('#por-lch').val())*7);
//vegetales
$('#veg-kcal').text(Number($('#por-veg').val())*30); $('#veg-pro').text('0'); $('#veg-cho').text(Number($('#por-veg').val())*7); $('#veg-lip').text('0');
//frutas
$('#frutas-kcal').text(Number($('#por-frutas').val())*40); $('#frutas-pro').text('0'); $('#frutas-cho').text(Number($('#por-frutas').val())*10); $('#frutas-lip').text('0'); 
//cereales
$('#cer-kcal').text(Number($('#por-cer').val())*75); $('#cer-pro').text(Number($('#por-cer').val())*3); $('#cer-cho').text(Number($('#por-cer').val())*16); $('#cer-lip').text('0');
//carnes
$('#car-kcal').text(Number($('#por-car').val())*65); $('#car-pro').text(Number($('#por-car').val())*7); $('#car-cho').text('0'); $('#car-lip').text(Number($('#por-car').val())*4);
//grasas
$('#lip-kcal').text(Number($('#por-lip-grasa').val())*45); $('#lip-pro').text('0'); $('#lip-cho').text('0'); $('#lip-lip').text(Number($('#por-lip-grasa').val())*5);
//azucar
$('#azucar-kcal').text(Number($('#por-azucar').val())*20); $('#azucar-pro').text('0'); $('#azucar-cho').text(Number($('#por-azucar').val())*5); $('#azucar-lip').text('0');

//totales
var kcalLocal = Number($('#lch-des-kcal').text()) + Number($('#lch-kcal').text()) + Number($('#veg-kcal').text()) + Number($('#frutas-kcal').text()) + Number($('#cer-kcal').text())+ Number($('#car-kcal').text()) + Number($('#lip-kcal').text()) + Number($('#azucar-kcal').text());
var proLocal = Number($('#lch-des-pro').text()) + Number($('#lch-pro').text()) + Number($('#veg-pro').text()) + Number($('#frutas-pro').text()) + Number($('#cer-pro').text()) + Number($('#car-pro').text()) + Number($('#lip-pro').text()) + Number($('#azucar-pro').text());
var choLocal = Number($('#lch-des-cho').text()) + Number($('#lch-cho').text()) + Number($('#veg-cho').text()) + Number($('#frutas-cho').text()) + Number($('#cer-cho').text()) + Number($('#car-cho').text()) + Number($('#lip-cho').text()) + Number($('#azucar-cho').text());
var lipLocal = Number($('#lch-des-lip').text()) + Number($('#lch-lip').text()) + Number($('#veg-lip').text()) + Number($('#frutas-lip').text()) + Number($('#cer-lip').text()) + Number($('#car-lip').text()) + Number($('#lip-lip').text()) + Number($('#azucar-lip').text());

$('#tot-kcal').text(kcalLocal.toFixed(2));
$('#tot-pro').text(proLocal.toFixed(2));
$('#tot-cho').text(choLocal.toFixed(2));
$('#tot-lip').text(lipLocal.toFixed(2));
//factores de correccion
var kcalLocalCorreccion = (kcalLocal / hb)*100;
var proLocalCorreccion = (proLocal / pro)*100;
var choLocalCorreccion = (choLocal / cho)*100;
var lipLocalCorreccion =  (lipLocal / lip)*100; 

//correccion para energia
$('#correccion-kcal').text(kcalLocalCorreccion.toFixed(2));
if(kcalLocalCorreccion > 0 && kcalLocalCorreccion < 94){
		$('#calcular').prop('disabled', false);
		$('#correccion-kcal').removeClass( "on-limit overflow near" ).addClass( "under-limit" );
}else{ 
	if(kcalLocalCorreccion > 95 && kcalLocalCorreccion < 105){
		$('#correccion-kcal').removeClass( "under-limit overflow near" ).addClass( "on-limit" );
	}else{
		if(kcalLocalCorreccion > 105){
			$('#correccion-kcal').removeClass( "under-limit on-limit near" ).addClass( "overflow" );
		}else{
			$('#correccion-kcal').removeClass( "under-limit on-limit overflow" ).addClass( "near" );
		}
	}

}
//correccion para proteina
$('#correccion-pro').text(proLocalCorreccion.toFixed(2));
if(proLocalCorreccion > 0 && proLocalCorreccion < 94){
		$('#correccion-pro').removeClass( "on-limit overflow near" ).addClass( "under-limit" );
		
}else{ 
	if(proLocalCorreccion > 95 && proLocalCorreccion < 105){
		$('#correccion-pro').removeClass( "under-limit overflow near" ).addClass( "on-limit" );
		
	}else{
		if(proLocalCorreccion > 105){
			$('#correccion-pro').removeClass( "under-limit on-limit near" ).addClass( "overflow" );
			
		}else{
			$('#correccion-pro').removeClass( "under-limit on-limit overflow" ).addClass( "near" );
		}
	}

}
//correccion para carbohidratos
$('#correccion-cho').text(choLocalCorreccion.toFixed(2));
if(choLocalCorreccion > 0 && choLocalCorreccion < 94){
		$('#correccion-cho').removeClass( "on-limit overflow near" ).addClass( "under-limit" );		
}else{ 
	if(choLocalCorreccion > 95 && choLocalCorreccion < 105){
		$('#correccion-cho').removeClass( "under-limit overflow near" ).addClass( "on-limit" );
	}else{ 
		if(choLocalCorreccion > 105){
				$('#correccion-cho').removeClass( "under-limit on-limit near" ).addClass( "overflow" );
			}else{
				$('#correccion-cho').removeClass( "under-limit on-limit overflow" ).addClass( "near" );
		}
	}

}

//correccion para grasas
$('#correccion-lip').text(lipLocalCorreccion.toFixed(2));
if(lipLocalCorreccion > 0 && lipLocalCorreccion < 94){
		$('#correccion-lip').removeClass( "on-limit overflow near" ).addClass( "under-limit" );
		
}else{ 
	if(lipLocalCorreccion > 95 && lipLocalCorreccion < 105){
		$('#correccion-lip').removeClass( "under-limit overflow near" ).addClass( "on-limit" );
		
	}else{
		if(lipLocalCorreccion > 105){
			$('#correccion-lip').removeClass( "under-limit on-limit near" ).addClass( "overflow" );	
		}else{
			$('#correccion-lip').removeClass( "under-limit on-limit overflow" ).addClass( "near" );
		}	
	}

}
})})

//imprimir todo en las tarjetas
$('#calcular').click(function(){

		$('.energia-hb').text('Energia: '+$('#tot-kcal').text())
		$('.proteina-hb').text('Proteina: '+$('#tot-pro').text())
		$('.carbohidratos-hb').text('Carbohidratos: '+$('#tot-cho').text())
		$('.grasas-hb').text('Grasa: '+$('#tot-lip').text())
		$('.leche-descremada-hb').text('Porciones Leche Descremada: '+ $('#por-lch-des').val())
		$('.leche-hb').text('Porciones Leche: '+ $('#por-lch').val())
		$('.vegetales-hb').text('Porciones Vegetales: '+ $('#por-veg').val())
		$('.frutas-hb').text('Porciones Frutas: '+ $('#por-frutas').val())
		$('.cereales-hb ').text('Porciones Cereales: '+ $('#por-cer').val())
		$('.carnes-hb').text('Porciones Carnes: '+ $('#por-car').val())
		$('.porcion-grasas-hb').text('Porciones Grasas: '+ $('#por-lip-grasa').val())
		$('.azucares-hb').text('Porciones Azcares: '+ $('#por-azucar').val())
		$('.hb-report').css('Porciones display','block');

})

//Listener para detectar los cambios en los combobox de los alimentos y extraer el id del combobox

//y buscar el alimento en el hash food para extraer el objeto con todos sus atributos
$(function(){
 $(document).on('change', 'select[name= foodSelector ]', function(event) {
 	var i = 0;
 	var j = 0;
 	food_selected = [];
 	gr = [];
    let id_select = this.id;
    let col_id = $('#'+id_select).parent().parent().attr('id')

  	$('#'+col_id+ ' select').each(function(){
       food_selected[i]=food[$(this).val()];
       i++;
    	});
  	$('#col-4'+col_id.substr(5,10)+' input[type="number"]').each(function(){
  		gr[j]=$(this).val();
  		j++
  	});

  	calc(food_selected, col_id, gr);
});});

$(function(){
 $(document).on('change', 'input[type= number ]', function(event) {
 	var i = 0;
 	var j = 0;
 	food_selected = [];
 	gr = [];
    let input_id = this.id;
    let col_id = $('#'+input_id).parent().attr('id')

  	$('#'+col_id+ ' input[type="number"]').each(function(){
  		gr[j]=$(this).val();
  		j++

		});
		console.log(col_id);
  	$('#col-2'+col_id.substr(5,10)+' select').each(function(){
       food_selected[i]=food[$(this).val()];
       i++;
  	});
  	calc(food_selected, col_id, gr);
});});


//falta extraer el id de las filas para hacer los respectivos cálculos
function calc(food_selected, col_id, gr){
	id_sh = col_id.substr(5,10)
	var agua = 0
	var energia = 0
	var proteina = 0
	var grasa_total = 0
	var carbohidratos = 0
	var fibra_diet_total = 0
	var ceniza = 0
	var calcio = 0
	var fosforo = 0
	var hierro = 0
	var tiamina = 0
	var ruboflavina = 0
	var niacina = 0
	var vitamina_c = 0
	var Vit_a_equi_retinol = 0
	var Ac_grasos_mono_insat = 0
	var Ac_grasos_poli_insat = 0
	var Ac_grasos_saturados = 0
	var colesterol = 0
	var potasio = 0
	var sodio = 0
	var zinc = 0
	var magnesio = 0
	var vitamina_b6 = 0
	var vitamina_b12 = 0
	var acido_folico = 0
	var folato_equiv_fd = 0
	var fraccion_comestible = 0

	for (var i = food_selected.length - 1; i >= 0; i--) {
		if(gr[i]==""){	
			agua = Number(agua) + Number(food_selected[i].agua)
			energia = Number(energia) + Number(food_selected[i].energia)
			proteina = Number(proteina) + Number(food_selected[i].proteina)
			grasa_total = Number(grasa_total) + Number(food_selected[i].grasa_total)
			carbohidratos = Number(carbohidratos) + Number(food_selected[i].carbohidratos)
			fibra_diet_total = Number(fibra_diet_total) + Number(food_selected[i].fibra_diet_total)
			ceniza = Number(ceniza) + Number(food_selected[i].ceniza)
			calcio = Number(calcio) + Number(food_selected[i].calcio)
			fosforo = Number(fosforo) + Number(food_selected[i].fosforo)
			hierro = Number(hierro) + Number(food_selected[i].hierro)
			tiamina = Number(tiamina) + Number(food_selected[i].tiamina)
			ruboflavina = Number(ruboflavina) + Number(food_selected[i].ruboflavina)
			niacina = Number(niacina) + Number(food_selected[i].niacina)
			vitamina_c = Number(vitamina_c) + Number(food_selected[i].vitamina_c)
			Vit_a_equi_retinol = Number(Vit_a_equi_retinol) + Number(food_selected[i].Vit_a_equi_retinol)
			Ac_grasos_mono_insat = Number(Ac_grasos_mono_insat) + Number(food_selected[i].Ac_grasos_mono_insat)
			Ac_grasos_poli_insat = Number(Ac_grasos_poli_insat) + Number(food_selected[i].Ac_grasos_poli_insat)
			Ac_grasos_saturados = Number(Ac_grasos_saturados) + Number(food_selected[i].Ac_grasos_saturados)
			colesterol = Number(colesterol) + Number(food_selected[i].colesterol)
			potasio = Number(potasio) + Number(food_selected[i].potasio)
			sodio = Number(sodio) + Number(food_selected[i].sodio)
			zinc = Number(zinc) + Number(food_selected[i].zinc)
			magnesio = Number(magnesio) + Number(food_selected[i].magnesio)
			vitamina_b6 = Number(vitamina_b6) + Number(food_selected[i].vitamina_b6)
			vitamina_b12 = Number(vitamina_b12) + Number(food_selected[i].vitamina_b12)
			acido_folico = Number(acido_folico) + Number(food_selected[i].acido_folico)
			folato_equiv_fd = Number(folato_equiv_fd) + Number(food_selected[i].folato_equiv_fd)
			fraccion_comestible = Number(fraccion_comestible) + Number(food_selected[i].fraccion_comestible)
		}
		else{
			agua = Number(agua) +((Number(food_selected[i].agua)*gr[i])/100)
			energia = Number(energia) +((Number(food_selected[i].energia)*gr[i])/100) 
			proteina = Number(proteina) +((Number(food_selected[i].proteina)*gr[i])/100)
			grasa_total = Number(grasa_total) +((Number(food_selected[i].grasa_total)*gr[i])/100)
			carbohidratos = Number(carbohidratos) +((Number(food_selected[i].carbohidratos)*gr[i])/100)
			fibra_diet_total = Number(fibra_diet_total) +((Number(food_selected[i].fibra_diet_total)*gr[i])/100)
			ceniza = Number(ceniza) +((Number(food_selected[i].ceniza)*gr[i])/100)
			calcio = Number(calcio) +((Number(food_selected[i].calcio)*gr[i])/100)
			fosforo = Number(fosforo) +((Number(food_selected[i].fosforo)*gr[i])/100)
			hierro = Number(hierro) +((Number(food_selected[i].hierro)*gr[i])/100)
			tiamina = Number(tiamina) +((Number(food_selected[i].tiamina)*gr[i])/100)
			ruboflavina = Number(ruboflavina) +((Number(food_selected[i].ruboflavina)*gr[i])/100)
			niacina = Number(niacina) +((Number(food_selected[i].niacina)*gr[i])/100)
			vitamina_c = Number(vitamina_c) +((Number(food_selected[i].vitamina_c)*gr[i])/100)
			Vit_a_equi_retinol = Number(Vit_a_equi_retinol) +((Number(food_selected[i].Vit_a_equi_retinol)*gr[i])/100)
			Ac_grasos_mono_insat = Number(Ac_grasos_mono_insat) +((Number(food_selected[i].Ac_grasos_mono_insat)*gr[i])/100)
			Ac_grasos_poli_insat = Number(Ac_grasos_poli_insat) +((Number(food_selected[i].Ac_grasos_poli_insat)*gr[i])/100)
			Ac_grasos_saturados = Number(Ac_grasos_saturados) +((Number(food_selected[i].Ac_grasos_saturados)*gr[i])/100)
			colesterol = Number(colesterol) +((Number(food_selected[i].colesterol)*gr[i])/100)
			potasio = Number(potasio) +((Number(food_selected[i].potasio)*gr[i])/100)
			sodio = Number(sodio) +((Number(food_selected[i].sodio)*gr[i])/100)
			zinc = Number(zinc) +((Number(food_selected[i].zinc)*gr[i])/100)
			magnesio = Number(magnesio) +((Number(food_selected[i].magnesio)*gr[i])/100)
			vitamina_b6 = Number(vitamina_b6) +((Number(food_selected[i].vitamina_b6)*gr[i])/100)
			vitamina_b12 = Number(vitamina_b12) +((Number(food_selected[i].vitamina_b12)*gr[i])/100)
			acido_folico = Number(acido_folico) +((Number(food_selected[i].acido_folico)*gr[i])/100)
			folato_equiv_fd = Number(folato_equiv_fd) +((Number(food_selected[i].folato_equiv_fd)*gr[i])/100)
			fraccion_comestible = Number(fraccion_comestible) +((Number(food_selected[i].fraccion_comestible)*gr[i])/100)
		}
	}
	$('#agua'+id_sh).text('Agua: '+agua.toFixed(3));
	$('#energia'+id_sh).text('Energia: '+energia.toFixed(3));
	$('#proteina'+id_sh).text('Proteina: '+proteina.toFixed(3));
	$('#grasa-total'+id_sh).text('Grasa Total: '+grasa_total.toFixed(3));
	$('#carbohidratos'+id_sh).text('Carbohidratos: '+carbohidratos.toFixed(3));
	$('#fibra-diet'+id_sh).text('Fibra Diet. Total: '+fibra_diet_total.toFixed(3));
	$('#ceniza'+id_sh).text('Ceniza: '+ceniza.toFixed(3));
	$('#calcio'+id_sh).text('Calcio: '+calcio.toFixed(3));
	$('#fosforo'+id_sh).text('Fósforo: '+fosforo.toFixed(3));
	$('#hierro'+id_sh).text('Hierro: '+hierro.toFixed(3));
	$('#tiamina'+id_sh).text('Tiamina: '+tiamina.toFixed(3));
	$('#ruboflavina'+id_sh).text('Ruboflavina: '+ruboflavina.toFixed(3));
	$('#niacina'+id_sh).text('Niacina: '+niacina.toFixed(3));
	$('#vitamina-c'+id_sh).text('Vitamina C: '+vitamina_c.toFixed(3));
	$('#vitamina-a'+id_sh).text('Vit A. equi. Retinol: '+Vit_a_equi_retinol.toFixed(3));
	$('#mono-insat'+id_sh).text('Ac. grasos mono-insat: '+Ac_grasos_mono_insat.toFixed(3));
	$('#poli-insat'+id_sh).text('Ac. grasos poli-insat: '+Ac_grasos_poli_insat.toFixed(3));
	$('#grasos-saturados'+id_sh).text('Ac. grasos saturados: '+Ac_grasos_saturados.toFixed(3));
	$('#colesterol'+id_sh).text('Colesterol: '+colesterol.toFixed(3));
	$('#potasio'+id_sh).text('Potasio: '+potasio.toFixed(3));
	$('#sodio'+id_sh).text('Sodio: '+sodio.toFixed(3));
	$('#zinc'+id_sh).text('Zinc: '+zinc.toFixed(3));
	$('#magnesio'+id_sh).text('Magnesio: '+magnesio.toFixed(3));
	$('#vitamina-b6'+id_sh).text('Vitamina B6: '+vitamina_b6.toFixed(3));
	$('#vitamina-b12'+id_sh).text('Vitamina B12: '+vitamina_b12.toFixed(3));
	$('#acido-folico'+id_sh).text('Ácido Fólico: '+acido_folico.toFixed(3));
	$('#folato'+id_sh).text('Folato Equiv. FD: '+folato_equiv_fd.toFixed(3));
	$('#fr-comestible'+id_sh).text('Fracción Comestible: '+fraccion_comestible.toFixed(3));
	calculos_totales(id_sh)
}

function calculos_totales(id_sh){
	id_sh_x = id_sh.substr(0,2)
 	var agua_total = 0
 	var energia_total = 0
	var proteina_total = 0
	var grasa_total_total = 0
	var carbohidratos_total = 0
	var fibra_diet_total_total = 0
	var ceniza_total = 0
	var calcio_total = 0
	var fosforo_total = 0
	var hierro_total = 0
	var tiamina_total = 0
	var ruboflavina_total = 0
	var niacina_total = 0
	var vitamina_c_total = 0
	var Vit_a_equi_retinol_total = 0
	var Ac_grasos_mono_insat_total = 0
	var Ac_grasos_poli_insat_total = 0
	var Ac_grasos_saturados_total = 0
	var colesterol_total = 0
	var potasio_total = 0
	var sodio_total = 0
	var zinc_total = 0
	var magnesio_total = 0
	var vitamina_b6_total = 0
	var vitamina_b12_total = 0
	var acido_folico_total = 0
	var folato_equiv_fd_total = 0
	var fraccion_comestible_total = 0

	for (var i =1; i<=valor; i++) {
	agua_total = Number(agua_total) + Number($("#agua"+id_sh_x+"-"+i).text().substr(6,16))
	energia_total = Number(energia_total) + Number($("#energia"+id_sh_x+"-"+i).text().substr(9,19))
	proteina_total = Number(proteina_total) + Number($("#proteina"+id_sh_x+"-"+i).text().substr(9,19))
	grasa_total_total = Number(grasa_total_total) + Number($("#grasa-total"+id_sh_x+"-"+i).text().substr(13,23))
	carbohidratos_total = Number(carbohidratos_total) + Number($("#carbohidratos"+id_sh_x+"-"+i).text().substr(15,25))
	fibra_diet_total_total = Number(fibra_diet_total_total) + Number($("#fibra-diet"+id_sh_x+"-"+i).text().substr(19,29))
	ceniza_total = Number(ceniza_total) + Number($("#ceniza"+id_sh_x+"-"+i).text().substr(8,18))
	calcio_total = Number(calcio_total) + Number($("#calcio"+id_sh_x+"-"+i).text().substr(8,18))
	fosforo_total = Number(fosforo_total) + Number($("#fosforo"+id_sh_x+"-"+i).text().substr(9,19))
	hierro_total = Number(hierro_total) + Number($("#hierro"+id_sh_x+"-"+i).text().substr(8,18))
	tiamina_total = Number(tiamina_total) + Number($("#tiamina"+id_sh_x+"-"+i).text().substr(9,19))	
	ruboflavina_total = Number(ruboflavina_total) + Number($("#ruboflavina"+id_sh_x+"-"+i).text().substr(13,23))
	niacina_total = Number(niacina_total) + Number($("#niacina"+id_sh_x+"-"+i).text().substr(9,19))
	vitamina_c_total = Number(vitamina_c_total) + Number($("#vitamina-c"+id_sh_x+"-"+i).text().substr(12,22))
	Vit_a_equi_retinol_total = Number(Vit_a_equi_retinol_total) + Number($("#vitamina-a"+id_sh_x+"-"+i).text().substr(22,32))
	Ac_grasos_mono_insat_total = Number(Ac_grasos_mono_insat_total) + Number($("#mono-insat"+id_sh_x+"-"+i).text().substr(23,33))
	Ac_grasos_poli_insat_total = Number(Ac_grasos_poli_insat_total) + Number($("#poli-insat"+id_sh_x+"-"+i).text().substr(23,33))
	Ac_grasos_saturados_total = Number(Ac_grasos_saturados_total) + Number($("#grasos-saturados"+id_sh_x+"-"+i).text().substr(22,32))
	colesterol_total = Number(colesterol_total) + Number($("#colesterol"+id_sh_x+"-"+i).text().substr(12,22))
	potasio_total = Number(potasio_total) + Number($("#potasio"+id_sh_x+"-"+i).text().substr(9,19))
	sodio_total = Number(sodio_total) + Number($("#sodio"+id_sh_x+"-"+i).text().substr(7,17))
	zinc_total = Number(zinc_total) + Number($("#zinc"+id_sh_x+"-"+i).text().substr(6,16))
	magnesio_total = Number(magnesio_total) + Number($("#magnesio"+id_sh_x+"-"+i).text().substr(10,20))
	vitamina_b6_total = Number(vitamina_b6_total) + Number($("#vitamina-b6"+id_sh_x+"-"+i).text().substr(13,23))
	vitamina_b12_total = Number(vitamina_b12_total) + Number($("#vitamina-b12"+id_sh_x+"-"+i).text().substr(14,24))
	acido_folico_total = Number(acido_folico_total) + Number($("#acido-folico"+id_sh_x+"-"+i).text().substr(14,24))
	folato_equiv_fd_total = Number(folato_equiv_fd_total) + Number($("#folato"+id_sh_x+"-"+i).text().substr(18,28))
	fraccion_comestible_total = Number(fraccion_comestible_total) + Number($("#fr-comestible"+id_sh_x+"-"+i).text().substr(21,31))
	}
	$('#agua-total'+id_sh_x).text('Agua: '+agua_total.toFixed(3))
	$('#energia-total'+id_sh_x).text('Energia: '+energia_total.toFixed(3))
	$('#proteina-total'+id_sh_x).text('Proteina: '+proteina_total.toFixed(3))
	$('#grasa-total'+id_sh_x).text('Grasa Total: '+grasa_total_total.toFixed(3))
	$('#carbohidratos-total'+id_sh_x).text('Carbohidratos: '+carbohidratos_total.toFixed(3))
	$('#fibra-diet-total'+id_sh_x).text('Fibra Diet. Total: '+fibra_diet_total_total.toFixed(3))
	$('#ceniza-total'+id_sh_x).text('Ceniza: '+ceniza_total.toFixed(3))
	$('#calcio-total'+id_sh_x).text('Calcio: '+calcio_total.toFixed(3))
	$('#fosforo-total'+id_sh_x).text('Fósforo: '+fosforo_total.toFixed(3))
	$('#hierro-total'+id_sh_x).text('Hierro: '+hierro_total.toFixed(3))
	$('#tiamina-total'+id_sh_x).text('Tiamina: '+tiamina_total.toFixed(3))
	$('#ruboflavina-total'+id_sh_x).text('Ruboflavina: '+ruboflavina_total.toFixed(3))
	$('#niacina-total'+id_sh_x).text('Niacina: '+niacina_total.toFixed(3))
	$('#vitamina-c-total'+id_sh_x).text('Vitamina C: '+vitamina_c_total.toFixed(3))
	$('#vitamina-a-total'+id_sh_x).text('Vit A. equi. Retinol: '+Vit_a_equi_retinol_total.toFixed(3))
	$('#mono-insat-total'+id_sh_x).text('Ac. grasos mono-insat: '+Ac_grasos_mono_insat_total.toFixed(3))
	$('#poli-insat-total'+id_sh_x).text('Ac. grasos poli-insat: '+Ac_grasos_poli_insat_total.toFixed(3))
	$('#grasos-saturados-total'+id_sh_x).text('Ac. grasos saturados: '+Ac_grasos_saturados_total.toFixed(3))
	$('#colesterol-total'+id_sh_x).text('Colesterol: '+colesterol_total.toFixed(3))
	$('#potasio-total'+id_sh_x).text('Potasio: '+potasio_total.toFixed(3))
	$('#sodio-total'+id_sh_x).text('Sodio: '+sodio_total.toFixed(3))
	$('#zinc-total'+id_sh_x).text('Zinc: '+zinc_total.toFixed(3))
	$('#magnesio-total'+id_sh_x).text('Magnesio: '+magnesio_total.toFixed(3))
	$('#vitamina-b6-total'+id_sh_x).text('Vitamina B6: '+vitamina_b6_total.toFixed(3))
	$('#vitamina-b12-total'+id_sh_x).text('Vitamina B12: '+vitamina_b12_total.toFixed(3))
	$('#acido-folico-total'+id_sh_x).text('Ácido Fólico: '+acido_folico_total.toFixed(3))
	$('#folato-total'+id_sh_x).text('Folato Equiv. FD: '+folato_equiv_fd_total.toFixed(3))
	$('#fr-comestible-total'+id_sh_x).text('Fracción Comestible: '+fraccion_comestible_total.toFixed(3))

	//Validacion energia
	if(energia_total.toFixed(3) > Number($('#tot-kcal').text())){
		$('#energia-total'+id_sh_x).removeClass('on-limit').addClass('overflow');
	}
	else{
		$('#energia-total'+id_sh_x).removeClass('overflow').addClass('on-limit');	
	}
	//validacion proteina
	if(proteina_total.toFixed(3) > Number($('#tot-pro').text())){
		$('#proteina-total'+id_sh_x).removeClass('on-limit').addClass('overflow');
	}
	else{
		$('#proteina-total'+id_sh_x).removeClass('overflow').addClass('on-limit');	
	}
	//Validacion carbohidratos
	if(carbohidratos_total.toFixed(3) > Number($('#tot-cho').text())){
		$('#carbohidratos-total'+id_sh_x).removeClass('on-limit').addClass('overflow');
	}
	else{
		$('#carbohidratos-total'+id_sh_x).removeClass('overflow').addClass('on-limit');	
	}
	//validacion grasa
	if(grasa_total_total.toFixed(3) > Number($('#tot-lip').text())){
		$('#grasa-total'+id_sh_x).removeClass('on-limit').addClass('overflow');
	}
	else{
		$('#grasa-total'+id_sh_x).removeClass('overflow').addClass('on-limit');	
	}

}