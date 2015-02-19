function Estimul(Enunciat, Contingut) {
  this.preguntes = [];
  this.html = "";
  this.enunciat = Enunciat;
  if (Contingut)
    this.contingut =Contingut;
  else
    this.contingut="";
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
  this.html += "<p id=-1>" +this.contingut + "</p>";
  this.afegirPreguntes();
  this.html += "</div>";
};
