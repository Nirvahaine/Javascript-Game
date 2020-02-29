//Récupère un nombre aléatoire
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Récupère la position Y d'une case
function getY(i)
{
    var positionY = 10*Math.floor(i/10)/10;
    return positionY;
}

//Récupère la position X d'une case
function getX(i)
{
    var positionX = i%10;
    return positionX;
}

//Récupère la case à partir de la position X et Y
function getCase(x,y,nbcolumn){
    return (y*nbcolumn)+x;
}

//Récupère la case du clic sur le canvas
function checkClick(event, nbcolumn, cellSize) {
    var cellSize = cellSize+1;
    var layerXCase = Math.floor(event.layerX/cellSize)
    var layerYCase = Math.floor(event.layerY/cellSize)
    return getCase(layerXCase, layerYCase, nbcolumn);
}

//Récupère la case du joueur actif
function getPlayerCase(canvas){

    for(let i = 0; i < canvas.plateau.length; i++){
        if (canvas.plateau[i].type === canvas.player.color)
        {
            return i;
        }
    }
}

//Remet à 0 les cases cliquables
function resetClickable(canvas){
    
    for(let i = 0; i < canvas.plateau.length; i++){
        if (canvas.plateau[i].clickable === true)
        {
            var positionX = getX(i);
            var positionY = getY(i);
            canvas.plateau[i].clickable = false;
        }
    }  
}

//Change la couleur des boutons attaque/défense
function switchColor(canvas){
    $('#boutonAttaque').css('background-color',canvas.player.color);
    $('#boutonDefense').css('background-color',canvas.player.color);
}