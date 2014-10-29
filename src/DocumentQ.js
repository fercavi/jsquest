var _Documentq;
var JSONData;
var ArrayItemClasses = [];
var URLEscape;
var missatgeErrorObligatories;
var __Respostes = [];
var Respostes;
var responseText;
var contenedorResposta;


function Resposta(nom, valor) {
  this.nom = nom;
  this.valor = valor;
}

function ObtindreRespostaDragAndDrop(P_pregunta) {

  var taules = P_pregunta.getElementsByClassName('desti'); //taula
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

function ObtindreRespostaNormal(nom) {
  return nom.value;
}

function ObtindreValorMultiple(NomComponent) {
  resultat = "";
  var valor;
  for (var i = 0; i < NomComponent.length; i++) {
    if (NomComponent[i].checked) {
      if (NomComponent[i].value = 'on')
        valor = i;
      else
        valor = NomComponent[i].value;
      resultat += valor + "|";
    }
  }
  //llevem l'últim separador
  resultat = resultat.substring(0, resultat.length - 1);
  return resultat;
}

function ObtindreRespostaMultiShort(P_pregunta) {
  var inputs = P_pregunta.getElementsByTagName("input");
  var result = "";
  for (var i = 0; i < inputs.length; i++) {
    result += inputs[i].value;    
    if (i != inputs.length - 1)
      result += "|";
  }
  return result;
}

function DocumentQ(Questionari, idDivOnEscriure, OnTornarValor) {
  this.questionari = Questionari;
  this.html = "";
  this.contenedor = document.getElementById(idDivOnEscriure);

  if (OnEscriure) {
    if (Object.prototype.toString.call(OnTornarValor) == '[object Function]') {
      this.contenedorResposta = OnTornarValor;
    } else {
      this.contenedorResposta = document.getElementById(OnTornarValor);
    }
  }

}
DocumentQ.prototype.enviarRespostes = function() {
  //passem de preguntaid1, preguntaid2...  a id1,id2...
  Respostes = [];
  var valor;
  var nom;
  for (var i = 0; i < __Respostes.length; i++) {
    nom = __Respostes[i].nom;
    valor = __Respostes[i].valor;
    nom = nom.substr(8);
    r = new Resposta(nom, valor);
    Respostes.push(r);
  }
  responseText = JSON.stringify(Respostes);
  if (this.contenedorResposta) {
    if (Object.prototype.toString.call(this.contenedorResposta) == '[object Function]') {
      this.contenedorResposta(responseText);
    } else {
      this.contenedorResposta.value = responseText;
    }
  }
}
DocumentQ.prototype.inserixResposta = function(__resposta) {
  trobat = -1;
  for (var i = 0; i < __Respostes.length; i++) {
    if (__Respostes[i].nom == __resposta.nom) {
      trobat = i;
    }
  }
  if (trobat != -1) {
    __Respostes.splice(trobat, 1);
  }
  __Respostes.push(__resposta);
}
DocumentQ.prototype.RespostaArrayBuit = function(respostes) {
  var EstaBuida = true;
  for (var i = 0; i < respostes.length && EstaBuida; i++) {
    if (respostes[i] != "") {
      EstaBuida = false;
    }
  }
  return EstaBuida;
}
DocumentQ.prototype.GuardarRespostesicomprovarObligatoria = function() {
  //navegar per tot el contenedor buscant els <p> que tinguen obligatoria
  //Aquesta funció també guardarà les preguntes
  var totescontestades = true;

  var preguntes = this.contenedor.getElementsByTagName("p");
  var formulari;
  var __resposta;
  var tipus;
  var respostaContestada;
  for (var i = 0; i < preguntes.length; i++) {
    var P_pregunta = preguntes[i];
    var obligatoria = (P_pregunta.getAttribute("obligatoria") === "true");
    P_id = P_pregunta.getAttribute("id");
    //Cada pregunta és un formulari amb el nom: fidpregunta
    //i tindrà un valor de pregunta+idpregunta. Eixa serà la resposta.
    formulari = document.forms['f' + P_id];
    tipus = parseInt(formulari.getAttribute("tipus"));
    if (formulari) {
      switch (tipus) {
        case DefItem: //Els items normals no deueun de tindre resposta
          break;
        case DefItemRespostaLlarga:
        case DefItemComboBox:
          respostaContestada = ObtindreRespostaNormal(formulari["pregunta" + P_id]);
          break;
        case DefItemRadioButtonVertical:
        case DefItemRadioButton:
        case DefItemMultipleChoice:
          respostaContestada = ObtindreValorMultiple(formulari["pregunta" + P_id]);
          break;
        case DefItemDragAndDrop:
        case DefItemMultiShortAnswer:

          if (tipus == DefItemDragAndDrop) {
            respostaContestada = ObtindreRespostaDragAndDrop(P_pregunta);
          } else
            respostaContestada = ObtindreRespostaMultiShort(P_pregunta);
          arrayRespostes = respostaContestada.split("|");
          if (this.RespostaArrayBuit(arrayRespostes)) {
            respostaContestada = undefined;
          }
          if ((arrayRespostes.indexOf("") != -1) && (obligatoria === true)) {
            totescontestades = false;
          }
          break;

        default:
          break;
      }
      if (respostaContestada) {
        __resposta = new Resposta("pregunta" + P_id, respostaContestada);
        this.inserixResposta(__resposta);
      } else {
        if (obligatoria === true) {
          totescontestades = false;
        }
      }
    }
  }
  return totescontestades;
}
DocumentQ.prototype.seguent = function() {
  if (this.GuardarRespostesicomprovarObligatoria()) {
    this.questionari.seguent();
    this.generarHTML();
  } else {
    alert(missatgeErrorObligatories);
  }
}
DocumentQ.prototype.anterior = function() {
  if (this.GuardarRespostesicomprovarObligatoria()) {
    this.questionari.anterior();
    this.generarHTML();
  } else {
    alert(missatgeErrorObligatories);
  }
}
DocumentQ.prototype.acabar = function() {
  if (this.GuardarRespostesicomprovarObligatoria()) {
    this.enviarRespostes();
  } else {
    alert(missatgeErrorObligatories);
  }
}
DocumentQ.prototype.cancelar = function() {
  //TODO: cancel·lar
  window.location = URLEscape;
}
DocumentQ.prototype.esRadioButton = function(pregunta) {
  var res, index;
  res = false;
  index = pregunta.innerHTML.indexOf('type=\"radio\"');
  if (index != -1)
    res = true;
  return res;
}
DocumentQ.prototype.getValorResposta = function(pregunta) {
  var resposta = undefined;
  for (var i = 0; i < __Respostes.length; i++) {
    if (__Respostes[i].nom == pregunta) {
      resposta = __Respostes[i].valor;
    }
  }
  return resposta;
}
DocumentQ.prototype.carregarRespostes = function() {
  var preguntes;
  var P_pregunta;
  preguntes = this.contenedor.getElementsByTagName("p");
  var formulari;
  for (var i = 0; i < preguntes.length; i++) {
    P_pregunta = preguntes[i];
    P_id = P_pregunta.getAttribute("id");
    formulari = document.forms['f' + P_id];
    if (formulari) {
      if (formulari["pregunta" + P_id]) {
        var valor;
        valor = this.getValorResposta("pregunta" + P_id);
        if (valor) {
          if (this.esRadioButton(formulari)) {
            formulari["pregunta" + P_id][valor].checked = true;
          } else {
            formulari["pregunta" + P_id].value = valor;
          }
        }
      }
    }
  }
}
DocumentQ.prototype.generarHTML = function() {
  this.questionari.generarHTML();
  this.html = this.questionari.html;
  this.html += "<table width=100%><tr><td><div align='left'>";
  if (this.questionari.potAnarEnrere()) {
    this.html += "<img name='esquerra' src='img/fletxaes.gif' id='imatgeesquerra' onClick='_Documentq.anterior()' />";
  }
  this.html += "</div></td><td><div align='right'>";
  if (this.questionari.potAnarAvant()) {
    this.html += "<img  name='dreta' src='img/fletxadre.gif' id='imatgedreta' onClick='_Documentq.seguent()' />";
  } else { //si no pot anar avant és per que no ha acabat
    this.html += "<input type='button' name='submit' value='acabar' onClick='_Documentq.acabar()' />";
  }
  this.html += "</div></td></tr></table>";
  this.html += "<div align='center'><input type='button' name='cancelar' value='cancelar' onClick='_Documentq.cancelar()' /></div>"
  this.contenedor.innerHTML = this.html;
  this.carregarRespostes(); //carrega les respostes guardades
}
