var localArrayClasses = undefined;
function  VisorEstimul(){
  this.Estimul = undefined;  
  localArrayClasses = [];
  localArrayClasses.push(Item); //0
  localArrayClasses.push(ItemRespostaLlarga); //1
  localArrayClasses.push(ItemComboBox); //2
  localArrayClasses.push(ItemRadioButton); //3
  localArrayClasses.push(ItemMultipleChoice); //4
  localArrayClasses.push(ItemDragAndDrop); //5
  localArrayClasses.push(ItemRadioButtonVertical); //6
  localArrayClasses.push(ItemMultiShortAnswer); //7
}
VisorEstimul.prototype.load=function(jsonEstimul){	
  var _estimul = JSON.parse(jsonEstimul);  
  alert(_estimul.Contingut);
  this.Estimul = new Estimul(_estimul.Enunciat,_estimul.Contingut)
  for(var i=0;i< _estimul.Preguntes.length; i++){
  	var Pregunta = _estimul.Preguntes[i];
    var ItemClass = localArrayClasses[Pregunta.tipus];
    var Respostes = Pregunta.Respostes;
    var _item = undefined;
    var obligatoria = true;
    if (Pregunta.Obligatoria == "false") {
        obligatoria = false;
    }
    if (tipusTeRespostes(Pregunta.tipus)) {
      _item = new ItemClass(Pregunta.Enunciat, Respostes, Pregunta.Id, obligatoria);
    } 
    else {
      _item = new ItemClass(Pregunta.Enunciat, Pregunta.Id, obligatoria);
    }
    _item.setVisor();
    _item.generarPregunta();
    this.Estimul.Add(_item);
  }
  this.Estimul.generarEstimul();

}
VisorEstimul.prototype.getHTML= function(){
   return this.Estimul.html;
}