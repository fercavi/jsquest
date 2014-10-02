describe("Generar Estímul complet", function() {
  var estimul;  
  it("generar un estímul amb tots els tipus de preguntes", function() {
    var item;
    var items=[];
    item = new ItemRespostaLlarga("De quin color era el cavall blanc de Santiago", 666, false);
    item.generarPregunta();
    items.push(item);
    var Repostes = ["Roig", "Negre", "Blanc", "Verd"];
    item = new ItemComboBox("De quin color era el cavall blanc de Santiago?", Repostes, 666, false);
    item.generarPregunta();
    items.push(item);
    item = new ItemRadioButton("De quin color era el cavall blanc de Santiago?", Repostes, 666, false);
    item.generarPregunta();
    items.push(item);
    item = new ItemMultipleChoice("De quin color era el cavall blanc de Santiago?", Repostes, 666, false);
    item.generarPregunta();
    items.push(item);
    estimul = new Estimul("És l'enunciat del cavall", items);
    estimul.generarEstimul();
    //expect(estimul.html).toEqual("<div><h2>És l'enunciat del cavall</h2>" + items[0].html +items[1].html + "</div>");
    expect(estimul.html).toEqual("<div><h2>És l'enunciat del cavall</h2>" + items[0].html + items[1].html + items[2].html + items[3].html + "</div>");
  });

});
