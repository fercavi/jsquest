describe("Generar html per a preguntes individuals", function() {
  var item;

  it("Generar una pregunta de resposta llarga", function() {
    item = new ItemRespostaLlarga("De quin color era el cavall blanc de Santiago",666,false);
    item.generarPregunta();
    expect(item.html).toEqual("<form name='f666' ><p id=666 obligatoria='false' >De quin color era el cavall blanc de Santiago<br/><textarea cols=80 rows=6 name=pregunta666></textarea></p></form>");
  });
  it("Generar una pregunta amb la resposta per combo box", function() {
    var Repostes = ["Roig","Negre","Blanc","Verd"];
    item = new ItemComboBox("De quin color era el cavall blanc de Santiago?",Repostes,666,false);
    item.generarPregunta();
    expect(item.html).toEqual("<form name='f666' ><p id=666 obligatoria='false' >De quin color era el cavall blanc de Santiago?<br/><select id=pregunta666><option value=0>Roig</option><option value=1>Negre</option><option value=2>Blanc</option><option value=3>Verd</option></select></p></form>");
  });
  it("Generar una pregunta amb la resposta per radiobutton", function() {
    var Repostes = ["Roig","Negre","Blanc","Verd"];
    item = new ItemRadioButton("De quin color era el cavall blanc de Santiago?",Repostes,666,false);
    item.generarPregunta();
    expect(item.html).toEqual("<form name='f666' ><p id=666 obligatoria='false' >De quin color era el cavall blanc de Santiago?<br/><input type='radio' name='pregunta666' value=0>Roig</input><br/><input type='radio' name='pregunta666' value=1>Negre</input><br/><input type='radio' name='pregunta666' value=2>Blanc</input><br/><input type='radio' name='pregunta666' value=3>Verd</input><br/></p></form>");
  });
  it("Generar una pregunta amb la resposta per opcions múltiples", function() {
    var Repostes = ["Roig","Negre","Blanc","Verd"];
    item = new ItemMultipleChoice("De quin color era el cavall blanc de Santiago?",Repostes,666,false);
    item.generarPregunta();
    expect(item.html).toEqual("<form name='f666' ><p id=666 obligatoria='false' >De quin color era el cavall blanc de Santiago?<br/><input type='checkbox' name='pregunta666'>Roig</input><br/><input type='checkbox' name='pregunta666'>Negre</input><br/><input type='checkbox' name='pregunta666'>Blanc</input><br/><input type='checkbox' name='pregunta666'>Verd</input><br/></p></form>");
  });
});
