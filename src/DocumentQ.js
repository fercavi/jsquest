var _Documentq;
var JSONData;
var ArrayItemClasses = [];
var URLEscape;
var missatgeErrorObligatories;
var __Respostes = [];
var Respostes;
var responseText;
var contenedorResposta;
var cancelarText;
var seguentText;
var anteriorText;
var acabarText;
var idPreguntaDragAndDrop;
var PreguntaDragAndDrop;

function Resposta(nom, valor) {
  this.nom = nom;
  this.valor = valor;
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
  var trobat = -1;
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

DocumentQ.prototype.GuardarRespostesicomprovarObligatoria = function() {
  //navegar per tot el contenedor buscant els <p> que tinguen obligatoria
  //Aquesta funció també guardarà les preguntes
  var totescontestades = true;  
  var preguntes ="";
  var tipus;
  pare = this;
  $("li.preguntaItem").each(function(index){    
    tipus =parseInt($(this).attr("tipus"));
    P_id = $(this).attr("id");
    obligatoria = $(this).attr("obligatoria")==="true";
     //Simulador de polimorfisme entre obtenidors i comprovadors de si
    //la resposta està suficientment contestada
    
    var obtenidor = ObtindreObtenidor(tipus);    
    var comprovarBuida = ObtindreBuida(tipus);
    var __resposta;
    var respostaContestada;  
    respostaContestada = obtenidor(P_id);    
    if (!comprovarBuida(respostaContestada)) {
      __resposta = new Resposta("pregunta" + P_id, respostaContestada);      
      pare.inserixResposta(__resposta);
      } else {
        if (obligatoria == true) {
          totescontestades = false;
        }
      }
    
    });
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
  this.html +='<ul class="pager">';
  if (this.questionari.potAnarEnrere()) {
    this.html +='<li class="previous"><a href="javascript: _Documentq.anterior();">'+anteriorText+'</a></li>'; 
  }

  if (this.questionari.potAnarAvant()) {
    this.html += '<li class="next"><a href="javascript: _Documentq.seguent();">'+seguentText+'</a></li>';
  }
  else{
    this.html += '<li class="next"><a href="javascript: _Documentq.acabar();">'+acabarText+'</a></li>'; 
  }
  this.html +='</ul>';
  this.html += "<div align='center'><input type='button' name='cancelar' value='"+cancelarText+"' onClick='_Documentq.cancelar()' /></div>"
  this.contenedor.innerHTML = this.html;
  $(".draggable").draggable({
    cursor: 'move',          // sets the cursor apperance
    revert: 'invalid',   
    stack: 'draggable',
    zIndex:100000,
    start:function(event,ui){
      idPreguntaDragAndDrop=$(this).attr("pregunta");
      PreguntaDragAndDrop = this;
    },
  });
  $(".droppable").droppable({
    //accept:".draggable",   
    drop: function(event,ui) {
        var idPreg=$(this).attr("pregunta");
        if (idPreg==idPreguntaDragAndDrop){
          //alert('ok');
          $(this).append($(PreguntaDragAndDrop).html());
        }
        else{
         return false;
        }
    },
  });

  this.carregarRespostes(); //carrega les respostes guardades
}
