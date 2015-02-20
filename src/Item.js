var DefItem = 0;
var DefItemRespostaLlarga = 1;
var DefItemComboBox = 2;
var DefItemRadioButton = 3;
var DefItemMultipleChoice = 4;
var DefItemDragAndDrop = 5;
var DefItemRadioButtonVertical = 6;
var DefItemMultiShortAnswer = 7;

function Item(Enunciat, Id, Obligatoria) {
  this.enunciat = Enunciat;
  this.Id = Id;
  this.obligatoria = Obligatoria;
  this.tipus = DefItem;
  this.Visor = undefined;  
}
Item.prototype.setVisor = function(){
  this.Visor=true;
}
Item.prototype.generarPregunta = function() {
  this.iniciPreguntaGenerica();
  this.processarPregunta();
  this.fiPreguntaGenerica();
}
Item.prototype.iniciPreguntaGenerica = function() {
  this.html = "<li class='list-group-item preguntaItem' tipus="+this.tipus+"  id=" + this.Id + " obligatoria='" + this.obligatoria + "' >";    
  if  (this.Visor){
    this.html+= "<div align='right'><img src='img/green_flag.png' width=16>&nbsp;<img style='cursor:pointer' src='img/enviar.png' onClick='enviar("+this.Id+")'>&nbsp;<img style='cursor:pointer' src='img/edit.png' onClick='editarEstimulEnQuestionari("+this.Id+")' width=16><img style='cursor:pointer' src='img/baja.png' onClick='baixar("+this.Id+")' width=16>&nbsp;<img style='cursor:pointer' src='img/sube.png' onClick='pujar("+this.Id+")' width=16>&nbsp;<img style='cursor:pointer' src='img/delete.png' onClick='esborrarItem("+this.Id+")' width=16></div>" ;
  }
  if (this.obligatoria) {
    this.html += ' <div class="alert alert-danger"><span class="glyphicon glyphicon-star " aria-hidden="true"></span> Obligatoria</div>';
  }  
  this.html = this.html + this.enunciat;
  this.html +="<br/>";
   
};
Item.prototype.fiPreguntaGenerica = function() {
  this.html += "</li>";
};
Item.prototype.processarPregunta = function() {

}

function ItemRespostaLlarga(Enunciat, Id, Obligatoria) {
  Item.call(this, Enunciat, Id, Obligatoria)
  this.tipus = DefItemRespostaLlarga;
}

ItemRespostaLlarga.prototype = new Item;
ItemRespostaLlarga.prototype.processarPregunta = function() {
  this.html = this.html + "<textarea class='form-control' rows=6 id=pregunta_" + this.Id + "></textarea>";
}

function ItemComboBox(Enunciat, Respostes, Id, Obligatoria) {
  Item.call(this, Enunciat, Id, Obligatoria);
  this.respostes = Respostes;
  this.tipus = DefItemComboBox;
}
ItemComboBox.prototype = new Item;
ItemComboBox.prototype.processarPregunta = function() {
  this.html += "<div clas='form-group'><label for='pregunta"+this.Id+"'></label><select class='form-control' id=pregunta_" + this.Id + ">";
  for (var i = 0; i < this.respostes.length; i++) {
    this.html += "<option value=" + i + ">" + this.respostes[i] + "</option>";
  }
  this.html += "</select>";
}

function ItemRadioButton(Enunciat, Respostes, Id, Obligatoria) {
  Item.call(this, Enunciat, Id, Obligatoria);
  this.respostes = Respostes;
  this.tipus = DefItemRadioButton;
}
ItemRadioButton.prototype = new Item;
ItemRadioButton.prototype.processarPregunta = function() {
  for (var i = 0; i < this.respostes.length; i++) {
    this.html += "<label class='radio-inline'><input type='radio' id='pregunta_"+this.Id+"' name='pregunta_" + this.Id + "' value=" + i + ">" + this.respostes[i] + "</input></label>";
  }
}

function ItemRadioButtonVertical(Enunciat, Respostes, Id, Obligatoria, Tipus) {
  ItemRadioButton.call(this, Enunciat, Respostes, Id, Obligatoria, Tipus);
  this.tipus = DefItemRadioButtonVertical;
}
ItemRadioButtonVertical.prototype = new ItemRadioButton;
ItemRadioButtonVertical.prototype.processarPregunta = function() {
  for (var i = 0; i < this.respostes.length; i++) {
    this.html += "<div class='radio'><label><input type='radio' id='pregunta_"+this.Id+"' name='pregunta_" + this.Id + "' value=" + i + ">" + this.respostes[i] + "</input></label></div>";
  }
}

function ItemMultipleChoice(Enunciat, Respostes, Id, Obligatoria) {
  Item.call(this, Enunciat, Id, Obligatoria);
  this.respostes = Respostes;
  this.tipus = DefItemMultipleChoice;
}
ItemMultipleChoice.prototype = new Item;
ItemMultipleChoice.prototype.processarPregunta = function() {
  for (var i = 0; i < this.respostes.length; i++) {
    this.html += "<div class='checkbox'><label><input type='checkbox' name='pregunta_"+this.Id+"' class='pregunta_" + this.Id + "'>" + this.respostes[i] + "</input></label></div>";
  }
}

function ItemDragAndDrop(Enunciat, Respostes, Id, Obligatoria) {
  var enunciats = Enunciat.split("|");
  var cap = enunciats[0];
  Item.call(this, cap, Id, Obligatoria);
  this.enunciats = enunciats.slice(1);
  this.respostes = Respostes;
  this.tipus = DefItemDragAndDrop;
}
ItemDragAndDrop.prototype = new Item;

ItemDragAndDrop.prototype.processarPregunta = function() {
  var Enunciats = this.enunciats;
  this.html += "<table class='orige' style='border-collapse:collapse;width:60%;border:1px dotted #d8d8d8;font: normal 11px verdana, arial, helvetica, sans-serif;'>";
  for (var i = 0; i < Enunciats.length; i++) {
    this.html += "<tr><td style='border: 1px dotted #d8d8d8;height:30px;cursor:move' ondragover='allowDrop(event)' ondrop='drop(event)'>";
    this.html += "<div id=enunciat" + this.Id + "_" + i + " draggable='true' ondragstart='drag(event)'>" + Enunciats[i] + "</div>";
    this.html += "</td></tr>";
  }
  this.html += "</table>";
  this.html += "<table class='desti' style='border-collapse:collapse;border: 1px solid #666666;font: normal 11px verdana, arial, helvetica, sans-serif;width:60%;'>";
  for (var i = 0; i < this.respostes.length; i++) {
    if (i % 2 == 1) {
      this.html += "<tr style='cursor:move;background: #f1f1f1;background-color: rgba(125, 126, 124, 0.4);'>";
    } else {
      this.html += "<tr style='cursor:move'>";
    }
    this.html += "<td style='height:30px;width:100px;border:1px solid;'>" + this.respostes[i] + "</td>";
    this.html += "<td style='height:30px;width:100px;border:1px solid;' ondrop='drop(event)' ondragover='allowDrop(event)' ondragstart='drag(event)'></td>";
    this.html += "</tr>";
  }
  this.html += "</table>";
}

function ItemMultiShortAnswer(Enunciat, Respostes, Id, Obligatoria, maxlength) {
  if (maxlength)
    this.maxlength = maxlength;
  else
    this.maxlength = 1;
  this.Size = Math.max(this.maxlength, 3);
  Item.call(this, Enunciat, Id, Obligatoria);
  this.respostes = Respostes;
  this.tipus = DefItemMultiShortAnswer;
}
ItemMultiShortAnswer.prototype = new Item;
ItemMultiShortAnswer.prototype.processarPregunta = function() {

  this.html += "<table>";
  for (var i = 0; i < this.respostes.length; i++) {
    this.html += "<tr><td>" + this.respostes[i] + "</td>";
    this.html += "<td><input type='text' value='' name='resposta" + this.Id + "_" + i + "' maxlength=" + this.maxlength + " size=" + this.Size + "></input></td>";
    this.html += "</tr>"
  }
  this.html += "</table>";

}
