describe("Generar un questionari", function() {
  it("Generar un questionari i comprar que s'afegix l'estimul", function() {
    Q = new Questionari("Títol questionari", "Instruccions completes del questionari, hauràs d'emplenar...", "Instruccions");
    var Repostes = ["Roig", "Negre", "Blanc", "Verd"];
    item = new ItemComboBox("De quin color era el cavall blanc de Santiago?", Repostes, 666, false);
    item.generarPregunta();
    E = new Estimul("Enunciat de l'estimul del cavall", [item]);
    E.generarEstimul();
    Q.Add(E);
    Q.generarHTML();
    expect(Q.estimuls.length).toEqual(2);
  });
});
