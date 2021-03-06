//Funcions buida
function RespostaBuidaNormal(resposta) {
  var resultat;
  resultat = !resposta;  
  return resultat;
}
function RespostaArrayBuit(respostes) {
  arrayRespostes = respostes.split("|");
  var EstaBuida = true;
  for (var i = 0; i < arrayRespostes.length && EstaBuida; i++) {
    if (arrayRespostes[i] != "") {
      EstaBuida = false;
    }
  }
  return EstaBuida;
}
function RespostaFaltenRespostes(respostes){
  arrayRespostes = respostes.split("|");
  var FaltenRespostes = false;
  for (var i = 0; (i < arrayRespostes.length) && (!FaltenRespostes); i++) {
    if (arrayRespostes[i] == "") {
      FaltenRespostes = true;
    }
  }
  return FaltenRespostes;
}
function ObtindreBuida(tipus) {
  var funcioBuida = RespostaBuidaNormal;
  if (tipus == DefItemDragAndDrop || tipus == DefItemMultiShortAnswer) {
    funcioBuida = RespostaFaltenRespostes;
  }
  if(tipus == DefItemMultipleChoice){
    funcioBuida = RespostaArrayBuit;
  }
  return funcioBuida;
}

//Obtenidors

function ObtindreObtenidor(tipus) {
  var obtenidor = ObtenidorBuit;  
  switch (tipus) {
    case DefItem:
      break;
    case DefItemRespostaLlarga:
      obtenidor = ObtindreRespostaNormal;
      break;
    case DefItemComboBox:
      obtenidor = ObtindreRespostaNormal;
      break;
    case DefItemRadioButton:
      obtenidor = ObtindreValorMultiple;      
      break;
    case DefItemMultipleChoice:
      obtenidor = ObtindreValorMultiple;
      break;
    case DefItemDragAndDrop:
      obtenidor = ObtindreRespostaDragAndDrop;
      break;
    case DefItemRadioButtonVertical:
      obtenidor = ObtindreValorMultiple;
      break;
    case DefItemMultiShortAnswer:
      obtenidor = ObtindreRespostaMultiShort;
      break;
    case DefItemFillGaps:
      obtenidor = ObtindreRespostaMultiShort;
      break;
    case DefItemVF:
      obtenidor = ObtindreRespostaGrill;      
      break;
    case DefItemGrill:
      obtenidor = ObtindreRespostaGrill;
      break;
    case DefItemSort:
      obtenidor = ObtindreRespostaSort;
  }
  return obtenidor;
}

function ObtenidorBuit() {

}

function ObtindreRespostaDragAndDrop(pregunta) {
  var respostaContestada = "";
  var respostaActual = "";
  $('#pregunta_'+pregunta+ ' div').each(
      function(index){
         respostaActual += $(this).html();
         respostaActual = respostaActual.replace("&nbsp;","");
         respostaActual+="|";
     }
    );
  respostaActual = respostaActual.substring(0, respostaActual.length-1);  
  return respostaActual;
}

function ObtindreRespostaNormal(pregunta) {  
  return $("#pregunta_"+pregunta).val();
}
function ObtindreValorMultiple(pregunta) {
  var resultat = "";
  var linies = $('.pregunta_'+pregunta );  
  linies.each(
    function(index){
      var linia = $('.pregunta_'+pregunta+':eq('+index+')');      
      if ($(linia).prop('checked')) {                
        resultat += $(linia).val() + ",";
      }
    }
    );
  resultat = resultat.substring(0, resultat.length - 1);
  return resultat;  
}
function ObtindreRespostaGrill(pregunta){
  var resultatAcumulat = "";
  var resultat="";
  var linies = $("#taula_"+pregunta + " tr");
  var nrespostes = linies.length-1;
  for(var i=0;i<nrespostes;i++){
    resultat = $("input:radio[name=pregunta_"+pregunta+"_"+i+"]:checked").val();
    if (!resultat)
      resultat="";
    resultatAcumulat +=resultat + ",";    
  }
  resultatAcumulat = resultatAcumulat.substring(0, resultatAcumulat.length-1);
  return resultatAcumulat;
}

function ObtindreRespostaMultiShort(pregunta) {
  var respostes = "";  
  files= $("#taula_"+pregunta + " tr ");  
  files.each(
    function(index){
      var respostaActual = "";
      $(this).find("input").each(
         function(index){
            respostaActual+=$(this).val() + ","; 
         }         
        );
      respostaActual = respostaActual.substring(0, respostaActual.length-1);
      respostes += respostaActual + "|";
    }
    );
  respostes = respostes.substring(0, respostes.length-1);
  return respostes;
}
function ObtindreRespostaSort(pregunta){
  var respostes = "";
  files = $("#pregunta_"+pregunta + " li");
  for(var i=0;i<files.length;i++){
    respostaActual = $(files[i]).attr("valor");
    respostes += respostaActual + ",";
  }
  respostes = respostes.substring(0, respostes.length-1);
  return respostes;
}
