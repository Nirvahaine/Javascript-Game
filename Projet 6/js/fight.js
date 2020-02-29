class Fight{
    //Récupère la position du joueur actif et check si le combat est possible
    fight(canvas){
        var passage = true;

        while(passage){

            var casejoueur = getPlayerCase(canvas);

            var x = getX(casejoueur);
            var y = getY(casejoueur);

            this.fightCheck(x,y,"droite", canvas);
            this.fightCheck(x,y,"gauche", canvas);
            this.fightCheck(x,y,"bas", canvas);
            this.fightCheck(x,y,"haut", canvas);


            return false;
        }
    }
    //Fonction qui vérifie si un combat est possible
    fightCheck(coordX, coordY, direction, canvas){


        if(direction == "droite" || direction == "gauche"){

            if(direction == "droite")
            {
                var x = coordX + 1;
            }
            else
            {
                var x = coordX - 1; 
            }



            if(x < 0 || x > 9)
            {
                return false;
            }

            var testCase = getCase(x, coordY, canvas.column);

            if(canvas.plateau[testCase].type === "blue" || canvas.plateau[testCase].type === "red"){
                this.startFight();
            }
            else
            {
                return false;
            }
        }

        if(direction == "haut" || direction == "bas"){


            if(direction == "haut")
            {
                var y = coordY - 1;
            }
            else
            {
                var y = coordY + 1; 
            }

            if(y < 0 || y > 9)
            {
                return false;
            }

            var testCase = getCase(coordX, y, canvas.column);

            if(canvas.plateau[testCase].type === "blue" || canvas.plateau[testCase].type === "red"){
                this.startFight();
            }
            else 
            {
                return false;
            }
        }
    } 
    
    //Affiche l'interface de combat
    startFight(){
        $('#boutonAttaque').show();
        $('#boutonDefense').show();
        $('#combatText').show();
    }
    
    //Inflige des dégats au joueur défenseur
    attaque(joueurAttaquant, joueurDefenseur){

        var joueurPV = joueurDefenseur.life;

        if(joueurDefenseur.defense == true){
            var joueurDegats = joueurAttaquant.weapon.damages/2;
            joueurPV = joueurDefenseur.life-joueurDegats;
        }
        else{
            var joueurDegats = joueurAttaquant.weapon.damages;
            joueurPV = joueurDefenseur.life-joueurDegats;  
        }
        
        joueurDefenseur.life = joueurPV;
        
        $('#combatText').prepend("Le joueur " + joueurAttaquant.color + " inflige " + joueurDegats.toFixed(2) + " dégats ! Le joueur " + joueurDefenseur.color + " a " + joueurPV.toFixed(2) + " point(s) de vie !\n");

        $('#'+joueurDefenseur.color).find('.life').html('Vie : ' + joueurPV.toFixed(2));
        
        joueurDefenseur.defense = false;
    }

    //Met le joueur actif en position de défense
    defense(canvas, player)
    {
        player.defense = true;
    }

}