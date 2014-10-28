function Item(Enunciat, Id, Obligatoria, Tipus) {
  this.enunciat = Enunciat;
  this.Id = Id;
  this.obligatoria = Obligatoria;
  this.tipus =Tipus;
}
Item.prototype.generarPregunta = function() {
  this.iniciPreguntaGenerica();
  this.processarPregunta();
  this.fiPreguntaGenerica();
}
Item.prototype.iniciPreguntaGenerica = function() {
  this.html = "<form name='f" + this.Id+"' tipus='" + this.tipus+"'><p id=" + this.Id + " obligatoria='"+ this.obligatoria+"' >";
  if (this.obligatoria) {
    this.html = this.html + "<font color='red'>*</font>";
  }
  this.html = this.html + this.enunciat + "<br/>";
};
Item.prototype.fiPreguntaGenerica = function() {
  this.html += "</p></form>";
};
Item.prototype.processarPregunta = function(){

}
function ItemRespostaLlarga(Enunciat, id, Obligatoria,Tipus) {
  Item.call(this, Enunciat, id, Obligatoria,Tipus)
}

ItemRespostaLlarga.prototype = new Item;
ItemRespostaLlarga.prototype.processarPregunta = function() {
  this.html = this.html + "<textarea cols=80 rows=6 name=pregunta" + this.Id + "></textarea>";
}
function ItemComboBox(Enunciat, Respostes, Id, Obligatoria, Tipus) {
  Item.call(this, Enunciat, Id, Obligatoria, Tipus);
  this.respostes = Respostes;
}
ItemComboBox.prototype = new Item;
ItemComboBox.prototype.processarPregunta = function() {
  this.html += "<select id=pregunta" +  this.Id + ">";
  for (var i = 0; i < this.respostes.length; i++) {
    this.html += "<option value=" + i + ">" + this.respostes[i] + "</option>";
  }
  this.html += "</select>";
}

function ItemRadioButton(Enunciat, Respostes, Id, Obligatoria,Tipus) {
  Item.call(this, Enunciat, Id, Obligatoria, Tipus);
  this.respostes = Respostes;
}
ItemRadioButton.prototype = new Item;
ItemRadioButton.prototype.processarPregunta = function() {
  for (var i = 0; i < this.respostes.length; i++) {
    this.html += "<input type='radio' name='pregunta" + this.Id + "' value=" + i + ">" + this.respostes[i] + "</input><br/>";
  }
}

function ItemMultipleChoice(Enunciat, Respostes, Id, Obligatoria, Tipus) {
  Item.call(this, Enunciat, Id, Obligatoria, Tipus);
  this.respostes = Respostes;
}
ItemMultipleChoice.prototype = new Item;
ItemMultipleChoice.prototype.processarPregunta = function() {
  for (var i = 0; i < this.respostes.length; i++) {
    this.html += "<input type='checkbox' name='pregunta" + this.Id + "'>" + this.respostes[i] + "</input><br/>";
  }
}

function ItemDragAndDrop(Enunciat, Respostes, Id, Obligatoria, Tipus){
  var enunciats = Enunciat.split("|")  ;
  var cap = enunciats[0];
  Item.call(this, cap, Id, Obligatoria, Tipus);
  this.enunciats = enunciats.slice(1);
  this.respostes = Respostes;
}
ItemDragAndDrop.prototype = new Item;

ItemDragAndDrop.prototype.processarPregunta = function() {
  var Enunciats = this.enunciats;
  this.html += "<table class='orige' style='border-collapse:collapse;width:60%;border:1px dotted #d8d8d8;font: normal 11px verdana, arial, helvetica, sans-serif;'>";
  for(var i = 0 ; i< Enunciats.length; i++){
    this.html += "<tr><td style='border: 1px dotted #d8d8d8;height:30px;cursor:move' ondragover='allowDrop(event)' ondrop='drop(event)'>";
    this.html += "<div id=enunciat" + this.Id + "_" + i + " draggable='true' ondragstart='drag(event)'>"+ Enunciats[i]+"</div>";
    this.html += "</td></tr>";
  }
  this.html += "</table>";
  this.html += "<table class='desti' style='border-collapse:collapse;border: 1px solid #666666;font: normal 11px verdana, arial, helvetica, sans-serif;width:60%;'>";
  for (var i = 0; i < this.respostes.length; i++) {
    if (i%2 ==1){
     this.html +="<tr style='cursor:move;background: #f1f1f1;background-color: rgba(125, 126, 124, 0.4);'>";
    }
    else{
    this.html += "<tr style='cursor:move'>";
    }
    this.html += "<td style='height:30px;width:100px;border:1px solid;'>"+ this.respostes[i]+"</td>";
    this.html += "<td style='height:30px;width:100px;border:1px solid;' ondrop='drop(event)' ondragover='allowDrop(event)' ondragstart='drag(event)'></td>";
    this.html += "</tr>";
  }
  this.html += "</table>";
}
