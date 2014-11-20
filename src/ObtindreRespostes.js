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
  }
  return obtenidor;
}

function ObtenidorBuit() {

}

function ObtindreRespostaDragAndDrop(pregunta) {

  var taules = pregunta.getElementsByClassName('desti'); //taula
  var taula = taules[0];
  var files = taula.rows;
  var respostaContestada = "";
  var respostaActual = "";
  for (var j = 0; j < files.length; j++) {
    fila = files[j].cells;
    respostaActual = "";
    if (fila[1].childNodes[0]) {
      respostaActual = fila[1].childNodes[0].innerHTML;
    }
    if (j != (files.length - 1)) {
      respostaActual += "|";
    }
    respostaContestada += respostaActual;
  }
  return respostaContestada;
}

function ObtindreRespostaNormal(pregunta) {
  var id = pregunta.getAttribute('id');
  var formulari = document.forms['f' + id];
  var pregunta = formulari.elements[0];
  return pregunta.value;
}

function ObtindreValorMultiple(pregunta) {
  var resultat = "";
  var id = pregunta.getAttribute('id');
  var formulari = document.forms['f' + id];
  var valor;
  for (var i = 0; i < formulari.elements.length; i++) {
    if (formulari.elements[i].checked) {
      if (formulari.elements[i].value = 'on')
        valor = i;
      else
        valor = formulari.elements[i].value;
      resultat += valor + "|";
    }
  }
  //llevem l'últim separador
  resultat = resultat.substring(0, resultat.length - 1);
  return resultat;
}

function ObtindreRespostaMultiShort(pregunta) {
  var inputs = pregunta.getElementsByTagName("input");
  var result = "";
  for (var i = 0; i < inputs.length; i++) {
    result += inputs[i].value;
    if (i != inputs.length - 1)
      result += "|";
  }
  return result;
}
