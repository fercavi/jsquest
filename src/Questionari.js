function Questionari(Titol, Instruccions, TitolInstruccions) {
  this.titol = Titol;
  this.instruccions = Instruccions;
  this.titolInstruccions = TitolInstruccions;
  this.estimuls = [];
  this.npagines = 0;
  this.paginaactual = 0;
  this.html = "";
  //Creem l'estímul de les instruccions
  item = new Item(this.instruccions, -1, false);
  item.generarPregunta();
  estimul = new Estimul(this.titolInstruccions);
  estimul.Add(item);
  estimul.generarEstimul();
  this.Add(estimul);
}
Questionari.prototype.seguent = function() {
  this.paginaactual++;
  this.generarHTML();
}
Questionari.prototype.anterior = function() {
  this.paginaactual--;
  this.generarHTML();
}
Questionari.prototype.Add = function(Estimul) {
  this.estimuls.push(Estimul);
  this.npagines++;
}
Questionari.prototype.potAnarAvant = function() {
  pucAnar = true;
  if (this.paginaactual == this.npagines -1 ) //comencem a comptar des de 0
    pucAnar = false;
  return pucAnar;
}
Questionari.prototype.potAnarEnrere = function() {
  pucAnar = true;
  if (this.paginaactual == 0)
    pucAnar = false;
  return pucAnar;
}
Questionari.prototype.generarHTML = function() {
  this.html = "<div id='page-mod-chat-report'>";
  this.html += "<h1>" + this.titol + "</h1>";

  estimul = this.estimuls[this.paginaactual];
  this.html += estimul.html;
  this.html += "</div>";
}
