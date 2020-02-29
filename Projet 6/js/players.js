class Players {
    
    constructor(life, damages, color, weapon, defense){
        this.life = life;
        this.damages = damages;
        this.color = color;
        this.weapon = weapon;
        this.defense = false;
    }

    // Fonction qui fait spawn un joueur sur le canvas
    spawnPlayer(canvas){

        var imgPlayer = new Image();
        imgPlayer.src = 'img/' + this.color + '_player.png';
        var color = this.color;

        imgPlayer.onload = function(){

            var passage = true;

            while(passage){
                
                // Variable aléatoire pour un spawn aléatoire
                var randomX = getRandomInt(canvas.line);
                var randomY = getRandomInt(canvas.column);
                
                // Définit la position en X et Y de l'image du joueur aléatoirement sur le canvas
                var imgX = randomX*canvas.cellSize;
                var imgY = randomY*canvas.cellSize;
                
                // Sauvegarde de la position du joueur avant affichage
                var macase = getCase(randomX, randomY, canvas.column);
                var case_saved = macase;
                
                // Si la case définie aléatoirement est vide 
                if(canvas.plateau[macase].type === "vide")
                {
                    var checkX = randomX - 1;
                    var macase = getCase(checkX, randomY, canvas.column);

                    if(randomX == 0 || canvas.plateau[macase].type != "red")
                    {

                        var checkX = randomX + 1;
                        var macase = getCase(checkX, randomY, canvas.column);

                        if(randomX == 9 || canvas.plateau[macase].type != "red")
                        {
                            var checkY = randomY - 1;
                            var macase = getCase(randomX, checkY, canvas.column);

                            if(randomY == 0 || canvas.plateau[macase].type != "red")

                            {
                                var checkY = randomY + 1;
                                var macase = getCase(randomX, checkY, canvas.column);

                                if(randomY == 9 || canvas.plateau[macase].type != "red")
                                {
                                    canvas.plateau[case_saved] = new Cell(color, false, "aucune");
                                    canvas.ctx.drawImage(imgPlayer, imgX, imgY, canvas.cellSize,canvas.cellSize);
                                    break;
                                }

                            }
                        }

                    }

                }

            }
        }

    }

    respawnPlayer(canvas){

        var imgPlayer = new Image();
        imgPlayer.src = 'img/' + this.color + '_player.png';
        var playerColorString = this.color;
        

        imgPlayer.onload = function(){
            for(let i = 0; i < canvas.plateau.length; i++){
                if (canvas.plateau[i].type === playerColorString)
                {
                    canvas.ctx.drawImage(imgPlayer, getX(i)*canvas.cellSize, getY(i)*canvas.cellSize, canvas.cellSize, canvas.cellSize);
                }

            }
        }
    }
}