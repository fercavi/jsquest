var _Documentq;
var JSONData;
var ArrayItemClasses = [];

function IniDocument(idDivOnEscriure, dataarray) {

  //Anem a carregar les dependències:
  JSONData = dataarray;
  dependencies = ["src/Item.js", "src/Questionari.js", "src/Estimul.js"];
  for (i = 0; i < dependencies.length; i++) {
    loadScript(dependencies[i], postLoadDependencies);
  }

}

function enviarRespostes(url) {
  //TODO: enviarà les respostes en format JSON
}

function postLoadDependencies() {
  //Açò només és temporal per veure resultats

  ArrayItemClasses.push(Item); //0
  ArrayItemClasses.push(ItemRespostaLlarga); //1
  ArrayItemClasses.push(ItemComboBox); //2
  ArrayItemClasses.push(ItemRadioButton); //3
  ArrayItemClasses.push(ItemMultipleChoice); //4


  data = JSON.parse(JSONData);
  _document = data.Document;
  _questionari = _document.Questionari;

  Q = new Questionari(_questionari.Titol, _questionari.Instruccions, _questionari.TitolInstruccions);
  for (i = 0; i < _questionari.Estimuls.length; i++) {
    _estimul = _questionari.Estimuls[i];
    E = new Estimul(_estimul.Enunciat);
    for (j = 0; j < _estimul.Preguntes.length; j++) {
      Pregunta = _estimul.Preguntes[j];
      ItemClass = ArrayItemClasses[Pregunta.tipus];
      Respostes = Pregunta.Respostes;
      //TODO: veure com fer-ho elegant, no he trobat cap manera de passar "false" al boolean false
      obligatoria = true;
      if (Pregunta.Obligatoria == "false") {
        obligatoria = false;
      }

      if (Respostes) {
        _item = new ItemClass(Pregunta.Enunciat, Respostes, Pregunta.Id, obligatoria);
      } else {
        _item = new ItemClass(Pregunta.Enunciat, Pregunta.Id, obligatoria);
      }
      _item.generarPregunta();
      E.Add(_item);
    }
    E.generarEstimul();
    Q.Add(E);
  }

  Q.generarHTML();
  _Documentq = new DocumentQ(Q, "document");
  _Documentq.generarHTML();
}

function loadScript(url, callback) {
  // Adding the script tag to the head as suggested before
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;
  // Fire the loading
  head.appendChild(script);
}

function DocumentQ(Questionari, idDivOnEscriure) {
  this.questionari = Questionari;
  this.html = "";
  this.contenedor = document.getElementById(idDivOnEscriure);
}

DocumentQ.prototype.seguent = function() {
  this.questionari.seguent();
  this.generarHTML();
  //TODO: guardar resultats
}
DocumentQ.prototype.anterior = function() {
  this.questionari.anterior();
  this.generarHTML();
  //TODO: guardar resultats
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
  }
  this.html += "</div></td></tr></table>";

  this.contenedor.innerHTML = this.html;
}
