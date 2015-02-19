function Estimul(Enunciat, Contingut) {
  this.preguntes = [];
  this.html = "";
  this.enunciat = Enunciat;
  this.contingut = Contingut;
}
Estimul.prototype.Add= function(Item){
  this.preguntes.push(Item);
}
Estimul.prototype.afegirPreguntes = function() {
  for (var i = 0; i < this.preguntes.length; i++) {
    var item;
    item = this.preguntes[i];
    this.html += item.html;
  }
};
Estimul.prototype.generarEstimul = function() {
  this.html = "<div class='generalbox'><h2>" + this.enunciat + "</h2>";
  this.html += "<p>" +this.contingut + "</p>";
  this.afegirPreguntes();
  this.html += "</div>";
};
