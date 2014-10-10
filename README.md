jsquest
=======

Gestor de qüestionaris en javascript, ideal per incrustar-lo en una web, alimentant-se de dades JSON
L'estructura del qüestionari serà:
Estímul: Enunciat general per a poder fer preguntes
Item: Preguntes concretes sobre l'estímul. Els tipus d'estímuls són RespostaLlarga(1),ComboBox(2),RadioButton(3),MultupleChoice(4). Si val un altre típus de pregunta caldrà heretar d'Item en Item.js
Questionari: Conjunt d'Estímuls. Per defecte si hi ha més estímuls podem anar avant i si és el primer no podrem anar cap a darrere. Si volem canviar este comportament caldrà heretar o modificar les condicions potAnarAvant i potanarEnrere de Questionari.js
Document: Aspecte gràfic i control avant i arrere. 

En test2.html es pot veure una demo. Per a poder gastar-lo cal enllaçar la biblioteca (si està en la carpeta src):

<script type='text/javascript' src='src/jsquest.js'></script>

i després cridar a IniDocument(divContenedor,data,OnVolemElResultat);
DivContenedor és un l'identificador del div que mostrarà el contenedor
data: serà el JSON amb les dades del qüestionari. Es proporciona un exemple en JSON, Example.json més avant mirarem els camps. En test2.html es pot modificar i anar vegent els resultats
OnVolemElResultat: potser dos coses, 
a)
l'identificador del TextArea on mostrarem el resultat en JSON, serà un array d'este tipus:
[{"nom":"1","valor":"1"},{"nom":"2","valor":"3"}]
on nom serà l'identificador de la pregunta i valor la resposta. 
b) una funció: function(data){} què manipule el resultat

JSON d'entrada
--------------
Es pot mirar Example JSON, camps:
urlEscape: La url d'on es carregarà si es cancel·la el formulari
MissategErrorObligatories: El missatge que es mostrarà si no es contesten totes les preguntes obligatòries
Document: Simplenet contrindrà un qüestionari
Questionari: Tindrà Titol, subtítol, les instruccions i un conjunt d'estímuls.
Estimul: Tindrà un Enunciat i un conjunt de Preguntes (Items).
Preguntes: Tindrà un Enunciat, un Identificador, si es obligatoria, tipus (0,1,2,3,4, explicats anteriorment), i un array de Respostes si la pregunta té moltes respostes possibles.


Dependències
============
No depen de cap biblioteca, l'única cosa que s'ha gastat és el jasmine per a fer tests, si es volen fer tots els tests s'ha d'obrir l'specrunner.html. Però no fa cap falta per a gastar la biblioteca. Cal tindre en compte que no he pogut fer cap test (per que no sé com fer-lo) de la classe DocumentQ ja que és l'encarregada del comportament (de fer click i eixes coses). Per tant, no hi ha cap test de DocumentQ a la carpeta Spec. S'inclou una fulla d'estils css/style.css i un parell d'imatges per a les fletxes a la carpeta img (fletxadre.gif i fletxaes.gif)
