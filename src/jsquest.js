var OnEscriure = "";
var DivResultat = "";
function noferRes() {

}
function  tipusTeRespostes(tipus){
  var resultat = true;
  if (tipus ==DefItem || tipus == DefItemRespostaLlarga)
    resultat = false;
  return  resultat;
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

function IniDocument(idDivOnEscriure, dataarray,OnTorneLesDades, rutaJS) {

  //Include('src/Item.js')... seria més comprensible però js és així
  //quan carreguem la última és quan fem tot l'altre procés de càrrega

  JSONData = dataarray.replace(/&quot;/g,'"');
  JSONData = JSONData.replace(/&amp;/g,'&');
  JSONData = JSONData.replace(/&gt;/g,'>');
  JSONData = JSONData.replace(/&lt;/g,'<');
  OnEscriure = idDivOnEscriure;
  DivResultat = OnTorneLesDades;
  dependencies = [rutaJS+"/src/Item.js", rutaJS +"/src/Questionari.js", rutaJS+"/src/Estimul.js", rutaJS + "/src/DocumentQ.js",rutaJS+"/src/draganddrop.js",rutaJS+"/src/ObtindreRespostes.js",rutaJS+"src/VisorEstimul.js"];

  for (var i = 0; i < dependencies.length; i++) {
    if (i == 3) {
      loadScript(dependencies[i], postLoadDependencies);
    } else {
      loadScript(dependencies[i], noferRes);
    }
  }
}

function postLoadDependencies() {

  ArrayItemClasses.push(Item); //0
  ArrayItemClasses.push(ItemRespostaLlarga); //1
  ArrayItemClasses.push(ItemComboBox); //2
  ArrayItemClasses.push(ItemRadioButton); //3
  ArrayItemClasses.push(ItemMultipleChoice); //4
  ArrayItemClasses.push(ItemDragAndDrop); //5
  ArrayItemClasses.push(ItemRadioButtonVertical); //6
  ArrayItemClasses.push(ItemMultiShortAnswer); //7  
   data = JSON.parse(JSONData);
  _document = data.Document;
  _questionari = _document.Questionari;
  cancelarText=data.Textos.textCancelar;
  seguentText = data.Textos.textSeguent;
  anteriorText = data.Textos.textAnterior;
  acabarText = data.Textos.textAcabar;
  URLEscape = data.urlEscape;
  missatgeErrorObligatories = data.MissategErrorObligatories;
  Q = new Questionari(_questionari.Titol, _questionari.Instruccions, _questionari.TitolInstruccions);
  for (var i = 0; i < _questionari.Estimuls.length; i++) {
    _estimul = _questionari.Estimuls[i];
    E = new Estimul(_estimul.Enunciat,_estimul.Contingut);
    for (var j = 0; j < _estimul.Preguntes.length; j++) {
      Pregunta = _estimul.Preguntes[j];
      ItemClass = ArrayItemClasses[Pregunta.tipus];
      Respostes = Pregunta.Respostes;
      //TODO: veure com fer-ho elegant, no he trobat cap manera de passar "false" al boolean false
      obligatoria = true;
      if (Pregunta.Obligatoria == "false") {
        obligatoria = false;
      }
      if (tipusTeRespostes(Pregunta.tipus)) {
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
  _Documentq = new DocumentQ(Q, OnEscriure,DivResultat);
  _Documentq.generarHTML();
}
