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

function DocumentQ(Questionari, idDivOnEscriure, idDivResultat) {
  this.questionari = Questionari;
  this.html = "";
  this.contenedor = document.getElementById(idDivOnEscriure);
  this.contenedorResposta = document.getElementById(idDivResultat);
}
DocumentQ.prototype.enviarRespostes = function() {
  //passem de preguntaid1, preguntaid2...  a id1,id2...
  Respostes = [];
  var valor;
  var nom;
  for(var i=0;i<__Respostes.length;i++){
    nom = __Respostes[i].nom;
    valor = __Respostes[i].valor;
    nom = nom.substr(8);
    r = new Resposta(nom,valor);
    Respostes.push(r);
  }
  responseText = JSON.stringify(Respostes);
  if (this.contenedorResposta) {
    this.contenedorResposta.value = responseText;
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
DocumentQ.prototype.ObtindreValorRadioButton = function(NomComponent) {
  resultat = undefined;
  for (var i = 0; i < NomComponent.length; i++) {
    if (NomComponent[i].checked) {
      resultat = NomComponent[i].value;
    }
  }
  return resultat;
}
DocumentQ.prototype.GuardarRespostesicomprovarObligatoria = function() {
  //navegar per tot el contenedor buscant els <p> que tinguen obligatoria
  //Aquesta funció també guardarà les preguntes
  totescontestades = true;

  preguntes = this.contenedor.getElementsByTagName("p");
  var formulari;
  for (var i = 0; i < preguntes.length; i++) {
    P_pregunta = preguntes[i];
    obligatoria = (P_pregunta.getAttribute("obligatoria") === "true");
    P_id = P_pregunta.getAttribute("id");
    //Cada pregunta és un formulari amb el nom: fidpregunta
    //i tindrà un valor de pregunta+idpregunta. Eixa serà la resposta.
    formulari = document.forms['f' + P_id];
    if (formulari) {
      if (formulari["pregunta" + P_id]) {
        respostaContestada = formulari["pregunta" + P_id].value;
        if (!respostaContestada) { //deu ser un radiobutton
          respostaContestada = this.ObtindreValorRadioButton(formulari["pregunta" + P_id]);
        }
        if (respostaContestada) {
          __resposta = new Resposta("pregunta" + P_id, respostaContestada);
          this.inserixResposta(__resposta);
        }
        if (!respostaContestada)
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
