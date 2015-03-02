var DefItem = 0;
var DefItemRespostaLlarga = 1;
var DefItemComboBox = 2;
var DefItemRadioButton = 3;
var DefItemMultipleChoice = 4;
var DefItemDragAndDrop = 5;
var DefItemRadioButtonVertical = 6;
var DefItemMultiShortAnswer = 7;
var DefItemFillGaps = 8;
var DefItemVF = 9;
var DefItemGrill = 10;
var DefItemSort = 11;


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
  this.html += "<div class='form-group'><label for='pregunta"+this.Id+"'></label><select class='form-control' id=pregunta_" + this.Id + ">";
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
    this.html += "<label class='radio-inline'><input type='radio' class='pregunta_"+this.Id+"' name='pregunta_" + this.Id + "' value=" + i + ">" + this.respostes[i] + "</input></label>";
  }
}

function ItemRadioButtonVertical(Enunciat, Respostes, Id, Obligatoria, Tipus) {
  ItemRadioButton.call(this, Enunciat, Respostes, Id, Obligatoria, Tipus);
  this.tipus = DefItemRadioButtonVertical;
}
ItemRadioButtonVertical.prototype = new ItemRadioButton;
ItemRadioButtonVertical.prototype.processarPregunta = function() {
  for (var i = 0; i < this.respostes.length; i++) {
    this.html += "<div class='radio'><label><input type='radio' class='pregunta_"+this.Id+"' name='pregunta_" + this.Id + "' value=" + i + ">" + this.respostes[i] + "</input></label></div>";
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
    this.html += "<div class='checkbox'><label><input type='checkbox' name='pregunta_"+this.Id+"' class='pregunta_" + this.Id + "' value="+i+">" + this.respostes[i] + "</input></label></div>";
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
  this.html += "<div class='list-group' style='width:25%'>";
  for (var i = 0; i < this.respostes.length; i++) {
   this.html += "<div class='droppable'><a class='btn-primary list-group-item draggable' style='z-Index:100000' pregunta="+this.Id +">"+this.respostes[i]+"</a></div>";   
   }
   this.html += "</div>";
   this.html += "<div class='row container'><div class='list-group col-sm-6' style='width:25%'>";
   for (var i = 0; i < Enunciats.length; i++) {
    this.html += "<a class='btn-success list-group-item'>"+Enunciats[i]+"</a>"
   }
   this.html += "</div>";
   this.html += "<div class='list-group col-sm-6' id='pregunta_"+this.Id + "'  style='width:30%;'>";
   for (var i = 0; i < this.respostes.length; i++) {
    //this.html += "<a class='btn-info droppable list-group-item' width='100%' id='pregunta_"+this.Id+"_"+i+"'>&nbsp;</a>"
    this.html += "<div class='btn-info droppable list-group-item' pregunta="+this.Id+">&nbsp;</div>"
   }
   this.html += "</div>";
   this.html += "</div>";     
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

  this.html += "<table class='table table-hover table-condensed table-bordered table-striped table-responsive'>";
  for (var i = 0; i < this.respostes.length; i++) {
    this.html += "<tr><td>" + this.respostes[i] + "</td>";
    this.html += "<td><input type='text' value='' name='resposta" + this.Id + "_" + i + "' maxlength=" + this.maxlength + " size=" + this.Size + "></input></td>";
    this.html += "</tr>"
  }
  this.html += "</table>";

}
function ItemFillGaps(Enunciat, Respostes, Id, Obligatoria, maxlength) {
  if (maxlength)
    this.maxlength = maxlength;
  else
    this.maxlength = 1;
  this.Size = Math.max(this.maxlength, 3);
  Item.call(this, Enunciat, Id, Obligatoria);
  this.respostes = Respostes;
  this.tipus = DefItemFillGaps;  
}
ItemFillGaps.prototype = new Item();
ItemFillGaps.prototype.processarPregunta = function(){
  var linia = "";
  this.html += "<table id='taula_"+this.Id + "'  class='table table-hover table-condensed table-bordered table-striped table-responsive'>";  
  for (var i = 0; i < this.respostes.length; i++) {
    linia = "<tr><td>" + this.respostes[i] + "</td></tr>";
    var input= "<input type='text' value='' name='resposta" + this.Id + "_" + i + "' maxlength=" + this.maxlength + " size=" + this.Size + "></input>";    
    linia = linia.replace(/{/g,input);
    this.html += linia;    
  }
  this.html += "</table>";  
}

function ItemVF(Enunciat,Respostes,Id,Obligatoria){
  Item.call(this,Enunciat,Id,Obligatoria);
  this.respostes = Respostes;
  this.tipus = DefItemVF;
}
ItemVF.prototype = new Item();
ItemVF.prototype.processarPregunta= function(){
  this.html += "<table id='taula_" + this.Id + "' class='table table-hover table-condensed table-bordered table-striped table-responsive'>";
  this.html += "<tr><th style='width:600px'>&nbsp;</th><th style='width:50px' >V</th><th style='width:50px'>F</th></tr>";  
  for(var i=0;i<this.respostes.length;i++){
    this.html += "<tr>";
    this.html += "<td>"+this.respostes[i]+"</td><td><input type='radio' class='pregunta_"+this.Id+"' name='pregunta_" + this.Id + "_"+i+"' value=1></td><td><input type='radio' class='pregunta_"+this.Id+"' name='pregunta_" + this.Id + "_"+i+"' value=0></td>";
    this.html +="</tr>";
  }  
  this.html += "</table>";
}
function ItemGrill(Enunciat, Respostes, Id,Obligatoria){
  var enunciats = Enunciat.split("|");  
  var cap = enunciats[0];  
  Item.call(this, cap, Id, Obligatoria);
  this.enunciats = enunciats.slice(1);
  this.respostes = Respostes;
  this.tipus = DefItemGrill; 
}
ItemGrill.prototype = new Item();

ItemGrill.prototype.processarPregunta = function(){
  this.html += "<table id='taula_"+this.Id+ "' class='table table-hover table-condensed table-bordered table-striped table-responsive'><thead>";
  this.html += "<tr><th style='width:600px'>&nbsp;</th>";
  for(var i=0;i<this.enunciats.length;i++)
    this.html+="<th>"+ this.enunciats[i]+"</th>";
  this.html += "</tr></thead>";  
  for(var i=0;i<this.respostes.length;i++){
    this.html += "<tr>";
    this.html += "<td>"+this.respostes[i]+"</td>";
    for (var j=0;j<this.enunciats.length;j++)
      this.html += "<td style='width:50px'><input type='radio' class='pregunta_"+this.Id+"' name='pregunta_" + this.Id + "_"+i+"' value="+j+"></td>";
    this.html +="</tr>";
  }  
  this.html += "</table>";
}

function ItemSort(Enunciat,Respostes,Id,Obligatoria){

  Item.call(this, Enunciat, Id, Obligatoria);
  this.respostes = Respostes;
  this.enunciat = Enunciat;
  this.tipus = DefItemSort;
}
ItemSort.prototype = new Item();
ItemSort.prototype.processarPregunta = function(){
  this.html +="<ol id='pregunta_"+this.Id + "' class='ui-sortable' style='list-style-type: none; margin: 0; padding: 0; width: 40%;'>";
  for (var i=0;i<this.respostes.length;i++){
    this.html+="<li  valor="+i+" style='margin: 0 3px 3px 3px; padding: 0.4em;padding-top:0em; padding-left: 1.5em; font-size: 1.0em; height: 18px;' class='ui-state-default ui-sortable-handle'><span  class='ui-icon ui-icon-arrowthick-2-n-s' style='position: absolute; margin-left: -1.3em;'></span>" + this.respostes[i] + "</li>";
  }
  this.html +="</ol>";
}
