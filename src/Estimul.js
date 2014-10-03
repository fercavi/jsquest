function Estimul(Enunciat, Preguntes) {
  this.preguntes = [];
  this.html = "";
  this.enunciat = Enunciat;
  this.preguntes = Preguntes;  

}
Estimul.prototype.afegirPreguntes = function() {
  for (i = 0; i < this.preguntes.length; i++) {
    var item;
    item = this.preguntes[i];
    this.html += item.html;
  }
};
Estimul.prototype.generarEstimul = function() {
  this.html = "<div class='generalbox'><h2>" + this.enunciat + "</h2>";
  this.afegirPreguntes();
  this.html += "</div>";
};
