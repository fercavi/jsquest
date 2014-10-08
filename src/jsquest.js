var DivOnEscriure = "";
var DivResultat = "";
function noferRes() {

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

function IniDocument(idDivOnEscriure, dataarray,idDivResultat) {

  //Include('src/Item.js')... seria més comprensible però js és així
  //quan carreguem la última és quan fem tot l'altre procés de càrrega
  JSONData = dataarray;
  DivOnEscriure = idDivOnEscriure;
  DivResultat = idDivResultat;
  dependencies = ["src/Item.js", "src/Questionari.js", "src/Estimul.js", "src/DocumentQ.js"];
  for (i = 0; i < dependencies.length; i++) {
    if (i == dependencies.length - 1) {
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


  data = JSON.parse(JSONData);
  _document = data.Document;
  _questionari = _document.Questionari;
  URLEscape = data.urlEscape;
  missatgeErrorObligatories = data.MissategErrorObligatories;
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
  _Documentq = new DocumentQ(Q, DivOnEscriure,DivResultat);
  _Documentq.generarHTML();
}
