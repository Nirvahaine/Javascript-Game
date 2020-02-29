class Weapons {

    constructor(damages, id){
        this.damages = damages;
        this.id = id;
    }
    //Fonction qui fait spawn les armes aléatoirement
    spawnWeapon(canvas){

        var imgWeapon = new Image();
        imgWeapon.src = 'img/weapon_' + this.id + '.png';
        var objet = this;
        var id = this.id;

        imgWeapon.onload = function(){

            var passage = true;
            
            while(passage){

                var randomX = getRandomInt(canvas.line);
                var randomY = getRandomInt(canvas.column);

                var imgX = randomX*canvas.cellSize;
                var imgY = randomY*canvas.cellSize;

                var macase = getCase(randomX, randomY, canvas.column);
                var position = randomX + "," + randomY;

                if(canvas.plateau[macase].type === "vide")
                {
                    canvas.plateau[macase] = new Cell("weapon", false, objet);
                    canvas.ctx.drawImage(imgWeapon, imgX+1, imgY+1, canvas.cellSize-1,canvas.cellSize-1);
                    break;
                }

            }

        }
    }
    //Fonction qui respawn les armes sauvegardées dans le tableau
    respawnWeapons(canvas){
        var imgWeapon = new Image();
        imgWeapon.src = 'img/weapon_' + this.id + '.png';
        var objet = this;
        
        imgWeapon.onload = function(){
            for(let i = 0; i < canvas.plateau.length; i++){
                if (canvas.plateau[i].arme == objet)
                {   
                    if(canvas.plateau[i].type == 'weapon'){
                    canvas.ctx.drawImage(imgWeapon, getX(i)*canvas.cellSize, getY(i)*canvas.cellSize, canvas.cellSize, canvas.cellSize);}
                }
            }
        }         
    }
}