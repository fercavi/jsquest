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
  this.html = "<div class='panel panel-primary'><div class='panel panel-heading'><h3 class='panel-title'>" + this.enunciat + "</h3></div>";  
  this.html += "<div class='body'><p id=-1>" +this.contingut + "</p></div>";
  this.html += "<ul class='list-group'>";
  this.afegirPreguntes();
  this.html += "</ul>";
  this.html += "</div>";

};
