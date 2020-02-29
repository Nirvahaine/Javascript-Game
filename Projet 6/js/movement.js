class Movement{
    //Récupère la position du joueur actif et check si le mouvement est possible 
    move(canvas){
        var passage = true;

        while(passage){

            canvas.ctx.strokeStyle = "red";
            
            var casejoueur = getPlayerCase(canvas);
        
            var x = getX(casejoueur);
            var y = getY(casejoueur);

            this.afficherCase(x,y,"droite", canvas);
            this.afficherCase(x,y,"gauche", canvas);
            this.afficherCase(x,y,"bas", canvas);
            this.afficherCase(x,y,"haut", canvas);

            
            break;
        }
    }
    
    //Fonction qui entoure la case en rouge si elle est cliquable
    afficherCase(coordX, coordY, direction, canvas){

        for(let i=1;i<=3;i++){

            if(direction == "droite" || direction == "gauche"){

                if(direction == "droite")
                {
                    var x = coordX + i;
                }
                else
                {
                    var x = coordX - i; 
                }



                if(x < 0 || x > 9)
                {
                    break;
                }

                var testCase = getCase(x, coordY, canvas.column);
                var str = canvas.plateau[testCase].type;
                var res = str.slice(0,6); 

                if(canvas.plateau[testCase].type === "vide" || res == "weapon"){
                    canvas.plateau[testCase].clickable = true;
                    canvas.ctx.strokeRect(x*canvas.cellSize, coordY*canvas.cellSize, canvas.cellSize, canvas.cellSize);
                }
                else
                {
                    break;
                }
            }

            if(direction == "haut" || direction == "bas"){


                if(direction == "haut")
                {
                    var y = coordY - i;
                }
                else
                {
                    var y = coordY + i; 
                }

                if(y < 0 || y > 9)
                {
                    break;
                }

                var testCase = getCase(coordX, y, canvas.column);
                var str = canvas.plateau[testCase].type;
                var res = str.slice(0,6); 

                if(canvas.plateau[testCase].type === "vide" || res == "weapon"){
                    canvas.plateau[testCase].clickable = true;
                    canvas.ctx.strokeRect(coordX*canvas.cellSize, y*canvas.cellSize, canvas.cellSize, canvas.cellSize);
                }
                else 
                {
                    break;
                }
            }
        } 
    }
}