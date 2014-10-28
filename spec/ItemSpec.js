function compara(string1,string2){
  var result = -1;
  var minim = string1.length;
  if(string2.length<minim)
    minim = string2.length;
  for(var i=0;(i<minim) && (result==-1); i++){
    if (string1[i]!=string2[i]) result = i;
  }
  return result;
}
describe("Generar html per a preguntes individuals", function() {
      var item;

      it("Generar una pregunta de resposta llarga", function() {
        item = new ItemRespostaLlarga("De quin color era el cavall blanc de Santiago", 666, false, 1);
        item.generarPregunta();
        expect(item.html).toEqual("<form name='f666' tipus='1'><p id=666 obligatoria='false' >De quin color era el cavall blanc de Santiago<br/><textarea cols=80 rows=6 name=pregunta666></textarea></p></form>");
      });
      it("Generar una pregunta amb la resposta per combo box", function() {
        var Repostes = ["Roig", "Negre", "Blanc", "Verd"];
        item = new ItemComboBox("De quin color era el cavall blanc de Santiago?", Repostes, 666, false, 2);
        item.generarPregunta();
        expect(item.html).toEqual("<form name='f666' tipus='2'><p id=666 obligatoria='false' >De quin color era el cavall blanc de Santiago?<br/><select id=pregunta666><option value=0>Roig</option><option value=1>Negre</option><option value=2>Blanc</option><option value=3>Verd</option></select></p></form>");
      });
      it("Generar una pregunta amb la resposta per radiobutton", function() {
        var Repostes = ["Roig", "Negre", "Blanc", "Verd"];
        item = new ItemRadioButton("De quin color era el cavall blanc de Santiago?", Repostes, 666, false, 3);
        item.generarPregunta();
        expect(item.html).toEqual("<form name='f666' tipus='3'><p id=666 obligatoria='false' >De quin color era el cavall blanc de Santiago?<br/><input type='radio' name='pregunta666' value=0>Roig</input><br/><input type='radio' name='pregunta666' value=1>Negre</input><br/><input type='radio' name='pregunta666' value=2>Blanc</input><br/><input type='radio' name='pregunta666' value=3>Verd</input><br/></p></form>");
      });
      it("Generar una pregunta amb la resposta per opcions múltiples", function() {
        var Repostes = ["Roig", "Negre", "Blanc", "Verd"];
        item = new ItemMultipleChoice("De quin color era el cavall blanc de Santiago?", Repostes, 666, false, 4);
        item.generarPregunta();
        expect(item.html).toEqual("<form name='f666' tipus='4'><p id=666 obligatoria='false' >De quin color era el cavall blanc de Santiago?<br/><input type='checkbox' name='pregunta666'>Roig</input><br/><input type='checkbox' name='pregunta666'>Negre</input><br/><input type='checkbox' name='pregunta666'>Blanc</input><br/><input type='checkbox' name='pregunta666'>Verd</input><br/></p></form>");
      });
      it("Generar una pregunta amb drag and drop", function() {
          var Repostes = ["roig", "blanc", "verd", "negre"];
          item = new ItemDragAndDrop("Enunciat a preguntar |roig|blanc|verd|negre", Repostes, 666, false, 5);
          item.generarPregunta();
          stringExpected = "<form name='f666' tipus='5'><p id=666 obligatoria='false' >Enunciat a preguntar <br/><table class='orige' style='border-collapse:collapse;width:60%;border:1px dotted #d8d8d8;font: normal 11px verdana, arial, helvetica, sans-serif;'><tr><td style='border: 1px dotted #d8d8d8;height:30px;cursor:move' ondragover='allowDrop(event)' ondrop='drop(event)'><div id=enunciat666_0 draggable='true' ondragstart='drag(event)'>roig</div></td></tr><tr><td style='border: 1px dotted #d8d8d8;height:30px;cursor:move' ondragover='allowDrop(event)' ondrop='drop(event)'><div id=enunciat666_1 draggable='true' ondragstart='drag(event)'>blanc</div></td></tr><tr><td style='border: 1px dotted #d8d8d8;height:30px;cursor:move' ondragover='allowDrop(event)' ondrop='drop(event)'><div id=enunciat666_2 draggable='true' ondragstart='drag(event)'>verd</div></td></tr><tr><td style='border: 1px dotted #d8d8d8;height:30px;cursor:move' ondragover='allowDrop(event)' ondrop='drop(event)'><div id=enunciat666_3 draggable='true' ondragstart='drag(event)'>negre</div></td></tr></table><table class='desti' style='border-collapse:collapse;border: 1px solid #666666;font: normal 11px verdana, arial, helvetica, sans-serif;width:60%;'><tr style='cursor:move'><td style='height:30px;width:100px;border:1px solid;'>roig</td><td style='height:30px;width:100px;border:1px solid;' ondrop='drop(event)' ondragover='allowDrop(event)' ondragstart='drag(event)'></td></tr><tr style='cursor:move;background: #f1f1f1;background-color: rgba(125, 126, 124, 0.4);'><td style='height:30px;width:100px;border:1px solid;'>blanc</td><td style='height:30px;width:100px;border:1px solid;' ondrop='drop(event)' ondragover='allowDrop(event)' ondragstart='drag(event)'></td></tr><tr style='cursor:move'><td style='height:30px;width:100px;border:1px solid;'>verd</td><td style='height:30px;width:100px;border:1px solid;' ondrop='drop(event)' ondragover='allowDrop(event)' ondragstart='drag(event)'></td></tr><tr style='cursor:move;background: #f1f1f1;background-color: rgba(125, 126, 124, 0.4);'><td style='height:30px;width:100px;border:1px solid;'>negre</td><td style='height:30px;width:100px;border:1px solid;' ondrop='drop(event)' ondragover='allowDrop(event)' ondragstart='drag(event)'></td></tr></table></p></form>";
          expect(item.html).toEqual(stringExpected);
        });
      });
