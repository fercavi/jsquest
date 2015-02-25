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
      obtenidor = ObtindreValorMultiple;      
      break;
    case DefItemGrill:
      obtenidor = ObtindreValorMultiple;
      break;
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
  var linies = $('.pregunta_'+pregunta);
  
  linies.each(
    function(index){
      var linia = $('.pregunta_'+pregunta+':eq('+index+')');
      if ($(linia).prop('checked')) {        
        resultat += $(linia).val() + ",";
      }
      else{
        resultat += ","; 
      }
    }
    );  
  //resultat = resultat.substring(0, resultat.length - 1);
  return resultat;  
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
