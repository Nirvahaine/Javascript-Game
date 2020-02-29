class Walls {
    //Fonction qui dessine les murs aléatoirement
    drawWalls(canvas){

        var imgWalls = new Image();
        imgWalls.src = 'img/brick.jpg';

        imgWalls.onload = function(){

            for(let k=0;k<canvas.obstacle;k++){
                var randomX = getRandomInt(canvas.line);
                var randomY = getRandomInt(canvas.column);

                var imgX = randomX*canvas.cellSize;
                var imgY = randomY*canvas.cellSize;
                var macase = getCase(randomX, randomY, canvas.column);

                if(canvas.plateau[macase].type === "vide")
                {
                    canvas.plateau[macase] = new Cell("mur", false, "aucune");
                    canvas.ctx.drawImage(imgWalls, imgX, imgY, canvas.cellSize, canvas.cellSize);
                }

                else
                {
                    k--;
                }
            }


        }

    }
    //Fonction qui dessine à nouveau les murs
    redrawWalls(canvas){

        var imgWalls = new Image();
        imgWalls.src = 'img/brick.jpg';
        imgWalls.onload = function(){
            for(let i = 0; i < canvas.plateau.length; i++){
                if (canvas.plateau[i].type === "mur")
                {
                    canvas.ctx.drawImage(imgWalls, getX(i)*canvas.cellSize, getY(i)*canvas.cellSize, canvas.cellSize, canvas.cellSize);
                }
            }
        }
    }
}