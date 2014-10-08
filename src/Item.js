function Item(Enunciat, Id, Obligatoria) {
  this.enunciat = Enunciat;
  this.Id = Id;
  this.obligatoria = Obligatoria;
}
Item.prototype.generarPregunta = function() {
  this.iniciPreguntaGenerica();
  this.processarPregunta();
  this.fiPreguntaGenerica();
}
Item.prototype.iniciPreguntaGenerica = function() {
  this.html = "<form name='f" + this.Id+"' ><p id=" + this.Id + " obligatoria='"+ this.obligatoria+"' >";
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
function ItemRespostaLlarga(Enunciat, id, Obligatoria) {
  Item.call(this, Enunciat, id, Obligatoria)
}

ItemRespostaLlarga.prototype = new Item;
ItemRespostaLlarga.prototype.processarPregunta = function() {
  this.html = this.html + "<textarea cols=80 rows=6 name=pregunta" + this.Id + "></textarea>";
}
function ItemComboBox(Enunciat, Respostes, Id, Obligatoria) {
  Item.call(this, Enunciat, Id, Obligatoria);
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

function ItemRadioButton(Enunciat, Respostes, Id, Obligatoria) {
  Item.call(this, Enunciat, Id, Obligatoria);
  this.respostes = Respostes;
}
ItemRadioButton.prototype = new Item;
ItemRadioButton.prototype.processarPregunta = function() {
  for (var i = 0; i < this.respostes.length; i++) {
    this.html += "<input type='radio' name='pregunta" + this.Id + "' value=" + i + ">" + this.respostes[i] + "</input><br/>";
  }
}

function ItemMultipleChoice(Enunciat, Respostes, Id, Obligatoria) {
  Item.call(this, Enunciat, Id, Obligatoria);
  this.respostes = Respostes;
}
ItemMultipleChoice.prototype = new Item;
ItemMultipleChoice.prototype.processarPregunta = function() {
  for (var i = 0; i < this.respostes.length; i++) {
    this.html += "<input type='checkbox' name='pregunta" + this.Id + "'>" + this.respostes[i] + "</input><br/>";
  }
}
